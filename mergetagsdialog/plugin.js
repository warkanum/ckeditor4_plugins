
// Register the plugin within the editor.
CKEDITOR.plugins.add( 'mergetagsdialog', {
	requires: 'widget',
	// Register the icons. They must match command names.
	icons: 'mergetags',

	// The plugin initialization logic goes inside this method.
	init: function( editor ) {
		var pluginDirectory = this.path;
    editor.addContentsCss( pluginDirectory + 'styles/contents.css' );

		editor.addCommand( 'mergeTagDialog', new CKEDITOR.dialogCommand( 'mergeTagDialog' ) );

		editor.addCommand( 'mergeTagCustom', {

			exec: function( editor ) {        
        var event = new CustomEvent('mergeTagCustom',{detail: {
          "editor": editor
        }});

        var myself = editor.element.$;
				myself.dispatchEvent(event);	
			}
		});

		// Create the toolbar button that executes the above command.
		editor.ui.addButton( 'MergeTagButton', {
			label: 'Insert Merge Tags',
			command: 'mergeTagDialog',
      toolbar: 'insert',
      icon: 'mergetags'
		});

		// Create the toolbar button that executes the above command.
		editor.ui.addButton( 'CustomMergeTagButton', {
			label: 'Insert Merge Tags',
			command: 'mergeTagCustom',
      toolbar: 'insert',
      icon: 'mergetags'
		});

		CKEDITOR.dialog.add( 'mergeTagDialog', function( editor ) {
			return {
					title: 'Insert Merge Tags',
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
					onLoad: function () {
						this.getElement().removeClass('cke_reset_all');
					},
					onShow: function() {
						var dialog = this;
						var dlgdoc = dialog.getElement().getDocument();
						var mergediv = dlgdoc.getById("mergetagdiv");
						var mergetagElem = dialog.getContentElement('tab-merge',"mergetagselected");
						var okBtn = dialog.getButton('ok');
						//console.log("Show Dialog",editor.id, mergetagElem );

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
						if (result.object) {
							mergediv.$.appendChild(result.object);
						}
						//if (result.selectedhtml) {
						//	mergetagselected.$.innerHTML = result.selectedhtml;
						//}	
						if (typeof result.callback == "function") {
							result.callback(dialog, mergediv.$, mergetagElem.getInputElement().$, okBtn);
						}
					},
					onOk: function() {
            var dialog = this;
						var dlgdoc = dialog.getElement().getDocument();

						//var mergetagselected = dlgdoc.getById("mergetagselected");

						var tagspan = editor.document.createElement( 'span' );
						tagspan.$.innerHTML = dialog.getValueOf('tab-merge','mergetagselected');
						tagspan.setAttribute("title", "Merge Tag: " + tagspan.$.innerHTML);

            editor.insertElement( tagspan );
       	  }

			};
	});
	
	
		
	}
});