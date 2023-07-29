const menu = document.querySelector(".menu");
const dropdown = document.querySelector(".drop-down");

dropdown.addEventListener("mouseenter", () => {
  menu.classList.remove("hidden");
});
menu.addEventListener("mouseleave", () => {
  menu.classList.add("hidden");
});

let video = document.querySelectorAll("video");
video.forEach((video) => {
  let playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      let observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            video.muted = false;
            if (entry.intersectionRatio !== 1 && !video.paused) {
              video.pause();
            } else if (entry.intersectionRatio > 0.5 && video.paused) {
              video.play();
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(video);
    });
  }
});
