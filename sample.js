"use strict"

var multipliers = {
  "11970": [1.265, 27.432],
  "7348": [1.12, 26.3],
  "10555": [0.87, 20.1], 
  "10504": [1.52, 35.98], 
  "10469": [0.75, 18.5]
};

var activeMultiplier,
    output1,
    output2, 
    mySliderWidget,
    firstCol;
   
window.onload = function () {  
  output1 = document.querySelector("#output1");
  output2 = document.querySelector("#output2"); 
  firstCol = document.querySelector(".b-mainbox__first-column");
  countActiveMultiplier();
  mySliderWidget = new CustomDivSlider(document.getElementById("myslider"));    
  renderOutputs();
  mySliderWidget.addEventListener("popupvaluechange", renderOutputs);
  initMenu();
  window.addEventListener("resize", resizeArrow);
  resizeArrow();  
}

function renderOutputs() {    
  output1.innerHTML = addSpacesToNumbers(Math.round(mySliderWidget.value * activeMultiplier[0])) + " $";     
  output2.innerHTML = addSpacesToNumbers(Math.round(mySliderWidget.value * activeMultiplier[1])) + " $"; 
};
  
function addSpacesToNumbers(s) {
  return String(s).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
}

function resizeArrow() {  
  document.querySelector(".b-mainbox").style.backgroundPosition = getComputedStyle(firstCol).width;
}

function initMenu() {  
  var allItems = document.querySelectorAll(".b-item");
  for (var i = 0; i < allItems.length; i++) {
    allItems[i].addEventListener("click", function () {menuClick(this);});
  }  

  function menuClick(currentItem) {
    var oldItem = currentItem.parentNode.querySelector(".b-item_selected");      
    oldItem.classList.remove("b-item_selected");
    oldItem.querySelector(".b-item_selected__account__no-dashed").classList.remove("b-item_selected__account__no-dashed");
    currentItem.classList.add("b-item_selected");
    currentItem.querySelector(".b-item__account__number").classList.add("b-item_selected__account__no-dashed");                   
    countActiveMultiplier();
    renderOutputs();
  }
}

function countActiveMultiplier() {
  activeMultiplier = multipliers[document.querySelector(".b-item_selected__account__no-dashed").innerHTML]; 
  if (activeMultiplier === undefined) {
    alert("Please update multipliers database (object multipliers in sample.js)");
    activeMultiplier = [1 ,1];
  }
}