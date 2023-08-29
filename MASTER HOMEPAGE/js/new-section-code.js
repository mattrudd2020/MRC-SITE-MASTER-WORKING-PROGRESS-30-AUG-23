gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/// SCROLLSMOOTHER SECTION
const scroller = document.querySelector("#smooth-content");

const smoother = ScrollSmoother.create({
  el: scroller,
  smooth: 2,
  // normalizeScroll: true,
  ignoreMobileResize: true,
  effects: true,
  smoothTouch: 0.1
});

console.log("ScrollSmoother runs")

/// END SCROLLSMOOTHER SECTION

// gsap.registerPlugin(ScrollTrigger);


$("[tr-scroll-toggle='component']").each(function () {
  var component = $(this);
  var lists = component.find("[tr-scroll-toggle='list']");
  var itemTotal = lists.first().children().length;

  component.find("[tr-scroll-toggle='number-total']").text(itemTotal);

  var firstTrigger = component.find("[tr-scroll-toggle='trigger']").first();
  for (var i = 1; i < itemTotal; i++) {
    firstTrigger.clone().appendTo(component);
  }

  var triggers = component.find("[tr-scroll-toggle='trigger']");
  firstTrigger.css("margin-top", "-100vh");

  var trSpacer = $(
    "<div class='tr-scroll-toggle-spacer' style='width: 100%; height: 100vh;'></div>"
  )
    .hide()
    .appendTo(component);

  var minWidth = 0;
  var trMinWidth = component.attr("tr-min-width");
  if (trMinWidth !== undefined && trMinWidth !== false) {
    minWidth = +trMinWidth;
  }

  console.log("runs to here 1")


  gsap.matchMedia().add(`(min-width: ${minWidth}px)`, function () {
    trSpacer.show();

    function makeItemActive(activeIndex) {
      component
        .find("[tr-scroll-toggle='transform-y']")
        .css("transform", `translateY(${activeIndex * -100}%)`);
      component
        .find("[tr-scroll-toggle='transform-x']")
        .css("transform", `translateX(${activeIndex * -100}%)`);
      component
        .find("[tr-scroll-toggle='number-current']")
        .text(activeIndex + 1);
      lists.each(function () {
        $(this).children().removeClass("is-active");
        $(this).children().eq(activeIndex).addClass("is-active");
      });
    }

    makeItemActive(0);

    var anchorLinks = component.find("[tr-anchors]").children();
    anchorLinks.on("click", function () {
      var myIndex = $(this).index();
      var scrollDistance =
        triggers.eq(myIndex).offset().top + triggers.eq(myIndex).height() - 1;
      $("html, body").animate({ scrollTop: scrollDistance });
    });

    triggers.each(function (index) {
      var triggerIndex = index;
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: "top top",
          end: "bottom top",
          scrub: true,
          onToggle: function ({ self, isActive }) {
            if (isActive) {
              makeItemActive(triggerIndex);
            }
          }
        },
        defaults: {
          ease: "none"
        }
      });

      lists.each(function () {
        var childItem = $(this).children().eq(triggerIndex);
        tl.to(
          childItem.find("[tr-item-animation='scale-to-1']"),
          { scale: 1 },
          0
        )
          .from(
            childItem.find("[tr-item-animation='scale-from-1']"),
            { scale: 1 },
            0
          )
          .to(
            childItem.find("[tr-item-animation='progress-horizontal']"),
            { width: "100%" },
            0
          )
          .to(
            childItem.find("[tr-item-animation='progress-vertical']"),
            { height: "100%" },
            0
          )
          .to(
            childItem.find("[tr-item-animation='rotate-to-0']"),
            { rotation: 0 },
            0
          )
          .from(
            childItem.find("[tr-item-animation='rotate-from-0']"),
            { rotation: 0 },
            0
          );
      });
    });

    console.log("runs to here 2")


    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: component,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      },
      defaults: {
        ease: "none"
      }
    });

    tl.to(
      component.find("[tr-section-animation='scale-to-1']"),
      { scale: 1 },
      0
    )
      .from(
        component.find("[tr-section-animation='scale-from-1']"),
        { scale: 1 },
        0
      )
      .to(
        component.find("[tr-section-animation='progress-horizontal']"),
        { width: "100%" },
        0
      )
      .to(
        component.find("[tr-section-animation='progress-vertical']"),
        { height: "100%" },
        0
      )
      .to(
        component.find("[tr-section-animation='rotate-to-0']"),
        { rotation: 0 },
        0
      )
      .from(
        component.find("[tr-section-animation='rotate-from-0']"),
        { rotation: 0 },
        0
      );

      console.log("runs to here 3")


    // Restart scroll triggers on button click
    var restartButton = $(".r_d_b-button");
    restartButton.on("click", function () {
      // Create your GSAP timeline and add animations here
      var tlOverlay = gsap.timeline();

      // Fade out the element
      tlOverlay.to(".cta_component", { opacity: 0 });

      // Execute makeItemActive(0) and gsap.set(window, { scrollTo: 0 }) after fading out
      tlOverlay.add(function () {
        makeItemActive(0);
        gsap.set(window, {
          scrollTo: { y: 0, immediateRender: false }
        });
      });

      // Fade in the element
      tlOverlay.to(".overview_component", { opacity: 1 });
      console.log("rdb overview function worked");
    });
  });
});
