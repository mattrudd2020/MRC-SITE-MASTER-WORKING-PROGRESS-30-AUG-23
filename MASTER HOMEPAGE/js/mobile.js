//// START WEB-DESIGN CODE ////


function initWebDesign() {


  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
  
  const smoother = ScrollSmoother.create({
    smooth: 2,
    normalizeScroll: true,
    ignoreMobileResize: true,
    effects: true,
    // normalizeScroll: true,
    smoothTouch: 0.1
  });


//// MOBILE MOCKUP SECTION ////
gsap.registerPlugin(ScrollTrigger); 

ScrollTrigger.create({ 
  trigger:".lp-phone-mockup-block", 
  start: "top top",
  end: () => '+='+ (document.querySelector('.lp-phone-mockup-slides-container').offsetHeight * 5),
  pin: true, 
  markers: true, 
}) 

const lottie1 = document.querySelector('#lottie-phone') 

LottieScrollTrigger({ 
  target: lottie1, 
  path: "https://mrc-website-assets.s3.eu-west-2.amazonaws.com/lottie/AB-logo-for-iPhone-mockupe.json", 
  trigger:".lp-phone-mockup-block", 
  start: "top top", 
  end: () => '+='+ (document.querySelector('.lp-phone-mockup-slides-container').offsetHeight),  
  pin: false, 
  scrub: 1, 
  markers: true 
}); 

let tl = gsap.timeline({ 
  scrollTrigger: { 
    start: self => self.previous().end, 
    end: () => '+='+ (document.querySelector('.lp-phone-mockup-slides-container').offsetHeight * 4), 
    scrub: 1, 
    invalidateOnRefresh: true,
        markers: true, 
  } 
}); 

tl.to(".lp-phone-mockup-slides-container", { 
  y: () => document.querySelector('.lp-phone-mockup-frame').offsetHeight - document.querySelector('.lp-phone-mockup-slides-container').offsetHeight, 
  ease: "none" 
}) 



function LottieScrollTrigger(vars) {
    let playhead = {frame: 0},
        target = gsap.utils.toArray(vars.target)[0],
        speeds = {slow: "+=2000", medium: "+=1000", fast: "+=500"},
        st = {trigger: target, pin: true, start: "top top", end: speeds[vars.speed] || "+=1000", scrub: 1},
        ctx = gsap.context && gsap.context(),
        animation = lottie.loadAnimation({
            container: target,
            renderer: vars.renderer || "svg",
            loop: false,
            autoplay: false,
            path: vars.path,
            rendererSettings: vars.rendererSettings || { preserveAspectRatio: 'xMidYMid slice' }
        });
        for (let p in vars) { // let users override the ScrollTrigger defaults
            st[p] = vars[p];
        }
    animation.addEventListener("DOMLoaded", function() {
      let createTween = function() {
         animation.frameTween = gsap.to(playhead, {
            frame: animation.totalFrames - 1,
            ease: "none",
            onUpdate: () => animation.goToAndStop(playhead.frame, true),
            scrollTrigger: st
        });
        return () => animation.destroy && animation.destroy();
      };
      ctx && ctx.add ? ctx.add(createTween) : createTween();
      // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
      ScrollTrigger.sort();
      ScrollTrigger.refresh();    
    });
    return animation;
}

// animate the slide captions in
let slides = gsap.utils.toArray('.phone-mockup-slide');
slides.shift(); // the first one doesn't animate

slides.forEach((slide, i) => {
  let slideId = slide.getAttribute('data-slide-id'),
      st = tl.scrollTrigger,
      increment = 1 / (slides.length + 0),
      offset = increment / 5; // wait to trigger until the color is about 20% into the screen

  gsap.fromTo(".lp-phone-mockup-step-"+ parseInt(slideId), {
    xPercent: 100, 
    opacity: 0
  }, {
    xPercent: 0,
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      start: () => st.start + (st.end - st.start) * (i * increment + offset),
      end: "+=1",
      toggleActions: "play none none reverse",
    }
  });
});
  


//// END MOBILE MOCKUP SECTION ////
}

initWebDesign();