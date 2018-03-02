/**
 * Titelzustnand: Intro
 * @type {Object}
 */
var StateTitle = {
  /**
   * Bilder, Sounds, etc laden
   */
  preload: function() {
    //Logo laden
    game.load.image("logo","img/title/gameLogo.png");
    //Buttons laden
    game.load.spritesheet("buttons","img/ui/buttons.png", 265, 75);
    if (screen.width < 1500) {
      //Drehen des Displays zu landscape verhindern
      game.scale.forceOrientation(false, true);
    }
  },

  /**
   * Objekte & Variablen erstellen
   */
  create: function() {
    console.log("Ready!");
    //Logo platzieren
    this.logo=game.add.sprite(game.world.centerX, 25, "logo");
    //Logo Ankerpunkt setzen
    this.logo.anchor.set(0.5, 0);
    //Button platzieren
    this.btnStart = game.add.button(game.world.centerX, game.world.height-150, "buttons", this.startGame, this, 7, 6, 7);
    this.btnStart.anchor.set(0.5, 0);
    //Event Listener aufrufen
    this.setListeners();
  },

  /**
   * GameLoop
   */
  update: function() {

  },

  /**
   * EventListener setzen
   */
  setListeners: function() {
    //Bei falschen Displayorientierung
    game.scale.enterIncorrectOrientation.add(this.wrongWay, this);
    //Bei richtiger Displayorientierung
    game.scale.leaveIncorrectOrientation.add(this.rightWay, this);
  },

  wrongWay: function() {
    console.log("wrongOrientation");
    document.getElementById("wrongWay").style.display="block";
  },
  rightWay: function() {
    console.log("rightOrientation");
    document.getElementById("wrongWay").style.display="none";
  },

  /**
   * Spiel starten
   */
   startGame: function() {
     console.log("Start");
     game.state.start("StateMain");
   }
}
