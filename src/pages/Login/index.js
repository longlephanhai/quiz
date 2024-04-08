import { setCookie } from "../../helpers/cookie";
import { login } from "../../services/usersService";
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import { checkLogin } from "../../actions/login";
export function Login() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const email=e.target[0].value;
    const password=e.target[1].value;
    const responsive=await login(email,password);
    if(responsive.length>0)
    {
      setCookie("id",responsive[0].id,1);
      setCookie("fullName",responsive[0].fullName,1);
      setCookie("email",responsive[0].email,1);
      setCookie("token",responsive[0].token,1);
      dispatch(checkLogin(true));
      navigate("/");
    }
    else
    {
      alert("Sai tài khoản hoặc mật khẩu!")
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login Quiz</h2>
        <div>
          <input type="email" placeholder="Nhập email" />
        </div>
        <div>
          <input type="password" placeholder="Nhập mật khẩu" />
        </div>
        <button type="submit">
          Login
        </button>
      </form>
    </>
  )
}