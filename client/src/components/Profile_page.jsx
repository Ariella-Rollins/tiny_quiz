import { useEffect, useState } from 'react'
import { useLogin } from '../context/UserContext'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { getUser } from '../services/user.service'
import { deleteQuiz} from '../services/quiz.service'

export const Profile_page = ({user, setUser, allQuizzes, setAllQuizzes, userQuizzes, setUserQuizzes}) => {
    const navigate = useNavigate()
    const { isLoggedIn, logout:userLogout, setLoggedInData, loggedInData } = useLogin()
    const {id} = useParams()

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

    // gets user data
    useEffect(() => {
        if (Object.keys(user).length === 0 || user._id != id) {    
            getOneUser()
        }
    },[id])

    // gets user's quizzes
    useEffect(() => {
        if (Object.keys(user).length != 0) {
            setUserQuizzes(allQuizzes.filter((one)=> (one.creator_id == user._id)))
        }
        else {
            // console.log("no user, no quizzes.")
        }
    },[user, allQuizzes])


    function removeQuiz(quiz_id) {
            deleteQuiz(quiz_id)
            .then(()=> {
                setAllQuizzes(prev => prev.filter(q => q._id !== quiz_id));
            })
        .catch((error) => {
            // console.log("error", error)
        })
    }
    
    return (
        <div className="profile">
            <div className="col1">
                <div className='box1 round'>
                    <h2>{user.name}'s profile</h2>
                    <p className='date'>(Member since {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'})}
                    )</p>
                    <div className='bio'>
                        {!user.bio?
                        <p>No bio yet...</p>:
                        <p>{user.bio}</p>
                        }
                    </div>
                    
                    {loggedInData._id == user._id&&
                    <button onClick={()=>{navigate(`/profile/${user._id}/edit`)}}>Edit bio</button>
                    }
                </div>
                    {loggedInData._id == user._id&&
                    <div className='box2 round'>
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