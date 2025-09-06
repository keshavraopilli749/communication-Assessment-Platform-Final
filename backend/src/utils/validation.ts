import { z } from 'zod';

// Auth validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export const registerSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

// Assessment validation schemas
export const createAssessmentSchema = z.object({
  sectionId: z.string().min(1, 'Section ID is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard'], {
    errorMap: () => ({ message: 'Difficulty must be easy, medium, or hard' })
  }),
  durationSeconds: z.number().int().positive('Duration must be a positive integer')
});

// Question validation schemas
export const choiceSchema = z.object({
  text: z.string().min(1, 'Choice text is required'),
  isCorrect: z.boolean()
});

export const createQuestionSchema = z.object({
  text: z.string().min(1, 'Question text is required'),
  type: z.enum(['mcq', 'short', 'speaking', 'listening', 'nonverbal'], {
    errorMap: () => ({ message: 'Type must be mcq, short, speaking, listening, or nonverbal' })
  }),
  timeLimitSeconds: z.number().int().positive().optional(),
  choices: z.array(choiceSchema).optional(),
  metadata: z.record(z.any()).optional()
});

export const createQuestionsSchema = z.object({
  questions: z.array(createQuestionSchema).min(1, 'At least one question is required')
});

// Response validation schemas
export const saveResponseSchema = z.object({
  userId: z.string().optional(),
  questionId: z.string().min(1, 'Question ID is required'),
  answerText: z.string().optional(),
  answerMediaUrl: z.string().url().optional()
});

export const submitAssessmentSchema = z.object({
  userId: z.string().optional(),
  responses: z.array(z.object({
    questionId: z.string().min(1, 'Question ID is required'),
    answerText: z.string().optional(),
    answerMediaUrl: z.string().url().optional()
  })).min(1, 'At least one response is required')
});

// AI Generation validation schemas
export const generateQuestionsSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
  count: z.number().int().min(1).max(50, 'Count must be between 1 and 50'),
  difficulty: z.enum(['easy', 'medium', 'hard'], {
    errorMap: () => ({ message: 'Difficulty must be easy, medium, or hard' })
  }),
  type: z.enum(['mcq', 'short', 'speaking', 'listening', 'nonverbal'], {
    errorMap: () => ({ message: 'Type must be mcq, short, speaking, listening, or nonverbal' })
  }),
  style: z.string().optional(),
  saveToAssessmentId: z.string().optional()
});

// Pagination validation
export const paginationSchema = z.object({
  page: z.string().transform(val => parseInt(val, 10)).refine(val => val > 0, 'Page must be positive'),
  limit: z.string().transform(val => parseInt(val, 10)).refine(val => val > 0 && val <= 100, 'Limit must be between 1 and 100')
});

// Validation helper function
export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      return { success: false, errors };
    }
    return { success: false, errors: ['Validation failed'] };
  }
}
