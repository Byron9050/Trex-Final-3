var Die
var Checkpoint
var Jump
var trex_collider
var Enemigo2;
var Enemigo;
var GameOver2;
var Retry2;
var Retry;
var GameOver;
var CloudGroup;
var CactusGroup;
var Play = 1;
var End = 0;
var GameState = Play;
var Puntaje = 0;
var cactus1;
var cactus3;
var cactus4;
var cactus5;
var cactus6;
var cactus7;
var ground;
var IG;
var ground2
var trex ,trex_running;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
ground = loadImage("ground2.png")
Cloud2 = loadImage("cloud.png");
cactus1 = loadImage("obstacle1.png");
cactus3 = loadImage("obstacle2.png");
cactus4 = loadImage("obstacle3.png");
cactus5 = loadImage("obstacle4.png");
cactus6 = loadImage("obstacle5.png");
cactus7 = loadImage("obstacle6.png");
Retry = loadImage("Restart2.png");
GameOver = loadImage("gameOver.png");
Enemigo = loadAnimation("Enemigo.png","Enemigo2.png");
trex_collider = loadImage("trex_collided.png");

Jump = loadSound("jump.mp3");
Die = loadSound("die.mp3")
Checkpoint = loadSound("checkpoint.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  
  //crear sprite de Trex
 trex = createSprite(50, height-70);
 trex.addAnimation("running",trex_running);
 trex.addAnimation("collider",trex_collider); 
 trex.scale = 0.7

 ground2 = createSprite(width/2, height-80, width,20);
 ground2.  addImage(ground); 

 IG = createSprite(width/2, height-10, width,125 )
IG.visible = false;

CactusGroup = new Group();
CloudGroup = new Group();

Retry2 = createSprite (width/2, height/2 );
Retry2.addImage(Retry)
Retry2.scale = 0.5

GameOver2 = createSprite (width/2 ,height/2-50 );
GameOver2.addImage(GameOver)
GameOver2.scale = 0.5;
trex.setCollider("Circle",0,0,40);
trex.debug = true
//Enemigo2 = createSprite(200, 80);
 // Enemigo2.addAnimation("Fly",Enemigo);
}

function draw(){
  background("white");
  text("Puntaje " + Puntaje, 500, 100);
  if(GameState == Play){

    Retry2.visible = false;
    GameOver2.visible = false;
    ground2.velocityX = -(10 + 3*Puntaje/2500);
    Puntaje = Puntaje + Math.round(frameCount/60); 
    if(Puntaje > 0 && Puntaje%1000 == 0) {

    Checkpoint.play()

    }if(touches.length > 0||keyDown("space") && trex.y >= height - 120) {

      trex.velocityY = -13
      Jump.play();
    
        }
         trex.velocityY = trex.velocityY + 0.8; 
         //Para que el suelo se haga infinito
         if(ground2.x < 0) {

          ground2.x = ground2.width/2;
          
       
         }

         RN ();
         Cactus ();
         Terofly ();

        if(CactusGroup.isTouching(trex)) {

        GameState = End;
        Die.play()

        } 
  }
  else if(GameState == End){

    ground2.velocityX = 0;
    Retry2.visible = true;
    GameOver2.visible = true;
    trex.changeAnimation("collider",trex_collider);
    CactusGroup.setLifetimeEach(-1);
    CloudGroup.setLifetimeEach(-1);
    trex.velocityY = 0;
    CactusGroup.setVelocityXEach(0);
    CloudGroup.setVelocityXEach(0);
    if(touches.length > 0 || keyDown("space")){

    Reiniciar();
    touches = []

    }
    if (mousePressedOver(Retry2)){
      Reiniciar(); 
    
     }  

  }
 
 
  
  

  trex.collide(IG)
  drawSprites();

}

function Reiniciar () {

  GameState = Play
  Puntaje = 0
  CactusGroup.destroyEach();
  CloudGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  

}

function RN () {

  if(frameCount % 60 == 0) {
  var Cloud = createSprite(width+20, height-300, 40, 10);
  Cloud.addImage(Cloud2);
  Cloud.scale = 0.5

  Cloud.velocityX = -(10 + Puntaje/2500);
    Cloud.y = Math.round(random(10,60));
    Cloud.depth = trex.depth;
    trex.depth = trex.depth +1;
    Cloud.lifetime = 65
    CloudGroup.add(Cloud);
  }

}


function Cactus() {
// para que las nubes aparescan cada 60 segundos
  if(frameCount % 60 == 0) {

   Cactus2 = createSprite(700, height-95, 20, 30);
   Cactus2.velocityX = -(13 + Puntaje/2500);
   var run = Math.round(random(1,6));
   switch(run) {

   case 1:Cactus2.addImage(cactus1);
   break;
   case 2:Cactus2.addImage(cactus3);
   break;
   case 3:Cactus2.addImage(cactus4);
   break;
   case 4:Cactus2.addImage(cactus5);
   break;
   case 5:Cactus2.addImage(cactus6);
   break;
   case 6:Cactus2.addImage(cactus7);
   break;
   default: break;
   }
  Cactus2.scale = 0.8
  CactusGroup.add(Cactus2);
  }

}
function Terofly() {

 // if(frameCount % 60 == 0) {
      

  
  Enemigo.velocityX = -10
 // }

}