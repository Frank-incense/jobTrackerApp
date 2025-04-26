import { useOutletContext, useParams } from "react-router-dom"


function Job(){
    const params = useParams();
    const {id} = params;
    const outJobs = useOutletContext();
    
    const job = outJobs.find((job) => {
        if(job.id === Number(id)){
            return job;
        }
    });
    
    if (!job) {
        return <p>Loading...</p>;
    }
    
    // Assuming job.contents is a string containing HTML
    const example = job.contents;
    return(
        <>
            <h1>{job.name}</h1>
            <div dangerouslySetInnerHTML={{__html: example}}></div>
            <button type="button">Apply Now</button>
        </>
        
    )
}

export default Job