var aDoc = app.activeDocument;
var docPages = aDoc.pages;

for (p = 0; p < docPages.length; p++) {

	var myPageItems = docPages[p].allPageItems
	var myPageName = docPages[p].name;

	for (i = 0; i < myPageItems.length; i++) {

		//set selection as variable
		var thisItem = myPageItems[i];
		if (thisItem instanceof Rectangle || thisItem instanceof Polygon || thisItem instanceof Oval) {

			//get image within the frame
			var myLinkedItem = thisItem.pageItems[0];
			//get name of the linked image
			var myLinkName = myLinkedItem.itemLink.name;

			//strip extension from linked image name
			var myLinkName = myLinkName.split(".")[0];

			app.jpegExportPreferences.jpegQuality = JPEGOptionsQuality.maximum; // low medium high maximum
			app.jpegExportPreferences.exportResolution = 300;
			app.jpegExportPreferences.jpegExportRange = ExportRangeOrAllPages.exportRange;
			app.jpegExportPreferences.pageString = myPageName;

			//Set Name of exported pdf to match the name of the linked image
			var myFile = File("/Users/admin/Desktop/" + myLinkName + ".jpg");

			//export the pdf
			aDoc.exportFile(ExportFormat.JPG, myFile, false);
		}
	}
}