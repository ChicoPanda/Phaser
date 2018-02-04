var boss = 0;
Slime = function (game, x, y) {


    this.vida = 5 * dificultdad;
    Phaser.Sprite.call(this, game, x, y, "enemigo");
    spirite.physics.enable(this, Phaser.Physics.ARCADE);
    this.collideWorldBounds = true;
    this.enableBody = true;
    this.body.gravity.y = 800;
    this.body.bounce.y = 0;// 0.7 + Math.random() * 0.2;
    this.body.bounce.x = 0;
    this.body.collideWorldBounds = true;
    this.animations.add("izq1", [17, 18, 19, 20, 21, 22, 23], 22, true);
    this.muriendose = false;
    this.body.setSize(this.body.width / 2, this.body.height / 2, this.body.width / 4, this.body.height / 2);
    this.animations.add("hit", [0, 1, 2, 3, 4, 5, 6, 7], 22, true);
    this.muerte = this.animations.add("muerte", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 20, false);
    this.muerte.onComplete.add(function () {
        if (enemigo == 8 * dificultdad) {
            //aparece boss800
            var jefesito = new Slime(spirite, 1000, 100);
            enemigos.add(jefesito)
            console.log(jefesito);
            boss++
         jefesito.body.setSize(jefesito.body.width / 2, jefesito.body.height / 2-1.7, jefesito.body.width  , jefesito.body.height+8 );
            console.log(document.getElementById("golpes").innerHTML = boss)
            jefesito.scale.setTo(6, 6);
            jefesito.vida = 100;
        }
        this.kill();

    }, this)

    this.animations.add("der1", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 22, true);
    this.scale.setTo(2.6, 2.6);

};

Slime.prototype = Object.create(Phaser.Sprite.prototype);
Slime.prototype.constructor = Slime;
Slime.prototype.onHit = function () {};
Slime.prototype.update = function () {

    spirite.physics.arcade.collide(this, plataformas, function (Slime, platform) {

        var distanciaS = Slime.body.x;
        var distanciaH = superhero.body.x;
        var dist = Math.abs(Phaser.Math.distance(superhero.body.x, superhero.body.y, Slime.body.x, Slime.body.y));

        if (!Slime.muriendose) {
            if (superhero.body.y < Slime.body.y) {
                if (Slime.body.touching.down) {
                    Slime.body.velocity.y = -800;
                }

            } else {
                if (distanciaS < distanciaH) {
                    //sale despues de un segundo
                    Slime.animations.play("izq1");
                    Slime.body.velocity.x = 90 * dificultdad;
                } else {
                    Slime.animations.play("der1");
                    Slime.body.velocity.x = -90 * dificultdad;
                }
            }



        } else {
            if (!Slime.muerte.isPlaying) {
                Slime.muerte.play();
            }
            Slime.body.velocity.x = 0;


        }

    });



};