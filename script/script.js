// @TODO ИМЕНА КЛАССОВ С БОЛЬШОЙ БУКВЫ

let selectMonth = document.querySelector(".month");
let selectYear = document.querySelector(".year");
let calendar = document.querySelector(".calendar_month");

let storage = {};

class CalendarCell {
    constructor(day, weekDay, text) {
        this.day = day;
        if (weekDay === 0) {
            weekDay = 7;
        }
        this.weekDay = weekDay;
        this.holiday = weekDay === 6 || weekDay === 7;
        this.text = text;
    }
}

let listenerSelect = function() {
    let cells = [];
    let year = selectYear.options[selectYear.selectedIndex].value;
    let month = Number(selectMonth.options[selectMonth.selectedIndex].value);

    calendar.innerHTML = "";

    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
        let date = new Date(year, month, day);
        let weekDay = date.getDay();
        let text = storage[String(year) + String(month + 1) + String(day)];
        if (!text) {
            text = "";
        }

        cells.push(new CalendarCell(day, weekDay, text));
    }

    createCalendarCell(cells);
}

function initApp() {

    for (let year = 2000; year <= 2030; year++) {
        let newOption = new Option(year);

        selectYear.append(newOption);
    }

    selectYear.addEventListener("change", listenerSelect);
    selectMonth.addEventListener("change", listenerSelect);
}

function createCalendarCell(cells) {

    let firstDay = cells[0];
    let weekDay = firstDay.weekDay;

    for (let d = 1; d < weekDay; d++) {
        let emCell = document.createElement('div');
        emCell.className = 'month_day empty';

        calendar.appendChild(emCell);
    }

    for (let cellObj of cells) {
        const cell = document.createElement('div');
        let textarea = document.createElement('textarea');
        cell.className = 'month_day';
        textarea.setAttribute("maxlength", "17");

        if (cellObj.holiday) {
            cell.classList.add('holiday');
        }

        cell.innerText = cellObj.day;

        cell.appendChild(textarea);
        calendar.appendChild(cell);

        textarea.value = cellObj.text;
        textarea.addEventListener("change", blessSave);
    }
}

let blessSave = function(event) {
    let dayCell = event.currentTarget.closest(".month_day");
    let year = selectYear.options[selectYear.selectedIndex].value;
    let month = Number(selectMonth.options[selectMonth.selectedIndex].value);
    let body = document.body;

    let data = String(year) + String(month + 1) + String(dayCell.innerText);

    storage[data] = event.currentTarget.value;

    if (event.currentTarget.value === "котик") {
        let textareas = document.querySelectorAll('textarea');
        body.classList.add('paschal');
        selectYear.classList.add('theme');
        selectMonth.classList.add('theme');

        for(let area of textareas) {
            area.classList.add('theme');
        }
    }
}

initApp();