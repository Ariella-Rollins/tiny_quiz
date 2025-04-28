import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getAllQuizzes } from '../services/quiz.service'

export const Home_page = ({allQuizzes, setAllQuizzes}) => {

    const slideRef = useRef(null)

    useEffect(()=> {
        const fetchQuizzes = async()=> {
            try {
                const allquiz = await getAllQuizzes()
                setAllQuizzes(allquiz)
            }
            catch (err) {
            // console.log("fetch err", err)
            }  
        }
        fetchQuizzes()
    }, [])


    // allows scrolling in the carousel
    useEffect(()=> {
        const container = slideRef.current;
        // Set initial scroll position to the start of the original content
        const scrollToStart = () => {
            const itemWidth = container.scrollWidth / 2;
            container.scrollLeft = itemWidth;
        } // Scroll to the middle
            scrollToStart();
        }, [allQuizzes]);
    

    function scrollRight() {
        slideRef.current.scrollBy({ left: 300, behavior: 'smooth' })

    }

    function scrollLeft() {
        slideRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }

    // Reset scroll when it reaches either end
    const handleScroll = () => {
        const container = slideRef.current;
        const totalWidth = container.scrollWidth;
        const halfWidth = totalWidth / 2;

        if (container.scrollLeft <= 0) {
            disableSnapTemporarily(container);
            container.scrollLeft = halfWidth;
        }
        else if (container.scrollLeft >= totalWidth - container.clientWidth) {
            disableSnapTemporarily(container);
            container.scrollLeft = halfWidth - container.clientWidth;
        }
        }

        function disableSnapTemporarily(container) {
            // Removes scroll snap
            container.style.scrollSnapType = 'none';
        
            // Waits a moment and restores it.
            setTimeout(() => {
                container.style.scrollSnapType = 'x mandatory';
            }, 50);
        }

    return (
        <div className='home-border'>
        <div className="home"> 
            <h1>Create and take tiny quizzes!</h1>
            <h2>Most popular:</h2>
            <div className="caro-con">
                <button className="arrow left" onClick={()=>{scrollLeft()}}>&lt;</button>
                <div className='caro-border'>
                <div className="carousel-wrapper">
                    <div className="slide-track" ref={slideRef} onScroll={()=>{handleScroll()}}>
                        {allQuizzes.length !=0 &&
                            allQuizzes.map((one, index)=> (
                                index < 6 &&
                                <div className="item" key={`clone-${index}`}>
                                    <Link to={`/quiz/${one._id}`}>
                                    <img src={one.pic? `http://localhost:8000${one.pic}`: "plants.jpg"} />
                                    </Link>
                                    <Link to={`/quiz/${one._id}`}>{one.name}</Link>
                                </div>
                            ))
                        }
                        {/* duplicate the same items again for looping */}
                        {allQuizzes.length !=0 &&
                            allQuizzes.map((one, index)=> (
                                index<6 &&
                                <div className="item" key={`clone-${index}`}>
                                    <Link to={`/quiz/${one._id}`}>
                                    <img src={one.pic? `http://localhost:8000${one.pic}`: "plants.jpg"}/>
                                    </Link>
                                    <Link to={`/quiz/${one._id}`}>{one.name}</Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
                </div>
                <button className="arrow right" onClick={()=>{scrollRight()}}>&gt;</button>
            </div>
            <div className='recent'>
            <h2>Recently added:</h2>
                {allQuizzes.slice().reverse().map((one, index)=> (
                    <div className='quiz' key={index}>
                        <Link to={`/quiz/${one._id}`} >
                        <div className='quiz-card'>
                            <img src={one.pic? `http://localhost:8000${one.pic}`: "plants.jpg"} alt="quiz"></img>
                            <p>{one.name}</p>
                        </div>
                        </Link>
                        
                    </div>
                ))}
            </div>
        </div>
        </div>
    )
}