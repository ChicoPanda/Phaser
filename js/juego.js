

var dificultdad = parseInt(localStorage.getItem('dificultad'));

if (dificultdad) {

    var spirite = new Phaser.Game(1000, 700, Phaser.CANVAS, 'frame', {preload: preload, create: create, update: update});


}

var enemigos;
var plataformas;
var columnas;
var superhero;
var tecla;
var score = 0;
var textScore;
var musi, bom, muerte;
var ataque = true
var total;
var vida = 0;

//Aqui cargaremos todo lo que se usara en el juego, las imagenes, audios, fisica etc...
function preload() {


    spirite.load.spritesheet("muerte", "fondos/Skeleton Dead.png", 33, 32);
    spirite.load.image("fondo1", "fondos/city_background_night.png");
    spirite.load.image("plataforma", "fondos/plata.png");
    spirite.load.image("columna", "fondos/colu.png");
    spirite.load.image("hero1", "fondos/full.png");
    spirite.load.spritesheet("enemigo", "fondos/mvoerS.png", 21.9, 32);
    spirite.load.spritesheet("superhero", "fondos/Nuevolienzo.png", 30.59, 48);
    spirite.load.audio("musi", "music/musi.mp3")
    spirite.load.audio("bom", "music/mm.mp3")
    spirite.load.audio("muerte", "music/muerte.mp3")
    spirite.load.image('bullet', 'fondos/bullet.jpg');
    spirite.load.spritesheet("efecto", "fondos/ataq.png", 48, 48);
    spirite.load.image('plata', 'fondos/plata.jpg');
}
var golpes = 1;
var perder = 3;
var dar = true;
var sprite;
var weapon;
var cursors;
var fireButton;
var ultimadireccion = 1;
var enemigo = 0
var puntuacion = 1;
$('document').ready(function () {

    var nombre = localStorage.getItem('nombre');
    var jugadorActual = localStorage.getItem(nombre)


    if (nombre) {
        $("#TBnombre").val(nombre)
    }
    $("#jugar").click(function () {

        if (!$("#TBnombre").val()) {

            alert("inserte nombre pofis")
        } else {

            localStorage.setItem("nombre", $("#TBnombre").val())

            localStorage.setItem('dificultad', parseInt($('#dificultad').val()));
            location.reload();
        }

    })
})

function create() {



    //Agregar fiscia al juego
    spirite.physics.startSystem(Phaser.Physics.ARCADE);
    // Mundo
    spirite.world.setBounds(0, 0, 8192, 700);
    //importa el orden de añadida 

    fondo = spirite.add.sprite(0, -300, "fondo1");
    musi = spirite.add.audio("musi")
    bom = spirite.add.audio("bom")
    muerte = spirite.add.audio("muerte")

    musi.play("", 1, true)



    //  Creates 30 bullets, using the 'bullet' graphic
    weapon = spirite.add.weapon(30, 'efecto');
    weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
    weapon.bulletKillDistance = 200;

    //weapon.bullets.callAll('animations.add', 'animations', 'efecto', [0,1,2,3,4],  1, true);
    //  The bullet will be automatically killed when it leaves the world bounds
    weapon.bulletSpeed = 1900;
    weapon.addBulletAnimation("efecto", [0, 1, 2, 3, 4], 60, true)



    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    var plataforma;

    plataformas = spirite.add.group();
    spirite.physics.enable(plataformas, Phaser.Physics.ARCADE);
    plataformas.enableBody = true;


    plataforma1 = spirite.add.tileSprite(0, 670, spirite.world.width, 40, "plata")
    plataformas.add(plataforma1)
    plataforma1.body.immovable = true;

    spirite.add.tileSprite(50, 670, spirite.world.width, 40, "plata")

    enemigos = spirite.add.group();
    enemigos.enableBody = true;
    var plata = plataformas.create(200, 400, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(1000, 400, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(1500, 100, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(900, 300, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(800, 400, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(400, 500, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(600, 300, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(700, 100, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;

    var plata = plataformas.create(400, 300, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(2000, 300, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(3000, 300, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(1800, 300, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(1600, 400, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(800, 500, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(1200, 300, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(1400, 550, 'plata')
    plataformas.add(plata)

   
    var plata = plataformas.create(2600, 550, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(4650,200, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(3500, 300, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(3200, 200, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(1600, 400, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(2000, 200, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(1400, 200, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;


    var plata = plataformas.create(2200, 550, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(4600, 550, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(6650, 200, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(5500, 300, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(6200, 400, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(3600, 500, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(4000, 200, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(3400, 400, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(2200, 300, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(4600, 200, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(6650, 200, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(6500, 300, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(7200, 400, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(4600, 200, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(5000, 200, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(4400, 300, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(3200, 400, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(5600, 220, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(7650, 200, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(6500, 300, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(7200, 400, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(4600, 400, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(5000, 200, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;
    var plata = plataformas.create(4400, 300, 'plata')
    plataformas.add(plata)
    plata.body.immovable = true;



    /*
     for (var i = 0; i < 10; i++) {
     var enemigo = enemigos.create(50 + i * 50, 100, "enemigo");
     enemigo.body.collideWorldBounds = true;
     enemigo.body.gravity.y = 900;
     enemigo.body.bounce.setTo(0.5);
     } 
     */

    for (var i = 0, max = 30 * dificultdad; i < max; i++) {
        enemigos.add(new Slime(spirite, 330 * i, 100))
    }

    superhero = spirite.add.sprite(800, 300, "superhero")
    spirite.physics.arcade.enable(superhero);

    superhero.scale.setTo(1.5, 1.5)
    superhero.body.gravity.y = 9000;
    superhero.body.collideWorldBounds = true;
    superhero.animations.add("izq", [0, 1, 2], 24, true);
    superhero.animations.add("der", [4, 5, 6], 24, true);
    superhero.anchor.setTo(0.5, 0.5);
    superhero.body.setSize(superhero.body.width / 2, superhero.body.height / 2, superhero.body.width / 4, superhero.body.height / 2);

    tecla = spirite.input.keyboard.createCursorKeys();
    // Follow
    spirite.camera.follow(superhero);
    weapon.trackSprite(superhero, 0, 0, true);

}


//Basicamente es un hilo que controlara todo lo que pase en nuestro juego
function update() {

    spirite.physics.arcade.collide(superhero, plataformas)
    spirite.physics.arcade.overlap(enemigos, enemigos, function (e1, e2) {

        if (e1.body.x > e2.body.x) {
            e1.body.x += 2;
            e2.body.x -= 2;
        } else {
            e2.body.x += 2;
            e1.body.x -= 2;
        }
    }, null, this)
    superhero.body.velocity.x = 0;

    if (tecla.left.isDown) {
        superhero.body.velocity.x = -400;
        superhero.animations.play("izq");
        ultimadireccion = -1;
    } else if (tecla.right.isDown) {
        ultimadireccion = 1;
        superhero.body.velocity.x = +400;
        superhero.animations.play("der");
    } else {
        superhero.animations.stop();
        superhero.frame = 3;
    }
    if (tecla.up.isDown && superhero.body.touching.down) {
        superhero.body.velocity.y = -2000;
    }



    spirite.physics.arcade.overlap(superhero, enemigos, perdereVida, null, this)
    spirite.physics.arcade.overlap(weapon.bullets, enemigos, destruir, null, this)
    function perdereVida(hero, ene) {

        if (perder == 0)
        {
            localStorage.setItem('dificultad', null);
            hero.kill();
            console.log(document.getElementById("total").innerHTML = parseInt(enemigo) * parseInt(golpes) * parseInt(dificultdad))
            $("#frame").fadeOut(3000, function () {
                $("#frame").remove();


            });
            muerte.play("", 1, true)
        }
        if (dar && !ene.muriendose) {
            vida++;

            document.getElementById("vida" + vida).remove();
            perder -= 1
            dar = false;


            spirite.time.events.add(800, function (event) {
                dar = true;

                spirite.time.events.remove(event)

            }, this)
        }
    }
    function destruir(bala, ene) {
        if (ene.muriendose) {
            return;
        }

        puntuacion
        ene.vida -= 5;

        score += +1;
        bala.kill()
        golpes++;
        console.log(document.getElementById("golpes").innerHTML = golpes)

        bom.play()
        ene.animations.play("hit");
        console.log(score)

        if (ene.vida <= 0) {


            if (parseInt(document.getElementById("muertos").innerHTML) == 30 * dificultdad) {
                $("#frame").fadeOut(3000, function () {
                    $("#frame").remove();
                    localStorage.setItem(localStorage.getItem('nombre'), parseInt(enemigo) * parseInt(golpes) * parseInt(dificultdad)*3)
                    console.log(document.getElementById("total").innerHTML = parseInt(enemigo) * parseInt(golpes) * parseInt(dificultdad) * 3)
                    localStorage.setItem(localStorage.getItem('nombre'), puntuacion)
                });
            } else {
                console.error(enemigo + dificultdad)
            }
            enemigo++
            console.log(document.getElementById("muertos").innerHTML = enemigo)
            ene.loadTexture("muerte", 0, false);
            ene.muriendose = true;


        }

    }

    spirite.input.onDown.add(function (event) {

        if (ataque) {
            weapon.bulletSpeed = 600 * ultimadireccion;
            weapon.fire();
            console.log("ataco")
            ataque = false

            spirite.time.events.add(400, function (event) {
                ataque = true
                spirite.time.events.remove(event)

            }, this)

        }
    })

}
 

 