const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const User = require('../models/User');

// Get random questions for a level
router.get('/questions/:level', async (req, res) => {
    try {
        const level = parseInt(req.params.level);
        const questions = await Question.find({ level }).limit(10);
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching questions' });
    }
});

// Submit answers and update user progress
router.post('/submit', async (req, res) => {
    try {
        const { username, answers } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let correctCount = 0;
        for (const answer of answers) {
            const question = await Question.findById(answer.questionId);
            if (question.correctAnswer === answer.answer) {
                correctCount++;
            }
        }

        user.correctAnswers += correctCount;

        // Check if user qualifies for level-up
        const requiredCorrectAnswers = user.level * 10;
        if (user.correctAnswers >= requiredCorrectAnswers) {
            user.level++;
            user.correctAnswers = 0;
            // Check if user gets a badge
            if (user.level % 25 === 0) {
                user.badges.push(`Badge-${user.level}`);
            }
        }

        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error submitting answers' });
    }
});

module.exports = router;
