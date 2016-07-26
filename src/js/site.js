(function($) {
  $(document).ready(function() {
    SmartUnderline.init({ location : '.content' });
    $(window).on('resize', function() {
      if($(window).width() <= 992) {
        $('#map').css('height', '400px');
        return;
      }
      $('#map').css('height', $('#homepage-content').height() + 'px');
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
  map.data.addListener('click', function(event) {
    $('#map-modal .modal-title').html(event.feature.getProperty('title'));
    $('#map-modal .modal-body').html(event.feature.getProperty('description'));
    $('#map-modal').modal('show');
  });
};
