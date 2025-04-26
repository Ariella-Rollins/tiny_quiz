import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUser } from '../services/user.service'

export const Quiz_page = ({allQuizzes, user, setUser}) => {
    const {id} = useParams()
    const [quiz, setQuiz] = useState({})

    const [gameStart, setGameStart] = useState(false)
    const [count, setCount] = useState(1)
    const [score, setScore] = useState(0)

    const getQuiz = async() => {
        try {
            const oneQuiz = allQuizzes.find((one)=> one._id == id)
            if (oneQuiz){
                setQuiz(oneQuiz)
            }
        }
        catch (error) {
            // console.log(error)
        }
}


// gets quizze's creator's name to display
const getCreator = async() => {
    try {
        const oneCreator = await getUser(quiz.creator_id)
        if (oneCreator){
            setUser(oneCreator)
        }
        else {
            console.log("error! This quiz has no owner!")
        }
    }
    catch (error) {
        // console.log(error)
    }
}

    useEffect(()=> {
        getQuiz()
    }, [])

    useEffect(() => {
        if (quiz.creator_id) {
            console.log("getting creator")
            getCreator(quiz.creator_id)
        }
    }, [quiz])

    const handleQ1 = e => {
        e.preventDefault()
        if (e.target.q1.value == quiz.q1answer) {
            setScore((prev)=> (prev + 1))
        }
        setCount((prev)=> (prev + 1))
    }
    const handleQ2 = e => {
        e.preventDefault()
        if (e.target.q2.value == quiz.q2answer) {
            setScore((prev)=> (prev + 1))
        }
        setCount((prev)=> (prev + 1))
    }

    const handleQ3 = e => {
        e.preventDefault()
        if (e.target.q3.value == quiz.q3answer) {
            setScore((prev)=> (prev + 1))
        }
        setCount((prev)=> (prev + 1))
    }

    const handleQ4 = e => {
        e.preventDefault()
        if (e.target.q4.value == quiz.q4answer) {
            setScore((prev)=> (prev + 1))
        }
        setCount((prev)=> (prev + 1))
    }

    const handleQ5 = e => {
        e.preventDefault()
        if (e.target.q5.value == quiz.q5answer) {
            setScore((prev)=> (prev + 1))
        }
        setCount((prev)=> (prev + 1))
    }

    function reset() {
        setCount(1); 
        setScore(0);
    }

    return (
        <div className='quiz-con'>
            <div className='quiz-border'>
            <div className="quiz-box"> 
            {!gameStart?
            <>
            <h1>{quiz.name}</h1>
            <Link to={`/profile/${user._id}`} className='profile-link'>by {user.name}</Link>
            <button onClick={()=> {setGameStart(true)}}>Start quiz</button>
            </>: count == 1?
            <>
            <h1>{quiz.q1}</h1>
            <form onSubmit={handleQ1}>
                <input type="hidden" name="q1" value="q1a" />
                <input type="submit" value={quiz.q1a}></input>
            </form>
            <form onSubmit={handleQ1}>
                <input type="hidden" name="q1" value="q1b" />
                <input type="submit" value={quiz.q1b}></input>
            </form>
            <form onSubmit={handleQ1}>
                <input type="hidden" name="q1" value="q1c" />
                <input type="submit" value={quiz.q1c}></input>
            </form>
            <form onSubmit={handleQ1}>
                <input type="hidden" name="q1" value="q1d" />
                <input type="submit" value={quiz.q1d}></input>
            </form>
            </>
        : count == 2? 
        <>
        <h1>{quiz.q2}</h1>
        <form onSubmit={handleQ2}>
            <input type="hidden" name="q2" value="q2a" />
            <input type="submit" value={quiz.q2a}></input>
        </form>
        <form onSubmit={handleQ2}>
            <input type="hidden" name="q2" value="q2b" />
            <input type="submit" value={quiz.q2b}></input>
        </form>
        <form onSubmit={handleQ2}>
            <input type="hidden" name="q2" value="q2c" />
            <input type="submit" value={quiz.q2c}></input>
        </form>
        <form onSubmit={handleQ2}>
            <input type="hidden" name="q2" value="q2d" />
            <input type="submit" value={quiz.q2d}></input>
        </form>
        </>: count == 3? 
        <>
        <h1>{quiz.q3}</h1>
        <form onSubmit={handleQ3}>
            <input type="hidden" name="q3" value="q3a" />
            <input type="submit" value={quiz.q3a}></input>
        </form>
        <form onSubmit={handleQ3}>
            <input type="hidden" name="q3" value="q3b" />
            <input type="submit" value={quiz.q3b}></input>
        </form>
        <form onSubmit={handleQ3}>
            <input type="hidden" name="q3" value="q3c" />
            <input type="submit" value={quiz.q3c}></input>
        </form>
        <form onSubmit={handleQ3}>
            <input type="hidden" name="q3" value="q3d" />
            <input type="submit" value={quiz.q3d}></input>
        </form>
        </>: count == 4? 
        <>
        <h1>{quiz.q4}</h1>
        <form onSubmit={handleQ4}>
            <input type="hidden" name="q4" value="q4a" />
            <input type="submit" value={quiz.q4a}></input>
        </form>
        <form onSubmit={handleQ4}>
            <input type="hidden" name="q4" value="q4b" />
            <input type="submit" value={quiz.q4b}></input>
        </form>
        <form onSubmit={handleQ4}>
            <input type="hidden" name="q4" value="q4c" />
            <input type="submit" value={quiz.q4c}></input>
        </form>
        <form onSubmit={handleQ4}>
            <input type="hidden" name="q4" value="q4d" />
            <input type="submit" value={quiz.q4d}></input>
        </form>
        </>: count == 5? 
        <>
        <h1>{quiz.q5}</h1>
        <form onSubmit={handleQ5}>
            <input type="hidden" name="q5" value="q5a" />
            <input type="submit" value={quiz.q5a}></input>
        </form>
        <form onSubmit={handleQ5}>
            <input type="hidden" name="q5" value="q5b" />
            <input type="submit" value={quiz.q5b}></input>
        </form>
        <form onSubmit={handleQ5}>
            <input type="hidden" name="q5" value="q5c" />
            <input type="submit" value={quiz.q5c}></input>
        </form>
        <form onSubmit={handleQ5}>
            <input type="hidden" name="q5" value="q5d" />
            <input type="submit" value={quiz.q5d}></input>
        </form>
        </>: count == 6?
        <>
        <h1>Results</h1>
        <p>{score}/5</p>
        <button onClick={()=>{reset()}}>Retake</button>
        </>:
        <p>error</p>}
            </div>
            </div>
    </div>
    )
    
}