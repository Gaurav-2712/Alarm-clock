let clock = document.getElementById('clock');
let gethour = document.getElementById('gethour');
let getminitue = document.getElementById('getminitue');
let format = document.getElementById('Format')
let alarmlist = document.getElementById('alarm-list');
let addalarm = document.getElementById('addalarm');
let alarmsArray = [];
let alarmsound = new Audio("ringtone-58761.mp3");
let initialHour = 0, initialMinute = 0, alarmIndex = 0;


function showtime(hour, minitue,second){
    
    let interval = "AM"
    if(hour>12){
      interval = "PM"
      clock.innerHTML = `${hour-12} : ${minitue} : ${second} ${interval}`
    }
    else{
    clock.innerHTML = `${hour} : ${minitue} : ${second} ${interval}`
    }
}

// For Display a Timer Clock and play a alaram
setInterval(() => {
    let date = new Date();
    let hour = appendzero(date.getHours())
    let minitue = appendzero(date.getMinutes())
    let second = appendzero(date.getSeconds());

    showtime(hour,minitue,second)

    alarmsArray.forEach((alaram,index) => {
        if(alaram.isActive){
            console.log(`${alaram.alarmhour}:${alaram.alarmminitue}`,`${hour}:${minitue}`)
            console.log(`${alaram.alarmhour}:${alaram.alarmminitue}`===`${hour}:${minitue}`)
            if (`${alaram.alarmhour}:${alaram.alarmminitue}` === `${hour}:${minitue}`) {
                alarmsound.play();
                alarmsound.loop = true;
            }
        }
    });

},1000);


// Apped a zero for a single digit
const appendzero = (value) => value < 10 ? "0"+value : value

// check the input and add the zero
const inputcheck = (inputvalue) =>{
    inputvalue = parseInt(inputvalue)
    if(inputvalue < 10 ){
        inputvalue = appendzero(inputvalue);
    }
    return inputvalue;
}


gethour.addEventListener('input',function(){
    gethour.value = inputcheck(gethour.value);
})
getminitue.addEventListener('input',function(){
    getminitue.value = inputcheck(getminitue.value);
})

// for Set new Alrarm (click on add Alarm)
addalarm.addEventListener('click',function(){
  
  if(gethour.value=="" || getminitue.value=="")
  {
    alert("Please Enter a Proper Value")
    return;
  }
  else if(gethour.value<=0 || gethour.value>12)
  {
    alert("Select Proper Range of Hour")
    return;
  }
  else if(getminitue.value<0 || getminitue.value>=60)
  {
    alert("Select Proper Range of Minitue")
    return;
  }
    alarmIndex++;

    let alarmObj = {};
    if(format.value == "PM")
    {
      alarmObj.alarmhour = parseInt(gethour.value)+12;
    }
    else{
      alarmObj.alarmhour = parseInt(gethour.value);
    }
    alarmObj.id = `${alarmIndex}_${gethour.value}_${getminitue.value}_${format.value}`
    alarmObj.alarmminitue = getminitue.value;
    alarmObj.alarmformate = format.value
    alarmObj.isActive = true;
    console.log(alarmObj)
    alarmsArray.push(alarmObj);
    createalarm(alarmObj)
    gethour.value = appendzero(initialHour);
    getminitue.value = appendzero(initialMinute);
})

const createalarm = (alarmObj) => {
    //Keys from object
    const { id, alarmhour, alarmminitue , alarmformate } = alarmObj;
    //Alarm div
    let alarmDiv = document.createElement("div");
    alarmDiv.classList.add("activealarm");
    alarmDiv.setAttribute("data-id", id);
    if(format.value == "PM")
    {
      alarmDiv.innerHTML = `<span>${alarmhour-12}: ${alarmminitue} ${alarmformate} </span>`;
    }
    else{
      alarmDiv.innerHTML = `<span>${alarmhour}: ${alarmminitue} ${alarmformate} </span>`;
    }
  

    let div = document.createElement('div')
    div.classList.add("left-div","center")

    //checkbox
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add('center')
    checkbox.checked = true
    
    

    checkbox.addEventListener("click", (e) => {
      if (e.target.checked) {
        startAlarm(e);
      } else {
        stopAlarm(e);
      }
    });

    //Delete button
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<img src="Delete.svg" alt=""/>`;

    deleteButton.children[0].addEventListener('click' , (e) => deleteAlarm(e));
    deleteButton.addEventListener("click", (e) => deleteAlarm(e));

    div.appendChild(checkbox)
    div.appendChild(deleteButton)
    alarmDiv.appendChild(div);
    alarmlist.appendChild(alarmDiv);
  };

  //Search for value in object
const searchObject = (parameter, value) => {
    let alarmObject,
      objIndex,
      exists = false;
      console.log(parameter,value)
      alarmsArray.forEach((alarm, index) => {
      if (alarm[parameter] == value) {
        exists = true;
        alarmObject = alarm;
        objIndex = index;
        return false;
      }
    });
    return [exists, alarmObject, objIndex];
  };
  

//Start Alarm
const startAlarm = (e) => {
  console.log(e.target.parentElement.parentElement.getAttribute("data-id"))
  let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    console.log(exists,obj,index)
    if (exists) {
        alarmsArray[index].isActive = true;
    }
  };

  //Stop alarm
const stopAlarm = (e) => {
    let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
      alarmsArray[index].isActive = false;
      alarmsound.pause();
    }
  };

  const deleteAlarm = (e) => {
    console.log(e.target.parentElement.parentElement.parentElement.getAttribute("data-id"))
    let searchId = e.target.parentElement.parentElement.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
      e.target.parentElement.parentElement.parentElement.remove();
      alarmsArray.splice(index, 1);
      alarmsound.pause();
    }
  };
  
  window.onload = () => {
    initialHour = 0;
    initialMinute = 0;
    alarmIndex = 0;
    alarmsArray = [];
    // gethour.value = appendzero(initialHour);
    // getminitue.value = appendzero(initialMinute);
  };
















 




