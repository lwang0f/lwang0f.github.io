(function () {
  "use strict";

  var trigger = document.querySelector(".course-assessment__grade-trigger");
  var gradeSheet = document.getElementById("course-grade-sheet");

  if (!trigger || !gradeSheet) {
    return;
  }

  function setHighlight(active) {
    trigger.classList.toggle("is-linked-highlight", active);
    gradeSheet.classList.toggle("is-linked-highlight", active);
    trigger.setAttribute("aria-pressed", String(active));
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
}());
