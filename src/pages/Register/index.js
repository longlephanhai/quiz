import { generateToken } from "../../helpers/generateToken";
import { checkexits, register } from "../../services/usersService";
import { useNavigate } from "react-router-dom"
export function Register() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const checkexitsEmail = await checkexits("email", email);
    if (checkexitsEmail > 0) {
      alert("Email đã tồn tại");
    }
    else {
      const option = {
        fullName: fullName,
        email: email,
        password: password,
        token: generateToken(20)
      };
      const responsive = await register(option);
      if (responsive) {
        navigate("/login");
      }
      else {
        alert("Đăng kí thất bại")
      }
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Register Quiz</h2>
        <div>
          <input type="fullName" placeholder="Nhập họ tên" />
        </div>
        <div>
          <input type="email" placeholder="Nhập email" />
        </div>
        <div>
          <input type="password" placeholder="Nhập mật khẩu" />
        </div>
        <button type="submit">
          Register
        </button>
      </form>
    </>
  )
}