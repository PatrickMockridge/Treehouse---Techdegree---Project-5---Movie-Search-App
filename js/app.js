'use strict'
$(document).ready(function () {
  //put pagination in a footer
$('body').append('<footer><ul id="pagination"></ul></footer>');
  //sticky footer css
  $('html').css({
      "position": "relative",
      "min-height": "100%"
  });
  $('body').css({
      "margin": "0 0 100px" /* bottom = footer height */
  });
  $('footer').css({
      "text-align": "center",
      "position": "absolute",
      "left": "0",
      "bottom": "0",
      "height": "100px",
      "width": "100%"
  });
// start page count
// create function to retrieve JSON and update HTML accordingly
var searchFunction = function(count) {
event.preventDefault();
$('.movie-list').empty();
$('#pagination').empty();
var searchYear = $('#year').val();
var searchTitle = $('#search').val();
var pageNo = String(count);
var omdbOptions = {
  y: searchYear,
  s: searchTitle,
  r: "json",
  page: pageNo
};
var omdbAPI = "http://www.omdbapi.com/?";
function displayMovies (data) {
  var movieHTML = "";
  if (data.Response == "True") {
  $.each(data.Search, function(i, movie) {
    movieHTML += "<li><div class='poster-wrap'>";
    if (movie.Poster != "N/A") {
      movieHTML += "<a href= http://www.imdb.com/title/" + movie.imdbID + " class='movie-poster'><img src=" + movie.Poster + "></a>";
      }
    else if (movie.Poster == "N/A") {
      movieHTML += "<i class='material-icons poster-placeholder'>crop_original</i>";
      }
    movieHTML += "</div>";
    movieHTML += "<span class='movie-title'>" + movie.Title + "</span>";
    movieHTML += "<span class='movie-year'>" + movie.Year + "</span>   </li>";
    });
    var totalResults = parseInt(data.totalResults);
    var totalPages = Math.floor(totalResults/10)+1
    if (totalResults > 10) {
      $('#pagination').bootpag({
        total: totalResults,
        maxVisible: 5
        }).on('page', function(event, num){
        event.preventDefault();
        searchFunction(num);
      });
      }
  }
  else if (data.Response == "False" || typeof data.Reponse == "undefined") {
    movieHTML += "<li class='no-movies'> <i class='material-icons icon-help'>help_outline</i>No movies found that match: "
    if (typeof searchYear != "undefined") {
      movieHTML += searchTitle + " ";
    }
    if (typeof searchYear != "undefined") {
      movieHTML += searchYear;
    }
  }
  $('#movies').html(movieHTML);
}
$.getJSON(omdbAPI, omdbOptions, displayMovies);
//end of search function
};
$('input').keyup(function() {
  event.preventDefault();
  searchFunction(1);
});
//document ready close
});
