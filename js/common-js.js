jQuery(document).ready(function () {
	//Report page Datatable
	if ($('#report-table').length || $('.common-datatable').length) {
		if ($('#report-table').length) {
			new DataTable('#report-table');
		}
		if ($('.common-datatable').length) {
			new DataTable('#content-report-table');
		}
	}
	
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
    $(".welcome-popup, .slider-popup").fadeIn();
  }, 3000);

  $(".close-popup").click(function () {
    $(".welcome-popup").fadeOut();
	$(".slider-popup").fadeOut();
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

  //Quiz page js
  let currentIndex = 1;

  const totalQuestions = $('.question').length;
  $('#total-questions').text(totalQuestions);

  function showQuestion(index) {
    // Hide all questions and show only current
    $('.question').hide();
    $('#q' + index).show();

    // Update counter
    $('#current-question').text(index);

    // Toggle active class on navigation list
    $('.question-hamburger-wrapper .topic-item').removeClass('active');
    $('.question-hamburger-wrapper .topic-item[data-target="q' + index + '"]').addClass('active');

    // Enable/disable buttons
    $('.pagination-btn-wrapper .prev').prop('disabled', index === 1);
    $('.pagination-btn-wrapper .next').prop('disabled', index === totalQuestions);
  }

  $('.pagination-btn-wrapper .next').click(function () {
    if (currentIndex < totalQuestions) {
      currentIndex++;
      showQuestion(currentIndex);
    }
  });

  $('.pagination-btn-wrapper .prev').click(function () {
    if (currentIndex > 1) {
      currentIndex--;
      showQuestion(currentIndex);
    }
  });

  // On clicking topic directly
  $('.question-hamburger-wrapper .topic-item').click(function () {
	  var target = $(this).data('target');
	  if (target) { // Only proceed if target exists
		currentIndex = parseInt(target.replace('q', ''));
		showQuestion(currentIndex);
	  } else {
		console.warn('No data-target found for this item:', this);
	  }
	});

  // Initialize on load
  showQuestion(currentIndex);

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
        slidesPerView: 7,
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

    // Show login form, hide registration form
    jQuery('.show-login-form').click(function (event) {
        event.preventDefault();
        jQuery('.registration-container').fadeOut(300, function () {
            jQuery('.login-container').fadeIn(300);
			jQuery('.verify-otp-container').fadeOut(300);
			jQuery('.forgot-password-container').fadeOut(300);
        });
    });

    // Show registration form, hide login form
    jQuery('.show-registration-form').click(function (event) {
        event.preventDefault();
        jQuery('.login-container').fadeOut(300, function () {
            jQuery('.registration-container').fadeIn(300);
        });
    });
	
	// Show OTP field
    jQuery('.show-otp-form').click(function (event) {
        event.preventDefault();
        jQuery('.verify-otp-container').fadeIn(300);
    });
	
	// Forgot password click
    jQuery('.forgot-password-link').click(function (event) {
        event.preventDefault();
        jQuery('.login-container').fadeOut(300, function () {
            jQuery('.forgot-password-container').fadeIn(300);
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
	
	//Chat AI page js
	const responses = [
            {
                question: "How many chapters",
                response: "4 chapters"
            },
            {
                question: "Name the subjects available",
                response: `
					<p>Hello, here are the subjects available:</p>
					<div class="query-img-box">
						<div class="query-image">
						  <svg fill="#fff" viewBox="0 0 32 32" version="1.1" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M25.326 30.335l-5.325-6.302v-11.047h0.666c0.552 0 1-0.447 1-1s-0.448-1-1-1h-1.666c-0.552 0-1 0.447-1 1v12.432c0 0.248 0.092 0.486 0.258 0.67l4.074 4.917h-12.665l4.074-4.917c0.166-0.183 0.258-0.422 0.258-0.67v-12.432c0-0.553-0.447-1-1-1h-1.666c-0.553 0-1 0.447-1 1s0.447 1 1 1h0.666v11.047l-5.325 6.302c-0.264 0.293-0.332 0.715-0.172 1.076s0.519 0.594 0.914 0.594h17.167c0.395 0 0.753-0.233 0.914-0.594 0.16-0.361 0.093-0.783-0.172-1.076zM15 9.99c1.102 0 1.995-0.893 1.995-1.995 0-1.101-0.893-1.994-1.995-1.994s-1.995 0.894-1.995 1.994c0 1.102 0.893 1.995 1.995 1.995zM21.515 7.021c1.949 0 3.529-1.573 3.529-3.513s-1.579-3.513-3.529-3.513c-1.948 0-3.529 1.573-3.529 3.513s1.581 3.513 3.529 3.513zM21.499 1.989c0.833 0 1.511 0.675 1.511 1.504s-0.677 1.504-1.511 1.504-1.511-0.675-1.511-1.504c0-0.829 0.677-1.504 1.511-1.504z"></path> </g></svg>
						<p class="query-title">Chemistry</p>
					  </div>
					  <div class="query-image">
						  <svg fill="#fff" viewBox="0 0 32 32" version="1.1" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M25.326 30.335l-5.325-6.302v-11.047h0.666c0.552 0 1-0.447 1-1s-0.448-1-1-1h-1.666c-0.552 0-1 0.447-1 1v12.432c0 0.248 0.092 0.486 0.258 0.67l4.074 4.917h-12.665l4.074-4.917c0.166-0.183 0.258-0.422 0.258-0.67v-12.432c0-0.553-0.447-1-1-1h-1.666c-0.553 0-1 0.447-1 1s0.447 1 1 1h0.666v11.047l-5.325 6.302c-0.264 0.293-0.332 0.715-0.172 1.076s0.519 0.594 0.914 0.594h17.167c0.395 0 0.753-0.233 0.914-0.594 0.16-0.361 0.093-0.783-0.172-1.076zM15 9.99c1.102 0 1.995-0.893 1.995-1.995 0-1.101-0.893-1.994-1.995-1.994s-1.995 0.894-1.995 1.994c0 1.102 0.893 1.995 1.995 1.995zM21.515 7.021c1.949 0 3.529-1.573 3.529-3.513s-1.579-3.513-3.529-3.513c-1.948 0-3.529 1.573-3.529 3.513s1.581 3.513 3.529 3.513zM21.499 1.989c0.833 0 1.511 0.675 1.511 1.504s-0.677 1.504-1.511 1.504-1.511-0.675-1.511-1.504c0-0.829 0.677-1.504 1.511-1.504z"></path> </g></svg>
						<p class="query-title">Maths</p>
					  </div>
					</div>
				`
            },
            {
                question: "How many subjects",
                response: "7 subjects"
            },
        ];

        let messageCount = 0;

        $('#send-button').on('click', sendMessage);
        $('#chat-input').on('keypress', function (e) {
            if (e.which === 13) {
                sendMessage();
            }
        });

        function showTypingLoader() {
            const loader = $('<div class="message bot typing-loader"><span></span><span></span><span></span></div>');
            $('#chat-box').append(loader);
            $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
        }

        function sendMessage() {
            const message = $('#chat-input').val().trim();
            if (!message) return;

            displayMessage(message, 'user');
            showTypingLoader();
            $('#chat-input').val('');

            messageCount++;
            setTimeout(() => {
                $('.typing-loader').remove();
                const botResponse = getBotResponse(message);
                displayMessage(botResponse, 'bot');
            }, 2000);
        }

        function getBotResponse(userMessage) {
            const match = responses.find(res => userMessage.toLowerCase().includes(res.question.toLowerCase()));
			return match ? match.response : "Thank you for your message!";
        }

        function displayMessage(text, sender) {
            const messageDiv = $('<div class="message"></div>').addClass(sender);

            if (sender === 'bot') {
                const wrapperDiv = $('<div class="bot-wrapper"></div>');
                const contentDiv = $('<div class="content"></div>').html(text);
                // Add related queries 
				const relatedQueries = $(`
					<div class="related-queries">
						<p class="queries-header">related queries:</p>
						<ul>
							<li class="related-btn"><p>How many chapters</p></li>
							<li class="related-btn"><p>How many subjects</p></li>
							<li class="related-btn"><p>Name the subjects available</p></li>
						</ul>
					</div>
				`);

				wrapperDiv.append(contentDiv, relatedQueries);
                messageDiv.append(wrapperDiv);

            } else {
                const contentDiv = $('<div class="content"></div>').text(text);
                messageDiv.append(contentDiv);
            }

            $('#chat-box').append(messageDiv);
            $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
        }
		
		$(document).on('click', '.related-btn', function () {
			const query = $(this).text();
			
			$('#chat-input').val(query);       
			sendMessage();                     
		});
		
		//Chat AI mic JS and Mic on Global search page
		const micButton = $("#mic-button").length ? $("#mic-button") : $("#mic-icon");
    const chatInput = $("#chat-input");
    const searchBox = $("#search-box");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    if (micButton.length && recognition) {
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      micButton.on("click", function () {
        recognition.start();
		micButton.addClass("recording");
  $("#recording-overlay").fadeIn();
      });

      recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;

        if (chatInput.length) {
          chatInput.val(chatInput.val() + transcript + " ").focus();
        } else if (searchBox.length) {
          searchBox.val(transcript);
          if ($.isFunction($.fn.autocomplete)) {
            searchBox.autocomplete("search");
          }
        }
		 micButton.removeClass("recording");
  $("#recording-overlay").fadeOut();
      };

      recognition.onerror = function (event) {
        console.error("Speech recognition error:", event.error);
		micButton.removeClass("recording");
  $("#recording-overlay").fadeOut();
      };
	  
	  recognition.onend = function () {
		micButton.removeClass("recording");
  $("#recording-overlay").fadeOut();
	  };
    } else if (micButton.length) {
      micButton.prop("disabled", true).attr("title", "Speech recognition not supported in this browser.");
      alert("Speech Recognition not supported. Try Chrome browser.");
    }
	
	// Marquee on Content page should run in loop
	const original = $('.marquee');
    const wrapper = $('<div class="marquee-track-wrapper"></div>');
    
    // Move the original marquee-track into a new wrapper
    original.wrap(wrapper);
    
    // Clone it and append inside wrapper
    const clone = original.clone();
    original.parent().append(clone);	
  
});

// Sample autocomplete data
  const searchSuggestions = [
    "Apple", "Amazon", "Android", "Banana", "Bitcoin", "Blueberry", "Subject", "Chrome", "Cloud", "Crypto"
  ];

  // jQuery UI Autocomplete
  $(function () {
    $("#search-box").autocomplete({
	  source: searchSuggestions,
	  open: function () {
		const ac = $(this).autocomplete("widget");
		ac.css("width", $(this).outerWidth());
	  }
	});
  });
  
//Fullpage loader js
$(window).on('load', function () {
	$('.swiper-button-next').click(function (event) {
        event.preventDefault();
		$('.full-loader').css("display","flex");
		$('.full-loader').fadeIn();  
        // Hide the full page loader after 3 seconds (simulate page load time)
	setTimeout(function () {
		$('.full-loader').fadeOut();  // Hide the full page loader
	}, 2000);  // Adjust the time here for the page load delay
    });
});

// Content inside a specific container (div loader)
$(document).ready(function() {
	$('.drop-arrow').click(function (event) {
        event.preventDefault();
		$('.content-loader').css("display","flex");
		$('.content-loader').fadeIn();  
        // Hide the full page loader after 3 seconds (simulate page load time)
		setTimeout(function () {
			$('.content-loader').fadeOut();  // Hide the content loader
			$(this).parent(".pannel-section").find('.pannel-block').fadeIn();          // Show the actual content
		}, 4000);
    });
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

