var PLAY = 1;
var END = 0;
var gameState = 1;
var inicio = 5;
var playerCount;
var allPlayers;
var distance = 0;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage, badsImg;
var obstaclesGroup, badsGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var JumpSound, DieSound, sound100;

var score=0;
var hight=0;

var gameOver, restart;
var nochei;
var database;
var Position;
var obsjetosgroup;
var resetgroup;
var player1,player2;
var cieloi;
var desierto;
var desiertoi;




function preload(){
  nochei = loadImage("noche.jpg");
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  //trex_running =   loadAnimation("steve.jpg");

  trex_collided = loadAnimation("trex_collided.png");
  //trex_jump = loadAnimation(".jpg")
  //creeperi = loadAnimation("creeper.jpg");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  JumpSound = loadSound("jump.mp3");
  DieSound = loadSound("die.mp3");
  sound100 = loadSound("checkPoint.mp3");
  badsImg = loadImage("descarga.png");

cieloi = loadImage("cielo.jpg");
desiertoi = loadImage("desierto.png");

  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  database = firebase.database();
  createCanvas(windowWidth, windowHeight);
  gameState = 0;

  trex = createSprite(50,height/2,20,50);
  trex.debug=false;
  trex.setCollider("circle",-10,-5,35);
  var trexPosition = database.ref('t-rex/position');
  trexPosition.on("value",readPosition,showError);

  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  //trex.addAnimation("salto",trex_jump);
  desierto = createSprite(camera.x,windowHeight-415,windowWidth,20);
  desierto.addAnimation("suelo", desiertoi);
  desierto.scale=5;
  desierto.x = desierto.width/2;


  database.ref('t-rex/position').set({
    'x':50 ,
    'y':500
  
    
})
  
  
  
  //ground = createSprite(width/2,height/2+10,width,20);
  //ground.addImage("ground",groundImage);
  //ground.x = ground.width /2;

  
  //gameOver = createSprite(trex.x,height/2-100);
  //gameOver.addImage(gameOverImg);
  
  //restart = createSprite(trex.x,height/2-50);
  //restart.addImage(restartImg);
  
  //gameOver.scale = 0.5;
  //restart.scale = 0.5;

  //gameOver.visible = false;
  //restart.visible = false;
  
  //invisibleGround = createSprite(400,height/2+25,500000,20);
  //invisibleGround.visible = true;
  //invisibleGround.addImage(groundImage);
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  badsGroup = new Group();
  obsjetosgroup = new Group();
  resetgroup = new Group();

  
  invisibleGround = createSprite(50000,height/2+20,100000000,10);
  invisibleGround.visible = true;
 

  
  score = 0;
}

function draw() {
  


  background(cieloi);
  textSize(20);
  fill("black")
  text("Puntuación: "+ score, camera.x+300,camera.y-300);
  text("HI: "+ hight,camera.x+500,camera.y-300);
  console.log(camera.x);


  if (gameState===0){
    if (keyDown("SPACE")){
      gameState = 1;
      

      
    }
    
    textSize(width/40);
     fill("black")
  text("Presiona la tecla espacio o toca la pantalla para empezar",width/4-50,height/2-50);
  text("*imagen de desierto invisible",camera.x,height/2+500);

    
    if (touches.length > 0){
      gameState = 1;
      
    }
  }
  
  if (gameState===1){
    textSize(width/90);
    fill("black")
    text("*imagen de desierto invisible",camera.x,height/2+500);

    score = score + Math.round(getFrameRate()/60);
    //ground.velocityX = -(10 + 3*score/100);
    camera.position.x = trex.x;
    camera.position.y = trex.y;
    trex.velocityX = 10;
    desierto.velocityX = -1;
    console.log(desierto.velocityX);
    if (desierto.x < camera.x-1900){
      desierto.x = camera.x+1590;
    }

    desierto.visible = true;
    console.log(trex.velocityX);
    
    desierto.velocityX = -(11 + 2*score/100);


    


    writePosition();

  
   if((touches.length > 0 && trex.y  >= height/2-10)) {
     trex.velocityY = -20;
      JumpSound.play();
       touches = [];
    }
    
    if (keyDown("SPACE") && trex.y  >= height/2-10) {
     trex.velocityY = -25;
      JumpSound.play();
      writePosition();
     
    


    }
    
    
    if (keyDown("o")){
      trex.velocityY=-2.1;
    }
    if (keyDown("Down")){
      trex.velocityY = trex.velocityY + 3;
    }

    if (score > 700 && score < 1000){
      background(nochei);
      desierto.visible = false;

    }
    
    
    
    if (score > 1700 && score < 2000){
      background(nochei);
      desierto.visible = false;

    }
    
    
    if (score > 2700 && score < 3000){
      background(nochei);
      desierto.visible = false;

    }
    

    if (score > 3700 && score < 4000){
      background(nochei);
      desierto.visible = false;

  
    }
    

    if (score > 4700 && score < 5000){
      background(nochei);
      desierto.visible = false;

  
    }
    

    if (score > 5700 && score < 6000){
      background(nochei);
      desierto.visible = false;

  
    }
    
    
  
    
    
  //><
  //  trex.velocityY = trex.velocityY + 1.5;
    trex.velocityY = trex.velocityY + 2;
  
   
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
    bads();
    
    
    if(badsGroup.isTouching(trex)){
        gameState = 2;
      DieSound.play();
    }
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = 2;
      DieSound.play();
    }
  }
  else if (gameState === 2) {
    
    gameOver = createSprite(trex.x,height/2-100);
    gameOver.addImage(gameOverImg);
  
    restart = createSprite(trex.x,height/2-50);
    restart.addImage(restartImg);

    resetgroup.add(restart);
    obsjetosgroup.add(gameOver);

    //gameOver.visible = true;
    //restart.visible = true;
    trex.velocityX = 0;

    restart.depth = bads.depth;
    restart.depth = restart.depth + 1;
    
    bads.depth = trex.depth;
    bads.depth = bads.depth - 1;
  

    

    
    
    if (score>hight){
      
          hight=score;

    }
    
    //establece velocidad a caba objeto del juego en 0
    //ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    badsGroup.setVelocityXEach(0);
    desierto.velocityX = 0;


    
    //cambia la animación de Trex
    trex.changeAnimation("collided",trex_collided);
    
    //establece ciclo de vida a los obsjetos del juego para que nunca se destruyan
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    badsGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || mousePressedOver(restart)) {      
      reset();
      touches = []
    }
  }
  
 //  bads.depth = trex.deph;
 //  trex.depth = trex.depth + 1;
  
  
  
  drawSprites();
}

function spawnClouds() {
  //escribe aquí el código para apareer las nubes
  if (frameCount % 60 === 0) {
    var cloud = createSprite(camera.x+800,height,40,10);
    cloud.y = Math.round(random(80,height/2-50));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -1;
    cloud.velocityX = -(11 + 2*score/100);

     //asigna ciclo de vida a la variable
    cloud.lifetime = width+5;
    
    //ajusta la profundidad
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //agrega cada nube al grupo
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles(){ 
if (frameCount % 50 === 0) {
 
    var obstacle = createSprite(camera.x+900,height/2-1,10,40);
    obstacle.x = Math.round(random(camera.x+900,camera.x+1500));

    obstacle.velocityX = -(11 + 2*score/100);



    //obstacle.debug = true;
     //obstacle.velocityX = -(11 + 3*score/100);
  
    // trex.depth = obstaclesGroup.depth;
     //trex.depth = trex.depth - 1;
    
    //genera obst'aculos al azar
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //asigna escala y ciclo de vida al obstáculo           
    obstacle.scale = 0.5;
    obstacle.lifetime = width+5;
    //agrega cada obstáculo al grupo
    obstaclesGroup.add(obstacle);
  
  
  
    
  
  }
}

function bads(){
  if (frameCount % 250 === 0) {
    var bads = createSprite(camera.x+700,height/2-45,40,10);
    bads.x = Math.round(random(camera.x+700,camera.x+1000));
    bads.debug = false; 
    bads.setCollider("rectangle",0,0,240,100);

    bads.velocityX = -(11 + 2*score/100);

 

    bads.addImage(badsImg);
    bads.scale = 0.2;
    //bads.velocityX = -(10.5 + 3*score/100);
    

    bads.lifetime = width+25;
    

   
    badsGroup.add(bads);
    
    
    
   
    
    
  }
}

function reset(){
  gameState = 1;
  gameOver.visible = false;
  restart.visible = false;
  
  resetgroup.destroyEach();
  obsjetosgroup.destroyEach();

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  badsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  desierto.x = 1300;
  
 
  database.ref('t-rex/position').set({
    'x':50 ,
    'y':50
    
    
})
  score = 0;
    
}

function writePosition(){
  database.ref('t-rex/position').set({
      'x':trex.x ,
      'y':trex.y
      
      
  })
}

function readPosition(data){
  Position = data.val();
  console.log(Position.x);
  trex.x = Position.x;
  trex.y = Position.y;
}

function showError(){
  console.log("error en escribir la base de datos");
}

