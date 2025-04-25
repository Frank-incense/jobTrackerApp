import { useParams } from "react-router-dom"

function Job(){
    const params = useParams() 
    // const example = "hi"
    return(
        <h1>Job</h1>
        // <div dangerouslySetInnerHTML={{__html: example}}></div>
    )
}

export default Job