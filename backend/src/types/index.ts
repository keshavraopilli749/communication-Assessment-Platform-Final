import { Request } from 'express';
import { User, UserRole } from '@prisma/client';

// Extended Request interface with user
export interface AuthenticatedRequest extends Request {
  user?: User;
}

// API Response types
export interface ApiResponse<T = any> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    role: UserRole;
  };
}

// Module types
export interface ModuleResponse {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string | null;
}

export interface SectionResponse {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  timeLimitSeconds: number;
}

// Assessment types
export interface CreateAssessmentRequest {
  sectionId: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  durationSeconds: number;
}

export interface AssessmentResponse {
  id: string;
  title: string;
  durationSeconds: number;
  difficulty: string;
  section: {
    id: string;
    title: string;
  };
}

// Question types
export interface CreateQuestionRequest {
  text: string;
  type: 'mcq' | 'short' | 'speaking' | 'listening' | 'nonverbal';
  timeLimitSeconds?: number;
  choices?: Array<{
    text: string;
    isCorrect: boolean;
  }>;
  metadata?: Record<string, any>;
}

export interface CreateQuestionsRequest {
  questions: CreateQuestionRequest[];
}

export interface QuestionResponse {
  id: string;
  text: string;
  type: string;
  timeLimitSeconds: number;
  choices?: Array<{
    id: string;
    text: string;
  }>;
  metadata?: Record<string, any>;
}

export interface QuestionsResponse {
  items: QuestionResponse[];
  page: number;
  limit: number;
  total: number;
}

// Response types
export interface SaveResponseRequest {
  userId?: string;
  questionId: string;
  answerText?: string;
  answerMediaUrl?: string;
}

export interface ResponseResponse {
  responseId: string;
  savedAt: string;
}

export interface GetResponsesRequest {
  userId?: string;
  assessmentId?: string;
}

export interface ResponseItem {
  questionId: string;
  answerText: string | null;
  answerMediaUrl: string | null;
  isCorrect: boolean | null;
  recordedAt: string;
}

// Submit types
export interface SubmitAssessmentRequest {
  userId?: string;
  responses: Array<{
    questionId: string;
    answerText?: string;
    answerMediaUrl?: string;
  }>;
}

export interface SubmitAssessmentResponse {
  resultId: string;
  score: number;
  total: number;
  details: {
    perQuestion: Array<{
      questionId: string;
      isCorrect: boolean;
      feedback?: string;
    }>;
  };
  submittedAt: string;
}

// Result types
export interface ResultResponse {
  userId: string;
  assessmentId: string;
  score: number;
  total: number;
  details: Record<string, any>;
  submittedAt: string;
}

// AI Generation types
export interface GenerateQuestionsRequest {
  topic: string;
  count: number;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'mcq' | 'short' | 'speaking' | 'listening' | 'nonverbal';
  style?: string;
  saveToAssessmentId?: string;
}

export interface GeneratedQuestion {
  text: string;
  type: string;
  choices?: Array<{
    text: string;
    isCorrect: boolean;
  }>;
  answer?: string;
}

export interface GenerateQuestionsResponse {
  items: GeneratedQuestion[];
  savedCount?: number;
}

// Rules types
export interface RulesResponse {
  sectionId: string;
  title: string;
  timeLimitSeconds: number;
  marksPerQuestion: number;
  guidelines: string[];
  helpNotes: string[];
}

// Upload types
export interface UploadResponse {
  url: string;
}

// Error types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}
