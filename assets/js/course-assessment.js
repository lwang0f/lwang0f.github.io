(function () {
  "use strict";

  var trigger = document.querySelector(".course-assessment__grade-trigger");
  var gradeSheet = document.getElementById("course-grade-sheet");
  var finalTrigger = document.querySelector(".course-assessment__final-trigger");
  var regularPanel = document.getElementById("course-assessment-regular");
  var finalPanel = document.getElementById("course-assessment-final");
  var assessmentItems = document.querySelectorAll(".course-assessment__item");
  var highlightTimer;

  if (!trigger || !finalTrigger || !gradeSheet || !regularPanel || !finalPanel) {
    return;
  }

  function setHighlight(active) {
    window.clearTimeout(highlightTimer);
    trigger.classList.toggle("is-linked-highlight", active);
    gradeSheet.classList.toggle("is-linked-highlight", active);

    if (active) {
      highlightTimer = window.setTimeout(function () {
        setHighlight(false);
      }, 6000);
    }
  }

  function setActivePanel(panel) {
    var regularIsActive = panel === regularPanel && regularPanel.hidden;
    var finalIsActive = panel === finalPanel && finalPanel.hidden;

    regularPanel.hidden = !regularIsActive;
    finalPanel.hidden = !finalIsActive;
    trigger.classList.toggle("is-active", regularIsActive);
    finalTrigger.classList.toggle("is-active", finalIsActive);
    trigger.setAttribute("aria-expanded", String(regularIsActive));
    finalTrigger.setAttribute("aria-expanded", String(finalIsActive));
  }

  trigger.addEventListener("click", function () {
    setActivePanel(regularPanel);
    setHighlight(true);
  });

  finalTrigger.addEventListener("click", function () {
    setActivePanel(finalPanel);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setActivePanel(null);
      setHighlight(false);
    }
  });

  Array.prototype.forEach.call(assessmentItems, function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) {
        return;
      }

      Array.prototype.forEach.call(assessmentItems, function (otherItem) {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    });
  });
}());
