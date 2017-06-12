;"use strict";

var buttonStart = document.getElementById('start'),
	 buttonStop = document.getElementById('stop'),
	 elem = document.getElementsByClassName('light_item'),
	 controlPanel = document.getElementsByClassName('control_panel'),
	 inputText = document.getElementById('count'),
	 buttonOK = document.getElementById('ok'),
	 p = createElem('p', 'number'),
	 popUp = createElem('p', 'pop_up'),
	 num = '10',
	 count = num,
	 startTrafficLight;

elem[1].appendChild(p);
p.innerHTML = count;

controlPanel[0].appendChild(popUp);
popUp.innerHTML ='Введите целое число от 10 до 60 включительно и нажмите start';

document.addEventListener('click', function(e){
	if (e.target.tagName !== 'INPUT') {
		hideInformWindow();
	}
});

buttonOK.addEventListener('click', enterUserNum);

inputText.addEventListener('click', function(){
	if (popUp.style.opacity == 0){
		showInformWindow();
		return;
	}
	hideInformWindow();
});

inputText.addEventListener('keypress', function(e){
	if (e.key == 'Enter'){
		enterUserNum();
		return;
	}
	if (e.key == 'Backspace'){
		showInformWindow();
		return;
	}
	hideInformWindow();
});

buttonStart.addEventListener('click', function(){
	if (startTrafficLight == undefined) {
		startTrafficLight = setInterval (function(){
			trafficLight();
		}, 1000);
	}
});

buttonStop.addEventListener('click', function(){
	stopTrafficLight();
	startTrafficLight = undefined;
});

function createElem(tag, cls){
	var temp = document.createElement(tag);
	temp.classList.add(cls);
	return temp;
}

function enterUserNum(){
	var userNum = inputText.value;
	if (userNum >= 10 && userNum <= 60) {
	num = userNum || '10';
	count = num;
	p.innerHTML = count;
	inputText.value = '';
	stopTrafficLight();
	startTrafficLight = undefined;
	return;
	}
	inputText.value = '';
	return showInformWindow();
}

function showInformWindow(){
	popUp.style.opacity = '1';
}

function hideInformWindow(){
	popUp.style.opacity = '0';
}

function countDecrease () {
	return count--;
}

function blink (elem) {
	if (elem.id == 'red') {
	return elem.classList.toggle('bg_color_red');
	}
	elem.classList.toggle('bg_color_green');
}

function setBgColor (elem, color) {
	elem.style.background = color;
}

function trafficLight() {

	setBgColor(elem[0], 'black');
	setBgColor(elem[2], 'black');

	if (count > 6 ){
		if (p.classList.contains('number_green')){
			elem[2].style.background = 'green';
		} else {
			elem[0].style.background = 'red';
		}
		p.innerHTML = count;
	}

	if (count <= 6) {
		if (p.classList.contains('number_green')) {
		elem[2].style.background = '';
		blink(elem[2]);
		} else {
		elem[0].style.background = '';
		blink(elem[0]);
		}
		p.innerHTML = count;
	}

	if (count == 0) {
		count = num;
		setBgColor(elem[1], 'yellow');
		p.innerHTML = '';
		p.classList.toggle('number_green');
		if (p.classList.contains('number_green')) {
		setBgColor(elem[0], 'red');
		} else {
		setBgColor(elem[2], 'green');
		}
	} else {
		setBgColor(elem[1], '');
	}
	countDecrease();
	}

function stopTrafficLight() {
	clearInterval(startTrafficLight);
}