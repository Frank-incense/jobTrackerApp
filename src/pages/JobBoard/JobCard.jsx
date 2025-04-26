import React from 'react';
import { Link } from 'react-router-dom';
import './JobCard.css'; // Assuming you have some CSS for styling

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <Link to={`/job/${job.id}`}>
        <h3>{job.name}</h3>
      </Link>
      
      <p>{job.company.name}</p>
      {job.locations.map((loc, index) => (
        <small key={`${job.id}-${loc.id || index}`}>
          {loc.name}
        </small>
      ))}
    </div>
  );
};

export default JobCard;