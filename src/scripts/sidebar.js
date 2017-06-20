$(document).ready(function () {
    $(".push_menu").click(function () {
        $(".wrapper").toggleClass("active");
    });
    $('#close_sidebar').click(function (e) {
        var container = $(".wrapper");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $(".wrapper").toggleClass("inactive");
        }
        else {
            $(".wrapper").toggleClass("active");
        }
    });
    
      $(".nav_item_link").on("click", function() {
      $(".nav_item_link").removeClass("active");
      $(this).addClass("active");
    });
});