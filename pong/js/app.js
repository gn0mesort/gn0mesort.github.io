!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){var d={boot:a("./states/boot"),preloader:a("./states/preload"),play:a("./states/play")},e=new Phaser.Game(800,600,Phaser.AUTO,"game");for(var f in d)e.state.add(f,d[f]);console.log(e.state),e.state.start("boot")},{"./states/boot":2,"./states/play":3,"./states/preload":4}],2:[function(a,b,c){var d={};d.create=function(){this.game.state.start("preloader")},b.exports=d},{}],3:[function(a,b,c){var d={};d.create=function(){this.paddle1=this.game.add.sprite(100,this.game.world.centerY,"paddle"),this.paddle2=this.game.add.sprite(700,this.game.world.centerY,"paddle"),this.ball=this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,"ball"),this.ball.beep=this.game.add.sound("beep",.25),this.ball.hits=1,this.game.physics.arcade.enable(this.paddle1),this.game.physics.arcade.enable(this.paddle2),this.game.physics.arcade.enable(this.ball),this.paddle1.body.collideWorldBounds=!0,this.paddle1.body.immovable=!0,this.paddle2.body.collideWorldBounds=!0,this.paddle2.body.immovable=!0,this.ball.body.collideWorldBounds=!0,this.ball.body.bounce.setTo(1,1),this.ball.body.velocity.x=-300,this.controller=this.game.input.keyboard.addKeys({up:Phaser.KeyCode.W,upalt:Phaser.KeyCode.UP,down:Phaser.KeyCode.S,downalt:Phaser.KeyCode.DOWN}),this.ball.body.onCollide=new Phaser.Signal,this.ball.body.onCollide.add(function(a,b){b.deltaY>0?a.body.velocity.y=150*a.hits++:b.deltaY<0&&(a.body.velocity.y=-150*a.hits++),null!==a.beep.context&&a.beep.play()}),this.score1=0,this.score2=0;var a={font:"40px Noto Sans, Arial, sans",fill:"#ffffff",align:"center"};this.scores=this.game.add.text(this.game.world.centerX,30,"SCORE: "+this.score1+" - "+this.score2,a),this.scores.anchor.set(.5)},d.update=function(){this.game.physics.arcade.collide(this.ball,this.paddle1),this.game.physics.arcade.collide(this.ball,this.paddle2),this.controller.up.isDown||this.controller.upalt.isDown?this.paddle1.body.velocity.y=-300:this.controller.down.isDown||this.controller.downalt.isDown?this.paddle1.body.velocity.y=300:this.game.input.activePointer.isDown?this.game.input.activePointer.y>this.game.world.centerY?this.paddle1.body.velocity.y=300:this.game.input.activePointer.y<=this.game.world.centerY&&(this.paddle1.body.velocity.y=-300):this.paddle1.body.velocity.y=0,this.ball.deltaY>0?this.paddle2.body.velocity.y=300:this.ball.deltaY<0?this.paddle2.body.velocity.y=-300:this.paddle2.y>this.paddle1.y+25?this.paddle2.body.velocity.y=-150:this.paddle2.y<this.paddle1.y-25?this.paddle2.body.velocity.y=150:this.paddle2.body.velocity.y=0,(this.ball.x<this.paddle1.x||this.ball.x>this.paddle2.x)&&(this.score1+=this.ball.x>this.paddle2.x,this.score2+=this.ball.x<this.paddle1.x,this.ball.x=this.game.world.centerX,this.ball.y=this.game.world.centerY,this.paddle1.y=this.game.world.centerY,this.paddle2.y=this.game.world.centerY,this.ball.body.velocity.x=-300,this.ball.body.velocity.y=0,this.ball.hits=0),this.scores.text="SCORE: "+this.score1+" - "+this.score2},b.exports=d},{}],4:[function(a,b,c){var d={};d.preload=function(){this.game.load.image("logo","./media/phaser.png"),this.game.load.image("paddle","./media/paddle.png"),this.game.load.image("ball","./media/ball.png"),this.game.load.audio("beep","./media/pong_beep.ogg",!0)},d.create=function(){this.game.state.start("play")},b.exports=d},{}]},{},[1]);