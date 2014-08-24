(function( $, undefined ) {

	$( document ).ready(function() {
		// Show/hide profile fields when the main nav changes.
		$( '.xprofile-navigation' ).on( 'change', function() {
			var groupID = $( this ).find( 'option:selected' ).val();

			$( '.xprofile-group' ).addClass( 'hide' );
			$( '.xprofile-group[data-group-id="' + groupID + '"]' ).removeClass( 'hide' );
		} );
	});

})( jQuery );