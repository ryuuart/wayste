var express = require('express');
var router = express.Router();
var fs = require('fs')


async function visionDataSend(){

  let vision = require('@google-cloud/vision');
  let client = new vision.ImageAnnotatorClient();

  const [results] = await client.labelDetection("./test.jpg");
  //console.log(results);

  const lables = results.labelAnotations;
  //console.log("Label:");
  //lables.forEach(label => console.log(label));
 


  return results;
};


function saveData(data){
	var writer = fs.createWriteStream('output.txt');
	writer.write(JSON.stringify(data));
	writer.close();
}



/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  console.log("running vision data send.");

 //visionDataSend().then((data)=>{});

});

// returns json from freshly render visionDataSend()

/*
router.post('/', function(req, res){
	visionDataSend().then((data) => {
	  
	});
});
*/

router.get('/saved', function(req, res, next){
	//var reader = fs.createReaderStream('output.txt');
	var d;

	fs.readFile("output.txt", "UTF8", function(err, data) {
    		if (err) { throw err };
    		//global_data = data;
    		//console.log(global_data);
		
		//console.log(JSON.parse(data));
		res.setHeader('Content-Type', 'application/json');
    		res.end(data);
	});

	
	



});



module.exports = router;
