import React, {Component} from 'react';
import './App.css';
import ImageUploader from 'react-images-upload';
import Wayste from './components/wayste/'





class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
			picture: 0,
			data: []
		};

		this.onDrop = this.onDrop.bind(this);
		// this.visionDataSend = this.visionDataSend.bind(this);		
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
    
    console.log("running google vision.");
		// visionDataSend();

  }
  


  
  componentDidMount(){
    console.log("trying vision.")



  }

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
							widthIcon={true}
							buttonText="Chooese images"
							onChange={this.onDrop}
							imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
							maxFileSize={5242880}
				/>


				{ this.state.picture !== 0 ? <Wayste/> : <p> Nothing Uploaded </p> }
        </section>
        <img src="" alt=""/>
      </main>
    );
  }
}

export default App;
