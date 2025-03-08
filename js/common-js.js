jQuery(document).ready(function () {
  //collapse navigation for web
  // jQuery(".hamburger-icon").on("click", function () {
  //   if (jQuery(".chapter-topics-layout").hasClass("open")) {
  //     console.log("collapse");

  //     jQuery(".right-side-wrapper").addClass("full-width");
  //     jQuery(".chapter-topics-layout").removeClass("open");
  //   } else {
  //     console.log("open");
  //     jQuery(".chapter-topics-layout").addClass("open");
  //     jQuery(".right-side-wrapper").removeClass("full-width");
  //   }
  // });

  jQuery(".topic-link").click(function (e) {
    e.preventDefault();
    // jQuery(this).next().slideToggle();
    // jQuery(this).toggleClass("active");
    console.log("hii");

    if (jQuery(this).hasClass("active") === false) {
      jQuery(".topic-link").removeClass("active");
      jQuery(this).addClass("active");
    }
  });
  jQuery(".mobile-topic-close").click(function () {
    jQuery(".chapter-topics-layout").animate({ left: "-100%" }, 500);
  });

  //search popup
  jQuery(".search-btn").on("click", function () {
    jQuery(".search-popup").addClass("active");
  });
  jQuery(".popup-overlay").on("click", function () {
    jQuery(".search-popup").removeClass("active");
  });

  $(".hamburger-icon").click(function () {
    // Assuming you have a toggle button/element with class toggle-nav
    $(".chapter-topics-layout").toggleClass("open");
    $(".right-side-wrapper").toggleClass("full-width");
  });

  if (window.innerWidth <= 1112) {
    jQuery(".mobile-close").on("click", function () {
      jQuery(".chapter-topics-layout").removeClass("open");
    });
  }

  //accordian jquery
  $(".pannel-section").click(function (e) {
    var $pannelSection = $(this);
    var $link = $pannelSection.find(".updates-links"); // Find the associated link
    var $target = $($link.data("href")); // Find the associated content

    // Prevent the default anchor behavior if the click was on the link itself.
    if (
      $(e.target).hasClass("updates-links") ||
      $(e.target).closest(".updates-links").length
    ) {
      e.preventDefault();
    }

    if ($pannelSection.hasClass("active")) {
      $target.slideUp(500, function () {
        $pannelSection.removeClass("active");
      });
    } else {
      $target.slideDown(500, function () {
        $pannelSection.addClass("active");
      });
    }
  });

  //profile popup icon
  jQuery(".avtar-plot,.profile-name,.arrow").on("click", function () {
    jQuery(".profile-popup").toggleClass("show-profile-items");
    jQuery(".notification-popup").removeClass("show-noti-items");
  });

  //notification popup icon
  jQuery(".notification-btn").on("click", function () {
    jQuery(".notification-popup").toggleClass("show-noti-items");
    jQuery(".profile-popup").removeClass("show-profile-items");
  });

  if (window.innerWidth <= 1112) {
    jQuery(".search-btn").on("click", function () {
      jQuery(".search-popup").addClass("active");
    });
  }
});
