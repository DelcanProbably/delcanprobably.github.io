const parallaxVal = 0.2;

$.extend($.easing, {
  
  // easeOutCubic: function (x, t, b, c, d) {
  //   return c*((t=t/d-1)*t*t + 1) + b;
  // }
  easeOutExpo: function (x, t, b, c, d) {
      return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  }

});

$(window).on("load", updateBackgroundParallax);
$(window).on("scroll touchmove", () => {

    if ($(document).scrollTop() > 100) {
      $('body').addClass("scrolled");
    } else {
      $('body').removeClass("scrolled");
    };

    updateBackgroundParallax();
    updateNavbar();
    
});

// Smooth scroll anchors
$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();

  var scrollTarget = $($.attr(this, 'href')).offset().top;
  var lowestPoint = $(document).height() - $(window).height();
  if (scrollTarget > lowestPoint) {
    scrollTarget = lowestPoint;
  }

  $('html, body').animate({
      scrollTop: scrollTarget
  }, {
    duration: 500,
    easing: "easeOutExpo"
  } );

  $(".clicked").each((index, item) => {
    $(item).removeClass("clicked");
  })

  $(this).addClass("clicked");
});

// Light up navigation sections complementing scrolling

sections = ["top", "games", "audio", "design", "contact"];
sectionScrollPoints = [];

lastHovered = "";

$(document).ready( () => {
  for (var i = 0; i < sections.length; i++) {
    el =  $("#" + sections[i]);
    if (el.length) {
      sectionScrollPoints[i] = $("#" + sections[i]).first().offset().top;
    } else {
      sectionScrollPoints[i] = -1;
    }
  }
  
  $('#hovergallery').each( (index, element) => {
    var gallery = $(element);
    var childs = gallery.children('p');
    console.log(childs);
    childs.each( (index, element) => {
      $(element).mouseenter( () => {

        if ($(element).attr('id') === undefined) return;
        var imgPath = "url(../img/" +  $(element).attr('id') + ".jpg)";
        
        gallery.css('background-image', imgPath);

        $(element).addClass('lastHovered');
        if (lastHovered.length > 0) lastHovered.removeClass('lastHovered');
        lastHovered = $(element);

      });
    })
  });

  // dynamically generate email address at runtime to avoid those bastard scrapers
  var mail = $('a.email');
  var href = mail.attr('href').replace('.', '@gmail.com');
  var cont = mail.text().replace(' at ', '@');
  mail.attr('href', href);
  mail.text(cont);
  console.log("replaced href with " + href);

});



// This might be a bit inefficient but it seems to work ok enough
function updateNavbar () {
  for (var i = 0; i < sections.length; i++) {
    if (sectionScrollPoints[i] < 0) continue;

    var scroll = $(document).scrollTop() + 400;
    
    // If we're past this section and either at the bottom of the list or not yet into the next section
    if (scroll >= sectionScrollPoints[i] && (sectionScrollPoints.length <= i+1 || scroll < sectionScrollPoints[i+1])) {
      $('a[href="#' + sections[i] + '"]').addClass('inNavZone');
    } else {
      $('a[href="#' + sections[i] + '"]').removeClass('inNavZone');
    }
  }
}


function updateBackgroundParallax() {
  // var i = 0;
  $(".panel").each( (index, item) => {
    var screenOffset = ($(item).offset().top - $(document).scrollTop());
    if (Math.abs(screenOffset) > $(window).height() * 1.5) {
      return;
    }
    
    $(item).css("background-position", "center calc(50%  + " + screenOffset * parallaxVal + "px)");
    // console.log("index " + index + " pos " + screenOffset);
    // i++;
  });
  // console.log("changed  " + i + " items");
    
}