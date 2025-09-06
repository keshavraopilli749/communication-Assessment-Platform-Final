import { Router } from 'express';
import { AIController } from '../controllers/aiController';
import { requireAuth, requireAdmin } from '../middleware/auth';
import { validateBody } from '../middleware/validation';
import { generateQuestionsSchema } from '../utils/validation';
import { aiLimiter } from '../utils/rateLimiter';

const router = Router();

// Apply rate limiting to AI routes
router.use(aiLimiter);

// Generate questions using AI (Admin only)
router.post('/generate-questions',
  requireAuth,
  requireAdmin,
  validateBody(generateQuestionsSchema),
  AIController.generateQuestions
);

export default router;
