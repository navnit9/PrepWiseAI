import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['React', 'DSA', 'Node', 'Frontend', 'Backend'],
    },
    options: {
      type: [String],
      required: true,
      validate: [arrayLimit, '{PATH} must have exactly 4 options'],
    },
    correctAnswer: {
      type: Number, // Index of the correct option (0-3)
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
  },
  {
    timestamps: true,
  }
);

function arrayLimit(val) {
  return val.length === 4;
}

const Question = mongoose.model('Question', questionSchema);

export default Question;
