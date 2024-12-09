const calendar = document.getElementById("dates");
const monthYear = document.getElementById("monthYear");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const eventModal = document.getElementById("eventModal");
const closeModalButton = document.getElementById("closeModal");
const saveEventButton = document.getElementById("saveEvent");
const eventDescriptionInput = document.getElementById("eventDescription");

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const events = JSON.parse(localStorage.getItem('events')) || {};

function renderCalendar(month, year) {
  monthYear.textContent = `${months[month]} ${year}`;
  calendar.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Blank spaces for days before the start of the month
  for (let i = 0; i < firstDay; i++) {
    calendar.innerHTML += `<div class="date"></div>`;
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${month}-${day}`;
    const isToday =
      day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    const hasEvent = events[dateKey] !== undefined;

    calendar.innerHTML += `
      <div 
        class="date ${isToday ? "today" : ""} ${hasEvent ? "event" : ""}" 
        onclick="openEventModal(${day}, ${month}, ${year})">
          ${day}
          ${hasEvent ? `<span class="tooltip">${events[dateKey]}</span>` : ""}
      </div>`;
  }
}

function openEventModal(day, month, year) {
  const dateKey = `${year}-${month}-${day}`;
  const existingEvent = events[dateKey] || '';
  eventDescriptionInput.value = existingEvent;
  eventModal.style.display = "flex";
  saveEventButton.onclick = () => saveEvent(day, month, year);
}

function saveEvent(day, month, year) {
  const dateKey = `${year}-${month}-${day}`;
  const eventDescription = eventDescriptionInput.value.trim();
  
  if (eventDescription) {
    events[dateKey] = eventDescription;
  } else {
    delete events[dateKey];
  }

  localStorage.setItem('events', JSON.stringify(events));
  renderCalendar(currentMonth, currentYear);
  closeEventModal();
}

function closeEventModal() {
  eventModal.style.display = "none";
}

prevMonth.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextMonth.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

closeModalButton.addEventListener("click", closeEventModal);

// Initialize the calendar
renderCalendar(currentMonth, currentYear);
