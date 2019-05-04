import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

interface IProps{
	onRouteChange:any,
	toggleModal:any
}

interface IState{
	dropDownOpen:boolean
}

class ProfileIcon extends React.Component<IProps, IState> {
	state = {
		dropDownOpen: false
	}

	toggle = () => {
		console.log(this.state.dropDownOpen)
	    this.setState(prevState => ({
	      dropDownOpen: !prevState.dropDownOpen
	    }));
	  }


	// toggle = () => {
	//     console.log(this.state.dropDownOpen)
	//     this.setState({
	//       dropDownOpen: !this.state.dropDownOpen
	//     }) }

	handleSignout = () =>{
		const token:any = window.sessionStorage.getItem('token')
		fetch(`http://localhost:3000/signout`, {
			method:'post',
			headers:{
				'Content-Type': 'application/json',
				'Authorization': token
			}
		})
		.then(resp => resp.json())
		.then(data =>{
			if(data === 'success'){
				this.props.onRouteChange('signout')
				window.sessionStorage.removeItem('token')
			}
		})
		.catch(err =>console.log(err))
	}
	
	render(){
		return(
			<div className='pa4 tc'>
				<Dropdown isOpen={this.state.dropDownOpen} toggle={this.toggle}>
					<DropdownToggle
			          tag="span"
			          data-toggle="dropdown"
			          aria-expanded={this.state.dropDownOpen}
			        >
			        	<img
					      src="http://tachyons.io/img/logo.jpg"
					      className="br-100 ba h3 w3 dib" alt="avatar" />
			        </DropdownToggle>
					<DropdownMenu 
					right
					className='b--transparent shadow-5' 
					style={{marginTop: '20px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
					  <DropdownItem onClick={this.props.toggleModal}>View Profile</DropdownItem>
					  <DropdownItem onClick={this.handleSignout} >Sign Out</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
			)
	}
}

export default ProfileIcon