/**
 * Titelzustand: Intro
 * @type {Object}
 */
var StateOver = {
  /**
   * Bilder, Sounds, etc laden
   */
  preload: function() {
    //Buttons laden
    game.load.spritesheet("buttons","img/ui/buttons.png", 265, 75);
  },

  /**
   * Objekte & Variablen erstellen
   */
  create: function() {
    //Button platzieren
    this.btnPlayAgain = game.add.button(game.world.centerX, game.world.height-150, "buttons", this.playAgain, this, 1, 0, 1);
    this.btnPlayAgain.anchor.set(0.5, 0);

    //Punkte Text
    this.scoreText = game.add.text(game.world.centerX, 150, score, { fontSize: '64px', fill: '#fff' });
    this.scoreText.anchor.set(0.5, 0.5);
    this.scoreLabel = game.add.text(game.world.centerX, 100, "score", { fontSize: '32px', fill: '#fff' });
    this.scoreLabel.anchor.set(0.5, 0.5);
  },

  /**
   * Spiel erneut starten
   */
  playAgain:function() {
    game.state.start("StateMain");
  },

  /**
   * GameLoop
   */
  update: function() {

  },

}
