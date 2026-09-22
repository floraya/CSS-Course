export type LessonCategory = 
  | 'basics'
  | 'selectors'
  | 'colors'
  | 'typography'
  | 'box-model'
  | 'display-position'
  | 'flexbox'
  | 'grid'
  | 'effects'
  | 'animation'
  | 'competition'
  | 'capstone';

export interface VisualControl {
  property: string;
  label: string;
  type: 'select' | 'range' | 'color' | 'text';
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  defaultValue: string;
}

export interface ChallengeCheck {
  id: string;
  description: string;
  // Rule verification: regex on CSS or property test
  cssSelector?: string;
  property?: string;
  expectedValue?: string | string[];
  regex?: RegExp | string;
  customTest?: (css: string, doc: Document) => boolean;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  category: LessonCategory;
  categoryName: string;
  difficulty: '入門' | '進階' | '競賽實戰' | '畢業考題';
  fooishReferenceUrl?: string;
  
  // 老師講解部分 (Lecture Mode) - 生動趣味化設計
  concept: {
    summary: string;
    // 🎭 生活化生動比喻 (不再是一堆死板文字，用故事與生活事物秒懂)
    metaphor: {
      title: string;
      story: string;
      icon: string;
    };
    keyPoints: string[];
    // ⚔️ 新手翻車 vs 大師寫法 (點擊可立即對比切換)
    badVsGood?: {
      badCode: string;
      badReason: string;
      goodCode: string;
      goodReason: string;
    };
    // 🏆 金手獎選手秒殺記憶口訣
    mnemonic?: string;
    syntaxTable?: { property: string; values: string; explanation: string }[];
    championTip: string; // 金手獎選手經驗叮嚀
    commonPitfalls: string[]; // 新手常犯地雷
    // 🎮 課堂互動微按鈕（點擊直接切換不同效果）
    quickToggles?: {
      label: string;
      overrideCss: string;
      desc: string;
    }[];
  };
  
  // 老師示範程式碼
  teacherCode: {
    html: string;
    css: string;
    explanation: string;
  };

  // 互動視覺化控制器 (讓新手拖曳滑桿直接看效果)
  visualControls?: VisualControl[];
  defaultVisualElementSelector?: string;

  // 學生動手實作與挑戰 (Student Practice Mode)
  challenge: {
    title: string;
    instructions: string[];
    targetGoalDescription: string;
    starterHtml: string;
    starterCss: string;
    solutionCss: string;
    hints: string[];
    checks: ChallengeCheck[];
  };
}

export interface UserProgress {
  completedLessonIds: string[];
  currentLessonId: string;
  studentXp: number;
  savedCustomCss: Record<string, string>; // lessonId -> student's modified css
  completedChallengesCount: number;
}
