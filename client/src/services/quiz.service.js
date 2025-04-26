import axios from 'axios'

const QUIZ_INSTANCE = axios.create({
    baseURL : 'http://localhost:8000/v1/quiz',
    withCredentials: true //to send cookie/jwt with each request if available
})

export const createQuiz = async (req, res) => {
    try {
        console.log("req", req)
        const RES = await QUIZ_INSTANCE.post('/', req )
        console.log("RES", RES)
        return RES
    } catch( error ){ throw error }
}

export const getAllQuizzes = async () => {
    try {
        const RES = await QUIZ_INSTANCE.get( '/all' )
        return RES.data
    } catch( error ){ throw error }
}

export const updateQuiz = async (req, res) => {
    const options = {
        new: true,
        runValidators: true,
    };
    try {
        const RES = await QUIZ_INSTANCE.put( '/', req)
        return RES.data}
        catch( error ){ throw error }
}

export const deleteQuiz = async (id) => {
    try {
        const RES = await QUIZ_INSTANCE.delete( '/', {data: {_id: id} } ) // delete info needs to be wrapped in data
        return RES.data
    } catch( error ){ throw error }
}

