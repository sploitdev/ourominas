(function($){
    "use strict"; // Start of use strict
    
    
    /* ---------------------------------------------
     Scripts initialization
     --------------------------------------------- */
    
    jQuery(window).load(function(){
        
        // Page loader
        jQuery(".page-loader b").delay(0).fadeOut();
        jQuery(".page-loader").delay(200).fadeOut("slow");
    
        init_scroll_navigate();
        
        jQuery(window).trigger("scroll");
        jQuery(window).trigger("resize");
        
    });
    
    jQuery(document).ready(function(){
        
        jQuery(window).trigger("resize");
            
        init_nbc_menu();
        init_classic_menu();
        init_lightbox();
        init_parallax();
        init_shortcodes();
        init_tooltips();
        init_counters();
        init_team();
        initPageSliders();
        initWorkFilter();
        init_services();
        init_google_map();
        
    });
    
    jQuery(window).resize(function(){
        
        init_hipster_screen();
        init_nbc_menu_resize();
        init_classic_menu_resize();
        js_height_init();
        service_height_init();
        
    });
    
    
    /* --------------------------------------------
     Platform detect
     --------------------------------------------- */
    var mobileTest;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        mobileTest = true;
        jQuery("html").addClass("mobile");
    }
    else {
        mobileTest = false;
        jQuery("html").addClass("no-mobile");
    }
    
    var mozillaTest;
    if (/mozilla/.test(navigator.userAgent)) {
        mozillaTest = true;
    }
    else {
        mozillaTest = false;
    }
    var safariTest;
    if (/safari/.test(navigator.userAgent)) {
        safariTest = true;
    }
    else {
        safariTest = false;
    }
    
    // Detect touch devices    
    if (!("ontouchstart" in document.documentElement)) {
        document.documentElement.className += " no-touch";
    }
    
    
    /* ---------------------------------------------
     Sections helpers
     --------------------------------------------- */
    
    // Sections backgrounds
    var bturl = jQuery('.bturl').val();
    var pageSection = jQuery(".home-section, .page-section, .small-section, .split-section");
    pageSection.each(function(indx){
        if (jQuery(this).attr("data-background")){
            var bg_url = bturl+jQuery(this).data("background");
            jQuery(this).css("background-image", "url('"+ bg_url.toString() +"')");
        }
    });
    
    // Function for block height 100%
    function height_line(height_object, height_donor){
        height_object.height(height_donor.height());
        height_object.css({
            "line-height": height_donor.height() + "px"
        });
    }
    
    // Function equal height
    !function(a){
        a.fn.equalHeights = function(){
            var b = 0, c = a(this);
            return c.each(function(){
                var c = a(this).innerHeight();
                c > b && (b = c)
            }), c.css("height", b)
        }, a("[data-equal]").each(function(){
            var b = a(this), c = b.data("equal");
            b.find(c).equalHeights()
        })
    }(jQuery);
    
    
    // Progress bars
    var progressBar = jQuery(".progress-bar");
    progressBar.each(function(indx){
        jQuery(this).css("width", jQuery(this).attr("aria-valuenow") + "%");
    });
    
    var pageSection = jQuery(".home-section, .page-section, .small-section, .split-section");
    pageSection.each(function(indx){
        
        if (jQuery(this).attr("data-background")){
            var bg_url = bturl+jQuery(this).data("background");
            jQuery(this).css("background-image", "url(" + bg_url + ")");
        }
    });
    
    
    /* --------------------------------------------
     Header "Hipster Style"
     --------------------------------------------- */
    var hsCont = jQuery(".hs-cont");
    var hsWrap = jQuery(".hs-wrap");
    var hsLine2 = jQuery(".js-hs-line-2");
    var hsLine2Mar;
    
     function init_hipster_screen(){
        hsLine2Mar = (hsCont.width() - hsWrap.width()) / 2;
        
        hsLine2.css({
            marginLeft: -hsLine2Mar,
            marginRight: -hsLine2Mar
        });
        
    }
    
    
    
    /* ---------------------------------------------
     Nav panel compact
     --------------------------------------------- */
    
    function init_nbc_menu_resize(){
       jQuery(".nbc-menu-wrap").css("max-height", jQuery(window).height() - jQuery(".nav-bar-compact").height() - 20 + "px"); 
    }

    var nbc_menu_button = jQuery(".nbc-menu-button");
    var nbc_menu_wrap = jQuery(".nbc-menu-wrap");
    
    function init_nbc_menu(){
    
        nbc_menu_button.click(function(){
        
            if (jQuery(this).hasClass("js-active")) {
            
                jQuery(this).removeClass("js-active");
                jQuery(".nav-bar-compact").removeClass("js-opened");
                
                setTimeout(function(){
                    nbc_menu_wrap.hide();
                }, 200);
                
                
            }
            else {
            
                jQuery(this).addClass("js-active");
                nbc_menu_wrap.show();
                
                setTimeout(function(){
                    jQuery(".nav-bar-compact").addClass("js-opened");
                }, 50);
                
            }
            
        });
        
        nbc_menu_wrap.find("a:not(.nbc-has-sub)").click(function(){
            
            if (nbc_menu_button.hasClass("js-active")) {
            
                nbc_menu_button.removeClass("js-active");
                jQuery(".nav-bar-compact").removeClass("js-opened");
                
            }
        });
        
        // Sub menu
        
        var nbcHasSub = jQuery(".nbc-has-sub");
        var nbcThisLi;
        
        nbcHasSub.click(function(){
        
            nbcThisLi = jQuery(this).parent("li:first");
            if (nbcThisLi.hasClass("js-opened")) {
                nbcThisLi.find(".nbc-sub:first").slideUp(function(){
                    nbcThisLi.removeClass("js-opened");
                    nbcThisLi.find(".nbc-has-sub").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down");
                });
            }
            else {
                jQuery(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
                nbcThisLi.addClass("js-opened");
                nbcThisLi.find(".nbc-sub:first").slideDown();
            }
            
            return false;
            
        });
        
        // BG after scroll
        
        jQuery(window).scroll(function(){
        
            if (jQuery(window).scrollTop() >= 100) {
                jQuery(".nav-bar-compact").addClass("js-nbc-bg");
            }
            else {
                jQuery(".nav-bar-compact").removeClass("js-nbc-bg");
            }
            
        }); 
        
    }
    
    
    /* ---------------------------------------------
     Nav panel classic
     --------------------------------------------- */
    
    var mobile_nav = jQuery(".mobile-nav");
    var desktop_nav = jQuery(".desktop-nav");
    
    function init_classic_menu_resize(){
        
        // Mobile menu max height
        jQuery(".mobile-on .desktop-nav > ul").css("max-height", jQuery(window).height() - jQuery(".main-nav").height() - 20 + "px");
        
        // Mobile menu style toggle
        if (jQuery(window).width() < 1024) {
            jQuery(".main-nav").addClass("mobile-on");
        }
        else 
            if (jQuery(window).width() >= 1024) {
                jQuery(".main-nav").removeClass("mobile-on");
                desktop_nav.show();
            }
    }
    
    function init_classic_menu(){
    
        height_line(jQuery(".nav-logo-wrap .logo"), jQuery(".main-nav"));
        
        // Navbar sticky
        
        jQuery(".js-stick").sticky({
            topSpacing: 0
        });
        
        
        height_line(jQuery(".inner-nav ul > li > a"), jQuery(".main-nav"));
        height_line(mobile_nav, jQuery(".main-nav"));
        
        mobile_nav.css({
            "width": jQuery(".main-nav").height() + "px"
        });
        
        
        // Mobile menu toggle
        
        mobile_nav.click(function(){
        
            if (desktop_nav.hasClass("js-opened")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                jQuery(this).removeClass("active");
            }
            else {
                desktop_nav.slideDown("slow", "easeOutQuart").addClass("js-opened");
                jQuery(this).addClass("active");
            }
            
        });
        
        desktop_nav.find("a:not(.mn-has-sub)").click(function(){
            if (mobile_nav.hasClass("active")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                mobile_nav.removeClass("active");
            }
        });
        
        
        // Sub menu
        
        
        var mnHasSub = jQuery(".mn-has-sub");
        var mnThisLi;
        
        jQuery(".mobile-on .mn-has-sub").find(".fa:first").removeClass("fa-angle-right").addClass("fa-angle-down");
        
        mnHasSub.click(function(){
        
            if (jQuery(".main-nav").hasClass("mobile-on")) {
                mnThisLi = jQuery(this).parent("li:first");
                if (mnThisLi.hasClass("js-opened")) {
                    mnThisLi.find(".mn-sub:first").slideUp(function(){
                        mnThisLi.removeClass("js-opened");
                        mnThisLi.find(".mn-has-sub").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down");
                    });
                }
                else {
                    jQuery(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
                    mnThisLi.addClass("js-opened");
                    mnThisLi.find(".mn-sub:first").slideDown();
                }
                
                return false;
            }
            else {
                return false;
            }
            
        });
        
        mnThisLi = mnHasSub.parent("li");
        mnThisLi.hover(function(){
        
            if (!(jQuery(".main-nav").hasClass("mobile-on"))) {
            
                jQuery(this).find(".mn-sub:first").stop(true, true).fadeIn("fast");
            }
            
        }, function(){
        
            if (!(jQuery(".main-nav").hasClass("mobile-on"))) {
            
                jQuery(this).find(".mn-sub:first").stop(true, true).delay(100).fadeOut("fast");
            }
            
        });
        
    }
    
    
    
    /* ---------------------------------------------
     Scroll navigation
     --------------------------------------------- */
    
    function init_scroll_navigate(){
        
        jQuery(".local-scroll").localScroll({
            target: "body",
            duration: 1500,
            easing: "easeInOutExpo"
        });
        
        var sections = jQuery(".home-section, .split-section, .page-section");
        var menu_links = jQuery(".scroll-nav li a, .nbc-menu-links a");
        
        jQuery(window).scroll(function(){
        
            sections.filter(":in-viewport:first").each(function(){
                var active_section = jQuery(this);
                var active_link = jQuery('.scroll-nav li a[href="#' + active_section.attr("id") + '"]');
                menu_links.removeClass("active");
                active_link.addClass("active");
                jQuery('.nbc-menu-links a[href="#' + active_section.attr("id") + '"]').addClass("active");
            });
            
        });
        
    }
    
    
    
    /* ---------------------------------------------
     Lightboxes
     --------------------------------------------- */
    
    function init_lightbox(){
    
        // Works Item Lightbox				
        jQuery(".work-lightbox-link").magnificPopup({
            gallery: {
                enabled: true
            }
        });
        
        // Works Item Lightbox	
        jQuery(".lightbox-gallery-1").magnificPopup({
            gallery: {
                enabled: true
            }
        });
        
        // Other Custom Lightbox
        jQuery(".lightbox-gallery-2").magnificPopup({
            gallery: {
                enabled: true
            }
        });
        jQuery(".lightbox-gallery-3").magnificPopup({
            gallery: {
                enabled: true
            }
        });
        jQuery(".lightbox").magnificPopup();
        
    }
    
    
    
    /* -------------------------------------------
     Parallax
     --------------------------------------------- */
    
    function init_parallax(){
    
        // Parallax        
        if ((jQuery(window).width() >= 1024) && (mobileTest == false)) {
            jQuery(".parallax-1").parallax("50%", 0.1);
            jQuery(".parallax-2").parallax("50%", 0.2);
            jQuery(".parallax-3").parallax("50%", 0.3);
            jQuery(".parallax-4").parallax("50%", 0.4);
            jQuery(".parallax-5").parallax("50%", 0.5);
            jQuery(".parallax-6").parallax("50%", 0.6);
            jQuery(".parallax-7").parallax("50%", 0.7);
            jQuery(".parallax-8").parallax("50%", 0.5);
            jQuery(".parallax-9").parallax("50%", 0.5);
            jQuery(".parallax-10").parallax("50%", 0.5);
            jQuery(".parallax-11").parallax("50%", 0.05);
        }
        
    }
    
    
    
    /* ---------------------------------------------
     Shortcodes
     --------------------------------------------- */
    // Tabs minimal	
    function init_shortcodes(){
    
        var tpl_tab_height;
        jQuery(".tpl-minimal-tabs > li > a").click(function(){
        
            if (!(jQuery(this).parent("li").hasClass("active"))) {
                tpl_tab_height = jQuery(".tpl-minimal-tabs-cont > .tab-pane").filter(jQuery(this).attr("href")).height();
                jQuery(".tpl-minimal-tabs-cont").animate({
                    height: tpl_tab_height
                }, function(){
                    jQuery(".tpl-minimal-tabs-cont").css("height", "auto");
                });
                
            }
            
        });
        
        // Accordion
        var allPanels = jQuery(".accordion > dd").hide();
        allPanels.first().slideDown("easeOutExpo");
        jQuery(".accordion > dt > a").first().addClass("active");
        
        jQuery(".accordion > dt > a").click(function(){
        
            var current = jQuery(this).parent().next("dd");
            jQuery(".accordion > dt > a").removeClass("active");
            jQuery(this).addClass("active");
            allPanels.not(current).slideUp("easeInExpo");
            jQuery(this).parent().next().slideDown("easeOutExpo");
            
            return false;
            
        });
        
        // Toggle
        var allToggles = jQuery(".toggle > dd").hide();
        
        jQuery(".toggle > dt > a").click(function(){
        
            if (jQuery(this).hasClass("active")) {
            
                jQuery(this).parent().next().slideUp("easeOutExpo");
                jQuery(this).removeClass("active");
                
            }
            else {
                var current = jQuery(this).parent().next("dd");
                jQuery(this).addClass("active");
                jQuery(this).parent().next().slideDown("easeOutExpo");
            }
            
            return false;
        });
        
        // Responsive video
        jQuery(".video, .resp-media, .blog-media").fitVids();
               
    }
    
    
    
    /* ---------------------------------------------
     Tooltips (bootstrap plugin activated)
     --------------------------------------------- */
    
    function init_tooltips(){
    
        jQuery(".tooltip-bot, .tooltip-bot a, .nav-social-links a").tooltip({
            placement: "bottom"
        });
        
        jQuery(".tooltip-top, .tooltip-top a").tooltip({
            placement: "top"
        });
        
    }
    
    
    
    /* ---------------------------------------------
     Some facts section
     --------------------------------------------- */
    
     function init_counters(){
        jQuery(".count-number").appear(function(){
            var count = jQuery(this);
            count.countTo({
                from: 0,
                to: count.html(),
                speed: 1300,
                refreshInterval: 60,
            });
            
        });
    }
    
    
    
    
    /* ---------------------------------------------
     Team
     --------------------------------------------- */   
     
    function init_team(){
    
        // Hover        
        jQuery(".team-item").click(function(){
            if (jQuery("html").hasClass("mobile")) {
                jQuery(this).toggleClass("js-active");
            }
        });
        
    }
    
    
})(jQuery); // End of use strict


/* ---------------------------------------------
     Sliders
   --------------------------------------------- */
function initPageSliders(){
    (function($){
        "use strict";
        
        // Fullwidth slider
        jQuery(".fullwidth-slider").owlCarousel({
            //transitionStyle: "backSlide",
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
        
        // Fullwidth gallery
        jQuery(".fullwidth-gallery").owlCarousel({
            transitionStyle: "fade",
            autoPlay: 5000,
            slideSpeed: 700,
            singleItem: true,
            autoHeight: true,
            navigation: false,
            pagination: false
        });
        
        // Item carousel
        jQuery(".item-carousel").owlCarousel({
            autoPlay: 5000,
            //stopOnHover: true,
            items: 3,
            itemsDesktop: [1199, 3],
            itemsTabletSmall: [768, 3],
            itemsMobile: [480, 1],
            navigation: false,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
        
        // Item carousel
        jQuery(".small-item-carousel").owlCarousel({
            autoPlay: 2500,
            stopOnHover: true,
            items: 4,
            itemsDesktop: [1199, 4],
            itemsTabletSmall: [768, 3],
            itemsMobile: [480, 2],
            pagination: false,
            navigation: false,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
        
        // Single carousel
        jQuery(".single-carousel").owlCarousel({
            //transitionStyle: "backSlide",
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
        
        // Content Slider
        jQuery(".content-slider").owlCarousel({
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
        
        
        if (jQuery(".owl-carousel").lenth) {
            var owl = jQuery(".owl-carousel").data('owlCarousel');
            owl.reinit();
        }

    })(jQuery);
};

    
    


/* ---------------------------------------------
 Portfolio section
 --------------------------------------------- */

// Projects filtering
var fselector = 0;
var work_grid = jQuery("#work-grid");

function initWorkFilter(){
    (function($){
     "use strict";
     
     work_grid.imagesLoaded(function(){
            work_grid.isotope({
                itemSelector: '.mix',
                layoutMode: 'fitRows',
                filter: fselector
            });
        });
        
        jQuery(".filter").click(function(){
            jQuery(".filter").removeClass("active");
            jQuery(this).addClass("active");
            fselector = jQuery(this).attr('data-filter');
            
            work_grid.isotope({
                itemSelector: '.mix',
                layoutMode: 'fitRows',
                filter: fselector
            });
            return false;
        });
        
    })(jQuery);
}

     
// Project slider
function initWorkSlider(){
    (function($){
        "use strict";
        
        jQuery(".work-full-slider").owlCarousel({
            slideSpeed : 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
        
        
        if (jQuery(".owl-carousel").lenth) {
            var owl = jQuery(".owl-carousel").data('owlCarousel');
            owl.reinit();
        }
        
        jQuery(".work-full-media").fitVids();
        
    })(jQuery);
}

// Project Ajax Expander
jQuery(window).load(function(){

    (function($){
        "use strict";
        
        // Works slider
        initWorkSlider();
        
        // Init ajax links classes
        jQuery(".work-ajax-link").parent().addClass("work-item-ajax");
        
    })(jQuery);
    
    // Works item end
    function works_end(){
        (function($){
            "use strict";
            if (!(jQuery(".work-opened").parent().prevAll(".work-item-ajax").length)) {
                jQuery(".work-prev").css("visibility", "hidden");
            }
            else {
                jQuery(".work-prev").css("visibility", "visible");
            }
            if (!(jQuery(".work-opened").parent().nextAll(".work-item-ajax").length)) {
                jQuery(".work-next").css("visibility", "hidden");
            }
            else {
                jQuery(".work-next").css("visibility", "visible");
            }
        })(jQuery);
    }
    
    // Hash change function
    function hash_change(url){
        (function($){
            "use strict";
            var hash_url = "#/" + url.replace(" .work-wrapper", "");
            window.location.hash = hash_url;
            
        })(jQuery);
    }
    
    
    // Open work
    (function($){
        "use strict";
        window.work_before_scroll = 0;
        jQuery(".work-ajax-link").click(function(){
            work_before_scroll = jQuery(window).scrollTop();
            jQuery(this).addClass("work-opened");
            
            
            jQuery(".body-masked").show().addClass("mask-speed").delay(10).addClass("animated fadeIn");
            
            setTimeout(function(){
                jQuery(".body-masked").removeClass("animated fadeIn").addClass("animated fadeOut");
            }, 1000);
            
            setTimeout(function(){
                jQuery(".body-masked").hide().removeClass("mask-speed animated fadeOut");
            }, 1300);
            
            setTimeout(function(){
                jQuery(".page").hide();
                jQuery(".work-full").show();
            }, 300);
            
            setTimeout(function(){
                if (work_before_scroll != 0) {
                    jQuery("html, body").animate({
                        scrollTop: 0
                    }, "fast", "easeOutExpo");
                }
            }, 550);
            
            var work_url = jQuery(this).attr("href") + ' ' + '.work-wrapper';
            
            jQuery(".work-full-load").load(work_url, function(){
                initWorkSlider();
                jQuery(".work-loader").delay(200).fadeOut(500);
            });
            works_end();
            hash_change(work_url);
            
            return false;
        });
        
    })(jQuery);
    
    // All works (close work)
    
    function close_work(){
    
        jQuery(".body-masked").show().addClass("mask-speed").delay(10).addClass("animated fadeIn");
        
        setTimeout(function(){
            jQuery(".body-masked").removeClass("animated fadeIn").addClass("animated fadeOut");
        }, 1050);
        
        setTimeout(function(){
            jQuery(".body-masked").hide().removeClass("mask-speed animated fadeOut");
        }, 1300);
        
        setTimeout(function(){
            jQuery(".work-full").hide();
            jQuery(".page").show();
            initPageSliders();            
        }, 300);
        
        
        
        setTimeout(function(){
            jQuery(".work-full-load").empty();
            jQuery("html, body").animate({
                scrollTop: work_before_scroll + "px"
            }, "slow", "easeOutExpo");
        }, 350);
        
        work_opened = jQuery(".work-opened");
        work_opened.removeClass("work-opened");
        
        setTimeout(function(){
            service_height_init();
            js_height_init();
        }, 350);
    }
    
    (function($){
        "use strict";
        jQuery(".work-all").click(function(){
            close_work();
            //Hash change
            window.location.hash = "";
            return false;
        });
    })(jQuery);
    
    
    
    // Prev work
    function prev_work(){
    
        jQuery(".work-loader").fadeIn("fast");
        
        var work_prev_url = jQuery(".work-opened").parent().prevAll(".work-item-ajax:first").find(".work-ajax-link").attr("href") +
        ' ' +
        '.work-wrapper';
        setTimeout(function(){
            jQuery(".work-full-load").empty().load(work_prev_url, function(){
                initWorkSlider();
                jQuery(".work-loader").delay(200).fadeOut("fast");
            });
        }, 500);
        var work_opened = jQuery(".work-opened").parent().prevAll(".work-item-ajax:first").find(".work-ajax-link");
        jQuery(".work-ajax-link").removeClass("work-opened");
        work_opened.addClass("work-opened");
        
        // If left end of the links   
        works_end();
        
        // Hash cahnge
        hash_change(work_prev_url);
        
    }
    
    (function($){
        "use strict";
        jQuery(".work-prev").click(function(){
            prev_work();
        });
    })(jQuery);
    
    // Next work
    function next_work(){
    
        jQuery(".work-loader").fadeIn("fast");
        
        var work_next_url = jQuery(".work-opened").parent().nextAll(".work-item-ajax:first").find(".work-ajax-link").attr("href") +
        ' ' +
        '.work-wrapper';
        setTimeout(function(){
            jQuery(".work-full-load").empty().load(work_next_url, function(){
                initWorkSlider();
                jQuery(".work-loader").delay(200).fadeOut("fast");
            });
        }, 500);
        var work_opened = jQuery(".work-opened").parent().nextAll(".work-item-ajax:first").find(".work-ajax-link");
        jQuery(".work-ajax-link").removeClass("work-opened");
        work_opened.addClass("work-opened");
        
        // If right end of the links
        works_end();
        
        // Hash cahnge
        hash_change(work_next_url);
        
    }
    
    (function($){
        "use strict";
        jQuery(".work-next").click(function(){
            next_work();
        });
    })(jQuery);
    
    // Hash change event
    
    (function($){
        "use strict";
        jQuery(window).hashchange(function(){
            if ((location.hash.search("/works") == -1) && (jQuery(".work-full").is(":visible"))) {
                close_work();
                //Hash change
                window.location.hash = "";
            }
            else {
                var hash_new = location.hash;
                var work_url = hash_new.replace("#/", "") + ' ' + '.work-wrapper';
                
                
                if ((hash_new.replace("#/", "") != jQuery(".work-opened").attr("href")) && (jQuery(".work-full").is(":visible"))) {
                
                    jQuery(".work-loader").fadeIn("fast");
                    
                    setTimeout(function(){
                        jQuery(".work-full-load").empty().load(work_url, function(){
                            initWorkSlider();
                            jQuery(".work-loader").delay(200).fadeOut(500);
                        });
                    }, 200);
                    
                    
                    if (work_before_scroll != 0) {
                        jQuery("html, body").animate({
                            scrollTop: 0
                        }, "slow", "easeOutExpo");
                    }
                    
                    var work_opened = jQuery(".work-ajax-link[href = '" + work_url.replace(" .work-wrapper", "") + "']");
                    jQuery(".work-ajax-link").removeClass("work-opened");
                    work_opened.addClass("work-opened");
                    works_end();
                }
                
                if ((hash_new.replace("#/", "") != jQuery(".work-opened").attr("href")) && (jQuery(".work-full").is(":hidden")) && (location.hash.search("/works") != -1)) {
                
                    jQuery(".page").hide();
                    setTimeout(function(){
                        jQuery(".work-full").fadeIn(500);
                    }, 50);
                    
                    setTimeout(function(){
                        jQuery(".work-full-load").empty().load(work_url, function(){
                            initWorkSlider();
                            jQuery(".work-loader").delay(200).fadeOut(500);
                            
                            if (work_before_scroll != 0) {
                                jQuery("html, body").animate({
                                    scrollTop: 0
                                }, "fast", "easeOutExpo");
                            }
                        });
                    }, 650);
                    
                    var work_opened = jQuery(".work-ajax-link[href = '" + work_url.replace(" .work-wrapper", "") + "']");
                    jQuery(".work-ajax-link").removeClass("work-opened");
                    work_opened.addClass("work-opened");
                    works_end();
                }
                
            }
        });
        jQuery(window).trigger('hashchange');
    })(jQuery);
});


/* ---------------------------------------------
 Height 100%
 --------------------------------------------- */
function js_height_init(){
    (function($){
        jQuery(".js-height-full").height(jQuery(window).height());
        jQuery(".js-height-parent").each(function(){
            jQuery(this).height(jQuery(this).parent().first().height());
        });
    })(jQuery);
}



/* ---------------------------------------------
 Services section
 --------------------------------------------- */
    
var service_item = jQuery(".service-item");
var service_descr = service_item.find(".service-descr");
var service_descr_top;

function init_services(){
    (function($){
    
        jQuery(".service-item").each(function(){
            jQuery(this).find(".service-descr").prepend(jQuery(this).find(".service-intro").html());
        });
        
        // Hover        
        service_item.click(function(){
            if (jQuery("html").hasClass("mobile")) {
                if (jQuery(this).hasClass("js-active")) {
                    jQuery(this).removeClass("js-active");
                }
                else {
                    jQuery(this).addClass("js-active");
                }
            }
        });
        
    })(jQuery);
}

function service_height_init(){
    (function($){
    
        var service_max_height = 0;
        if (jQuery(window).width() >= 767) {
            service_item.each(function(index){
                jQuery(this).css("height", "auto");
                if (jQuery(this).height() > service_max_height) {
                    service_max_height = jQuery(this).height();
                }
            });
            
            if (service_max_height > service_item.width() * 0.9) {
                service_item.height(service_max_height);
            }
            else {
                service_item.height(service_item.width() * 0.9);
            }
        }
        
        var service_descr_offset;
        var service_intro_offset;
        service_descr.each(function(){
            service_descr_offset = jQuery(this).height() / 2;
            service_intro_offset = jQuery(this).parent(".si-inner").find(".service-intro").height() / 2;
            jQuery(this).parent(".si-inner").find(".service-intro").css("top", service_descr_offset + "px");
            jQuery(this).parent(".si-inner").find(".service-descr").css("top", -service_intro_offset + "px");
            
        });
        
        // Split sections	
        jQuery(".ssh-table, .split-section-content").css("height", "auto");
        if (jQuery(window).width() > 992) {
            jQuery(".ssh-table, .split-section-content").equalHeights();
        }
        
    })(jQuery);
}
   
    
    
/* ---------------------------------------------
 Google map
 --------------------------------------------- */

var gmMapDiv = jQuery("#map-canvas");

function init_google_map(){
    (function($){
    
        // Open/Close map        
        jQuery("#see-map").click(function(){
            jQuery(this).toggleClass("js-active");
            
            if (jQuery("html").hasClass("mobile")) {
                gmMapDiv.hide();
                gmMapDiv.gmap3({
                    action: "destroy"
                }).empty().remove();
            }
            else {
                gmMapDiv.slideUp(function(){
                    gmMapDiv.gmap3({
                        action: "destroy"
                    }).empty().remove();
                })
            }
            
            gmMapDiv.slideToggle(400, function(){
            
                if (jQuery("#see-map").hasClass("js-active")) {
                    jQuery(".google-map").append(gmMapDiv);
                    init_map();
                }
                
            });
            
            setTimeout(function(){
                jQuery("html, body").animate({
                    scrollTop: jQuery("#see-map").offset().top
                }, "slow", "easeInBack");
            }, 100);
            
            
            return false;
        });
    })(jQuery);
}


function init_map(){
    (function($){
        if (gmMapDiv.length) {
        
            var gmCenterAddress = gmMapDiv.attr("data-address");
            var gmMarkerAddress = gmMapDiv.attr("data-address");
            var gmColor = gmMapDiv.attr("data-color");
            var gmZoom = gmMapDiv.attr("data-Zoom");
            var gmzoomControl = gmMapDiv.attr("data-zoomControl");
            var gmpanControl = gmMapDiv.attr("data-panControl");
            var gmmapTypeControl = gmMapDiv.attr("data-mapTypeControl");
            var gmstreetViewControl = gmMapDiv.attr("data-streetViewControl");
            var gmscrollwheel = gmMapDiv.attr("data-scrollwheel");
            var gmmapTypeId = gmMapDiv.attr("data-mapTypeId");            
            var gmapUrl = jQuery('.bturl').val();
            gmMapDiv.gmap3({
                action: "init",
                marker: {
                    address: gmMarkerAddress,
                    options: {
                        icon: gmapUrl+"/templates/bigstream/images/map-marker.png"
                    }
                },
                map: {
                    options: {
                        styles: [{
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": gmColor
                            }, {
                                "lightness": 17
                            }]
                        }, {
                            "featureType": "landscape",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": gmColor
                            }, {
                                "lightness": 20
                            }]
                        }, {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": gmColor
                            }, {
                                "lightness": 17
                            }]
                        }, {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                "color": gmColor
                            }, {
                                "lightness": 29
                            }, {
                                "weight": 0.2
                            }]
                        }, {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": gmColor
                            }, {
                                "lightness": 18
                            }]
                        }, {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": gmColor
                            }, {
                                "lightness": 16
                            }]
                        }, {
                            "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": gmColor
                            }, {
                                "lightness": 21
                            }]
                        }, {
                            "elementType": "labels.text.stroke",
                            "stylers": [{
                                "visibility": "on"
                            }, {
                                "color": gmColor
                            }, {
                                "lightness": 16
                            }]
                        }, {
                            "elementType": "labels.text.fill",
                            "stylers": [{
                                "saturation": 36
                            }, {
                                "color": gmColor
                            }, {
                                "lightness": 40
                            }]
                        }, {
                            "elementType": "labels.icon",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        }, {
                            "featureType": "transit",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": gmColor
                            }, {
                                "lightness": 19
                            }]
                        }, {
                            "featureType": "administrative",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": gmColor
                            }, {
                                "lightness": 20
                            }]
                        }, {
                            "featureType": "administrative",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                "color": gmColor
                            }, {
                                "lightness": 17
                            }, {
                                "weight": 1.2
                            }]
                        }, ],       
            
                        zoom: parseInt(gmZoom),
                        zoomControl: parseInt(gmzoomControl),
                        zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.SMALL
                        },
                        mapTypeControl: gmmapTypeControl,
                        scaleControl: false,
                        scrollwheel: gmscrollwheel,
                        streetViewControl: gmstreetViewControl,
                        panControl : gmpanControl,
                        draggable: true
                    }
                }
            });
        }
    })(jQuery);
}
