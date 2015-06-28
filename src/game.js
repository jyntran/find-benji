// Define stage
var stage;

// Define images
var title;
var benji;
var dori;   

// Define sounds
var music;
var sfxWin;
var sfxLose;

// Define GUI
var textLoaded;
var btnNext;
var textHelp;
var btnGo;
var btnRun;
var btnEnd;

// Define views
var LoadingView;
var TitleView;
var HelpView;
var WinView;
var LoseView;

// Define game variables
var level = 1;
var clicks = 0;
var maxClicks = 5;

// Define preloader
var preloader;
var manifest;
var totalLoaded = 0;


function init() {

// Create stage
stage = new createjs.Stage("canvas");

// Preload images
manifest = [
    // Images
    {id: "title", src: "assets/title.png"},
    {id: "benji", src: "assets/sprites/benji_0.bmp"},
    {id: "dori", src: "assets/sprites/dori_0.bmp"},
    // Sounds
    // {id: "music", src: "assets/106A.mp3"},
    {id: "sfxWin", src: "assets/win.wav"},
    {id: "sfxLose", src: "assets/bang.wav"}
];

preloader = new createjs.LoadQueue();
preloader.installPlugin(createjs.Sound);
preloader.on("progress", handleProgress);
preloader.on("fileload", handleFileLoad);
preloader.on("complete", handleComplete);
preloader.loadManifest(manifest);

}

function handleProgress(event) {
    showLoadingView(event.loaded);
}

function handleFileLoad(event) {
    switch(event.item.type) {
        case 'image':
            var image = event.result;
            image.src = event.item.src;
            image.onload = handleFileLoadComplete;
            window[event.item.id] = new createjs.Bitmap(image);
            break;
        case 'sound':
            handleFileLoadComplete();
            break;
    }
}

function handleFileLoadComplete(event) {
    totalLoaded++;
    if (totalLoaded == manifest.length)
        showTitleView();
}

function handleComplete(event) {
    stage.removeAllChildren();
    showTitleView();
}

function showLoadingView(loaded) {
    stage.removeAllChildren();
    textLoaded = new createjs.Text(Math.floor(loaded*100)+"%", "48px Comic Sans Ms");
    textLoaded.textAlign = "center";
    textLoaded.textBaseline = "middle";
    textLoaded.x = 100;
    textLoaded.y = 100;
    stage.addChild(textLoaded);
    stage.update();    
}

function showTitleView() {
    // Next button
    btnNextBg = new createjs.Shape();    
    btnNextBg.graphics.beginFill("Black").drawRect(0, 0, 50, 20, 10);
    btnNextLabel = new createjs.Text("Next", "12px Comic Sans MS", "#ffffff");
    btnNextLabel.textAlign = "center";
    btnNextLabel.textBaseline = "middle";
    btnNextLabel.x = 50/2;
    btnNextLabel.y = 20/2;
    btnNext = new createjs.Container();
    btnNext.x = 30;
    btnNext.y = 150;
    btnNext.addChild(btnNextBg, btnNextLabel);
    btnNext.addEventListener("click", function(event){
        stage.removeAllChildren();
        showHelpView();
    });

    // Compile view
    TitleView = new createjs.Container();
    TitleView.addChild(title, btnNext);
    stage.addChild(TitleView);
    stage.update();
}

function showHelpView() {    
    // Help text
    textHelp = new createjs.Text("Benji is swallowed by the swarm of Doris!\nClick on him to help Benji escape.\nBUT - click wisely!!\nYou only have a few tries before Dori gets you too...", "12px Comic Sans MS");
    textHelp.lineWidth = 150;
    textHelp.lineHeight = 14;
    textHelp.x = 25;
    textHelp.y = 25;

    // Go button
    btnGoBg = new createjs.Shape();    
    btnGoBg.graphics.beginFill("Black").drawRect(0, 0, 50, 20, 10);
    btnGoLabel = new createjs.Text("Go!", "12px Comic Sans MS", "#ffffff");
    btnGoLabel.textAlign = "center";
    btnGoLabel.textBaseline = "middle";
    btnGoLabel.x = 50/2;
    btnGoLabel.y = 20/2;
    btnGo = new createjs.Container();
    btnGo.x = 75;
    btnGo.y = 150;
    btnGo.addChild(btnGoBg, btnGoLabel);
    btnGo.addEventListener("click", function(event){
        stage.removeAllChildren();
        start();
    });

    // Compile view
    HelpView = new createjs.Container();
    HelpView.addChild(textHelp, btnGo);
    stage.addChild(HelpView);
    stage.update();
}

function showGameView() {    
    // Level text
    textLevel = new createjs.Text("Level: "+level, "12px Comic Sans MS");
    textLevel.lineWidth = 100;
    textLevel.lineHeight = 14;
    textLevel.x = 0;
    textLevel.y = 0;

    // Clicks text
    textClicks = new createjs.Text("Clicks Left: "+(maxClicks-clicks), "12px Comic Sans MS");
    textClicks.lineWidth = 100;
    textClicks.lineHeight = 14;
    textClicks.x = 100;
    textClicks.y = 0;

    // Compile view
    GameView = new createjs.Container();
    GameView.addChild(textLevel, textClicks);
    stage.addChild(GameView);
    stage.update();
}

function start() {
    console.log("Start game");
    showGameView();
}