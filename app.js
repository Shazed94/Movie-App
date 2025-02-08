

// const key = "51c87711aff7d938f63985b0fa09867a";

const api_key = "api_key=51c87711aff7d938f63985b0fa09867a";
const base_url = "https://api.themoviedb.org/3";
const api_url = base_url + "/discover/movie?sort_by=popularity.desc&" + api_key;
const searchUrl = base_url + "/search/movie?" + api_key;
const imagePath = "https://image.tmdb.org/t/p/w500";

const genres = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]

// const loader = document.querySelector('.loader')
// const section1 = document.querySelector('.content-123')
// section1.style.display = 'none'

// function loadingSpinner(state) {
//   if (state == true) {
//     loader.style.display = 'none'
//     section1.style.display = 'flex';
//     section1.setAttribute('flex-wrap', 'wrap')
//     section1.setAttribute('justify-content', 'center')
//   } else {
//     loader.style.display = 'flex'

//   }
// }

getMovies(api_url);

// API request

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  lastUrl = url;
  // console.log(data);
  if (data.results.length != 0) {
    renderMovies(data.results);
    // setTimeout(function(){
    // loadingSpinner(true)
    // },1000)
  }
  else {
    section.innerHTML = `<h1 class="no-result">No Results Found</h1>`

  }
  currPage = data.page;
  nextPage = currPage + 1;
  prevPage = currPage - 1;

  current.innerText = currPage;

  if (currPage <= 1) {
    prev.classList.add('disabled');
    next.classList.remove('disabled');
  } else if (currPage >= totalPage) {
    prev.classList.remove('disabled')
    next.classList.add('disabled');
  } else {
    prev.classList.remove('disabled');
    next.classList.remove('disabled');
  }

  header.scrollIntoView({
    behavior: 'smooth'
  })

}



// Javascript Selectors

const header = document.querySelector('header')
const section = document.querySelector("section");
const form = document.querySelector("form");
const input = document.querySelector("#search");
const tagsEl = document.querySelector("#tags")
// const body = document.querySelector("body")

var selectedGenres = []
setGenre()
function setGenre() {
  tagsEl.innerHTML = ''
  genres.forEach((genre) => {
    const tag = document.createElement('div')
    tag.classList.add('tag')
    tag.id = genre.id
    tag.textContent = genre.name
    tag.addEventListener('click', () => {
      if (selectedGenres.length == 0) {
        selectedGenres.push(genre.id)
      } else {
        if (selectedGenres.includes(genre.id)) {
          selectedGenres.forEach((id, index) => {
            if (id == genre.id) {
              selectedGenres.splice(index, 1)
            }
          })
        } else {
          selectedGenres.push(genre.id)
        }
      }
      getMovies(api_url + '&with_genres=' + encodeURI(selectedGenres.join(',')))
      highlightSelection();
    })
    tagsEl.appendChild(tag)
  })
}

function highlightSelection() {
  const tags = document.querySelectorAll(".tag")
  tags.forEach(tag => {
    tag.classList.remove("highlight")
  })
  clearBtn()
  if (selectedGenres.length != 0) {
    selectedGenres.forEach(id => {
      const highlightTag = document.getElementById(id)
      highlightTag.classList.add('highlight')
    })
  }
}

function clearBtn() {
  let clearBtn = document.getElementById('clear')
  if (clearBtn) {
    clearBtn.classList.add('highlight')
  } else {
    let clear = document.createElement('div');
    clear.classList.add('tag', 'highlight');
    clear.id = "clear";
    clear.innerText = 'Clear x'
    clear.addEventListener('click', () => {
      selectedGenres = []
      setGenre();
      getMovies(api_url);
    })
    tagsEl.appendChild(clear)
  }
}

// Render section

function renderMovies(movies) {
  section.innerHTML = "";

  movies.forEach((movie) => {
    const movieTitle = movie.title;
    const movieRating = movie.vote_average;
    const moviePoster = movie.poster_path;
    const movieOverview = movie.overview;
    const releaseDate = movie.release_date;

    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    movieDiv.innerHTML = `
     <img src="${moviePoster ? imagePath + moviePoster : 'https://via.placeholder.com/1080x1650.jpg'
      }" alt="${movieTitle}" class="img-fluid">
            <div class="movie-info">
                <h5>${movieTitle}</h5>
                <span class="${getScoreClass(
        movieRating
      )}">${movieRating}</span>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                <p>${movieOverview}</p>
                </div>`;
    section.appendChild(movieDiv);
  });
}

function getScoreClass(score) {
  if (score >= 8) {
    return "green";
  } else if (score >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchVal = input.value.trim();
  selectedGenres = [];
  setGenre();
  if (searchVal && searchVal !== "") {
    getMovies(searchUrl + "&query=" + searchVal);
    searchVal = "";
  } else {
    window.location.reload();
  }
});

//  Pagination
const pagination = document.querySelector('#pagination')
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const current = document.querySelector("#current");

var currPage;
var nextPage;
var prevPage;
var lastUrl = "";
var totalPage = 5;

prev.addEventListener("click", () => {
  if (prevPage > 0) {
    pageCall(prevPage);
  }
});

next.addEventListener("click", () => {
  if (nextPage <= totalPage) {
    pageCall(nextPage);
  }
});

function pageCall(page) {
  let urlSplit = lastUrl.split("?");
  // console.log(urlSplit);
  let queryParams = urlSplit[1].split("&");
  // console.log(queryParams);
  let key = queryParams[queryParams.length - 1].split("=");
  console.log(key);
  if (key[0] != "page") {
    let url = lastUrl + "&page=" + page;
    // console.log(url);
    getMovies(url);
  } else {
    key[1] = page.toString();
    let a = key.join("=");
    console.log(a);
    queryParams[queryParams.length - 1] = a;
    let b = queryParams.join("&");
    console.log(b);
    let url = urlSplit[0] + "?" + b;
    getMovies(url);
  }
}
