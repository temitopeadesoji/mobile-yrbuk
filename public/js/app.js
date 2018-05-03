function openNav() {
  document.getElementById("mySidenav").style.width = "80%";
}
      
function closeNav() {
   document.getElementById("mySidenav").style.width = "0";
}

function openSearch() {
  document.getElementById("mySearchnav").setAttribute("style", "width:100%;padding:10px 10px;");
}

function closeSearch() {
  document.getElementById("mySearchnav").setAttribute("style", "width:0;padding:0px 0px;");
}

function openContent1() {
  document.getElementById("section-content1").setAttribute("style", "display: block;padding:20px 10px 10px 10px;");
  document.getElementById("icon1").setAttribute("style", "display: none;");
  document.getElementById("iconBefore1").setAttribute("style", "display: block;");
}

function closeContent1() {
  document.getElementById("section-content1").setAttribute("style", "display: none;");
  document.getElementById("icon1").setAttribute("style", "display: block;");
  document.getElementById("iconBefore1").setAttribute("style", "display: none;");
}

function openContent2() {
  document.getElementById("section-content2").setAttribute("style", "display: block;padding:20px 10px 10px 10px;");
  document.getElementById("icon2").setAttribute("style", "display: none;");
  document.getElementById("iconBefore2").setAttribute("style", "display: block;");
}

function closeContent2() {
  document.getElementById("section-content2").setAttribute("style", "display: none;");
  document.getElementById("icon2").setAttribute("style", "display: block;");
  document.getElementById("iconBefore2").setAttribute("style", "display: none;");
}

function openContent3() {
  document.getElementById("section-content3").setAttribute("style", "display: block;padding:20px 10px 10px 10px;");
  document.getElementById("icon3").setAttribute("style", "display: none;");
  document.getElementById("iconBefore3").setAttribute("style", "display: block;");
}

function closeContent3() {
  document.getElementById("section-content3").setAttribute("style", "display: none;");
  document.getElementById("icon3").setAttribute("style", "display: block;");
  document.getElementById("iconBefore3").setAttribute("style", "display: none;");
}