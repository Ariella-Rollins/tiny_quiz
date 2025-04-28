import { useLogin } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { createQuiz } from '../services/quiz.service'
import { useEffect } from 'react'
import { addPic } from '../services/upload.service'


export const Create_quiz = () => {
    const navigate = useNavigate()
    const { isLoggedIn, logout:userLogout, setLoggedInData, loggedInData } = useLogin()
    const [errors, setErrors] = useState({})
    const [file, setFile] = useState(null);

    
    // only logged in users can create quizzes!
    useEffect(()=> {
        if (!isLoggedIn) {
            navigate("/")
        }
    },[isLoggedIn])


    function makeQuiz(e) {
        e.preventDefault()
        const {
            name,
            q1, q1a, q1b, q1c, q1d, q1answer,
            q2, q2a, q2b, q2c, q2d, q2answer,
            q3, q3a, q3b, q3c, q3d, q3answer,
            q4, q4a, q4b, q4c, q4d, q4answer,
            q5, q5a, q5b, q5c, q5d, q5answer
        } = e.target
        let quizData = {
            name: name.value,
            pic: null,
            creator_id: loggedInData._id,
            q1: q1.value, q1a: q1a.value, q1b: q1b.value, q1c: q1c.value, q1d: q1d.value, q1answer: q1answer.value,
            q2: q2.value, q2a: q2a.value, q2b: q2b.value, q2c: q2c.value, q2d: q2d.value, q2answer: q2answer.value,
            q3: q3.value, q3a: q3a.value, q3b: q3b.value, q3c: q3c.value, q3d: q3d.value, q3answer: q3answer.value,
            q4: q4.value, q4a: q4a.value, q4b: q4b.value, q4c: q4c.value, q4d: q4d.value, q4answer: q4answer.value,
            q5: q5.value, q5a: q5a.value, q5b: q5b.value, q5c: q5c.value, q5d: q5d.value, q5answer: q5answer.value
        }

        if (file) {
            handleUpload(file)
                .then(imagePath => {
                    // If image upload is successful, add the image path to the quiz data
                    if (imagePath) {
                        quizData.pic = imagePath;
                    }
    
                    // Now create the quiz with the image path included
                    createQuiz(quizData)
                        .then(() => {
                            navigate("/"); // Redirect after quiz is created
                        })
                        .catch((err) => {
                            if (err.response?.data?.errors) {
                                setErrors(err.response.data.errors);
                            }
                        });
                });
        } else {
            // If no file is provided, create quiz without image
            createQuiz(quizData)
                .then(() => {
                    navigate("/"); // Redirect after quiz is created
                })
                .catch((err) => {
                    if (err.response?.data?.errors) {
                        setErrors(err.response.data.errors);
                    }
                });
        }
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
        <form className='quiz-form' onSubmit={makeQuiz}>
            <div className="create-quiz-con">
                <h1 className='whatAreWeMaking'>What are we making today, {loggedInData.name}?</h1>
                <label className="q-label">Quiz name</label>
                <input type="text" name="name" className='question' placeholder='Animal quiz'></input>
                <label className="q-label">Question 1</label>
                <input className="question" type="text" name="q1" id="q1" placeholder="What is the only mammal that can fly?"/>
                    <label>Answer a</label>
                    <input type="text" name="q1a" id="q1a" />
                    <label>Answer b</label>
                    <input type="text" name="q1b" id="q1b" />
                    <label>Answer c</label>
                    <input type="text" name="q1c" id="q1c" />
                    <label>Answer d</label>
                    <input type="text" name="q1d" id="q1d" />
                    <label>Correct answer</label>
                    <select name="q1answer">
                        <option value="">Pick one</option>
                        <option name="1a" value="q1a">Answer a</option>
                        <option name="1b" value="q1b"> Answer b</option>
                        <option name="1c" value="q1c"> Answer c</option>
                        <option name="1d" value="q1d">Answer d</option>
                    </select>

                <label className="q-label">Question 2</label>
                <input className="question" type="text" name="q2" id="q2" placeholder="Why do frogs croak?" />
                    <label>Answer a</label>
                    <input type="text" name="q2a" id="q2a" />
                    <label>Answer b</label>
                    <input type="text" name="q2b" id="q2b" />
                    <label>Answer c</label>
                    <input type="text" name="q2c" id="q2c" />
                    <label>Answer d</label>
                    <input type="text" name="q2d" id="q2d" />
                    <label>Correct answer</label>
                    <select name="q2answer">
                        <option value="">Pick one</option>
                        <option name="2a" value="q2a">Answer a</option>
                        <option name="2b" value="q2b"> Answer b</option>
                        <option name="2c" value="q2c"> Answer c</option>
                        <option name="2d" value="q2d">Answer d</option>
                    </select>

                <label className="q-label">Question 3</label>
                <input className="question" type="text" name="q3" id="q3" placeholder="What bird lays the largest eggs in the world?" />
                    <label>Answer a</label>
                    <input type="text" name="q3a" id="q3a" />
                    <label>Answer b</label>
                    <input type="text" name="q3b" id="q3b" />
                    <label>Answer c</label>
                    <input type="text" name="q3c" id="q3c" />
                    <label>Answer d</label>
                    <input type="text" name="q3d" id="q3d" />
                    <label>Correct answer</label>
                    <select name="q3answer">
                        <option value="">Pick one</option>
                        <option name="3a" value="q3a">Answer a</option>
                        <option name="3b" value="q3b"> Answer b</option>
                        <option name="3c" value="q3c"> Answer c</option>
                        <option name="3d" value="q3d">Answer d</option>
                    </select>

                <label className="q-label">Question 4</label>
                <input className="question" type="text" name="q4" id="q4" placeholder="How many legs do lobsters have?" />
                    <label>Answer a</label>
                    <input type="text" name="q4a" id="q4a" />
                    <label>Answer b</label>
                    <input type="text" name="q4b" id="q4b" />
                    <label>Answer c</label>
                    <input type="text" name="q4c" id="q4c" />
                    <label>Answer d</label>
                    <input type="text" name="q4d" id="q4d" />
                    <label>Correct answer</label>
                    <select name="q4answer">
                        <option value="">Pick one</option>
                        <option name="4a" value="q4a">Answer a</option>
                        <option name="4b" value="q4b"> Answer b</option>
                        <option name="4c" value="q4c"> Answer c</option>
                        <option name="4d" value="q4d">Answer d</option>
                    </select>

                <label className="q-label">Question 5</label>
                <input className="question" type="text" name="q5" id="q5" placeholder="Where kiwi birds live?" />
                    <label>Answer a</label>
                    <input type="text" name="q5a" id="q5a" />
                    <label>Answer b</label>
                    <input type="text" name="q5b" id="q5b" />
                    <label>Answer c</label>
                    <input type="text" name="q5c" id="q5c" />
                    <label>Answer d</label>
                    <input type="text" name="q5d" id="q5d" />
                    <label>Correct answer</label>
                    <select name="q5answer">
                        <option value="">Pick one</option>
                        <option name="5a" value="q5a">Answer a</option>
                        <option name="5b" value="q5b"> Answer b</option>
                        <option name="5c" value="q5c"> Answer c</option>
                        <option name="5d" value="q5d">Answer d</option>
                    </select>
                    {Object.keys(errors).length > 0 && (
                        <div className="errors">
                            {Object.entries(errors).map(([field, message]) => (
                                <p key={field}>{message}</p>
                            ))}
                        </div>
                    )}
                <input type="submit" value="Make quiz!" />
            </div>
            <div className="pic">
                <label className='q-label'> Optional: Quiz photo</label>
                <input type='file' name="pic" onChange={(e) => setFile(e.target.files[0])}></input>
            </div>
        </form>
    )
}