"use strict"

var multipliers = {
  "11970": [1.265, 27.432],
  "7348": [1.12, 26.3],
  "10555": [0.87, 20.1], 
  "10504": [1.52, 35.98], 
  "10469": [0.75, 18.5]
};

var slider,
    sliderStyle, 
    sliderMaxValue,
    sliderMarginLeft,
    sliderTrackWidth, 
    activeMultiplier,
    koeff;

    
window.onload = function () {  
  countActiveMultiplier();
  initSlider();
  initMenu();
  window.addEventListener("resize", resizeArrowAndSliderWidth);
  resizeArrowAndSliderWidth();
}


function resizeArrowAndSliderWidth() {  
    document.querySelector(".b-mainbox").style.backgroundPosition = 
      getStyle(document.querySelector(".b-mainbox__first-column"), "width") + "px";    

    var separatorWidth = getStyle(document.querySelector(".b-mainbox__separator"), "width");

    if (separatorWidth > 0) {
      sliderTrackWidth = getStyle(document.querySelector(".b-mainbox"), "width") - 
        getStyle(document.querySelector(".b-mainbox__first-column"), "width") - separatorWidth - 80;
    } else {
      sliderTrackWidth = getStyle(document.querySelector(".b-mainbox"), "width") - 80;      
    }        

    slider.style.width = sliderTrackWidth + "px";       
    koeff = 0.927 + 0.00018*(sliderTrackWidth-205);
    sliderMarginLeft = getStyle(slider, "margin-left");
    handleSlider();    
}


function initSlider() {      
  slider = document.querySelector(".b-slider");      
  sliderMaxValue = slider.getAttribute("max");
  var st = document.createElement("style");
  st.id = "s_myslider";
  document.head.appendChild(st);
  sliderStyle = document.querySelector("#s_myslider");

  slider.addEventListener("input", function () {handleSlider()});
  slider.addEventListener("change", function () {handleSlider()});  

  slider.output1 = slider.parentNode.querySelector(".b-slider__output__text1");
  slider.output2 = slider.parentNode.querySelector("#output2");
  slider.output3 = slider.parentNode.querySelector("#output3");   
}  


function handleSlider() {                       
    var styleString = ".b-slider::-webkit-slider-runnable-track {background-size: " + 
      (Math.round(slider.value * sliderTrackWidth / sliderMaxValue) +
      ((slider.value > (sliderMaxValue / 2)) ? 0 : 7)) + "px 100%, 100% 100%;} ";

    sliderStyle.textContent = styleString;           

    slider.output1.innerHTML = slider.value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ") + " $";
    
    slider.output2.innerHTML = (Math.round(parseInt(slider.value, 10) * activeMultiplier[0]) +
      "").replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ") + " $";
      
    slider.output3.innerHTML = (Math.round(parseInt(slider.value, 10) * activeMultiplier[1]) +
      "").replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ") + " $";    
      
    slider.parentNode.querySelector(".b-slider__output").style.marginLeft = 
      (slider.value * sliderTrackWidth / sliderMaxValue * koeff) + sliderMarginLeft - (29) + "px";        
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
    handleSlider();
  }
}


function countActiveMultiplier() {
  activeMultiplier = multipliers[document.querySelector(".b-item_selected__account__no-dashed").innerHTML]; 
  if (activeMultiplier === undefined) {
    alert("Please update multipliers database (object multipliers in sample.js)");
    activeMultiplier = [1 ,1];
  }
}


/***
 * get live runtime value of an element's css style
 *   http://robertnyman.com/2006/04/24/get-the-rendered-style-of-an-element
 *     note: "styleName" is in CSS form (i.e. "font-size", not "fontSize").
 ***/
var getStyle = function (e, styleName) {
    var styleValue = "";
    if(document.defaultView && document.defaultView.getComputedStyle) {
        styleValue = document.defaultView.getComputedStyle(e, "").getPropertyValue(styleName);
    }
    else if(e.currentStyle) {
        styleName = styleName.replace(/\-(\w)/g, function (strMatch, p1) {
            return p1.toUpperCase();
        });
        styleValue = e.currentStyle[styleName];
    }
    return parseFloat(styleValue);
}
