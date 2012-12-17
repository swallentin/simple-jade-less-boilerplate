  var options = {
      center: new google.maps.LatLng(60.12, 18.64),
      zoom: 5,
      mapTypeId: 'terrain'
    },
    mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, options);

    // smart thinking from google guy here, usually you have data in a differrent format then the api your are using.
    // the code below just rebuilds the markers array so it contains google.maps.Marker and its positin in LatLng)

    function processMarkers(markers) {
      if (markers) {
        for (var level in markers) {
          for (var i = 0; i < markers[level].length; i++) {
            var details = markers[level][i];
            markers[level][i] = new google.maps.Marker({
              title: details.level,
              position: new google.maps.LatLng(
                  details.location[0], details.location[1]),
              clickable: false,
              draggable: true,
              flat: true
            });
          }
        }
      }
      return markers;
    }

    markers = processMarkers(markers);

    var mgr = new MarkerManager(map, { trackMarkers: true, maxZoom: 15});
    google.maps.event.addListener(mgr, 'loaded', function(){
      mgr.addMarkers(markers.countries, 0, 5);
      mgr.addMarkers(markers.places, 6, 11);
      mgr.addMarkers(markers.locations, 12);
      mgr.refresh();
    });
    var mc = new MarkerClusterer(map, markers.locations, {maxZoom: 15});