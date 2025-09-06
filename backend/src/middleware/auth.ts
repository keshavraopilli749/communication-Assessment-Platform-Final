import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '../types';
import { ResponseHelper } from '../utils/response';

const prisma = new PrismaClient();

// Verify JWT token
export const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      ResponseHelper.unauthorized(res, 'Access token required');
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; email: string; role: string };
    
    // Fetch user from database to ensure they still exist
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      ResponseHelper.unauthorized(res, 'User not found');
      return;
    }

    req.user = user as any;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      ResponseHelper.unauthorized(res, 'Invalid token');
      return;
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      ResponseHelper.unauthorized(res, 'Token expired');
      return;
    }

    console.error('Auth middleware error:', error);
    ResponseHelper.error(res, 'Authentication error');
  }
};

// Check if user is admin
export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'ADMIN') {
    ResponseHelper.forbidden(res, 'Admin access required');
    return;
  }
  next();
};

// Check if user is candidate
export const requireCandidate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'CANDIDATE') {
    ResponseHelper.forbidden(res, 'Candidate access required');
    return;
  }
  next();
};

// Optional authentication (doesn't fail if no token)
export const optionalAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; email: string; role: string };
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (user) {
        req.user = user as any;
      }
    }
    
    next();
  } catch (error) {
    // Continue without authentication for optional auth
    next();
  }
};
