import { Request, Response } from 'express';
import { AIService } from '../services/aiService';
import { ResponseHelper } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export class AIController {
  // Generate questions using AI
  static async generateQuestions(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { topic, count, difficulty, type, style, saveToAssessmentId } = req.body;

      // Generate questions using AI
      const generatedQuestions = await AIService.generateQuestions({
        topic,
        count,
        difficulty,
        type,
        style
      });

      let savedCount: number | undefined;

      // Save to assessment if requested
      if (saveToAssessmentId) {
        savedCount = await AIService.saveQuestionsToAssessment(
          saveToAssessmentId,
          generatedQuestions
        );
      }

      ResponseHelper.success(res, {
        items: generatedQuestions,
        ...(savedCount !== undefined && { savedCount })
      }, 'Questions generated successfully');
    } catch (error) {
      console.error('Generate questions error:', error);
      ResponseHelper.error(res, (error as Error).message, 500);
    }
  }
}
