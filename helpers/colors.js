/**
 * Colour is Light, for deciding font color
 * @param hex
 * @returns {boolean}
 */
function colourIsLight(hex){

    const rgb = hexToRgb(hex);

    // Counting the perceptive luminance
    // human eye favors green color...
    let a = 1 - (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return (a < 0.5);
}

/**
 * hex to rgb
 * @param hex
 * @returns {*}
 */
function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}


module.exports = {
  hexToRgb: hexToRgb,
  colourIsLight: colourIsLight
}