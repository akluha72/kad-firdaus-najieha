"use strict";

function increment(id) {
  var input = document.getElementById(id);
  var value = parseInt(input.value);
  input.value = value + 1;
}
function decrement(id) {
  var input = document.getElementById(id);
  var value = parseInt(input.value);
  if (value > 0) {
    input.value = value - 1;
  }
}
//# sourceMappingURL=rsvp.js.map