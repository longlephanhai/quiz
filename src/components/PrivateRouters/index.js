import { Navigate, Outlet } from "react-router-dom";

export function PrivateRouter() {
  const isLogin=true;
  return (
    <>
     {isLogin?(<Outlet/>):(<Navigate to={"/login"}/>)}
    </>
  )
}