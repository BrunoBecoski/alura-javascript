function wave() {
  var ocean = document.getElementById("ocean"),
  waveWidth = 5,
  waveCount = Math.floor(ocean.scrollWidth/waveWidth),
  docFrag = document.createDocumentFragment();
  
  for(var i = 0; i < waveCount; i++){
    var wave = document.createElement("div");
    wave.className += "wave";
    docFrag.appendChild(wave);
    wave.style.left = i * waveWidth + "px";
    wave.style.animationDelay = (i/100) + "s";
  }

  
  const oceanWidth = ocean.scrollWidth;
  const waveWidthAll = waveCount * 5 - 5;
  const waveLast = oceanWidth - waveWidthAll - 5;

  var wave = document.createElement("div");
  wave.className += "wave";
  docFrag.appendChild(wave);
  wave.style.left = waveWidthAll + waveLast + "px";
  wave.style.animationDelay = (i/100) + "s";

  ocean.appendChild(docFrag);
}

wave();



function handleSubmitSearch(event) {

  event.preventDefault();

  const searchValue = document.getElementById("input-search").value;

  window.location.href = `http://127.0.0.1:5500/search.html?search=${searchValue}`;
}
