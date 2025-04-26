
import React, { useState } from 'react';

export default function ApplyForm({ onAdd }) {
  // Initialize controlled input state
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const [status, setStatus] = useState('Pending');
  const [notes, setNotes] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newApplication = { jobTitle, company, dateApplied, status, notes };

    try {
      const response = await fetch('http://localhost:3000/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApplication),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const added = await response.json();

      onAdd(added); // Call the onAdd function passed as a prop

      // Reset form fields
      setJobTitle(''); 
      setCompany(''); 
      setDateApplied(''); 
      setStatus('Pending'); 
      setNotes('');
    } catch (error) {
      console.error('Error adding application:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Job Title:
        <input
          type="text"
          value={jobTitle}
          onChange={e => setJobTitle(e.target.value)}
          required
        />
      </label>

      <label>Company:
        <input
          type="text"
          value={company}
          onChange={e => setCompany(e.target.value)}
          required
        />
      </label>

      <label>Status:
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </label>

      <label>Date Applied:
        <input
          type="date"
          value={dateApplied}
          onChange={e => setDateApplied(e.target.value)}
          required
        />  
      </label>
      <button type="submit">Add Application</button>
    </form>
  );
}
