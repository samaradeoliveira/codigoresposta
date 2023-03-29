var canvas;
var database;
var gameState, playerCount;
var form, player;
var cars = [];
var allPlayers, car1, car2;
var backgroundImage, car1_img, car2_img, track;


function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  car1_img = loadImage("../assets/car1.png");
  car2_img = loadImage("../assets/car2.png");
  track = loadImage("../assets/track.jpg");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  database = firebase.database();

  //objetos
  game = new Game();
  //estado
  game.getState();
  //objetos
  game.start();
}

function draw() {
  background(backgroundImage);

  //att o valor de gameState conforme o valor do playerCount e chamando play
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
