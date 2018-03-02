/**
 * Hauptzustnand: Großteil des Spiels findet hier statt
 * @type {Object}
 */
var StateMain = {

  /**
   * Bilder, Sounds, etc laden
   */
  preload: function() {
    //Bilder laden
    game.load.image("red", "img/main/blocks/red.png");
    game.load.image("blue","img/main/blocks/blue.png");
    game.load.image("green","img/main/blocks/green.png");
    game.load.image("yellow","img/main/blocks/yellow.png");
    //spritesheet laden
    game.load.spritesheet("rings", "img/main/rings.png", 60, 65, 5);
    game.load.spritesheet("balls", "img/main/balls.png", 35, 35, 5);
    game.load.spritesheet("soundButton", "img/ui/soundButtons.png", 32, 32, 2);

    //Sounds laden
    game.load.audio("points", "sounds/points.mp3");
    game.load.audio("gameOver", "sounds/gameOver.mp3");
  },

  /**
   * Objekte & Variablen erstellen
   */
  create: function() {
    //Variablen
    score = 0;
    this.speed = 200;
    this.incSpeed = 10;
    this.maxSpeed = 450;

    //Physics
    game.physics.startSystem(Phaser.Physics.Arcade);

    //sounds
    this.pointSound = game.add.audio("points");
    this.gameOverSound = game.add.audio("gameOver");

    //Bilder platzieren
    var red = game.add.image(0, 0, "red");
    var blue = game.add.image(0, 100, "blue");
    var green = game.add.image(100, 0, "green");
    var yellow = game.add.image(100, 100, "yellow");

    //input aktivieren
    red.inputEnabled = true;
    red.name = "red";
    blue.inputEnabled = true;
    blue.name = "blue";
    green.inputEnabled = true;
    green.name = "green";
    yellow.inputEnabled = true;
    yellow.name = "yellow";

    //KlickHandler hinzufügen
    red.events.onInputDown.add(this.changeColor, this);
    blue.events.onInputDown.add(this.changeColor, this);
    green.events.onInputDown.add(this.changeColor, this);
    yellow.events.onInputDown.add(this.changeColor, this);

    //gruppieren
    this.blockGroup = game.add.group();
    this.blockGroup.add(red);
    this.blockGroup.add(blue);
    this.blockGroup.add(green);
    this.blockGroup.add(yellow);

    //Gruppe positionieren
    this.blockGroup.x = game.world.centerX-this.blockGroup.width/2;
    this.blockGroup.y = game.height-250;

    //Ringe platzieren
    this.ring = game.add.image(game.world.centerX, this.blockGroup.y-100, "rings");
    this.ring.anchor.set(0.5, 0.5);

    //Punkte Text
    this.scoreText = game.add.text(game.world.centerX, 150, "0", { fontSize: '64px', fill: '#fff' });
    this.scoreText.anchor.set(0.5, 0.5);
    this.scoreLabel = game.add.text(game.world.centerX, 100, "score", { fontSize: '32px', fill: '#fff' });
    this.scoreLabel.anchor.set(0.5, 0.5);

    //Sound Button
    this.soundButton = game.add.image(20, 20, "soundButton");
    this.soundButton.inputEnabled=true;

    //Bälle platzieren
    this.ball = game.add.sprite(0,0,"balls");
    this.ball.anchor.set(0.5, 0.5);
    game.physics.arcade.enable(this.ball);

    if (soundOn==true) {
      this.soundButton.frame=0;
    } else {
      this.soundButton.frame=1;
    }

    //Listener
    this.setListeners();

    this.resetBall();
  },

  /**
   * GameLoop
   */
  update: function() {
    //Prüfen ob Ball den Ring erreicht hat
    var diffX = Math.abs(this.ring.x - this.ball.x);
    var diffY = Math.abs(this.ring.y - this.ball.y);
    if (diffX < 10 && diffY < 10) {
      this.ball.body.velocity.setTo(0,0);

      //Gleiche Farbe prüfen
      if(this.ball.frame == this.ring.frame) {
        this.resetBall();
        score++;
        this.scoreText.text = score;
        if (soundOn==true) {
          this.pointSound.play();
        }

      } else {
        if (soundOn==true) {
          this.gameOverSound.play();
        }    
        game.state.start("StateOver");
      }
    }
  },

  /**
   * EventListener setzen
   */
  setListeners: function() {
    //Maus Release
    game.input.onUp.add(this.resetRing, this);
    //KlickHandler für soundButton
    this.soundButton.events.onInputDown.add(this.toggleSound,this)
  },

  /**
   * Farbe des Rings ändern
   */
   changeColor: function(target) {
     switch (target.name) {
       case "red":
          this.ring.frame = 3;
         break;
       case "blue":
          this.ring.frame = 1;
         break;
       case "green":
          this.ring.frame = 2;
         break;
       case "yellow":
          this.ring.frame = 4;
         break;
     }
   },

   /**
    * Farbe des Rings zurücksetzen
    */
    resetRing:function() {
      this.ring.frame = 0;
    },

    /**
     * Ball zufällig plartieren
     */
   resetBall:function() {
     var color = game.rnd.integerInRange(0, 5);
     var xx = game.rnd.integerInRange(0, game.world.width);
     var yy = game.rnd.integerInRange(0, 100);

     this.ball.frame = color;
     this.ball.x = xx;
     this.ball.y = yy;
     //Ball zu Ring bewegen
     var rot = game.physics.arcade.moveToXY(this.ball, this.ring.x, this.ring.y, this.speed);
     this.ball.rotation = rot;
     //Geschwindigkeit und damit Schwierigkeit Stück für Stück erhöhen
     this.speed += this.incSpeed;
     if (this.speed > this.maxSpeed) {
       this.speed = this.maxSpeed;
     }
   },

   /*
    * Sound De-Aktivieren
    */
   toggleSound:function() {
     soundOn=!soundOn;
     if (soundOn==true) {
       this.soundButton.frame=0;
     } else {
       this.soundButton.frame=1;
     }
   },

}
