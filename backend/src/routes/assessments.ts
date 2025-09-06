import { Router } from 'express';
import { AssessmentController } from '../controllers/assessmentController';
import { requireAuth, requireAdmin } from '../middleware/auth';
import { validateBody, validateQuery } from '../middleware/validation';
import { createAssessmentSchema, createQuestionsSchema, paginationSchema } from '../utils/validation';

const router = Router();

// Create assessment (Admin only)
router.post('/',
  requireAuth,
  requireAdmin,
  validateBody(createAssessmentSchema),
  AssessmentController.createAssessment
);

// Get assessment by ID
router.get('/:assessmentId',
  AssessmentController.getAssessment
);

// Add questions to assessment (Admin only)
router.post('/:assessmentId/questions',
  requireAuth,
  requireAdmin,
  validateBody(createQuestionsSchema),
  AssessmentController.addQuestions
);

// Get assessment questions with pagination
router.get('/:assessmentId/questions',
  validateQuery(paginationSchema),
  AssessmentController.getAssessmentQuestions
);

// Submit assessment
router.post('/:assessmentId/submit',
  requireAuth,
  AssessmentController.submitAssessment
);

// Get assessment results
router.get('/:assessmentId/results',
  AssessmentController.getAssessmentResults
);

export default router;
