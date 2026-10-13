import {createStore} from 'redux';
import userReducer from './features/auth/slice/userSlice';


const store = createStore(() => ({
    user : userReducer,
}));