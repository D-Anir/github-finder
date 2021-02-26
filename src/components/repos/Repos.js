import React, { useContext } from 'react';
import RepoItem from './RepoItem';
import githubContext from '../../context/github/githubContext';

export const Repos = () => {

    const GithubContext = useContext(githubContext);

    const{ repos } = GithubContext;

    return repos.map(repo => <RepoItem repo={repo} key={repo.id} />)
}

export default Repos;
