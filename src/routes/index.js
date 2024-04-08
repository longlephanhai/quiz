import { LayoutDefault } from "../Layout/LayoutDefault";
import { PrivateRouter } from "../components/PrivateRouters";
import { Home } from "../pages/Home/index";
import { Login } from "../pages/Login/index";
import { Register } from "../pages/Register/index"
import { Answer } from "../pages/Answers/index"
import { Quiz } from "../pages/Quiz/index"
import { Result } from "../pages/Result/index"
import { Topic } from "../pages/Topic/index"
import { Logout } from "../pages/Logout";
export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "logout",
        element: <Logout />
      },
      {
        element: <PrivateRouter />,
        children: [
          {
            path: "answer",
            element: <Answer />
          },
          {
            path: "quiz/:id",
            element: <Quiz />
          },
          {
            path: "result/:id",
            element: <Result />
          },
          {
            path: "topic",
            element: <Topic />
          },
        ]
      },
    ]
  }
];

