import mongoose from "mongoose"

// Define a schema for our Quiz model
const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'All fields required'],
        minLength: [5, `Quiz name must be at least 5 characters!`],
        maxLength: [30, `Quiz name cannnot exceed 30 characters!`],
    },
    creator_id: {
        type: String,
        required: [false]
    },
    pic:{
        type: String,
        required: [false]
    },
    q1: {
        type: String,
        required: [true, 'All fields required'],
        minLength: [5, `Questions must be at least 5 characters!`],
        maxLength: [50, `Questions cannot exceed 50 characters!`]
    },
    q1a: {
        type: String,
        required: [true, 'All fields required'],
        maxLength: [50, `Answers cannot exceed 50 characters!`]
    },
    q1b: {
        type: String,
        required: [true, 'All fields required'],
        maxLength: [50, `Answers cannot exceed 50 characters!`]
    },
    q1c: {
        type: String,
        required: [true, 'All fields required'],
        maxLength: [50, `Answers cannot exceed 50 characters!`]
    },
    q1d: {
        type: String,
        required: [true, 'All fields required'],
        maxLength: [50, `Answers cannot exceed 50 characters!`]
    },
    q1answer:{
        type: String,
        required: [true, 'All fields required'],
    },

    q2: {
        type: String,
        required: [true, 'All fields required'],
        minLength: [5, `Questions must be at least 5 characters!`],
        maxLength: [50, `Questions cannot exceed 50 characters!`]
    },
    q2a: {
        type: String,
        required: [true, 'All fields required'],
        maxLength: [50, `Answers cannot exceed 50 characters!`]
    },
    q2b: {
        type: String,
        required: [true, 'All fields required'],
        maxLength: [50, `Answers cannot exceed 50 characters!`]
    },
    q2c: {
        type: String,
        required: [true, 'All fields required'],
        maxLength: [50, `Answers cannot exceed 50 characters!`]
    },
    q2d: {
        type: String,
        required: [true, 'All fields required'],
        maxLength: [50, `Answers cannot exceed 50 characters!`]
    },
    q2answer: {
        type: String,
        required: [true, 'All fields required'],
    },

    q3: {
        type: String,
        required: [true, 'All fields required'],
        minLength: [5, `Questions must be at least 5 characters!`],
        maxLength: [50, `Questions cannot exceed 50 characters!`]
    },
    q3a: {
        type: String,
        required: [true, 'All fields required'],
        maxLength: [50, `Answers cannot exceed 50 characters!`]
    },
    q3b: {
        type: String,
        required: [true, 'All fields required'],
        maxLength: [50, `Answers cannot exceed 50 characters!`]
    },
    q3c: {
        type: String,
        required: [true, 'All fields required'],
        maxLength: [50, `Answers cannot exceed 50 characters!`]
    },
    q3d: {
        type: String,
        required: [true, 'All fields required'],
        maxLength: [50, `Answers cannot exceed 50 characters!`]
    },
    q3answer:{
        type: String,
        required: [true, 'All fields required']
    },

    q4: {
        type: String,
        required: [true, 'All fields required'],
        minLength: [5, `Questions must be at least 5 characters!`],
        maxLength: [50, `Questions cannot exceed 50 characters!`]
    },
    q4a: {
        type: String,
        required: [true, 'All fields required'],
        maxLength: [50, `Answers cannot exceed 50 characters!`]
    },
    q4b: {
        type: String,
        required: [true, 'All fields required'],
        maxLength: [50, `Answers cannot exceed 50 characters!`]
    },
    q4c: {
        type: String,
        required: [true, 'All fields required'],
        maxLength: [50, `Answers cannot exceed 50 characters!`]
    },
    q4d: {
        type: String,
        required: [true, 'All fields required'],
        maxLength: [50, `Answers cannot exceed 50 characters!`]
    },
    q4answer:{
        type: String,
        required: [true, 'All fields required'],
    },

    q5: {
        type: String,
        required: [true, 'All fields required'],
        minLength: [5, `Questions must be at least 5 characters!`],
        maxLength: [50, `Questions cannot exceed 50 characters!`]
    },
    q5a: {
        type: String,
        required: [true, 'All fields required'],
        maxLength: [50, `Answers cannot exceed 50 characters!`]
    },
    q5b: {
        type: String,
        required: [true, 'All fields required'],
        maxLength: [50, `Answers cannot exceed 50 characters!`]
    },
    q5c: {
        type: String,
        required: [true, 'All fields required'],
        maxLength: [50, `Answers cannot exceed 50 characters!`]
    },
    q5d: {
        type: String,
        required: [true, 'All fields required'],
        maxLength: [50, `Answers cannot exceed 50 characters!`]
    },
    q5answer:{
        type: String,
        required: [true, 'All fields required'],
    }
    
}, { timestamps: true });


// Create the Quiz model from the schema
const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
