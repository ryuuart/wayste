import React, {Component} from 'react';
import './App.css';
import ImageUploader from 'react-images-upload';
import Home from './components/home/Home';
import Wayste from './components/wayste/'


class App extends Component {
  constructor(props) {
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
  render() {
    return (
      <main>
        <h1>Wayste</h1>
        <h2>Can I Throw This Away?</h2>
        <h3>Choose a button or upload a photo and see</h3>
        <section>
          <div className="button">batteries</div>
          <div className="button">printers</div>
          <div className="button">cables</div>
          <ImageUploader 
              fileContainerStyle={{
                margin: 0,
                padding: 0,
                width: '100%',
                boxShadow: 'none',
              }}
              buttonStyles={{
                margin: 0,
                backgroundColor: 'black',
                color: 'white',
                width: '100%',
                borderRadius: '20vw',
                padding: '2.0vw',
                textAlign: 'center',
                fontSize: '3.15vw'
              }}
              withLabel={false}
              withIcon={false}
              widthIcon={true}
							buttonText="choose images"
							onChange={this.onDrop}
							imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
							maxFileSize={5242880}
				/>


				{ this.state.picture != 0 ? <Wayste/> : <p> Nothing Uploaded </p> }
        </section>
        <img src="" alt=""/>
      </main>
    );
  }
}

export default App;
