import axios from 'axios'

const USER_INSTANCE = axios.create({
    baseURL : 'http://localhost:8000/v1/user',
    withCredentials: true //to send cookie/jwt with each request if available
})

export const register = async data => {
    try {
        const RES = await USER_INSTANCE.post('/', data )
        return RES
    } catch( error ){
        throw error.response.data.errors }
}

export const loginServer = async data => {
    try {
        const RES = await USER_INSTANCE.post('/login', data )
        return RES.data._id
    } catch( error ){ throw error.response.data }
}

export const logout = async () => {
    try {
        const RES = await USER_INSTANCE.post( '/logout' )
        return RES
    } catch( error ){ throw error }
}


export const getUser = async (id) => {
    try {
        const RES = await USER_INSTANCE.post( '/logins', { _id: id } )
        return RES.data
    } catch( error ){ throw error }
}


export const getAllUsers = async () => {
    try {
        const RES = await USER_INSTANCE.get( '/' )
        return RES.data
    } catch( error ){ throw error }
}

export const updateUserBio = async (req, res) => {
    const options = {
        new: true,
        runValidators: true,
    };
    try {
        const RES = await USER_INSTANCE.put( '/all', req )
        return RES.data
    } 
    catch( error ){
        throw error.response.data.errors}
}

export const deleteUser = async (id) => {
    try {
        const RES = await USER_INSTANCE.delete( '/all', {data: {_id: id} } ) // delete info needs to be wrapped in data
        return RES.data
    } catch( error ){ throw error }
}