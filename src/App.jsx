
import Login from "./pages/Login";
import { useContext, useEffect, useState } from 'react'
import AuthContextProvider, { AuthContext } from './components/AuthContextProvider';
import ProtectedRoutes from './components/ProtectedRoutes';
import Navbar from './components/NavBar';

const apiKey = import.meta.env.VITE_API_KEY;

const API_URL = "https://www.themuse.com/api/public/jobs?page=1";

function App() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((data) => setJobs(data.results));
  }, []);

  const isAuth = useContext(AuthContext);

  return (
    <>
      <AuthContextProvider>
        <Navbar/>
         <ProtectedRoutes/>
      </AuthContextProvider>
    </>
  );
}

export default App;
