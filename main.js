var mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZGVmb3JtYXMiLCJhIjoiY2lsdTJheXJoMDA1NnVqbTQyc3YyZzAzMiJ9.TuVRIhPw8cYOXuE3RwZgOA'
}).addTo(mymap);

var marker = null;

function onMapClick(e) {
    if (marker === null) {
        marker = L.marker(e.latlng, {draggable: true}).addTo(mymap);
    } else {
        marker.setLatLng(e.latlng);
    }
}
mymap.on('click', onMapClick);

$('#scrollable-dropdown-menu2 .typeahead').on('typeahead:selected', function(event, datum) {
  var point = L.latLng(datum.geometry.coordinates[1], datum.geometry.coordinates[0]);
  if (marker === null) {
    marker = L.marker(point, {draggable: true}).addTo(mymap);
  } else {
    marker.setLatLng(point);
  }
  mymap.panTo(point);

});


var photonSearch = new Bloodhound({
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    datumTokenizer: function(photonSearch) {
        return Bloodhound.tokenizers.whitespace(photonSearch.value);
    },
    remote: {
        url: 'http://photon.komoot.de/api/?q=%QUERY',
        wildcard: '%QUERY',
        filter: function(response) {    
          return response.features;
        }
    }
});


var categories = 
[
    'bar', 'biergarten', 'cafe', 'fast food', 'food court', 'pub', 'restaurant',
    'ambulance station', 'emergency phone', 'fire hydrant', 'fire station', 'fire water pond', 'police'
];


var categorySearch = new Bloodhound({
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    local: categories
});


photonSearch.initialize();
categorySearch.initialize();

$('#scrollable-dropdown-menu1 .typeahead').typeahead({
    minLength: 1,
    highlight: true
}, 
{
  name: 'categories',
  source: categorySearch.ttAdapter(),
  templates: {
    empty: [
      '<div class="empty-message">',
        ' No matching',
      '</div>'
    ].join('\n')
  },
  displayKey: function(features) {
    return features;
  }

});

$('#scrollable-dropdown-menu2 .typeahead').typeahead({
  minLength: 2,
  highlight: true
},
{
  name: 'addresses',
  source: photonSearch.ttAdapter(),
  templates: {
    empty: [
      '<div class="empty-message">',
        ' unable to find any',
      '</div>'
    ].join('\n')
  },
  displayKey: function(features) {
    var result = features.properties.name + ' : ';

    if (typeof features.properties.country !== 'undefined') {
        result += features.properties.country;
    } else {
        return result;
    }
    if (typeof features.properties.city !== 'undefined') {
        result += ', ' + features.properties.city;
    } else {
        return result;
    }
    if (typeof features.properties.street !== 'undefined') {
        result += ', ' + features.properties.street;
    }
    if (typeof features.properties.housenumber !== 'undefined') {
        result += ', ' + features.properties.housenumber;
    }
    return result;
  }
});

function onSendClick(e) {
    if (marker !== null) {
        $.post("http://api.openstreetmap.org/api/0.6/notes?lat=" + 
            marker.getLatLng().lat + "&lon=" + marker.getLatLng().lng + "&text=" + 
            "organization: " + $("#orgName").val() + ", category:" + $("#orgCategory").val() +
            ", phone: " + $("#phone").val() + ", website: " + $("#website").val()
            );
        $("success-alert").show();
        setTimeout($("success-alert").hide(), 5);
    }
}
$("#create_note").on('click', onSendClick);


// if ($("#inputAddress").val())