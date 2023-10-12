let passValue = document.querySelector(".password");
let passLen =  document.querySelector(".password-length");
let sliderVal = document.querySelector(".slider");

let upper = document.querySelector("#uppercase");
let lower = document.querySelector("#lowercase");
let number = document.querySelector("#numbers");
let symbol = document.querySelector("#symbols");

let strength = document.querySelector(".strength-indicator");

let copybtn = document.querySelector(".copy-btn");

let symbolsString = '~!@#$%^&*()_-+=:;\',<.>/?|"';

let newPassword='';

upper.checked =true;
let checkCount =1;
handleSlider();
function handleSlider(){
    passLen.innerText = sliderVal.value;
    let length = sliderVal.value;
    const min = sliderVal.min;
    const max = sliderVal.max;
    sliderVal.style.backgroundSize = ((length-min)*100) / (max-min) + "% 100%";

}

sliderVal.addEventListener('input',handleSlider);

function displayPassword(value){
    passValue.innerText = value;
    passValue.style.color = "yellow";
}

function countCheckedBox(){
    checkCount =0;
    if(upper.checked==true){
        checkCount++;
    }
    if(lower.checked==true){
        checkCount++;
    }
    if(number.checked==true){
        checkCount++;
    }
    if(symbol.checked==true){
        checkCount++;
    }
    if(checkCount > sliderVal.value){
        sliderVal.value = checkCount;
        handleSlider();
    }
}

upper.addEventListener('input',countCheckedBox);
lower.addEventListener('input',countCheckedBox);
number.addEventListener('input',countCheckedBox);
symbol.addEventListener('input',countCheckedBox);

function randomInteger(min,max){
    return Math.floor(Math.random()*(max-min)) + min;
}

function randomNumber(){
    return randomInteger(0,10);
}

function randomUpper(){
    return String.fromCharCode(randomInteger(65,91));
}

function randomLower(){
    return String.fromCharCode(randomInteger(97,123));
}

function randomSymbol(){
    return symbolsString.charAt(randomInteger(0,symbolsString.length));
}

let allFunctions = [];

function generatePassword(){
    newPassword='';
    allFunctions = [];
    if(checkCount>sliderVal.value){
        sliderVal.value = checkCount;
        handleSlider();
    }
    let i=0;
    if(upper.checked==true){
        newPassword += randomUpper();
        allFunctions[i++] = randomUpper;
    }
    if(lower.checked){
        newPassword += randomLower();
        allFunctions[i++] = randomLower;
    }
    if(number.checked){
        newPassword += randomNumber();
        allFunctions[i++] = randomNumber;
    }
    if(symbol.checked){
        newPassword += randomSymbol();
        allFunctions[i++] = randomSymbol;
    }
    console.log(newPassword);
    for(let i=0; i<sliderVal.value - checkCount; i++){
        newPassword += allFunctions[randomInteger(0,allFunctions.length)]();
    }
    newPassword = randomize(newPassword);
    displayPassword(newPassword);
    strengthIndicator();
    copybtn.classList.add('accept');
}

function randomize(val){
    let value = val.split('');
    for(let i=0; i<value.length; i++){
        let num = randomInteger(0,value.length);
        let temp = value[i];
        value[i] = value[num];
        value[num] = temp;
    }
    return value.join('');
}

function strengthIndicator(){
    let passwordLen = sliderVal.value; 
    removeAllStrength();
    if(checkCount>=3){
        if(passwordLen>=8){
            strength.classList.add('strong-password');
        }
        else if(passwordLen>=6){
            strength.classList.add('medium-password');
        }
        else{
            strength.classList.add('weak-password');
        }
    }
    else if(checkCount===2){
        if(passwordLen >= 6){
            strength.classList.add('medium-password');
        }
        else{
            strength.classList.add('weak-password');
        }
    }
    else{
        strength.classList.add('weak-password');
    }
}

function removeAllStrength(){
    if(strength.classList.contains('strong-password')){
        strength.classList.remove('strong-password');
    }
    if(strength.classList.contains('medium-password')){
        strength.classList.remove('medium-password');
    }
    if(strength.classList.contains('weak-password')){
        strength.classList.remove('weak-password');
    }
}
let copyText = document.querySelector(".copy-txt"); 
function copyPassword(){
    if(copybtn.classList.contains('accept')==false){
        return;
    }
    navigator.clipboard.writeText(passValue.innerText);
    copyText.classList.add('active');
    setTimeout(removeCopy,2000);
}

function removeCopy(){
    copyText.classList.remove('active');
}


