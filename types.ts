export type Page = 'dashboard' | 'ai-assistant' | 'resources' | 'announcements' | 'calendar';

export interface Announcement {
  id: number;
  title: string;
  date: string;
  category: '긴급' | '행정' | '교수학습';
  author: string;
  content: string;
}

export interface Resource {
  id: number;
  title: string;
  type: '수업자료' | '행정서식' | '연수자료';
  subject: string;
  grade: string;
  uploader: string;
  date: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  category: 'school' | 'grade' | 'personal';
}

export enum AiTool {
  LessonPlan = 'lessonPlan',
  QuizMaker = 'quizMaker',
  ParentComm = 'parentComm',
  ReportDrafter = 'reportDrafter'
}

export interface SavedContent {
  id: string;
  tool: AiTool;
  inputs: { [key: string]: any };
  output: string;
  createdAt: string;
}
