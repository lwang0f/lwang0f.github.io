(function () {
  "use strict";

  var trigger = document.querySelector(".course-assessment__grade-trigger");
  var gradeSheet = document.getElementById("course-grade-sheet");
  var assessmentItems = document.querySelectorAll(".course-assessment__item");
  var assessmentDescription = document.getElementById("course-assessment-description");
  var highlightTimer;

  if (!trigger || !gradeSheet || !assessmentDescription) {
    return;
  }

  function setHighlight(active) {
    window.clearTimeout(highlightTimer);
    trigger.classList.toggle("is-linked-highlight", active);
    gradeSheet.classList.toggle("is-linked-highlight", active);
    trigger.setAttribute("aria-pressed", String(active));

    if (active) {
      highlightTimer = window.setTimeout(function () {
        setHighlight(false);
      }, 6000);
    }
  }

  trigger.addEventListener("click", function () {
    setHighlight(!trigger.classList.contains("is-linked-highlight"));
  });

  document.addEventListener("click", function (event) {
    if (!trigger.contains(event.target) && !gradeSheet.contains(event.target)) {
      setHighlight(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setHighlight(false);
    }
  });

  Array.prototype.forEach.call(assessmentItems, function (item) {
    function showDescription() {
      assessmentDescription.textContent = item.getAttribute("data-assessment-description") || "NA";
    }

    item.addEventListener("mouseenter", showDescription);
    item.addEventListener("focus", showDescription);
  });
}());
