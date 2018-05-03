export default {
	state: {
		api_token: null,
		u_id: null,
		name: null,
		u_class: null,
		u_institution: null,
		u_program: null,
		matric_no: null,
		email: null
	},
	initialize() {
		var user = JSON.parse(localStorage.getItem('user'));
		if(user){
			this.state.name = user.name;
			this.state.u_id = user.u_id;
			this.state.u_institution = user.u_institution;
			this.state.u_class = user.u_class;
			this.state.u_program = user.u_program;
			this.state.api_token = user.token;
			this.state.email = user.email;
			this.state.matric_no = user.matric_no;
		}else{
			this.state.name = null;
			this.state.u_id = null;
			this.state.u_institution = null;
			this.state.u_class = null;
			this.state.u_program = null;
			this.state.api_token = null;
			this.state.email = null;
			this.state.matric_no = null;	
		}
	},
	set(data) {
		var id = data.user_details.user_id;
		var user_program = data.user_details.user_program;
		var user_institution = data.user_details.user_institution;
		var user_class = data.user_details.user_class;
		var token = data._token;
		var name = data.user_details.name;
		var email = data.user_details.email;
		var matric_no = data.user_details.matric_no;
		
		var user = JSON.parse(localStorage.getItem('user'));
		if(user){
			this.remove()
		}
		var user = {
			u_id: id,
			u_program: user_program,
			u_institution: user_institution,
			u_class: user_class,
			token: token,
			name: name,
			email: email,
			matric_no: matric_no,
		};
		localStorage.setItem('user', JSON.stringify(user))
		this.initialize()
	},
	remove() {
		localStorage.removeItem('user')
		this.initialize()
	}
}
