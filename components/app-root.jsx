// app-root.jsx
import React from 'react';
import GithubUser from './github-user';
import $ from 'jquery';

class AppRoot extends React.Component {
	
	constructor(){
		
		super();

		let data = {
			user: {}
		};

		this.state = data;
	}

	processUser(url){

		let _this = this;

		$.getJSON(url, (user) => {
		
		  return user;
		
		}).success(function(user){
			
			var repos_url = user.repos_url;
			
			$.getJSON(repos_url, (user_repos) => {
			  
			  user.repos = user_repos;
			  _this.setState({
			  	data: {
			  		user: user
			  	}
			  });

			  $('#github_username').val('');

			});

		}).fail(() => {
			_this.setState({
		  	data: {
		  		user: {
		  			not_found: true
		  		}
		  	}
		  });
		});
	}

	getNewUser(e){

		e.preventDefault();
		var github_username = React.findDOMNode(this.refs.github_username).value.trim();
		let url = 'https://api.github.com/users/' + github_username;
		this.processUser(url);

	}

	componentDidMount(){

		let github_username = this.props.github_username;
		let url = 'https://api.github.com/users/' + github_username;

		this.processUser(url);
		
		$('#github_username').focus();

	}

	render(){
		
		let user = {};
		
		if(this.state.data){;
			user = this.state.data.user;
		}

		return (
			<div>
				<form onSubmit={ this.getNewUser.bind(this) }>
					<div className="mdl-textfield mdl-js-textfield textfield-demo">
				    <input placeholder="Type any github username and hit enter" className="mdl-textfield__input" id="github_username" type="text" ref="github_username" />
				  	<label className="mdl-textfield__label" htmlFor="github_username"></label>
				  </div>
				</form>
				<GithubUser user={ user }/>
			</div>
		);
	}
}

export default AppRoot;