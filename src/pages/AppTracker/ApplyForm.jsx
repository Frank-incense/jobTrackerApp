import React, { useState } from "react";
import "./ApplyForm.css";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function ApplyForm() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [status, setStatus] = useState("Pending");
  const [notes, setNotes] = useState("");
  const [,, onAdd] = useOutletContext();
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("userId"); // Get the logged-in user's ID

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create new application object with userId
    const newApplication = {
      jobTitle,
      company,
      dateApplied,
      status,
      notes,
      userId, // Associate application with the logged-in user
    };

    try {
      const response = await fetch("https://server-hmur.onrender.com/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newApplication),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const added = await response.json();
      onAdd(added); // Add the new application to the app state

      // Reset form fields
      setJobTitle("");
      setCompany("");
      setDateApplied("");
      setStatus("Pending");
      setNotes("");
      navigate("/applications"); // Navigate to applications page after submitting
    } catch (error) {
      console.error("Error adding application:", error);
    }
  };

  return (
    <div className="application-form">
      <h2>Add New Application</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder=" "
            required
          />
          <label>Job Title</label>
        </div>

        <div className="form-group">
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder=" "
            required
          />
          <label>Company</label>
        </div>

        <div className="form-group">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <label>Status</label>
        </div>

        <div className="form-group">
          <input
            type="date"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
            placeholder=" "
            required
          />
          <label>Date Applied</label>
        </div>

        <button type="submit" className="submit-btn">
          Add Application
        </button>
      </form>
    </div>
  );
}
