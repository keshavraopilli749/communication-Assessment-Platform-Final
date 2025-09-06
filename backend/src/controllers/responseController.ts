import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ResponseHelper } from '../utils/response';
import { AuthenticatedRequest } from '../types';

const prisma = new PrismaClient();

export class ResponseController {
  // Save or update response
  static async saveResponse(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { userId, questionId, answerText, answerMediaUrl } = req.body;

      // Use userId from body or from token
      const responseUserId = userId || req.user!.id;

      // Check if question exists
      const question = await prisma.question.findUnique({
        where: { id: questionId }
      });

      if (!question) {
        ResponseHelper.notFound(res, 'Question not found');
        return;
      }

      // Save or update response
      const response = await prisma.response.upsert({
        where: {
          userId_questionId: {
            userId: responseUserId,
            questionId
          }
        },
        update: {
          answerText,
          answerMediaUrl
        },
        create: {
          userId: responseUserId,
          questionId,
          answerText,
          answerMediaUrl
        }
      });

      ResponseHelper.success(res, {
        responseId: response.id,
        savedAt: response.recordedAt.toISOString()
      }, 'Response saved successfully');
    } catch (error) {
      console.error('Save response error:', error);
      ResponseHelper.error(res, 'Failed to save response');
    }
  }

  // Get responses for user and assessment
  static async getResponses(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { userId, assessmentId } = req.query;

      // Use userId from query or from token
      const responseUserId = (userId as string) || req.user!.id;

      // Check if user is admin or accessing their own responses
      if (req.user!.role !== 'ADMIN' && req.user!.id !== responseUserId) {
        ResponseHelper.forbidden(res, 'Access denied');
        return;
      }

      let whereClause: any = {
        userId: responseUserId
      };

      // If assessmentId is provided, filter by questions in that assessment
      if (assessmentId) {
        const questions = await prisma.question.findMany({
          where: { assessmentId: assessmentId as string },
          select: { id: true }
        });

        whereClause.questionId = {
          in: questions.map(q => q.id)
        };
      }

      const responses = await prisma.response.findMany({
        where: whereClause,
        select: {
          questionId: true,
          answerText: true,
          answerMediaUrl: true,
          isCorrect: true,
          recordedAt: true
        },
        orderBy: { recordedAt: 'desc' }
      });

      ResponseHelper.success(res, responses, 'Responses retrieved successfully');
    } catch (error) {
      console.error('Get responses error:', error);
      ResponseHelper.error(res, 'Failed to fetch responses');
    }
  }
}
