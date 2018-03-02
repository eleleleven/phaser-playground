/**
 * Hauptzustnand: Großteil des Spiels findet hier statt
 */
var StateMain = {

   /**
    * Bilder, Sounds, etc laden
    */
    preload:function() {
      //Spritesheet für Drachen laden
      game.load.spritesheet("dragon", "img/main/dragon.png", 120, 85, 4);
      //Bild für Hintergrund laden
      game.load.image("background", "img/main/background.png");
    },

    /**
     * Objekte & Variablen erstellen
     */
    create:function() {
      game.physics.startSystem(Phaser.Physics.ARCADE);

      this.top = 0;
      this.bottom = game.height - 110;

      //Drachen erstellen
      this.dragon = game.add.sprite(0, 0, "dragon");
      //Animation hinzufügen(stringKey, arraySprites, intFps, booleanLoop);
      this.dragon.animations.add("fly", [0,1,2,3], 12, true);
      this.dragon.animations.play("fly");


      //Hintergrund, scrollt automatisch
      this.background = game.add.tileSprite(0, game.height-480, game.width, 480, "background");
      this.background.autoScroll(-100, 0);
      //Fix für größere Tablets
      if (screen.height > 764) {
        this.background.y = game.world.centerY - this.background.height/2;
        this.top = this.background.y;
      }
      this.dragon.y=this.top;
      //Drache vor dem Hintergrund darstellen
      this.dragon.bringToTop();
      //Physik für Drache
      game.physics.enable(this.dragon, Phaser.Physics.ARCADE);
      this.dragon.body.gravity.y = 500;

    },

    /**
     * GameLoop
     */
    update:function() {
      //prüfen ob Drache den Boden erreicht
      if (this.dragon.y > this.bottom) {
        this.dragon.y = this.bottom;
        this.dragon.body.gravity.y = 0;
      } else {
        this.dragon.body.gravity.y = 500;
      }
      //prüfen ob Drache den oberen Rand erreicht
      if (this.dragon.y < this.top) {
        this.dragon.y = this.top;
        this.dragon.body.velocity.y = 0;
      }
      //prüfen ob geklickt wurde
      if (game.input.activePointer.isDown){
        this.flap();
      }
    },

    /**
     *  "Flattern" um Gravitation entgegenzuwirken
     */
    flap:function() {
      this.dragon.body.velocity.y = -350;
    }
}
