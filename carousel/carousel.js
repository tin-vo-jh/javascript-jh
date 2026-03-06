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

function initCarousel() {
  images.forEach((url, index) => {
    const liItem = document.createElement("li");
    
    // Create the <button> tag to wrap the image 
    const btnElement = document.createElement("button");
    btnElement.setAttribute("aria-label", `View thumbnail ${index + 1}`);
    btnElement.classList.add("thumb-btn");
    
    // Create the <img> tag
    const imgElement = document.createElement("img");
    imgElement.src = url;
    imgElement.alt = `Thumbnail ${index + 1}`;
    imgElement.loading = "lazy";

    if (index === 0) btnElement.classList.add("active");

    // Listen for the click event on the button instead of the image
    btnElement.addEventListener("click", () => changeImage(index));

    // Assemble the DOM: li -> button -> img
    btnElement.appendChild(imgElement);
    liItem.appendChild(btnElement);
    thumbnailList.appendChild(liItem);
  });
}

function changeImage(newIndex) {
  if (currentIndex === newIndex) return;

  mainImage.style.opacity = 0;

  setTimeout(() => {
    currentIndex = newIndex;
    mainImage.src = images[currentIndex];
    // Update the alt text of the main image for better SEO
    mainImage.alt = `Detailed product view ${currentIndex + 1}`; 
    mainImage.style.opacity = 1;
    updateThumbnails();
  }, 300);
}

function updateThumbnails() {
  const allThumbBtns = document.querySelectorAll(".thumb-btn");
  allThumbBtns.forEach(btn => btn.classList.remove("active"));
  allThumbBtns[currentIndex].classList.add("active");
}

nextBtn.addEventListener("click", () => {
  let newIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
  changeImage(newIndex);
});

prevBtn.addEventListener("click", () => {
  let newIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
  changeImage(newIndex);
});

initCarousel();