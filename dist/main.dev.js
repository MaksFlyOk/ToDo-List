"use strict";

// Глобальные переменные
var i = 0;
var popup = document.querySelector('.popup');
var closePopUpSettings = document.querySelector('.closeSettings');
var radioTime = document.querySelector('#radioTime');
var radioSum = document.querySelector('#radioSum');
var radioOne = document.querySelector('#radioOne');
var activeSum = document.querySelector('.activeSum');
var activeTime = document.querySelector('.activeTime');
var liTimeHour = document.querySelectorAll('.hourTime');
var liTimeMinute = document.querySelectorAll('.minuteTime');
var upSet = document.querySelector('.upCounterSettings');
var downSet = document.querySelector('.downCounterSettings');

for (var key in localStorage) {
  //! Запись данных после перезагрузки
  if (!localStorage.hasOwnProperty(key)) {
    continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
  }

  var settings = JSON.parse(localStorage.getItem(key)); // Парсим данные ключа

  if (settings.diffrentToDo == 'Sum') {
    resetSum(settings.number, settings.nameTodo, settings.caption, settings);
  } else if (settings.diffrentToDok == 'Time') {
    resetTime(settings.number, settings.nameTodo, settings.caption, settings);
  } else if (settings.diffrentToDo == 'One') {
    resetOne(settings.number, settings.nameTodo, settings.caption, settings);
  } // createLi (settings.number, settings.nameTodo, settings.caption, settings, settings.diffrentToDo)


  i = localStorage.length;

  if (i <= settings.number) {
    //! Присваиваем i значение наибольшего ключа
    i = settings.number + 1;
  }
}

function resetSum(i, nameTodo, caption, settings) {
  var sumTodo = settings.sumTodo;
  var sum = settings.sum;
  var upSet = document.querySelector('.upCounterSettings');
  var downSet = document.querySelector('.downCounterSettings');
  var counterSet = document.querySelector('.counterSettings');
  var button = document.createElement('button');
  var li = document.createElement('li');
  li.className = "newTodo".concat(i);
  document.querySelector('.listToDo').append(li); // Поещаем li внутрь ul

  var h1 = document.createElement('strong');
  h1.innerHTML = "".concat(nameTodo); // Вставляем значение в окно со всеми ToDo's

  document.querySelector(".newTodo".concat(i)).append(h1);
  button.className = "completeTodo";
  button.innerHTML = "".concat(sumTodo, "/").concat(sum);
  document.querySelector(".newTodo".concat(i)).append(button); // Помещаем кнопку Complete внутри li

  getStorage(i);
  settings.sum = sum;
  settings.sumTodo = sumTodo;
  localStorage.setItem("newTodo".concat(i), JSON.stringify(settings));

  button.onclick = function () {
    //! Эта функция зачеркивает выполненный ToDo, или же в случае ошибки убирает зачеркивание
    ++sumTodo;
    button.innerHTML = "".concat(sumTodo, "/").concat(sum);
    counterSet.innerHTML = "".concat(sumTodo, "/").concat(sum);

    if (sumTodo >= sum) {
      li.style.textDecoration = "line-through";
    } else {
      li.style.textDecoration = "none";
    }

    getStorage(i);
    settings.sumTodo = sumTodo;
    localStorage.setItem("newTodo".concat(i), JSON.stringify(settings));
  };

  if (sumTodo >= sum) {
    li.style.textDecoration = "line-through";
  } else {
    li.style.textDecoration = "none";
  }

  h1.onclick = function () {
    //! Эта функция вызывает окно со всеми введеными значениями при создании
    PopUpSetting(); //! Тотже PopUp но предназначенный для отображения свойств ToDo, при его вызове просто подклчаются другие стили Css

    document.querySelector('.nameSettings').innerHTML = "Name: ".concat(nameTodo); // Помещаем в свойства название ToDo по которому нажали 

    document.querySelector('.caption').innerHTML = "Caption: ".concat(caption);
    document.querySelector('.sum').style.display = 'flex';
    counterSet.innerHTML = "".concat(sumTodo, "/").concat(sum);

    upSet.onclick = function () {
      ++sumTodo;
      counterSet.innerHTML = "".concat(sumTodo, "/").concat(sum);
      button.innerHTML = "".concat(sumTodo, "/").concat(sum);

      if (sumTodo >= sum) {
        li.style.textDecoration = "line-through";
      } else {
        li.style.textDecoration = "none";
      }

      getStorage(i);
      settings.sumTodo = sumTodo;
      localStorage.setItem("newTodo".concat(i), JSON.stringify(settings));
      return sumTodo;
    };

    downSet.onclick = function () {
      if (sumTodo > 0) {
        --sumTodo;
        counterSet.innerHTML = "".concat(sumTodo, "/").concat(sum);
        button.innerHTML = "".concat(sumTodo, "/").concat(sum);
      }

      if (sumTodo >= sum) {
        li.style.textDecoration = "line-through";
      } else {
        li.style.textDecoration = "none";
      }

      getStorage(i);
      settings.sumTodo = sumTodo;
      localStorage.setItem("newTodo".concat(i), JSON.stringify(settings));
      return sumTodo;
    };

    document.querySelector('.delete').onclick = function () {
      //! Функция удаления ToDo
      li.remove(); // Удаляем весь элемент из окна с ToDo's

      localStorage.removeItem("newTodo".concat(settings.number)); // Чистим LocalStorage от конкретного ToDo

      popup.classList.remove('content1Settigns'); // Закрываем окно с свойствами

      --i;
    };
  };
}

function resetOne(i, nameTodo, caption, settings) {
  var li = document.createElement('li');
  li.className = "newTodo".concat(i);
  document.querySelector('.listToDo').append(li); // Поещаем li внутрь ul

  var h1 = document.createElement('strong');
  h1.innerHTML = "".concat(nameTodo); // Вставляем значение в окно со всеми ToDo's

  document.querySelector(".newTodo".concat(i)).append(h1);
  var button = document.createElement('button');
  button.className = "completeTodo";
  button.innerHTML = "Complete";
  document.querySelector(".newTodo".concat(i)).append(button); // Помещаем кнопку Complete внутри li

  button.onclick = function () {
    //! Эта функция зачеркивает выполненный ToDo, или же в случае ошибки убирает зачеркивание
    if (li.style.textDecoration != "line-through") {
      li.style.textDecoration = "line-through";
      getStorage(i);
      settings.isCompleted = true;
      localStorage.setItem("newTodo".concat(i), JSON.stringify(settings));
    } else {
      li.style.textDecoration = "none";
      getStorage(i);
      settings.isCompleted = false;
      localStorage.setItem("newTodo".concat(i), JSON.stringify(settings));
    }
  };

  if (settings.isCompleted == true) {
    li.style.textDecoration = "line-through";
  }

  h1.onclick = function () {
    //! Эта функция вызывает окно со всеми введеными значениями при создании
    PopUpSetting(); //! Тотже PopUp но предназначенный для отображения свойств ToDo, при его вызове просто подклчаются другие стили Css

    document.querySelector('.nameSettings').innerHTML = "Name: ".concat(nameTodo); // Помещаем в свойства название ToDo по которому нажали 

    document.querySelector('.caption').innerHTML = "Caption: ".concat(caption);
    document.querySelector('.sum').style.display = 'none';

    document.querySelector('.delete').onclick = function () {
      //! Функция удаления ToDo
      li.remove(); // Удаляем весь элемент из окна с ToDo's

      localStorage.removeItem("newTodo".concat(settings.number)); // Чистим LocalStorage от конкретного ToDo

      popup.classList.remove('content1Settigns'); // Закрываем окно с свойствами

      --i;
    };
  };
}

function resetTime(i, nameTodo, caption, settings) {
  var hour = settings.hourSet;
  var minute = settings.minuteSet;
  var second = settings.secondSet;
  var button = document.createElement('button');
  var li = document.createElement('li');
  li.className = "newTodo".concat(i);
  document.querySelector('.listToDo').append(li); // Поещаем li внутрь ul

  var h1 = document.createElement('strong');
  h1.innerHTML = "".concat(nameTodo); // Вставляем значение в окно со всеми ToDo's

  document.querySelector(".newTodo".concat(i)).append(h1);
  button.className = "completeTodo";
  button.innerHTML = "".concat(hour, ":").concat(minute, ":").concat(second);
  document.querySelector(".newTodo".concat(i)).append(button); // Помещаем кнопку Complete внутри li

  function secondMin() {
    if (hour == 0 && minute == 0 && second == 0) {
      clearInterval(add);
      li.style.textDecoration = "line-through";
      return 0;
    }

    if (second == 0) {
      --minute;
      second += 59;
    }

    if (minute == 0 && hour != 0) {
      --hour;
      minute += 59;
    }

    --second;
    document.querySelector('.timer').innerHTML = "Timer: ".concat(hour, ":").concat(minute, ":").concat(second);
    button.innerHTML = "".concat(hour, ":").concat(minute, ":").concat(second);
    console.log(second);
  }

  button.onclick = function () {
    //! Эта функция зачеркивает выполненный ToDo, или же в случае ошибки убирает зачеркивание
    PopUpSetting(); //! Тотже PopUp но предназначенный для отображения свойств ToDo, при его вызове просто подклчаются другие стили Css

    document.querySelector('.nameSettings').innerHTML = "Name: ".concat(nameTodo); // Помещаем в свойства название ToDo по которому нажали 

    document.querySelector('.caption').innerHTML = "Caption: ".concat(caption);
    document.querySelector('.settingsTime').innerHTML = "Time: ".concat(settings.hour, ":").concat(settings.minute, ":").concat(settings.second);
    document.querySelector('.timer').innerHTML = "Timer: ".concat(hour, ":").concat(minute, ":").concat(second);

    document.querySelector('.startTime').onclick = function () {
      add = setInterval(secondMin, 1000);
    };

    document.querySelector('.stopTime').onclick = function () {
      clearInterval(add);
      getStorage(i);
      settings.hourSet = hour;
      settings.minuteSet = minute;
      settings.secondSet = second;
      localStorage.setItem("newTodo".concat(i), JSON.stringify(settings));
    };

    document.querySelector('.sum').style.display = 'none';
    document.querySelector('.time').style.display = 'block';

    document.querySelector('.delete').onclick = function () {
      //! Функция удаления ToDo
      li.remove(); // Удаляем весь элемент из окна с ToDo's

      localStorage.removeItem("newTodo".concat(settings.number)); // Чистим LocalStorage от конкретного ToDo

      popup.classList.remove('content1Settigns'); // Закрываем окно с свойствами

      --i;
    };
  };

  h1.onclick = function () {
    //! Эта функция вызывает окно со всеми введеными значениями при создании
    PopUpSetting(h1); //! Тотже PopUp но предназначенный для отображения свойств ToDo, при его вызове просто подклчаются другие стили Css

    document.querySelector('.nameSettings').innerHTML = "Name: ".concat(nameTodo); // Помещаем в свойства название ToDo по которому нажали 

    document.querySelector('.caption').innerHTML = "Caption: ".concat(caption);
    getStorage(i);
    PopUpSetting(); //! Тотже PopUp но предназначенный для отображения свойств ToDo, при его вызове просто подклчаются другие стили Css

    document.querySelector('.nameSettings').innerHTML = "Name: ".concat(nameTodo); // Помещаем в свойства название ToDo по которому нажали 

    document.querySelector('.caption').innerHTML = "Caption: ".concat(caption);
    document.querySelector('.settingsTime').innerHTML = "Time: ".concat(settings.hour, ":").concat(settings.minute, ":").concat(settings.second);
    document.querySelector('.timer').innerHTML = "Timer: ".concat(hour, ":").concat(minute, ":").concat(second);

    document.querySelector('.startTime').onclick = function () {
      add = setInterval(secondMin, 1000);
    };

    document.querySelector('.stopTime').onclick = function () {
      clearInterval(add);
      getStorage(i);
      settings.hourSet = hour;
      settings.minuteSet = minute;
      settings.secondSet = second;
      localStorage.setItem("newTodo".concat(i), JSON.stringify(settings));
    };

    document.querySelector('.sum').style.display = 'none';
    document.querySelector('.time').style.display = 'block';

    document.querySelector('.delete').onclick = function () {
      //! Функция удаления ToDo
      li.remove(); // Удаляем весь элемент из окна с ToDo's

      localStorage.removeItem("newTodo".concat(settings.number)); // Чистим LocalStorage от конкретного ToDo

      popup.classList.remove('content1Settigns'); // Закрываем окно с свойствами

      --i;
    };

    document.querySelector('.sum').style.display = 'none';
    document.querySelector('.time').style.display = 'block';
  };
}

document.querySelector('.popupButton').onclick = PopUp;
document.querySelector('.addTodo').onclick = addTodo;

function PopUp() {
  if (popup.classList.value === 'popup') {
    popup.classList.add('content1');
  } else {
    popup.classList.remove('content1');
  }
}

function clearSettigns() {
  //! Функция очещает поля в случае отмены
  document.querySelector('.nameTodo').value = ''; // Очищаем input после создания ToDo

  document.querySelector('.captionAdd').value = ''; // Берем значения из TextArea
}

function radio() {
  var k;

  if (radioTime.checked === true) {
    k = 'Time';
  } else if (radioSum.checked === true) {
    k = 'Sum';
  } else if (radioOne.checked === true) {
    k = 'One';
  } else {
    k = 'cancel';
  }

  return k;
}

function radioClick() {
  var diffrentClick = radio();

  if (diffrentClick == 'Sum') {
    activeSum.style.display = 'flex';
    activeTime.style.display = 'none';
    counter();
  } else if (diffrentClick == 'Time') {
    activeSum.style.display = 'none';
    activeTime.style.display = 'flex';
    timeClick();
  } else if (diffrentClick == 'One') {
    activeSum.style.display = 'none';
    activeTime.style.display = 'none';
  }
}

function counter() {
  var j = 0;
  var up = document.querySelector('.upCounter');
  var down = document.querySelector('.downCounter');
  var counter = document.querySelector('.counter');

  up.onclick = function () {
    counter.innerHTML = String(++j);
    return j;
  };

  down.onclick = function () {
    if (j > 0) {
      counter.innerHTML = String(--j);
    }
  };

  return j;
}

function timeClick() {
  var hour = 0;
  var minute = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var hourTimes = _step.value;
      hourTimes.addEventListener('click', function (e) {
        e.preventDefault();
        hour = hourTimes.innerHTML;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = liTimeHour[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var hourTimesActive = _step3.value;

            if (hourTimesActive.innerHTML == hour) {
              hourTimesActive.style.color = 'white';
            } else {
              hourTimesActive.style.color = 'black';
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        return hour;
      });
    };

    for (var _iterator = liTimeHour[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop2 = function _loop2() {
      var minutesTimes = _step2.value;
      minutesTimes.addEventListener('click', function (e) {
        e.preventDefault();
        minute = minutesTimes.innerHTML;
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = liTimeMinute[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var minuteTimesActive = _step4.value;

            if (minuteTimesActive.innerHTML == minute) {
              minuteTimesActive.style.color = 'white';
            } else {
              minuteTimesActive.style.color = 'black';
            }
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        return minute;
      });
    };

    for (var _iterator2 = liTimeMinute[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop2();
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return hour, minute;
}

function createLi(i, nameTodo, caption, settings, diffrentToDo) {
  var sumTodo = 0;
  var sum = Number(document.querySelector('.counter').innerHTML);
  var hour = 0;
  var minute = 0;
  var second = 0;
  var counterSet = document.querySelector('.counterSettings');
  var button = document.createElement('button');
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = liTimeHour[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var hourTimesActive = _step5.value;

      if (hourTimesActive.style.color == 'white') {
        hour = hourTimesActive.innerHTML;
      }
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
        _iterator5["return"]();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = liTimeMinute[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var minutesTimesActive = _step6.value;

      if (minutesTimesActive.style.color == 'white') {
        minute = minutesTimesActive.innerHTML;
      }
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
        _iterator6["return"]();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  var li = document.createElement('li');
  li.className = "newTodo".concat(i);
  document.querySelector('.listToDo').append(li); // Поещаем li внутрь ul

  var h1 = document.createElement('strong');
  h1.innerHTML = "".concat(nameTodo); // Вставляем значение в окно со всеми ToDo's

  document.querySelector(".newTodo".concat(i)).append(h1);

  if (diffrentToDo === 'Time') {
    // Помещаем кнопку Complete внутри li
    var _secondMin = function _secondMin() {
      if (hour == 0 && minute == 0 && second == 0) {
        clearInterval(add);
        li.style.textDecoration = "line-through";
        return 0;
      }

      if (second == 0) {
        --minute;
        second += 59;
      }

      if (minute == 0 && hour != 0) {
        --hour;
        minute += 59;
      }

      --second;
      document.querySelector('.timer').innerHTML = "Timer: ".concat(hour, ":").concat(minute, ":").concat(second);
      button.innerHTML = "".concat(hour, ":").concat(minute, ":").concat(second);
      console.log(second);
    };

    getStorage(i);
    settings.hour = hour;
    settings.minute = minute;
    localStorage.setItem("newTodo".concat(i), JSON.stringify(settings));
    button.className = "completeTodo";
    button.innerHTML = "".concat(hour, ":").concat(minute, ":").concat(second);
    document.querySelector(".newTodo".concat(i)).append(button);

    button.onclick = function () {
      //! Эта функция зачеркивает выполненный ToDo, или же в случае ошибки убирает зачеркивание
      PopUpSetting(); //! Тотже PopUp но предназначенный для отображения свойств ToDo, при его вызове просто подклчаются другие стили Css

      document.querySelector('.nameSettings').innerHTML = "Name: ".concat(nameTodo); // Помещаем в свойства название ToDo по которому нажали 

      document.querySelector('.caption').innerHTML = "Caption: ".concat(caption);
      document.querySelector('.settingsTime').innerHTML = "Time: ".concat(hour, ":").concat(minute, ":").concat(second);
      document.querySelector('.timer').innerHTML = "Timer: ".concat(hour, ":").concat(minute, ":").concat(second);

      document.querySelector('.startTime').onclick = function () {
        add = setInterval(_secondMin, 1000);
      };

      document.querySelector('.stopTime').onclick = function () {
        clearInterval(add);
        getStorage(i);
        settings.hourSet = hour;
        settings.minuteSet = minute;
        settings.secondSet = second;
        localStorage.setItem("newTodo".concat(i), JSON.stringify(settings));
      };

      document.querySelector('.sum').style.display = 'none';
      document.querySelector('.time').style.display = 'block';

      document.querySelector('.delete').onclick = function () {
        //! Функция удаления ToDo
        li.remove(); // Удаляем весь элемент из окна с ToDo's

        localStorage.removeItem("newTodo".concat(settings.number)); // Чистим LocalStorage от конкретного ToDo

        popup.classList.remove('content1Settigns'); // Закрываем окно с свойствами

        --i;
      };
    };
  } else if (diffrentToDo === 'Sum') {
    button.className = "completeTodo";
    button.innerHTML = "".concat(sumTodo, "/").concat(sum);
    document.querySelector(".newTodo".concat(i)).append(button); // Помещаем кнопку Complete внутри li

    getStorage(i);
    settings.sum = sum;
    settings.sumTodo = sumTodo;
    localStorage.setItem("newTodo".concat(i), JSON.stringify(settings));

    button.onclick = function () {
      //! Эта функция зачеркивает выполненный ToDo, или же в случае ошибки убирает зачеркивание
      getStorage(i);
      ++settings.sumTodo;
      button.innerHTML = "".concat(settings.sumTodo, "/").concat(settings.sum);
      counterSet.innerHTML = "".concat(settings.sumTodo, "/").concat(settings.sum);

      if (settings.sumTodo >= settings.sum) {
        li.style.textDecoration = "line-through";
      } else {
        li.style.textDecoration = "none";
      }

      localStorage.setItem("newTodo".concat(i), JSON.stringify(settings));
    };
  } else if (diffrentToDo === 'One') {
    var _button = document.createElement('button');

    getStorage(i);
    settings.isCompleted = false;
    localStorage.setItem("newTodo".concat(i), JSON.stringify(settings));
    _button.className = "completeTodo";
    _button.innerHTML = "Complete";
    document.querySelector(".newTodo".concat(i)).append(_button); // Помещаем кнопку Complete внутри li

    _button.onclick = function () {
      //! Эта функция зачеркивает выполненный ToDo, или же в случае ошибки убирает зачеркивание
      if (li.style.textDecoration != "line-through") {
        li.style.textDecoration = "line-through";
        getStorage(i);
        settings.isCompleted = true;
        localStorage.setItem("newTodo".concat(i), JSON.stringify(settings));
      } else {
        li.style.textDecoration = "none";
        getStorage(i);
        settings.isCompleted = false;
        localStorage.setItem("newTodo".concat(i), JSON.stringify(settings));
      }
    };
  }

  h1.onclick = function () {
    //! Эта функция вызывает окно со всеми введеными значениями при создании
    PopUpSetting(h1); //! Тотже PopUp но предназначенный для отображения свойств ToDo, при его вызове просто подклчаются другие стили Css

    document.querySelector('.nameSettings').innerHTML = "Name: ".concat(nameTodo); // Помещаем в свойства название ToDo по которому нажали 

    document.querySelector('.caption').innerHTML = "Caption: ".concat(caption);
    getStorage(i);

    if (diffrentToDo === 'Time') {
      PopUpSetting(); //! Тотже PopUp но предназначенный для отображения свойств ToDo, при его вызове просто подклчаются другие стили Css

      document.querySelector('.nameSettings').innerHTML = "Name: ".concat(nameTodo); // Помещаем в свойства название ToDo по которому нажали 

      document.querySelector('.caption').innerHTML = "Caption: ".concat(caption);
      document.querySelector('.settingsTime').innerHTML = "Time: ".concat(hour, ":").concat(minute, ":").concat(second);
      document.querySelector('.timer').innerHTML = "Timer: ".concat(hour, ":").concat(minute, ":").concat(second);

      document.querySelector('.startTime').onclick = function () {
        add = setInterval(secondMin, 1000);
      };

      document.querySelector('.stopTime').onclick = function () {
        clearInterval(add);
        getStorage(i);
        settings.hourSet = hour;
        settings.minuteSet = minute;
        settings.secondSet = second;
        localStorage.setItem("newTodo".concat(i), JSON.stringify(settings));
      };

      document.querySelector('.sum').style.display = 'none';
      document.querySelector('.time').style.display = 'block';

      document.querySelector('.delete').onclick = function () {
        //! Функция удаления ToDo
        li.remove(); // Удаляем весь элемент из окна с ToDo's

        localStorage.removeItem("newTodo".concat(settings.number)); // Чистим LocalStorage от конкретного ToDo

        popup.classList.remove('content1Settigns'); // Закрываем окно с свойствами

        --i;
      };

      document.querySelector('.sum').style.display = 'none';
      document.querySelector('.time').style.display = 'block';
    } else if (diffrentToDo === 'Sum') {
      counterSet.innerHTML = "".concat(sumTodo, "/").concat(sum);
      document.querySelector('.sum').style.display = 'flex';
      document.querySelector('.time').style.display = 'none';

      upSet.onclick = function () {
        getStorage(i);
        ++settings.sumTodo;
        button.innerHTML = "".concat(settings.sumTodo, "/").concat(settings.sum);
        counterSet.innerHTML = "".concat(settings.sumTodo, "/").concat(settings.sum);

        if (settings.sumTodo >= settings.sum) {
          li.style.textDecoration = "line-through";
        } else {
          li.style.textDecoration = "none";
        }

        localStorage.setItem("newTodo".concat(i), JSON.stringify(settings));
      };

      downSet.onclick = function () {
        getStorage(i);

        if (settings.sumTodo > 0) {
          --settings.sumTodo;
          button.innerHTML = "".concat(settings.sumTodo, "/").concat(settings.sum);
          counterSet.innerHTML = "".concat(settings.sumTodo, "/").concat(settings.sum);
        }

        if (settings.sumTodo >= settings.sum) {
          li.style.textDecoration = "line-through";
        } else {
          li.style.textDecoration = "none";
        }

        localStorage.setItem("newTodo".concat(i), JSON.stringify(settings));
      };
    } else if (diffrentToDo === 'One') {
      document.querySelector('.sum').style.display = 'none';
      document.querySelector('.time').style.display = 'none';
    }

    document.querySelector('.delete').onclick = function () {
      //! Функция удаления ToDo
      li.remove(); // Удаляем весь элемент из окна с ToDo's

      localStorage.removeItem("newTodo".concat(settings.number)); // Чистим LocalStorage от конкретного ToDo

      popup.classList.remove('content1Settigns'); // Закрываем окно с свойствами

      --i;
    };
  }; // return i, li, h1, button, diffrentToDo

}

function getStorage(number) {
  var settings = JSON.parse(localStorage.getItem("newTodo".concat(number)));
  return settings;
}

function storageAdd(settings, i, nameTodo, caption, diffrentToDo) {
  settings.number = i;
  settings.nameTodo = nameTodo;
  settings.caption = caption;
  settings.diffrentToDo = diffrentToDo;
  localStorage.setItem("newTodo".concat(i), JSON.stringify(settings)); //! Помещаем массив в LocalStorage

  return settings;
}

function addTodo() {
  i++;
  PopUp(); // Вызов окна создания ToDo

  document.querySelector('.different').onclick = function () {
    radioClick();
  };

  document.querySelector('.createAdd').onclick = function () {
    // Обработчик события по нажатию на кнопку Create
    var nameTodo = document.querySelector('.nameTodo').value; // Берем значения из Input

    var caption = document.querySelector('.captionAdd').value; // Берем значения из TextArea

    var settings = {};
    var diffrentToDo = radio();
    console.log(diffrentToDo);

    if (diffrentToDo === 'cancel') {
      return 0;
    }

    storageAdd(settings, i, nameTodo, caption, diffrentToDo);
    createLi(i, nameTodo, caption, settings, diffrentToDo);
    clearSettigns();
    PopUp(); //! Логический конец функции, тут закрывается окно после создания ToDo
  };

  document.querySelector('.cancelAdd').onclick = function () {
    PopUp();
    clearSettigns();
    --i;
  };
}

function PopUpSetting(h1) {
  if (popup.classList.value === 'popup') {
    popup.classList.add('content1Settigns');
  } else if (popup.classList.value === 'content1Settigns' && h1.onclick == true) {
    document.querySelector('.nameSettings').innerHTML = "Name: ".concat(nameTodo); // Помещаем в свойства название ToDo по которому нажали 

    document.querySelector('.caption').innerHTML = "Caption: ".concat(caption);
    upSet.style.display = 'block';
    downSet.style.display = 'block';
  } else if (document.querySelector('.closeSettings').onclick == true) document.querySelector('.closeSettings').onclick = function () {
    popup.classList.remove('content1Settigns');
  };

  document.querySelector('.delete').onclick = function () {
    upSet.style.display = 'none';
    downSet.style.display = 'none';
    popup.classList.remove('content1Settigns');
  };

  document.querySelector('.closeSettings').onclick = function () {
    popup.classList.remove('content1Settigns');
  };
} // document.querySelector('li').onclick = watchSettings
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