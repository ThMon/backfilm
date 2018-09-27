// recupération paramètre


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
  console.log('la');
} else {
  // Pas de support, proposer une alternative ?
  console.log('pas la');
}

function position(pos) {
	console.log('latitude', pos.coords.latitude);
	console.log('longitude', pos.coords.longitude);

}

navigator.geolocation.getCurrentPosition(position);


// récupération date

function automatiseCalendar() {
	var date = new Date();

	var days = ['Dim','Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];


	var tab = [];

	tab.push({
		id: 1,
		day: days[date.getDay()],
		num: date.getDate(),
		full: date
	});

	$('#date-1 .s1').text(days[date.getDay()]);
	$('#date-1 .s2').text(date.getDate());
	$('#date-1').attr('data-date', date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate());

	for (var i = 2; i < 8; i++) {
		date.setDate(date.getDate() + 1);
		$('#date-'+i+' .s1').text(days[date.getDay()]);
		$('#date-'+i+' .s2').text(date.getDate());
		$('#date-'+i).attr('data-date', date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate());
		
		tab.push({
			id: i,
			day: days[date.getDay()],
			num: date.getDate(),
			full: date
		});
	}

console.log(tab);

}

automatiseCalendar()


// select date
// gestion requete en fonction de la localisation et date 

function changeSelectedDay() {
	
	$('.days li').removeClass('blue');
	

	$(this).addClass('blue')

}

$('.days li').on('click', changeSelectedDay);
