(function () {
  "use strict";

  var trigger = document.querySelector(".course-assessment__grade-trigger");
  var regularPanel = document.getElementById("course-assessment-regular");
  var assessmentItems = document.querySelectorAll(".course-assessment__item");
  var toolLinks = document.querySelectorAll(".course-assessment__tool-link");
  var toolHighlightTimer;
  var highlightedToolLink;
  var highlightedToolTarget;

  if (!trigger || !regularPanel) {
    return;
  }

  function setRegularPanel(open) {
    regularPanel.hidden = !open;
    trigger.classList.toggle("is-active", open);
    trigger.setAttribute("aria-expanded", String(open));
  }

  function clearToolHighlight() {
    window.clearTimeout(toolHighlightTimer);

    if (highlightedToolLink) {
      highlightedToolLink.classList.remove("is-linked-highlight");
    }

    if (highlightedToolTarget) {
      highlightedToolTarget.classList.remove("is-linked-highlight");
    }

    highlightedToolLink = null;
    highlightedToolTarget = null;
  }

  function setToolHighlight(link, target) {
    clearToolHighlight();
    highlightedToolLink = link;
    highlightedToolTarget = target;
    link.classList.add("is-linked-highlight");
    target.classList.add("is-linked-highlight");

    toolHighlightTimer = window.setTimeout(clearToolHighlight, 6000);
  }

  trigger.addEventListener("click", function () {
    setRegularPanel(regularPanel.hidden);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setRegularPanel(false);
      clearToolHighlight();
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

  Array.prototype.forEach.call(toolLinks, function (link) {
    link.addEventListener("click", function (event) {
      var target = document.getElementById(link.getAttribute("data-course-tool-target"));

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      setToolHighlight(link, target);
    });
  });
}());
