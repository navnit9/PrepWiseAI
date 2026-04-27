import express from 'express';
import { generateQuestions, evaluateAnswer } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', protect, generateQuestions);
router.post('/evaluate', protect, evaluateAnswer);

export default router;
