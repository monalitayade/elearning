jQuery(document).ready(function () {
  //sidenavigation animation
  jQuery(".hamburger-icon").on("click", function () {
    console.log("clciked");

    const chapterTopics = $(".chapter-topics-layout");
    if (window.innerWidth > 1112) {
      if (chapterTopics.css("margin-left") === "0px") {
        chapterTopics.animate({ marginLeft: "-300px" }, 500); // Slide out (hide)
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
  jQuery(".avtar-plot, .profile-name, .arrow").on("click", function (e) {
    e.stopPropagation(); // Prevents click from bubbling to document
    jQuery(".profile-popup").toggleClass("show-profile-items");
    jQuery(".notification-popup").removeClass("show-noti-items");
  });

  // Click outside to hide the profile popup
  jQuery(document).on("click", function (e) {
    if (
      !jQuery(e.target).closest(
        ".profile-popup, .avtar-plot, .profile-name, .arrow"
      ).length
    ) {
      jQuery(".profile-popup").removeClass("show-profile-items");
    }
  });

  //notification popup icon
  jQuery(".notification-btn").on("click", function (e) {
    e.stopPropagation(); // Prevents event from reaching document click handler
    jQuery(".notification-popup").toggleClass("show-noti-items");
    jQuery(".profile-popup").removeClass("show-profile-items"); // Hide profile popup when opening notifications
  });

  // Click outside to hide the notification popup
  jQuery(document).on("click", function (e) {
    if (
      !jQuery(e.target).closest(".notification-popup, .notification-btn").length
    ) {
      jQuery(".notification-popup").removeClass("show-noti-items");
    }
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

  $(".illustration-popup-plot .popup-close, .popup-overlay").on(
    "click",
    function () {
      $(".illustration-popup").fadeOut();
    }
  );

  //add note popup

  jQuery(".add-note").on("click", function () {
    jQuery(".illustration-popup").fadeIn();
  });

  // Close the popup when clicking the close button
  jQuery(".popup-close").on("click", function () {
    jQuery(".illustration-popup").fadeOut();
  });

  // Prevent the popup from closing when clicking inside it
  jQuery(".illustration-popup").on("click", function (event) {
    event.stopPropagation();
  });

  //topic page side bar jquery
  jQuery(".chapter-topics-layout.topic-aside .topic-link").click(function (e) {
    e.preventDefault();
    jQuery(this).next().slideToggle();
    jQuery(this).toggleClass("active");
  });

  // Add active class only for topic links **not** inside `.chapter-topics-layout.topic-aside`
  jQuery(".topic-link")
    .not(".chapter-topics-layout.topic-aside .topic-link")
    .click(function (e) {
      e.preventDefault();

      if (!jQuery(this).hasClass("active")) {
        jQuery(".topic-link").removeClass("active");
        jQuery(this).addClass("active");
      }
    });
});
