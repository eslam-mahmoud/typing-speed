//all the alphabet as array
var chars = 'abcdefghijklmnopqrstuvwxyz'.split('');
//the Unix time stamp like but in milliseconds when the char was created
//used in caclulation of how long the user take to get the correct match
var creation_time = 0;
//all success matching times in milliseconds
var matching_times_array = [];
//the char element in the html
let char_element;
let success_element;
let error_element;
let avrage_element;
//count of success and errors
let success_count = 0;
let error_count = 0;
//last random char, to avoid display same chat two times
let last_char = 0;

//return random char form the alphabet
function getRandomChar() {
    let index = Math.floor((Math.random() * 100) %  chars.length);
    return chars[index];
}

//get ِِavrage time
function getAvrageTime() {
    var sum = matching_times_array.reduce((a, b) => a + b, 0);
    return Math.round(sum/1000/matching_times_array.length);
}

//updaate char on loading the app
//can not use document.onload
window.onload = function(e) {
    char_element = document.querySelector('#char');
    avrage_element = document.querySelector('#avrageTime');
    success_element = document.querySelector('#success');
    error_element = document.querySelector('#error');
    updateChar();
}

//match the clicked key in keyboard with the char in the html
function match(keydownKey) {
    //if match update the time array
    //send new char to the html
    //Update html elements
    if (keydownKey == char_element.innerHTML) {
        success_count++;
        let time = new Date().getTime() - creation_time;
        matching_times_array.push(time);
        updateAvrageTime();
        updateChar();
    } else {
        error_count++;
    }
    updateCounts();
}

function updateCounts() {
    success_element.innerHTML = success_count;
    error_element.innerHTML = error_count;
}

function updateAvrageTime() {
    avrage_element.innerHTML = getAvrageTime();
}

//update the chnar in the html element and set the creation time in milliseconds
function updateChar() {
    let char = getRandomChar();
    while (char == last_char) {
        char = getRandomChar();
    }
    last_char = char;
    char_element.innerHTML = char.toUpperCase();
    creation_time = new Date().getTime();
}

//listen fro all key strocks on the app
window.addEventListener('keydown', function (e) {
    match(e.key.toUpperCase());
});
