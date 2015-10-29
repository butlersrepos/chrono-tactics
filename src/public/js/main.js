
var renderer = new PIXI.WebGLRenderer(800, 600);

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

var bunnyTexture = PIXI.Texture.fromImage('imgs/mob_bunny.png');
var bunny = new PIXI.Sprite(bunnyTexture);

bunny.position.x = 400;
bunny.position.y = 300;

bunny.scale.x = 2;
bunny.scale.y = 2;

stage.addChild(bunny);

animate();

function animate() {
    // start the timer for the next animation loop
    requestAnimationFrame(animate);

    // each frame we spin the bunny around a bit
    bunny.rotation += 0.01;

    // this is the main render call that makes pixi draw your container and its children.
    renderer.render(stage);
}
