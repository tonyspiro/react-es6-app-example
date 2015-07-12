// github-user.jsx
import React from 'react';

class GithubUser extends React.Component {
	
	render(){
		
		let user = this.props.user;
		let user_repos = '';
		if(user.not_found){
			return (
				<div>
					User not found
				</div>
			);
		}

		let style = {
			mdl_card: {
				'background': 'url(' + user.avatar_url + ') center / cover'
			},
			stars_count: {
				float: 'right'
			}
		};

		// Get user repos
		if(user.repos){
			let repos = user.repos;
			repos.sort(sort_by_stars);
			user_repos = repos.map((repo, i) => {
				return (
					<div key={"repo" + i}>
						<a href={ repo.html_url } target="_blank">{ repo.name }</a>
						<div style={ style.stars_count }>{ repo.stargazers_count }</div>
					</div>
				);
			});
		}

		return (
			<div className="mdl-card mdl-shadow--2dp demo-card-wide">
			  <a className="mdl-card__title" href={ "https://github.com/" + user.login } target="_blank" style={ style.mdl_card }>
			    <h2 className="mdl-card__title-text">{ user.name }</h2>
			  </a>
			  <div className="mdl-card__supporting-text">
			    { user.location }<br />
					{ user.email }<br />
					<h6>Repos</h6>
					{ user_repos }
			  </div>
			  <div className="mdl-card__actions mdl-card--border">
			    <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href={ "https://github.com/" + user.login } target="_blank">
			      { user.name } on Github
			    </a>
			  </div>
			</div>
		);
	}
}

function sort_by_stars(a,b) {
  if (a.stargazers_count > b.stargazers_count)
    return -1;
  if (a.stargazers_count < b.stargazers_count)
    return 1;
  return 0;
}

export default GithubUser;