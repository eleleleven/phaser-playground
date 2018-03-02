/**
 * TitleScreen: Hauptmenü des Spiels.
 */
var StateTitle = {

   /**
    * Bilder, Sounds, etc laden
    */
    preload:function() {
      if (screen.width < 1500) {
        //Drehen des Displays zu portrait verhindern
        game.scale.forceOrientation(true, false);
      }
    },

    /**
     * Objekte & Variablen erstellen
     */
    create:function() {
      console.log("Ready!");
      //Event Listener aufrufen
      this.setListeners();
    },

    /**
     * GameLoop
     */
    update:function() {

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
