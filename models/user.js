import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    level: { type: Number, default: 1 },
    correctAnswers: { type: Number, default: 0 },
    badges: [String],
});

export const User = mongoose.model('User', userSchema);
