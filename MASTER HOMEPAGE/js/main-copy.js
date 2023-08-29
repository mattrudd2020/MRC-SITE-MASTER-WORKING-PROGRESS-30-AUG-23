gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const scroller = document.querySelector("#smooth-content");

const smoother = ScrollSmoother.create({
  el: scroller,
  smooth: 2,
  effects: true,
  // normalizeScroll: true,
  smoothTouch: 0.1
});

let st = ScrollTrigger.create({
  trigger: ".left-side-column",
  pin: ".right-side-column",
  start: "top top",
  pinSpacing: true,
  anticipatePin: 1,
  end: "bottom top+=1000",
  markers: false
});

// LOTTIE ANIMATION

LottieScrollTrigger({
  target: "#map",
  path: "https://assets1.lottiefiles.com/packages/lf20_q7yxm6pp.json",
  speed: "medium",
  pin: ".left-side-column",
  start: "top 20%",
  end: "+=2000",
  pinnedContainer: ".left-side-column",
  scrub: 1,
  pinSpacing: true,
  markers: false
});

function LottieScrollTrigger(vars) {
  let playhead = { frame: 0 },
    target = gsap.utils.toArray(vars.target)[0],
    speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" },
    st = {
      trigger: target,
      pin: true,
      start: "top top",
      end: speeds[vars.speed] || "+=2000",
      scrub: 1
    },
    animation = lottie.loadAnimation({
      container: target,
      renderer: vars.renderer || "svg",
      loop: false,
      autoplay: false,
      path: vars.path
    });
  for (let p in vars) {
    // let users override the ScrollTrigger defaults
    st[p] = vars[p];
  }
  animation.addEventListener("DOMLoaded", function () {
    gsap.to(playhead, {
      frame: animation.totalFrames - 1,
      ease: "none",
      onUpdate: () => animation.goToAndStop(playhead.frame, true),
      scrollTrigger: st
    });
    // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  });
  return animation;
}
