(function( $, undefined ) {

	// Show/hide profile fields when the main nav changes.
	$( '.xprofile-navigation' ).on( 'change', function() {
		var groupID = $( this ).find( 'option:selected' ).val();

		$( '.xprofile-group' ).addClass( 'hide' );
		$( '.xprofile-group[data-group-id="' + groupID + '"]' ).removeClass( 'hide' );
	} );


	/**
	 * Drag and drop within profile field groups.
	 */
	$( '.xprofile-group' ).sortable({
		forcePlaceholderSize: true,
		handle:               '.change-button'
	});


	$( document ).ready(function() {
	});

})( jQuery );