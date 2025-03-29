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

  //bookmarked jquery
  jQuery(".bookmark").on("click", function () {
    let svg = $(this).find("svg");

    // Toggle the fill color between white and yellow
    let isBookmarked = svg.attr("data-bookmarked") === "true";

    svg
      .attr("fill", isBookmarked ? "none" : "#ff1493") // Change fill color
      .attr("data-bookmarked", !isBookmarked); // Toggle state
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

  //show quiz popup
  jQuery(".pannel-link.quiz").on("click", function (e) {
    e.stopPropagation();
    jQuery(".quiz-popup-modal").fadeIn();
  });

  jQuery(".quiz-popup-modal .popup-overlay,.quiz-popup-title .close-popup").on(
    "click",
    function (e) {
      //e.stopPropagation();
      jQuery(".quiz-popup-modal").fadeOut();
    }
  );
  //Quiz page timer js
  let timeLeft = 3600; // 60 minutes in seconds

  function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    // Format time as MM:SS
    $("#timer").text(`${minutes}:${seconds.toString().padStart(2, "0")}`);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      $("#timer").text("Time's up!");
    } else {
      timeLeft--;
    }
  }

  // Start the timer on page load
  let timerInterval = setInterval(updateTimer, 1000);

  function makeDraggable() {
    $(".answer-box").draggable({
      revert: "invalid",
      helper: "clone",
    });
  }

  makeDraggable();

  $(".drag-answer-box").droppable({
    accept: ".answer-box",
    drop: function (event, ui) {
      let draggedAnswer = ui.draggable;
      let targetBox = $(this);

      let existingAnswer = targetBox.children(".answer-box");

      if (existingAnswer.length) {
        // Swap existing answer back to its original place
        let originalParent = draggedAnswer.parent();
        existingAnswer.detach().appendTo(originalParent);
      }

      // Fully replace the `drag-answer-box` content with the new answer
      targetBox.empty().append(draggedAnswer.detach().css({ width: "150px" }));

      makeDraggable(); // Ensure draggable behavior remains after dropping
    },
  });

  /*$("#check").click(function() {
                $(".drag-answer-box").each(function() {
                    let correctAnswer = $(this).data("answer");
                    let userAnswer = $(this).children(".answer-box").data("answer");

                    if (correctAnswer === userAnswer) {
                        $(this).addClass("correct").removeClass("wrong");
                    } else {
                        $(this).addClass("wrong").removeClass("correct");
                    }
                });
            });*/

  //
  let currentQuestion = 1;
  const totalQuestions = $(".question").length;

  $("#total-questions").text(totalQuestions);

  function updateQuestion() {
    $(".question").removeClass("active");
    $('.question[data-index="' + currentQuestion + '"]').addClass("active");
    $("#current-question").text(currentQuestion);

    $(".prev").prop("disabled", currentQuestion === 1);
    $(".next").prop("disabled", currentQuestion === totalQuestions);
    /*$(".next").text(currentQuestion === totalQuestions ? "Submit" : "Next");*/
  }

  $(".next").click(function () {
    if (currentQuestion < totalQuestions) {
      currentQuestion++;
      updateQuestion();
    }
  });

  $(".prev").click(function () {
    if (currentQuestion > 1) {
      currentQuestion--;
      updateQuestion();
    }
  });

  $(".options-wrapper input[type=radio]").on("change", function () {
    let allAnswered =
      $(".options-wrapper input[type=radio]:checked").length ===
      $(".options-wrapper input[type=radio]").length / 3;
    if (allAnswered) {
      $("#submit-btn").prop("disabled", false).addClass("enabled");
    }

    $("#submit-btn")
      .off("click")
      .on("click", function () {
        alert("Quiz submitted successfully!");
      });
  });

  $(".question-hamburger-wrapper li").on("click", function () {
    let target = $(this).data("target"); // Get the target question ID

    $(".question-hamburger-wrapper li").removeClass("active");
    $(this).addClass("active");

    $(".question").removeClass("active"); // Hide all questions
    $("#" + target).addClass("active"); // Show selected question
  });

  //Homepage vertical tabs
  jQuery(".tab-link").click(function(event) {
    event.preventDefault();

    // Remove active class from all tabs and content
    $(".tab-link").removeClass("active");
    $(".tab-content").hide();

    // Add active class to clicked tab
    $(this).addClass("active");

    // Show corresponding content
    var tabId = $(this).data("tab");
    $("#" + tabId).show();
  });

  var owl = jQuery(".owl-carousel");

  owl.owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive:{
        0:{ items:1 },
        600:{ items:1 },
        1000:{ items:1 }
},
    onTranslate: function(event) {
        // Delay typing animation slightly to allow slide transition
        setTimeout(function() {
            let activeSlide = jQuery(event.target).find(".owl-item.active .banner-heading");
            startTyping(activeSlide, 100);
        }, 300); 
    }
  });

  // Function to apply typing effect
  function startTyping(element, speed) {
    if (!element.length) return; // Exit if no element found

    let text = element.attr("data-text"); // Get original text from data attribute
    element.html(""); // Clear text
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            element.append(text.charAt(i));
            i++;
            setTimeout(typeWriter, speed);
        } else {
            element.siblings(".cursor").fadeOut(); // Hide cursor after typing
        }
    }
    typeWriter();
  }

  // Store text in data attribute and clear initial text
  jQuery(".banner-heading").each(function() {
    jQuery(this).attr("data-text", jQuery(this).text()).html(""); // Save text and clear
  });

  // Start typing effect for the first slide after a slight delay
  setTimeout(() => {
    startTyping(jQuery(".owl-item.active .banner-heading"), 100);
  }, 500); // Ensures Owl Carousel loads before starting typing effect

  //Homepage Logo slider
  var swiper = new Swiper(".logo-slider-container .swiper", {
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

  //Header hamburger in mobile-close
  jQuery(".hamburger").click(function(){
    jQuery(".side-menu").addClass("active");
  });

  jQuery(".close-btn").click(function(){
    jQuery(".side-menu").removeClass("active");
  });
});
