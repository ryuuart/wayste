import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';
import Wayste from '../wayste/'

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();





export default class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
			picture: 0,
			data: []
		};

		this.onDrop = this.onDrop.bind(this);
		this.visionDataSend = this.visionDataSend.bind(this);		
	}
	

	
	// onDrop - run chain of actions once user submits an image.
	onDrop = (pictureFile) => {
		console.log("Uploading image.");
		console.log(pictureFile);
		
		// Added image to state
		this.setState({
			picture: pictureFile
		});

		// send image to google
		if(this.state.picture != 0){
			this.visionDataSend();
		}

	}
	
	
	async visionDataSend(){
		const [results] = await client.labelDetection(this.state.picture);
		console.log(results);
		const lables = results.labelAnotations;
		console.log("Label:");
		lables.forEach(label => console.log(label));
		// this.setState({data: lables});
	};


	

	render(){

		return (
			<>
				<h2>Upload Your Image</h2>
				<ImageUploader 
							widthIcon={true}
							buttonText="Chooese images"
							onChange={this.onDrop}
							imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
							maxFileSize={5242880}
				/>


				{ this.state.picture != 0 ? <Wayste/> : <p> Nothing Uploaded </p> }
			</>
		);
	}


};



// async function quickstart() {
//     // Imports the Google Cloud client library
//     const vision = require('@google-cloud/vision');
  
//     // Creates a client
//     const client = new vision.ImageAnnotatorClient();
  
//     // Performs label detection on the image file
//     const [result] = await client.labelDetection('./src/images/desktop-1985856_1280.jpg');
//     const labels = result.labelAnnotations;
//     console.log('Labels:');
//     labels.forEach(label => console.log(label.description));
//   }