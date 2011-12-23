// - -------------------------------------------------------------------------------------------------------------- - //
var DebugElement = new cDebugElements;
// - -------------------------------------------------------------------------------------------------------------- - //

// - -------------------------------------------------------------------------------------------------------------- - //
function cGame() {
	Log( " - ----- Game Initialized ----- -" );

/*
	this.Art = new cTileSheet( "Content/GameArt.png", 8, 8 );
*/
	
	this.PlayerPos = new Vector2D( 120, 70 );
}
// - -------------------------------------------------------------------------------------------------------------- - //
cGame.prototype.Init = function() {
	// Code called upon the first run (not construction) //
}
// - -------------------------------------------------------------------------------------------------------------- - //
cGame.prototype.InitSounds = function() {
	Log("+ Loading Sounds...");

/*	
	sndLoad( 'Hit', 'HammerHit' );
	sndLoadAndPlay( 'BGMusic', '../Music' );
*/

	Log("- Done Loading Sounds.", 'info');
}
// - -------------------------------------------------------------------------------------------------------------- - //
cGame.prototype.Exit = function() {
}
// - -------------------------------------------------------------------------------------------------------------- - //

// - -------------------------------------------------------------------------------------------------------------- - //
cGame.prototype.Step = function() {
	DebugElement.Step(); // Step at the top of the frame, so to release elements that expire //

	// ***** //
	
	var Stick = new Vector2D( Input_Stick.x, Input_Stick.y );
	
	this.PlayerPos = Add(this.PlayerPos, Stick);
}
// - -------------------------------------------------------------------------------------------------------------- - //

// - -------------------------------------------------------------------------------------------------------------- - //
cGame.prototype.Draw = function() {
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
		Art.DrawCentered( 0, this.PlayerPos.x, this.PlayerPos.y );
	}
*/

	// Player (cursor keys) //
	gelSetColor( 255, 255, 0 );
	gelDrawDiamond( this.PlayerPos.x, this.PlayerPos.y, 6 );


	if ( Input_KeyBits & KEY_ACTION ) {
		gelSetColor( 0, 255, 0 );
		gelDrawX( this.PlayerPos.x, this.PlayerPos.y, 12 );
	}

	// Draw Debug Elements //
	DebugElement.Draw();

	// Mouse Cursor //
	if ( Input_Mouse.Visible ) {
		if ( Input_MouseBits & MOUSE_LMB )
			gelSetColor( 0, 255, 0 );
		else
			gelSetColor( 255, 0, 255 );
		gelDrawCircleFill( Math.floor(Input_Mouse.x), Math.floor(Input_Mouse.y), 4 );
	}
	
	// ***** //
	
	this.DrawFPS();
}
// - -------------------------------------------------------------------------------------------------------------- - //

// - -------------------------------------------------------------------------------------------------------------- - //
cGame.prototype.ShowPaused = function() {
	ctx.fillStyle = "rgb(255,0,0)";
	ctx.font = "32pt Arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText( "*PAUSED*", Canvas.width / 2, Canvas.height / 2 );
}
// - -------------------------------------------------------------------------------------------------------------- - //
cGame.prototype.DrawFPS = function() {
	if ( isMobile() )
		ctx.fillStyle = "rgb(255,0,255)";
	else
		ctx.fillStyle = "rgb(255,255,0)";
	ctx.font = "12pt Arial";
	ctx.textAlign = "right";
	ctx.textBaseline = "top";
	ctx.fillText( FPSClock, Canvas.width - 1, 1 );
}
// - -------------------------------------------------------------------------------------------------------------- - //
