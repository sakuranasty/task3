window.onload = () => {
    // задаем размерность поля
    const boardSize=4;

    // функция для генерации случайного целого числа
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max-min)) + min;
    }
    // функция генерации уникальных чисел в интервале
    function generateArrayRandomNumber (min, max) {
        let totalNumbers =  max - min + 1;
        let arrayTotalNumbers = [];
        let arrayRandomNumbers = [];
        let tempRandomNumber;
    
        while (totalNumbers--) {
            arrayTotalNumbers.push(totalNumbers + min);
        }
    
        while (arrayTotalNumbers.length) {
            tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
            arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
            arrayTotalNumbers.splice(tempRandomNumber, 1);
        }
    
        return arrayRandomNumbers;
    }
    
    //	Нужно учесть что в диапазоне участвуют и минимальное и максимальное число
    //	тоесть если задать (0, 100) то на выходе получим массив из 101-го числа
    //	от 1 до 100 и плюс число 0
    

    
    // функция для генерации неповторяющихся чисел
    // function fillBoard(boardSize,boardPositions){
    //     for(let i = 0;i < boardSize * boardSize;i++) {
    //         do{
    //             boardPositions[i]=getRandomInt(0,(boardSize * boardSize - 1));
    //         }
    //         while(isFound(boardPositions,boardPositions[i]));
    //     }
    // }
    
    // массив для случайных чисел
    let boardPositions=generateArrayRandomNumber(0,boardSize*boardSize-1);
    
    // заполняем массив случайными числами
    // fillBoard(boardSize,boardPositions);

    // создаем класс для сохранения цвета
    class Color{
        constructor(r,g,b){
           this.r = r;
           this.g = g;
           this.b = b;
        }
    }

    // функция для генерации 8 цветов. на повторение не проверяю т.к. даже если цвета повторятся игра от этого не сломается
    function generateColor(boardSize,colors){
        for(let i = 0;i < (boardSize * boardSize / 2);i++){
            colors.push(new Color(getRandomInt(0,255),getRandomInt(0,255),getRandomInt(0,255)));
        }
    }

    // присваиваем каждой ячейке случайный цвет. создаем для этого функцию
    function assignColor(boardPosition,colors){
        let j=0;
        let boardOfColors=[];
         for(let i=0; i<boardPosition.length;i++){
            boardOfColors[boardPosition[i]] = j % (colors.length);
            j++;
         }
         return boardOfColors;
     }

    // получаем обертку для поля
    let gameboard = document.getElementById('game');

    // заполняем обертку ячейками
    for(let i = 0; i < boardSize * boardSize; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        gameboard.appendChild(cell);
    }

    // сохраняем блок таймера в переменную
     let timerBox = document.getElementById('timer');
    
    // переменные для таймера
     let clocktimer,dateObj,dh,dm,ds;
     let readout='';
     let h=1,m=1,tm=1,s=0,ts=0,ms=0,init=0;
     const base = 60;


    // функция очистки таймера
     function clearСlock() {
        clearTimeout(clocktimer); 
        h=1;m=1;tm=1;s=0;ts=0;ms=0; 
        init=0;
        readout='00:00:00.00'; 
        timerBox.innerHTML=readout; 
       }

       // функция тика
       /* из интернета, по шагам не разбирала, но в общих чертах: создаем объект даты чтобы отмерить время
       от клика по кнопке до очередного запуска функции после прохождения всех вычислений и вычисляем каждый 
       разряд таймера и форматируем вывод */
       function startTIME() {
        let cdateObj = new Date(); 
        let t = (cdateObj.getTime() - dateObj.getTime())-(s*1000); 
        if (t>999) { s++; } 
        if (s>=(m*base)) { 
            ts=0; 
            m++; 
        } else { 
            ts=parseInt((ms/100)+s); 
            if(ts>=base) { ts=ts-((m-1)*base); } 
        } 
        if (m>(h*base)) { 
            tm=1; 
            h++; 
        } else { 
            tm=parseInt((ms/100)+m); 
            if(tm>=base) { tm=tm-((h-1)*base); } 
        } 
        ms = Math.round(t/10); 
        if (ms>99) {ms=0;} 
        if (ms==0) {ms='00';} 
        if (ms>0&&ms<=9) { ms = '0'+ms; } 
        if (ts>0) {
             ds = ts;
             if (ts<10) { 
                ds = '0'+ts;
            }
        } else { ds = '00'; } 
        dm=tm-1; 
        if (dm>0) {
            if (dm<10) { dm = '0'+dm; }
        } else { dm = '00'; } 
        dh=h-1; 
        if (dh>0) {
            if (dh<10) { dh = '0'+dh; }
        } else { dh = '00'; } 
        readout = dh + ':' + dm + ':' + ds; 
        timerBox.innerHTML = readout; 
        clocktimer = setTimeout(startTIME,1); 
    }
    
    /* функция для подсветки плитки. передается элемент, вызвавший функцию, сам массив плиток на странице,
    массив,где хранятся цвета и "ассоциативный" массив, где рандомной позиции соответствует определенный цвет в массиве цветов*/
    function showColor(e,arrOfTales,colors,boardOfColors){
        // находим индес ячейки, на которую нажали 
        let indOfTile = arrOfTales.indexOf(e.target);
        
        // запоминаем цвет из массива цветов чтобы добыть оттуда rgb
        let color = colors[boardOfColors[indOfTile]];

        // красим ячейку на которую нажали
        arrOfTales[indOfTile].style.backgroundColor = ('rgba('+color.r+','+color.g+','+color.b+',1)');

        /* 
        if(indOfTile.length == 2){
            if(arrOfTales[openedTiles[0]].style.backgroundColor == arrOfTales[openedTiles[0]].style.backgroundColor) {

            }
            indOfTile.pop();
            indOfTile.pop();
            
        } else {
            openedTiles.push(indOfTile);
        }*/
    }
    
    // массив для цветов
    let colors = [];

    // ассоциативный массив, где рандомной позиции соотвестствует цвет из массива цветов, который мы сгенерим по клику
    let boardOfColors = [];

    // функция запуска таймера и событий после его запуска
    function startStop() {
     if (init==0){
         clearСlock();
         dateObj = new Date();
         startTIME();
         init=1;
         generateColor(boardSize,colors);
         boardOfColors = [...assignColor(boardPositions,colors)];
         startGameButton.disabled=true;
             arrOfTales.forEach(element => {
                    element.addEventListener('click', (e) => {
                        showColor(e,arrOfTales,colors,boardOfColors);
                    })
            });
     } else {
         clearTimeout(clocktimer);
         init=0;
         startGameButton.disabled=false;
     }
    }

    // сохраняем кнопку запуска в переменную
    let startGameButton = document.querySelector('button[value="start"]');
    
    // подвешиваем события старта игры на кнопку запуска
    startGameButton.addEventListener('click', startStop);
    
    // превращаем коллекцию в массив
    let arrOfTales = [...gameboard.children]; 
}
