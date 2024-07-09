
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  }
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
