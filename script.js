var button = document.getElementById('myButton');

// Attach a click event listener to the button
button.addEventListener('click', function() {
  const yearOutput = document.getElementById('yearOutput');
  const monthOutput = document.getElementById('monthOutput');
  const dayOutput = document.getElementById('dayOutput');

  const spanDay = document.getElementById('spanDay');
  spanDay.style.color = "black"
  const spanMonth = document.getElementById('spanMonth');
  spanMonth.style.color = "black"
  const spanYear = document.getElementById('spanYear');
  spanYear.style.color = "black"

  const dayInput = document.getElementById("day");
  dayInput.style.borderColor = 'grey'
  const monthInput = document.getElementById("month");
  monthInput.style.borderColor = 'grey'
  const yearInput = document.getElementById("year");
  yearInput.style.borderColor = 'grey'

  const errday = document.getElementById("error-day");
  errday.innerHTML = ''
  const errmonth = document.getElementById("error-month");
  errmonth.innerHTML = ''
  const erryear = document.getElementById("error-year");
  erryear.innerHTML = ''

  let isBlank = false

  if(!dayInput.value) {
    errday.innerHTML= "this field is required"
    dayInput.style.borderColor = "red"
    spanDay.style.color = "red"

    isBlank = true
  }
  
  if(!monthInput.value){
    errmonth.innerHTML="this field is required"
    monthInput.style.borderColor = "red"
    spanMonth.style.color = "red"

    isBlank = true
  }

  if(!yearInput.value){
    erryear.innerHTML="this field is required"
    yearInput.style.borderColor = "red"
    spanYear.style.color = "red"

    isBlank = true
  } 

  if(!isBlank) {
    let day = parseInt(dayInput.value, 10);
    let month = parseInt(monthInput.value, 10);
    let year = parseInt(yearInput.value, 10);

    let isValid = true
    if (!isValidDate(day, month, year)) {
        errday.innerHTML="invalid day"
        dayInput.style.borderColor = "red"
        spanDay.style.color = "red"

        isValid = false
    }

    if (month < 1 || month > 12) {
        errmonth.innerHTML="invalid month"
        monthInput.style.borderColor = "red"
        spanMonth.style.color = "red"

        isValid = false
    }

    if (year < 1900 || year > 2099) {
        erryear.innerHTML="invalid year"
        yearInput.style.borderColor = "red"
        spanYear.style.color = "red"

        isValid = false
    }

    if(isValid) {
        let age = calculateAge(day, month, year);
        yearOutput.textContent = age.years ;
        monthOutput.textContent = age.months ;
        dayOutput.textContent = age.days; 
    }

  }
  return false;
    
});


function calculateAge(day, month, year) {
    var today = new Date();
    var currentYear = today.getFullYear();
    var currentMonth = today.getMonth() + 1; // getMonth() returns zero-based index
    var currentDay = today.getDate();
  
    var years = currentYear - year;
    var months = currentMonth - month;
    var days = currentDay - day;
  
    // Adjust the age if the current month and day are before the birthdate
    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }
  
    // Adjust the months if the birthdate day is greater than the current day
    if (days < 0) {
      months--;
      var monthDays = new Date(year, currentMonth - 1, 0).getDate();
      days += monthDays;
    }
  
    return {  
        days: days,
        months: months,
        years: years    
    };
}

function isValidDate(day, month, year) {
  //28, 02, 2019
  // Check if the month is valid
  if (month < 1 || month > 12) {
    return false;
  }

  // Check if the day is valid based on the month
  switch (month) {
    case 2: // February
      if (day < 1 || day > 28) {
        // Check for leap year in February
        if (day === 29 && isLeapYear(year)) {
          return true;
        }
        return false;
      }
      break;
    case 4: // April
    case 6: // June
    case 9: // September
    case 11: // November
      if (day < 1 || day > 30) {
        return false;
      }
      break;
    default: // All other months
      if (day < 1 || day > 31) {
        return false;
      }
      break;
  }

  return true;
}

// Function to check if a year is a leap year
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

