//const api_key = 'b232ad51ce7402046296b8bc8b7c35d8';
//const base_url = 'https://api.themoviedb.org/3/discover/movie/';
//const api_url = base_url + "?api_key=" + api_key;
//options = {"primary_release_year":2010}
//const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

var language; 
var genres = [];
var dates = [];
var streaming = [];

function hideSub() {
    document.getElementById("subquestion1").style.visibility = "hidden";
}

function showSub() {
    document.getElementById("subquestion1").style.visibility = "visible";
}

function language() {
    localStorage.setItem("language", document.querySelector('input[name="language"]:checked').value);
    console.log(localStorage.getItem("language"));
}

function genre() {
    localStorage.setItem("genre", document.querySelector('input[name="genre"]:checked').value);
    console.log(localStorage.getItem("numMovie"));
    console.log(localStorage.getItem("genre"));
}

function date() {
    localStorage.setItem("date", document.querySelector('input[name="date"]:checked').value);
    console.log(localStorage.getItem("numMovie"));
    console.log(localStorage.getItem("genre"));
    console.log(localStorage.getItem("date"));
}

function getStream() {
    localStorage.setItem("stream", document.querySelector('input[name="stream"]:checked').value);
    console.log(localStorage.getItem("numMovie"));
    console.log(localStorage.getItem("genre"));
    console.log(localStorage.getItem("date"));
    console.log(localStorage.getItem("stream"));
}
  
function rottenTom() {
    localStorage.setItem("rating", document.querySelector('input[name="rating"]:checked').value);
    console.log(localStorage.getItem("rating"));
}


function getChoices() {
    options = {};
    options["vote_count.gte"] = 400;
    options["vote_average.gte"] = 7;
    options.with_original_language = options.language = localStorage.getItem('language');
    //options.primary_release_year = range(1980, 1990, 1); //range of release year
    options["primary_release_date.gte"] = localStorage.getItem('date');
    //chosenGenres = localStorage.getItem("genres");
    options.with_genres = parseInt(localStorage.getItem('genre'),10);             //list of genres
    //options.with_genres = [10749 || 16 || 12];           //list of genres
    options.watch_region = "CA";       
    options.with_watch_providers = parseInt(localStorage.getItem('stream'),10);               //list of streaming services (see discord #back end for IDs) 
    //options.with_watch_providers = [8 || 9];               //list of streaming services (see discord #back end for IDs) 
    theMovieDb.discover.getMovies(options, successFunction, errorFunction);
}
/*
function getInfo(id){
    theMovieDb.movies.getDetails(id, infoSuccess, errorFunction);
}

function infoSuccess(info){
    info = JSON.parse(movies);
    ratings = info.
}
*/
// "genres" "rate" "streaming" "date"
//localStorage.getItem("genres")
function successFunction(movies){
    movies = JSON.parse(movies);
    length = movies.total_results;
    console.log(length);
    //length = Object.keys(movies).length;
    movieNumber = Math.floor(Math.random() * (Math.min(20,length/10)));
    //getInfo(movies.results[movieNumber].id);
    console.log(movieNumber);

    //console.log(movies);
    //console.log(movieNumber);
    //console.log(movies.results[movieNumber]);

    title = movies.results[movieNumber].title;
    poster = "https://image.tmdb.org/t/p/w400"+movies.results[movieNumber].poster_path;
    releaseDate = movies.results[movieNumber].release_date;
    genreID = movies.results[movieNumber].genre_ids[0];
    overview = movies.results[movieNumber].overview;    
    
    console.log(title+'\n'+poster+'\n'+genreID+'\n'+overview);

    var img = new Image(); 
    var div = document.getElementById("suggestion1"); 
 
    img.onload = function() { 
    div.appendChild(img); 
    }; 
 
    img.src = poster;
    
    document.getElementById("suggestion1").src = poster;
    document.getElementById("title").innerText = title;
    document.getElementById("date").innerText = releaseDate;
    temp = parseInt(localStorage.getItem("genre"),10);
    var genreee;
    if(temp == 28){
        genreee = "Action";
    }else if(temp == 35){
        genreee == "Comedy";
    }else if(temp == 18){
        genreee = "Drama";
    }else if(temp == 10749){
        genreee = "Romance";
    }else if(temp == 9648){
        genreee = "Mystery";
    }else if(temp == 14){
        genreee = "Fantasy";
    }else if(temp == 27){
        genreee = "Horror";
    }else{
        genreee = "Science Fiction";
    }
    document.getElementById("genre").innerText = genreee;
    document.getElementById("overview").innerText = overview;

    //alert(result);
    //console.log(result);
}

function errorFunction(result){
    alert("error");
}
/*if (releaseYear){
    api_url += ""
}



theMovieDb.discover.getMovie(options, successCallback, errorCallback);
*/