(function () {
  "use strict";

  var schedule = document.querySelector(".course-schedule");
  if (!schedule) {
    return;
  }

  var weekButtons = schedule.querySelectorAll(".course-schedule__week-trigger");
  var relatedCells = schedule.querySelectorAll("[data-weeks]");
  var selectedWeek = null;

  function selectWeek(week) {
    selectedWeek = week;

    Array.prototype.forEach.call(weekButtons, function (button) {
      button.setAttribute("aria-pressed", String(button.getAttribute("data-week") === week));
    });

    Array.prototype.forEach.call(relatedCells, function (cell) {
      var weeks = cell.getAttribute("data-weeks").split(/\s+/);
      cell.classList.toggle("is-week-selected", weeks.indexOf(week) !== -1);
    });
  }

  Array.prototype.forEach.call(weekButtons, function (button) {
    button.addEventListener("click", function () {
      var week = button.getAttribute("data-week");
      selectWeek(selectedWeek === week ? null : week);
    });
  });

  schedule.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      selectWeek(null);
    }
  });
}());
