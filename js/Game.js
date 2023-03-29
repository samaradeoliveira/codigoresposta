class Game {
  constructor() {
    //título do reset
    this.resetTitle = createElement("h2");
    //botão do reset (vazio pq queremos imagem anexada ao botão)
    this.resetButton = createButton("");

    //
    this.leadeboardTitle = createElement("h2");
    //primeira posição
    this.leader1 = createElement("h2");
    //segunda posição
    this.leader2 = createElement("h2");
  }

  //pegando valor de gameState do banco 
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  //att o valor de gameState do banco
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }


  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements() {

    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    //título
    this.resetTitle.html("Reiniciar Jogo");
    //aplicação do css
    this.resetTitle.class("resetText");
    //posição
    this.resetTitle.position(width / 2 + 200, 40);

    //aplicação do css
    this.resetButton.class("resetButton");
    //posição
    this.resetButton.position(width / 2 + 230, 100);

    //título do placar
    this.leadeboardTitle.html("Placar");
    //aplicação do css
    this.leadeboardTitle.class("resetText");
    //posição
    this.leadeboardTitle.position(width / 3 - 60, 40);

    //aplicação do css
    this.leader1.class("leadersText");
    //posição
    this.leader1.position(width / 3 - 50, 80);

    //aplicação do css
    this.leader2.class("leadersText");
    //posição
    this.leader2.position(width / 3 - 50, 130);
  }

  play() {
    //chamando a função para características de tela
    this.handleElements();
    //chamando a função para resetar
    this.handleResetButton();

    //método para pegar as informações dos jogadores 
    Player.getPlayersInfo();


    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      //chamando a função quadro de líderes 
      this.showLeaderboard();

      //índice da matriz
      var index = 0;

      for (var plr in allPlayers) {
        //adicione 1 ao índice para cada loop
        index = index + 1;

        //use os dados do banco de dados para exibir os carros nas direções x e y
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        //circulo vermelho embaixo do quadro
        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          //alterar a posição da câmera na direção y
          camera.position.y = cars[index - 1].position.y;
        }
      }

      // manipulando eventos de teclado
      this.handlePlayerControls();

      drawSprites();
    }
  }

  //aluno
  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }


  showLeaderboard() {
    var leader1, leader2;

    var players = Object.values(allPlayers);

    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp;    Essa etiqueta é usada para exibir quatro espaços.
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    //para exibir na tela
    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  handlePlayerControls() {
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }

    //mexer o carrinho para a esquerda
    if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
      player.positionX -= 5;
      player.update();
    }

    //mexer o carrinho para a direita 
    if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 245) {
      player.positionX += 5;
      player.update();
    }
  }
}
