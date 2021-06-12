var score=0
var gameState="play"


function preload(){

ninjaImg=loadAnimation("images/ninja1.png","images/ninja2.png","images/ninja3.png")
ninjaAttack=loadAnimation("images/ninjaattack.png")
bgImg=loadImage("images/forest.png")
villan1=loadImage("images/villan1.png")
ninjadie=loadImage("images/ninjadead.png")
turtledie=loadAnimation("images/turtledie.png")
coin=loadImage("images/coins.png")
killer=loadAnimation("images/killer.png")
}





function setup() {
  createCanvas(displayWidth,displayHeight);
  console.log(displayWidth)
  console.log(displayHeight)
  forest=createSprite(displayWidth/2,displayHeight/2)
forest.addImage("jungle",bgImg)
forest.scale=1.3
forest.velocityX=-5


 ninja= createSprite(200, displayHeight-180, 50, 50);
ninja.addAnimation("ninja1",ninjaImg);
ninja.addImage("ndie",ninjadie)
ninja.addAnimation("ninjaatt",ninjaAttack);
ninja.addAnimation("kill",killer)

ninja.setCollider("rectangle",0,0,100,150)
ninja.debug=true
inviground=createSprite(displayWidth/2,displayHeight-130,4*displayWidth,5)
inviground.visible=false

turtlegroup=createGroup()
coingroup=createGroup()


}

function draw() {
  background("white");
  if(gameState==="play"){
    forest.velocityX=-5
    if(forest.x<200){
      forest.x=displayWidth/2
    }
      if(keyDown("space")){
  
        ninja.velocityY=-20
       
        
      ninja.changeAnimation("ninjaatt",ninjaAttack);
      }
      ninja.velocityY=ninja.velocityY+1
if(ninja.isTouching(inviground)){

  ninja.changeAnimation("ninja1",ninjaImg)
}
turtle()
createcoins() 
for(i=0;i<coingroup.length;i++){
 if(coingroup[i].isTouching(ninja)){
coingroup[i].destroy()
score=score+10
 }
}
 //camera.position.x=ninja.x
// camera.position.y=displayHeight/2



  }
if(gameState==="end"){
  ninja.changeImage("ndie",ninjadie)
forest.velocityX=0
ninja.velocityY=ninja.velocityY+2
ninja.collide(inviground)
coingroup.destroyEach()

}

ninja.collide(inviground)

drawSprites();
}

function turtle(){
 var i=Math.round(random(10,700))

  if(frameCount%i===0){
villan=createSprite(random(displayWidth-10,displayWidth-100),displayHeight-250)
villan.addImage("turtle",villan1)
villan.addAnimation("tdie",turtledie)
villan.velocityX=-8
villan.scale=1.3
villan.debug=true

turtlegroup.add(villan)
  }
createsword()

  for(var j=0;j<turtlegroup.length;j++){
if(keyDown("RIGHT_ARROW")&&turtlegroup[j].isTouching(sword)){
  ninja.changeAnimation("kill",killer)
turtlegroup[j].changeAnimation("tdie",turtledie)
turtlegroup[j].lifetime=7

turtlegroup[j].velocityX=0
turtlegroup[j].destroy()

}
}
if(turtlegroup.isTouching(ninja)){
gameState="end"

}
}
function createcoins(){
if(frameCount%Math.round(random(10,900))===0){
coins=createSprite(displayWidth-10,random(displayHeight-400,displayHeight-600))
coins.addImage("rupee",coin)
coins.velocityX=-3
coins.scale=0.1
coingroup.add(coins)

for(i=0;i<coingroup.length;i++){
coingroup[i].depth=ninja.depth
ninja.depth=ninja.depth+1
coingroup[i].lifetime=200
}
}

}
function createsword(){
sword=createSprite(240,displayHeight-230,20,20)
sword.debug=true
sword.x=ninja.x+100
sword.visible=false

}