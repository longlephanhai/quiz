/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionsService";
import { getCookie } from "../../helpers/cookie"
import { createAnswer } from "../../services/quizService";
import {useNavigate} from "react-router-dom"
export function Quiz() {
  const params = useParams();
  const [dataTopic, setDataTopic] = useState();
  const [dataQuestion, setDataQuestion] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const fectchApi = async () => {
      const reponsive = await getTopic(params.id);
      setDataTopic(reponsive);
    }
    fectchApi();
  }, []);
  useEffect(() => {
    const fectchApi = async () => {
      const reponsive = await getListQuestion(params.id);
      setDataQuestion(reponsive);
    }
    fectchApi();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let selectedAnswers = [];
    for (let i = 0; i < e.target.elements.length; i++) {
      if (e.target.elements[i].checked) {
        const name = e.target.elements[i].name;
        const value = e.target.elements[i].value;
        
        selectedAnswers.push({
          questionId: parseInt(name),
          answer: parseInt(value)
        })
      }
    }
    let option = {
      userId: parseInt(getCookie("id")),
      topicId: parseInt(params.id),
      answers: selectedAnswers
    };
    const reponsive = await createAnswer(option);
    if(reponsive){
      navigate(`/result/${reponsive.id}`);
    }
  }
  return (
    <>
      <h2>Bài Quiz chủ đề:{dataTopic && (dataTopic.name)}</h2>
      <div className="form-quiz">
        <form onSubmit={handleSubmit}>
          {dataQuestion.map((item, index) => (
            <div className="form-quiz__item" key={item.id}>
              <p>Câu {index + 1}:{item.question}</p>
              {item.answers.map((itemAns, indexAns) => (
                <div className="form-quiz__answer" key={indexAns}>
                  <input type="radio" name={item.id} value={indexAns} id={`quiz-${item.id}-${indexAns}`} />
                  <label htmlFor={`quiz-${item.id}-${indexAns}`}>{itemAns}</label>
                </div>
              ))}
            </div>
          ))}
          <button type="submit">
            Nộp bài
          </button>
        </form>
      </div>
    </>
  )
}