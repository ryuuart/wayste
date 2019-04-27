import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';
import Wayste from '../wayste/'






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

		const vision = require('@google-cloud/vision');
		const client = new vision.ImageAnnotatorClient();

		const [results] = await client.labelDetection("./src/images/desktop-1985856_1280.jpg");
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



