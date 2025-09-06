import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ResponseHelper } from '../utils/response';

const prisma = new PrismaClient();

export class ModuleController {
  // Get all modules
  static async getModules(req: Request, res: Response): Promise<void> {
    try {
      const modules = await prisma.module.findMany({
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          icon: true
        },
        orderBy: { createdAt: 'asc' }
      });

      ResponseHelper.success(res, modules, 'Modules retrieved successfully');
    } catch (error) {
      console.error('Get modules error:', error);
      ResponseHelper.error(res, 'Failed to fetch modules');
    }
  }

  // Get sections for a module
  static async getModuleSections(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;

      // Find module by slug
      const module = await prisma.module.findUnique({
        where: { slug },
        select: { id: true }
      });

      if (!module) {
        ResponseHelper.notFound(res, 'Module not found');
        return;
      }

      const sections = await prisma.section.findMany({
        where: { moduleId: module.id },
        select: {
          id: true,
          title: true,
          description: true,
          questionCount: true,
          timeLimitSeconds: true
        },
        orderBy: { createdAt: 'asc' }
      });

      ResponseHelper.success(res, sections, 'Sections retrieved successfully');
    } catch (error) {
      console.error('Get module sections error:', error);
      ResponseHelper.error(res, 'Failed to fetch sections');
    }
  }

  // Get section rules
  static async getSectionRules(req: Request, res: Response): Promise<void> {
    try {
      const { sectionId } = req.params;

      const section = await prisma.section.findUnique({
        where: { id: sectionId },
        select: {
          id: true,
          title: true,
          timeLimitSeconds: true
        }
      });

      if (!section) {
        ResponseHelper.notFound(res, 'Section not found');
        return;
      }

      // Default rules structure - can be customized per section
      const rules = {
        sectionId: section.id,
        title: section.title,
        timeLimitSeconds: section.timeLimitSeconds,
        marksPerQuestion: 1,
        guidelines: [
          'Read each question carefully before answering',
          'Ensure your answers are clear and concise',
          'For speaking questions, speak clearly and at a moderate pace',
          'For listening questions, listen to the audio carefully',
          'For nonverbal questions, observe the visual cues carefully'
        ],
        helpNotes: [
          'You can navigate between questions using the navigation buttons',
          'Your progress is automatically saved',
          'You can review your answers before submitting',
          'Contact support if you encounter any technical issues'
        ]
      };

      ResponseHelper.success(res, rules, 'Section rules retrieved successfully');
    } catch (error) {
      console.error('Get section rules error:', error);
      ResponseHelper.error(res, 'Failed to fetch section rules');
    }
  }
}
