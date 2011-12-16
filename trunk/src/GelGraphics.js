// - -------------------------------------------------------------------------------------------------------------- - //
var Canvas, ctx;
// - -------------------------------------------------------------------------------------------------------------- - //

// - -------------------------------------------------------------------------------------------------------------- - //
function gelGraphicsInit() {
	Canvas = document.getElementById("cv");
	ctx = Canvas.getContext("2d");
	
	Log( "Original Canvas Size: " + Canvas.width + ", " + Canvas.height );
}
// - -------------------------------------------------------------------------------------------------------------- - //
function gelGraphicsExit() {	
}
// - -------------------------------------------------------------------------------------------------------------- - //


// - -------------------------------------------------------------------------------------------------------------- - //
function gelCenterImage( img, x, y ) {
	ctx.drawImage( img, x-(img.width >> 1), y-(img.height >> 1) );
}
// - -------------------------------------------------------------------------------------------------------------- - //
function gelCenterImage( img, x, y, scale_x, scale_y ) {
	ctx.drawImage( img, x-((img.width * scale_x) >> 1), y-((img.height * scale_y) >> 1), img.width * scale_x, img.height * scale_y );
}
// - -------------------------------------------------------------------------------------------------------------- - //

// - -------------------------------------------------------------------------------------------------------------- - //
function gelSetColor( r, g, b, a ) {
	if ( typeof a === 'undefined' ) {
		ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
		ctx.strokeStyle = ctx.fillStyle;
	}
	else {
		ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
		ctx.strokeStyle = ctx.fillStyle;
	}
}
// - -------------------------------------------------------------------------------------------------------------- - //

// - -------------------------------------------------------------------------------------------------------------- - //
function gelDrawRectFill( x, y, w, h ) {
	ctx.fillRect( x, y, w, h );
}
//	ctx.beginPath();
//	ctx.rect( x, y, w, h );
//	ctx.closePath();
//	ctx.fill();	
//}
// - -------------------------------------------------------------------------------------------------------------- - //
function gelDrawRect( x, y, w, h ) {
	strokeRect( x, y, w, h );
}
//	ctx.beginPath();
//	ctx.rect( x, y, w, h );
//	ctx.closePath();
//	ctx.stroke();
//}
// - -------------------------------------------------------------------------------------------------------------- - //
function gelClearRect( x, y, w, h ) {
	clearRect( x, y, w, h );
}
// - -------------------------------------------------------------------------------------------------------------- - //

// - -------------------------------------------------------------------------------------------------------------- - //
function gelDrawCircleFill( x, y, Radius ) {
	ctx.beginPath();
	ctx.arc( x, y, Radius, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fill();	
}
// - -------------------------------------------------------------------------------------------------------------- - //
function gelDrawCircle( x, y, Radius ) {
	ctx.beginPath();
	ctx.arc( x, y, Radius, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.stroke();
}
// - -------------------------------------------------------------------------------------------------------------- - //
function gelDrawSquareFill( x, y, Radius ) {
	ctx.fillRect( x-Radius, y-Radius, Radius+Radius, Radius+Radius );
}
// - -------------------------------------------------------------------------------------------------------------- - //
function gelDrawSquare( x, y, Radius ) {
	ctx.strokeRect( x-Radius, y-Radius, Radius+Radius, Radius+Radius );
}
// - -------------------------------------------------------------------------------------------------------------- - //
function gelDrawDiamondFill( x, y, Radius ) {
	ctx.beginPath();
	ctx.moveTo( x-Radius, y );

	ctx.lineTo( x, y-Radius );
	ctx.lineTo( x+Radius, y );
	ctx.lineTo( x, y+Radius );
	ctx.lineTo( x-Radius, y );
	
	ctx.closePath();
	ctx.fill();	
}
// - -------------------------------------------------------------------------------------------------------------- - //
function gelDrawDiamond( x, y, Radius ) {
	ctx.beginPath();
	ctx.moveTo( x-Radius, y );

	ctx.lineTo( x, y-Radius );
	ctx.lineTo( x+Radius, y );
	ctx.lineTo( x, y+Radius );
	ctx.lineTo( x-Radius, y );

	ctx.closePath();
	ctx.stroke();
}
// - -------------------------------------------------------------------------------------------------------------- - //
function gelDrawCross( x, y, Radius ) {
	ctx.beginPath();

	ctx.moveTo( x-Radius, y );
	ctx.lineTo( x+Radius, y );

	ctx.moveTo( x, y-Radius );
	ctx.lineTo( x, y+Radius );

	ctx.closePath();
	ctx.stroke();
}
// - -------------------------------------------------------------------------------------------------------------- - //
function gelDrawX( x, y, Radius ) {
	ctx.beginPath();

	ctx.moveTo( x-Radius, y-Radius );
	ctx.lineTo( x+Radius, y+Radius );

	ctx.moveTo( x+Radius, y-Radius );
	ctx.lineTo( x-Radius, y+Radius );

	ctx.closePath();
	ctx.stroke();
}
// - -------------------------------------------------------------------------------------------------------------- - //
