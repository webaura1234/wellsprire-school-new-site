(function () {
  var names = ["CAMPUS", "CLASSROOMS", "VAL-ED LAB", "COMPUTER LAB"];
  var notes = [
    "A campus where children thrive.",
    "Smart, sunlit classrooms.",
    "Values, lived — not lectured.",
    "Code, create, and think ahead.",
  ];
  var words = ["GROUNDS", "LEARNING", "VALUES", "INNOVATION"];
  var details = [
    "10 acres. Green, safe, and child-friendly.",
    "Air-conditioned rooms made for inquiry.",
    "Ethics, empathy, and leadership through real-life situations.",
    "AI, robotics, and digital literacy — hands-on.",
  ];
  var last = -1;

  function desktop() {
    return window.innerWidth > 900 && window.innerHeight > 620;
  }

  function paint(track, i) {
    if (last === i) return;
    last = i;
    track.setAttribute("data-hero-chapter", String(i));
    track.querySelectorAll(".hero-photo-panel").forEach(function (el, n) {
      var on = n === i;
      el.classList.toggle("is-active", on);
      el.style.setProperty("opacity", on ? "1" : "0", "important");
      el.style.setProperty("transform", on ? "scale(1)" : "scale(1.05)");
      el.style.zIndex = on ? "2" : "0";
    });
    track.querySelectorAll(".hero-detail-panel").forEach(function (el, n) {
      el.classList.toggle("is-active", n === i);
    });
    track.querySelectorAll(".chapter-tabs .pillar-tab").forEach(function (el, n) {
      var on = n === i;
      el.classList.toggle("is-active", on);
      el.setAttribute("aria-selected", on ? "true" : "false");
    });
    var foot = track.querySelector(".arch-footnote");
    if (foot) foot.textContent = "A WINDOW INTO " + names[i];
    var num = track.querySelector(".annotation-number");
    if (num) num.textContent = "0" + (i + 1);
    var note = track.querySelector(".hero-annotation p");
    if (note) note.textContent = notes[i];
    var word = track.querySelector(".margin-label");
    if (word) word.textContent = "ROOM FOR " + words[i];
    var detail = track.querySelector(".hero-marginalia > p");
    if (detail) detail.textContent = details[i];
  }

  function tick() {
    var track = document.querySelector(".hero-scroll-track");
    if (track && desktop()) {
      var header = document.querySelector(".header");
      var hh = header ? header.offsetHeight : 106;
      var hero = track.querySelector(".hero");
      var heroH = hero ? hero.offsetHeight : window.innerHeight - hh;
      var scrollable = track.offsetHeight - heroH;
      if (scrollable > 40) {
        var scrolled = hh - track.getBoundingClientRect().top;
        var p = Math.max(0, Math.min(1, scrolled / scrollable));
        paint(track, Math.min(3, Math.max(0, Math.floor(p * 3.999))));
      }
    }
    requestAnimationFrame(tick);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      requestAnimationFrame(tick);
    });
  } else {
    requestAnimationFrame(tick);
  }
})();
