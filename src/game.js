function init() {

// Create stage
var stage = new createjs.Stage("canvas");

// Preload images
(function preload() {
    var preload = new createjs.LoadQueue();
    preload.addEventListener("fileload", handleFileComplete);
    preload.loadFile("assets/title.png");
})();

function handleFileComplete(event) {
    var image = event.result;
    var bmp = new createjs.Bitmap(image);
    stage.addChild(bmp);
    stage.update();
}

}