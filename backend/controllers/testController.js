import asyncHandler from 'express-async-handler';
import Question from '../models/Question.js';
import TestResult from '../models/TestResult.js';

// @desc    Get questions by category
// @route   GET /api/test/questions?category=React
// @access  Private
const getQuestions = asyncHandler(async (req, res) => {
  const category = req.query.category;

  let query = {};
  if (category) {
    query.category = category;
  }

  // In a real scenario, we might want to fetch a random subset
  const questions = await Question.find(query).limit(20);

  res.json(questions);
});

// @desc    Submit a test and get results
// @route   POST /api/test/submit
// @access  Private
const submitTest = asyncHandler(async (req, res) => {
  const { category, answers } = req.body;
  // answers format expected: [{ questionId: '...', selectedOption: 1 }, ...]

  if (!answers || answers.length === 0) {
    res.status(400);
    throw new Error('No answers provided');
  }

  const questionIds = answers.map(a => a.questionId);
  const questions = await Question.find({ _id: { $in: questionIds } });
  
  const questionMap = {};
  questions.forEach(q => {
    questionMap[q._id.toString()] = q;
  });

  let correctCount = 0;
  const processedAnswers = [];
  const weakAreasSet = new Set();

  for (const answer of answers) {
    const question = questionMap[answer.questionId.toString()];
    if (!question) continue;

    const isCorrect = question.correctAnswer === answer.selectedOption;
    if (isCorrect) {
      correctCount++;
    } else {
      weakAreasSet.add(question.category);
    }

    processedAnswers.push({
      questionId: question._id,
      selectedOption: answer.selectedOption,
      isCorrect,
    });
  }

  const score = Math.round((correctCount / answers.length) * 100);
  const weakAreas = Array.from(weakAreasSet);

  const testResult = await TestResult.create({
    userId: req.user._id,
    category: category || 'General',
    score,
    totalQuestions: answers.length,
    answers: processedAnswers,
    weakAreas,
  });

  res.status(201).json(testResult);
});

// @desc    Get logged in user's test results
// @route   GET /api/test/results
// @access  Private
const getResults = asyncHandler(async (req, res) => {
  const results = await TestResult.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(results);
});

export { getQuestions, submitTest, getResults };
