var input = document.getElementById("uxuiswitch");
var menuBtn =  document.getElementById("menu");
var navigationlinks = document.querySelectorAll(".navigation-link");
var lastScroll = 0;

if (input != null) {
    input.addEventListener('change', uxuiChange);
}
if (menuBtn != null) {
  menuBtn.addEventListener("click", toggleMenu);
}
if (navigationlinks != null && navigationlinks.length > 0) {
  navigationlinks.forEach(function (item, idx) {
    item.addEventListener("click", toggleMenu);
  });
}


function toggleMenu(evt){
  var menu = document.getElementsByTagName("nav");
  var isMobile = document.getElementById("menu").offsetParent != null;
  if (menu.length > 0) {
      menu = menu[0];
      if (menu.classList.contains("hide")) {
        if (isMobile) document.documentElement.classList.add("no-scroll");
        menu.classList.remove("slideOutUp");
        menu.classList.add("slideInDown");
        menu.classList.remove("hide");
      } else {
        document.documentElement.classList.remove("no-scroll");
        menu.classList.remove("slideInDown");
        menu.classList.add("slideOutUp");
        setTimeout(function(){ menu.classList.add("hide"); }, 1000);
      }
  }
}
function uxuiChange(evt) {
    var main = document.getElementsByTagName("body");
    if (main.length > 0) {
      main = main[0];
      if (main.id == "ui") {
        main.id = "ux";
      } else {
            main.id = "ui";
        }
    }
}

function runOnScroll(evt){
  var doc = document.documentElement;
  var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
  if(top>0){
    if (Math.abs(lastScroll - top) > 10) {
      fireEvent((top >= lastScroll)? "scrollDown":"scrollUp");
      lastScroll = top;
    }
  }
if (document.location.pathname == "/" || document.location.pathname == "/index.html"){
    var body = document.getElementsByTagName("body")[0];
    if (top > 320){
      body.classList.add("mini-btn");
    }
    else{
      body.classList.remove("mini-btn");
    }
  }
}

function fireEvent(eventName){
  var evt = document.createEvent('Event');
  evt.initEvent(eventName, true, true);
  window.dispatchEvent(evt);
}


function onScrollDown () {
  var header = document.getElementsByTagName("header")[0];
  var submenu = document.getElementById("sub-menu");
  header.classList.remove("slideInDown");
  header.classList.add("slideOutUp");
}
function onScrollUp (){
  var header = document.getElementsByTagName("header")[0];
  var submenu = document.getElementById("sub-menu");
  header.classList.add("slideInDown");
  header.classList.remove("slideOutUp");
}

function init() {
  window.addEventListener("scroll", runOnScroll);
  window.addEventListener("scrollDown", (e) => onScrollDown());
  window.addEventListener("scrollUp", (e) => onScrollUp());

  let balls = document.getElementsByClassName("ball")[0];
  window.addEventListener('resize', function(event) {
      if (window.innerWidth <= 768) {
          let x = '23px';
          let y = '19px';
          balls.style.transform = 'translate(-50%,-50%)';
          balls.style.left = x;
          balls.style.top = y;
      }
  });

  document.onmousemove = function() {
      let screenWidth = window.innerWidth;
      if (screenWidth > 768) {
          let x = event.clientX * 100 / screenWidth + "%";
          let y = event.clientY * 100 / screenWidth + "%";
          balls.style.transform = "translate(-" + x + ",-" + y + ")";
          balls.style.left = x;
          balls.style.top = y;
      }

  }

}

window.onload = function() {
  init();
};
