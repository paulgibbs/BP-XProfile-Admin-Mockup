(function( $, undefined ) {

	// Show/hide profile fields when the main nav changes.
	$( '.xprofile-navigation' ).on( 'change', function() {
		var groupID = $( this ).find( 'option:selected' ).val();

		$( '.xprofile-group' ).addClass( 'hide' );
		$( '.xprofile-group[data-group-id="' + groupID + '"]' ).removeClass( 'hide' );
	} );


	// Drag and drop, within profile field groups.
	var origElement = null;


	// When the draggable element is starting to move.
	$( '.xprofile-groups' ).on( 'dragstart', '.xprofile-field', function( e ) {
		// this/e.target is the source node.

		origElement = $( this );
		e.originalEvent.dataTransfer.effectAllowed = 'move';
		e.originalEvent.dataTransfer.setData(
			'text',
			origElement.clone().wrap( '<div>' ).parent().html()  // aka innerHTML
		);
	} );

	// IE9 fix; https://goo.gl/0v2x1H
	if ( !! document.createElement( 'div' ).dragDrop ) {
		$( '.xprofile-groups' ).on( 'selectstart', '.xprofile-group', function() {
			this.dragDrop();
			return false;
		} );
	}

	$( '.xprofile-groups' ).on( 'dragover', '.xprofile-group', function( e ) {
		// this/e.target is the source node.
		e.preventDefault();

		e.originalEvent.dataTransfer.dropEffect = 'move';
		return false;
	} );

	// When dragging over a drop zone.
	$( '.xprofile-groups' ).on( 'dragenter', '.xprofile-group', function() {
		// this/e.target is the current drop zone.
		$( this ).addClass( 'dropzone' );
	} );

	// When leaving a drop zone that had been dragged over.
	$( '.xprofile-groups' ).on( 'dragleave', '.xprofile-group', function() {
		// this/e.target is the previous drop zone.

		$( this ).removeClass( 'dropzone' );
	} );

	// When an element is dropped inside a drop zone.
	$( '.xprofile-groups' ).on( 'drop', '.xprofile-group', function( e ) {
		// this/e.target is the current drop zone.

		// Stops the browser from redirecting.
		e.stopPropagation();

		var data = e.originalEvent.dataTransfer.getData( 'text' );
		$( this ).prepend( data );

		origElement.remove();
		origElement = null;

		return false;
	} );

	// Tidy up after something has been dragged and dropped.
	$( '.xprofile-groups' ).on( 'dragend', '.xprofile-group', function() {
		// this/e.target is the source node.
		$( '.xprofile-group' ).removeClass( 'dropzone' );
	} );





	$( document ).ready(function() {
	});

})( jQuery );