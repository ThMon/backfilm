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

//console.log(params);

/*
var date = new Date();

console.log(date.getTime());

console.log(date.getTime()+86400);


var date2 = convertirTimestamp(date.getTime());
console.log(date2);

var jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
*/

console.log($('.days li')[0]);

function changeSelectedDay() {
	
		$('.days li').removeClass('blue');
	

	$(this).addClass('blue')

}

$('.days li').on('click', changeSelectedDay);
