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
    movieHTML += "<li id='" + movie.imdbID + "'><div class='poster-wrap'>";
    if (movie.Poster != "N/A") {
      movieHTML += "<a href = '#' class='movie-poster'><img src=" + movie.Poster + "></a>";
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
        maxVisible: 5,
        }).on('page', function(event, num){
        //event.preventDefault();
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
  $('.poster-wrap').click( function() {
      console.log('click');
      event.preventDefault();
      $("#year").prop('disabled', true);
      $("#search").prop('disabled', true);
      //get movie title & movie year from li element clicked
      var clickID = $(this).parent().attr('id')
      var omdbOptionsClick = {
        i: clickID
      }
      console.log(omdbOptionsClick)
      //create callback function
      var displayDescription = function(data) {
        console.log(data);
        //removes movie search content
        $('#movies').empty();
        $('#pagination').empty();
        //adds the movie description content
        $('.main-content').after('<div class="desc-total"><div class="desc-banner"><a href="#" class="back-button"><i class="material-icons back-icon">keyboard_arrow_left</i> Search Results</a><div class="desc-container"><img src="' + data.Poster + '"><div class="desc-title">' + data.Title + ' (' + data.Year + ')</div><span class="imbd-rating">IMBD rating: ' + data.imdbRating + '</span></div></div><div class="plot"><span class="plot-title">Plot Synopsis:</span>' + data.Plot + '<a href="http://www.imdb.com/title/' + data.imdbID + '" class="imbd-link">View on IMBD</a></div></div>');
        //restart the search when the back button is clicked
        $('.back-button').on('click', function() {
          event.preventDefault();
          $('.desc-total').empty();
          $("#year").prop('disabled', false);
          $("#search").prop('disabled', false);
          searchFunction(1);
        });
      };
      $.getJSON(omdbAPI, omdbOptionsClick, displayDescription);
    });
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
