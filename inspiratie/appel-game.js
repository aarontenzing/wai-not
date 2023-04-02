"use strict";

/**
 * Created by Tom on 26/03/2016.
 */

var gameProperties = {
    basketVelocity: 300,
    appleVelocity: 110,
    rottenVelocity: 100,

    left: false,
    right: false,

    maximumLives: 5,
    lives: 5,

    wave: 0,

    score: 0,
    tf_score: undefined
};

var fontAssets = {
    score_x: 550,
    score_y: 10,
    scoreFontStyle: {font: '80px Arial', fill: '#FFFFFF', align: 'center'},
    menuFontStyle: {font: '25px Arial', fill: '#FFFFFF', align: 'center'},
    scoreListFontStyle: {font: '16px Arial', fill: '#FFFFFF', align: 'center'}
};

var appleGameState = function(game) {
    this.destroy;
    this.basket;

    this.leftArrow;
    this.rightArrow;

    this.goldenApple = undefined;
    this.newLive = undefined;
    this.apples;
    this.lives;

    this.cursors;

    this.appleSound;
    this.goldenSound;
    this.rottenSound;
    this.liveSound;
};

appleGameState.prototype = {
    preload : function() {
        // Images
        game.load.image('background', 'assets/images/game/background.png');
        game.load.image('rottenApple', 'assets/images/game/rottenApple.png');
        game.load.image('goldenApple', 'assets/images/game/goldenApple.png');
        game.load.image('goodApple', 'assets/images/game/apple.png');
        game.load.image('basket', 'assets/images/game/basket.png');
        game.load.image('live', 'assets/images/game/levens.png');
        game.load.image('destroy', 'assets/images/game/destroy.png');

        game.load.image('arrowLeft', 'assets/images/game/arrowLeft.png');
        game.load.image('arrowRight', 'assets/images/game/arrowRight.png');

        // Audio
        game.load.audio('appleSound', 'assets/audio/game/appleSound.mp3');
        game.load.audio('goldenSound', 'assets/audio/game/goldenSound.mp3');
        game.load.audio('rottenSound', 'assets/audio/game/rottenSound.mp3');
        game.load.audio('liveSound', 'assets/audio/game/liveSound.mp3');
    },

    create: function () {
        this.initGraphics();
        this.initAudio();
        this.initPhysics();
        this.initControls();
        this.initScreenShake();

        // Reset game flags
        this.resetGame();

        // Create first wave
        this.createWave();
    },

    update: function () {
        this.moveBasket();

        game.physics.arcade.overlap(this.basket, this.apples, this.appleCatched, null, this);

        game.physics.arcade.overlap(this.destroy, this.apples, this.destroyItem, null, this);

        if (this.goldenApple) {
            game.physics.arcade.overlap(this.basket, this.goldenApple, this.goldenAppleCatched, null, this);
        }

        if (this.newLive) {
            game.physics.arcade.overlap(this.basket, this.newLive, this.newLiveCatched, null, this);
        }

        if (this.apples.total === 0) {
            this.createWave();
        }

        if (gameProperties.lives === 0) {
            this.gameOver();
        }
    },

    shutdown: function () {
        game.world.setBounds(0, 0, 640, 480);
    },

    initGraphics: function () {
        game.add.sprite(0, 0, 'background');
        this.destroy = game.add.sprite(-55, 600, 'destroy');

        this.basket = game.add.sprite(game.world.width/2, 430, 'basket');
        this.basket.anchor.set(0.5, 0.5);

        this.apples = game.add.group();

        this.lives = game.add.group();
        this.updateLives();

        gameProperties.tf_score = game.add.text(fontAssets.score_x, fontAssets.score_y, "0", fontAssets.scoreFontStyle);
        gameProperties.tf_score.anchor.set(0.5, 0);
    },

    initAudio: function () {
        this.appleSound = game.add.audio('appleSound');
        this.goldenSound = game.add.audio('goldenSound');
        this.rottenSound = game.add.audio('rottenSound');
        this.liveSound = game.add.audio('liveSound');
    },

    initPhysics: function () {
        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.physics.enable(this.basket, Phaser.Physics.ARCADE);

        this.basket.checkWorldBounds = true;
        this.basket.body.collideWorldBounds = true;
        this.basket.body.immovable = true;

        // Enable Physics on all group members
        this.apples.enableBody = true;
        this.apples.physicsBodyType = Phaser.Physics.ARCADE;

        // Physics on the destroy beam
        game.physics.enable(this.destroy, Phaser.Physics.ARCADE);

        this.destroy.body.immovable = true;
    },

    initControls: function () {
        // Keyboard input
        this.cursors = game.input.keyboard.createCursorKeys();

        // Mobile input
        this.leftArrow = game.add.button(25, 380, 'arrowLeft', null, this);
        this.leftArrow.alpha = 0.5;
        this.leftArrow.scale.setTo(0.75);

        this.rightArrow = game.add.button(540, 380, 'arrowRight', null, this);
        this.rightArrow.alpha = 0.5;
        this.rightArrow.scale.setTo(0.75);

        this.leftArrow.events.onInputDown.add(function(){ gameProperties.left = true; });
        this.leftArrow.events.onInputUp.add(function(){ gameProperties.left = false; });

        this.rightArrow.events.onInputDown.add(function(){ gameProperties.right = true; });
        this.rightArrow.events.onInputUp.add(function(){ gameProperties.right = false; });
    },

    initScreenShake: function () {
        game.plugins.cameraShake = game.plugins.add(Phaser.Plugin.CameraShake);

        game.world.setBounds(0, -100, 640, 580);

        game.plugins.cameraShake.setup({
            shakeRange: 5,
            shakeCount: 10,
            shakeInterval: 20,
            randomShake: false,
            randomizeInterval: true,
            shakeAxis: 'y'
        });
    },

    createWave: function () {
        // Increase wave number
        gameProperties.wave++;
        console.log(gameProperties.wave);

        var i, x, y, apple;
        // Voeg rotte appels toe
        for (i = 0; i < 5; i++) {
            x = Math.random() * (640 - 50);
            y = -((i + 1) * 200 + (Math.random() - 0.5) * 25);

            apple = this.apples.create(x, y, 'rottenApple');
            apple.rotten = true;
            apple.body.velocity.y = gameProperties.rottenVelocity + gameProperties.wave*10;
        }

        // Voeg goede appels toe
        for (i = 0; i < 10; i++) {
            x = Math.random() * (640 - 50);
            y = -((i + 1) * 100 + (Math.random() - 0.5) * 50);

            apple = this.apples.create(x, y, 'goodApple');
            apple.rotten = false;
            apple.body.velocity.y = gameProperties.appleVelocity + gameProperties.wave*10;
        }

        // Om de 2 waves een special item
        if (gameProperties.wave%2 === 0) {
            x = Math.random() * (640 - 50);
            y = -250;

            this.goldenApple = game.add.sprite(x, y, 'goldenApple');

            game.physics.arcade.enable(this.goldenApple);
            this.goldenApple.checkWorldBounds = true;
            this.goldenApple.events.onOutOfBounds.add(this.outOfBounds, this);
            this.goldenApple.body.velocity.y = gameProperties.appleVelocity + gameProperties.wave*10 + 50;
        }

        // om de 3 waves een extra leven
        if (gameProperties.wave%3 === 0) {
            x = Math.random() * (640 - 50);
            y = -250;

            this.newLive = game.add.sprite(x, y, 'live');

            game.physics.arcade.enable(this.newLive);
            this.newLive.checkWorldBounds = true;
            this.newLive.events.onOutOfBounds.add(this.outOfBounds, this);
            this.newLive.body.velocity.y = gameProperties.appleVelocity;
        }
    },

    moveBasket: function () {
        if (this.cursors.right.isDown || gameProperties.right) {
            this.basket.body.velocity.x = gameProperties.basketVelocity;
        } else if (this.cursors.left.isDown || gameProperties.left) {
            this.basket.body.velocity.x = -gameProperties.basketVelocity;
        } else {
            this.basket.body.velocity.x = 0;
        }
    },

    appleCatched: function(basket, apple) {
        var x = apple.x;
        var y = apple.y;

        apple.kill();

        if (apple.rotten) {
            this.rottenSound.play();

            // Screen shake
            game.plugins.cameraShake.shake();

            gameProperties.lives--;
            this.updateLives();
        } else {
            var t = game.add.text(x, y + 25, "+ 1", fontAssets.menuFontStyle);
            t.anchor.set(0.5);
            t.alpha = 1;

            var tween = game.add.tween(t).to( { alpha: 0.1, y: y }, 2000, "Linear", true);
            tween.onComplete.add(function () { t.kill(); }, this);

            this.appleSound.play();

            gameProperties.score++;
            this.updateScoreTextField();
        }
    },

    goldenAppleCatched: function(basket, apple) {
        var x = apple.x;
        var y = apple.y;

        apple.kill();

        var t = game.add.text(x, y + 25, "+ 5", fontAssets.menuFontStyle);
        t.anchor.set(0.5);
        t.alpha = 1;

        var tween = game.add.tween(t).to( { alpha: 0.1, y: y }, 2000, "Linear", true);
        tween.onComplete.add(function () { t.kill(); }, this);

        this.goldenSound.play();

        this.goldenApple = undefined;
        gameProperties.score += 5;
        this.updateScoreTextField();
    },

    newLiveCatched: function(basket, live) {
        live.kill();

        this.liveSound.play();

        this.newLive = undefined;
        gameProperties.lives++;
        this.updateLives();
    },

    destroyItem: function(destroy, item) {
        item.kill();
    },

    outOfBounds: function (apple) {
        if (apple.y > game.world.height) {
            apple.kill();
        }
    },

    updateScoreTextField: function () {
        gameProperties.tf_score.text = gameProperties.score;
    },

    updateLives: function () {
        this.lives.removeAll();
        var i, live;

        // Voeg levens toe
        for (i = gameProperties.lives; i > 0; i--) {
            live = this.lives.create(i*30 - 20 , 10, 'live');

            live.scale.setTo(0.5, 0.5);
        }
    },

    gameOver: function () {
        socket.emit('submitScore', gameProperties.score);
        game.state.start("Score");
    },

    resetGame: function () {
        gameProperties.score = 0;
        gameProperties.lives = gameProperties.maximumLives;
        gameProperties.wave = 0;

        gameProperties.left = false;
        gameProperties.right = false;
    }
};