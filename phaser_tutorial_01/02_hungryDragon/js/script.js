//Globale Variablen
var game;
var score;
var soundOn = true;

/**
 * Nach laden der Seite ausführen
 */
window.onload =  function() {
  //Desktop
  if (screen.width>1500) {
    game = new Phaser.Game(640, 480, Phaser.AUTO, "ph_game");
  //Mobile
  } else {
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "ph_game");
  }
  //States hinzufügen
  game.state.add("StateMain",StateMain);
  game.state.add("StateTitle",StateTitle);
  game.state.add("StateOver",StateOver);
  game.state.start("StateMain");
}
