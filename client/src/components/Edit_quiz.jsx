import { useLogin } from '../context/UserContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { updateQuiz } from '../services/quiz.service'
import { useEffect } from 'react'
import { addPic } from '../services/upload.service'

export const Edit_quiz = ({allQuizzes}) => {
    const navigate = useNavigate()
    const { isLoggedIn, logout:userLogout, setLoggedInData, loggedInData } = useLogin()
    const [errors, setErrors] = useState({})
    const [quiz, setQuiz] = useState({})
    const [data, setData] = useState({})
    const [file, setFile] = useState(null);

    const {id} = useParams()
    
    // only logged in users can edit quizzes!
    useEffect(()=> {
        if (!isLoggedIn) {
            navigate("/")
        }
    },[isLoggedIn])

    //get quiz info (to auto-fill form)
    const getQuiz = async() => {
        try {
            const oneQuiz = allQuizzes.find((one)=> one._id == id)
            if (oneQuiz){
                console.log("found")
                setQuiz(oneQuiz)
            }
        }
        catch (error) {
            console.log(error)
        }
        console.log("quiz in funct", quiz)
}

    useEffect(()=> {
        getQuiz()
        console.log("quiz in useeffect", quiz)
        setData(quiz)
    }, [quiz])


    async function editQuiz (e) {
        e.preventDefault()
        let quizData = {...data, pic: null}
        
        if (file) {
            const imagePath = await handleUpload(file)
            if (imagePath) {
                quizData.pic = imagePath;
                console.log("quiz data 2", quizData)
            }}
            updateQuiz(quizData)
                .then(() => {
                   navigate("/"); // Redirect after quiz is updated
                })
                .catch((err) => {
                    if (err.response?.data?.errors) {
                        setErrors(err.response.data.errors);
                    }
                })
            
    }
    
    function changeHandler(e) {
        setData((prev)=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', file);
        // "try" makes it return a promise so the .then (which catches the promise) after handleupload() won't throw an error
        try {
            const res = await addPic(formData)
            console.log('Uploaded Image Path:', res.data.imagePath);
            return res.data.imagePath
        }
        catch (error) {
        console.log("error!", error)
        return null
        }
        }
    
    return (
        Object.keys(quiz).length == 0 ?
        <p>Loading...</p>:
        <>
        <form className='quiz-form' onSubmit={editQuiz}>
            <div className="create-quiz-con">
                <h1 className='whatAreWeMaking'>Edit {quiz.name}</h1>
                <label className="q-label">Quiz name</label>
                <input type="text" name="name" className='question' value={data.name} onChange={changeHandler}></input>
                <label className="q-label">Question 1</label>
                <input className="question" type="text" name="q1" id="q1" value={data.q1} onChange={changeHandler}/>
                    <label>Answer a</label>
                    <input type="text" name="q1a" id="q1a" value={data.q1a} onChange={changeHandler} />
                    <label>Answer b</label>
                    <input type="text" name="q1b" id="q1b" value={data.q1b} onChange={changeHandler} />
                    <label>Answer c</label>
                    <input type="text" name="q1c" id="q1c" value={data.q1c} onChange={changeHandler}/>
                    <label>Answer d</label>
                    <input type="text" name="q1d" id="q1d" value={data.q1d} onChange={changeHandler}/>
                    <label>Correct answer</label>
                    <select name="q1answer" value={data.q1answer} onChange={changeHandler}>
                        <option value="">Pick one</option>
                        <option name="1a" value="q1a">Answer a</option>
                        <option name="1b" value="q1b"> Answer b</option>
                        <option name="1c" value="q1c"> Answer c</option>
                        <option name="1d" value="q1d">Answer d</option>
                    </select>

                <label className="q-label">Question 2</label>
                <input className="question" type="text" name="q2" id="q2" value={data.q2} onChange={changeHandler} />
                    <label>Answer a</label>
                    <input type="text" name="q2a" id="q2a" value={data.q2a} onChange={changeHandler} />
                    <label>Answer b</label>
                    <input type="text" name="q2b" id="q2b" value={data.q2b} onChange={changeHandler}/>
                    <label>Answer c</label>
                    <input type="text" name="q2c" id="q2c" value={data.q2c} onChange={changeHandler}/>
                    <label>Answer d</label>
                    <input type="text" name="q2d" id="q2d" value={data.q2d} onChange={changeHandler}/>
                    <label>Correct answer</label>
                    <select name="q2answer" value={data.q2answer} onChange={changeHandler}>
                        <option value="">Pick one</option>
                        <option name="2a" value="q2a">Answer a</option>
                        <option name="2b" value="q2b"> Answer b</option>
                        <option name="2c" value="q2c"> Answer c</option>
                        <option name="2d" value="q2d">Answer d</option>
                    </select>

                <label className="q-label">Question 3</label>
                <input className="question" type="text" name="q3" id="q3" value={data.q3} onChange={changeHandler} />
                    <label>Answer a</label>
                    <input type="text" name="q3a" id="q3a" value={data.q3a} onChange={changeHandler} />
                    <label>Answer b</label>
                    <input type="text" name="q3b" id="q3b" value={data.q3b} onChange={changeHandler}/>
                    <label>Answer c</label>
                    <input type="text" name="q3c" id="q3c" value={data.q3c} onChange={changeHandler}/>
                    <label>Answer d</label>
                    <input type="text" name="q3d" id="q3d" value={data.q3d} onChange={changeHandler}/>
                    <label>Correct answer</label>
                    <select name="q3answer" value={data.q3answer} onChange={changeHandler}>
                        <option value="">Pick one</option>
                        <option name="3a" value="q3a">Answer a</option>
                        <option name="3b" value="q3b"> Answer b</option>
                        <option name="3c" value="q3c"> Answer c</option>
                        <option name="3d" value="q3d">Answer d</option>
                    </select>

                <label className="q-label">Question 4</label>
                <input className="question" type="text" name="q4" id="q4" value={data.q4} onChange={changeHandler}/>
                    <label>Answer a</label>
                    <input type="text" name="q4a" id="q4a" value={data.q4a} onChange={changeHandler}/>
                    <label>Answer b</label>
                    <input type="text" name="q4b" id="q4b" value={data.q4b} onChange={changeHandler}/>
                    <label>Answer c</label>
                    <input type="text" name="q4c" id="q4c" value={data.q4c} onChange={changeHandler}/>
                    <label>Answer d</label>
                    <input type="text" name="q4d" id="q4d" value={data.q4d} onChange={changeHandler}/>
                    <label>Correct answer</label>
                    <select name="q4answer" value={data.q4answer} onChange={changeHandler}>
                        <option value="">Pick one</option>
                        <option name="4a" value="q4a">Answer a</option>
                        <option name="4b" value="q4b"> Answer b</option>
                        <option name="4c" value="q4c"> Answer c</option>
                        <option name="4d" value="q4d">Answer d</option>
                    </select>

                <label className="q-label">Question 5</label>
                <input className="question" type="text" name="q5" id="q5" value={data.q5} onChange={changeHandler}/>
                    <label>Answer a</label>
                    <input type="text" name="q5a" id="q5a" value={data.q5a} onChange={changeHandler}/>
                    <label>Answer b</label>
                    <input type="text" name="q5b" id="q5b" value={data.q5b} onChange={changeHandler}/>
                    <label>Answer c</label>
                    <input type="text" name="q5c" id="q5c" value={data.q5c} onChange={changeHandler} />
                    <label>Answer d</label>
                    <input type="text" name="q5d" id="q5d" value={data.q5d} onChange={changeHandler}/>
                    <label>Correct answer</label>
                    <select name="q5answer" value={data.q5answer} onChange={changeHandler}>
                        <option value="">Pick one</option>
                        <option name="5a" value="q5a">Answer a</option>
                        <option name="5b" value="q5b"> Answer b</option>
                        <option name="5c" value="q5c"> Answer c</option>
                        <option name="5d" value="q5d">Answer d</option>
                    </select>
                    {Object.keys(errors).length > 0 && (
                        <div>
                            {Object.entries(errors).map(([field, message]) => (
                                <p className="errors"key={field}>{message}</p>
                            ))}
                        </div>
                    )}
                <input type="submit" value="Update quiz!" />
            </div>
            <div className="pic">
                <label className='q-label'> Optional: Quiz photo</label>
                <input type='file' name="pic" onChange={(e) => setFile(e.target.files[0])}></input>
            </div>
        </form>
        </>
    )
}