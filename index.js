const levels ={
    1:{min:0, max:10, time:5},
    2:{min:20, max:50, time:10},
    3:{min:375, max:600, time:15},
    4:{min:750, max:900, time:15},
    5:{min:300, max:1000, time:15},
}


let inter;
let currentLevel = 1
let level = levels[currentLevel];

const button = document.querySelector('button.submit');
const time =document.querySelector('time');
let read = document.querySelector('button.read');

const dd =document.querySelector('p.dd');
const n1 = document.querySelector('p.primer');
const n2 = document.querySelector('p.second');
const input = document.querySelector('input');
let result = 0
let scor = document.querySelector('p.scor');
let rest = 0;



const randomnumber = (max,min=0)=>{
    return Math.floor(Math.random()*(max-min)+min);                                                                                
};


const update = ()=>{
    let num1 = randomnumber(level.max, level.min);
    let num2 = randomnumber(level.max, level.min);
    result = num1 + num2;
    n1.textContent =num1 ;
    n2.textContent = num2;
    scor.textContent =`SCORE: ${rest} points`
    dd.textContent = `niveau ${currentLevel}`;
}



let  chrono = ()=> {
    let count = level.time;
    inter = setInterval(()=>{
        document.querySelector('p.temp').textContent = count;
        if (count==0) {
            clearInterval(inter);
            if(rest==0){
                alert('vous avez perdu !');
                location.reload();
            }else{
                rest -=5;
                update();
                chrono();
            }
        }
        count-=1;
        
    },1000);
}


// update();
// chrono();


input.addEventListener('keyup',(e)=>{
    const value =e.target.value;
    console.log(value);
    if(parseInt(value)==result){
        clearInterval(inter);
        e.target.value = "";
        rest +=5;
        if(rest==15){
            if(currentLevel==5 ){
                alert('Bravo vous avez terminé le jeu!');
                location.reload();
            }else{
                currentLevel+=1;
                level = levels[currentLevel];
                rest=0;
                update();
                chrono();
            }
        }else{
            update();
            chrono();
        }
    }

});



button.addEventListener('click',(e)=>{
    e.target.parentElement.parentElement.style.display = 'none';
    update();
    chrono();

});