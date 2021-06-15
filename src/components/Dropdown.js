import React, { createElement, useEffect } from 'react';

export default function Dropdown(props) {
  const choices = props.menu.map((x, xi) => {
    if (xi < 1) return <div class='noLine'>{x}</div>
    return <div class='choice'>{x}</div>
  });
  const updateForm = {};
  const id = props.id;
  window.onload = () => {
    const text = document.getElementById('importance').children[0].innerHTML
    document.getElementById('importance').children[0].innerHTML = '<div id=\"dot\"></div>' + text
  }
  useEffect(() => {
    const menuHandler = (e) => {
      updateForm[id] = e.target.innerText
      props.setForm({
        ...props.form, ...updateForm
      });
      if (id === 'importance') {
        let color;
        let text = e.target.innerText;
        text === 'High' ? color = 'red' : text === 'Medium' ? color = 'orange' : text === 'Low' ? color = 'green' : color = color;
        document.getElementById(id).children[0].innerHTML = '<div id=\"dot\"></div>' + text;
        document.getElementById('dot').style.backgroundColor = color;
      } else {
        document.getElementById(id).children[0].innerHTML = e.target.innerText;
      }
      document.getElementById(id + 'drop').style.visibility = 'hidden';
      document.getElementById(id + 'drop').style.zIndex = '-3';
      document.querySelectorAll(".range-wrap").forEach(x => x.style.zIndex = 3)
    }
    const menuOpener = () => {
      if (document.getElementById(id + 'drop').style.visibility === 'visible') {
        document.getElementById(id + 'drop').style.visibility = 'hidden';
        document.getElementById(id + 'drop').style.zIndex = '-3';
        document.querySelectorAll(".range-wrap").forEach(x => x.style.zIndex = 3)
      } else {
        document.querySelectorAll(".longDiv.pointer.hide").forEach(x => {
          x.style.zIndex = '-3';
          x.style.visibility = 'hidden';
        })
        document.getElementById(id + 'drop').style.visibility = 'visible';
        document.getElementById(id + 'drop').style.zIndex = '2';
        document.querySelectorAll(".range-wrap").forEach(x => x.style.zIndex = 1)
      }
    }
    document.getElementById(id + 'drop').addEventListener('click', menuHandler);
    document.getElementById(id).addEventListener('click', menuOpener);
    return () => {

      document.getElementById(id + 'drop').removeEventListener('click', menuHandler);
      document.getElementById(id).removeEventListener('click', menuOpener);
    }
  });
  return (
    <div>
      <div id={id} class='longDiv pointer between'>{choices[0]}<img class='arrow' src='https://i.imgur.com/lS678eq.png' /></div>
      <div id={id + 'drop'} class='longDiv pointer hide'>{choices}</div>
    </div>
  );
}
// if (document.getElementById(id).children[0].innerHTML === 'High')
//   if (document.getElementById(id).children[0].innerHTML === 'Medium')
//     if (document.getElementById(id).children[0].innerHTML === 'Low')