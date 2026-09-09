(function () {
  "use strict";

  var schedule = document.querySelector(".course-schedule");
  if (!schedule) {
    return;
  }

  var chapterCells = schedule.querySelectorAll("[data-chapter]");
  var weekCells = schedule.querySelectorAll("[data-week]") || [];
  var assessmentRows = schedule.querySelectorAll(".course-schedule__assessment-row") || [];
  var tableWrap = schedule.querySelector(".course-schedule__table-wrap");
  var groupOverlay = document.createElement("div");
  var hoveredChapter = null;
  var hoveredChapterSource = null;
  var hoveredWeek = null;
  var hoveredWeekSource = null;
  var focusedWeek = null;
  var hoverLockTimer;
  var touchFeedbackTimer;
  var touchTracking = null;

  groupOverlay.className = "course-schedule__group-overlay";
  groupOverlay.setAttribute("aria-hidden", "true");
  tableWrap.appendChild(groupOverlay);

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

  function isHoverLocked() {
    return schedule.classList.contains("is-link-transition");
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
    });
    Array.prototype.forEach.call(assessmentRows, function (row) {
      row.classList.remove("is-assessment-hovered");
      Array.prototype.forEach.call(row.cells, function (cell) {
        cell.classList.remove("is-assessment-hovered");
      });
    });
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
  }

  function highlightWeek() {
    var week = hoveredWeek || focusedWeek;
    var edges = getColumnEdges();
    Array.prototype.forEach.call(weekCells, function (cell) {
      if (cell.classList.contains("course-schedule__assessment-row")) {
        return;
      }
      var matchesWeek = cell.getAttribute("data-week") === week;
      var includeCell = hoveredWeekSource === "notes" || cell.classList.contains("course-schedule__week");
      cell.classList.toggle("is-week-hovered", matchesWeek && includeCell);
    });
    Array.prototype.forEach.call(assessmentRows, function (row) {
      row.classList.remove("is-week-hovered");
    });
    frameHoveredGroup(weekCells, "is-week-hovered", "week", week ? {
      left: edges.weekLeft,
      right: hoveredWeekSource === "notes" ? edges.notesRight : edges.contentRight
    } : null, true);
  }

  function highlightChapter() {
    var edges = getColumnEdges();
    Array.prototype.forEach.call(chapterCells, function (cell) {
      var matchesChapter = hoveredChapter !== null && cell.getAttribute("data-chapter") === hoveredChapter;
      var includeCell = hoveredChapterSource === "resource" || cell.classList.contains("course-schedule__content");
      cell.classList.toggle("is-chapter-hovered", matchesChapter && includeCell);
    });
    frameHoveredGroup(chapterCells, "is-chapter-hovered", "chapter", hoveredChapter !== null ? {
      left: hoveredChapterSource === "resource" ? edges.contentLeft : edges.weekLeft,
      right: hoveredChapterSource === "resource" ? edges.chapterRight : edges.contentRight
    } : null, hoveredChapterSource === "content");
  }

  function highlightAssessment(row, sourceCell) {
    var edges = getColumnEdges();
    var enteredFromResources = sourceCell.classList.contains("course-schedule__resources");
    row.classList.add("is-assessment-hovered");
    Array.prototype.forEach.call(row.cells, function (cell) {
      var isTimelineCell = cell.classList.contains("course-schedule__week") || cell.classList.contains("course-schedule__assessment-content");
      var isResourceEntryCell = cell.classList.contains("course-schedule__week") || cell.classList.contains("course-schedule__resources");
      cell.classList.toggle("is-assessment-hovered", enteredFromResources ? isResourceEntryCell : isTimelineCell);
    });
    frameHoveredGroup(row.cells, "is-assessment-hovered", "assessment", {
      left: edges.weekLeft,
      right: enteredFromResources ? edges.examRight : edges.contentRight
    }, enteredFromResources, enteredFromResources);
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

    clearScheduleHover();
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
      hoveredWeekSource = cell.classList.contains("course-schedule__resources--notes") ? "notes" : "week";
      highlightWeek();
    }
  }

  function clearTouchFeedback() {
    window.clearTimeout(touchFeedbackTimer);
    touchFeedbackTimer = null;
    touchTracking = null;
    clearScheduleHover();
  }

  function finishTouchFeedback() {
    if (!touchTracking) {
      return;
    }
    if (touchTracking.moved) {
      touchTracking = null;
      return;
    }
    window.clearTimeout(touchFeedbackTimer);
    touchFeedbackTimer = window.setTimeout(clearTouchFeedback, 5000);
    touchTracking = null;
  }

  function beginTouchFeedback(target, clientX, clientY, identifier) {
    var cell = getScheduleCell(target);
    if (!cell || isHoverLocked()) {
      return;
    }
    window.clearTimeout(touchFeedbackTimer);
    touchFeedbackTimer = null;
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
    cell.addEventListener("pointerleave", function () {
      if (isHoverLocked()) {
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
      hoveredWeekSource = cell.classList.contains("course-schedule__resources--notes") ? "notes" : "week";
      highlightWeek();
    });
    cell.addEventListener("pointerleave", function () {
      if (isHoverLocked()) {
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
        highlightAssessment(row, hoveredCell);
      });
    });
    row.addEventListener("pointerleave", function () {
      if (isHoverLocked()) {
        return;
      }
      row.classList.remove("is-assessment-hovered");
      Array.prototype.forEach.call(row.cells, function (cell) {
        cell.classList.remove("is-assessment-hovered");
      });
      frameHoveredGroup(row.cells, "is-assessment-hovered", "assessment");
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
