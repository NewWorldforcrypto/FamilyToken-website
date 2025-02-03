document.addEventListener("DOMContentLoaded", function () {
  let images = document.querySelectorAll(".image-container");
  let delay = 0;

  // Adding class 'visible' to each image with a delay to create the timeline effect
  images.forEach((image, index) => {
    setTimeout(() => {
      image.classList.add("visible");
    }, delay);
    delay += 500; // Increasing delay to space out the animations for each image
  });
});
