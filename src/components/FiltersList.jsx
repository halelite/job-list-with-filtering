import { useDispatch, useSelector } from "react-redux";
import removeIcon from '../images/icon-remove.svg';

function FiltersList() {

    const filters = useSelector(state => state.filter);   
    const dispatch = useDispatch();
    
    function handleFilterRemove(e) {
        const el = e.target.tagName === 'IMG' ? e.target.parentElement : e.target;
        const {id} = el;        
        const value =  el.previousElementSibling.innerHTML;
        
        switch(id) {
            case 'role':
                dispatch({
                    type: 'REMOVE_ROLE',
                })
                break;
            case 'level':
                dispatch({
                    type: 'REMOVE_LEVEL',
                })
                break;
            case 'language':
                dispatch({
                    type: 'REMOVE_LANGUAGE',
                    language: value
                })
                break;
            case 'tool':
                dispatch({
                    type: 'REMOVE_TOOL',
                    tool: value
                })
                break;
        }
    }

    function handleClearAll() {
        dispatch({type: 'CLEAR_ALL'})
    }

    const filterEmpty = filters.role === '' && filters.level === '' && filters.languages.length === 0 && filters.tools.length === 0 ? true : false;

    const roleFilter = filters.role ? <div className="filter-item">
        <h5>{filters.role}</h5>
        <button id='role' type="button" onClick={handleFilterRemove}>
            <img src={removeIcon} alt="" />
        </button>
    </div> : '';

    const levelFilter = filters.level ? <div className="filter-item">
        <h5>{filters.level}</h5>
        <button id='level' type="button" onClick={handleFilterRemove}>
            <img src={removeIcon} alt="" />
        </button>
    </div> : '';

    const langFilter = filters.languages.length > 0 ? filters.languages.map(lang => (
        <div key={lang} className="filter-item">
            <h5>{lang}</h5>
            <button id='language' type="button" onClick={handleFilterRemove}>
            <img src={removeIcon} alt="" />
        </button>
        </div>
    )) : '';

    const toolFilter = filters.tools.length > 0 ? filters.tools.map(tool => (
        <div key={tool} className="filter-item">
            <h5>{tool}</h5>
            <button id='tool' type="button" onClick={handleFilterRemove}>
            <img src={removeIcon} alt="x" />
        </button>
        </div>
    )) : '';

    return (
        <>
        {!filterEmpty &&
        <div className="filter-list">
            <div className="filters">
                {roleFilter}
                {levelFilter}
                {langFilter}
                {toolFilter}
            </div>
            <button onClick={handleClearAll}>Clear</button>
        </div>
        }
        </>
    )
}

export default FiltersList