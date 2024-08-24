import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
    level: { type: Number, required: true },
});

export const Questions = mongoose.model('Questions', questionSchema);
