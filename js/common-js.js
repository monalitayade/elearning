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
    autoplayTimeout: 8000,
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
            startTyping(activeSlide, 200);
        }, 500); 
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
  
  if (window.innerWidth <= 768) {
	$(".dropbtn").click(function(){
		$(".dropdown-content").toggle();
	});

	// Close dropdown when clicking outside
	$(document).click(function(e) {
		if (!$(e.target).closest(".dropdown").length) {
			$(".dropdown-content").hide();
		}
	});
  }

	// Hide/show registration/Login form on button click
	
	// Initially hide login form
    jQuery('.login-container').hide();

    // Show login form, hide registration form
    jQuery('.show-login-form').click(function (event) {
        event.preventDefault();
        jQuery('.registration-container').fadeOut(300, function () {
            jQuery('.login-container').fadeIn(300);
        });
    });

    // Show registration form, hide login form
    jQuery('.show-registration-form').click(function (event) {
        event.preventDefault();
        jQuery('.login-container').fadeOut(300, function () {
            jQuery('.registration-container').fadeIn(300);
        });
    });
	
	//My profile page choose profile photo js
	jQuery('#file-input').on('change', function (e) {
      const file = e.target.files[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        jQuery('#preview').attr('src', previewUrl).on('load', function () {
          URL.revokeObjectURL(previewUrl);
        });
        jQuery('#file-name').text(`${file.name}`);
      }
    });
  
});

//Fullpage and inside page loader js
$(window).on('load', function () {
	// Hide the full page loader after 3 seconds (simulate page load time)
	setTimeout(function () {
		$('.full-loader').fadeOut();  // Hide the full page loader
		$('.main-content').fadeIn();  // Show the main content
	}, 4000);  // Adjust the time here for the page load delay
});

// Content inside a specific container (div loader)
$(document).ready(function() {
	setTimeout(function () {
		$('.content-loader').fadeOut();  // Hide the content loader
		$('.content').fadeIn();          // Show the actual content
	}, 7000);  // Adjust the time here for the specific container loading delay
});

window.addEventListener('DOMContentLoaded', function () {
	let myPieChart1, myPieChart2, halfCircleChart, myBarChart1, myBarChart2, 
		reportPieChart1, reportPieChart2, reportHalfCircleChart, reportBarChart1, reportBarChart2;

	// myPieChart1
	var myPieChart1Canvas = document.getElementById("myPieChart1");
	if (myPieChart1Canvas) {
		if (myPieChart1) {
			myPieChart1.destroy();
		}
		var ctxMyPieChart1 = myPieChart1Canvas.getContext("2d");
		myPieChart1 = new Chart(ctxMyPieChart1, {
			type: "pie",
			data: {
				labels: ["Performance", "Performance"],
				datasets: [{
					data: [50, 50],
					backgroundColor: ["#7539cd", "#f7cdea"]
				}]
			},
			options: {
				responsive: true,
				animation: false
			}
		});
	}

	// myPieChart2
	var myPieChart2Canvas = document.getElementById("myPieChart2");
	if (myPieChart2Canvas) {
		if (myPieChart2) {
			myPieChart2.destroy();
		}
		var ctxMyPieChart2 = myPieChart2Canvas.getContext("2d");
		myPieChart2 = new Chart(ctxMyPieChart2, {
			type: "pie",
			data: {
				labels: ["Performance", "Performance"],
				datasets: [{
					data: [65, 35],
					backgroundColor: ["#7539cd", "#f7cdea"]
				}]
			},
			options: {
				responsive: true,
				animation: false
			}
		});
	}
	
	// halfCircleChart
	var halfCircleChartCanvas = document.getElementById("halfCircleChart");
	if (halfCircleChartCanvas) {
		if (halfCircleChart) {
			halfCircleChart.destroy();
		}
		var ctxHalfCircleChart = halfCircleChartCanvas.getContext("2d");
		halfCircleChart = new Chart(ctxHalfCircleChart, {
			type: "doughnut",
			data: {
				labels: ["Performance", "Performance"],
				datasets: [{
					data: [40, 60], // Values
					backgroundColor: ["#7539cd", "#f7cdea"]
				}]
			},
			options: {
				responsive: true,
				rotation: -90,  // Start at the top
				circumference: 180,  // Half-circle (180 degrees)
				cutout: "50%", // Controls thickness (adjust as needed)
				animation: false
			}
		});
	}
	
	var myBarChart1Canvas = document.getElementById("myBarChart1");
	if (myBarChart1Canvas) {
		if (myBarChart1) {
			myBarChart1.destroy();
		}
		var ctxMyBarChart1 = myBarChart1Canvas.getContext("2d");
		myBarChart1 = new Chart(ctxMyBarChart1, {
			type: "bar",
			data: {
				labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Yellow", "Green", "Purple", "Red", "Blue", "Yellow", "Green", "Purple", "Yellow", "Green", "Purple", "Yellow", "Green", "Purple"],
				datasets: [{
					label: "Votes",
					data: [5, 5, 5, 5, 5, 5, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], // Data values
					backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8E44AD"],
					borderColor: ["#C62828", "#1565C0", "#FF8F00", "#2E7D32", "#6A1B9A", "#FF8F00", "#2E7D32", "#6A1B9A", "#C62828", "#1565C0", "#FF8F00", "#2E7D32", "#6A1B9A", "#FF8F00", "#2E7D32", "#6A1B9A", "#FF8F00", "#2E7D32", "#6A1B9A"],
					borderWidth: 1
				}]
			},
			options: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: true
					}
				},
				animation: false
			}
		});
	}
	
	var myBarChart2Canvas = document.getElementById("myBarChart2");
	if (myBarChart2Canvas) {
		if (myBarChart2) {
			myBarChart2.destroy();
		}
		var ctxMyBarChart2 = myBarChart2Canvas.getContext("2d");
		myBarChart2 = new Chart(ctxMyBarChart2, {
			type: "bar",
			data: {
				labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Yellow", "Green", "Purple"],
				datasets: [{
					label: "Votes",
					data: [10, 10, 10, 10, 10, 20, 10, 20], // Data values
					backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8E44AD"],
					borderColor: ["#C62828", "#1565C0", "#FF8F00", "#2E7D32", "#6A1B9A", "#FF8F00", "#2E7D32", "#6A1B9A"],
					borderWidth: 1
				}]
			},
			options: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: true
					}
				},
				animation: false
			}
		});
	}

	// reportPieChart1
	var reportPieChart1Canvas = document.getElementById("reportPieChart1");
	if (reportPieChart1Canvas) {
		if (reportPieChart1) {
			reportPieChart1.destroy();
		}
		var ctxReportPieChart1 = reportPieChart1Canvas.getContext("2d");
		reportPieChart1 = new Chart(ctxReportPieChart1, {
			type: "pie",
			data: {
				labels: ["Performance", "Performance"],
				datasets: [{
					data: [50, 50],
					backgroundColor: ["#7539cd", "#f7cdea"]
				}]
			},
			options: {
				responsive: true,
				animation: false
			}
		});
	}

	// reportPieChart2
	var reportPieChart2Canvas = document.getElementById("reportPieChart2");
	if (reportPieChart2Canvas) {
		if (reportPieChart2) {
			reportPieChart2.destroy();
		}
		var ctxReportPieChart2 = reportPieChart2Canvas.getContext("2d");
		reportPieChart2 = new Chart(ctxReportPieChart2, {
			type: "pie",
			data: {
				labels: ["Performance", "Performance"],
				datasets: [{
					data: [65, 35], // Values
					backgroundColor: ["#7539cd", "#f7cdea"]
				}]
			},
			options: {
				responsive: true,
				animation: false
			}
		});
	}
	
	var reportHalfCircleChartCanvas = document.getElementById("reportHalfCircleChart");
	if (reportHalfCircleChartCanvas) {
		if (reportHalfCircleChart) {
			reportHalfCircleChart.destroy();
		}
		var ctxReportHalfCircleChart = reportHalfCircleChartCanvas.getContext("2d");
		reportHalfCircleChart = new Chart(ctxReportHalfCircleChart, {
			type: "doughnut",
			data: {
				labels: ["Performance", "Performance"],
				datasets: [{
					data: [40, 60], // Values
					backgroundColor: ["#7539cd", "#f7cdea"]
				}]
			},
			options: {
				responsive: true,
				rotation: -90,  // Start at the top
				circumference: 180,  // Half-circle (180 degrees)
				cutout: "50%", // Controls thickness (adjust as needed)
				animation: false
			}
		});
	}
	
	var reportBarChart1Canvas = document.getElementById("reportBarChart1");
	if (reportBarChart1Canvas) {
		if (reportBarChart1) {
			reportBarChart1.destroy();
		}
		var ctxReportBarChart1 = reportBarChart1Canvas.getContext("2d");
		reportBarChart1 = new Chart(ctxReportBarChart1, {
			type: "bar",
			data: {
				labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Yellow", "Green", "Purple", "Red", "Blue", "Yellow", "Green", "Purple", "Yellow", "Green", "Purple", "Yellow", "Green", "Purple"],
				datasets: [{
					label: "Votes",
					data: [5, 5, 5, 5, 5, 5, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], // Data values
					backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8E44AD"],
					borderColor: ["#C62828", "#1565C0", "#FF8F00", "#2E7D32", "#6A1B9A", "#FF8F00", "#2E7D32", "#6A1B9A", "#C62828", "#1565C0", "#FF8F00", "#2E7D32", "#6A1B9A", "#FF8F00", "#2E7D32", "#6A1B9A", "#FF8F00", "#2E7D32", "#6A1B9A"],
					borderWidth: 1
				}]
			},
			options: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: true
					}
				},
				animation: false
			}
		});
	}
	
	var reportBarChart2Canvas = document.getElementById("reportBarChart2");
	if (reportBarChart2Canvas) {
		if (reportBarChart2) {
			reportBarChart2.destroy();
		}
		var ctxReportBarChart2 = reportBarChart2Canvas.getContext("2d");
		reportBarChart2 = new Chart(ctxReportBarChart2, {
			type: "bar",
			data: {
				labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Yellow", "Green", "Purple"],
				datasets: [{
					label: "Votes",
					data: [10, 10, 10, 10, 10, 20, 10, 20], // Data values
					backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8E44AD"],
					borderColor: ["#C62828", "#1565C0", "#FF8F00", "#2E7D32", "#6A1B9A", "#FF8F00", "#2E7D32", "#6A1B9A"],
					borderWidth: 1
				}]
			},
			options: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: true
					}
				},
				animation: false
			}
		});
	}
});

