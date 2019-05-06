import React from 'react';
// import '../Signin/Signin.css'

interface IProps{
  getProfileId:any,
  loadUser:any,
  onRouteChange:any
}

class Register extends React.Component<IProps> {
    state = {
      email: '',
      password: '',
      name: ''
    }

  onNameChange = (event:React.FormEvent<HTMLInputElement>) => {
    this.setState({name: event.currentTarget.value})
  }

  onEmailChange = (event:React.FormEvent<HTMLInputElement>) => {
    this.setState({email: event.currentTarget.value})
  }

  onPasswordChange = (event:React.FormEvent<HTMLInputElement>) => {
    this.setState({password: event.currentTarget.value})
  }
  
  saveAuthTokenInSession = (token:string)=>{
    window.sessionStorage.setItem('token', token)
  }

  onSubmitSignIn = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_DOMAIN}register`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.userId && data.success === 'true') {
          this.saveAuthTokenInSession(data.token)
          this.props.getProfileId(data.userId, data.token, this.props.onRouteChange, this.props.loadUser)          
          }
        })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <form onSubmit={this.onSubmitSignIn} className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 white">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 white" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 white"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 white" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 white"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6 white" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 white"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white"
                type="submit"
                value="Register"
              />
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default Register;