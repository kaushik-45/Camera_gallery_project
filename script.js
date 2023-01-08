let video = document.querySelector("video");
let recordBtnCont = document.querySelector(".record-btn-cont");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let recordBtn = document.querySelector(".record-btn");
let captureBtn = document.querySelector(".capture-btn");

let recordFlag = false;

let recorder;
let chunks = [];

let constrains = {
    video: true,
    audio: false 
}
// navigator is global object-> jo browser ke bare me information contain karega.
navigator.mediaDevices.getUserMedia(constrains)
.then((stream)=>{
  video.srcObject = stream;

  recorder = new MediaRecorder(stream);
  recorder.addEventListener("start",(e)=>{
    chunks = [];
  })
  recorder.addEventListener("dataavailable",(e)=>{
    chunks.push(e.data);
  })
  recorder.addEventListener("stop",(e)=>{
    //converting media chunks

    let blob = new Blob(chunks,{type : "video/mp4"})

    let videoURL = URL.createObjectURL(blob);

    let a= document.createElement("a");
    a.href=videoURL;
    a.download = "stream.mp4";
    a.click();
  })
})

recordBtnCont.addEventListener("click",(e)=>{

  if(!recorder)return;

  recordFlag=!recordFlag;
  if(recordFlag)
  {
    recorder.start();
    recordBtn.classList.add("scale-record");
  }
  else{
    recorder.stop();
    recordBtn.classList.remove("scale-record");

  }
})

captureBtnCont.addEventListener("click",(e)=>{
   
  let canvas=document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  let tool = canvas.getContext("2d");
  tool.drawImage(video,0,0,canvas.width,canvas.height);
  captureBtn.classList.add("scale-capture"); 
  let imageURL = canvas.toDataURL();
  let a= document.createElement("a");
  a.href=imageURL;
  a.download = "image.jpg";
  a.click();

})