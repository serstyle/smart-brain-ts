import React from 'react';

interface IProps{
  name:string,
  entries:number
}


class Rank extends React.Component<IProps>{
  state = {
    emojis: '',
    entries : this.props.entries
  }


  componentDidUpdate(prevState:IProps, prevProps:IProps){
    if(prevState.entries === this.props.entries){
      return null
    }
    else{
      this.generateEmoji(this.props.entries)
    }
    
  }

  generateEmoji = (entries:number):void =>{
    fetch(`https://yf4l8lpv0i.execute-api.us-east-1.amazonaws.com/dev/rank?rank=${entries}`)
    .then(resp => resp.json())
    .then(data => this.setState({emojis: data.input}))
    .catch(console.log)
  }

  render(){
    return (
      <div>
        <div className='white f3'>
          {`${this.props.name}, your current entry count is...`}
        </div>
        <div className='white f1'>
          {this.props.entries}
        </div>
        {/* <div className='white f3'>
          {this.state.emojis}
        </div> */}
      </div>
    );
  }
}

export default Rank;