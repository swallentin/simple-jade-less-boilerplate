(function($) {

  function processData(data, map) {

    if(!data) return [];

    var copy = $.extend({}, data);

    for(var level in data) {
      for(var i = 0; i < data[level].length; i++) {
        var details = data[level][i];
        var marker = new google.maps.Marker({
          title: details.level,
          position: new google.maps.LatLng(
          details.location[0], details.location[1]),
          clickable: true,
          draggable: false,
          flat: true
        });

        copy[level][i] = $.extend(copy[level][i], marker);

      }
    }
    return copy;
  }


  var maps = function(options) {

      $.each(this, function(i, element) {

        options.center = new google.maps.LatLng(options.center[0], options.center[1]);

        var $this = $(this),
            content = '',
            infoWindow = new google.maps.InfoWindow({
              content: content
            });

        var map = new google.maps.Map(element, options);
        options.markers = processData(options.markers, map);

        var mgr = new MarkerManager(map, {
          trackMarkers: true,
          maxZoom: 15
        });


        var markers = [].concat(options.markers['Offentliga kliniker'], options.markers['Privata kliniker']);

        var mc = new MarkerClusterer(map, markers, {
          maxZoom: 15
        });

        var clickedClinic = function(e) {
          infoWindow.close();
          map.setZoom(14);
          map.setCenter(this.position);

          var content = "<div class='infowindow'><div>$name</div><div>$phone</div><a href='$link'>Hemsida</a></div>"
                        .replace("$name", this.name)
                        .replace("$phone", this.phone)
                        .replace("$link", this.link);

          infoWindow.setContent(content);
          infoWindow.open(map, this);
          e.preventDefault();
        };

        google.maps.event.addListenerOnce(map, 'idle', function() {
          var html = $("<div/>", {
                      'class': 'clinics'
                  });

          for(var level in options.markers) {

            $('<h2/>').text(level).appendTo(html);
            var ul = $('<ul/>').appendTo(html);

            for(var i = options.markers[level].length - 1; i >= 0; i--) {
              var li = $('<li/>').appendTo(ul);
              $("<a/>").attr('href', '#')
                       .text(options.markers[level][i].name)
                       .click($.proxy(clickedClinic, options.markers[level][i]))
                       .appendTo(li);

              google.maps.event.addListener(options.markers[level][i], "click", $.proxy(clickedClinic, options.markers[level][i]));
            }
          }

          $(".map").append(html);
        });



      });
    };

  // add function so that it only creates on instance per call
  $.fn.gmaps = maps;

})(jQuery);