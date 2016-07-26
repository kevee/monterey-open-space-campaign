(function($) {
  $(document).ready(function() {
    SmartUnderline.init({ location : '.content' });
    $(window).on('resize', function() {
      if($(window).width() <= 992) {
        $('#map').css('height', '400px');
        return;
      }
      $('#map').css('height', $('#main-content').height() + 'px');
    });
    $(window).trigger('resize');
  });
})(jQuery);

var mapReady = function() {
  var centerLatLng = new google.maps.LatLng(36.6151843,-121.8525035);
  var mapOptions = {
    zoom: 11,
    center: centerLatLng,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    disableDefaultUI: true,
    scrollwheel: false
  };
  var map = new google.maps.Map(document.getElementById("map"),
      mapOptions);
  map.data.loadGeoJson('js/map.json');
};
