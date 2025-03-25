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
});
