import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";

const initState = {
    jobs: [],
    filter: {
        role: '',
        level: '',
        languages: [],
        tools: []
    }
}

function jobsReducer(state = initState, action) {
    switch(action.type) {
        case 'FETCH_JOBS':
            return {
                ...state,
                jobs: action.jobs
            }
        case 'UPDATE_ROLE':
            return {
                ...state,
                filter: {
                    ...state.filter,
                    role: action.role
                }
            }
        case 'UPDATE_LEVEL':
            return {
                ...state,
                filter: {
                    ...state.filter,
                    level: action.level
                }
            }
        case 'UPDATE_LANGUAGE':
            if(state.filter.languages.some(lang => lang === action.language)) {
                return state;
            }
            return {
                ...state,
                filter: {
                    ...state.filter,
                    languages: [...state.filter.languages, action.language]
                }
            }
        case 'UPDATE_TOOL':
            if(state.filter.tools.some(tool => tool === action.tool)) {
                return state;
            }
            return {
                ...state,
                filter: {
                    ...state.filter,
                    tools: [
                        ...state.filter.tools,
                        action.tool
                    ]
                }
            }
        case 'REMOVE_ROLE':
            return {
                ...state,
                filter: {
                    ...state.filter,
                    role: ''
                }
            }
        case 'REMOVE_LEVEL':
            return {
                ...state,
                filter: {
                    ...state.filter,
                    level: ''
                }
            }
        case 'REMOVE_LANGUAGE':
            const languages = state.filter.languages.filter(lang => lang !== action.language);
            return {
                ...state,
                filter: {
                    ...state.filter,
                    languages
                }
            }
        case 'REMOVE_TOOL':
            const tools = state.filter.tools.filter(tool => tool !== action.tool);
            return {
                ...state,
                filter: {
                    ...state.filter,
                    tools
                }
            }
        case 'CLEAR_ALL':
            return {
                ...state,
                filter: {
                    role: '',
                    level: '',
                    languages: [],
                    tools: []
                }
            };
        default:
            return state;
    }
}

export const fetchJobs = () => {
    return async (dispatch) => {
        try {
            const res = await fetch(`${process.env.PUBLIC_URL}/assets/data.json`);
            const data = await res.json();
            dispatch({
                type: 'FETCH_JOBS',
                jobs: data
            });            
        } catch(err) {
            console.log(err.message);
        }
    }
}

const store = createStore(jobsReducer, applyMiddleware(thunk));

export default store