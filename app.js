const express = require('express');
const app = express();
const port =3000;
const bodyparser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelpcamp");

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));

var campgroundSchema = new mongoose.Schema({

	name: String,
	image: String,
	description:String
});

var Campground = mongoose.model("Campground", campgroundSchema);


/*Campground.create(
{
	name: "Granite Hill",
	image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350",
	description: "This is a huge Granite Hill and Enjoy The Peace"

}, (err, campground)=>{

	console.log(campground);
})

*/


app.get('/',(req,res) =>{

res.render('landing');

});


app.get('/campgrounds', (req,res) =>{
 

Campground.find({},(err,allcampgrounds) =>{

  if(err){

  	console.log(err);
  }
  else{

  	res.render("index",{campgrounds : allcampgrounds});
  }

})


});



app.post('/campgrounds', (req,res) =>{

var name = req.body.name;
var image = req.body.image;
var desc = req.body.description;
var newCampground = {name: name, image:image, description:desc};
Campground.create(newCampground,(err,newlyCreated)=>{

	if(err){

      console.log(err);
	}
	else{
       
       res.redirect("/campgrounds");
	}
})



});

app.get('/campgrounds/new', (req,res)=>{

res.render("add");

});


app.get('/campgrounds/:id',(req,res) =>{

	Campground.findById(req.params.id, (err, foundCampground)=>{
     
     if(err){

     	console.log(err);
     }
     else{
      
        res.render("show", {campground : foundCampground});      
     }

	});

 
	
});


app.listen(port, ()=>{

	console.log(`Yelpcamp Website is running on ${port}`);
})