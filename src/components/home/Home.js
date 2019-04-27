import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';
import Wayste from '../wayste/'





export default class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
			picture: 0,
		};

		this.onDrop = this.onDrop.bind(this);		
	}
	

	onDrop = (pictureFile) => {
		console.log("Uploading image.");
		console.log(pictureFile);
		this.setState({
			picture: pictureFile
		});
	}
	
	async function quickstart() {
		// Imports the Google Cloud client library
		const vision = require('@google-cloud/vision');
	  
		// Creates a client
		const client = new vision.ImageAnnotatorClient();
	  
		// Performs label detection on the image file
		const [result] = await client.labelDetection('./resources/wakeupcat.jpg');
		const labels = result.labelAnnotations;
		console.log('Labels:');
		labels.forEach(label => console.log(label.description));
	  }


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

				{this.state.picture!=0 ? <Wayste/> : <p>Nothing Uploaded</p>}

			</>
		);
	}


};
