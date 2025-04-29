import { useEffect, useState } from 'react';
import AuthContextProvider from './components/AuthContextProvider';
import ProtectedRoutes from './components/ProtectedRoutes';
import Navbar from './components/NavBar';

const API_URL = "https://www.themuse.com/api/public/jobs?page=1";

function App() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

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

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  function handleAddApplication(newApplication) {
    setApplications((prev) => [...prev, newApplication]);
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <AuthContextProvider>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <ProtectedRoutes jobs={jobs} applications={applications} onAdd={handleAddApplication} />
      </AuthContextProvider>
    </div>
  );
}

export default App;


