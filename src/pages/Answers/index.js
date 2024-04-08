import { useEffect, useState } from "react";
import { getAnswersByUserId } from "../../services/answerService";
import { getListTopic } from "../../services/topicService";
import { Link } from "react-router-dom";
export function Answer() {
  const [dataAnswer, setDataAnswer] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const answersByUserId = await getAnswersByUserId();
      const topics = await getListTopic();
      let result = [];

      for (let i = 0; i < answersByUserId.length; i++) {
        result.push({
          ...topics.find(item => item.id === answersByUserId[i].topicId),
          ...answersByUserId[i],
        })
      }
      setDataAnswer(result.reverse());
    }
    fetchApi();
  }, [])
  return (
    <>
      <h2>Danh sách bài đã luyện tập</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên chủ đề</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dataAnswer.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <Link to={"/result/"+item.id}>
                  <button>Xem chi tiết</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}