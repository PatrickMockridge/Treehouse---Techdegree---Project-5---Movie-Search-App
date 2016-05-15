'use strict'
$(document).ready(function () {
  $('.search-button').click(function() {
    event.preventDefault();
$('.movie-list').empty();
var searchYear = $('#year').val();
var searchTitle = $('#search').val();
var omdbOptions = {
  y: searchYear,
  s: searchTitle,
  r: "json"
};
var omdbAPI = "http://www.omdbapi.com/?";
function displayMovies (data) {
  var movieHTML = "";
  if (data.Response == "True") {
  $.each(data.Search, function(i, movie) {
    movieHTML += "<li><div class='poster-wrap'>";
    if (movie.Poster != "N/A") {
      movieHTML += "<img class='movie-poster' src=" + movie.Poster + ">";
      }
    else if (movie.Poster == "N/A") {
      movieHTML += "<i class='material-icons poster-placeholder'>crop_original</i>";
      }
    movieHTML += "</div>";
    movieHTML += "<span class='movie-title'>" + movie.Title + "</span>";
    movieHTML += "<span class='movie-year'>" + movie.Year + "</span>   </li>";
    });
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
});
});
