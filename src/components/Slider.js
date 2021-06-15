import React, { useEffect } from 'react';


export default function Slider(props) {
  useEffect(() => {
    const range = document.getElementById(props.id), rangeV = document.getElementById(props.id + 'V'),
      setValue = () => {
        const newValue = Number((range.value - range.min) * 100 / (range.max - range.min)),
          newPosition = 10 - (newValue * 0.2);
        if (range.value === '0') {
          rangeV.innerHTML = `<span>${'Never'}</span>`;
        } else {
          rangeV.innerHTML = `<span>${range.value + props.unit}</span>`;
        }
        rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
      };
    const mouseupHandler = () => {
      let formVal = Number(range.value);
      if (formVal === 0) {
        formVal = 'never';
      }
      let formUpdateObject = {};
      formUpdateObject[props.id] = formVal;
      props.setForm({
        ...props.form, ...formUpdateObject
      });
    }
    setValue();
    range.addEventListener('input', setValue);
    range.addEventListener('mouseup', mouseupHandler);
    return () => {
      range.removeEventListener('input', setValue);
      range.removeEventListener('mouseup', mouseupHandler);
    };
  });
  return (
    <div class="range-wrap">
      <input class='clip' type="range" id={props.id} step={props.step} min={props.min} max={props.max} ></input>
      <div class="range-value" id={props.id + 'V'}></div>
    </div>
  );
}

