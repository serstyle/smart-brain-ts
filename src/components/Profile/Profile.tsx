import * as React from 'react';
import './Profile.css';
// import UploadImg from './UploadImg'
import {IUser} from '../../App'

interface IProps{
	loadUser:any,
	isProfileOpen:boolean,
	user:IUser,
	toggleModal: any
}

interface IState { //user for the params of onProfileUpdate
	name:string,
	age:string,
	pet:string
}

class Profile extends React.Component<IProps>{
	state = {
		name:this.props.user.name,
		age:this.props.user.age,
		pet:this.props.user.pet
	}
 
	// onFormChange = (event:React.FormEvent<HTMLInputElement>):void => {
	// 	const {id, value}: {id:string; value:string} = event.currentTarget
	// 	this.setState({
	// 		[id]:value
	// 	})
	// }

	onProfileUpdate = (data:IState):void =>{
		const token:any = window.sessionStorage.getItem('token')
		fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
			method:'post',
			headers:{'Content-Type': 'application/json',
			'Authorization': token
			},
			body:JSON.stringify({formInput: data})
		})
		.then(resp =>{
			if(resp.status === 200 || resp.status === 304){
				this.props.loadUser({...this.props.user, ...data})
				this.props.toggleModal()
			}
		})
		.catch(err =>console.log(err))
	}

	render(){
		const { user } = this.props;
		const joined = user.joined.substring(0,10);
		const { name, pet, age} = this.state;
		return(
			<div className='profile-modal'>
				<form className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
					<main className="pa4 black-80 w-80">
						<img
							src="http://tachyons.io/img/logo.jpg"
							className="br-100 ba h3 w3 dib" alt="avatar" 
									/>
						{/* <UploadImg user={this.props.user} /> */}
						<h1>{this.state.name}</h1>
						<h4>Image submitted: {user.entries}</h4>
						<p>Member since: {joined}</p>
						<p>Age: {user.age}</p>
						<p>Pet: {user.pet}</p>
						<hr />
						<div className="measure">
							<label className="db fw6 lh-copy f6" htmlFor="user-name">Name: </label>
							<input
								onChange={e=>this.setState({name:e.currentTarget.value})}								
								placeholder='John'
								className="pa2 ba w-100"
								type="text"
								name="user-name"
								id="name"
							/>
							<label className="db fw6 lh-copy f6" htmlFor="user-age">Age: </label>
							<input
								onChange={e=>this.setState({age:e.currentTarget.value})}
								placeholder='24'
								className="pa2 ba w-100"
								type="text"
								name="user-age"
								id="age"
							/>
							<label className="db fw6 lh-copy f6" htmlFor="user-pet">Pet: </label>
							<input
								onChange={e=>this.setState({pet:e.currentTarget.value})}
								placeholder='dragon'
								className="pa2 ba w-100"
								type="text"
								name="user-pet"
								id="pet"
							/>
							<div style={{display:'flex', justifyContent: 'space-evenly'}}>
								<input 
									onClick={() => this.onProfileUpdate({name, age, pet})}
									type='button'
									value='Save'
									id='save'
									name='save'
									className='b ma2 pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'/>
									<input 
									onClick={this.props.toggleModal}
									type='button'
									value='Cancel'
									id='cancel'
									name='cancel'
									className='b ma2 pa2 grow pointer hover-white w-40 bg-light-red b--black-20'/>
							</div>
						</div>
					</main>
					<div className='modal-close' onClick={this.props.toggleModal}>&times;</div>
				</form>
			</div>
		)
	}
}

export default Profile;