(function () {
  "use strict";

  var schedule = document.querySelector(".course-schedule");
  if (!schedule) {
    return;
  }

  var chapterCells = schedule.querySelectorAll("[data-chapter]");
  var weekCells = schedule.querySelectorAll("[data-week]") || [];
  var assessmentRows = schedule.querySelectorAll(".course-schedule__assessment-row") || [];
  var resourceDomainElements = schedule.querySelectorAll("[data-resource-domain], .course-schedule__resources");
  var tableWrap = schedule.querySelector(".course-schedule__table-wrap");
  var groupOverlay = document.createElement("div");
  var resourceDomainOverlay = document.createElement("div");
  var crossSeam = document.createElement("div");
  var hoveredChapter = null;
  var hoveredChapterSource = null;
  var hoveredWeek = null;
  var hoveredWeekSource = null;
  var focusedWeek = null;
  var hoverLockTimer;
  var touchTracking = null;

  groupOverlay.className = "course-schedule__group-overlay";
  groupOverlay.setAttribute("aria-hidden", "true");
  tableWrap.appendChild(groupOverlay);
  resourceDomainOverlay.className = "course-schedule__resource-domain-overlay";
  resourceDomainOverlay.setAttribute("aria-hidden", "true");
  tableWrap.appendChild(resourceDomainOverlay);
  crossSeam.className = "course-schedule__cross-seam";
  crossSeam.setAttribute("aria-hidden", "true");
  tableWrap.appendChild(crossSeam);

  function updateCrossSeam() {
    if (!groupOverlay.classList.contains("is-visible") || !resourceDomainOverlay.classList.contains("is-visible")) {
      crossSeam.classList.remove("is-visible");
      return;
    }

    var groupRect = groupOverlay.getBoundingClientRect();
    var domainRect = resourceDomainOverlay.getBoundingClientRect();
    var left = Math.max(groupRect.left, domainRect.left);
    var top = Math.max(groupRect.top, domainRect.top);
    var right = Math.min(groupRect.right, domainRect.right);
    var bottom = Math.min(groupRect.bottom, domainRect.bottom);

    if (right <= left || bottom <= top) {
      crossSeam.classList.remove("is-visible");
      return;
    }

    var wrapRect = tableWrap.getBoundingClientRect();
    if (schedule.classList.contains("is-resource-entry-focus-mode")) {
      // Keep the union's outer outline while erasing only its internal join.
      crossSeam.style.left = (domainRect.left - wrapRect.left + tableWrap.scrollLeft - 1) + "px";
      crossSeam.style.top = (top - wrapRect.top + tableWrap.scrollTop + 2) + "px";
      crossSeam.style.width = "4px";
      crossSeam.style.height = Math.max(0, bottom - top - 4) + "px";
    } else {
      crossSeam.style.left = (left - wrapRect.left + tableWrap.scrollLeft) + "px";
      crossSeam.style.top = (top - wrapRect.top + tableWrap.scrollTop) + "px";
      crossSeam.style.width = (right - left) + "px";
      crossSeam.style.height = (bottom - top) + "px";
    }
    crossSeam.classList.add("is-visible");
  }

  function clearGroupFrame(cells, prefix) {
    var allCells = schedule.querySelectorAll("tbody th, tbody td");
    Array.prototype.forEach.call(allCells, function (cell) {
      cell.classList.remove(
        "is-course-group-visible",
        "is-chapter-group-fill",
        "is-week-group-fill",
        "is-assessment-group-fill",
        "is-chapter-group-inner-left",
        "is-week-group-inner-left",
        "is-assessment-group-inner-left",
        "is-" + prefix + "-group-fill",
        "is-" + prefix + "-group-top",
        "is-" + prefix + "-group-right",
        "is-" + prefix + "-group-bottom",
        "is-" + prefix + "-group-left",
        "is-" + prefix + "-group-top-left",
        "is-" + prefix + "-group-top-right",
        "is-" + prefix + "-group-bottom-right",
        "is-" + prefix + "-group-bottom-left",
        "is-" + prefix + "-group-inner-left"
      );
    });
    groupOverlay.classList.remove("is-visible");
    updateCrossSeam();
  }

  function getColumnEdges() {
    var weekCell = schedule.querySelector(".course-schedule__week");
    var contentCell = schedule.querySelector(".course-schedule__content");
    var chapterResource = schedule.querySelector(".course-schedule__resources[data-chapter]");
    var notesResource = schedule.querySelector(".course-schedule__resources--notes");
    var table = schedule.querySelector("table");

    return {
      weekLeft: weekCell.getBoundingClientRect().left,
      contentLeft: contentCell.getBoundingClientRect().left,
      contentRight: contentCell.getBoundingClientRect().right,
      chapterRight: chapterResource.getBoundingClientRect().right,
      notesRight: notesResource.getBoundingClientRect().right,
      examRight: table.getBoundingClientRect().right
    };
  }

  function getContentWeek(cell) {
    var headers = cell.getAttribute("headers") || "";
    var match = headers.match(/schedule-week-(\d+)/);
    return match ? match[1] : null;
  }

  function getWeekHoverSource(cell) {
    if (cell.classList.contains("course-schedule__resources--exam-resources")) {
      return "exam";
    }
    return cell.classList.contains("course-schedule__resources--notes") ? "notes" : "week";
  }

  function isEmptyResourceCell(cell) {
    return cell.classList.contains("course-schedule__resources") &&
      !cell.querySelector(".course-schedule__resource-group") &&
      !cell.textContent.trim();
  }

  function isInteractiveResourceCell(cell) {
    return cell.classList.contains("course-schedule__resources") &&
      !isEmptyResourceCell(cell);
  }

  function isAfterTheoryTimeline(cell) {
    return Boolean(cell.closest(".course-schedule__late-weeks-row, .course-schedule__final-review-row"));
  }

  function getResourceDomain(cell) {
    if (!cell) {
      return null;
    }
    var explicitDomain = cell.getAttribute("data-resource-domain");
    if (explicitDomain) {
      return explicitDomain === "theory" && isAfterTheoryTimeline(cell) ? null : explicitDomain;
    }
    if (cell.classList.contains("course-schedule__resources--exam-resources")) {
      return "examples";
    }
    if (isAfterTheoryTimeline(cell)) {
      return null;
    }
    return cell.classList.contains("course-schedule__resources") ? "theory" : null;
  }

  function highlightResourceDomain(domain) {
    var activeElements = [];
    Array.prototype.forEach.call(resourceDomainElements, function (element) {
      var isActive = Boolean(domain) && getResourceDomain(element) === domain;
      element.classList.toggle("is-resource-domain-hovered", isActive);
      if (isActive) {
        activeElements.push(element);
      }
    });

    if (!activeElements.length) {
      resourceDomainOverlay.classList.remove("is-visible");
      updateCrossSeam();
      return;
    }

    var rects = activeElements.map(function (element) {
      return { element: element, rect: element.getBoundingClientRect() };
    });
    var minTop = Math.min.apply(null, rects.map(function (item) { return item.rect.top; }));
    var maxBottom = Math.max.apply(null, rects.map(function (item) { return item.rect.bottom; }));
    var minLeft = Math.min.apply(null, rects.map(function (item) { return item.rect.left; }));
    var maxRight = Math.max.apply(null, rects.map(function (item) { return item.rect.right; }));

    var wrapRect = tableWrap.getBoundingClientRect();
    resourceDomainOverlay.style.left = (minLeft - wrapRect.left + tableWrap.scrollLeft) + "px";
    resourceDomainOverlay.style.top = (minTop - wrapRect.top + tableWrap.scrollTop) + "px";
    resourceDomainOverlay.style.width = (maxRight - minLeft) + "px";
    resourceDomainOverlay.style.height = (maxBottom - minTop) + "px";
    resourceDomainOverlay.classList.add("is-visible");
    updateCrossSeam();
  }

  function clearResourceDomainHover() {
    Array.prototype.forEach.call(resourceDomainElements, function (element) {
      element.classList.remove("is-resource-domain-hovered");
    });
    resourceDomainOverlay.classList.remove("is-visible");
    updateCrossSeam();
  }

  function isHoverLocked() {
    return schedule.classList.contains("is-link-transition");
  }

  function clearResourceEntryFocus() {
    schedule.classList.remove("is-resource-entry-focus-mode");
    Array.prototype.forEach.call(schedule.querySelectorAll(".is-resource-entry-focused"), function (cell) {
      cell.classList.remove("is-resource-entry-focused");
    });
  }

  function focusResourceEntry(cell) {
    if (!isInteractiveResourceCell(cell)) {
      return;
    }
    clearResourceEntryFocus();
    schedule.classList.add("is-resource-entry-focus-mode");
    cell.classList.add("is-resource-entry-focused");
  }

  function clearScheduleHover() {
    hoveredChapter = null;
    hoveredChapterSource = null;
    hoveredWeek = null;
    hoveredWeekSource = null;
    focusedWeek = null;
    Array.prototype.forEach.call(chapterCells, function (cell) {
      cell.classList.remove("is-chapter-hovered");
    });
    Array.prototype.forEach.call(weekCells, function (cell) {
      cell.classList.remove("is-week-hovered");
      cell.classList.remove("is-week-resource-suppressed");
    });
    Array.prototype.forEach.call(assessmentRows, function (row) {
      row.classList.remove("is-assessment-hovered");
      Array.prototype.forEach.call(row.cells, function (cell) {
        cell.classList.remove("is-assessment-hovered");
      });
    });
    clearResourceEntryFocus();
    clearResourceDomainHover();
    clearGroupFrame([], "link");
  }

  function frameHoveredGroup(cells, activeClass, prefix, horizontalRange, revealTimelineText, includeAssessmentTimeline) {
    clearGroupFrame(cells, prefix);

    var activeCells = Array.prototype.filter.call(cells, function (cell) {
      return cell.classList.contains(activeClass);
    });
    if (!activeCells.length) {
      return;
    }

    var rects = activeCells.map(function (cell) {
      return { cell: cell, rect: cell.getBoundingClientRect() };
    });
    var minTop = Math.min.apply(null, rects.map(function (item) { return item.rect.top; }));
    var maxBottom = Math.max.apply(null, rects.map(function (item) { return item.rect.bottom; }));
    var minLeft = Math.min.apply(null, rects.map(function (item) { return item.rect.left; }));
    var maxRight = Math.max.apply(null, rects.map(function (item) { return item.rect.right; }));

    if (horizontalRange) {
      minLeft = horizontalRange.left;
      maxRight = horizontalRange.right;
    }

    if (revealTimelineText) {
      Array.prototype.forEach.call(schedule.querySelectorAll(".course-schedule__week, .course-schedule__content"), function (cell) {
        var rect = cell.getBoundingClientRect();
        var belongsToAssessment = cell.closest(".course-schedule__assessment-row");
        var overlapsVertically = rect.top < maxBottom - 1 && rect.bottom > minTop + 1;
        if (overlapsVertically && (!belongsToAssessment || includeAssessmentTimeline)) {
          cell.classList.add("is-course-group-visible");
        }
      });
    }
    var wrapRect = tableWrap.getBoundingClientRect();
    groupOverlay.style.left = (minLeft - wrapRect.left + tableWrap.scrollLeft) + "px";
    groupOverlay.style.top = (minTop - wrapRect.top + tableWrap.scrollTop) + "px";
    groupOverlay.style.width = (maxRight - minLeft) + "px";
    groupOverlay.style.height = (maxBottom - minTop) + "px";
    groupOverlay.classList.add("is-visible");
    updateCrossSeam();
  }

  function highlightWeek() {
    var week = hoveredWeek || focusedWeek;
    var edges = getColumnEdges();
    var resourceFocus = schedule.classList.contains("is-resource-entry-focus-mode");
    Array.prototype.forEach.call(weekCells, function (cell) {
      if (cell.classList.contains("course-schedule__assessment-row")) {
        return;
      }
      var matchesWeek = cell.getAttribute("data-week") === week;
      var isWeekCell = cell.classList.contains("course-schedule__week");
      var isNotesCell = cell.classList.contains("course-schedule__resources--notes");
      var isExamCell = cell.classList.contains("course-schedule__resources--exam-resources");
      var includeCell = isWeekCell || (!resourceFocus && (
        (hoveredWeekSource === "notes" && isNotesCell) ||
        (hoveredWeekSource === "exam" && isExamCell)
      ));
      cell.classList.toggle("is-week-hovered", matchesWeek && includeCell);
      cell.classList.toggle("is-week-resource-suppressed", matchesWeek && hoveredWeekSource === "exam" && isNotesCell);
    });
    Array.prototype.forEach.call(assessmentRows, function (row) {
      row.classList.remove("is-week-hovered");
    });
    frameHoveredGroup(weekCells, "is-week-hovered", "week", week ? {
      left: edges.weekLeft,
      right: resourceFocus ? (getResourceDomain(schedule.querySelector(".is-resource-entry-focused")) === "examples" ? edges.examRight : edges.notesRight) : (hoveredWeekSource === "exam" ? edges.examRight : (hoveredWeekSource === "notes" ? edges.notesRight : edges.contentRight))
    } : null, true);
  }

  function highlightChapter() {
    var edges = getColumnEdges();
    var resourceFocus = schedule.classList.contains("is-resource-entry-focus-mode");
    Array.prototype.forEach.call(chapterCells, function (cell) {
      var matchesChapter = hoveredChapter !== null && cell.getAttribute("data-chapter") === hoveredChapter;
      var includeCell = cell.classList.contains("course-schedule__content") || (!resourceFocus && hoveredChapterSource === "resource");
      cell.classList.toggle("is-chapter-hovered", matchesChapter && includeCell);
    });
    frameHoveredGroup(chapterCells, "is-chapter-hovered", "chapter", hoveredChapter !== null ? {
      left: hoveredChapterSource === "resource" ? edges.contentLeft : edges.weekLeft,
      right: resourceFocus ? (getResourceDomain(schedule.querySelector(".is-resource-entry-focused")) === "examples" ? edges.examRight : edges.notesRight) : (hoveredChapterSource === "resource" ? edges.chapterRight : edges.contentRight)
    } : null, hoveredChapterSource === "content");
  }

  function highlightAssessment(row, sourceCell) {
    var edges = getColumnEdges();
    var enteredFromResources = sourceCell.classList.contains("course-schedule__resources");
    var resourceFocus = schedule.classList.contains("is-resource-entry-focus-mode");
    row.classList.add("is-assessment-hovered");
    Array.prototype.forEach.call(row.cells, function (cell) {
      var isTimelineCell = cell.classList.contains("course-schedule__week") || cell.classList.contains("course-schedule__assessment-content");
      var isResourceEntryCell = cell.classList.contains("course-schedule__week") || cell.classList.contains("course-schedule__resources");
      cell.classList.toggle("is-assessment-hovered", enteredFromResources && !resourceFocus ? isResourceEntryCell : isTimelineCell);
    });
    frameHoveredGroup(row.cells, "is-assessment-hovered", "assessment", {
      left: edges.weekLeft,
      right: resourceFocus ? (getResourceDomain(schedule.querySelector(".is-resource-entry-focused")) === "examples" ? edges.examRight : edges.notesRight) : (enteredFromResources ? edges.examRight : edges.contentRight)
    }, enteredFromResources, enteredFromResources);
  }

  function clearAssessmentHighlight(row) {
    row.classList.remove("is-assessment-hovered");
    Array.prototype.forEach.call(row.cells, function (cell) {
      cell.classList.remove("is-assessment-hovered");
    });
    frameHoveredGroup(row.cells, "is-assessment-hovered", "assessment");
  }

  function getScheduleCell(target) {
    if (!target || target.nodeType !== 1) {
      return null;
    }
    var cell = target.closest("th, td");
    return cell && schedule.contains(cell) ? cell : null;
  }

  function showTouchFeedback(cell) {
    var assessmentRow = cell.closest(".course-schedule__assessment-row");
    var resourceDomain = getResourceDomain(cell);

    clearScheduleHover();
    if (isInteractiveResourceCell(cell)) {
      focusResourceEntry(cell);
    }
    if (resourceDomain) {
      highlightResourceDomain(resourceDomain);
    }
    if (isEmptyResourceCell(cell)) {
      return;
    }
    if (assessmentRow) {
      highlightAssessment(assessmentRow, cell);
      return;
    }

    if (cell.hasAttribute("data-chapter")) {
      if (cell.classList.contains("course-schedule__content")) {
        hoveredWeek = getContentWeek(cell);
        hoveredWeekSource = "content";
        highlightWeek();
      } else {
        hoveredChapter = cell.getAttribute("data-chapter");
        hoveredChapterSource = "resource";
        highlightChapter();
      }
      return;
    }

    if (cell.hasAttribute("data-week")) {
      hoveredWeek = cell.getAttribute("data-week");
      hoveredWeekSource = getWeekHoverSource(cell);
      highlightWeek();
    }
  }

  Array.prototype.forEach.call(resourceDomainElements, function (element) {
    element.addEventListener("pointerenter", function (event) {
      if (event.pointerType === "touch" || isHoverLocked()) {
        return;
      }
      if (isInteractiveResourceCell(element)) {
        focusResourceEntry(element);
      }
      highlightResourceDomain(getResourceDomain(element));
    });
    element.addEventListener("pointerleave", function (event) {
      if (event.pointerType === "touch" || isHoverLocked()) {
        return;
      }
      if (isInteractiveResourceCell(element)) {
        clearResourceEntryFocus();
      }
      clearResourceDomainHover();
    });
    element.addEventListener("focusin", function (event) {
      if (!isHoverLocked()) {
        focusResourceEntry(element);
      }
    });
    element.addEventListener("focusout", function (event) {
      if (!isHoverLocked() && !element.contains(event.relatedTarget)) {
        clearResourceEntryFocus();
      }
    });
  });

  function clearTouchFeedback() {
    touchTracking = null;
    clearScheduleHover();
  }

  function finishTouchFeedback() {
    touchTracking = null;
  }

  function beginTouchFeedback(target, clientX, clientY, identifier) {
    var cell = getScheduleCell(target);
    if (!cell || isHoverLocked()) {
      return;
    }
    touchTracking = {
      identifier: identifier,
      moved: false,
      x: clientX,
      y: clientY
    };
    showTouchFeedback(cell);
  }

  function moveTouchFeedback(clientX, clientY, identifier) {
    if (!touchTracking || touchTracking.identifier !== identifier || touchTracking.moved) {
      return;
    }
    if (Math.abs(clientX - touchTracking.x) > 12 || Math.abs(clientY - touchTracking.y) > 12) {
      touchTracking.moved = true;
      clearScheduleHover();
    }
  }

  Array.prototype.forEach.call(chapterCells, function (cell) {
    cell.addEventListener("pointerenter", function (event) {
      if (event.pointerType === "touch" || isHoverLocked()) {
        return;
      }
      if (cell.classList.contains("course-schedule__content")) {
        hoveredWeek = getContentWeek(cell);
        hoveredWeekSource = "content";
        highlightWeek();
      } else {
        hoveredChapter = cell.getAttribute("data-chapter");
        hoveredChapterSource = "resource";
        highlightChapter();
      }
    });
    cell.addEventListener("pointerleave", function (event) {
      if (event.pointerType === "touch" || isHoverLocked()) {
        return;
      }
      if (cell.classList.contains("course-schedule__content")) {
        hoveredWeek = null;
        hoveredWeekSource = null;
        highlightWeek();
      } else {
        hoveredChapter = null;
        hoveredChapterSource = null;
        highlightChapter();
      }
    });
  });

  Array.prototype.forEach.call(weekCells, function (cell) {
    if (cell.classList.contains("course-schedule__assessment-row")) {
      return;
    }
    cell.addEventListener("pointerenter", function (event) {
      if (event.pointerType === "touch" || isHoverLocked()) {
        return;
      }
      hoveredWeek = cell.getAttribute("data-week");
      hoveredWeekSource = getWeekHoverSource(cell);
      highlightWeek();
    });
    cell.addEventListener("pointerleave", function (event) {
      if (event.pointerType === "touch" || isHoverLocked()) {
        return;
      }
      hoveredWeek = null;
      hoveredWeekSource = null;
      highlightWeek();
    });
    cell.addEventListener("focusin", function () {
      if (isHoverLocked()) {
        return;
      }
      focusedWeek = cell.getAttribute("data-week");
      highlightWeek();
    });
    cell.addEventListener("focusout", function (event) {
      if (isHoverLocked()) {
        return;
      }
      if (!cell.contains(event.relatedTarget)) {
        focusedWeek = null;
        highlightWeek();
      }
    });
  });

  Array.prototype.forEach.call(assessmentRows, function (row) {
    Array.prototype.forEach.call(row.cells, function (hoveredCell) {
      hoveredCell.addEventListener("pointerenter", function (event) {
        if (event.pointerType === "touch" || isHoverLocked()) {
          return;
        }
        if (isEmptyResourceCell(hoveredCell)) {
          clearAssessmentHighlight(row);
          return;
        }
        highlightAssessment(row, hoveredCell);
      });
    });
    row.addEventListener("pointerleave", function (event) {
      if (event.pointerType === "touch" || isHoverLocked()) {
        return;
      }
      clearAssessmentHighlight(row);
    });
  });

  if (window.PointerEvent) {
    tableWrap.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "touch") {
        beginTouchFeedback(event.target, event.clientX, event.clientY, event.pointerId);
      }
    });
    tableWrap.addEventListener("pointermove", function (event) {
      if (event.pointerType === "touch") {
        moveTouchFeedback(event.clientX, event.clientY, event.pointerId);
      }
    });
    tableWrap.addEventListener("pointerup", function (event) {
      if (event.pointerType === "touch" && touchTracking && touchTracking.identifier === event.pointerId) {
        finishTouchFeedback();
      }
    });
    tableWrap.addEventListener("pointercancel", function (event) {
      if (event.pointerType === "touch" && touchTracking && touchTracking.identifier === event.pointerId) {
        clearTouchFeedback();
      }
    });
    document.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "touch" && !tableWrap.contains(event.target)) {
        clearTouchFeedback();
      }
    });
  } else {
    tableWrap.addEventListener("touchstart", function (event) {
      var touch = event.changedTouches[0];
      if (touch) {
        beginTouchFeedback(event.target, touch.clientX, touch.clientY, touch.identifier);
      }
    }, { passive: true });
    tableWrap.addEventListener("touchmove", function (event) {
      var touch = event.changedTouches[0];
      if (touch) {
        moveTouchFeedback(touch.clientX, touch.clientY, touch.identifier);
      }
    }, { passive: true });
    tableWrap.addEventListener("touchend", function (event) {
      var touch = event.changedTouches[0];
      if (touch && touchTracking && touchTracking.identifier === touch.identifier) {
        finishTouchFeedback();
      }
    });
    tableWrap.addEventListener("touchcancel", clearTouchFeedback);
    document.addEventListener("touchstart", function (event) {
      if (!tableWrap.contains(event.target)) {
        clearTouchFeedback();
      }
    }, { passive: true });
  }

  document.addEventListener("course-schedule-hover-lock", function (event) {
    var duration = event.detail && event.detail.duration ? event.detail.duration : 1500;
    window.clearTimeout(hoverLockTimer);
    schedule.classList.add("is-link-transition");
    clearScheduleHover();
    hoverLockTimer = window.setTimeout(function () {
      schedule.classList.remove("is-link-transition");
    }, duration);
  });

}());
