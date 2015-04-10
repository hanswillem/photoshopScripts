/*
Saves the current Photoshopfile as a low res jpg,
then imports the saved file and places it in a new layer with its blendmode set to difference.
Then it merges all visible layers and applies some levelling.
This process is then repeated once more.
*/

// stating the obvious, but change this path to match your machine
var myFile = '~/Documents/Photoshop Difference Script/lowResJPEG.jpg';

for (var i=0; i<2; i++) {
    // save the lowres jpeg
    function saveJPEG(doc, saveFile, qty) {
         var saveOptions = new JPEGSaveOptions();
         saveOptions.embedColorProfile = true;
         saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
         saveOptions.matte = MatteType.NONE;
         saveOptions.quality = qty;
         doc.saveAs(saveFile, saveOptions, true);
    }
    saveJPEG( app.activeDocument, new File(myFile), 0);

    // open the lowres jpeg, place it into new layer and set blendmode to difference
    app.load(new File(myFile));
    backFile = app.activeDocument;
    backFile.selection.selectAll();
    backFile.selection.copy();
    backFile.close(SaveOptions.DONOTSAVECHANGES);
    app.activeDocument.paste();
    app.activeDocument.layers[0].name = "Difference";
    app.activeDocument.layers[0].blendMode = BlendMode.DIFFERENCE;
    app.activeDocument.mergeVisibleLayers();

    // apply levels
    app.activeDocument.layers[0].adjustLevels(0, 45, 1, 0, 255)
}
