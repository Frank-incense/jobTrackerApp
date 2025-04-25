import React from 'react';
import JobCard from './JobCard';  

const JobList = ({ jobs }) => {
  return (
    <div className="job-list">
      {jobs.length > 0 ? 
        jobs.map(job => {
          console.log(job)
          return (<JobCard key={job.id} job={job} />) 
        }
      ): 
        <p>No jobs found</p>
      }
    </div>
  );
};

export default JobList;
