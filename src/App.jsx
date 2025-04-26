
import { useEffect, useState } from 'react'
import AuthContextProvider, { AuthContext } from './components/AuthContextProvider';
import ProtectedRoutes from './components/ProtectedRoutes';
import Navbar from './components/NavBar';

const apiKey = import.meta.env.VITE_API_KEY;

export const API_URL = "https://www.themuse.com/api/public/jobs?page=1";

function App() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((data) => setJobs(data.results));
  }, []);
 
  useEffect(() => {
    fetch("https://server-hmur.onrender.com/api/applications")
      .then((r) => r.json())
      .then((data) => setApplications(data));
  }, []);
  
  function handleAddApplication(newApplication) {
    console.log(newApplication);
    setApplications((prevApplications) => [...prevApplications, newApplication]);
  }

  return (
    <>
      <AuthContextProvider>
        <Navbar/>
         <ProtectedRoutes jobs={jobs} applications={applications} onAdd={handleAddApplication}/>
      </AuthContextProvider>
    </>
  );
}

export default App;
