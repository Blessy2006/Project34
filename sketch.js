//Create variables here
var dog, dogImg, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  dogImg = loadImage('images/dogImg.png');
  
  happyDog = loadImage('images/dogImg1.png');
  
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
background(46,139,87);
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDog);
}
  drawSprites();
  //add styles here
  fill("red"); 
  stroke("black");
   text("Food remaining : "+foodS,170,200); 
   textSize(13);
   text("Note: Press UP_ARROW Key To Feed Drago Milk!",10,10);
}
function readStock(data) {
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }
  database.ref("Virtual Pet/Food").update({
    Food:x
  })
}
