import { Router } from 'express';
import { ResponseController } from '../controllers/responseController';
import { requireAuth } from '../middleware/auth';
import { validateBody, validateQuery } from '../middleware/validation';
import { saveResponseSchema } from '../utils/validation';
import { z } from 'zod';

const router = Router();

// Save or update response
router.post('/',
  requireAuth,
  validateBody(saveResponseSchema),
  ResponseController.saveResponse
);

// Get responses for user and assessment
router.get('/',
  requireAuth,
  validateQuery(z.object({
    userId: z.string().optional(),
    assessmentId: z.string().optional()
  })),
  ResponseController.getResponses
);

export default router;
