import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const modalRoot:any = document.getElementById('modal-root');

interface IAppState{
    el:any
}

interface IProps{}

class Modal extends React.Component<IProps, IAppState>{
	constructor(props:any) {
    	super(props);
    	this.state= {el:document.createElement('div')}
  }


  componentDidMount(){
  	modalRoot.appendChild(this.state.el)
  }
  componentWillUnmount(){
  	modalRoot.removeChild(this.state.el)
  }

  render(){
  	return ReactDOM.createPortal(this.props.children, this.state.el)
  }
}


export default Modal;