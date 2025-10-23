import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Contect from "./components/Contect/Contect.jsx";
import User from "./components/User/User.jsx";
import Github, { githubLoderInfo } from "./components/Github/Github.jsx";

// const router = createBrowserRouter([
//   {
//     path : '/',
//     element : <App/>,
//     children : [
//       {
//         path:'',
//         element : <Home />
//       },
//       {
//         path:'about',
//         element : <About />
//       },
//       {
//         path:'contect',
//         element : <Contect />
//       },
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contect" element={<Contect />} />
      <Route path="user/:userid" element={<User />} />
      <Route loader={githubLoderInfo} path="github" element={<Github />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
