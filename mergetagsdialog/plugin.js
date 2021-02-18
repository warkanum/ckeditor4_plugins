
// Register the plugin within the editor.
CKEDITOR.plugins.add( 'mergetagsdialog', {

	// Register the icons. They must match command names.
	icons: 'mergetags',

	// The plugin initialization logic goes inside this method.
	init: function( editor ) {

		editor.addCommand( 'mergeTagDialog', new CKEDITOR.dialogCommand( 'mergeTagDialog' ) );

		/*editor.addCommand( 'mergetagsDialog', {

			exec: function( editor ) {        
        var event = new CustomEvent('open-merge-dialog',{detail: {
          "editor": editor
        }});

        new CKEDITOR.dialogCommand( 'abbrDialog' );

			}
		});
		*/

		// Create the toolbar button that executes the above command.
		editor.ui.addButton( 'MergeTagButton', {
			label: 'Insert Merge Tags',
			command: 'mergeTagDialog',
      toolbar: 'insert',
      icon: 'mergetags'
		});

		CKEDITOR.dialog.add( 'mergeTagDialog', function( editor ) {
			return {
					title: 'Merge Tags',
					minWidth: 800,
					minHeight: 500,
					resizable:      CKEDITOR.DIALOG_RESIZE_BOTH,
	
					contents: [
							{
									id: 'tab-merge',
									label: 'Merge Tags',
									accessKey: "M",
									elements: [
										{
											id: 'mergetagselected',
											type: 'text',
											label: 'MergeTag',
											width: '100%',
											height: '64px',
							
										},
										{
											id: 'mergetagdiv',
											type: 'html',
											html: '<div id="mergetagdiv" class="mergetagdiv">  </div>',
											width: '100%',
											height: 'calc(100% - 64px)',
										}
										
									]
							}
					],
					onShow: function() {
						var dialog = this;
						var dlgdoc = dialog.getElement().getDocument();
						var mergediv = dlgdoc.getById("mergetagdiv");
						//var mergetagselected = dlgdoc.getById("mergetagselected");
						console.log("Show Dialog",editor.id,mergediv, window.ck_mergetagdialog );
						var result = {};

						if (window.ck_mergetagdialog && typeof window.ck_mergetagdialog[editor.id] == "function") {
							result = window.ck_mergetagdialog[editor.id]();													
						} else if (window.ck_mergetagdialog && typeof window.ck_mergetagdialog[editor.id] == "object") {
							result = window.ck_mergetagdialog[editor.id];																						
						} else if (typeof dialog.mergetagdialog == "object") {
							result = dialog.mergetagdialog;
						}

						if (result.html) {
							mergediv.$.innerHTML = result.html;
						}
						//if (result.selectedhtml) {
						//	mergetagselected.$.innerHTML = result.selectedhtml;
						//}	
						if (typeof result.callback == "function") {
							result.callback(editor, mergediv.$, mergetagselected.$);
						}
					},
					onOk: function() {
            var dialog = this;
						var dlgdoc = dialog.getElement().getDocument();

            //
						
						var mergetagselected = dlgdoc.getById("mergetagselected");

						var tagspan = editor.document.createElement( 'span' );
						tagspan.$.innerHTML = mergetagselected.getText();
						tagspan.setAttribute("title", "Mergetag " + mergetagselected.getText());

            editor.insertElement( tagspan );
       	  }

			};
	});
	
	
		
	}
});