import { useSelector } from "react-redux"
import JobItem from "./JobItem";
import FiltersList from "./FiltersList";

function Main() {

    const jobs = useSelector(state => state.jobs);
    const filter = useSelector(state => state.filter);
    console.log(filter);    
    
    const filteredJobs = jobs.filter(job => {
        const roleMatch = filter.role != '' ? filter.role == job.role : true;     
        
        const levelMatch = filter.level == '' || job.level == filter.level;

        const langMatch = filter.languages.length > 0 ? filter.languages.every(lang => job.languages.includes(lang)) : true;     

        const toolMatch = filter.tools.length > 0 ? filter.tools.every(tool => job.tools.includes(tool)) : true;

        return roleMatch && levelMatch && langMatch && toolMatch
    })

    const jobItems = filteredJobs.map(job => <JobItem key={job.id} id={job.id} />)
    
    return (
        <>
        <main>
            <FiltersList />
            <ul>
                {jobItems}
            </ul>
        </main>
        <div className="attribution">
                Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
                Coded by <a href="https://www.frontendmentor.io/profile/halelite">Hale</a>.
            </div>
        </>
    )
}

export default Main