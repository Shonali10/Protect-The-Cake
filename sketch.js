var suzie;
var bubble, bubbleimg, bubbleGroup, bigBubble;
var spray, sprayimg, sprayGroup;
var ant1, ant2, ant3, antimg , antGroup;
var cake, cakeimg;
var wall1, wall2, wall3, wall4, wall5, wall6;
var bg;
var gameover,gameoverImg;
var reset,resetImg

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

function preload(){
suzie_front = loadImage("images/suzie_front.png");
suzie_back = loadImage("images/suzie_back.png");
suzie_left = loadImage("images/suzie_left.png");
suzie_right = loadImage("images/suzie_right.png");
suzie_cry = loadImage("images/suzie_sad.png")

bubbleimg = loadImage("images/bubble.png");
sprayimg = loadImage("images/spray.png");
antimg = loadImage("images/ant.png");
cakeimg =loadImage("images/cake.png");
cakeimg1 =loadImage("images/cake_eat1.png");
cakeimg2 =loadImage("images/cake_eat2.png");
gameoverImg=loadImage("images/gameOver.png");
resetImg= loadImage("images/reset.png");
}

function setup(){
createCanvas(1366,625);
edges = createEdgeSprites();
wall1 = createSprite(150, 300, 20, 200);
wall2 = createSprite(1216, 300, 20, 200);
wall3 = createSprite(230, 300, 150, 20);
wall4 = createSprite(1140, 300, 150, 20);
wall5 = createSprite(683, 100, 500, 20);
wall6 = createSprite(683, 525, 500, 20);

wall1.shapeColor= rgb(25,170,76);
wall2.shapeColor= rgb(25,170,76);
wall3.shapeColor= rgb(25,170,76);
wall4.shapeColor= rgb(25,170,76);
wall5.shapeColor= rgb(25,170,76);
wall6.shapeColor= rgb(25,170,76);

cake = createSprite(683,312.5);
cake.addImage(cakeimg);
cake.scale = 0.28

//Doubt - how to make suzie appear randomly in these four positions -
//(1) 1000,100
//(2)366,100
//(3)1000,525
//(4)366,525


suzie = createSprite(1000,100);
suzie.addImage("front", suzie_front);
suzie.addImage("back", suzie_back);
suzie.addImage("left", suzie_left);
suzie.addImage("right", suzie_right);
suzie.scale = 0.19

ant1 =createSprite(1346,20,30,30);
   ant1.addImage(antimg);
   ant1.scale = 0.085;
   ant1.velocityX= 1.5
   ant1.velocityY= 1.5

   ant2 =createSprite(20,605,30,30);
   ant2.addImage(antimg);
   ant2.scale = 0.085;
   ant2.velocityX= 1.5
   ant2.velocityY= 1.5
   
   ant3 =createSprite(20,20,30,30);
   ant3.addImage(antimg);
   ant3.scale = 0.085;
   ant3.velocityX= 1.5
   ant3.velocityY= 1.5

sprayGroup=new Group();
bubbleGroup=new Group();
antGroup=new Group();
antGroup.add(ant1);
antGroup.add(ant2);
antGroup.add(ant3);

}

function draw(){

background(205,255,230);

suzie.collide(edges);


if(keyDown("left")){
   suzie.changeImage("left", suzie_left)
   suzie.x=suzie.x-3.5;

}
if(keyDown("right")){
   suzie.changeImage("right", suzie_right)
    suzie.x=suzie.x+3.5;
   }
if(keyDown("up")){
   suzie.changeImage("back", suzie_back)
   suzie.y=suzie.y-3.5;
   suzie.scale = suzie.scale - 0.0003
    }   
if(keyDown("down")){
   suzie.changeImage("front", suzie_front)
   suzie.y=suzie.y+3.5;
   suzie.scale = suzie.scale + 0.0003

   }
   if(gameState === PLAY) {
      
spawnSpray();
spawnBubble();
if(suzie.isTouching(sprayGroup)){
unconsciousAnts();
}else{
   antsWake();
   
}
protectBubble();


      if(ant1.isTouching(cake) || ant2.isTouching(cake) || ant3.isTouching(cake)){
        cake.addImage (cakeimg1);
        cake.lifetime = 20;
        cake.addImage (cakeimg2);
        gameState = END;
      }
   }
   if(gameState === END){
      sprayGroup.destroyEach();
      bubbleGroup.destroyEach();
      suzie.x = 30;
      suzie.y = 30;
      suzie.changeImage("cry",suzie_cry);
      ant1.destroy();
      ant2.destroy();
      ant3.destroy();
var gameover = createSprite(683,312.5);
gameover.addImage(gameoverImg);
var reset = createSprite(800,312.5);
reset.addImage(resetImg);
   }
   ant1.bounceOff(edges);
   ant2.bounceOff(edges);
   ant3.bounceOff(edges);
   
   
   ant1.bounceOff(wall1);
   ant1.bounceOff(wall2);
   ant1.bounceOff(wall3);
   ant1.bounceOff(wall4);
   ant1.bounceOff(wall5);
   ant1.bounceOff(wall6);
   
   ant2.bounceOff(wall1);
   ant2.bounceOff(wall2);
   ant2.bounceOff(wall3);
   ant2.bounceOff(wall4);
   ant2.bounceOff(wall5);
   ant2.bounceOff(wall6);
   
   ant3.bounceOff(wall1);
   ant3.bounceOff(wall2);
   ant3.bounceOff(wall3);
   ant3.bounceOff(wall4);
   ant3.bounceOff(wall5);
   ant3.bounceOff(wall6);
   
   ant1.bounceOff(suzie);
   ant2.bounceOff(suzie);
   ant3.bounceOff(suzie);
   
   // ant1.bounce(ant2);
   // ant1.bounce(ant3);
   // ant2.bounce(ant3);

   drawSprites();

}

function spawnSpray(){
if(frameCount % 200 === 0){
var spray = createSprite(100,random(100,525));
spray.addImage(sprayimg);
spray.scale = 0.25;

sprayGroup.add(spray);
spray.lifetime =200;
}
}

function spawnBubble(){
    if(frameCount % 700 === 0){
      var bubble = createSprite(1300,random(100,525));
      bubble.addImage(bubbleimg);
      bubble.scale = 0.022
      
      bubbleGroup.add(bubble);
      bubble.lifetime = 150;
      }
      }
function unconsciousAnts(){
  
      ant1.velocityX= 0;
      ant1.velocityY= 0;
      
      ant2.velocityX= 0;
      ant2.velocityY= 0;
   
      ant3.velocityX= 0;
      ant3.velocityY= 0;
      }
   
   function antsWake(){

      ant1.velocityX= 1.5;
      ant1.velocityY= 1.5;
      
      ant2.velocityX= 1.5;
      ant2.velocityY= 1.5;
   
      ant3.velocityX= 1.5;
      ant3.velocityY= 1.5;

      // ant1.bounceOff(edges);
      // ant2.bounceOff(edges);
      // ant3.bounceOff(edges);
      
      
      // ant1.bounceOff(wall1);
      // ant1.bounceOff(wall2);
      // ant1.bounceOff(wall3);
      // ant1.bounceOff(wall4);
      // ant1.bounceOff(wall5);
      // ant1.bounceOff(wall6);
      
      // ant2.bounceOff(wall1);
      // ant2.bounceOff(wall2);
      // ant2.bounceOff(wall3);
      // ant2.bounceOff(wall4);
      // ant2.bounceOff(wall5);
      // ant2.bounceOff(wall6);
      
      // ant3.bounceOff(wall1);
      // ant3.bounceOff(wall2);
      // ant3.bounceOff(wall3);
      // ant3.bounceOff(wall4);
      // ant3.bounceOff(wall5);
      // ant3.bounceOff(wall6);
      
      // ant1.bounceOff(suzie);
      // ant2.bounceOff(suzie);
      // ant3.bounceOff(suzie);
      
      // ant1.bounce(ant2);
      // ant1.bounce(ant3);
      // ant2.bounce(ant3);

   }

function protectBubble(){
   if(suzie.isTouching(bubbleGroup)){
      bubbleGroup.destroyEach();
     var bigBubble = createSprite(683,312.5);
     bigBubble.addImage(bubbleimg);
  
      bigBubble.scale = 0.06;
      bigBubble.lifetime = 600;
   }
    
}