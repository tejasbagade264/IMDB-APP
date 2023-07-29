const movieSearchBox = document.querySelector("#movie-search-box"); 
const searchList =  document.querySelector("#search-list"); 



// Set default data to localstorage
if (!localStorage.getItem("favMovies")) {
  let favMovies = [];
  localStorage.setItem("favMovies", JSON.stringify(favMovies));
}


function findMovies(){
     
     let searchTerm = movieSearchBox.value.trim();
     loadMovies(searchTerm);

}



async function loadMovies(movie){
  const URL = `https://www.omdbapi.com/?s=${movie}&page=1&apikey=755f786c`;     //Base URL
  const res = await fetch(`${URL}`);                                          //Fetch data from server
  const data = await res.json();  
  console.log('json responses are comming')  ;                                         //Arrange data to readable format (JSON)
 if (data.Response == "True") {
    displayMovieList(data.Search);                                            
    }
  }


function displayMovieList(movies){
  searchList.innerHTML = "";                                                                //clear the list of movies

   for(let i=0; i<movies.length; i++){
     let movieListItem = document.createElement("div");                                   // Create a Div
     movieListItem.dataset.id = movies[i].imdbID;                                        // Set Id to each movie result
     movieListItem.classList.add("search-list-item");                                   //Add CSS

     console.log("movie list search");

   if (movies[i].Poster != "N/A") {
     moviePoster = movies[i].Poster; // Set found image address
    }else{
      moviePoster = "https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg"; //If image not found then set default image
    }
     
     movieListItem.innerHTML =`
                        <div class="search-item-thumbnail">
                            <img src="${moviePoster}" alt="movie">
                        </div>

                        <div class="search-item-info">
                            <h3>${movies[i].Title}</h3>
                            <p>${movies[i].Year}</p>
                        </div>
                     `;
    searchList.appendChild(movieListItem);                                      //Add a matched movie to autocomplete list
   }
   
};



function handleSearchListItemClick(event) {
  const movieListItem = event.target.closest(".search-list-item");
  if (movieListItem) {
    const imdbID = movieListItem.dataset.id;
    localStorage.setItem("movieID", imdbID); // Store imdbID in local storage for later use

    // Redirect to the new HTML page
    window.location.href = `result/result.html`; 
  }
}


// EventListners
window.addEventListener("click", (e) => {
  if (e.target.className != "form-control") {
    searchList.classList.add("hide-search-list"); // Hide autocomplete box if user click anywhere other than autocomplete box
  }
});
// Attach click event listener to the search list


searchList.addEventListener("click", handleSearchListItemClick);
movieSearchBox.addEventListener('keyup', findMovies);
movieSearchBox.addEventListener("click", findMovies);


