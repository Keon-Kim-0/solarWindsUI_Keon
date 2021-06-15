import React, { useEffect, useState } from 'react';
import "./styles.css";
import Slider from "./components/Slider";
import Dropdown from "./components/Dropdown";



export default function App() {
    const [form, setForm] = useState({ name: '', url: '', type: 'HTTP', importance: 'High', downAfter: 30, downAlert: 20, resendAlert: 20 });

    useEffect(() => {
        const nameElement = document.getElementById('nameInput');
        let name;
        const urlElement = document.getElementById('urlInput');
        let url;

        const saveElement = document.getElementById('saveButton');
        const saveHandler = () => {
            let error = false;
            let report = Object.entries(form).reduce((a, c) => {
                if (c[1] === '') {
                    if (error === false) {
                        error = '';
                    }
                    error += '⚠ Invalid entry at {' + c[0] + '} \n';
                } else if (error === false) {
                    return a + c[0] + ':  ' + c[1] + '\n';
                }
            }, '✨ Successful submission\n\n');
            error === false ? alert(report) : alert(error);
        }
        const nameHandler = () => {
            name = nameElement.checkValidity() ? nameElement.value : '';
            setForm({ ...form, name: name });
        }
        const urlHandler = () => {
            url = urlElement.checkValidity() ? urlElement.value : '';
            setForm({ ...form, url: url });
        }
        nameElement.addEventListener('input', nameHandler);
        urlElement.addEventListener('input', urlHandler);
        saveElement.addEventListener('click', saveHandler);
        return () => {
            nameElement.removeEventListener('input', nameHandler);
            urlElement.removeEventListener('input', urlHandler);
            saveElement.removeEventListener('click', saveHandler);
        };
    });
    return (
        <div id='formDiv'>
            <div class='titleDiv'><h1 class='left'>Add Uptime Check</h1><input onClick={() => { window.location.reload() }} class='right' type="image" src="https://i.imgur.com/0VeauTs.png" /></div>
            <div class='divContainer'>
                <div class='nameDiv'>
                    <h2 class='blockText'>Name</h2><input id='nameInput' class='longInput' placeholder=" " required pattern="[a-zA-Z0-9]+.*"></input><h2 class='error' id='nameError'> </h2></div>
                <div class='threeDiv'>
                    <div class='smallDiv'><h2 class='blockText'>Type<img id='typeTipImg' src='https://i.imgur.com/Hj27wpI.png' /><span id='typeTip'>choose a type of network protocol</span></h2><Dropdown id='type' form={form} setForm={setForm} menu={['HTTP', 'TCP', 'UDP', 'PING']} /></div>
                    <div class='smallDiv'><h2 class='blockText'>URL</h2><input id='urlInput' class='shortInput' placeholder="http://" required pattern="^(?:(?:(?:https?|ftp|HTTPS?|FTP):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$"></input><h2 class='error' id='urlError'></h2></div>
                    <div class='smallDiv'><h2 class='blockText'>Importance</h2><Dropdown id='importance' form={form} setForm={setForm} menu={['High', 'Medium', 'Low']} /></div>
                </div>
                <div id='threeDivBottomLine' class='threeDiv'>
                    <div class='smallDiv behind'></div>
                    <div class='smallDiv behind'></div>
                    <div class='smallDiv behind'><span id='rightTip'><span id='bold'>Tip:</span> Users can now <span id='underline'>configure alerts</span> based on different importance levels.</span></div>
                </div>
            </div>
            <div class='sliderDiv'><h2 class='left'>Consider down after</h2><Slider id="downAfter" form={form} setForm={setForm} step='5' min='0' max='30' unit='s timeout' /></div>
            <div class='sliderDiv'><h2 class='left'>When down alert after</h2><Slider id="downAlert" form={form} setForm={setForm} step='5' min='0' max='20' unit=' minutes' /></div>
            <div class='sliderDiv'><h2 class='left'>Resend alert</h2><Slider id="resendAlert" form={form} setForm={setForm} step='5' min='0' max='20' unit=' minutes' /></div>
            <div class='buttonDiv'><div class='rightButton'><button id='saveButton' class='right formButtons'>Save</button><button onClick={() => { window.location.reload() }} id='cancelButton' class='right formButtons'>Cancel</button></div></div>
        </div>
    );
}
