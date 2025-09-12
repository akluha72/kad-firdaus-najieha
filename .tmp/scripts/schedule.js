"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
document.addEventListener('DOMContentLoaded', function () {
  // Define the schedule with times
  var schedule = [{
    time: '11:00 AM',
    element: document.querySelectorAll('.program-item')[0]
  }, {
    time: '12:00 AM',
    element: document.querySelectorAll('.program-item')[1]
  }, {
    time: '12:45 PM',
    element: document.querySelectorAll('.program-item')[2]
  }, {
    time: '01:15 PM',
    element: document.querySelectorAll('.program-item')[3]
  }, {
    time: '02:30 PM',
    element: document.querySelectorAll('.program-item')[4]
  }, {
    time: '03:00 PM',
    element: document.querySelectorAll('.program-item')[5]
  }, {
    time: '02:45 PM',
    element: document.querySelectorAll('.program-item')[6]
  }, {
    time: '03:00 PM',
    element: document.querySelectorAll('.program-item')[7]
  }];

  // Function to convert 12-hour time format to 24-hour Date object for comparison
  function parseTime(timeString) {
    var _timeString$split = timeString.split(' '),
      _timeString$split2 = _slicedToArray(_timeString$split, 2),
      time = _timeString$split2[0],
      modifier = _timeString$split2[1];
    var _time$split$map = time.split(':').map(Number),
      _time$split$map2 = _slicedToArray(_time$split$map, 2),
      hours = _time$split$map2[0],
      minutes = _time$split$map2[1];
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  }

  // Temporarily mock the current time for testing
  // const mockCurrentTime = new Date(); // Set this to a specific date/time for testing
  // mockCurrentTime.setHours(23); // Change hours to 12 for testing (adjust as needed)
  // mockCurrentTime.setMinutes(15); // Change minutes to 15 for testing (adjust as needed)

  // Get the current time
  // const currentTime = mockCurrentTime;
  var currentTime = new Date();
  var highlighted = false; // Track if an item has been highlighted
  console.log(currentTime);

  // Loop through the schedule to find the closest event
  for (var i = 0; i < schedule.length; i++) {
    var eventTime = parseTime(schedule[i].time);
    var nextEventTime = schedule[i + 1] ? parseTime(schedule[i + 1].time) : null;

    // Highlight the event if the current time falls between this event and the next
    if (currentTime >= eventTime && (!nextEventTime || currentTime < nextEventTime)) {
      schedule[i].element.classList.add('current');
      highlighted = true;
      break;
    }
  }

  // If no event is highlighted, highlight the first event (before the schedule starts)
  if (!highlighted) {
    schedule[0].element.classList.add('current');
  }
});
//# sourceMappingURL=schedule.js.map