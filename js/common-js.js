jQuery(document).ready(function () {
  //for web view
  jQuery(".updates-links").on("click", function () {
    var active_pannel = jQuery(this).attr("data-href");
    var active_pannel = active_pannel.replace(/^#/, ""); // Remove # from start of string
    console.log("active-pannel", active_pannel);
    jQuery(".updates-li .updates-links").parent().removeClass("active");
    jQuery(this).parent().addClass("active");
    jQuery(".updates-links.mob-link ").removeClass("active");
    jQuery(this).addClass("active");
    jQuery(".pannel-block").removeClass("active");
    jQuery(`#${active_pannel}`).addClass("active").show();
  });

  //for mobile and tab view
  // jQuery(".updates-links").on("click", function () {
  //   var active_pannel = jQuery(this).attr("data-href");
  //   var active_pannel = active_pannel.replace(/^#/, ""); // Remove # from start of string
  //   console.log("active-pannel", active_pannel);
  //   // jQuery(".updates-li .updates-links").parent().removeClass("active");
  //   // jQuery(this).parent().addClass("active");
  //   // jQuery(".pannel-block").removeClass("active");
  //   // jQuery(`#${active_pannel}`).addClass("active").show();
  // });
});
