(function () {
  "use strict";

  var trigger = document.querySelector(".course-assessment__grade-trigger");
  var gradeSheet = document.getElementById("course-grade-sheet");
  var regularPanel = document.getElementById("course-assessment-regular");
  var assessmentItems = document.querySelectorAll(".course-assessment__item");
  var highlightTimer;

  if (!trigger || !gradeSheet || !regularPanel) {
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

  function setRegularPanel(open) {
    regularPanel.hidden = !open;
    trigger.classList.toggle("is-active", open);
    trigger.setAttribute("aria-expanded", String(open));
  }

  trigger.addEventListener("click", function () {
    setRegularPanel(regularPanel.hidden);
    setHighlight(true);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setRegularPanel(false);
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
