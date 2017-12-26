module objects {
    export class Player extends objects.GameObject {
        //PRIVATE INSTANCE VARIBALES 
        private assetManager: createjs.LoadQueue;
        private keyBoardKey = new core.keyBoardInput();
        bulletSpawn:createjs.Point;

       
        //PUBLIC PROPERTIES
        public getHealth (){                                // Getter for current HP
            return this.health;
        }

        public setHealth (newHealth:number){                // Setter for new HP
            this.health = newHealth;
        }

        public getPlayerXY() : number
        {
            return this.x;
        }
        //CONSTRUCTORS
        constructor(assetManager: createjs.LoadQueue) 
        {
            super(assetManager, "player");
            this.assetManager = assetManager;
            this.Start();
        }

        //PUBLIC METHODS             
        public Start()                                      // Start method runs when object is instantiated
        {
            this.regXY();
            this.health = 100;
            this.keyBoardKey = new core.keyBoardInput();
            this.bulletSpawn = new createjs.Point(this.y -35, this.x);
        }
        public Update()                                     // Update method runs 60fps
        {
            this.bulletSpawn.x = this.x;
            this.bulletSpawn.y = this.y;
            this.checkBounds();
            this.playerMovement();
        }
        
        //PRIVATE METHODS
        private regXY(): void                               //Method to set bitmap registry point at the center
        {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfWidth = this.width /2;
            this.halfHeight = this.height /2;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
        }
        private checkBounds() 
        {
            if(this.x >= config.Screen.WIDTH - this.halfWidth) {
              this.x = config.Screen.WIDTH - this.halfWidth;
            }
            if(this.x <= this.halfWidth) {
              this.x = this.halfWidth;
            }
      
            if(this.y >= config.Screen.HEIGHT - this.halfHeight) {
              this.y = config.Screen.HEIGHT - this.halfHeight;
            }
      
            if(this.y <= this.halfHeight) {
              this.y = this.halfHeight;
            }
        }
        private playerMovement()                            // Move player object
        {  
            var getKey = this.keyBoardKey.getkeyInput(); 
            if (getKey !=null && getKey == 37)              // Left
            {
                this.x -= this.playerSpeed;
            }   
            else if (getKey !=null && getKey == 38)         // Up
            {
                this.y -= this.playerSpeed;
            } 
            else if (getKey !=null && getKey == 39)         // Right
            {
                this.x += this.playerSpeed;
            } 
            else if (getKey !=null && getKey == 40)         // Down
            {
                this.y += this.playerSpeed;
            }        
            this.setPlayerRotation(); 
        }
        private setPlayerRotation()                         // Method finds angle between Player and Mouse pointer, sets angle to player rotation
        {
            var xAngle = this.stage.mouseX- this.x;
            var yAngle = this.stage.mouseY- this.y;
            this.playerRotation = Math.atan2(yAngle,xAngle) * (180/ Math.PI);       
            this.rotation = this.playerRotation;
        }
        public fire()
        {
           // let bullet = new objects.Bullet(this.assetManager, this.bulletSpawn);
            //this.parent.addChild(bullet);
            //bullet.Update();
        }
    }
}