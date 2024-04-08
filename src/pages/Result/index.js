/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { getAnswersResult } from '../../services/answerService';
import { getListQuestion } from '../../services/questionsService';
import { useNavigate } from "react-router-dom"
import "./Result.css"
export function Result() {
  const navigate = useNavigate();
  const params = useParams();
  const [dataResult, setDataResult] = useState([]);
  useEffect(() => {
    const fectchApi = async () => {
      const dataAnswers = await getAnswersResult(params.id);
      const dataQuestion = await getListQuestion(dataAnswers.topicId);
      let result = [];
      for (let i = 0; i < dataQuestion.length; i++) {
        result.push({
          ...dataQuestion[i],
          ...dataAnswers.answers.find(item => item.questionId === dataQuestion[i].id)
        })
      }
      setDataResult(result);
    }
    fectchApi();
  }, [])
  const handleClick = () => {
    const fectchApi = async () => {
      const dataAnswers = await getAnswersResult(params.id);
      navigate(`/quiz/${dataAnswers.topicId}`)
    }
    fectchApi();
  }
  let cntTrue = 0;
  let cntFalse = 0;
  for (let i = 0; i < dataResult.length; i++) {
    if (dataResult[i].answer === dataResult[i].correctAnswer) {
      cntTrue = cntTrue + 1;
    }
    else {
      cntFalse = cntFalse + 1;
    }
  }
  return (
    <>
      <h1>Kết quả:</h1>
      <div className="true--false">
        <h2>Số câu đúng:{cntTrue}</h2>
        <h2>Số câu sai:{cntFalse}</h2>
        <h2>Điểm:{cntTrue*2}</h2>
      </div>
      <div className="answer__list">
        {dataResult.map((item, index) => (
          <div className="answer__item" key={item.id}>
            <div className="form-quiz__item" key={item.id}>
              <p>
                Câu {index + 1}:{item.question}
                {item.correctAnswer === item.answer ?
                  (<>
                    <span className='result__tag result__tag--true'>Đúng</span>
                  </>)
                  :
                  (<>
                    <span className='result__tag result__tag--false'>Sai</span>
                  </>)}

              </p>
              {item.answers.map((itemAns, indexAns) => {
                let className = "";
                let checked = false;
                if (item.answer === indexAns) {
                  checked = true;
                  className = "result__item--selected";
                }
                if (item.correctAnswer === indexAns) {
                  className += " result__item--result"
                }
                return (
                  <div className="result__answer" key={indexAns}>
                    <input type="radio" checked={checked} disabled />
                    <label className={className}>{itemAns}</label>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        <button onClick={handleClick}>Làm lại</button>
      </div>
    </>
  )
}