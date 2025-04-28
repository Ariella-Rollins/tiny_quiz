import { Router } from "express"
import { createQuiz, getQuizzes, deleteQuiz, updateQuiz  } from "../controllers/quiz.controller.js"

const quizRouter = Router()

// testing route
quizRouter.route('/all')
    .get( getQuizzes )

quizRouter.route('/')
    .post( createQuiz )
    .put (updateQuiz)
    .delete (deleteQuiz)

    // quizRouter.route("/upload")


export default quizRouter