

function allMovies() {

	jQuery.ajax({
    url: "https://api.internationalshowtimes.com/v4/movies?lang=fr",
    type: "GET",
    data: {
        "countries": "FR",
    },
    headers: {
        "X-API-Key": "nce8u3Rq5yNq0jL9FjpmxZ8jWCzv9xvw",
    },
	})
	.done(function(data, textStatus, jqXHR) {
	    console.log("HTTP Request Succeeded: " + jqXHR.status);
	    console.log(data);
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
	    console.log("HTTP Request Failed");
	})
	.always(function() {
	    /* ... */
	});

}



function displayMovieWithId(id) {

	jQuery.ajax({
    url: "https://api.internationalshowtimes.com/v4/movies/"+id,
    type: "GET",
    data: {
        "countries": "FR",
    },
    headers: {
        "X-API-Key": "nce8u3Rq5yNq0jL9FjpmxZ8jWCzv9xvw",
    },
	})
	.done(function(data, textStatus, jqXHR) {
	    console.log("HTTP Request Succeeded: " + jqXHR.status);
	    console.log(data);
	    var url = data.movie.trailers[0].trailer_files[0].url;

	    youtube = url.split('=');
	 


	   //

	   $('#video').attr('src', 'https://www.youtube.com/embed/'+youtube[1]);
	 	 $('#desc').text(data.movie.synopsis);
	   $('#sortie').text(data.movie.release_dates.FR[0].date);
	   $('#author').text(data.movie.crew[0].name);

	   var cast = '';
	   for (var i =0; i < 3; i++ ) {
	   		cast += data.movie.cast[i].name+', ';
	   }
	 	 $('#cast').text(cast);

	 	 $('#theme').text(data.movie.genres[0].name);
	 	 
	  
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
	    console.log("HTTP Request Failed");
	})
	.always(function() {
	    /* ... */
	});

}


function searchMovie(string){
	jQuery.ajax({
    url: "https://api.internationalshowtimes.com/v4/movies?search_query="+string+"&search_field=title",
    type: "GET",
    data: {
        "countries": "FR",
    },
    headers: {
        "X-API-Key": "nce8u3Rq5yNq0jL9FjpmxZ8jWCzv9xvw",
    },
	})
	.done(function(data, textStatus, jqXHR) {
	    console.log("HTTP Request Succeeded: " + jqXHR.status);
	    console.log(data);
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
	    console.log("HTTP Request Failed");
	})
	.always(function() {
	    /* ... */
	});
}

function getCine(){
	jQuery.ajax({
    url: "https://api.internationalshowtimes.com/v4/cinemas",
    type: "GET",
    data: {
        "countries": "FR",
    },
    headers: {
        "X-API-Key": "nce8u3Rq5yNq0jL9FjpmxZ8jWCzv9xvw",
    },
	})
	.done(function(data, textStatus, jqXHR) {
	    console.log("HTTP Request Succeeded: " + jqXHR.status);
	    console.log(data);
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
	    console.log("HTTP Request Failed");
	})
	.always(function() {
	    /* ... */
	});
}

function getOneCinemaWithGeo(latlong) {
	jQuery.ajax({
    url: "https://api.internationalshowtimes.com/v4/cinemas?location="+latlong+"&distance=1",
    type: "GET",
    data: {
        "countries": "FR",
    },
    headers: {
        "X-API-Key": "nce8u3Rq5yNq0jL9FjpmxZ8jWCzv9xvw",
    },
	})
	.done(function(data, textStatus, jqXHR) {
	    console.log("HTTP Request Succeeded: " + jqXHR.status);
	    console.log(data);
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
	    console.log("HTTP Request Failed");
	})
	.always(function() {
	    /* ... */
	});
} 

function showtimesPerMovieInSpecificCity(cityId, movieId) {
	jQuery.ajax({
    url: "https://api.internationalshowtimes.com/v4/showtimes?city_ids="+cityId+"&movie_id="+movieId,
    type: "GET",
    data: {
        "countries": "FR",
    },
    headers: {
        "X-API-Key": "nce8u3Rq5yNq0jL9FjpmxZ8jWCzv9xvw",
    },
	})
	.done(function(data, textStatus, jqXHR) {
	    console.log("HTTP Request Succeeded: " + jqXHR.status);
	    console.log(data);
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
	    console.log("HTTP Request Failed");
	})
	.always(function() {
	    /* ... */
	});
}

function getAllCities(){
	jQuery.ajax({
    url: "https://api.internationalshowtimes.com/v4/cities?query=Paris",
    type: "GET",
    data: {
        "countries": "FR",
    },
    headers: {
        "X-API-Key": "nce8u3Rq5yNq0jL9FjpmxZ8jWCzv9xvw",
    },
	})
	.done(function(data, textStatus, jqXHR) {
	    console.log("HTTP Request Succeeded: " + jqXHR.status);
	    console.log(data);
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
	    console.log("HTTP Request Failed");
	})
	.always(function() {
	    /* ... */
	});
}

function getCityWithLocation(geo){
	jQuery.ajax({
    url: "https://api.internationalshowtimes.com/v4/cities?near_to="+geo+"&distance=1",
    type: "GET",
    data: {
        "countries": "FR",
    },
    headers: {
        "X-API-Key": "nce8u3Rq5yNq0jL9FjpmxZ8jWCzv9xvw",
    },
	})
	.done(function(data, textStatus, jqXHR) {
	    console.log("HTTP Request Succeeded: " + jqXHR.status);
	    console.log(data);
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
	    console.log("HTTP Request Failed");
	})
	.always(function() {
	    /* ... */
	});
}

