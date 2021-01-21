
// Register the plugin within the editor.
CKEDITOR.plugins.add( 'hopdialog', {

	// Register the icons. They must match command names.
	icons: 'maximise',

	// The plugin initialization logic goes inside this method.
	init: function( editor ) {

		// Define the editor command that inserts a timestamp.
		editor.addCommand( 'hopEditor', {

			// Define the function that will be fired when the command is executed.
			exec: function( editor ) {        
        var event = new CustomEvent('hopEditor',{detail: {
          "editor": editor
        }});

        editor.element.$.dispatchEvent(event);	
        var myself = editor.element.$;
        var other = myself.parentNode;
        //alert('Test');
        detachControlToDialog(other, 'Editor ');

			}
		});

		// Create the toolbar button that executes the above command.
		editor.ui.addButton( 'HopEditor', {
			label: 'Maximize Editor',
			command: 'hopEditor',
      toolbar: 'insert',
      icon: 'maximise'
		});
	}
});