import Quiz from "../models/quiz.model.js"


export const getQuizzes = async(req, res) => {
    try {
        const quizzes = await Quiz.find().sort({ timestamp: -1 })
        res.status(200).json(quizzes)
    } catch (error){ res.status(400).json(error) }
}


export const createQuiz = async(req, res) => {
    try {
        const quiz = await Quiz.create(req.body)
        res.status(201).json( quiz )
    } catch (err){ 
        if (err.name === 'ValidationError') {
            // Sends back errors in a flat object
            const errors = {};
            for (const field in err.errors) {
            errors[field] = err.errors[field].message;
            }
            return res.status(400).json({ errors });
        }
        res.status(500).json({ message: 'Server error' });
        }
}

export const updateQuiz = async (req, res) => {
    const options = {
        new: true,
        runValidators: true,
    };
    try {
        const editedQuiz = await Quiz.findByIdAndUpdate(
            req.body._id,
            req.body,
            options
        );
        res.status(200).json(editedQuiz);}
        catch (err){ 
            if (err.name === 'ValidationError') {
                // Sends back errors in a flat object
                const errors = {};
                for (const field in err.errors) {
                errors[field] = err.errors[field].message;
                }
                return res.status(400).json({ errors });
            }
            res.status(500).json({ message: 'Server error' });
            }
}


export const deleteQuiz = async (req, res) => {
    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(req.body._id)
        if (!deletedQuiz) {
            return res.status(404).json({ message: 'quiz not found.' })
        }
        res.status(200).json(deletedQuiz)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}