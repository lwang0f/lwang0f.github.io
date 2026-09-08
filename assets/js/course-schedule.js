(function () {
  "use strict";

  var schedule = document.querySelector(".course-schedule");
  if (!schedule) {
    return;
  }

  var chapterCells = schedule.querySelectorAll("[data-chapter]");
  var weekCells = schedule.querySelectorAll("[data-week]") || [];
  var assessmentRows = schedule.querySelectorAll(".course-schedule__assessment-row[id]") || [];
  var hoveredChapter = null;
  var hoveredWeek = null;
  var focusedWeek = null;

  function highlightWeek() {
    var week = hoveredWeek || focusedWeek;
    Array.prototype.forEach.call(weekCells, function (cell) {
      if (cell.classList.contains("course-schedule__assessment-row")) {
        return;
      }
      cell.classList.toggle("is-week-hovered", cell.getAttribute("data-week") === week);
    });
    Array.prototype.forEach.call(assessmentRows, function (row) {
      row.classList.remove("is-week-hovered");
    });
  }

  function highlightChapter() {
    Array.prototype.forEach.call(chapterCells, function (cell) {
      cell.classList.toggle("is-chapter-hovered", hoveredChapter !== null && cell.getAttribute("data-chapter") === hoveredChapter);
    });
  }

  Array.prototype.forEach.call(chapterCells, function (cell) {
    cell.addEventListener("pointerenter", function (event) {
      if (event.pointerType === "touch") {
        return;
      }
      hoveredChapter = cell.getAttribute("data-chapter");
      highlightChapter();
    });
    cell.addEventListener("pointerleave", function () {
      hoveredChapter = null;
      highlightChapter();
    });
  });

  Array.prototype.forEach.call(weekCells, function (cell) {
    if (cell.classList.contains("course-schedule__assessment-row")) {
      return;
    }
    cell.addEventListener("pointerenter", function (event) {
      if (event.pointerType === "touch") {
        return;
      }
      hoveredWeek = cell.getAttribute("data-week");
      highlightWeek();
    });
    cell.addEventListener("pointerleave", function () {
      hoveredWeek = null;
      highlightWeek();
    });
    cell.addEventListener("focusin", function () {
      focusedWeek = cell.getAttribute("data-week");
      highlightWeek();
    });
    cell.addEventListener("focusout", function (event) {
      if (!cell.contains(event.relatedTarget)) {
        focusedWeek = null;
        highlightWeek();
      }
    });
  });

  Array.prototype.forEach.call(assessmentRows, function (row) {
    row.addEventListener("pointerenter", function (event) {
      if (event.pointerType !== "touch") {
        row.classList.add("is-assessment-hovered");
      }
    });
    row.addEventListener("pointerleave", function () {
      row.classList.remove("is-assessment-hovered");
    });
  });

}());
