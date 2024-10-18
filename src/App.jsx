import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import axios from 'axios';


function App() {
  const [Currentindex, setCurrentindex] = useState(0)
  const [question, setQuestion] = useState()
  const [result, setResult] = useState(false)
  const [marks, setMarks] = useState(0)
  useEffect(() => {
    axios('https://the-trivia-api.com/v2/questions')
      .then((response) => {
        setQuestion(response.data);

      })
      .catch((err) => {
        console.log(err)
      })

  }, []);

  console.log(question)


  const input = useRef([])


  const NextQuestion = () => {
    const selectedValue = input.current.find(item => item && item.checked);
    if (selectedValue.value === question[Currentindex].correctAnswer) {
      setMarks(marks + 10) 
   setCurrentindex(Currentindex + 1)           
              return
    }
//    console.log(question)
    if (Currentindex < question.length - 1) {
      setCurrentindex(Currentindex + 1)

    } else {
      setResult(true)
    }

  }

  function shuffleArray(arr) {
    const emptyArr = []
    const shuffleArr = []
    for (let i = 0; i < arr.length; i++) {
      const randomNumber = Math.ceil(Math.random() * arr.length)
      //   console.log(randomNumber)
      if (emptyArr.includes(randomNumber)) {
        i--
      } else {
        emptyArr.push(randomNumber)
        shuffleArr[randomNumber] = arr[i]
      }

    }
    return shuffleArr
  }

  shuffleArray([1, 2, 3, 4])





  return (
    <>
      < div className='h-lvh bg-blue-800 	'>


        {
          result ?
            <div className='container m-auto p-4'>
              <h1 className="text-white text-8xl text-center p-4">
                Quiz  App
              </h1>
              <div className='bg-white rounded p-4  m-4'>
                <h1 className="text-blue-800 text-8xl text-center m-4 p-4">Your Marks: {marks}</h1>

              </div>
            </div> : <div className=' m-auto p-4'>
              <h1 className="text-white text-8xl text-center px-4">
                Quiz  App
              </h1>
              <div className='text-end p-4 m-2'>
                <button className=" text-danger  text-center bg-white rounded px-8 p-2" > <b> {marks} / 100</b></button>
              </div>

              {question ?
                <div>
                  <div className=' bg-white m-2 rounded '>
                    <h1 className='text-blue-800 p-4 m-2'>
                      <br />
                      <b>Question {Currentindex +1} : {question[Currentindex].question.text} </b>
                      <br />
                    </h1>
                  </div>
                  {shuffleArray([...question[Currentindex].incorrectAnswers, question[Currentindex].correctAnswer]).map((item, index) => {
                    return <div key={index} className='bg-white rounded p-2  m-2'>
                      <div>
                        <input type="radio" id='' name="question" ref={el => input.current[index] = el} value={item} />
                        <label className='text-blue-800' htmlFor={item}> <b>{item}</b></label>

                      </div>

                    </div>

                  })}


                  <div className='text-center'>
                    <button className=" text-blue-800  text-center bg-white rounded px-4 p-2" onClick={NextQuestion} >  N E X T</button>

                  </div>

                </div>

                :
                <h1 className='text-center text-white' >loading</h1>
              }


            </div>




        }
      </div>

    </>
  )
}

export default App
