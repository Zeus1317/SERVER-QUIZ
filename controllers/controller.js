import { Questions } from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questionsData, { answers } from '../database/data.js';

/** Get all questions */
export async function getQuestions(req, res) {
    try {
        const questions = await Questions.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error });
    }
}

/** Insert all questions */
export async function insertQuestions(req, res) {
    try {
        await Questions.insertMany(
            questionsData.map((question, index) => ({
                ...question,
                correctAnswer: answers[index],
                level: 1 // Default level for simplicity
            }))
        );
        res.json({ msg: "Data Saved Successfully...!" });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/** Delete all questions */
export async function dropQuestions(req, res) {
    try {
        await Questions.deleteMany();
        res.json({ msg: "Questions Deleted Successfully...!" });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/** Get all results */
export async function getResult(req, res) {
    try {
        const results = await Results.find();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error });
    }
}

/** Post all results */
export async function storeResult(req, res) {
    try {
        const { username, result, attempts, points, achieved } = req.body;
        if (!username || !result) throw new Error('Data Not Provided...!');

        await Results.create({ username, result, attempts, points, achieved });
        res.json({ msg: "Result Saved Successfully...!" });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/** Delete all results */
export async function dropResult(req, res) {
    try {
        await Results.deleteMany();
        res.json({ msg: "Results Deleted Successfully...!" });
    } catch (error) {
        res.status(500).json({ error });
    }
}
