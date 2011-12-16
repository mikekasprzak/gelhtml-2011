// - -------------------------------------------------------------------------------------------------------------- - //
var Art;
// - -------------------------------------------------------------------------------------------------------------- - //
var Tick;
// - -------------------------------------------------------------------------------------------------------------- - //
var PlayerPos;
// - -------------------------------------------------------------------------------------------------------------- - //

// - -------------------------------------------------------------------------------------------------------------- - //
function Game_Init() {
	Log( " - ----- Game Initialized ----- -" );
	
	Tick = 0;

/*
	Art = new cTileSheet( "Content/GameArt.png", 8, 8 );
*/
	
	PlayerPos = new Vector2D( 120, 70 );
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Game_InitSounds() {
	Log("+ Loading Sounds...");

/*	
	soundManager.createSound({
		id: 'BGMusic',
		url: 'Content/Music.mp3',
		autoLoad: true,
		autoPlay: true,
		volume: 50
	});
	
	soundManager.createSound({
		id:'Hit',
//		multiShotEvents: true,
		autoLoad: true,
		autoPlay: false,
		url:'Content/Sound/HammerHit.wav',
		volume: 50
	});
*/

	Log("- Done Loading Sounds.", 'info');
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Game_Exit() {
}
// - -------------------------------------------------------------------------------------------------------------- - //

// - -------------------------------------------------------------------------------------------------------------- - //
function Game_Step() {
	Tick++;
	
	var Stick = new Vector2D( Input_Stick.x, Input_Stick.y );
	
	PlayerPos = Add(PlayerPos, Stick);
}
// - -------------------------------------------------------------------------------------------------------------- - //

// - -------------------------------------------------------------------------------------------------------------- - //
function Game_Draw() {
	// Clear to background Color //
//	gelDrawRectClear( 0, 0, Canvas.width, Canvas.height );
	// Clear to Color //
	gelSetColor( 0, 0, 0 );
	gelDrawRectFill( 0, 0, Canvas.width, Canvas.height );

	// ***** //
	
	// Towlr //
	gelSetColor( 128, 128, 128 );
	gelDrawCross( Canvas.width >> 1, Canvas.height >> 1, 5 );
	
/*
	if ( Art.Data.complete ) {
		Art.DrawCentered( 0, PlayerPos.x, PlayerPos.y );
	}
*/

	// Player (cursor keys) //
	gelSetColor( 255, 255, 0 );
	gelDrawDiamond( PlayerPos.x, PlayerPos.y, 6 );

	// Mouse Cursor //
	if ( Input_MouseVisible ) {
		gelSetColor( 255, 0, 255 );
		gelDrawCircleFill( Math.floor(Input_Mouse.x / Canvas_Scale), Math.floor(Input_Mouse.y / Canvas_Scale), 4 );
	}
	
	// ***** //
	
	Game_DrawFPS();
}
// - -------------------------------------------------------------------------------------------------------------- - //

// - -------------------------------------------------------------------------------------------------------------- - //
function Game_ShowPaused() {
	ctx.fillStyle = "rgb(255,0,0)";
	ctx.font = "32pt Arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText( "*PAUSED*", Canvas.width / 2, Canvas.height / 2 );
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Game_DrawFPS() {
	// Change color if running on a phone or tablet //
	if ( 'createTouch' in document )
		ctx.fillStyle = "rgb(255,0,255)";
	else
		ctx.fillStyle = "rgb(255,255,0)";
	
	ctx.font = "12pt Arial";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText( FPSClock, 1, 1 );
}
// - -------------------------------------------------------------------------------------------------------------- - //

