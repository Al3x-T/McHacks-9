//const api_key = 'b232ad51ce7402046296b8bc8b7c35d8';
//const base_url = 'https://api.themoviedb.org/3/discover/movie/';
//const api_url = base_url + "?api_key=" + api_key;
//options = {"primary_release_year":2010}
//const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

var options = {};
var pageNumber = 1;

function hideSub() {
    document.getElementById("subquestion1").style.visibility = "hidden";
}

function showSub() {
    document.getElementById("subquestion1").style.visibility = "visible";
}

function language() {
    sessionStorage.pageNumber = 1;
    sessionStorage.setItem("language", document.querySelector('input[name="language"]:checked').value);
    console.log(sessionStorage.getItem("language"));
}

function genre() {
    sessionStorage.setItem("genre", document.querySelector('input[name="genre"]:checked').value);
    console.log(sessionStorage.getItem("numMovie"));
    console.log(sessionStorage.getItem("genre"));
}

function date() {
    var years = document.querySelector('input[name="date"]:checked').value;
    //get current date
    var current = new Date();
    if (years == "1") delta = 1;
    else if (years == "5") delta = 5;
    else if (years == "10") delta = 10;
    else if (years == "20") delta = 20;
    else if (years == "40") delta = 40;
    else if (years == "100") delta = 100;

    var minDate = new Date(current.getFullYear() - delta, current.getMonth(), current.getDate());

    //format date as YYYY-MM-DD
    minDate = minDate.toISOString().split('T')[0];

    sessionStorage.setItem("date", minDate);

    //sessionStorage.setItem("date", document.querySelector('input[name="date"]:checked').value);
    console.log(sessionStorage.getItem("numMovie"));
    console.log(sessionStorage.getItem("genre"));
    console.log(sessionStorage.getItem("date"));
}

function getStream() {
    sessionStorage.setItem("stream", document.querySelector('input[name="stream"]:checked').value);
    console.log(sessionStorage.getItem("numMovie"));
    console.log(sessionStorage.getItem("genre"));
    console.log(sessionStorage.getItem("date"));
    console.log(sessionStorage.getItem("stream"));
}
  
function getRating() {
    sessionStorage.setItem("rating", document.querySelector('input[name="rating"]:checked').value);
    console.log(sessionStorage.getItem("rating"));
}


function getChoices() {
    //options = {};
    options.page = sessionStorage.pageNumber;
    console.log(options.page);
    if (sessionStorage.getItem('language') == 'en') {options["vote_count.gte"] = 300;}
    else {options["vote_count.gte"] = 0;}
    options["vote_average.gte"] = parseInt(sessionStorage.getItem('rating'),10);
    //console.log(options["vote_count.gte"])
    options.with_original_language = options.language = sessionStorage.getItem('language');
    //options.primary_release_year = range(1980, 1990, 1); //range of release year
    options["primary_release_date.gte"] = sessionStorage.getItem('date');
    //chosenGenres = sessionStorage.getItem("genres");
    options.with_genres = parseInt(sessionStorage.getItem('genre'),10);             //list of genres
    //options.with_genres = [10749 || 16 || 12];           //list of genres
    options.watch_region = "CA";       
    options.with_watch_providers = parseInt(sessionStorage.getItem('stream'),10);   //list of streaming services (see discord #back end for IDs) 
    //options.with_watch_providers = [8 || 9];               //list of streaming services (see discord #back end for IDs) 
    theMovieDb.discover.getMovies(options, successFunction, errorFunction);
    /*
    while(true){
        try{
            options.page = Math.floor((Math.random() * (10))+1); //chosen page
            theMovieDb.discover.getMovies(options, successFunction, getChoices);
            break
        } catch(err){
            continue;
        }
    }*/
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
//sessionStorage.getItem("genres")
function successFunction(movies){
    movies = JSON.parse(movies);
    sessionStorage.pageNumber = Math.floor((Math.random() * (movies.total_pages-1))+1); //chosen page
    console.log(sessionStorage.pageNumber);
    /*while (sessionStorage.pageNumber < 1){
        sessionStorage.pageNumber = Math.floor((Math.random() * (movies.total_pages))); //chosen page
    }*/
    //console.log(page);
    length = movies.total_results;
    console.log(length);
    //length = Object.keys(movies).length;
    movieNumber = Math.floor(Math.random() * (Math.min(20,length-1)));
    //movieNumber = Math.floor(Math.random() * (length/1.2));
    //getInfo(movies.results[movieNumber].id);
    console.log(movieNumber);

    //console.log(movies);
    //console.log(movieNumber);
    //console.log(movies.results[movieNumber]);

    try {rating = movies.results[movieNumber].vote_average;
    title = movies.results[movieNumber].title;
    poster = "https://image.tmdb.org/t/p/w400"+movies.results[movieNumber].poster_path;
    releaseDate = movies.results[movieNumber].release_date;
    genreID = movies.results[movieNumber].genre_ids[0];
    overview = movies.results[movieNumber].overview;    }
    catch(err){
        document.location=("index.html");
        alert("Sorry, no movie found for your criteria! Want to try again?")
    }
    
    console.log(overview);
    if (overview.length > 325){
        var maxLength = 325; // maximum number of characters to extract
        //trim the string to the maximum length
        var trimmedOverview = overview.substr(0, maxLength);
        //re-trim if we are in the middle of a word
        trimmedOverview = trimmedOverview.substr(0, Math.min(trimmedOverview.length, trimmedOverview.lastIndexOf(".")))+".";
        if (trimmedOverview.length > 50) {overview = trimmedOverview}
    }
    console.log(overview);

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
    document.getElementById("rating").innerText = rating;
    temp = parseInt(sessionStorage.getItem("genre"),10);
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
    console.log(options.page);
    alert("error");
}
/*if (releaseYear){
    api_url += ""
}



theMovieDb.discover.getMovie(options, successCallback, errorCallback);
*/