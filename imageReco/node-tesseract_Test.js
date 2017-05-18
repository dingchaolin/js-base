var tesseract = require("tesseract")
    , tess = new tesseract.BaseApi()
    , pix;

// set language
tess.init("eng");
// set image
tess.setImage("jbxx.png");
// run recognition
tess.recognize();
// get recognized text
console.log(tess.getText());

// clear results
tess.clear();

// create Pix object (wrapper for Leptonica PIX structure)
pix = new tesseract.Pix("other-image.png");
// Pix can be used in BaseApi::SetImage() too
tess.setImage(pix);
// again recognize and get text
tess.recognize();
console.log(tess.getText());

// finish him! - free memory of underlying TessBaseAPI object
tess.end();
