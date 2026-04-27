import asyncHandler from 'express-async-handler';
import OpenAI from 'openai';

// Initialize OpenAI conditionally, it will fail if key is missing when methods are called
let openai;
try {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} catch (error) {
  console.log("OpenAI initialization skipped or failed. API key might be missing.");
}

// @desc    Generate interview questions using AI
// @route   POST /api/ai/generate
// @access  Private
const generateQuestions = asyncHandler(async (req, res) => {
  const { role, difficulty } = req.body;

  if (!openai) {
    res.status(500);
    throw new Error('OpenAI API is not configured');
  }

  const prompt = `Generate 3 technical interview questions for a ${difficulty} level ${role} developer position. Format the output as a JSON array of objects, where each object has a 'question' string and an 'expectedAnswer' string.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    // Handle string content that might be nested or pure JSON
    const content = response.choices[0].message.content;
    const data = JSON.parse(content);
    
    // In case the root is an object containing an array, try to extract it
    const questionsList = Array.isArray(data) ? data : (data.questions || Object.values(data)[0]);

    res.json(questionsList);
  } catch (error) {
    res.status(500);
    throw new Error('Failed to generate questions: ' + error.message);
  }
});

// @desc    Evaluate a user's answer
// @route   POST /api/ai/evaluate
// @access  Private
const evaluateAnswer = asyncHandler(async (req, res) => {
  const { question, userAnswer } = req.body;

  if (!openai) {
    res.status(500);
    throw new Error('OpenAI API is not configured');
  }

  const prompt = `You are an expert technical interviewer. Evaluate the following user answer to the interview question.
  
  Question: "${question}"
  User's Answer: "${userAnswer}"
  
  Provide your evaluation in JSON format with two keys:
  - 'feedback': A brief string assessing if the answer is correct and complete.
  - 'improvementSuggestions': A string containing specific ways the user can improve their answer.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    const evaluation = JSON.parse(content);

    res.json(evaluation);
  } catch (error) {
    res.status(500);
    throw new Error('Failed to evaluate answer: ' + error.message);
  }
});

export { generateQuestions, evaluateAnswer };
