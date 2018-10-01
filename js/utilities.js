// recupération paramètre
var cinema = [];

function extractUrlParams () {
	var t = location.search.substring(1).split('&');

	var f = [];
	for (var i=0; i<t.length; i++) {
	var x = t[ i ].split('=');

	f[x[0]]=x[1];
	}
	return f;
}

var params = extractUrlParams();

// geoloc

if(navigator.geolocation) {
  console.log('il y a la géoloc');
} else {
  // Pas de support, proposer une alternative ?
  console.log('Pas de geoloc');
}

function position(pos) {

	var location = pos.coords.latitude.toFixed(2)+','+pos.coords.longitude.toFixed(2);
	var date = $('.blue').data('date');
	console.log(date);
	console.log(location);
	//requestShowTimesInFrance(46793, pos.coords.latitude+','+pos.coords.longitude, date);
	requestShowTimesInFrance(46793, location, date)


}


//navigator.geolocation.getCurrentPosition(position);




function requestShowTimesInFrance(movieId, location, date) {
	console.log('une date ?',date);

	jQuery.ajax({
		//url: "https://api.internationalshowtimes.com/v4/showtimes?movie_id=46793&countries=FR&location=48.89,2.35&time_to=2018-12-31",

   	url: "https://api.internationalshowtimes.com/v4/showtimes?movie_id="+movieId+"&countries=FR&location="+location+"&time_to=2018-10-8&distance=60",
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
	    console.log('show', data);



	    for (var i = 0; i < data.showtimes.length; i++) {
	    	var seance = splitSeance(data.showtimes[i].start_at); 

	    	if(i == 0) {
	    		cinema.push({
						cineId :  data.showtimes[i].cinema_id,
						show : {
							sc: [seance],
							url: [data.showtimes[i].booking_link]
						}
					});
	    	} 

	    	if (i > 0) {
	    		var test = true;
	    		for (var j = 0; j < cinema.length; j ++) {
	    			if (cinema[j].cineId == data.showtimes[i].cinema_id) {
	    				cinema[j].show.sc.push(seance);
	    				cinema[j].show.url.push(data.showtimes[i].booking_link);
	    				test = false;
	    			}
	    			
	    		}
	    		if (test) {
	    			cinema.push({
							cineId :  data.showtimes[i].cinema_id,
							show : {
								sc: [seance],
								url: [data.showtimes[i].booking_link]
							}
						});
	    		}

	    	}
			  
			    
	    	
	    }
	   

	    console.log('cine', cinema);

	    $('.bas').html('<h3>Réserver mon Billet / Scéances</h3>');
		    for (var k = 0; k < cinema.length; k++) {
		    	getCinemaWithId(cinema[k].cineId, k);
		  }
	    	
	  


	})
	.fail(function(jqXHR, textStatus, errorThrown) {
	    console.log("HTTP Request Failed");
	})
	.always(function() {
	    /* ... */
	});
}


function getCinemaWithId(cineId, index) {
	jQuery.ajax({
    url: "https://api.internationalshowtimes.com/v4/cinemas/"+cineId,
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
	    console.log('place',data);
	    cinema[index].name = data.cinema.name;
	    cinema[index].address = { complete: data.cinema.location.address.display_text, rue: data.cinema.location.address.street, city: data.cinema.location.address.city , zip:  data.cinema.location.address.zipcode};
	    
	   
	    displayCalendar(cinema[index], index);


	})
	.fail(function(jqXHR, textStatus, errorThrown) {
	    console.log("HTTP Request Failed");
	})
	.always(function() {
	    /* ... */
	});
}

function displayCalendar(cinema, index){
	
	
			$('.bas').append('<div class="calendar calendar-'+index+'"></div>');
			$('.calendar-'+index).append('<div class="info-ciné"><div class="zip"><p>'+cinema.address.zip+'</p></div><div class="address-cine"><p>'+cinema.name+'</p><span>'+cinema.address.complete+'</span></div></div>');
			$('.calendar-'+index).append('<div class="hour-info"><ul class="days"></ul></div>');
			for(var i = 1; i < 8; i++) {
				$('.calendar-'+index+' .days').append('<li id="date-'+ i+'" data-pos="'+index+'" data-date=""><span class="s1"></span><span class="s2"></span></li>');
			
			}

			$('.calendar-'+index+' #date-1').addClass('blue');	
			$('.calendar-'+index+' .hour-info').append('<p>En VO :</p>');
			

			//$('.calendar-'+index+' .hour-info').append('<ul class="hours '+cinema.show.sc[0].day+' hide"></ul>');
			
			

			var date2 = new Date();
			var month = date2.getMonth()+1;
			var day = date2.getDay();
			if (month < 10) {
				month = '0'+month;
			}

			if (day < 10) {
				day = '0'+day;
			}

			
			$('.'+date2.getFullYear()+'-'+month+'-'+day).removeClass('hide');

	
			automatiseCalendar(index);

			
			
			
			for (var j=0; j < cinema.show.sc.length; j++) {

				if( $('.calendar-'+index+' .hour-info .'+cinema.show.sc[j].day+' p').text() == 'Aucun film n\'a été trouvé pour cette date') {
					$('.calendar-'+index+' .hour-info .'+cinema.show.sc[j].day).html('<li><a href="'+cinema.show.url[j]+'">'+cinema.show.sc[j].hour+'</a></li>');
				} else {
					$('.calendar-'+index+' .hour-info .'+cinema.show.sc[j-1].day).append('<li><a href="'+cinema.show.url[j]+'">'+cinema.show.sc[j].hour+'</a></li>');
				}

			}

			$(document).on('click','.days li', changeSelectedDay);

}



function splitSeance(string) {
	var hours = string.split('T');
	var day = hours[0];
	var resultHours = hours[1].split(':');
	var result = { day: day, hour: resultHours[0]+':'+resultHours[1] };
	return result;
}





// récupération date

function automatiseCalendar(x) {
	var date = new Date();

	var days = ['Dim','Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];


	/*var tab = [];

	tab.push({
		id: 1,
		day: days[date.getDay()],
		num: date.getDate(),
		full: date
	});*/


	$('.calendar-'+x+' #date-1 .s1').text(days[date.getDay()]);
	$('.calendar-'+x+' #date-1 .s2').text(date.getDate());
	var month = date.getMonth()+1;
	var day = date.getDay();

	if (month < 10) {
		month = '0'+month;
	}

	if (day < 10) {
		day = '0'+day;
	}

	$('.calendar-'+x+' #date-1').attr('data-date', date.getFullYear()+'-'+month+'-'+day);
	$('.calendar-'+x+' .hour-info').append('<ul class="hours '+date.getFullYear()+'-'+month+'-'+day+'"><p>Aucun film n\'a été trouvé pour cette date</p></ul>');

	for (var i = 2; i < 8; i++) {

		date.setDate(date.getDate() + 1);
		var month = date.getMonth()+1;
		var day = date.getDate();

		if (month < 10) {
			month = '0'+month;
		}

		if (day < 10) {
			day = '0'+day;
		}
		$('.calendar-'+x+' #date-'+i+' .s1').text(days[date.getDay()]);
		$('.calendar-'+x+' #date-'+i+' .s2').text(date.getDate());
		$('.calendar-'+x+' #date-'+i).attr('data-date', date.getFullYear()+'-'+month+'-'+day);
		$('.calendar-'+x+' .hour-info').append('<ul class="hours '+date.getFullYear()+'-'+month+'-'+day+' hide"><p>Aucun film n\'a été trouvé pour cette date</p></ul>');

		
	/*	tab.push({
			id: i,
			day: days[date.getDay()],
			num: date.getDate(),
			full: date
		});*/
	}

//console.log(tab);

}

automatiseCalendar(0)


// select date
// gestion requete en fonction de la localisation et date 

function changeSelectedDay() {
	var id = $(this).data('pos');
	var date = $(this).data('date');

	$('.calendar-'+id+' .days li').removeClass('blue');
	$('.calendar-'+id+' .hours').addClass('hide');
	$('.calendar-'+id+' .'+date).removeClass('hide');

	$(this).addClass('blue');
	console.log(id);
	//navigator.geolocation.getCurrentPosition(position);

}

//$(document).on('click','.days li', changeSelectedDay);
