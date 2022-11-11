const APIURL = "https://api.lyrics.ovh";

const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

// Search by song or artist
const searchSongs = async (searchTerm) => {
  const res = await fetch(`${APIURL}/suggest/${searchTerm}`);
  const data = await res.json();
  console.log(data);
};

// show data and artist in DOM
// const showData = async (data) =>{}



// Event Listener
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();
  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});
