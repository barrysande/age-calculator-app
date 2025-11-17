'use strict';

const inputDay = document.querySelector('.input-day');
const inputMonth = document.querySelector('.input-month');
const inputYear = document.querySelector('.input-year');

const errorDay = document.querySelector('.error-day');
const errorMonth = document.querySelector('.error-month');
const errorYear = document.querySelector('.error-year');

const outputDay = document.querySelector('.output-day');
const outputMonth = document.querySelector('.output-month');
const outputYearOut = document.querySelector('.output-year');

const submit = document.querySelector('.submit-btn');

function isLeapYear(year) {
  return new Date(year, 1, 29).getMonth() === 1;
}

function daysInMonth(month, year) {
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  return [31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

/* ----------- Validation ----------- */
function validate() {
  const day = Number(inputDay.value);
  const month = Number(inputMonth.value);
  const year = Number(inputYear.value);
  const now = new Date().getFullYear();

  let valid = true;

  errorDay.textContent = '';
  errorMonth.textContent = '';
  errorYear.textContent = '';

  if (!day) {
    errorDay.textContent = 'Required';
    valid = false;
  }
  if (!month) {
    errorMonth.textContent = 'Required';
    valid = false;
  }
  if (!year) {
    errorYear.textContent = 'Required';
    valid = false;
  }

  if (!valid) return false;

  if (day < 1 || day > 31) {
    errorDay.textContent = 'Must be a valid day';
    valid = false;
  }
  if (month < 1 || month > 12) {
    errorMonth.textContent = 'Must be a valid month';
    valid = false;
  }
  if (year > now || year < 1) {
    errorYear.textContent = 'Must be in the past';
    valid = false;
  }

  if (!valid) return false;

  const dim = daysInMonth(month, year);
  if (day > dim) {
    errorDay.textContent = 'Must be a valid date';
    valid = false;
  }

  return valid;
}


function calculateAge() {
  const b = new Date(
    Number(inputYear.value),
    Number(inputMonth.value) - 1,
    Number(inputDay.value)
  );
  const t = new Date();

  let y = t.getFullYear() - b.getFullYear();
  let m = t.getMonth() - b.getMonth();
  let d = t.getDate() - b.getDate();

  if (d < 0) {
    m--;
    d += new Date(t.getFullYear(), t.getMonth(), 0).getDate();
  }
  if (m < 0) {
    m += 12;
    y--;
  }

  return { y, m, d };
}


function showAge({ y, m, d }) {
  outputYearOut.textContent = y;
  outputMonth.textContent = m;
  outputDay.textContent = d;
}

function clearOutput() {
  outputYearOut.textContent = '--';
  outputMonth.textContent = '--';
  outputDay.textContent = '--';
}


[inputDay, inputMonth, inputYear].forEach((el) => {
  el.addEventListener('input', () => {
    const ok = validate();
    submit.disabled = !ok;
    if (!ok) clearOutput();
  });
});

submit.addEventListener('click', (e) => {
  e.preventDefault();
  if (!validate()) return;
  showAge(calculateAge());
});


submit.disabled = true;
clearOutput();
