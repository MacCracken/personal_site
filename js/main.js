/* -----------------------------------------------
				Js Main - Single Page
-------------------------------------------------- */

$(document).ready(function() {
    "use strict";

    // Smooth scroll for navigation
    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top - 80
        }, 600);
    });

    // Header background on scroll
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 100) {
            $('.site-header').addClass('scrolled');
        } else {
            $('.site-header').removeClass('scrolled');
        }
    });

    // Animate skill bars when in view
    function animateSkills() {
        $('.skill-progress').each(function() {
            var progress = $(this).attr('style');
            $(this).css('width', '0%');
            $(this).animate({
                width: progress.match(/\d+/)[0] + '%'
            }, 1500);
        });
    }

    // Trigger skill animation when skills section is visible
    var skillsAnimated = false;
    $('#skills').on('appear', function() {
        if (!skillsAnimated) {
            animateSkills();
            skillsAnimated = true;
        }
    });

    // Intersection Observer for animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !skillsAnimated) {
                    if (entry.target.id === 'skills') {
                        animateSkills();
                        skillsAnimated = true;
                    }
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
});
