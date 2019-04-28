async function visionDataSend(){

  let vision = require('@google-cloud/vision');
  let client = new vision.ImageAnnotatorClient();

  const [results] = await client.labelDetection("./src/images/desktop-1985856_1280.jpg");
  console.log(results);
  const lables = results.labelAnotations;
  console.log("Label:");
  lables.forEach(label => console.log(label));
  this.setState({data: lables});
};