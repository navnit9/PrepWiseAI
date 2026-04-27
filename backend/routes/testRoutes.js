import express from 'express';
import { getQuestions, submitTest, getResults } from '../controllers/testController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/questions', protect, getQuestions);
router.post('/submit', protect, submitTest);
router.get('/results', protect, getResults);

export default router;
