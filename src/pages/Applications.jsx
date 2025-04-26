// src/pages/Applications.jsx
import { useContext } from "react";
import { AuthContext } from "../components/AuthContextProvider";
import "./Applications.css";

const Applications = () => {
  const { isAuth } = useContext(AuthContext);
  
  // Temporary data - replace with your actual applications data
  const applications = [
    {
      id: 1,
      jobTitle: "Software Engineer",
      company: "Tech Corp",
      status: "Applied",
      appliedDate: "2024-03-15"
    },
    {
      id: 2,
      jobTitle: "Product Manager",
      company: "StartUp Inc",
      status: "Interviewed",
      appliedDate: "2024-03-20"
    }
  ];

  if (!isAuth) return null;

  return (
    <div className="applications-container">
      <h1>Your Job Applications</h1>
      
      <div className="applications-list">
        {applications.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Status</th>
                <th>Date Applied</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.jobTitle}</td>
                  <td>{app.company}</td>
                  <td>
                    <span className={`status-badge ${app.status.toLowerCase()}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-applications">
            <p>No applications found. Start applying to jobs!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;