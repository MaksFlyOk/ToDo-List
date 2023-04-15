// Глобальные переменные
let i = 0

let popup = document.querySelector('.popup')
let closePopUpSettings = document.querySelector('.closeSettings')
let radioTime = document.querySelector('#radioTime')
let radioSum = document.querySelector('#radioSum')
let radioOne = document.querySelector('#radioOne')
let activeSum = document.querySelector('.activeSum')
let activeTime = document.querySelector('.activeTime')
let liTimeHour = document.querySelectorAll('.hourTime')
let liTimeMinute = document.querySelectorAll('.minuteTime')

let upSet = document.querySelector('.upCounterSettings')
let downSet = document.querySelector('.downCounterSettings')

for(let key in localStorage) {  //! Запись данных после перезагрузки
    if (!localStorage.hasOwnProperty(key)) {
      continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
    }
    let settings = JSON.parse(localStorage.getItem(key)) // Парсим данные ключа

    if (settings.diffrentToDo == 'Sum'){
        resetSum(settings.number, settings.nameTodo, settings.caption, settings)
    } else if (settings.diffrentToDo == 'Time'){
        resetTime (settings.number, settings.nameTodo, settings.caption, settings)
    } else if (settings.diffrentToDo == 'One'){
        resetOne(settings.number, settings.nameTodo, settings.caption, settings)
    }

    i = localStorage.length
    if (i <= settings.number){ //! Присваиваем i значение наибольшего ключа
        i = settings.number+1
    }
}

function resetSum (i, nameTodo, caption, settings) {
    let sumTodo = settings.sumTodo
    let sum = settings.sum
    let upSet = document.querySelector('.upCounterSettings')
    let downSet = document.querySelector('.downCounterSettings')
    let counterSet = document.querySelector('.counterSettings')
    let button = document.createElement('button')

    let li = document.createElement('li')
    li.className = `newTodo${i}`
    document.querySelector('.listToDo').append(li);  // Поещаем li внутрь ul
    
    let h1 = document.createElement('strong')
    h1.innerHTML = `${nameTodo}`  // Вставляем значение в окно со всеми ToDo's
    document.querySelector(`.newTodo${i}`).append(h1);

        button.className = "completeTodo"
        button.innerHTML = `${sumTodo}/${sum}`
        document.querySelector(`.newTodo${i}`).append(button);  // Помещаем кнопку Complete внутри li

        getStorage(i)
        settings.sum = sum
        settings.sumTodo = sumTodo
        localStorage.setItem(`newTodo${i}`, JSON.stringify(settings))

        button.onclick = () => {   //! Эта функция зачеркивает выполненный ToDo, или же в случае ошибки убирает зачеркивание
                ++sumTodo 
                button.innerHTML = `${sumTodo}/${sum}`
                counterSet.innerHTML = `${sumTodo}/${sum}`  
            if (sumTodo >= sum){
                li.style.textDecoration = "line-through"
            } else {
                li.style.textDecoration = "none"
            }
            
            getStorage(i)
            settings.sumTodo = sumTodo
            localStorage.setItem(`newTodo${i}`, JSON.stringify(settings))
       }

        if (sumTodo >= sum){
            li.style.textDecoration = "line-through"
        } else {
            li.style.textDecoration = "none"
        }

        h1.onclick = () => {  //! Эта функция вызывает окно со всеми введеными значениями при создании
            PopUpSetting()  //! Тотже PopUp но предназначенный для отображения свойств ToDo, при его вызове просто подклчаются другие стили Css
    
            document.querySelector('.nameSettings').innerHTML = `Name: ${nameTodo}` // Помещаем в свойства название ToDo по которому нажали 
            document.querySelector('.caption').innerHTML = `Caption: ${caption}`
            
            document.querySelector('.sum').style.display = 'flex'
    
            counterSet.innerHTML = `${sumTodo}/${sum}`

            upSet.onclick = () => {
                ++sumTodo
                counterSet.innerHTML = `${sumTodo}/${sum}`
                button.innerHTML = `${sumTodo}/${sum}`
                if (sumTodo >= sum){
                    li.style.textDecoration = "line-through"
                } else {
                    li.style.textDecoration = "none"
                }
    
                getStorage(i)
                settings.sumTodo = sumTodo
                localStorage.setItem(`newTodo${i}`, JSON.stringify(settings))
    
                return sumTodo
            } 
    
            downSet.onclick = () => {
                if (sumTodo > 0){
                    --sumTodo
                    counterSet.innerHTML = `${sumTodo}/${sum}`
                    button.innerHTML = `${sumTodo}/${sum}`
                }
                if (sumTodo >= sum){
                    li.style.textDecoration = "line-through"
                } else {
                    li.style.textDecoration = "none"
                }
    
                getStorage(i)
                settings.sumTodo = sumTodo
                localStorage.setItem(`newTodo${i}`, JSON.stringify(settings))
    
                return sumTodo
            }


            document.querySelector('.delete').onclick = () => {  //! Функция удаления ToDo
                li.remove()  // Удаляем весь элемент из окна с ToDo's
                localStorage.removeItem(`newTodo${settings.number}`)  // Чистим LocalStorage от конкретного ToDo
        
                popup.classList.remove('content1Settigns') // Закрываем окно с свойствами
                --i
            }
        }
}

function resetOne (i, nameTodo, caption, settings) {
    let li = document.createElement('li')
    li.className = `newTodo${i}`
    document.querySelector('.listToDo').append(li);  // Поещаем li внутрь ul
    
    let h1 = document.createElement('strong')
    h1.innerHTML = `${nameTodo}`  // Вставляем значение в окно со всеми ToDo's
    document.querySelector(`.newTodo${i}`).append(h1);

        let button = document.createElement('button')

        button.className = "completeTodo"
        button.innerHTML = "Complete"
        document.querySelector(`.newTodo${i}`).append(button);  // Помещаем кнопку Complete внутри li

        button.onclick = () => {   //! Эта функция зачеркивает выполненный ToDo, или же в случае ошибки убирает зачеркивание
            if (li.style.textDecoration != "line-through"){
                li.style.textDecoration = "line-through"

                getStorage(i)
                settings.isCompleted = true
                localStorage.setItem(`newTodo${i}`, JSON.stringify(settings))
            } else {
                li.style.textDecoration = "none"

                getStorage(i)
                settings.isCompleted = false
                localStorage.setItem(`newTodo${i}`, JSON.stringify(settings))
            }
        }

    if (settings.isCompleted == true){
        li.style.textDecoration = "line-through"
    }

    h1.onclick = () => {  //! Эта функция вызывает окно со всеми введеными значениями при создании
        PopUpSetting()  //! Тотже PopUp но предназначенный для отображения свойств ToDo, при его вызове просто подклчаются другие стили Css

        document.querySelector('.nameSettings').innerHTML = `Name: ${nameTodo}` // Помещаем в свойства название ToDo по которому нажали 
        document.querySelector('.caption').innerHTML = `Caption: ${caption}`
        
        document.querySelector('.sum').style.display = 'none'

        document.querySelector('.delete').onclick = () => {  //! Функция удаления ToDo
        li.remove()  // Удаляем весь элемент из окна с ToDo's
        localStorage.removeItem(`newTodo${settings.number}`)  // Чистим LocalStorage от конкретного ToDo

        popup.classList.remove('content1Settigns') // Закрываем окно с свойствами
        --i
        }
    }
}

function resetTime (i, nameTodo, caption, settings) {
    let hour = settings.hourSet
    let minute = settings.minuteSet
    let second = settings.secondSet
    let button = document.createElement('button')

    let li = document.createElement('li')
    li.className = `newTodo${i}`
    document.querySelector('.listToDo').append(li);  // Поещаем li внутрь ul
    
    let h1 = document.createElement('strong')
    h1.innerHTML = `${nameTodo}`  // Вставляем значение в окно со всеми ToDo's
    document.querySelector(`.newTodo${i}`).append(h1);

        button.className = "completeTodo"
        button.innerHTML = `${hour}:${minute}:${second}`
        document.querySelector(`.newTodo${i}`).append(button);  // Помещаем кнопку Complete внутри li

        function secondMin () {

            if (hour == 0 && minute == 0 && second == 0){
                clearInterval(add)
                li.style.textDecoration = "line-through"
                return 0
            }
            if (second == 0){
                --minute
                second += 59
            }
            if (minute == 0 && hour != 0){
                --hour
                minute += 59
            }

            --second

            document.querySelector('.timer').innerHTML = `Timer: ${hour}:${minute}:${second}`
            button.innerHTML = `${hour}:${minute}:${second}`
            console.log(second)
        }

        button.onclick = () => {   //! Эта функция зачеркивает выполненный ToDo, или же в случае ошибки убирает зачеркивание
            PopUpSetting()  //! Тотже PopUp но предназначенный для отображения свойств ToDo, при его вызове просто подклчаются другие стили Css

        document.querySelector('.nameSettings').innerHTML = `Name: ${nameTodo}` // Помещаем в свойства название ToDo по которому нажали 
        document.querySelector('.caption').innerHTML = `Caption: ${caption}`
        document.querySelector('.settingsTime').innerHTML = `Time: ${settings.hour}:${settings.minute}:00`
        document.querySelector('.timer').innerHTML = `Timer: ${hour}:${minute}:${second}`

        document.querySelector('.startTime').onclick = () => {
           add = setInterval(secondMin, 1000)
        }

        document.querySelector('.stopTime').onclick = () => {
            clearInterval(add)
            getStorage(i)
            settings.hourSet = hour
            settings.minuteSet = minute
            settings.secondSet = second
            localStorage.setItem(`newTodo${i}`, JSON.stringify(settings))
         }
        
        document.querySelector('.sum').style.display = 'none'
        document.querySelector('.time').style.display = 'block'

        document.querySelector('.delete').onclick = () => {  //! Функция удаления ToDo
        li.remove()  // Удаляем весь элемент из окна с ToDo's
        localStorage.removeItem(`newTodo${settings.number}`)  // Чистим LocalStorage от конкретного ToDo

        popup.classList.remove('content1Settigns') // Закрываем окно с свойствами
        --i
        }
        }
    h1.onclick = () => {  //! Эта функция вызывает окно со всеми введеными значениями при создании
        PopUpSetting(h1)  //! Тотже PopUp но предназначенный для отображения свойств ToDo, при его вызове просто подклчаются другие стили Css

        document.querySelector('.nameSettings').innerHTML = `Name: ${nameTodo}` // Помещаем в свойства название ToDo по которому нажали 
        document.querySelector('.caption').innerHTML = `Caption: ${caption}`
        getStorage(i)
        
        PopUpSetting()  //! Тотже PopUp но предназначенный для отображения свойств ToDo, при его вызове просто подклчаются другие стили Css

        document.querySelector('.nameSettings').innerHTML = `Name: ${nameTodo}` // Помещаем в свойства название ToDo по которому нажали 
        document.querySelector('.caption').innerHTML = `Caption: ${caption}`
        document.querySelector('.settingsTime').innerHTML = `Time: ${settings.hour}:${settings.minute}:00`
        document.querySelector('.timer').innerHTML = `Timer: ${hour}:${minute}:${second}`

        document.querySelector('.startTime').onclick = () => {
           add = setInterval(secondMin, 1000)
        }

        document.querySelector('.stopTime').onclick = () => {
            clearInterval(add)
            getStorage(i)
            settings.hourSet = hour
            settings.minuteSet = minute
            settings.secondSet = second
            localStorage.setItem(`newTodo${i}`, JSON.stringify(settings))
         }
        
        document.querySelector('.sum').style.display = 'none'
        document.querySelector('.time').style.display = 'block'

        document.querySelector('.delete').onclick = () => {  //! Функция удаления ToDo
        li.remove()  // Удаляем весь элемент из окна с ToDo's
        localStorage.removeItem(`newTodo${settings.number}`)  // Чистим LocalStorage от конкретного ToDo

        popup.classList.remove('content1Settigns') // Закрываем окно с свойствами
        --i
        }

            document.querySelector('.sum').style.display = 'none'
            document.querySelector('.time').style.display = 'block'
}  
}  

document.querySelector('.popupButton').onclick = PopUp
document.querySelector('.addTodo').onclick = addTodo

function PopUp () {
    if (popup.classList.value === 'popup'){
        popup.classList.add('content1')
    } else{
        popup.classList.remove('content1')
    }
}

function clearSettigns () {  //! Функция очещает поля в случае отмены
    document.querySelector('.nameTodo').value = ''  // Очищаем input после создания ToDo
    document.querySelector('.captionAdd').value = ''  // Берем значения из TextArea
}

function radio () {
    let k
    if (radioTime.checked === true){
        k = 'Time'
    } else if (radioSum.checked === true){
        k = 'Sum'
    } else if (radioOne.checked === true){
        k = 'One'
    } else {
        k = 'cancel'
    }
    return k
}

function radioClick () {
    let diffrentClick = radio()

    if (diffrentClick == 'Sum'){
        activeSum.style.display = 'flex'
        activeTime.style.display = 'none'
        counter()
    } else if (diffrentClick == 'Time'){
        activeSum.style.display = 'none'
        activeTime.style.display = 'flex'
        timeClick()
    } else if (diffrentClick == 'One'){
        activeSum.style.display = 'none'
        activeTime.style.display = 'none'
    }
}

function counter () {
    let j = 0
    let up = document.querySelector('.upCounter')
    let down = document.querySelector('.downCounter')
    let counter = document.querySelector('.counter')

    up.onclick = () => {
        counter.innerHTML = String(++j)
        return j
    } 
    down.onclick = () => {
        if (j > 0){
            counter.innerHTML = String(--j)
        }
    }
    return j 
}

function timeClick () {
    let hour = 0
    let minute = 0

    for (let hourTimes of liTimeHour) {
        hourTimes.addEventListener('click', (e) => {
            e.preventDefault()
            hour = hourTimes.innerHTML

            for (let hourTimesActive of liTimeHour) {
                if(hourTimesActive.innerHTML == hour){
                    hourTimesActive.style.color = 'white'
                } else{
                    hourTimesActive.style.color = 'black'
                }
            }
            return hour
        })
    }

    for (let minutesTimes of liTimeMinute) {
        minutesTimes.addEventListener('click', (e) => {
            e.preventDefault()
            minute = minutesTimes.innerHTML

            for (let minuteTimesActive of liTimeMinute) {
                if(minuteTimesActive.innerHTML == minute){
                    minuteTimesActive.style.color = 'white'
                } else{
                    minuteTimesActive.style.color = 'black'
                }
            }
            return minute
        })
    }
    return hour, minute
}

function createLi (i, nameTodo, caption, settings, diffrentToDo) {
    let sumTodo = 0
    let sum = Number(document.querySelector('.counter').innerHTML)
    let hour = 0
    let minute = 0
    let second = 0
    let counterSet = document.querySelector('.counterSettings')
    let button = document.createElement('button')

    for (let hourTimesActive of liTimeHour) {
        if(hourTimesActive.style.color == 'white'){
            hour = hourTimesActive.innerHTML
        }
    }
    for (let minutesTimesActive of liTimeMinute) {
        if(minutesTimesActive.style.color == 'white'){
            minute = minutesTimesActive.innerHTML
        }
    }

    let li = document.createElement('li')
    li.className = `newTodo${i}`
    document.querySelector('.listToDo').append(li);  // Поещаем li внутрь ul
    
    let h1 = document.createElement('strong')
    h1.innerHTML = `${nameTodo}`  // Вставляем значение в окно со всеми ToDo's
    document.querySelector(`.newTodo${i}`).append(h1);

    if (diffrentToDo === 'Time'){

        getStorage(i)
        settings.hour = hour
        settings.minute = minute
        settings.hourSet = hour
        settings.minuteSet = minute
        settings.secondSet = 0
        localStorage.setItem(`newTodo${i}`, JSON.stringify(settings))

        button.className = "completeTodo"
        button.innerHTML = `${hour}:${minute}:${second}`
        document.querySelector(`.newTodo${i}`).append(button);  // Помещаем кнопку Complete внутри li

        function secondMin () {

            if (hour == 0 && minute == 0 && second == 0){
                clearInterval(add)
                li.style.textDecoration = "line-through"
                return 0
            }
            if (second == 0){
                --minute
                second += 59
            }
            if (minute == 0 && hour != 0){
                --hour
                minute += 59
            }

            --second

            document.querySelector('.timer').innerHTML = `Timer: ${hour}:${minute}:${second}`
            button.innerHTML = `${hour}:${minute}:${second}`
            console.log(second)
        }

        button.onclick = () => {   //! Эта функция зачеркивает выполненный ToDo, или же в случае ошибки убирает зачеркивание
            PopUpSetting()  //! Тотже PopUp но предназначенный для отображения свойств ToDo, при его вызове просто подклчаются другие стили Css

        document.querySelector('.nameSettings').innerHTML = `Name: ${nameTodo}` // Помещаем в свойства название ToDo по которому нажали 
        document.querySelector('.caption').innerHTML = `Caption: ${caption}`
        document.querySelector('.settingsTime').innerHTML = `Time: ${hour}:${minute}:${second}`
        document.querySelector('.timer').innerHTML = `Timer: ${hour}:${minute}:${second}`

        document.querySelector('.startTime').onclick = () => {
           add = setInterval(secondMin, 1000)
        }

        document.querySelector('.stopTime').onclick = () => {
            clearInterval(add)
            getStorage(i)
            settings.hourSet = hour
            settings.minuteSet = minute
            settings.secondSet = second
            localStorage.setItem(`newTodo${i}`, JSON.stringify(settings))
         }
        
        document.querySelector('.sum').style.display = 'none'
        document.querySelector('.time').style.display = 'block'

        document.querySelector('.delete').onclick = () => {  //! Функция удаления ToDo
        li.remove()  // Удаляем весь элемент из окна с ToDo's
        localStorage.removeItem(`newTodo${settings.number}`)  // Чистим LocalStorage от конкретного ToDo

        popup.classList.remove('content1Settigns') // Закрываем окно с свойствами
        --i
        }
        }
    }else if (diffrentToDo === 'Sum'){
        button.className = "completeTodo"
        button.innerHTML = `${sumTodo}/${sum}`
        document.querySelector(`.newTodo${i}`).append(button);  // Помещаем кнопку Complete внутри li

        getStorage(i)
        settings.sum = sum
        settings.sumTodo = sumTodo
        localStorage.setItem(`newTodo${i}`, JSON.stringify(settings))

        button.onclick = () => {   //! Эта функция зачеркивает выполненный ToDo, или же в случае ошибки убирает зачеркивание
            getStorage(i)
            ++settings.sumTodo 
            button.innerHTML = `${settings.sumTodo}/${settings.sum}`
            counterSet.innerHTML = `${settings.sumTodo}/${settings.sum}` 

            if (settings.sumTodo >= settings.sum){
                li.style.textDecoration = "line-through"
            } else {
                li.style.textDecoration = "none"
            }
            localStorage.setItem(`newTodo${i}`, JSON.stringify(settings))
       }
    }else if (diffrentToDo === 'One'){
        let button = document.createElement('button')

        getStorage(i)
        settings.isCompleted = false
        localStorage.setItem(`newTodo${i}`, JSON.stringify(settings))

        button.className = "completeTodo"
        button.innerHTML = "Complete"
        document.querySelector(`.newTodo${i}`).append(button);  // Помещаем кнопку Complete внутри li

        button.onclick = () => {   //! Эта функция зачеркивает выполненный ToDo, или же в случае ошибки убирает зачеркивание
            if (li.style.textDecoration != "line-through"){
                li.style.textDecoration = "line-through"

                getStorage(i)
                settings.isCompleted = true
                localStorage.setItem(`newTodo${i}`, JSON.stringify(settings))
            } else {
                li.style.textDecoration = "none"

                getStorage(i)
                settings.isCompleted = false
                localStorage.setItem(`newTodo${i}`, JSON.stringify(settings))
            }
        }
    }

    h1.onclick = () => {  //! Эта функция вызывает окно со всеми введеными значениями при создании
        PopUpSetting(h1)  //! Тотже PopUp но предназначенный для отображения свойств ToDo, при его вызове просто подклчаются другие стили Css

        document.querySelector('.nameSettings').innerHTML = `Name: ${nameTodo}` // Помещаем в свойства название ToDo по которому нажали 
        document.querySelector('.caption').innerHTML = `Caption: ${caption}`
        getStorage(i)
        
        if (diffrentToDo === 'Time'){
            PopUpSetting()  //! Тотже PopUp но предназначенный для отображения свойств ToDo, при его вызове просто подклчаются другие стили Css

        document.querySelector('.nameSettings').innerHTML = `Name: ${nameTodo}` // Помещаем в свойства название ToDo по которому нажали 
        document.querySelector('.caption').innerHTML = `Caption: ${caption}`
        document.querySelector('.settingsTime').innerHTML = `Time: ${hour}:${minute}:${second}`
        document.querySelector('.timer').innerHTML = `Timer: ${hour}:${minute}:${second}`

        document.querySelector('.startTime').onclick = () => {
           add = setInterval(secondMin, 1000)
        }

        document.querySelector('.stopTime').onclick = () => {
            clearInterval(add)
            getStorage(i)
            settings.hourSet = hour
            settings.minuteSet = minute
            settings.secondSet = second
            localStorage.setItem(`newTodo${i}`, JSON.stringify(settings))
         }
        
        document.querySelector('.sum').style.display = 'none'
        document.querySelector('.time').style.display = 'block'

        document.querySelector('.delete').onclick = () => {  //! Функция удаления ToDo
        li.remove()  // Удаляем весь элемент из окна с ToDo's
        localStorage.removeItem(`newTodo${settings.number}`)  // Чистим LocalStorage от конкретного ToDo

        popup.classList.remove('content1Settigns') // Закрываем окно с свойствами
        --i
        }

            document.querySelector('.sum').style.display = 'none'
            document.querySelector('.time').style.display = 'block'

        }else if (diffrentToDo === 'Sum'){

            counterSet.innerHTML = `${sumTodo}/${sum}` 

            document.querySelector('.sum').style.display = 'flex'
            document.querySelector('.time').style.display = 'none'

            upSet.onclick = () => {
                getStorage(i)
                ++settings.sumTodo 
                button.innerHTML = `${settings.sumTodo}/${settings.sum}`
                counterSet.innerHTML = `${settings.sumTodo}/${settings.sum}` 
        
                if (settings.sumTodo >= settings.sum){
                    li.style.textDecoration = "line-through"
                } else {
                    li.style.textDecoration = "none"
                }
                localStorage.setItem(`newTodo${i}`, JSON.stringify(settings))
                } 
        
                downSet.onclick = () => {
                    getStorage(i)
                    
                    if (settings.sumTodo > 0){
                        --settings.sumTodo
                        button.innerHTML = `${settings.sumTodo}/${settings.sum}`
                        counterSet.innerHTML = `${settings.sumTodo}/${settings.sum}` 
                    }
                    if (settings.sumTodo >= settings.sum){
                        li.style.textDecoration = "line-through"
                    } else {
                        li.style.textDecoration = "none"
                    }
        
                    localStorage.setItem(`newTodo${i}`, JSON.stringify(settings))
                }

        }else if (diffrentToDo === 'One'){
            document.querySelector('.sum').style.display = 'none'
           document.querySelector('.time').style.display = 'none'
        }

        document.querySelector('.delete').onclick = () => {  //! Функция удаления ToDo
        li.remove()  // Удаляем весь элемент из окна с ToDo's
        localStorage.removeItem(`newTodo${settings.number}`)  // Чистим LocalStorage от конкретного ToDo

        popup.classList.remove('content1Settigns') // Закрываем окно с свойствами
        --i
        }
    }

    // return i, li, h1, button, diffrentToDo
}

function getStorage (number) {
    let settings = JSON.parse(localStorage.getItem(`newTodo${number}`))
    return settings
}

function storageAdd (settings, i, nameTodo, caption, diffrentToDo) {
    settings.number = i
    settings.nameTodo = nameTodo
    settings.caption = caption
    settings.diffrentToDo = diffrentToDo

    localStorage.setItem(`newTodo${i}`, JSON.stringify(settings)) //! Помещаем массив в LocalStorage
    return settings
}

function addTodo () {
    i++
    
    PopUp () // Вызов окна создания ToDo

    document.querySelector('.different').onclick= () => {
        radioClick()
    }

    document.querySelector('.createAdd').onclick = () => {        // Обработчик события по нажатию на кнопку Create

        let nameTodo = document.querySelector('.nameTodo').value  // Берем значения из Input
        let caption = document.querySelector('.captionAdd').value  // Берем значения из TextArea
        let settings = {}

        let diffrentToDo = radio()
        console.log(diffrentToDo)
        if (diffrentToDo === 'cancel'){
            return 0 
        }

        storageAdd(settings, i, nameTodo, caption, diffrentToDo)
        createLi(i, nameTodo, caption, settings, diffrentToDo)

        clearSettigns()
        
        PopUp () //! Логический конец функции, тут закрывается окно после создания ToDo
    }

    document.querySelector('.cancelAdd').onclick = () => {
        PopUp()

        clearSettigns()

        --i
    }
}

function PopUpSetting (h1) {
    if (popup.classList.value === 'popup'){
        popup.classList.add('content1Settigns')
    } else if (popup.classList.value === 'content1Settigns' && h1.onclick == true) {
        document.querySelector('.nameSettings').innerHTML = `Name: ${nameTodo}` // Помещаем в свойства название ToDo по которому нажали 
        document.querySelector('.caption').innerHTML = `Caption: ${caption}`
        upSet.style.display = 'block'
        downSet.style.display = 'block'
    } else if (document.querySelector('.closeSettings').onclick == true)
    document.querySelector('.closeSettings').onclick = () => {
        popup.classList.remove('content1Settigns')
    }

    document.querySelector('.delete').onclick = () => {
        upSet.style.display = 'none'
        downSet.style.display = 'none'
        popup.classList.remove('content1Settigns')
    }

    document.querySelector('.closeSettings').onclick = () => {
        popup.classList.remove('content1Settigns')
    }
}


// document.querySelector('li').onclick = watchSettings
// function watchSettings () {
//     console.log('bleat')
// }

// document.querySelector('li').addEventListener("click", (e) => {
//     let dot = document.createElement("h1");
//     dot.innerHTML = "dot";
//     document.querySelector('main').append(dot);
//   })

// let popupBg = document.querySelector('.popup__bg'); // Фон попап окна
// let popup = document.querySelector('.popup'); // Само окно
// let openPopupButtons = document.querySelectorAll('.about'); // Кнопки для показа окна

// openPopupButtons.forEach((button) => { // Перебираем все кнопки
//     button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
//         e.preventDefault(); // Предотвращаем дефолтное поведение браузера
//         popupBg.classList.add('active'); // Добавляем класс 'active' для фона
//         popup.classList.add('active'); // И для самого окна
//     })
// });

// document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
//     if(e.target === popupBg || e.target === popup) { // Если цель клика - фон, то:
//         popupBg.classList.remove('active'); // Убираем активный класс с фона
//         popup.classList.remove('active'); // И с окна
//     }
// })