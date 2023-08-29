

//// SCROLLTRIGGER/SMOOTHER SETUP

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  const scroller = document.querySelector("#smooth-content");

  const smoother = ScrollSmoother.create({
    el: scroller,
    smooth: 2,
    effects: true,
    // normalizeScroll: true,
    smoothTouch: 0.1
  });
 console.log("ST/SM INITIALISED");
  //// END SCROLLTRIGGER/SMOOTHER SETUP


  
let videoElem = document.getElementById('scroll-video');
  
  
  ScrollTrigger.create({
    trigger: videoElem,
    start: 'top 80%',
    end: 'top 20%',
    markers: true,
    onEnter: () => videoElem.play(),
    onEnterBack: () => videoElem.play(),
    onLeave: () => videoElem.pause(),
    onLeaveBack: () => videoElem.pause(),
  });