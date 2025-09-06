import { Router } from 'express';
import { ModuleController } from '../controllers/moduleController';

const router = Router();

// Get all modules
router.get('/', ModuleController.getModules);

// Get sections for a module
router.get('/:slug/sections', ModuleController.getModuleSections);

// Get section rules
router.get('/sections/:sectionId/rules', ModuleController.getSectionRules);

export default router;
