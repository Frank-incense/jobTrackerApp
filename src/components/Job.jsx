import { useOutletContext, useParams } from "react-router-dom";
import DOMPurify from 'dompurify';
import './job.css';

function Job() {
    const { id } = useParams();
    const [outJobs] = useOutletContext();

    // Validate ID parameter
    if (!id || isNaN(id)) {
        return (
            <div className="error-message">
                ⚠️ Invalid job ID
            </div>
        );
    }
    const jobId = Number(id);

    // Handle loading state
    if (outJobs.length === 0) {
        return <p className="loading-state">Loading opportunities...</p>;
    }

    // Find the specific job
    const job = outJobs.find(job => job.id === jobId);

    // Handle job not found
    if (!job) {
        return (
            <div className="error-message">
                ⚠️ Job listing not found
            </div>
        );
    }

    // Sanitize HTML content
    const cleanContents = DOMPurify.sanitize(job.contents);

    return (
        <div className="job-container">
            {/* Job Header */}
            <div className="job-header">
                <h1 className="job-title">{job.name}</h1>
                
                {/* Meta Information */}
                <div className="job-meta">
                    <div className="job-meta-item">
                        <svg className="meta-icon" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <span>{job.location || 'Remote'}</span>
                    </div>
                    <div className="job-meta-item">
                        <svg className="meta-icon" viewBox="0 0 24 24">
                            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                        </svg>
                        <span>{job.type || 'Full-time'}</span>
                    </div>
                </div>
            </div>

            {/* Job Content */}
            <div 
                className="job-content"
                dangerouslySetInnerHTML={{ __html: cleanContents }} 
            />

            {/* Apply Button */}
            <a
                href={job.refs?.landing_page}
                target="_blank"
                rel="noopener noreferrer"
                className="apply-button"
            >
                Apply Now
                <svg className="button-icon" viewBox="0 0 24 24">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
            </a>
        </div>
    );
}

export default Job;