//////////////////////
// DOM SELECTOR
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let totalImages;
let imagesLoaded = 0;
let photosArray = [];

//////////////////////
// CHECKS IMAGES LOAD OR NOT
function imageLoaded() {
  imagesLoaded++;
  // console.log(imagesLoaded);

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    // console.log("ready= ", ready);
  }
}

//////////////////////
// API DATA
const count = 30;
const apiKey = "hA7WLMtTQgexn8WL5vMbd-4BIoHBnPS4GF3fWDexRdE";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&orientation=landscape`;

//////////////////////
// DISPLAY PHOTOS
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // console.log("totalImages= ", totalImages);
  // Run fn for each object in photosArray
  photosArray.forEach((photo) => {
    // Creating <a> to link Unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    // Creating <img> for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);

    // EVENT LISTENER, Check when each is finsihed loading
    img.addEventListener("load", imageLoaded);

    // PUT image inside a element, then put both inside image constainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//////////////////////
// GET PHOTOS
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

// SCROLLING EVENTS
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
