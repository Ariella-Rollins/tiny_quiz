import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllUsers, deleteUser } from '../services/user.service'
import { useLogin } from '../context/UserContext'
import { useState } from 'react'
import { deleteQuiz } from '../services/quiz.service'

export const Admin_page = ({allQuizzes, setAllQuizzes}) => {
    const [allUsers, setAllUsers] = useState([])
    const { isLoggedIn, loggedInData } = useLogin()
    const navigate = useNavigate()


    const fetchUsers = async()=> {
            try {
                const allUsersFound = await getAllUsers()
                setAllUsers(allUsersFound)
            }
            catch (err) {
            // console.log("fetch err", err)
            }  
        }

    useEffect(()=> {
        if (loggedInData._id != "68033c8f1868dbaeb9948802") {
            navigate("/")
        }
        else {
            fetchUsers()
        }
        
    }, [])

    function deleteUsersQuizzes(id) {
        allQuizzes.map((one)=> {
            if (one.creator_id == id) {
                deleteQuiz(one._id)
                .then (() => {
                    setAllQuizzes(prev => prev.filter((one)=> one.creator_id != id))
                })
                .catch((err)=> {
                    // console.log("error! Can't delete!", err)
                })
            }
        })
    }

    const handleDeleteUser = async (id) => {
        try {
        deleteUser(id)
        const updatedUsers = await getAllUsers();
        setAllUsers(updatedUsers);
        deleteUsersQuizzes(id)
        }
        catch (err) {
        // console.log("delete error", err);
        }
    }

    return (
        <div className="admin"> 
            <h1>Manage Users</h1>
            <div className="admin2">
                {allUsers.map((one, id)=> (
                    <div key={id}>
                        <p>{one.name}</p>
                        <button onClick={()=>{handleDeleteUser(one._id)}}>delete</button>
                    </div>
                ))
            }
            </div>
        </div>
    )
}