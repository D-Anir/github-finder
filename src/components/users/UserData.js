import React, { useEffect, Fragment, useContext } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';
import githubContext from '../../context/github/githubContext';

const UserData = ({ match }) => {
    
    const GithubContext = useContext(githubContext);

    const { loading, getUser, user, getRepos, repos } = GithubContext;

    useEffect(() => {
        getUser(match.params.login);
        getRepos(match.params.login);
        //eslint-disable-next-line
    }, []);
    
    const { 
        name,
        location,
        avatar_url, 
        company, 
        bio, 
        blog, 
        login, 
        html_url, 
        followers, 
        following, 
        public_repos, 
        public_gists, 
        hireable 
    
    } = user;


    if(loading)
        return <Spinner />;

    return (
        <Fragment>
            <Link to='/' className= 'btn btn-light'>Back To Search</Link>
            Hireable:{' '}
            {hireable ? <i className= 'fas fa-check text-success'/> : <i className='fas fa-times-circle text-danger'/>}

            <div className='card grid-2'>
                <div className='all-center'>
                    <img src={avatar_url} className='round-img' style={{width: '200px'}} />
                    <h1>{name}</h1>
                    <p>Location: {location }</p>
                </div>
                <div>
                    {bio && <Fragment>
                        <h1>BIO</h1>
                        <p>{bio}</p>
                    </Fragment>}
                    <a href={html_url} className='btn btn-dark my-1' >Visit Github Profile</a>
                    <ul>
                        <li>
                            {login && <Fragment>
                                <strong>Username: </strong> {login}
                            </Fragment>}
                        </li>
                        <li>
                            {blog && <Fragment>
                                <p>
                                    <strong>Blog: </strong>
                                    {blog}
                                </p>
                            </Fragment>}
                        </li>
                        <li>
                            {company && <Fragment>
                                <strong>Company: </strong> {company}
                            </Fragment>}
                        </li>
                    </ul>
                </div>
            </div>

            <div className='card text-center'>
                <div className='badge badge-primary'>
                    Followers: {followers}
                </div>
                <div className='badge badge-success'>
                    Following: {following}
                </div>
                <div className='badge badge-dark'>
                    Repositories: {public_repos}
                </div>
                <div className='badge badge-light'>
                    Gists: {public_gists}
                </div>
            </div>
            <br />
            <h3><strong>Top Public Repositories:</strong></h3>
            <Repos repos={repos} />
        </Fragment>
    );
    
}



export default UserData
