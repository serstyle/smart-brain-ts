import * as React from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';
import './App.css';

export interface IUser {
  id: string;
  name: string;
  email: string;
  entries: number;
  joined: string;
  age: string;
  pet: string;
}

export interface IBoxes{
    leftCol: number,
    topRow: number,
    rightCol: number,
    bottomRow: number,
    id?:string
}

interface IAppProps {
}

interface IAppState{
  input:string;
  imageUrl:string;
  boxes: [IBoxes];
  route: string;
  isPending:boolean;
  isSignedIn: boolean;
  isProfileOpen: boolean;
  user: IUser;
}

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState:IAppState = {
  input: '',
  imageUrl: '',
  boxes: [{
    leftCol: 0,
    topRow: 0,
    rightCol: 0,
    bottomRow: 0,
  }],
  route: 'signin',
  isPending: false,
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    age: '0',
    pet: ''
  }
}

class App extends React.Component<IAppProps, IAppState>{
  constructor(props:IAppProps) {
    super(props);
    this.state = initialState;
  }

  componentDidMount(){
    this.setState({isPending:true})
    const token:string | null = window.sessionStorage.getItem('token')
    if(token){
      fetch('http://localhost:3000/signin',{
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then(resp => resp.json())
      .then(data => {
        const id:string = data.id
        if(data && id){
          this.getProfileId(id, token, this.onRouteChange, this.loadUser)
        }
      })
      .catch(err=>{
        console.log(err)
        this.setState({isPending:false})})
    }else this.setState({isPending:false})
  }

  loadUser = (data:any):void => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      age: data.age,
      pet: data.pet
    }})
  }

  calculateFaceLocation = (data:any) => {
    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image:any = document.getElementById('inputimage');
    console.log('image', typeof image)
    const width = Number(image.width);
    const height = Number(image.height);
    const faceArr = data.outputs[0].data.regions.map( (face:any) => {
      let clarifaiFace = face.region_info.bounding_box;
      let id = face.id;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height),
        id
      }
    });
    return faceArr;
    
  }

  getProfileId = (userId:string, token:string, onRouteChange:any, loadUser:any):void =>{
    fetch(`http://localhost:3000/profile/${userId}`,{
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    .then(resp => resp.json())
    .then(user => {
      onRouteChange('home')
      loadUser(user)
      this.setState({isPending:false})
      console.log('get user ' + this.state.user.entries)
    })
  }

  displayFaceBox = (boxes:[IBoxes]) => {
    this.setState({boxes: boxes});
  }

  onInputChange = (event:React.FormEvent<HTMLInputElement>) => {
    this.setState({input: event.currentTarget.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    const token:any = window.sessionStorage.getItem('token')
    fetch('http://localhost:3000/imageurl',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        input: this.state.input
      })
    }
    )
    .then(response => response.json())
    .then(response => {
      
      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState({user:{...this.state.user, entries: count}})
          })
          .catch(console.log)

      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route:string):void => {
    if (route === 'signout') {
     return this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  toggleModal = () =>{
    this.setState(prevState =>({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }))
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes, isProfileOpen, user, isPending } = this.state;
    return (
      <div className="App">
         <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} toggleModal={this.toggleModal} onRouteChange={this.onRouteChange} />
             {isProfileOpen  && 
               <Modal>
                <Profile loadUser={this.loadUser} isProfileOpen={isProfileOpen} user={user} toggleModal={this.toggleModal}/>  
               </Modal>
             }
        {!isPending && <div>
        { route === 'home'
          ? <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
            </div>
          : (
             route === 'signin'
             ? <Signin getProfileId={this.getProfileId} loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register getProfileId={this.getProfileId} loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }

        </div>}
      </div>
    );
  }
}

export default App;
