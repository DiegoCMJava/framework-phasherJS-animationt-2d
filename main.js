class Examples extends Phaser.Scene {

    light;
    offsets = [];
    player;
    layer;
    cursors;

    preload(){
        this.load.image('tiles', ['assets/tilemaps/tiles/drawtiles1.png', 'assets/tilemaps/tiles/drawtiles1.png']);
        this.load.tilemapCSV('map', 'assets/tilemaps/csv/grid.csv');
        this.load.spritesheet('player', 'assets/sprites/player.png', {frameWidth: 32, frameHeight:32});
    };

    create(){
        this.map = this.make.tilemap({key: 'map', tileWidth:32, tileHeight: 32});
        const tileset = this.map.addTilesetImage('tiles', null, 32, 32, 1, 2);
        this.layer = this.map.createLayer(0, tileset, 0, 0)

        this.map.setCollision([2]);
        
        // movimientos del personaje
       
      this.anims.create({
            key: 'left',
           frames: this.anims.generateFrameNumbers('player', {start:4, end:7}),
    
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {start:8, end:11}),
        
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', {start:12, end:15}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', {start:0, end:3}),
            frameRate: 10,
            repeat: -1
        });
       

       this.player = this.physics.add.sprite(74, 80, 'player', 8);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.layer);
    };

    update() {
        this.updatePlayer();
       this.updateMap();
       
    };

    updateMap(){
        const origin = this.map.getTileAtWorldXY(this.player.x , this.player.y);
        this.map.forEachTile(tile => {
          const dist = Phaser.Math.Distance.Chebyshev(
            origin.x,
            origin.y,
            tile.x,
            tile.y
          );
          tile.setAlpha(1 - 0.2 * dist);
        });
        
        
    };
    updatePlayer(){ //time, delta
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            
            this.player.setVelocityX(-100)
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
           
            this.player.setVelocityX(100);
            this.player.anims.play('right', true);
        }
        else if (this.cursors.up.isDown)
        {
            
            this.player.setVelocityY(-100);
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            
            this.player.setVelocityY(100);
            this.player.anims.play('down', true);
        }  
        else {
            this.player.anims.stop();
        }
/*
        if (this.cursors.left.isDown) {
            this.player.anims.play('left', true);
            this.player.setVelocityX(-100)
        }
        else if (this.cursors.right.isDown)
        {
            this.player.anims.play('right', true);
            this.player.setVelocityX(100);
        }
        else if (this.cursors.up.isDown)
        {
            this.player.anims.play('up', true);
            this.player.setVelocityY(-100);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.anims.play('down', true);
            this.player.setVelocityY(100);
        }   else {
            this.player.anims.stop();
        }
      */  
        /*
        if (this.input.keyboard.checkDown(this.cursors.left))
        {
            this.player.anims.play('left', true);
            const tile = this.layer.getTileAtWorldXY(this.player.x -15, this.player.y, true );
            if (tile.index === 2) {
                // bloqueo, no se puede mover el jugador
            } else {
                this.player.x -=1;
            
            };
        }
        else if(this.input.keyboard.checkDown(this.cursors.right)){
            this.player.anims.play('right', true);
            const tile = this.layer.getTileAtWorldXY(this.player.x +15, this.player.y, true );
            if (tile.index === 2) {
                // bloqueo, no se puede mover el jugador
            } else {
                this.player.x +=1;
            };
        }
        else if(this.input.keyboard.checkDown(this.cursors.up)){
            this.player.anims.play('up', true);
            const tile = this.layer.getTileAtWorldXY(this.player.x, this.player.y -15, true );
            if (tile.index === 2) {
                // bloqueo, no se puede mover el jugador
            } else {
                this.player.y -=1;
            };
        }
        else if(this.input.keyboard.checkDown(this.cursors.down)){
            this.player.anims.play('down', true);
            const tile = this.layer.getTileAtWorldXY(this.player.x, this.player.y +15, true );
            if (tile.index === 2) {
                // bloqueo, no se puede mover el jugador
            } else {
                this.player.y +=1;
            };
        }
        else {
            this.player.anims.stop();
        }
        */
    };

    

};


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    pixelArt: true,
    backgroundColor: '#1a1a2d', //#1a1a2d #A9CCE3
    physics: {
        default: 'arcade'
    },
    scene: Examples

 };

 // instacia del juego 
 const game = new Phaser.Game(config);
