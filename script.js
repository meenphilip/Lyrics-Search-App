const APIURL = 'https://api.lyrics.ovh';

const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

// Search by song or artist
const searchSongs = async searchTerm => {
  const res = await fetch(`${APIURL}/suggest/${searchTerm}`);
  const data = await res.json();
  showData(data);
};

// show data and artist in DOM
function showData(data) {
  // let output = "";
  // data.data.forEach((song) => {
  //   // FIRST WAY OF DOING IT
  //   output += `
  //   <li>
  //     <span>
  //       <strong>${song.artist.name}</strong> - ${song.title}
  //     </span>
  //     <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
  //   </li>
  //   `;
  // });

  // result.innerHTML = `
  // <ul class="songs">
  //   ${output}
  // </ul>`;

  // WAY TWO OF DOING IT
  result.innerHTML = `
  <ul class="songs">
    ${data.data
      .map(
        song => `<li>
      <span>
        <strong>${song.artist.name}</strong> - ${song.title}
      </span>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`,
      )
      .join('')}
  </ul>`;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ''
      }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ''
      }
    `;
  } else {
    more.innerHTML = '';
  }
}

// get prev or next songs
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

// Event Listener
form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value.trim();
  if (!searchTerm) {
    alert('Please type in a search term');
  } else {
    searchSongs(searchTerm);
  }
});
