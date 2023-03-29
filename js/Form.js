class Form {
  constructor() {
    //criando entrada para dados (nome)
    this.input = createInput("").attribute("placeholder", "Digite Seu Nome");
    //criando botão 
    this.playButton = createButton("Jogar");
    //criando título
    this.titleImg = createImg("./assets/TITULO.png", "game title");
    //frase--tamanho da letra
    this.greeting = createElement("h2");
  }

  //posições 
  setElementsPosition() {
    this.titleImg.position(120, 50);
    this.input.position(width / 2 - 110, height / 2 - 80);
    this.playButton.position(width / 2 - 90, height / 2 - 20);
    this.greeting.position(width / 2 - 300, height / 2 - 100);
  }

  //estilo
  setElementsStyle() {
    this.titleImg.class("gameTitle");
    this.input.class("customInput");
    this.playButton.class("customButton");
    this.greeting.class("greeting");
  }

  //oculta objetos 
  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
  }

  //quando o botão "jogar" for pressionado
  handleMousePressed() {
    this.playButton.mousePressed(() => {
      this.input.hide();
      this.playButton.hide();
      var message = `
      Olá ${this.input.value()}
      </br>espere o outro jogador entrar...`;
      this.greeting.html(message);
      playerCount += 1;
      player.name = this.input.value();
      player.index = playerCount;
      player.addPlayer();
      player.updateCount(playerCount);
      player.getDistance();
    });
  }

  display() {
    this.setElementsPosition();
    this.setElementsStyle();
    this.handleMousePressed();
  }
}
