import { ChallengeCheck } from '../types';

export interface CheckResult {
  checkId: string;
  passed: boolean;
  message: string;
}

function toKebab(str: string): string {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`).toLowerCase();
}

function normalizeColor(val: string): string {
  return val.replace(/\s+/g, '');
}

/**
 * Validates a student's CSS and the rendered document against challenge checks.
 * Strictly verifies that the student has written CSS before passing.
 */
export function validateChallenge(
  checks: ChallengeCheck[],
  cssCode: string,
  iframeDoc?: Document | null
): CheckResult[] {
  // Strip CSS comments to see if student actually wrote real CSS
  const codeWithoutComments = cssCode.replace(/\/\*[\s\S]*?\*\//g, '').trim();

  // If student wrote nothing or only comments, immediately fail all checks
  if (!codeWithoutComments) {
    return checks.map((check) => ({
      checkId: check.id,
      passed: false,
      message: `${check.description}（尚未編寫任何 CSS 程式碼）`,
    }));
  }

  const cleanCss = codeWithoutComments.replace(/\s+/g, ' ');
  const normalizedCss = cleanCss.toLowerCase();

  return checks.map((check) => {
    // 1. If custom test provided
    if (check.customTest) {
      try {
        const doc = iframeDoc || (typeof document !== 'undefined' ? document : ({} as Document));
        const passed = !!check.customTest(cssCode, doc);
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

    // 2. Regex test on CSS code if regex is provided
    if (check.regex) {
      try {
        const regexObj = typeof check.regex === 'string' ? new RegExp(check.regex, 'i') : check.regex;
        if (
          regexObj.test(cssCode) ||
          regexObj.test(codeWithoutComments) ||
          regexObj.test(cleanCss) ||
          regexObj.test(normalizedCss)
        ) {
          return {
            checkId: check.id,
            passed: true,
            message: check.description,
          };
        }
      } catch (e) {
        console.warn('Regex test error:', e);
      }
    }

    // 3. Check via computed style in iframeDoc if selector & property provided
    if (check.cssSelector && check.property && iframeDoc) {
      try {
        const propKebab = toKebab(check.property);
        const propCamel = check.property;
        const selectorClean = check.cssSelector.toLowerCase().trim();
        const selectorKeyword = selectorClean.replace(/[.#:>+~[\]]/g, ' ').trim().split(/\s+/)[0];

        // Ensure student CSS actually targets this selector or property
        const cssTouchesSelectorOrProp =
          normalizedCss.includes(selectorClean) ||
          (selectorKeyword && normalizedCss.includes(selectorKeyword)) ||
          normalizedCss.includes(propKebab) ||
          normalizedCss.includes(propCamel.toLowerCase());

        if (cssTouchesSelectorOrProp) {
          const el = iframeDoc.querySelector(check.cssSelector);
          if (el) {
            const computed = iframeDoc.defaultView?.getComputedStyle(el);
            if (computed) {
              const actualVal = (
                computed.getPropertyValue(propKebab) ||
                (computed as unknown as Record<string, string>)[propCamel] ||
                ''
              ).trim().toLowerCase();

              if (check.expectedValue) {
                const expectedList = Array.isArray(check.expectedValue)
                  ? check.expectedValue.map((v) => v.trim().toLowerCase())
                  : [check.expectedValue.trim().toLowerCase()];

                const matched = expectedList.some(
                  (exp) =>
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
        }
      } catch (e) {
        console.warn('Computed style check fallback:', e);
      }
    }

    // 4. Fallback search on CSS code text
    if (check.property && check.expectedValue) {
      const propKebab = toKebab(check.property);
      const propCamel = check.property.toLowerCase();
      const expectedList = Array.isArray(check.expectedValue)
        ? check.expectedValue.map((v) => v.toLowerCase().trim())
        : [check.expectedValue.toLowerCase().trim()];

      const hasProp = normalizedCss.includes(propKebab) || normalizedCss.includes(propCamel);
      const hasVal = expectedList.some(
        (val) =>
          normalizedCss.includes(val) ||
          normalizeColor(normalizedCss).includes(normalizeColor(val))
      );

      if (hasProp && hasVal) {
        return {
          checkId: check.id,
          passed: true,
          message: check.description,
        };
      }
    }

    // 5. Default MUST BE FALSE if none matched
    return {
      checkId: check.id,
      passed: false,
      message: check.description,
    };
  });
}

