(function () {
  const toggle = document.querySelector("[data-nav-toggle]");
  const panel = document.querySelector("[data-nav-panel]");

  if (toggle && panel) {
    const links = panel.querySelectorAll("a");

    function closePanel() {
      panel.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      const isOpen = panel.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.forEach(function (link) {
      link.addEventListener("click", closePanel);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) {
        closePanel();
      }
    });
  }

  const heroVideo = document.querySelector(".hero-video");
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

  function syncMotionPreference() {
    if (!heroVideo) {
      return;
    }

    if (motionPreference.matches) {
      heroVideo.pause();
      return;
    }

    const playback = heroVideo.play();
    if (playback && typeof playback.catch === "function") {
      playback.catch(function () {});
    }
  }

  syncMotionPreference();
  if (typeof motionPreference.addEventListener === "function") {
    motionPreference.addEventListener("change", syncMotionPreference);
  }

  const track = document.getElementById("galleryTrack");
  if (!track) {
    return;
  }

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  track.addEventListener("dragstart", function (event) {
    event.preventDefault();
  });

  track.addEventListener("pointerdown", function (event) {
    if (event.pointerType === "touch") {
      return;
    }

    isDragging = true;
    startX = event.clientX;
    scrollLeft = track.scrollLeft;
    track.classList.add("is-dragging");
    track.setPointerCapture(event.pointerId);
  });

  track.addEventListener("pointermove", function (event) {
    if (!isDragging || event.pointerType === "touch") {
      return;
    }

    event.preventDefault();
    const walk = (event.clientX - startX) * 1.3;
    track.scrollLeft = scrollLeft - walk;
  });

  function endDrag(event) {
    if (!isDragging) {
      return;
    }

    isDragging = false;
    track.classList.remove("is-dragging");
    if (typeof event.pointerId === "number" && track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
  }

  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);
  track.addEventListener("pointerleave", function () {
    if (!isDragging) {
      return;
    }

    isDragging = false;
    track.classList.remove("is-dragging");
  });
})();
