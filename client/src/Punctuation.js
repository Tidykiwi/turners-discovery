
function removePunctuation(inputString) {
    
    let outputString = inputString.replace(/\W/g, ' ');
    return outputString;
}

module.exports = removePunctuation;