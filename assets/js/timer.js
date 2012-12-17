(function($) {
  "use strict";

  $( function() {

    console.time('foo');
    for (var i = 10000; i >= 0; i--) {
      $(this)['foo'] = 'foo';
    }

    console.timeEnd('foo');

    console.time('bar');
    var $this = $(this);
    for (var i = 10000; i >= 0; i--) {
      $this['bar'] = 'bar';
      // console.log('bar');
    }
    console.timeEnd('bar');


  });
})(jQuery);