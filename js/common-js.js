jQuery(document).ready(function () {
  //chapter subject slider
  var swiper = new Swiper(".subject-grid-wrapper", {
    slidesPerView: 7,
    spaceBetween: 3,
    loop: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      1336: {
        slidesPerView: 8,
        spaceBetween: 50,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      640: {
        slidesPerView: 2.3,
        spaceBetween: 15,
      },
      0: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
    },
  });

  //sidenavigation animation
  jQuery(".hamburger-icon").on("click", function () {
    const chapterTopics = $(".chapter-topics-layout");
    if (window.innerWidth > 1112) {
      if (chapterTopics.css("margin-left") === "0px") {
        chapterTopics.animate({ marginLeft: "-250px" }, 500); // Slide out (hide)
      } else {
        chapterTopics.animate({ marginLeft: "0px" }, 500); // Slide out (hide)
      }
    } else {
      console.log("chapterTopics", chapterTopics.css("left"));
      if (chapterTopics.css("left") !== "0px") {
        chapterTopics.animate({ left: "0px" }, 500); // Slide out (hide)
      } else {
        chapterTopics.animate({ left: "-100%" }, 500); // Slide out (hide)
      }
    }
  });
  if (window.innerWidth <= 1112) {
    jQuery(".mobile-close").on("click", function () {
      jQuery(".chapter-topics-layout").animate({ left: "-100%" }, 500);
    });
  }

  jQuery(".topic-link").click(function (e) {
    e.preventDefault();

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

  jQuery(".updates-links").click(function (e) {
    jQuery(this).toggleClass("active");
    // jQuery(this).next().toggleClass("active");
    jQuery(this)
      .next()
      .slideToggle(500, function () {
        jQuery(this).toggleClass("active");
      });
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

  //welcome popup jquery
  setTimeout(function () {
    $(".welcome-popup").fadeIn();
  }, 3000);

  $(".close-popup").click(function () {
    $(".welcome-popup").fadeOut();
  });

  //illustration popup
  $(".pannel-btn").on("click", function () {
    var target = $(this).attr("id"); // Get the button ID
    $(".illustration-popup").each(function () {
      if ($(this).data("href") === target) {
        $(this).fadeIn();
      }
    });
  });

  $(".illustration-popup-plot, .popup-overlay").on("click", function () {
    $(".illustration-popup").fadeOut();
  });
});
