import React, { useReducer } from 'react';
import axios from 'axios';
import githubContext from './githubContext';
import githubReducer from './githubReducer';
import {
    SEARCH_USERS,
    GET_REPOS,
    SET_LOADING,
    SHOW_ALERT,
    CLEAR_USERS,
    GET_USER
} from '../types';


let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV != 'production') {
    githubClientId =process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret =process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId =process.env.GITHUB_CLIENT_ID;
    githubClientSecret =process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
    const initialState = {
        users: [],
        loading: false,
        user: {

        },
        repos: []
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);

    // Search User
    const searchUsers = async (text) => {
        setLoading();
    
        const res = await axios
          .get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&?client_secret=${githubClientSecret}`);
    
        dispatch({ 
            type: SEARCH_USERS,
            payload: res.data.items
        });
      }


    // Get Single User Data
    const getUser = async (username) => {
        setLoading();
    
        const res = await axios
          .get(`https://api.github.com/users/${username}?client_id=${githubClientId}&?client_secret=${githubClientSecret}`);
    
        dispatch({
            type: GET_USER,
            payload: res.data
        });
    }

    // Get User Repos
    const getRepos = async (username) => {
        setLoading();
    
        const res = await axios
          .get(`https://api.github.com/users/${username}/repos?per_page=5&sort=asc&client_id=${githubClientId}&?client_secret=${githubClientSecret}`);
    
          dispatch({
              type: GET_REPOS,
              payload: res.data
          })
      }

    // Clear Users
    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    // Show Alert

    // Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    
    return (<githubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            getUser,
            clearUsers,
            getRepos
        }}
        >
            {props.children}
        </githubContext.Provider>
    );
};

export default GithubState;