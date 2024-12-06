const GRAVITY = 0.01;

class Mushroom {
    constructor(){
        this.walk = false;
        this.idle = false;

        this.jump_strength = 0.5;

        this.pos = [0, 0];
        this.vel = [0, 0];
        this.acc = [0, 0];

        let keys = {
            jump: false,
            left: false,
            right: false,
            dash: false
        };

        this.keys = keys;

        window.addEventListener('keydown', event => {
            switch(event.key){
                case 'ArrowUp':
                    keys.jump = true;
            };
        });

        window.addEventListener('keyup', event => {
            switch(event.key){
                case 'ArrowUp':
                    keys.jump = false;
            };
        });
    }

    walk_atlas = {
        frames: {
            walk0: {
                frame: { x: 0 * 48, y: 0, w: 48, h: 48 },
                sourceSize: { w: 48, h: 48 },
                spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
            },
            walk1: {
                frame: { x: 1 * 48, y: 0, w: 48, h: 48 },
                sourceSize: { w: 48, h: 48 },
                spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
            },
            walk2: {
                frame: { x: 2 * 48, y: 0, w: 48, h: 48 },
                sourceSize: { w: 48, h: 48 },
                spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
            },
            walk3: {
                frame: { x: 3 * 48, y: 0, w: 48, h: 48 },
                sourceSize: { w: 48, h: 48 },
                spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
            },
        },
        meta: {
            image: '/images/mushroom_walk.png',
            format: 'RGBA8888',
            size: { w: 192, h: 48 },
            scale: 1
        },
        animations: {
            walk: ["walk0", "walk1", "walk2", "walk3"]
        }
    };    

    idle_atlas = {
        frames: {
            idle0: {
                frame: { x: 0 * 48, y: 0, w: 48, h: 48 },
                sourceSize: { w: 48, h: 48 },
                spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
            },
            idle1: {
                frame: { x: 1 * 48, y: 0, w: 48, h: 48 },
                sourceSize: { w: 48, h: 48 },
                spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
            },
            idle2: {
                frame: { x: 2 * 48, y: 0, w: 48, h: 48 },
                sourceSize: { w: 48, h: 48 },
                spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
            },
            idle3: {
                frame: { x: 3 * 48, y: 0, w: 48, h: 48 },
                sourceSize: { w: 48, h: 48 },
                spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
            },
            idle4: {
                frame: { x: 4 * 48, y: 0, w: 48, h: 48 },
                sourceSize: { w: 48, h: 48 },
                spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
            },
            idle5: {
                frame: { x: 5 * 48, y: 0, w: 48, h: 48 },
                sourceSize: { w: 48, h: 48 },
                spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
            },
            idle6: {
                frame: { x: 6 * 48, y: 0, w: 48, h: 48 },
                sourceSize: { w: 48, h: 48 },
                spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
            },
            idle7: {
                frame: { x: 7 * 48, y: 0, w: 48, h: 48 },
                sourceSize: { w: 48, h: 48 },
                spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
            },
            idle8: {
                frame: { x: 8 * 48, y: 0, w: 48, h: 48 },
                sourceSize: { w: 48, h: 48 },
                spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
            }
        },
        meta: {
            image: '/images/mushroom_idle.png',
            format: 'RGBA8888',
            size: { w: 432, h: 48 },
            scale: 1
        },
        animations: {
            idle: ["idle0", "idle1", "idle2", "idle3", "idle4", "idle5", "idle6", "idle7", "idle8"]
        }
    }

    async load(app){
        const walk_texture = await PIXI.Assets.load({
            src: this.walk_atlas.meta.image
        });

        const idle_texture = await PIXI.Assets.load({
            src: this.idle_atlas.meta.image
        });

        const walk = new PIXI.Spritesheet(
            new PIXI.Texture(walk_texture),
            this.walk_atlas
        );

        const idle = new PIXI.Spritesheet(
            new PIXI.Texture(idle_texture),
            this.idle_atlas
        );

        await Promise.all([walk.parse(), idle.parse()]);

        this.walk = new PIXI.AnimatedSprite(walk.animations.walk);
        this.idle = new PIXI.AnimatedSprite(idle.animations.idle);

        this.walk.animationSpeed = this.idle.animationSpeed = 0.1666;

        this.animation = this.idle;

        this.animation.play();
        app.stage.addChild(this.animation);
    }

    update(time){
        // kinematics
        this.acc[0] += 0 * time.deltaTime;
        this.acc[1] += GRAVITY * time.deltaTime;

        this.vel[0] += this.acc[0] * time.deltaTime;
        this.vel[1] += this.acc[1] * time.deltaTime;

        this.pos[0] += this.vel[0] * time.deltaTime;
        this.pos[1] += this.vel[1] * time.deltaTime;

        // jumps
        if(this.keys.jump){
            this.acc[1] = -this.jump_strength;
        }
        
        // update sprite
        this.animation.x = this.pos[0];
        this.animation.y = this.pos[1];
    }
};

window.addEventListener('load', async _ => {
    const screen = document.getElementById("screen");

    const app = new PIXI.Application();

    await app.init({background: '#1099bb', resizeTo: window, canvas: screen});

    const mushroom = new Mushroom();
    await mushroom.load(app);

    app.ticker.add((ticker) => mushroom.update(ticker));
});