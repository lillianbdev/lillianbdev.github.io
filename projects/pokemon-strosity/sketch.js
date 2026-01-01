//Sometimes you just have to do something that makes your inner twelve-year-old laugh.

/*The main information I am getting from the API is two random Gen 1 Pokemon, then accessing their name and sprite to display. I also access their "type", and use that information to colour the background behind them by referencing the hex codes defined below. The rest of the sketch has been created around these to make it "Interesting". Blend modes, string concatenation, and logic for displaying the "smallest" pokemon in front by checking the "pixels" array and seeing which sprite image has more empty space.
*/

//////DISCLAIMER////////
/*Due to the nature of combining different names in an arbitrary order, 
I cannot guarantee that this sketch will not produce offensive or vulgar results. 
Please use with discretion.
*/

//Credit for the list of hex codes for Pokemon type colours goes to : https://gist.github.com/apaleslimghost/0d25ec801ca4fc43317bcff298af43c3

const typeColours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

let pokemonAPI = "https://pokeapi.co/api/v2/pokemon/";

let pokemonOne
let pokemonOneImage
let pokemonOneName
let pOneDisplayName
let pokemonOneType
let randomPokemonIndexOne
let positionOne

let pokemonTwo
let pokemonTwoName
let pTwoDisplayName
let pokemonTwoType
let randomPokemonIndexTwo
let positionTwo

let cursedDisplayName = ""
let cDNCapital = ""
let fakeIterator = 0
let cursedMessage
let step
let startMerge = false
let hasMerged = false

let transparentPixels = 0
let pOnePix
let pTwoPix
let randomNum
let pokeNamePicker

function preload(){
  randomPokemonIndexOne = ceil(random(151))
  pokemonOne = loadJSON(pokemonAPI + randomPokemonIndexOne, function(data){pokemonOneImage = loadImage(data.sprites.front_default)})
  
  randomPokemonIndexTwo = ceil(random(151))
  pokemonTwo = loadJSON(pokemonAPI + randomPokemonIndexTwo, function(data){pokemonTwoImage = loadImage(data.sprites.front_default)})
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER)
  rectMode(CENTER)
  randomNum = ceil(random(3))
  pokeNamePicker = ceil(random(2))
  
  positionOne = createVector(width * 0.25, height / 2)
  positionTwo = createVector(width * 0.75, height / 2)
  
  pokemonOneName = pokemonOne.name
  pOneDisplayName = pokemonOneName.charAt(0).toUpperCase() + pokemonOneName.substring(1, pokemonOneName.length)
  pokemonOneType = pokemonOne.types[0].type.name;
  
  pokemonTwoName = pokemonTwo.name
  pTwoDisplayName = pokemonTwoName.charAt(0).toUpperCase() + pokemonTwoName.substring(1, pokemonTwoName.length)
  pokemonTwoType = pokemonTwo.types[0].type.name
  
  step = 0
  
  image(pokemonOneImage, width/2, height/2, width, height)
  loadPixels()
  for(let i = 0; i < pixels.length; i+=4){
    if(pixels[i] == 0 && pixels[i + 1] == 0 && pixels[i + 2] == 0 && pixels[i+3] == 0){
      transparentPixels++
    }
  }
  pOnePix = transparentPixels
  transparentPixels = 0
  clear()
  //splice(pixels[0, pixels.length - 1])
  image(pokemonTwoImage, width/2, height/2, width, height)
  loadPixels()
  for(let i = 0; i < pixels.length; i+=4){
    if(pixels[i] == 0 && pixels[i + 1] == 0 && pixels[i + 2] == 0 && pixels[i+3] == 0){
      transparentPixels++
    }
  }
  pTwoPix = transparentPixels
  
  if(pokeNamePicker == 1){
  cursedDisplayName = pokemonOneName.substring(0, pokemonOneName.length / 2) + pokemonTwoName.substring(pokemonTwoName.length / 2, pokemonTwoName.length)
  cDNCapital = cursedDisplayName.charAt(0).toUpperCase() + cursedDisplayName.substring(1, cursedDisplayName.length)
  }
  else if(pokeNamePicker == 2){
  cursedDisplayName = pokemonTwoName.substring(0, pokemonTwoName.length / 2) + pokemonOneName.substring(pokemonOneName.length / 2, pokemonOneName.length)
  cDNCapital = cursedDisplayName.charAt(0).toUpperCase() + cursedDisplayName.substring(1, cursedDisplayName.length)
  }
  else{
    console.log("MATH WRONG")
  }
}

function draw() {
  background(255);
  textAlign(CENTER, CENTER)
  textSize(16)
  fill('black')
  
  
  if(!hasMerged){
    text("CLICK TO MERGE", width / 2, 25)
  if(startMerge == true){
  step += 0.5
  }
  else{
    step = step
  }
    if(step >= 100){
      hasMerged = true;
    }
    
    if(frameCount % 2 == 0){
      displayPokemonOne()
      displayPokemonTwo()
    }
    else{
      displayPokemonTwo()
      displayPokemonOne()
    }
  }
  else{
    displayPokemonstrosity()
    filter(POSTERIZE)
  }
}

function mouseClicked(){
  if(!hasMerged)
  startMerge = true
}

function displayPokemonOne(){
  push()
    fill(typeColours[pokemonOneType])
    rect(positionOne.x + step, positionOne.y + 50, 150, 200)
    pop()
  text(pOneDisplayName, positionOne.x + step, positionOne.y)
  image(pokemonOneImage, positionOne.x + step, positionOne.y + 50, 100, 100)
}

function displayPokemonTwo(){
  push()
    fill(typeColours[pokemonTwoType])
    rect(positionTwo.x - step, positionTwo.y + 50, 150, 200)
    pop()
  text(pTwoDisplayName, positionTwo.x - step, positionTwo.y)
  image(pokemonTwoImage, positionTwo.x - step, positionTwo.y + 50, 100, 100)
}

function displayPokemonstrosity(){
  push()
  fill('black')
  textSize(30)
  text(cDNCapital, width/2, 25)
  pop()
  
  if(randomNum == 1){
    cursedMessage = "THE HORROR"
  }
  else if(randomNum == 2){
    cursedMessage = "HELP ME"
  }
  else if(randomNum == 3){
    cursedMessage = "I AM FORSAKEN"
  }
  else{
    cursedMessage = "JOHN YOUR MATH IS WRONG"
  }
  
  if(millis() % 1000 <= 500){
  push()
  fill('red')
  stroke('black')
  strokeWeight(3)
  textSize(25)
  text(cursedMessage, width/2, height- 25)
  pop()
  }
  
  if(pOnePix < pTwoPix){
    push()
    blendMode(DARKEST)
    image(pokemonOneImage, width/2, height/2, width, height)
    image(pokemonTwoImage, width/2, height/2, width, height)
    pop()
  }
  else{
    push()
    blendMode(DARKEST)
    image(pokemonTwoImage, width/2, height/2, width, height)
    image(pokemonOneImage, width/2, height/2, width, height)
    pop()
  }
}
