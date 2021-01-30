const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const clear=document.getElementById("clear");
const undo=document.getElementById("undo")
const col=document.getElementById("color")
const input=document.getElementById("text")
var filetype=document.getElementsByName("filetype");


clear.addEventListener("click",()=>{
    ctx.fillStyle ="white";
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillRect(0,0,canvas.width,canvas.height);
    path=[];
    index = -1;

})

undo.addEventListener("click",()=>{
    if(index <=0){
        ctx.fillStyle ="white";
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillRect(0,0,canvas.width,canvas.height);
    path=[];
    index = -1;
    }else{
        index -= 1;
        path.pop();
        ctx.putImageData(path[index],0,0);
    }

})
canvas.Width=window.innerWidth - 60;
canvas.height=550;

ctx.fillStyle="white";
ctx.fillRect(0,0,canvas.width,canvas.height);

let color="red";
let width="2";
let is_draw = false;
let path=[];
let index= -1;

canvas.addEventListener("touchstart",start,false);
canvas.addEventListener("touchmove",draw,false);
canvas.addEventListener("mousedown",start,false);
canvas.addEventListener("mousemove",draw,false);
canvas.addEventListener("touchend",stop,false);
canvas.addEventListener("mouseup",stop,false);
canvas.addEventListener("mouseout",stop,false);

function start(event) {
    is_draw=true;
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    event.preventDefault(); 
}

function draw(event){
    if(is_draw){
        ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        ctx.strokeStyle = color;
        ctx.lineWidth=width;
        ctx.lineCap="round";
        ctx.lineJoin="round";
        ctx.stroke();
    }
    console.log(col.value)
}
function stop(event){
    if(is_draw){
        ctx.stroke();
        ctx.closePath();
        is_draw=false;
    }
    event.preventDefault();
    
    if(event.type != "mouseout"){
       path.push(ctx.getImageData(0,0,canvas.width,canvas.height));
       index+=1;
    }

}
// for downloading the images
function download(){
    var fileformate
    for (let i= 0; i < filetype.length; i++) {
    if (filetype[i].checked) {
        fileformate=filetype[i].value;       
    }
}
    canvas.toBlob((blob)=>{
        const a=document.createElement("a");
        document.body.append(a);
        a.download =`${input.value}.${fileformate}`;
        a.href=URL.createObjectURL(blob);
        a.click();
        a.remove();
    });          
}

