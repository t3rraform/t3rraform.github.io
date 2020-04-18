/*
	Alpha by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

    var $window = $(window),
        $body = $('body'),
        $header = $('#header'),
        $banner = $('#banner');

    // Breakpoints.
    breakpoints({
        wide: ('1281px', '1680px'),
        normal: ('981px', '1280px'),
        narrow: ('737px', '980px'),
        narrower: ('737px', '840px'),
        mobile: ('481px', '736px'),
        mobilep: (null, '480px')
    });

    // Play initial animations on page load.
    $window.on('load', function () {
        window.setTimeout(function () {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Dropdowns.
    $('#nav > ul').dropotron({
        alignment: 'right'
    });

    // NavPanel.

    // Button.
    $(
        '<div id="navButton">' +
        '<a href="#navPanel" class="toggle"></a>' +
        '</div>'
    )
        .appendTo($body);

    // Panel.
    $(
        '<div id="navPanel">' +
        '<nav>' +
        $('#nav').navList() +
        '</nav>' +
        '</div>'
    )
        .appendTo($body)
        .panel({
            delay: 500,
            hideOnClick: true,
            hideOnSwipe: true,
            resetScroll: true,
            resetForms: true,
            side: 'left',
            target: $body,
            visibleClass: 'navPanel-visible'
        });

    // Header.
    if (!browser.mobile
        && $header.hasClass('alt')
        && $banner.length > 0) {

        $window.on('load', function () {

            $banner.scrollex({
                bottom: $header.outerHeight(),
                terminate: function () {
                    $header.removeClass('alt');
                },
                enter: function () {
                    $header.addClass('alt reveal');
                },
                leave: function () {
                    $header.removeClass('alt');
                }
            });

        });

    }

    //Scrolly
    $('.scrolly').scrolly();

    // Poptrox.
    let galleries = [];
    $("#projects > .row").children().each(function () {
        galleries.push($("#" + this.id));
    });

    $(galleries).each(function () {
        $(this).poptrox({
            baseZIndex: 20000,
            caption: function ($a) {
                let caption = $a.find("p");
                if (caption.length > 0) return caption;
                return "<p></p>";
            },
            fadeSpeed: 300,
            onPopupClose: function () {
                $body.removeClass('modal-active');
            },
            onPopupOpen: function () {
                $body.addClass('modal-active');
            },
            overlayOpacity: 0,
            popupCloserText: '',
            popupHeight: 150,
            popupLoaderText: '',
            popupSpeed: 50,
            popupWidth: 150,
            // selector: '.box special > .image featured > a',
            usePopupCaption: true,
            usePopupCloser: true,
            usePopupDefaultStyling: false,
            usePopupForceClose: true,
            usePopupLoader: true,
            usePopupNav: true,
            windowMargin: 50
        });
    });

    $("#show-more").on("click", function () {
        console.log("click")
        $("#projects > .row:gt(1)").slideToggle("slow");
        $(this).text() === "Show more" ? $(this).text("Show less") : $(this).text("Show more");
    });


    $(document).ready(function () {
        $('#contact-form').on('submit', function (e) {
            e.preventDefault();
            $.ajax({
                url: $(this).attr('action') || window.location.pathname,
                type: "POST",
                data: $(this).serialize(),
                success: function (data) {
                    if (data.status === "success") {
                        alert("Message successfully sent.");
                        $('#contact-form').each(function () {
                            this.reset();
                        });
                    } else {
                        alert("Some error occurred, please send a message by mail.");
                    }
                },
                error: function (jXHR, textStatus, errorThrown) {
                    alert("Some error occurred, please send a message by mail.");
                }
            });
        });
    });

    let userAgent = navigator.userAgent;
    if (userAgent.match(/(iPad|iPhone|iPod)/i) || userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1 || userAgent.indexOf("Edge") > -1){
        $("#view-projects-container").css("display", "none");
        $("#view-projects-container-alt").css("display", "block");
    }

})(jQuery);