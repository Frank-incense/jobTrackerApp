import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <Link to={`/job/${job.id}`}><h3>{job.name}</h3>
      </Link>
      
      <p>{job.company.name}</p>
      {job.locations.map(loc=>{
        return <small>{loc.name}</small>
      })}
    </div>
  );
};

export default JobCard;
