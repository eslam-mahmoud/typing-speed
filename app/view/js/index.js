//all the alphabet as array
var chars = 'abcdefghijklmnopqrstuvwxyz'.split('');
//the Unix time stamp like but in milliseconds when the char was created
//used in caclulation of how long the user take to get the correct match
var creation_time = 0;
//all success matching times in milliseconds
var matching_times_array = [];
//the char element in the html
let char_element;

//return random char form the alphabet
function getRandomChar() {
    let index = Math.floor((Math.random() * 100) %  chars.length);
    return chars[index];
}

//update the chnar in the html element and set the creation time in milliseconds
function updateChar() {
    let char = getRandomChar();
    char_element.innerHTML = char.toUpperCase();
    creation_time = new Date().getTime();
}

//updaate char on loading the app
//can not use document.onload
window.onload = function(e) {
    char_element = document.querySelector('#char');
    updateChar();
}

//match the clicked key in keyboard with the char in the html
function match(keydownKey) {
    //if match update the time array
    //send new char to the html
    if (keydownKey == char_element.innerHTML) {
        console.log('success');
        let time = new Date().getTime() - creation_time;
        matching_times_array.push(time);
        console.log(time);
        updateChar();
    } else {
        console.log('error');
    }
}

//listen fro all key strocks on the app
window.addEventListener('keydown', function (e) {
    match(e.key.toUpperCase());
});
