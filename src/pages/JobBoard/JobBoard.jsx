import React, { useState, useEffect } from "react";
import JobList from "./JobListing";
import SearchBar from "./SearchBar";

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    fetch("https://www.themuse.com/api/public/jobs?page=1")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.results);
        setFilteredJobs(data.results);
      })
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = query
      ? jobs.filter((job) =>
          job.name.toLowerCase().includes(query.toLowerCase())
        )
      : jobs;
    setFilteredJobs(filtered);
  };

  return (
    <div className="job-board max-w-4xl mx-auto p-4">
      <SearchBar onSearch={handleSearch} />
      <JobList jobs={filteredJobs} />
    </div>
  );
};

export default JobBoard;
