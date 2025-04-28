import axios from 'axios'

const UPLOAD_INSTANCE = axios.create({
    baseURL : 'http://localhost:8000/v1/upload',
    withCredentials: true //to send cookie/jwt with each request if available
})

export const addPic = async (req, res) => {
    try {
        console.log("pic req", req)
        const RES = await UPLOAD_INSTANCE.post('/', req, {
            headers: { 'Content-Type': 'multipart/form-data' },
            });
        console.log("PIC RES", RES)
        return RES
    } catch( error ){ throw error }
}

