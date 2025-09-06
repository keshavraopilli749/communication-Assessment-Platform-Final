import { Response } from 'express';
import { ApiResponse } from '../types';

export class ResponseHelper {
  static success<T>(res: Response, data: T, message?: string, statusCode: number = 200): void {
    const response: ApiResponse<T> = {
      success: true,
      data,
      ...(message && { message })
    };
    res.status(statusCode).json(response);
  }

  static error(res: Response, error: string, statusCode: number = 500): void {
    const response: ApiResponse = {
      error
    };
    res.status(statusCode).json(response);
  }

  static validationError(res: Response, errors: string[]): void {
    const response: ApiResponse = {
      error: 'Validation failed',
      data: { errors }
    };
    res.status(400).json(response);
  }

  static unauthorized(res: Response, message: string = 'Unauthorized'): void {
    const response: ApiResponse = {
      error: message
    };
    res.status(401).json(response);
  }

  static forbidden(res: Response, message: string = 'Forbidden'): void {
    const response: ApiResponse = {
      error: message
    };
    res.status(403).json(response);
  }

  static notFound(res: Response, message: string = 'Not found'): void {
    const response: ApiResponse = {
      error: message
    };
    res.status(404).json(response);
  }

  static conflict(res: Response, message: string = 'Conflict'): void {
    const response: ApiResponse = {
      error: message
    };
    res.status(409).json(response);
  }
}
