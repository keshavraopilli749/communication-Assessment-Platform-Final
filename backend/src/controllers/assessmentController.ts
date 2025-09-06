import { Request, Response } from 'express';
import { AssessmentService } from '../services/assessmentService';
import { ResponseHelper } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export class AssessmentController {
  // Create assessment (Admin only)
  static async createAssessment(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const assessment = await AssessmentService.createAssessment(req.body, req.user!.id);
      ResponseHelper.success(res, { assessment }, 'Assessment created successfully', 201);
    } catch (error) {
      console.error('Create assessment error:', error);
      ResponseHelper.error(res, (error as Error).message, 400);
    }
  }

  // Get assessment by ID
  static async getAssessment(req: Request, res: Response): Promise<void> {
    try {
      const { assessmentId } = req.params;
      const assessment = await AssessmentService.getAssessmentById(assessmentId);

      if (!assessment) {
        ResponseHelper.notFound(res, 'Assessment not found');
        return;
      }

      ResponseHelper.success(res, {
        id: assessment.id,
        title: assessment.title,
        durationSeconds: assessment.durationSeconds,
        difficulty: assessment.difficulty,
        section: {
          id: assessment.section.id,
          title: assessment.section.title
        }
      }, 'Assessment retrieved successfully');
    } catch (error) {
      console.error('Get assessment error:', error);
      ResponseHelper.error(res, 'Failed to fetch assessment');
    }
  }

  // Add questions to assessment (Admin only)
  static async addQuestions(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { assessmentId } = req.params;
      const { questions } = req.body;

      const result = await AssessmentService.addQuestionsToAssessment(assessmentId, questions);
      ResponseHelper.success(res, result, 'Questions added successfully');
    } catch (error) {
      console.error('Add questions error:', error);
      ResponseHelper.error(res, (error as Error).message, 400);
    }
  }

  // Get assessment questions with pagination
  static async getAssessmentQuestions(req: Request, res: Response): Promise<void> {
    try {
      const { assessmentId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 1;

      const result = await AssessmentService.getAssessmentQuestions(assessmentId, page, limit);
      
      ResponseHelper.success(res, {
        items: result.items.map(item => ({
          id: item.id,
          text: item.text,
          type: item.type,
          timeLimitSeconds: item.timeLimitSeconds,
          choices: item.choices?.map(choice => ({
            id: choice.id,
            text: choice.text
          })),
          metadata: item.metadata
        })),
        page: result.page,
        limit: result.limit,
        total: result.total,
        section: result.section
      }, 'Questions retrieved successfully');
    } catch (error) {
      console.error('Get assessment questions error:', error);
      ResponseHelper.error(res, 'Failed to fetch questions');
    }
  }

  // Submit assessment
  static async submitAssessment(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { assessmentId } = req.params;
      const { userId, responses } = req.body;

      // Use userId from body or from token
      const submitUserId = userId || req.user!.id;

      const result = await AssessmentService.submitAssessment(
        assessmentId,
        submitUserId,
        responses
      );

      ResponseHelper.success(res, result, 'Assessment submitted successfully');
    } catch (error) {
      console.error('Submit assessment error:', error);
      ResponseHelper.error(res, (error as Error).message, 400);
    }
  }

  // Get assessment results
  static async getAssessmentResults(req: Request, res: Response): Promise<void> {
    try {
      const { assessmentId } = req.params;
      const { userId } = req.query;

      const result = await AssessmentService.getAssessmentResults(
        assessmentId,
        userId as string
      );

      if (!result) {
        ResponseHelper.notFound(res, 'Results not found');
        return;
      }

      ResponseHelper.success(res, result, 'Results retrieved successfully');
    } catch (error) {
      console.error('Get assessment results error:', error);
      ResponseHelper.error(res, 'Failed to fetch results');
    }
  }
}
