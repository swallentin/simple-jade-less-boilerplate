(function($) {


  var parseLatLng = function(input) {
      input = input.replace('(', '').replace(')', '').split(',');

      input[0] = parseFloat(input[0]);
      input[1] = parseFloat(input[1]);

      return input;
    };

  function processMarkers(markers, map) {

    if(!markers) return [];

    var copy = $.extend({}, markers);

    for(var level in markers) {
      for(var i = 0; i < markers[level].length; i++) {
        var details = markers[level][i];
        var marker = new google.maps.Marker({
          title: details.level,
          position: new google.maps.LatLng(
          details.location[0], details.location[1]),
          clickable: true,
          draggable: false,
          flat: true
        });


        var content = '<div>testing</div>';
        var infoWindow = new google.maps.InfoWindow({
          content: content
        });

        copy[level][i] = $.extend({
          name: copy[level][i].name,
          infoWindow: infoWindow
        }, marker);

        google.maps.event.addListener(copy[level][i], "click", function(e) {
          infowindow.open(map, this);
        });
      }
    }
    return copy;
  }

  var maps = function(options) {

      $.each(this, function(i, element) {

        options.center = new google.maps.LatLng(options.center[0], options.center[1]);

        $this = $(this);

        var map = new google.maps.Map(element, options);
        options.markers = processMarkers(options.markers, map);

        var mgr = new MarkerManager(map, {
          trackMarkers: true,
          maxZoom: 15
        });
        var mc = new MarkerClusterer(map, options.markers['Offentliga kliniker'], {
          maxZoom: 15
        });

        google.maps.event.addListenerOnce(map, 'idle', function() {
          var html = $("<div/>", {
            class: 'clinics'
          }),
              ul = $('<ul/>').appendTo(html),
              clinics = options.markers['Offentliga kliniker'];


          var test = function(e) {
            this.infoWindow.open(map, this);
            map.setCenter(this.position)
            e.preventDefault();
          };

          for(var i = clinics.length - 1; i >= 0; i--) {
            var li = $('<li/>').appendTo(ul);
            $("<a/>").attr('href', '#')
                     .text(clinics[i].name)
                     .attr('data-latlng', clinics[i].position.toString())
                     .click($.proxy(test, clinics[i])).appendTo(li);
          }

          $(".map").append(html);
        });



      });
    };

  // add function so that it only creates on instance per call
  $.fn.gmaps = maps;

})(jQuery);