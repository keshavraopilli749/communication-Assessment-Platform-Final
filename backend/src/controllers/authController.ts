import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { ResponseHelper } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export class AuthController {
  // Register new user
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const result = await AuthService.register(req.body);
      ResponseHelper.success(res, result, 'User registered successfully', 201);
    } catch (error) {
      console.error('Registration error:', error);
      ResponseHelper.error(res, (error as Error).message, 400);
    }
  }

  // Login user
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const result = await AuthService.login(req.body);
      ResponseHelper.success(res, result, 'Login successful');
    } catch (error) {
      console.error('Login error:', error);
      ResponseHelper.error(res, (error as Error).message, 401);
    }
  }

  // Get current user profile
  static async getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      ResponseHelper.success(res, { user: req.user }, 'Profile retrieved successfully');
    } catch (error) {
      console.error('Get profile error:', error);
      ResponseHelper.error(res, 'Failed to get user profile');
    }
  }

  // Change password
  static async changePassword(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        ResponseHelper.error(res, 'Current password and new password are required', 400);
        return;
      }

      if (newPassword.length < 6) {
        ResponseHelper.error(res, 'New password must be at least 6 characters long', 400);
        return;
      }

      await AuthService.changePassword(req.user!.id, currentPassword, newPassword);
      ResponseHelper.success(res, null, 'Password changed successfully');
    } catch (error) {
      console.error('Change password error:', error);
      ResponseHelper.error(res, (error as Error).message, 400);
    }
  }

  // Logout (client-side token removal)
  static async logout(req: AuthenticatedRequest, res: Response): Promise<void> {
    ResponseHelper.success(res, null, 'Logout successful');
  }
}
