import React from 'react';
import './Signin.css'

interface IProps{
  getProfileId:any,
  loadUser:any,
  onRouteChange:any
}

class Signin extends React.Component<IProps> {
    state = {
      signInEmail: '',
      signInPassword: ''
    }

  onEmailChange = (event:React.FormEvent<HTMLInputElement>):void => {
    this.setState({signInEmail: event.currentTarget.value})
  }

  onPasswordChange = (event:React.FormEvent<HTMLInputElement>) => {
    this.setState({signInPassword: event.currentTarget.value})
  }

  saveAuthTokenInSession = (token:string)=>{
    window.sessionStorage.setItem('token', token)
  }

  onSubmitSignIn = (e:React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault()
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
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
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <form onSubmit={this.onSubmitSignIn} className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 white">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 white" htmlFor="email-address">Email</label>
                <input
                  className="white hover-black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6 white" htmlFor="password">Password</label>
                <input
                  className="white hover-black b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
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
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p  onClick={() => onRouteChange('register')} className="f6 link dim black db pointer white">Register</p>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default Signin;