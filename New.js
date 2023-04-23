"use strict"
const button = document.querySelector("#button")
button.onclick = function () {
  const file = document.querySelector("#file").files[0]
  const reader = new FileReader()
  reader.readAsText(file)
  reader.onload = async function () {
    let result = reader.result
   // console.log(result);
    let selectorsArraay = result.match(/^[\.#]\w+/gmi)
    const selectors = []
    selectorsArraay.forEach((el) => {
      if (!selectors.includes(el)) {
        selectors.push(el)
      }
    })
    let colors = result.match(/\bcolor(.{1,});$/gm)
    let bgColor = result.match(/\bbackground-color(.{1,});$/gm)
    let borders = result.match(/\bborder[^-].+;$/gm)
    console.log(borders);
    let frag = new DocumentFragment()
    frag.append(renderInfo(selectors, "Selectors",setSelectorColor));
    frag.append(renderInfo(colors, "Colors",setColor));
    frag.append(renderInfo(bgColor,"Bg colors", setBgColor))
    frag.append(renderInfo(borders, "Borders",setBorder));
    let place = document.getElementById("info")
    place.innerHTML = ""
    place.append(frag)
  }
};

function renderInfo(array, text,fn) {
  let div = document.createElement("div")
  div.classList.add("infoButton")
  div.innerText = text + "\n" + array.length
  div.onclick = function () {
    let place = document.getElementById("detail")
    place.innerHTML = ""
    let details = new DocumentFragment()
    for (let i = 0; i < array.length; i++) {
      let div = document.createElement("div")
      div.classList.add("detailLine")
      div.innerText = array[i]
      fn(div,div.innerText)
      details.append(div)
    }
     place.append(details)
  }
  return div
};


function setColor(el,elInnerText){
  let color = elInnerText.match(/\b[^col][^bac].+/g)
  color = color[0]
  color = color.split("")
  color.splice(0,2)
    color.pop()
    color = color.join("")
    el.style.color = `${color}`
};

function setSelectorColor(el){
  el.style.color = "rgb(233, 150, 25)"
};

function setBgColor(el,elInnerText){
  let color = elInnerText.match(/\b[^col][^bac].+/g)
  color = color[0]
  color = color.split("")
  color.splice(0,2)
    color.pop()
    color = color.join("")
    el.style.backgroundColor = `${color}`
};

function setBorder(el,elInnerText){
 let border = elInnerText.match(/\b[^borde].+/g);
 border = border[0];
 border = border.split("");
 border.splice(0,2);
 border.pop()
 border = border.join("")
 el.style.border = `${border}`
};

