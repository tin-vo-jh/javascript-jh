function initCarousel() {
  const images = [
    "https://picsum.photos/seed/1/800/400",
    "https://picsum.photos/seed/2/800/400",
    "https://picsum.photos/seed/3/800/400",
    "https://picsum.photos/seed/4/800/400",
    "https://picsum.photos/seed/5/800/400"
  ];

  let currentIndex = 0;

  const mainImage = document.getElementById("mainImage");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const thumbnailList = document.getElementById("thumbnailList");

  // Build thumbnails
  images.forEach((url, index) => {
    const liItem = document.createElement("li");

    const btnElement = document.createElement("button");
    btnElement.setAttribute("aria-label", `View thumbnail ${index + 1}`);
    btnElement.classList.add("thumb-btn");

    const imgElement = document.createElement("img");
    imgElement.src = url;
    imgElement.alt = `Thumbnail ${index + 1}`;
    imgElement.loading = "lazy";

    if (index === 0) btnElement.classList.add("active");

    // Listen for a click on a thumbnail button
    btnElement.addEventListener("click", () => changeImage(index));

    btnElement.appendChild(imgElement);
    liItem.appendChild(btnElement);
    thumbnailList.appendChild(liItem);
  });

  // Change main image with fade transition
  function changeImage(newIndex) {
    if (currentIndex === newIndex) return;

    // Fade out
    mainImage.style.opacity = 0;

    setTimeout(() => {
      currentIndex = newIndex;
      mainImage.src = images[currentIndex];
      mainImage.alt = `Detailed product view ${currentIndex + 1}`;
      // Fade in
      mainImage.style.opacity = 1;
      updateThumbnails();
    }, 300);
  }

  // Highlight the active thumbnail
  function updateThumbnails() {
    const allThumbBtns = document.querySelectorAll(".thumb-btn");
    allThumbBtns.forEach(btn => btn.classList.remove("active"));
    allThumbBtns[currentIndex].classList.add("active");
  }

  // Next button: loop back to first image if at the end
  nextBtn.addEventListener("click", () => {
    const newIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    changeImage(newIndex);
  });

  // Prev button: loop back to last image if at the beginning
  prevBtn.addEventListener("click", () => {
    const newIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    changeImage(newIndex);
  });
}

initCarousel();
