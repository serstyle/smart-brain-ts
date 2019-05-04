import React from 'react';
// import FileBase64 from 'react-file-base64';

// class UploadImg extends React.Component{
//     state = {
// 		name:this.props.user.name,
//         img:'',
//         files: []
// 	}
// 	onUpdateImg = (event) =>{
// 		console.log(event.target.files)
// 		const img = event.target.files[0]
// 		this.setState({img: img})
// 	}
// 	onImageSubmit = (event) =>{
//         event.preventDefault();
//         console.log(this.state.files[0].base64)
// 		fetch(`https://s9jufdb5k1.execute-api.us-east-1.amazonaws.com/prod/upload-to-s3-bucket`,{
//             mode:'no-cors',
//             method:'post',
// 			headers:{'Content-Type': 'application/json'},
// 			body:JSON.stringify({user_avatar: this.state.files[0].base64})
// 		})
// 		.then(resp=> console.log('ok'))
// 		.catch(err=> console.log(err))
//     }
    
//     getFiles(files){
//         this.setState({ files: files })
//       }

// 	render(){
// 		return(
//             <div>
//                 <FileBase64
//                 multiple={ true }
//                 onDone={ this.getFiles.bind(this) } />
//                 <button onClick={this.onImageSubmit}>Send</button>
//             </div>
//         )
// 	}
// }

// export default UploadImg;