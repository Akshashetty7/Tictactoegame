
import { combineReducers } from 'redux';
import StudentReducer  from '../components/student/studentReducer.js';


const rootReducer = combineReducers({
    StudentReducer: StudentReducer,
    // Add more reducers here as needed
});

export default rootReducer;