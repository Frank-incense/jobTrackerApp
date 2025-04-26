import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ApplyForm() {
  const  params = useParams();
  
  // State hooks for controlled inputs 
  const [fullName, setFullName]       = useState('');
  const [email, setEmail]             = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile]   = useState(null);

  // Handle form submission 
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ fullName, email, coverLetter, resumeFile });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {/* Full Name Field */}
      <label htmlFor="fullName">Full Name:</label>
      <input
        id="fullName"
        type="text"
        value={fullName}
        onChange={e => setFullName(e.target.value)}  /* controlled via state */ 
        required
      />

      {/* Email Field */}
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}      /* email type enforces format */ 
        required
      />

      {/* Cover Letter Field */}
      <label htmlFor="coverLetter">Cover Letter:</label>
      <textarea
        id="coverLetter"
        rows={4}
        value={coverLetter}
        onChange={e => setCoverLetter(e.target.value)}/* multiline controlled input */
        required
      />

      {/* Resume Upload (File Input) */}
      <label htmlFor="resume">Resume Upload:</label>
      <input
        id="resume"
        type="file"
        accept=".pdf,.doc,.docx"                    /* limit to document types */ 
        onChange={e => setResumeFile(e.target.files[0])} /* capture file in state */ 
        required
      />

      {/* Submit Button */}
      <button type="submit">
        Submit Application
      </button>
    </form>
  );
}

