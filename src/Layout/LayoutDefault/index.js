import { NavLink, Outlet } from "react-router-dom"
import "./LayoutDefault.scss"
import { getCookie } from "../../helpers/cookie"
import {useSelector} from "react-redux"
export function LayoutDefault() {
  const token = getCookie("token");
  const isLogin=useSelector(state=>state.loginReducer);
  console.log(isLogin);
  return (
    <>
      <div className="layout-default">
        <header className="layout-default__header">
          <div className="layout-default__logo">Quiz</div>
          <div className="menu">
            <ul>
              <li>
                <NavLink to="/">
                  Home
                </NavLink>
              </li>
              {token && (
                <>
                  <li>
                    <NavLink to="/topic">
                      Topic
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/answer">
                      Answer
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="layout-default__account">
            {token ?
              (<>
                <NavLink className="layout-default__logout" to={"/logout"}>Đăng xuất</NavLink>
              </>)
              :
              (<>
                <NavLink className="layout-default__login" to={"/login"}>Đăng nhập</NavLink>
                <NavLink className="layout-default__register" to={"/register"}>Đăng ký</NavLink>
              </>)}

          </div>
        </header>
        <main className="layout-default__main">
          <Outlet />
        </main>
        <footer className="layout-default__footer">
          Copyright @ 2024 by Long
        </footer>
      </div>
    </>
  )
}