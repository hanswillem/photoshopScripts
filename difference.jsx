/*
Saves the current Photoshop file as a low res jpg,
then imports the saved file and places it in a new layer with its blendmode set to difference.
Then it merges all visible layers and applies some levelling.
The user is being prompted how many times this should be performed.
*/

// stating the obvious, but change this path to match your machine
var myFile = '~/Desktop/lowResJPEG.jpg';

// suspend history so there is a single undo for the entire script
app.activeDocument.suspendHistory("Difference", "main()");

function main () {
    // merge all layers when there is more than 1 layer
    if (app.activeDocument.layers.length > 1) {
        app.activeDocument.mergeVisibleLayers();
    }

    // function to save as JPEG
    function saveJPEG(doc, saveFile, qty) {
             var saveOptions = new JPEGSaveOptions();
             saveOptions.embedColorProfile = true;
             saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
             saveOptions.matte = MatteType.NONE;
             saveOptions.quality = qty;
             doc.saveAs(saveFile, saveOptions, true);
        }

    // prompt the user
    var count = prompt('How many itterations?', '2');

    for (var i=0; i<count; i++) {
        // save the lowres jpeg
        saveJPEG( app.activeDocument, new File(myFile), 0);

        // open the lowres jpeg, place it into new layer and set its blendmode to difference
        app.load(new File(myFile));
        backFile = app.activeDocument;
        backFile.selection.selectAll();
        backFile.selection.copy();
        backFile.close(SaveOptions.DONOTSAVECHANGES);
        app.activeDocument.paste();
        app.activeDocument.layers[0].blendMode = BlendMode.DIFFERENCE;
        app.activeDocument.mergeVisibleLayers();
        app.activeDocument.layers[0].name = "Difference";

        // apply levels
        app.activeDocument.layers[0].adjustLevels(0, 45, 1, 0, 255);
    }
}
