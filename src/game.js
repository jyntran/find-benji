// Define stage
var stage;
var stageWidth = 200;
var stageHeight = 200;

// Define images
var title;
var benji;
var dori;   

// Define sounds
var music;
var sfxWin;
var sfxLose;

// Define GUI
var background;
var textLoaded;
var btnNext;
var textHelp;
var btnGo;
var btnRun;
var textFinal;
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
var lose = false;

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
    {id: "benji", src: "assets/sprites/benji_0.png"},
    {id: "dori", src: "assets/sprites/dori_0.png"},
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
    showTitleView();
}

function showLoadingView(loaded) {
    stage.removeAllChildren();
    textLoaded = new createjs.Text(Math.floor(loaded*100)+"%", "48px Comic Sans MS");
    textLoaded.textAlign = "center";
    textLoaded.textBaseline = "middle";
    textLoaded.x = 100;
    textLoaded.y = 100;
    stage.addChild(textLoaded);
    stage.update();    
}

function showTitleView() {
    stage.removeAllChildren();
    // Next button
    btnNextBg = new createjs.Shape();    
    btnNextBg.graphics.beginFill("Black").drawRect(0, 0, 50, 20);
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
        showHelpView();
    });

    // Compile view
    TitleView = new createjs.Container();
    TitleView.addChild(title, btnNext);
    stage.addChild(TitleView);
    stage.update();
}

function showHelpView() {    
    stage.removeAllChildren();
    // Help text
    textHelp = new createjs.Text("Benji is swallowed by the swarm of Doris!\nClick on him to help Benji escape.\nBUT - click wisely!!\nYou only have a few tries before Dori gets you too...", "12px Comic Sans MS");
    textHelp.textAlign = "center";
    textHelp.lineWidth = 3*stageWidth/4;
    textHelp.x = stageWidth/2;
    textHelp.y = 0;

    // Go button
    btnGoBg = new createjs.Shape();    
    btnGoBg.graphics.beginFill("Black").drawRect(0, 0, 50, 20);
    btnGoLabel = new createjs.Text("Go!", "12px Comic Sans MS", "#ffffff");
    btnGoLabel.textAlign = "center";
    btnGoLabel.textBaseline = "middle";
    btnGoLabel.x = 50/2;
    btnGoLabel.y = 20/2;
    btnGo = new createjs.Container();
    btnGo.x = 3*stageWidth/8;
    btnGo.y = 3*stageHeight/4;
    btnGo.addChild(btnGoBg, btnGoLabel);
    btnGo.addEventListener("click", function(event){
        start();
    });

    // Compile view
    HelpView = new createjs.Container();
    HelpView.addChild(textHelp, btnGo);
    stage.addChild(HelpView);
    stage.update();
}

function showWinView() {    
    stage.removeAllChildren();
    // Win text
    textWin = new createjs.Text("You found Benji!", "12px Comic Sans MS");
    textWin.textAlign = "center";
    textWin.lineWidth = 3*stageWidth/4;
    textWin.x = stageWidth/2;
    textWin.y = 0;

    // Run button
    btnRunBg = new createjs.Shape();    
    btnRunBg.graphics.beginFill("Black").drawRect(0, 0, 50, 20);
    btnRunLabel = new createjs.Text("Run!", "12px Comic Sans MS", "#ffffff");
    btnRunLabel.textAlign = "center";
    btnRunLabel.textBaseline = "middle";
    btnRunLabel.x = 50/2;
    btnRunLabel.y = 20/2;
    btnRun = new createjs.Container();
    btnRun.x = 3*stageWidth/8;
    btnRun.y = 3*stageHeight/4;
    btnRun.addChild(btnRunBg, btnRunLabel);
    btnRun.addEventListener("click", function(event){
        level += 1;
        clicks = 0;
        start();
    });

    // Compile view
    WinView = new createjs.Container();
    WinView.addChild(textWin, btnRun);
    stage.addChild(WinView);
    stage.update();
}

function showLoseView() {    
    stage.removeAllChildren();
    // Lose text
    textLose = new createjs.Text("You fail...\nHe got cuddleraped by Dori.", "12px Comic Sans MS");
    textLose.textAlign = "center";
    textLose.lineWidth = 3*stageWidth/4;
    textLose.x = stageWidth/2;
    textLose.y = 0;

    // Final level text
    textFinal = new createjs.Text("Level Reached:\n"+level, "10px Comic Sans MS");
    textFinal.textAlign = "center";
    textFinal.lineWidth = 3*stageWidth/4;
    textFinal.x = stageWidth/2;
    textFinal.y = stageHeight/2;

    // Run button
    btnRunBg = new createjs.Shape();    
    btnRunBg.graphics.beginFill("Black").drawRect(0, 0, 50, 20);
    btnRunLabel = new createjs.Text("Run!", "12px Comic Sans MS", "#ffffff");
    btnRunLabel.textAlign = "center";
    btnRunLabel.textBaseline = "middle";
    btnRunLabel.x = 50/2;
    btnRunLabel.y = 20/2;
    btnRun = new createjs.Container();
    btnRun.x = 3*stageWidth/8;
    btnRun.y = 3*stageHeight/4;
    btnRun.addChild(btnRunBg, btnRunLabel);
    btnRun.addEventListener("click", function(event){
        showTitleView();
    });

    // Compile view
    LoseView = new createjs.Container();
    LoseView.addChild(textLose, textFinal, btnRun);
    stage.addChild(LoseView);
    stage.update();
}

function showGameView() {   
    // Background
    background = new createjs.Shape();
    background.graphics.beginFill("White").drawRect(0, 0, stageWidth, stageHeight);
    background.addEventListener("click", function(event){
        clicks += 1;
        checkConditions();
        updateClicks();
    });

    // Level text
    textLevel = new createjs.Text("Level: "+level, "12px Comic Sans MS");
    textLevel.lineWidth = stageWidth/2;
    textLevel.x = 0;
    textLevel.y = 0;

    // Clicks text
    textClicks = new createjs.Text("Clicks Left: "+(maxClicks-clicks), "12px Comic Sans MS");
    textClicks.lineWidth = stageWidth/2;
    textClicks.x = stageWidth/2;
    textClicks.y = 0;

    // Compile view
    GameView = new createjs.Container();
    GameView.addChild(background, textLevel, textClicks);
    stage.addChild(GameView);
    stage.update();

    // Draw characters
    drawBenji();
    drawDori();
}

function updateClicks() {
    textLevel.text = "Level: "+level;
    textClicks.text = "Clicks Left: "+(maxClicks-clicks);
    stage.update();
}

function checkConditions() {
    if (clicks >= maxClicks) {
        lose = true;
        showLoseView();
    }
}

function drawDori() {
    for(var i=0; i<level*4; i++) {
        var d = new createjs.Container();
        var img = new createjs.Bitmap(preloader.getResult("dori"));
        d.addChild(img);
        d.x = Math.floor((Math.random() * (stageWidth-25)) + 0);
        d.y = Math.floor((Math.random() * (stageHeight-80)) + 20);
        stage.addChild(d);
        stage.update(); 
    }
}

function drawBenji() {
        // Create
        var b = new createjs.Container();
        var img = new createjs.Bitmap(preloader.getResult("benji"));
        b.addChild(img);
        b.x = Math.floor((Math.random() * (stageWidth-25)) + 0);
        b.y = Math.floor((Math.random() * (stageHeight-80)) + 20);
        // Define mouse event
        b.addEventListener("click", function(event){
            showWinView();
        });
        // Define hit area
        var hit = new createjs.Shape();
        hit.graphics.beginFill("#f00").drawRect(0, 0, 22, 28);
        b.hitArea = hit;
        // Paint
        stage.addChild(b);
        stage.update();     
}

function start() {
    stage.removeAllChildren();

    clicks = 0;
    if (lose)
        level = 1;

    showGameView();
}