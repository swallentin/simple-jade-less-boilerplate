(function($) {
  "use strict";

  $( function() {

    $(".map").gmaps({
      center: [62.1655019058381, 12.6123046875],
      zoom: 5,
      mapTypeId: 'terrain',
      markers: data,
      mapTypeControl: false
    });
  });

})(jQuery);