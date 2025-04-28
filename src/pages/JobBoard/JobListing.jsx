import React from 'react';
import JobCard from './JobCard';  

const JobList = ({ jobs }) => {
  return (
    <div className="job-list">
      {jobs.length > 0 ? 
        jobs.map(job => {
          // Check if job is not null and has a valid id
          return (<JobCard key={job.id} job={job} />) 
        }
      ): 
        <p>No jobs found</p>
      }
    </div>
  );
};

export default JobList;
