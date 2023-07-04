import Signin from '../auth/signin'
// Authentication
import Login from "../pages/authentication/login"
import Register from "../pages/authentication/register"


export const authRoutes = [
  { path: `${process.env.PUBLIC_URL}/login`, Component: <Signin /> },
  { path: `${process.env.PUBLIC_URL}/pages/auth/login`, Component: <Login /> },
  { path: `${process.env.PUBLIC_URL}/register`, Component: <Register /> },


 
];
