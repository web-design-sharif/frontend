export type Form = {
  id: number;
  ownerId: number;
  published: boolean;
  title: string;
  updatedAt: string;
  question: Question[];
  submitters: User[];
  // responses: number;
};

export type User = {
  id: number; 
  email: string;
  password: string;
}

export type Question = {
  id: number;
  title: string;
  questionType: QuestionType;
  isRequired: boolean;
  options: Option[];
  createdAt: string;
  updatedAt: string;
};

export type Option = {
  id: number;
  optionText: string;
};

export type CreateFormResponse = {
  userId: number;
  formId: number;
  formResponses: [FormResponse];
}

export type FormResponse = {
  id: number;
  formId: number;
  responderId: number;
  answers: Answer[];
}

export type Answer = {
  id: number;
  questionId: number;
  answerText: string;
  answerOptions: AnswerOption[];
}

export type AnswerOption = {
  id: number;
  optionId: number;
}

export enum QuestionType {
  NORMAL_TEXT = "NORMAL_TEXT",
  PASSWORD = "PASSWORD",
  EMAIL = "EMAIL",
  TEXT_AREA = "TEXT_AREA",
  MULTI_CHOICE = "MULTI_CHOICE",
  CHECKBOX = "CHECKBOX",
  DROPDOWN = "DROPDOWN",
  TIME = "TIME",
  DATE = "DATE"
}