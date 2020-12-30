var database,dog,happydog,dogIMG,foodS,foodStock;
var fedDog,addFood;
var fedTime
var lastFed
var foodObj;

function preload(){
  dogIMG=loadImage("images/dogImg.png");
  happydog=loadImage("images/dogImg.png");
}

function setup(){
  createCanvas(1000,500);

  database=firebase.database();

  dog=createSprite(900,270,20,20);
  dog.addImage("standing",dogIMG);
  dog.scale=0.2;

  foodStock=database.ref('foodStock');
  foodStock.on("value",readStock);

  fedTime=database.ref('fedTime');
  fedTime.on('value',function(data){
    fedTime=data.val();
  });

  lastFed=database.ref('lastFed');
  lastFed.on('value',function(data){
     lastFed=data.val();
  });

  foodS=database.ref();
  foodS.on('value',function(data){
    foodS=data.val();
  });

  foodObj=new Food();
 
  var button=createButton('feedDog');
       button.position(1200,200);
       button.mousePressed(fedDog)

 var button=createButton('addFood');
       button.position(1200,150);
       button.mousePressed(addFood)

}

function draw(){
  background(46,139,73);

  foodObj.display();

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("lastFed : "+lastFed%12+"PM",350,30);
  }else if(lastFed===0){
    text("lastFed:12PM",350,30);
  }else{
    text("lastFed:"+lastFed+"AM",350,30);
  }

  drawSprites();

}

function readStock(data){
    foodS=data.val();
   
}

function writeStock(x){

  if(x>=0){
    x=0;
  }else{
    x=x+1;
  }

  database.ref('/').update({
    Food:x
  });
}

function fedDog(){
  dog.addImage("sitting",happydog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    fedTime:hour()
  });
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}