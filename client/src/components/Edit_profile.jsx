import { useEffect, useState } from 'react'
import { useLogin } from '../context/UserContext'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { getUser, updateUserBio } from '../services/user.service'
import { deleteQuiz} from '../services/quiz.service'



export const Edit_profile = ({user, setUser, allQuizzes, userQuizzes, setUserQuizzes, setAllQuizzes}) => {
    const navigate = useNavigate()
    const { isLoggedIn, logout:userLogout, setLoggedInData, loggedInData } = useLogin()
    const {id} = useParams()

    const [errors, setErrors] = useState("")


    // redirects if user doesn't own the profile
    useEffect(()=> {
        if (!loggedInData._id || user._id != loggedInData._id) {
            navigate("/")
        }
    }, [user])

// gets user's quizzes
    useEffect(() => {
        if (Object.keys(user).length != 0) {
            setUserQuizzes(allQuizzes.filter((one)=> (one.creator_id == user._id)))
        }
        else {
            // console.log("no user, no quizzes.")
        }
    },[user, allQuizzes])


    async function getOneUser() {
        try {
                const oneUser = await getUser(id)
                if (oneUser){
                    setUser(oneUser)
                }
            }
            catch (error) {
                // console.log(error)
            }
    }

    function removeQuiz(quiz_id) {
        deleteQuiz(quiz_id)
        .then(()=> {
            setAllQuizzes(prev => prev.filter(q => q._id !== quiz_id));
        })
    .catch((error) => {
        // console.log("error", error)
    })
    }

    function updateBio(e) {
        e.preventDefault()
            const data = {
                "_id": user._id,
                "name": user.name,
                "email": user.email,
                "createdAt": user.createdAt,
                "bio": e.target.bio.value
            }
            updateUserBio(data)
            .then (()=> {
                getOneUser()
                navigate(-1)
            })
            .catch((err)=>{
                setErrors(err)
            })
        
    }
    
    return (
        <div className="profile">
            <div className="col1">
                <div className='box1'>
                    <h2>{user.name}'s profile</h2>
                    <div className='bio'>
                        {errors && <p>{errors.bio.message}</p>}
                        <form onSubmit={updateBio}>
                            <textarea name='bio' cols="40"
                            rows="5" defaultValue={user.bio}></textarea>
                            <input type="submit" value="Update" />
                        </form>
                    </div>
                </div>
                    {loggedInData._id == user._id&&
                    <div className='box2'>
                        <Link to="/quiz/new" className='create-quiz-btn'>Create quiz</Link>
                    </div>}
            </div>
            <div className="col2">
                <div className='profile-quiz'>
                    <h2>Quizzes by me:</h2>
                    {userQuizzes.length == 0?
                    <p>None yet...</p>
                    : userQuizzes.map((one, index)=> (
                        <div className="quiz" key={index}>
                            <Link to={`/quiz/${one._id}`}>
                                <div className='quiz-card'>
                                    <img src="/plants.jpg" alt="quiz"></img>
                                    <p>{one.name}</p>
                                </div>
                            </Link>
                            {user._id == loggedInData._id &&
                                <div className='quiz-side'>
                                    <button onClick= {()=> {navigate(`/quiz/${one._id}/edit`)}}>Edit</button>
                                    <button onClick={()=> {removeQuiz(one._id)}}>Delete</button>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}