import { PrismaClient } from '@prisma/client';
import { CreateAssessmentRequest, CreateQuestionRequest } from '../types';

const prisma = new PrismaClient();

export class AssessmentService {
  // Create assessment
  static async createAssessment(data: CreateAssessmentRequest, createdById: string) {
    return await prisma.assessment.create({
      data: {
        ...data,
        createdById
      },
      include: {
        section: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });
  }

  // Get assessment by ID
  static async getAssessmentById(assessmentId: string) {
    return await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        section: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });
  }

  // Get questions for assessment with pagination
  static async getAssessmentQuestions(
    assessmentId: string, 
    page: number = 1, 
    limit: number = 1
  ) {
    const skip = (page - 1) * limit;

    // First verify the assessment exists and get section info
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        section: {
          select: {
            id: true,
            title: true,
            moduleId: true
          }
        }
      }
    });

    if (!assessment) {
      throw new Error('Assessment not found');
    }

    const [questions, total] = await Promise.all([
      prisma.question.findMany({
        where: { assessmentId },
        include: {
          choices: {
            select: {
              id: true,
              text: true
            }
          }
        },
        orderBy: { createdAt: 'asc' },
        skip,
        take: limit
      }),
      prisma.question.count({
        where: { assessmentId }
      })
    ]);

    return {
      items: questions,
      page,
      limit,
      total,
      section: assessment.section
    };
  }

  // Add questions to assessment
  static async addQuestionsToAssessment(
    assessmentId: string, 
    questions: CreateQuestionRequest[]
  ) {
    let createdCount = 0;

    for (const questionData of questions) {
      // Create question
      const question = await prisma.question.create({
        data: {
          assessmentId,
          text: questionData.text,
          type: questionData.type as any,
          timeLimitSeconds: questionData.timeLimitSeconds || 60,
          metadata: questionData.metadata || null,
          answerKey: null
        }
      });

      // Create choices for MCQ questions
      if (questionData.type === 'mcq' && questionData.choices) {
        for (const choice of questionData.choices) {
          await prisma.choice.create({
            data: {
              questionId: question.id,
              text: choice.text,
              isCorrect: choice.isCorrect
            }
          });
        }
      }

      createdCount++;
    }

    return { createdCount };
  }

  // Submit assessment and calculate results
  static async submitAssessment(
    assessmentId: string,
    userId: string,
    responses: Array<{
      questionId: string;
      answerText?: string;
      answerMediaUrl?: string;
    }>
  ) {
    // Check if assessment exists
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        questions: {
          include: {
            choices: true
          }
        }
      }
    });

    if (!assessment) {
      throw new Error('Assessment not found');
    }

    // Check if user already submitted
    const existingResult = await prisma.result.findUnique({
      where: {
        userId_assessmentId: {
          userId,
          assessmentId
        }
      }
    });

    if (existingResult) {
      throw new Error('Assessment already submitted');
    }

    // Validate that all questions have responses
    if (responses.length !== assessment.questions.length) {
      throw new Error('All questions must be answered before submission');
    }

    // Validate that each response has either answerText or answerMediaUrl
    for (const response of responses) {
      if (!response.answerText && !response.answerMediaUrl) {
        throw new Error('Each question must have an answer before submission');
      }
    }

    let totalScore = 0;
    let totalQuestions = assessment.questions.length;
    const perQuestionDetails: Array<{
      questionId: string;
      isCorrect: boolean;
      feedback?: string;
    }> = [];

    // Process each response
    for (const response of responses) {
      const question = assessment.questions.find(q => q.id === response.questionId);
      if (!question) continue;

      let isCorrect = false;
      let feedback = '';

      // Auto-grade MCQ questions
      if (question.type === 'mcq') {
        const correctChoice = question.choices.find(c => c.isCorrect);
        if (correctChoice && response.answerText === correctChoice.id) {
          isCorrect = true;
          feedback = 'Correct answer';
          totalScore += 1;
        } else {
          feedback = 'Incorrect answer';
        }
      } else {
        // For non-MCQ questions, mark as not auto-graded
        isCorrect = false;
        feedback = 'Requires manual grading';
      }

      // Save or update response
      await prisma.response.upsert({
        where: {
          userId_questionId: {
            userId,
            questionId: response.questionId
          }
        },
        update: {
          answerText: response.answerText,
          answerMediaUrl: response.answerMediaUrl,
          isCorrect
        },
        create: {
          userId,
          questionId: response.questionId,
          answerText: response.answerText,
          answerMediaUrl: response.answerMediaUrl,
          isCorrect
        }
      });

      perQuestionDetails.push({
        questionId: response.questionId,
        isCorrect,
        feedback
      });
    }

    // Calculate final score
    const finalScore = totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 0;

    // Create result
    const result = await prisma.result.create({
      data: {
        userId,
        assessmentId,
        score: finalScore,
        total: 100,
        details: {
          perQuestion: perQuestionDetails
        }
      }
    });

    return {
      resultId: result.id,
      score: finalScore,
      total: 100,
      details: {
        perQuestion: perQuestionDetails
      },
      submittedAt: result.submittedAt.toISOString()
    };
  }

  // Get assessment results
  static async getAssessmentResults(assessmentId: string, userId?: string) {
    const where: any = { assessmentId };
    if (userId) {
      where.userId = userId;
    }

    const result = await prisma.result.findFirst({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!result) {
      return null;
    }

    return {
      userId: result.userId,
      assessmentId: result.assessmentId,
      score: result.score,
      total: result.total,
      details: result.details,
      submittedAt: result.submittedAt.toISOString()
    };
  }
}
