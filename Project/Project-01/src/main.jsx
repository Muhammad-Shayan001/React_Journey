import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import AddPost from './Pages/AddPost.jsx'
import EditPosts from './Pages/EditPosts.jsx'
import AllPosts from './Pages/AllPosts.jsx'
import Post from './Pages/Posts.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path:'/',
        element : <Home/>

      },
      {
        path:'/login',

        element : (
          <AuthLayout authentication={false}>

        <Login/>
        </AuthLayout>
        )

      },
      {
        path:'/signup',

        element : (
          <AuthLayout authentication={false}>

        <Signup/>
        </AuthLayout>
        )

      },
      {
        path:'/all-posts',
        element : (
          <AuthLayout authentication={true}>
            {''}
            <AllPosts/>
            </AuthLayout>
        )
      },
      {
        path:'/add-post',
        element : (
          <AuthLayout authentication={true}>
            {''}
            <AddPost/>
            </AuthLayout>
        )
      },
      {
        path:'/edit-post/:slug',
        element : (
          <AuthLayout authentication={true}>
            {''}
            <EditPosts/>
            </AuthLayout>
        )
      },
      {
        path:'/post/:slug',
        element : (
          <AuthLayout authentication={true}>
            {''}
            <Post/>
            </AuthLayout>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
