var player, playerIdle, playerWalk;
var platform1, platform1Img;
var platform2, platform2Img;
var platform3, platform3Img;
var background;
var platformGroup;
var isFlipped = false;
var mask, dose1, dose2, whImg;
var maskImg, dose1Img, dose2Img, whImg;
var maskGroup, whGroup, dose1Goup, dose2Group;
var covidGroup, covid, covidImg;
var score = 0;
var defs, defsImg;

function preload(){
    playerIdle = loadAnimation("Woodcutter_idle_1.png");
    playerwalk = loadAnimation("Woodcutter_walk_1.png", "Woodcutter_walk_2.png", "Woodcutter_walk_3.png", "Woodcutter_walk_4.png", "Woodcutter_walk_5.png", "Woodcutter_walk_6.png");
    platform1Img = loadImage("Platform1.png");
    platform3Img = loadImage("Platform3.png");
    maskImg = loadImage("Mask.png");
    dose1Img = loadImage("Dose1.png");
    dose2Img = loadImage("Dose2.png");
    whImg = loadImage("wh.png");
    covidImg = loadImage("covid.png");
    defsImg = loadImage("Defs.png");

    //platform2Img = loadImage("Platform2.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    player = createSprite(width/2, height/2, 10, 10);    
    player.addAnimation("Idle", playerIdle); 
    player.addAnimation("Walk", playerwalk); 
    player.scale = 2;   
    //player.debug = true;
    player.setCollider("rectangle", 0, 4, 30, 33);

   
    platform3 = createSprite(width/2+290, height-100, 10, 10 );
    platform3.addImage("Lvl3", platform3Img);
    platform3.scale = 1.5;
    //platform3.debug = true;
    platform3.setCollider("rectangle", 3, 33, 655, 19);

    defs = createSprite(platform3.x+1100, height-240, 10, 10);
    defs.addImage("defs", defsImg);
    defs.scale = 1.5
    
    //platform2.debug = true;
   // platform2 = createSprite(width/2, height-20, width, 20 );

    platformGroup = new Group;  
    maskGroup=new Group();
    whGroup=new Group();
    dose1Group=new Group();
    dose2Group=new Group();
    covidGroup=new Group();

}

function draw() {
background("black");

// jump when the space key is pressed
if ( keyDown("space") && touches.length === 0 && player.y >= height-110) {
    
    player.velocityY = -15;
    touches = [];
  }

player.velocityY += 0.8;
  
if (platform3.x > -500) {
if(keyDown("right")){

    if(isFlipped === true){
        player.mirrorX(-player.mirrorX());
        isFlipped = false;  
    }
    player.changeAnimation("Walk", playerWalk);
    platform3.x-=4;
    defs.x-=4;

    platformGroup.setVelocityXEach(-4);
    
} else if (keyDown("left")){

    if (isFlipped === false) {
        player.mirrorX(-player.mirrorX());
        isFlipped = true;
    }
    
    player.changeAnimation("Walk", playerWalk);
    platformGroup.setVelocityXEach(4);
    platform3.x +=4;
    defs.x+=4;
    
} else {

    player.changeAnimation("Idle", playerIdle);
    platformGroup.setVelocityXEach(0);

}

} else {

    platformGroup.setVelocityXEach(0);
    player.velocityX = 0;
    platformGroup.setVelocityXEach(-4);
    defs.velocityX = -4;

    spawnMask();
    spawnWH();
    spawnDose1();
    spawnDose2();
    spawnCovid();

    if (maskGroup.isTouching(player)) {

        maskGroup.destroyEach();
        score+=5;

    }

    if (whGroup.isTouching(player)) {

        whGroup.destroyEach();
        score+=10;

    }

    if (dose1Group.isTouching(player)) {

        dose1Group.destroyEach();
        score+=25;

    }

    if (dose2Group.isTouching(player)) {

        dose2Group.destroyEach();
        score+=50;

    }

    if (covidGroup.isTouching(player)) {

        covidGroup.destroyEach();
        score-=20;

    }

}



spawnObstacles();

player.collide(platformGroup);
player.collide(platform3);
//player.collide(platform2);

//text( platform3.x, 300, 20);
text("Antibodies: "+score, (width/2)-20, 20);

drawSprites(); 
}

function spawnObstacles() {

    if (frameCount%63 === 0) {

        platform1 = createSprite(width+100, height-25, 10, 10 );
       // platform1.debug = true;
        platform1.addImage("Lvl1", platform1Img);
        platform1.scale = 0.5;
        platform1.setCollider("rectangle", 76, -10, 506, 130)
        platformGroup.add(platform1);

    }
  
}

/*function spawnMediSups(){

    if (frameCount%170 === 0) {

        var choose = Math.round(random(1, 9));
        mediSup = createSprite(width+150, height-100, 10, 10);
        //mediSup.debug = true;

        switch (choose) {

            case 1:
                mediSup.addImage("mask", maskImg);
                mediSup.scale = 0.2;
                mediSup.velocityX = -4;
                break;
            case 2:
                mediSup.addImage("mask", maskImg);
                mediSup.scale = 0.2;
                mediSup.velocityX = -4;
                break;
            case 3:
                mediSup.addImage("mask", maskImg);
                mediSup.scale = 0.2;
                mediSup.velocityX = -4;
                break;
            case 4:
                mediSup.addImage("washHands", whImg);
                mediSup.scale = 0.1;
                mediSup.velocityX = -4;
                break;
            case 5:
                mediSup.addImage("washHands", whImg);
                mediSup.scale = 0.1;
                mediSup.velocityX = -4;
                break;
            case 6:
                mediSup.addImage("washHands", whImg);
                mediSup.scale = 0.1;
                mediSup.velocityX = -4;
                break;
            case 7:
                mediSup.addImage("dose1", dose1Img);
                mediSup.scale = 1.5;
                mediSup.velocityX = -4;
                break;
            case 8:
                mediSup.addImage("dose1", dose1Img);
                mediSup.scale = 1.5;
                mediSup.velocityX = -4;
                break;
            case 9:
                mediSup.addImage("dose2", dose2Img);
                mediSup.scale = 1.5;
                mediSup.velocityX = -4;
                break;
            default:
                break;

        }

    }

}*/

function spawnMask () {

    if (frameCount%359 === 0) {

        mask = createSprite(width+150, height-100, 10, 10);
        mask.addImage("mask", maskImg);
        mask.scale = 0.2;
        mask.velocityX = -4;
        mask.lifetime = (width/4) + 50;
        maskGroup.add(mask);

    }

}

function spawnWH () {

    if (frameCount%427 === 0) {

        wh = createSprite(width+150, height-100, 10, 10);
        wh.addImage("mask", whImg);
        wh.scale = 0.1;
        wh.velocityX = -4;
        wh.lifetime = (width/4) + 50;
        whGroup.add(wh);
    }

}

function spawnDose1 () {

    if (frameCount%1879 === 0) {

        dose1 = createSprite(width+150, height-100, 10, 10);
        dose1.addImage("mask", dose1Img);
        dose1.scale = 1.5;
        dose1.velocityX = -4;
        dose1.lifetime = (width/4) + 50;
        dose1Group.add(dose1);
    }

}

function spawnDose2 () {

    if (frameCount%3579 === 0) {

        dose2 = createSprite(width+150, height-100, 10, 10);
        dose2.addImage("mask", dose2Img);
        dose2.scale = 1.5;
        dose2.velocityX = -4;
        dose2.lifetime = (width/4) + 50;
        dose2Group.add(dose2);
    }

}

function spawnCovid () {

    if (frameCount%200 === 0) {

        covid = createSprite(width+150, height-100, 10, 10);
        covid.addImage("mask", covidImg);
        covid.scale = 0.07;
        covid.velocityX = -4;
        covid.lifetime = (width/4) + 50;
        covidGroup.add(covid);
    }

}