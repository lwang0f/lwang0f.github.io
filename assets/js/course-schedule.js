(function () {
  "use strict";

  var schedule = document.querySelector(".course-schedule");
  if (!schedule) {
    return;
  }

  var chapterCells = schedule.querySelectorAll("[data-chapter]");
  var weekCells = schedule.querySelectorAll("[data-week]");
  var selectedChapter = null;
  var hoveredChapter = null;
  var hoveredWeek = null;
  var focusedWeek = null;

  function selectChapter(chapter) {
    selectedChapter = chapter;
    Array.prototype.forEach.call(chapterCells, function (cell) {
      var selected = cell.getAttribute("data-chapter") === chapter;
      var button = cell.querySelector(".course-schedule__chapter-trigger");
      cell.classList.toggle("is-chapter-selected", selected);
      if (button) {
        button.setAttribute("aria-pressed", String(selected));
      }
    });
  }

  function highlightWeek() {
    var week = hoveredWeek || focusedWeek;
    Array.prototype.forEach.call(weekCells, function (cell) {
      cell.classList.toggle("is-week-hovered", cell.getAttribute("data-week") === week);
    });
  }

  function highlightChapter() {
    Array.prototype.forEach.call(chapterCells, function (cell) {
      cell.classList.toggle("is-chapter-hovered", hoveredChapter !== null && cell.getAttribute("data-chapter") === hoveredChapter);
    });
  }

  Array.prototype.forEach.call(chapterCells, function (cell) {
    cell.addEventListener("click", function (event) {
      // Keep resource links working without changing the chapter selection.
      if (event && event.target && event.target.closest && event.target.closest("a")) {
        return;
      }
      var chapter = cell.getAttribute("data-chapter");
      selectChapter(selectedChapter === chapter ? null : chapter);
    });
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

  schedule.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      selectChapter(null);
    }
  });
}());
