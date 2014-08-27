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

	//$( '.xprofile-groups' ).on( 'click', '.change-button', function() {
	//} );


	/**
	 * Strip HTML from contenteditable=true elements on copy/paste.
	 */
	$( '.xprofile-groups' ).on( 'paste', 'header,p', function( e ) {
		var clipboard, newRange, origPosition, range, selection,
			field         = $( e.target ),
			targetElement = e.target;

		e.preventDefault();

		if ( e.originalEvent.clipboardData ) {
			clipboard = e.originalEvent.clipboardData.getData( 'text/plain' );
		} else {  // IE 9
			clipboard = window.clipboardData.getData( 'Text' );
		}

		// Get the caret position.
		selection    = window.getSelection ? window.getSelection() : document.selection;
		range        = selection.getRangeAt ? selection.getRangeAt( 0 ) : selection.createRange();
		origPosition = range.startOffset;

		field.text(
			field.text().substring( 0, range.startOffset ) +
			clipboard +
			field.text().substring( range.endOffset, field.text().length )
		);

		// If the DOM node has multiple children, grab the first.
		if ( e.target.childNodes.length > 0 ) {
			targetElement = e.target.childNodes[0];
		}

		// Move the caret to the end of the text that we just inserted.
		if ( window.getSelection ) {
			newRange = document.createRange();
			newRange.setStart( targetElement, origPosition + clipboard.length );
			newRange.setEnd( targetElement, origPosition + clipboard.length );

			if ( selection.rangeCount > 0 ) {
				selection.removeAllRanges();
			}
			selection.addRange( newRange );

		} else {  // IE 9
			newRange = document.selection.createRange();
			newRange.moveToElementText( e.target );
			newRange.setStart( targetElement, origPosition + clipboard.length );
			newRange.setEnd( targetElement, origPosition + clipboard.length );
			newRange.select();
		}
	} );


	/**
	 * Strip HTML from contenteditable=true elements on drag/drop.
	 */
	$( '.xprofile-groups' ).on( 'drop', 'header,p', function( e ) {
		var clipboard,
			field = $( e.target );

		e.preventDefault();

		if ( e.originalEvent.dataTransfer ) {
			clipboard = e.originalEvent.dataTransfer.getData( 'text/plain' );
		} else {  // IE 9
			clipboard = window.event.dataTransfer.getData( 'Text' );
		}

		field.text( field.text() + clipboard );
	} );


	$( document ).ready(function() {
	});

})( jQuery );

/*
Credits:
---

https://github.com/samshelley/contentEditable/blob/master/contentEditable.js
*/