import React, { useState, useEffect } from 'react';

export default function ApplicationsHistoryFetch() {
  const [applications, setApplications] = useState([]);    
  const [loading, setLoading]         = useState(true);    
  const [error, setError]             = useState(null);    

  useEffect(() => {
    const controller = new AbortController();              
    const signal     = controller.signal;

    async function fetchApplications() {
      try {
        const response = await fetch(
          'http://localhost:8000/applications',
          { signal }                                       
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();                
        setApplications(data);
      } catch (err) {
        if (err.name !== 'AbortError') {                   
          console.error('Fetch error:', err);
          setError('Failed to load applications.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();

    return () => {
      controller.abort();                                 
    };
  }, []); 

  if (loading) return <p>Loading applications…</p>;
  if (error)   return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">🧾 Applications History</h2>
      {applications.map(app => (
        <div
          key={app.id}
          className="border-b py-3 last:border-0 flex justify-between"
        >
          <div>
            <p className="font-medium">Job: {app.jobTitle}</p>
            <p className="text-sm text-gray-600">
              Company: {app.company}
            </p>
          </div>
          <div className="text-right">
            <p>
              Status: <span className="font-semibold">{app.status}</span>
            </p>
            <p className="text-sm text-gray-600">Date: {app.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
