const inputSlider = document.querySelector("[lengthSlider]");
const length =document.querySelector("[dataLengthNo]");
const display = document.querySelector("[datapassword]");
const copyMsg = document.querySelector("[dataCopyMsg]");
const copyBut = document.querySelector("[copy-button]");
const uppercheck = document.querySelector("#upper");
const lowercheck = document.querySelector("#lower");
const numbercheck = document.querySelector("#number");
const symbolcheck = document.querySelector("#symbol");
const indi = document.querySelector("[indicator]");
const genButton = document.querySelector(".generator-button");
const allCheck = document.querySelectorAll("input[type=checkbox]");
const symbol = '!@`~#$%^&*()-_=+|\}[:<>?/*';


let password = "";
let passwordlen = 10;
let check = 0;
//set lemgth 
handleSlider();
indicator("#ccc");

// set password length 
function handleSlider(){
    inputSlider.value = passwordlen;
    length.innerText = passwordlen;
    console.log("slider ka kaam shuru");

    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordlen - min)*100/(max - min)) + "% 100%";
    console.log("slider ka kaam lhtm");
}




function indicator(color){
    indi.style.backgroundColor = color;
    indi.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRanInt(min, max){
    return  Math.floor(Math.random()* (max-min)) +min;

}

function getRanNum(){
    return getRanInt(0, 9);
}

function getLowCase(){
    return String.fromCharCode(getRanInt(97,123));
}

function getUperCase(){
    return String.fromCharCode(getRanInt(65,91));
}

function getSymbol(){
    const ran = getRanInt(0,symbol.length);
    return symbol.charAt(ran);
}

function calStrength(){
    let uper  = false;
    let lower =false;
    let sym = false;
    let num = false;

    if(uppercheck.checked) uper =true;
    if(lowercheck.checked) lower = true;
    if(symbolcheck.checked) sym = true;
    if(numbercheck.checked) num = true;


    if ( uper && lower && (sym || num) && passwordlen>=8)
    {
        indicator("#0f0");
    }

    else if((lower || uper) && (sym||num) && passwordlen>=6)
    {
        indicator("#ff0");
    }

    else {
        indicator("#f00");
    }
}

async function copyContent(){
try{
    await navigator.clipboard.writeText(display.value);
    copyMsg.innerText ="Copied";
    }
catch(e)
    {
    copyMsg.innerText = "Failed";
    }

    copyMsg.classList.add("active");

    setTimeout(()=> copyMsg.classList.remove("active") , 2000 );

    
}


function checkboxchange(){
    checkcount = 0;
    allCheck.forEach( (checkbox)=>{
        
        if(checkbox.checked) {
            checkcount++;
        }
});

if(passwordlen<checkcount)
{
    passwordlen = checkcount;
    handleSlider();
}

}

allCheck.forEach((checkbox)=>(
checkbox.addEventListener('change', checkboxchange))
)

inputSlider.addEventListener('input',(e)=>{
    passwordlen = e.target.value;
    handleSlider();
})

copyBut.addEventListener('click', ()=>{
    if(display.value){
        copyContent();
    }
})

function shuffle(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        }
    let str = "";
    array.forEach((el) => (str += el));
    return str;

}

genButton.addEventListener('click', ()=>{

    if(checkcount<=0)
    {
        return;
    }

    if (passwordlen<checkcount)
    {
        passwordlen= checkcount;
        handleSlider();

    }

    password  = "";

   
    let funOfArr = [];

    if(uppercheck.checked)
    {
        funOfArr.push(getUperCase);
        console.log("upper kobulaya ");
    }

    if(lowercheck.checked)
    {
       funOfArr.push(getLowCase);
    }

    if(numbercheck.checked)
    {
        funOfArr.push(getRanNum);
    }

    if(symbolcheck.checked)
    {
       funOfArr.push(getSymbol);
    }

    //compulsaary
    console.log("yha tk done");


    for (let i= 0; i<funOfArr.length; i++)
    {
        console.log("ise bhi bulaya");
        password += funOfArr[i]();
        console.log("yha tk bhi agya");
    }
    console.log("compulsary done");
    

    //remaning

    for(let i= 0; i<passwordlen-funOfArr.length; i++)
    {
        let randomindex= getRanInt(0,funOfArr.length);
        password += funOfArr[randomindex]();

    }
    password= shuffle(Array.from(password));
    display.value = password;
    calStrength();


})
