import { useDispatch, useSelector } from "react-redux";

function JobItem({id}) {

    const job = useSelector(state => state.jobs[id - 1]);
    
    const dispatch = useDispatch();

    function handleFilterChange(e) {
        const {type} = e.target;
        console.log(type);
        
        switch(type) {
            case 'role':
                dispatch({
                    type: 'UPDATE_ROLE',
                    role: e.target.innerHTML
                })
                break;
            case 'level':
                dispatch({
                    type: 'UPDATE_LEVEL',
                    level: e.target.innerHTML
                })
                break;
            case 'language':
                dispatch({
                    type: 'UPDATE_LANGUAGE',
                    language: e.target.innerHTML
                })
                break;
            case 'tool':
                dispatch({
                    type: 'UPDATE_TOOL',
                    tool: e.target.innerHTML
                })
                break;
        }
    }    

    const jobLanguages = job.languages.map((lang, index) => (
        <li type='language' onClick={handleFilterChange} key={index}>{lang}</li>
    ));

    const jobTools = job.tools.map((tool, index) => (
        <li type='tool' onClick={ handleFilterChange} key={index}>{tool}</li>
    ))

    return (
        <li className={`${job.featured ? 'featured' : ''} job-item`}>
            <div className="image">
                <img src={`${process.env.PUBLIC_URL}/${job.logo}`} alt={job.company} />
            </div>
            <div className="info">
                <div className="name">
                    <h5 className="company-name">{job.company}</h5>
                    {job.new &&
                    <h4 className="new">NEW!</h4> 
                    }
                    {job.featured &&
                    <h4 className="isFeatured">FEATURED</h4>
                    }
                </div>
                <h3>{job.position}</h3>
                <div className="details">
                    <span>{job.postedAt}</span>
                    <span>&#x2022;</span>
                    <span>{job.contract}</span>
                    <span>&#x2022;</span>
                    <span>{job.location}</span>
                </div>
            </div>
            <ul className="filters">
                <li type='role' onClick={handleFilterChange}>{job.role}</li>
                <li type='level' onClick={handleFilterChange}>{job.level}</li>
                {jobLanguages}
                {jobTools}
            </ul>
        </li>
    )
}

export default JobItem