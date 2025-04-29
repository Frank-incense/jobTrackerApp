// src/pages/Applications.jsx
import "./Applications.css";
import { useNavigate, useOutletContext } from "react-router-dom";


const Applications = () => {
  const [,applications]= useOutletContext();
  const userid = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  if (!userid) return null;

  return (
    <div className="applications-container">
      <h1>Your Job Applications</h1>
      <button type="button" onClick={()=> navigate("/application")}>Add Application</button>
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
                  <td>{app.dateApplied}</td>
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