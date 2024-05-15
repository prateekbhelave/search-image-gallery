const apiKey = "rqxPTAWUhu2i7W6Ix0tFVuN5W0f-_Pcjt2pYV5fq0sA";
const form = document.querySelector("form");
const input = document.querySelector("input");
const searchImages = document.querySelector(".search-images");
const showMore = document.querySelector(".show-more-btn");

let inputData = "";
let page = 1;

async function search() {
  inputData = input.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();

    if (page === 1) {
      searchImages.innerHTML = "";
    }

    data.results.forEach((result) => {
      const imgDiv = document.createElement("div");
      imgDiv.classList.add("search-img");
      const img = document.createElement("img");
      img.src = result.urls.small;
      img.alt = result.alt_description;
      const imgLink = document.createElement("a");
      imgLink.href = result.links.html;
      imgLink.target = "_blank";
      imgLink.textContent = result.alt_description;

      imgDiv.appendChild(img);
      imgDiv.appendChild(imgLink);
      searchImages.appendChild(imgDiv);
    });

    page++;
  } catch (error) {
    console.error(error);
  }
  if (page > 1) {
    showMore.style.display = "block";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  search();
});

showMore.addEventListener("click", () => {
  search();
});
