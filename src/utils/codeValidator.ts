import { ChallengeCheck } from '../types';

export interface CheckResult {
  checkId: string;
  passed: boolean;
  message: string;
}

/**
 * Validates a student's CSS and the rendered document against challenge checks.
 */
export function validateChallenge(
  checks: ChallengeCheck[],
  cssCode: string,
  iframeDoc?: Document | null
): CheckResult[] {
  return checks.map((check) => {
    // 1. If custom test provided
    if (check.customTest) {
      try {
        const passed = check.customTest(cssCode, iframeDoc || document);
        return {
          checkId: check.id,
          passed,
          message: check.description,
        };
      } catch (err) {
        console.error('Custom test failed:', err);
        return {
          checkId: check.id,
          passed: false,
          message: check.description,
        };
      }
    }

    // 2. Check via computed style in iframeDoc if selector & property provided
    if (check.cssSelector && check.property && iframeDoc) {
      try {
        const el = iframeDoc.querySelector(check.cssSelector);
        if (el) {
          const computed = iframeDoc.defaultView?.getComputedStyle(el);
          if (computed) {
            const actualVal = computed.getPropertyValue(check.property).trim().toLowerCase();
            
            if (check.expectedValue) {
              const expectedList = Array.isArray(check.expectedValue) 
                ? check.expectedValue.map(v => v.trim().toLowerCase()) 
                : [check.expectedValue.trim().toLowerCase()];
              
              const matched = expectedList.some(exp => 
                actualVal === exp || 
                actualVal.includes(exp) ||
                normalizeColor(actualVal) === normalizeColor(exp)
              );

              if (matched) {
                return { checkId: check.id, passed: true, message: check.description };
              }
            }
          }
        }
      } catch (e) {
        console.warn('Computed style check fallback:', e);
      }
    }

    // 3. Regex / String search fallback on the CSS code text directly
    const cleanCss = cssCode.replace(/\s+/g, ' ').toLowerCase();
    
    if (check.cssSelector && check.property && check.expectedValue) {
      const expectedList = Array.isArray(check.expectedValue)
        ? check.expectedValue.map(v => v.toLowerCase())
        : [check.expectedValue.toLowerCase()];
      
      const propName = check.property.toLowerCase();
      // Test if property appears in css with expected value
      const hasProp = expectedList.some(val => 
        cleanCss.includes(propName) && cleanCss.includes(val)
      );

      return {
        checkId: check.id,
        passed: hasProp,
        message: check.description,
      };
    }

    // Default passed if no failures
    return {
      checkId: check.id,
      passed: true,
      message: check.description,
    };
  });
}

function normalizeColor(val: string): string {
  // Normalize rgb(15, 23, 42) spacing
  return val.replace(/\s+/g, '');
}
