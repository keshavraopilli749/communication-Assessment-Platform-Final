import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { requireAuth } from '../middleware/auth';
import { validateBody } from '../middleware/validation';
import { loginSchema, registerSchema } from '../utils/validation';
import { authLimiter } from '../utils/rateLimiter';

const router = Router();

// Apply rate limiting to auth routes
router.use(authLimiter);

// Register new user
router.post('/register', 
  validateBody(registerSchema),
  AuthController.register
);

// Login user
router.post('/login',
  validateBody(loginSchema),
  AuthController.login
);

// Get current user profile
router.get('/me',
  requireAuth,
  AuthController.getProfile
);

// Change password
router.put('/change-password',
  requireAuth,
  AuthController.changePassword
);

// Logout (client-side token removal)
router.post('/logout',
  requireAuth,
  AuthController.logout
);

export default router;
