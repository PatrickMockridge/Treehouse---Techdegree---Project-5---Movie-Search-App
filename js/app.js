'use strict'
$(document).ready(function () {
  $('.search-button').click(function() {
var searchYear = $('#year').text();
var searchTitle = $('#search').text();
var omdbOptions = {
  "y": searchYear,
  "t": searchTitle
};
var omdbAPI = "http://www.omdbapi.com/?";
var displayMovies = function (data) {
  console.log(data);
  var movieHTML = "";
  if (data.reponse) {
  $.each(data.Search, function(i, movie) {
    movieHTML += "<li><div class='poster-wrap'>";
    if (typeof movie.Poster != "undefined") {
      movieHTML += "<img class='movie-poster' src=" + movie.Poster + ">";
      }
    else {
      movieHTML += "<i class='material-icons poster-placeholder'>crop_original</i>";
      }
    movieHTML += "</div>";
    movieHTML += "<span class='movie-title'>" + movie.Title + "</span>";
    movieHTML += "<span class='movie-year'>" + movie.Year + "</span>   </li>";
  });
  }
  else {
    movieHTML += "<li class='no-movies'> <i class='material-icons icon-help'>help_outline</i>No movies found that match: [search form value].</li>"
  }
  $('.movie-list').html(movieHTML);
}
$.getJSON(omdbAPI, omdbOptions, displayMovies);
});
});
