// - -------------------------------------------------------------------------------------------------------------- - //
var IntervalHandle = 0;

var FrameRate = 1000/30;
var WorkTime = 0;
var FPSClock = 0;
var FPSClock_Timer = 0;
var FPSClock_Draws = 0;

var FirstRun = true;
var HasInitSounds = false;

var Canvas_Scale;
// - -------------------------------------------------------------------------------------------------------------- - //


// - -------------------------------------------------------------------------------------------------------------- - //
function Main_Loop() {
	if ( FirstRun ) {
		Game_Init();
		WorkTime = new Date().getTime();
		FirstRun = false;
	}
	
	if ( soundManager.ok() && (HasInitSounds == false) ) {
		Game_InitSounds();
		WorkTime = new Date().getTime();
		HasInitSounds = true;
	}
	
	// Frame Skipping //
	var CurrentTime = new Date().getTime();
	var TimeDiff = Math.floor(CurrentTime - WorkTime);

	if ( TimeDiff > FrameRate ) {
		var FramesToDo = Math.floor( TimeDiff / FrameRate );
	
		for ( var idx = 0; idx < FramesToDo; idx++ ) {
			Game_Step();
		}
		
		Game_Draw();
		FPSClock_Draws++;
		
		WorkTime += FramesToDo * FrameRate;
		
		var WorkTimeDiff = WorkTime - (FPSClock_Timer + 1000);
		if ( WorkTimeDiff > 0 ) {
			FPSClock = FPSClock_Draws;
			FPSClock_Draws = 0;
			if ( WorkTimeDiff > 60 )
				FPSClock_Timer = WorkTime;
			else
				FPSClock_Timer += 1000;
		}
	}
}
// - -------------------------------------------------------------------------------------------------------------- - //

// - -------------------------------------------------------------------------------------------------------------- - //
function Main_ShowPaused() {
	Game_ShowPaused();
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Main_GainFocus() {
	Log( "* Gain Focus" );

	// Resume Music //
	if ( soundManager.getSoundById('BGMusic') )
		soundManager.getSoundById('BGMusic').resume();
	
	// Clear Keys (just in case) //
	Input_KeyPanic();
	
	// Reset Clock //
	WorkTime = new Date().getTime();
	
	// Restart Clock //
	if ( IntervalHandle == 0 ) {
		IntervalHandle = setInterval( Main_Loop, FrameRate );
	}
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Main_LoseFocus() {
	Log( "* Lost Focus" );

	// Stop Clock //
	clearInterval( IntervalHandle );
	IntervalHandle = 0;
	
	// Pause Music //
	if ( soundManager.getSoundById('BGMusic') )
		soundManager.getSoundById('BGMusic').pause();
	
	Main_ShowPaused();
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Main_Resize( ) {
	var Sheet = document.styleSheets[0];
	
	// FF/Chrome: cssRules[]. IE: Rules[]. //
	var Rules = Sheet.cssRules ? Sheet.cssRules : Sheet.rules;
	var CanvasRule;
	
	// Search for the rule //
	for ( var idx = 0; idx < Rules.length; idx++ ) {
		if ( Rules[idx].selectorText.toLowerCase() == "canvas" ) {
			// Rule found //
			CanvasRule = Rules[idx];
			break;
		}
	}
	
	// If a rule for canvas was found, edit it //
	if ( CanvasRule ) {
		var Canvas_AspectRatio = Canvas.width / Canvas.height;
				
		var Window_ScaleWidth = window.innerWidth;
		var Window_ScaleHeight = window.innerHeight - (6);	// size of the SoundManager2 Element //
		
		var Window_AspectRatio = Window_ScaleWidth / Window_ScaleHeight;
		
		// Scaling //
		if ( Canvas_AspectRatio < Window_AspectRatio ) {
			Canvas_Scale = Window_ScaleHeight / Canvas.height;
		}
		else {
			Canvas_Scale = Window_ScaleWidth / Canvas.width;
		}

		// Rigid Scaling (do "Floor Only" for pixel precise) //
//		Canvas_Scale *= 2;	// Double before we Floor it, so to get values like 2.5, etc //
		Canvas_Scale = Math.floor( Canvas_Scale );
//		Canvas_Scale /= 2;	// Reduce after Floor, so to get values like 2.5, etc //
		
		var TargetWidth = Canvas_Scale * Canvas.height * Canvas_AspectRatio;
		var TargetHeight = Canvas_Scale * Canvas.height;

		// Write to the style element //		
		CanvasRule.style.width = TargetWidth + "px";
		CanvasRule.style.height = TargetHeight + "px";
		CanvasRule.style.left = Math.floor((window.innerWidth - TargetWidth) / 2) + "px";
		CanvasRule.style.top = Math.floor((window.innerHeight - TargetHeight) / 2) + "px";
	}
}
// - -------------------------------------------------------------------------------------------------------------- - //

// - -------------------------------------------------------------------------------------------------------------- - //
var Input_Stick;
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_KeyInit() {
	Input_Stick = new Vector2D( 0, 0 );

	window.addEventListener( 'keydown', Input_KeyDown, true );
	window.addEventListener( 'keyup', Input_KeyUp, true );
	window.addEventListener( 'keypress', Input_KeyPress, true );
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_KeyExit() {
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_KeyPanic() {
	Log( "* Input_KeyPanic (clear)" );
	Input_Stick.x = 0;
	Input_Stick.y = 0;	
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_KeyDown( e ) {
	switch (e.keyCode) {
		case 38:  /* Up arrow was pressed */
			Input_Stick.y = -1;
			break;
		case 40:  /* Down arrow was pressed */
			Input_Stick.y = +1;
			break;
		case 37:  /* Left arrow was pressed */
			Input_Stick.x = -1;
			break;
		case 39:  /* Right arrow was pressed */
			Input_Stick.x = +1;
			break;
	};
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_KeyUp( e ) {
	switch (e.keyCode) {
		case 38:  /* Up arrow was pressed */
			if ( Input_Stick.y == -1 )
				Input_Stick.y = 0;
			break;
		case 40:  /* Down arrow was pressed */
			if ( Input_Stick.y == +1 )
				Input_Stick.y = 0;
			break;
		case 37:  /* Left arrow was pressed */
			if ( Input_Stick.x == -1 )
				Input_Stick.x = 0;
			break;
		case 39:  /* Right arrow was pressed */
			if ( Input_Stick.x == +1 )
				Input_Stick.x = 0;
			break;
	};
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_KeyPress( e ) {
	switch (e.keyCode) {
		case 8: // Backspace //
		case 9: // Tab //
		case 13: // Enter //
		case 17: // CTRL //
		case 32: // Space Bar //
			soundManager.play('Hit');
			return false;
			break;
	};
}
// - -------------------------------------------------------------------------------------------------------------- - //

// - -------------------------------------------------------------------------------------------------------------- - //
var Input_Mouse;
var Input_MouseVisible;
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_MouseInit() {
	Input_Mouse = new Vector2D(0,0);
	Input_MouseVisible = false;
	
	Canvas.onmousemove = Input_MouseMove;
	Canvas.onmouseup = Input_MouseUp;
	Canvas.onmousedown = Input_MouseDown;
	
	Canvas.onmouseover = Input_MouseOver;
	Canvas.onmouseout = Input_MouseOut;
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_MouseExit() { 
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_MouseMove( e ) {
	Input_Mouse.x = e.clientX - Canvas.offsetLeft;
	Input_Mouse.y = e.clientY - Canvas.offsetTop;
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_MouseOver( e ) {
	Input_MouseVisible = true;
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_MouseOut( e ) {
	Input_MouseVisible = false;
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_MouseUp( e ) {
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_MouseDown( e ) {
	soundManager.play('Hit');
}
// - -------------------------------------------------------------------------------------------------------------- - //

// - -------------------------------------------------------------------------------------------------------------- - //
function Input_TouchInit() {
	Input_Mouse = new Vector2D(0,0);
	Input_MouseVisible = true;//false;
	
	Canvas.ontouchmove = Input_TouchMove;
	Canvas.ontouchstart = Input_TouchStart;
	Canvas.ontouchend = Input_TouchEnd;

//	window.addEventListener("touchmove", Input_TouchMove, false);
//	window.addEventListener("touchstart", Input_TouchStart, false);
//	window.addEventListener("touchend", Input_TouchEnd, false);
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_TouchExit() { 
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_TouchMove( e ) {
	e.preventDefault();
	
	Input_Mouse.x = e.touches.item(0).clientX - Canvas.offsetLeft
	Input_Mouse.y = e.touches.item(0).clientY - Canvas.offsetTop;
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_TouchStart( e ) {
	e.preventDefault();

	Input_Mouse.x = e.touches.item(0).clientX - Canvas.offsetLeft
	Input_Mouse.y = e.touches.item(0).clientY - Canvas.offsetTop;
	
	soundManager.play('Hit');
	Log( Input_Mouse );
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_TouchEnd( e ) {
	e.preventDefault();

	Input_Mouse.x = e.touches.item(0).clientX - Canvas.offsetLeft
	Input_Mouse.y = e.touches.item(0).clientY - Canvas.offsetTop;
}
// - -------------------------------------------------------------------------------------------------------------- - //


// - -------------------------------------------------------------------------------------------------------------- - //
function load() {
	// If no console (Internet Explorer w/o F12 debugging open), make one //
	if ( typeof console === "undefined" || typeof console.log === "undefined" ) {
		console = {};
		console.log = function() { };
	}
	
	/* ***** */
	
	Log( " - ----- GelHTML Initialized ----- -" );
	gelGraphicsInit();

	// Touch or Mouse //
	if ( 'createTouch' in document )
		Input_TouchInit();
	else
		Input_MouseInit();
	Input_KeyInit();

	onblur = Main_LoseFocus;
	onfocus = Main_GainFocus;
	onresize = Main_Resize;	
	
	Main_Resize();

	WorkTime = new Date().getTime();
		
	// Lock to 30fps //
	IntervalHandle = setInterval( Main_Loop, FrameRate );
}
// - -------------------------------------------------------------------------------------------------------------- - //
