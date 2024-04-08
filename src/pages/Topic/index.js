import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListTopic } from "../../services/topicService";
export function Topic() {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const responsive = await getListTopic();
      setTopics(responsive);
    }
    fetchApi();
  }, [])
  return (
    <>
      <h2>Danh sách chủ đề</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên chủ đề</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {topics.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <Link to={"/quiz/"+item.id}>
                  <button>Làm bài</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}