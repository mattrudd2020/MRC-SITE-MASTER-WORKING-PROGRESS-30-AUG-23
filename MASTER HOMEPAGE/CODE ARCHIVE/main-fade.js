
console.log("hello!");

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Loader swipe animation setup


function init() {

    const animPageLeave = function () {
      return gsap.to("main", {
        duration: 1,
        opacity: 0,
        ease: "power2.inOut",
      });
    };
    
    const animPageEnter = function () {
      return gsap.from("main", {
        duration: 1,
        opacity: 0,
        ease: "power2.inOut",
      });
  }


  //barba.js setup!

  // do something before the transition starts
  //barba.hooks.before(() => {
  //...
  //});

  // kill old ScrollTriggers
  barba.hooks.leave(() => {
    /*scrollX = barba.history.current.scroll.x;
    scrollY = barba.history.current.scroll.y; */
    console.log("Leave");
    killScrollTriggers();
    console.log("STs KILLED");
  });
  
  barba.hooks.afterLeave(() => {
    killScrollTriggers();
    console.log("STs KILLED");
  });
    

  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }

barba.hooks.enter(() => {
  console.log("Enter");
  window.scrollTo(0, 0);
});

barba.hooks.afterEnter((data) => {
  animFadeIn(data.next.container);
});

barba.init({
  timeout: 5000,
    views: [
      {
        namespace: "index",
        beforeEnter() {
          initIndexAnims();
          console.log("INDEX VIEW WORKING");
        }
      },
      {
        namespace: "subpage",
        beforeEnter() {
          initSubpageAnims();
          console.log("SUBPAGE VIEW WORKING");
        }
      }
    ],
    transitions: [
      {
        leave: () => animPageLeave(),
        enter() {
          animPageEnter();
        }
      }
    ]
  });
}

window.addEventListener("load", function () {
  init();
  // // run animations & setup ScrollTriggers on load
  //...//
});

// // // START OF INDEX ANIMATIONS FUNCTION // // //

//// SCROLLTRIGGER/SMOOTHER SETUP
function initIndexAnims() {
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

//// CURSOR SETUP ////

const cursorMain = document.querySelector(".main-cursor");
const cursorVideo = document.querySelector(".video-cursor");
const cursorVideoExit = document.querySelector(".cursor-video-exit");
let scale = 1;

function mousemoveHandler(e) {
  const target = e.target;
  const tl = gsap.timeline({
    defaults: {
      x: e.clientX,
      y: e.clientY,
      ease: "power2.out"
    }
  });

  if (target.closest("#video-block")) {
    tl.to(cursorMain, {
      opacity: 0
    }).to(
      cursorVideo,
      {
        opacity: 1
      },
      "-=0.5"
    );

} 

else if (target.closest(".plyr__video-wrapper")) {
  tl.to(".cursors",{
    opacity: 0,
    scale: scale
  })
  .to(
    cursorVideoExit,
    {
      opacity: 1
    },
    "-=0.5"
  );
}

else {

    tl.to(cursorMain, {
      opacity: 1,
      scale: scale
    }).to(
      cursorVideo,
      {
        opacity: 0
      },
      "-=0.5"
    );
  
  tl.to(
    cursorVideoExit,
    {
      opacity: 0
    },
    "-=0.5"
  );
}
}

function mouseleaveHandler() {
  gsap.to(cursorMain, {
    opacity: 0
  });
}

document.addEventListener("mousemove", mousemoveHandler);
document.addEventListener("mouseleave", mouseleaveHandler);


//// EXIT ////

$('plyr__video-wrapper').hover(
  function () {
    gsap.to(
      cursorVideo,
      {
        opacity: 0
      })  
    // the element is hovered over... do stuff

  }, 
  function () {
    gsap.to(
      cursorVideoExit,
      {
        opacity: 0
      })    
    // the element is no longer hovered... do stuff
  }
);

  //// TOP PANEL TEXT SWITCH/FADE SETUP
  

  let panels = gsap.utils.toArray(".panel");

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".text-container",
      start: "top top",
      end: "+=300%",
      scrub: true,
      pin: true
    }
  });

  let stayTime = 1; // seconds between each text flip on the timeline (not literally seconds on screen - we're just spacing them out on the timeline)
  let textElements = gsap.utils.toArray(".text"); // get an Array of all the ".text" elements

  // loop through each text element and add an autoAlpha flip at the appropriate times on the timeline
  textElements.forEach((el, i) => {
    tl.set(el, { autoAlpha: 1 }, i * stayTime);
    if (i !== 0) {
      // if it's the first one, we don't need to toggle the previous one off.
      tl.set(textElements[i - 1], { autoAlpha: 0 }, i * stayTime);
    }
  });
  // add some space at the end of the timeline so the last one stays for the correct duration before things get unpinned.
  tl.set({}, { delay: stayTime });

  tl.to(".panel.first", {
    yPercent: -100
  });

  tl.to("#para-text", { opacity: 0 }, "<1");
  tl.to(".panel.second", { opacity: 0 }, "<1");

  gsap.set(".panel", { zIndex: (i, target, targets) => targets.length - i });

  
  //// END TOP PANEL TEXT SWITCH/FADE SETUP

  //// START SHOWREEL CONTAINER

// Click button to change lightbox to opacity 1 and visible
// And start video (autoplay)

const element = document.getElementById('video-block');
const video = document.querySelector('#video');

const player = new Plyr('#video', {
  loadSprite: false,
  controls: false,
});

element.addEventListener('click', function () {
  videoStartEffect();
});

function videoStartEffect() {
  video.src = "https://media-files.vidstack.io/360p.mp4";
  var lightbox = '.lightbox',
    lightboxBars = '.lightbox-bar',
    tl = gsap.timeline();

    

  tl.to(
    lightbox,
    {
      autoAlpha: 1,
      duration: 1,
      ease: 'cubic.out',
      pointerEvents: 'auto',
    },
    0
  );

  ///Animate bars up
  tl.to(
    lightboxBars,
    {
      scaleY: 0,
      ease: "cubic",
      duration: 0.7
    },
    0.75
  );

  console.log("bars animated!");


  console.log('LIGHTBOX DIMS IN!');

  console.log('VIDEO PLAYS!');
  player.play();

}

// Close lightbox and pause video

const element2 = document.getElementById('lightbox-close');

element2.addEventListener('click', function () {
  //video.pause();
  lbclose();
  

  setTimeout(() => {video.src = ""}, 600);
  //video.removeAttribute('src'); // empty source

});
  console.log('VIDEO PAUSED!');


  function lbclose() {
    var lightbox = ".lightbox",
      lightboxBars = ".lightbox-bar",
      tl = gsap.timeline({
        onComplete: () => {
          gsap.to(
            cursorVideoExit,
            {
              opacity: 0
            },
          );
          console.log("byeee");
        }
      });

    /// Animate bars back down 

  tl.to(
    lightboxBars,
    {
      scaleY: 1,
      ease: "cubic",
      duration: 0
    },
    0
  );

  tl.to(
    lightbox,
    {
      autoAlpha: 0,
      duration: 0.5,
      ease: 'cubic.out',
    },
    1
  );
  player.pause();
  console.log('LBCLOSE FUNCTION RAN!');
}

//Video plays

//Video pauses when clicked
//Lightbox goes back to opacity 0, hidden

// EXIT CURSOR SETUP



  //// END SHOWREEL CONTAINER

  //// START HOVER-LIST SECTION CODE ////
  var $cursor = $(".hover-image"),
  $overlay = $(".project-overlay");

function moveCircle(e) {
gsap.to($cursor, 0.5, {
  css: {
    left: e.pageX,
    top: e.pageY
  },
  delay: 0.03
});
}

$(".p-1").hover(function(){
$(".hover-image").css({ "background-image": "url(https://i.pinimg.com/564x/85/24/d7/8524d785a8427617d475bf02d51710fc.jpg)" });
});

$(".p-2").hover(function(){
$(".hover-image").css({ "background-image": "url(https://i.pinimg.com/564x/97/59/85/9759859a26a8f8195d1c4dd92f00cb73.jpg)" });
});
$(".p-3").hover(function(){
$(".hover-image").css({ "background-image": "url(https://i.pinimg.com/564x/9c/52/81/9c528158c74da06541565671cfc2644b.jpg)" });
});
$(".p-4").hover(function(){
$(".hover-image").css({ "background-image": "url(https://i.pinimg.com/564x/38/18/c3/3818c31969226e29a9dabd5e3cd0802a.jpg)" });
});
$(".p-5").hover(function(){
  $(".hover-image").css({ "background-image": "url(https://i.pinimg.com/564x/9c/52/81/9c528158c74da06541565671cfc2644b.jpg)" });
  });

var flag = false;
$($overlay).mousemove(function() {
flag = true;
gsap.to($cursor, 0.3, {scale: 1, autoAlpha: 1});
$($overlay).on("mousemove", moveCircle);
});

$($overlay).mouseout(function() {
flag = false;
gsap.to($cursor, 0.3, {scale: 0.1, autoAlpha: 0});
});

//// END HOVER-LIST SECTION CODE ////

//// START HORIZONTAL SECTION CODE

//Horizontal Scroll Galleries
if (document.getElementById("portfolio")) {
  const horizontalSections = gsap.utils.toArray('.horiz-gallery-wrapper')

  horizontalSections.forEach(function (sec, i) {

    const pinWrap = sec.querySelector(".horiz-gallery-strip");

    let pinWrapWidth;
    let horizontalScrollLength;

    function refresh() {
      pinWrapWidth = pinWrap.scrollWidth;
      horizontalScrollLength = pinWrapWidth - window.innerWidth;
    }

    // window.addEventListener("load", function () {
      refresh();
      // Pinning and horizontal scrolling
      gsap.to(pinWrap, {
        scrollTrigger: {
          scrub: true,
          trigger: sec,
          pin: sec,
          start: "center center",
          end: () => `+=${pinWrapWidth}`,
          invalidateOnRefresh: true,
          markers: false,
          pinSpacing: true
        },
        x: () => -horizontalScrollLength,
        ease: "none"
      });

      ScrollTrigger.addEventListener("refreshInit", refresh);
    // });
  });


  ScrollTrigger.refresh(); 
  
}



//// END HORIZONTAL SECTION CODE

//// START LOTTIE 
  
LottieScrollTrigger({
  target: "#contours",
  path: "https://assets.codepen.io/4086427/data_6.json",
  speed: "medium",
  pin: ".LottieSection",
  start: "top top",
  end: "bottom top",
  scrub: 1,
  pinSpacing: true,
  markers: false

});    


function LottieScrollTrigger(vars) {
  let playhead = {frame: 0},
    target = gsap.utils.toArray(vars.target)[0],
    speeds = {slow: "+=2000", medium: "+=1000", fast: "+=500"},
    st = {trigger: target, pin: true, start: "top top", end: speeds[vars.speed] || "+=1000", scrub: 1},
    animation = lottie.loadAnimation({
      container: target,
      renderer: vars.renderer || "svg",
      loop: false,
      autoplay: false,
      path: vars.path
    });
  for (let p in vars) { // let users override the ScrollTrigger defaults
    st[p] = vars[p];
  }
  animation.addEventListener("DOMLoaded", function() {
    gsap.to(playhead, {
      frame: animation.totalFrames - 1,
      ease: "none",
      onUpdate: () => animation.goToAndStop(playhead.frame, true),
      scrollTrigger: st,
  });  
  // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
ScrollTrigger.sort();
  ScrollTrigger.refresh(); 
});
return animation;   

}
/*
let tlcontours = gsap.timeline({
  scrollTrigger: {
    trigger: ".LottieSection",
    start: "-100% bottom",
    end: "bottom top",
    scrub: true,
    toggleActions: "play reverse play reverse",
    markers: true
  }
});
tlcontours.to("#contours", { opacity: 0, duration: 2, ease: Power3.easeOut });

*/


//// END LOTTIE
 

//// COLOUR CHANGE CODE ////

/*

  gsap.to("body", {
    "--color": "#7f5af0",
    scrollTrigger: {
      trigger: ".outer-highlight",
      scrub: true
    }
  });
  
  gsap.to("body", {
    "--color": "#00ffa3",
    immediateRender: false,
    scrollTrigger: {
      trigger: ".outer-highlight-2",
      scrub: true
    }
  });
  
  gsap.to("body", {
    "--color": "#005DFF",
    immediateRender: false,
    scrollTrigger: {
      trigger: ".outer-highlight-3",
      scrub: true
    }
  });


*/

//// FEATURED WORK TEXT PIN ////

ScrollTrigger.create({
  trigger: ".featured-work-title",
  start: "top 10%",
  end: "bottom 50%",
  pin: ".pin-this",
  pinSpacing: false,
  markers: false
});  

//// END FEATURED TEXT PIN ////

const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
scrollColorElems.forEach((colorSection, i) => {
  const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
  const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;

  ScrollTrigger.create({
    trigger: colorSection,
    start: "top 50%",
    onEnter: () =>
      gsap.to("body", {
        backgroundColor: colorSection.dataset.bgcolor,
        color: colorSection.dataset.textcolor,
        overwrite: "auto"
      }),
    onLeaveBack: () =>
      gsap.to("body", {
        backgroundColor: prevBg,
        color: prevText,
        overwrite: "auto"
      })
  });
});


ScrollTrigger.refresh()

//// END COLOUR CHANGE CODE ////


   //// START CIRCLE GROW
 

  gsap.timeline({
    scrollTrigger: {
      trigger: ".container-circle",
      pin: true,
      start: "top top",
      end: "bottom top-=200",
      scrub: 1,
      markers: false,
    }
  })
  .to(".masker", { duration: 10, attr: { r: 800 } })
  .to("#circleClipPathReveal", { duration: 10, rotation: -180, svgOrigin:"200 200" }, 0.4)
.to(".wheel", {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".spacer1",
        start: "top middle",
        end: "bottom 50%",
        scrub: true,
            markers: false,
        pinSpacing: true,
      }
      })
.to(".contact", {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".circlebox",
        start: "170% bottom",
        end: "bottom top",
        scrub: true,
            markers: false,
        pinSpacing: true,
      }
      })
.to("#circleClipPathReveal", {
      opacity: 0, 
      scrollTrigger: {
      trigger: ".circlebox",
      start: "180% bottom",
      end: "bottom -200%",
      scrub: 1,
      markers: false,
    }
  })
 

  
     console.log("CIRCLE GROW new MASTER TL SETUP");

  //// END CIRCLE GROW



//// START CONTACT FORM CODE

$( "#name" ).click(function() {
  $( this ).toggleClass( "active" );
   $( "#underline1" ).toggleClass( "active" );
   $("#underline2").removeClass("active");
   $("#underline3").removeClass("active");
  });
 
 $( "#email" ).click(function() {
  $( this ).toggleClass( "active" );
   $( "#underline2" ).toggleClass( "active" );
   $("#underline1").removeClass("active");
   $("#underline3").removeClass("active");
  });
 
 $( "#message" ).click(function() {
  $( this ).toggleClass( "active" );
   $( "#underline3" ).toggleClass( "active" );
   $("#underline1").removeClass("active");
   $("#underline2").removeClass("active");
  });
 
 $( "textarea" ).click(function() {
  $( this ).toggleClass( "active" );
  });
 
 gsap.to(".left-col", { duration: 3, ease: "power2.out", opacity: 1});
 
 gsap.to("#underline1", { width: "400", 
   duration: 3,
   ease: Power4.easeOut
 });
 gsap.to("#underline2", { width: "400", 
   duration: 3,
   ease: Power4.easeOut
 });
 gsap.to("#underline3", { width: "400", 
   duration: 3,
   ease: Power4.easeOut
 });
 
 
 
 /// CUSTOM MESSAGING ////
 
 const name = document.getElementById('name');
 const email = document.getElementById('email');
 const message = document.getElementById('message');
 const contactForm = document.getElementById('cf');
 const errorElement = document.getElementById('error');
 const successMsg = document.getElementById('success-msg');
 const submitBtn = document.getElementById('dont-name-submit');
   
 function validate(form) {
 
   if (name.value.length < 3) {
     errorElement.innerHTML = 'Your name should be at least three characters long.';
     return false;
   } 
   
   if (!(email.value.includes('.') && (email.value.includes('@')))) {
     errorElement.innerHTML = 'Please enter a valid email address.';
     return false;
   } 
 
   if (!emailIsValid(email.value)) {
     errorElement.innerHTML = 'Please enter a valid email address.';
     return false;
   }
 
   if (message.value.length < 15) {
     errorElement.innerHTML = 'Please write a longer message.';
     return false;
   }
 
   errorElement.innerHTML = '';
   
   
 
 /*
   validateform();
   setTimeout(function () {
     successMsg.innerHTML = '';
     document.getElementById('cf').reset();
     
   }, 6000);
 */  
 
   return true;
 
   
 }
 
 const emailIsValid = email => {
   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
 
 
 
 }
 
 /* THIS LINE IS REQUIRED TO RUN MY VALIDATION AND DISPLAY MESSAGE BELOW BUTTON, BUT WHEN PRESENT PREVENTS THE FIRING OF THE REST OF THE SCRIPT?!*/
 /* submitBtn.addEventListener("click", validate); */
 
 
 contactForm.addEventListener("submit", function(ev) {
   ev.preventDefault();
   
   
 
   // do validation
  
   if (!validate(contactForm)) {
     return;
   }
 
   
   // do animation
   submitBtn.classList.add("is-active");
   setTimeout(function() {
     submitBtn.classList.remove("is-active");
 
     actual_submit();
   }, 4000);
 
   setTimeout(function () {
   successMsg.innerHTML = 'Thank you! I will get back to you as soon as possible.'; 
   }, 2000);
   
    setTimeout(function () {
      successMsg.innerHTML = '';
         document.getElementById('cf').reset();
     
   }, 4000);
 
 })
 
 
 
 function actual_submit() {
   console.log("doing ajax");
   setTimeout(function() {
     console.log("ajax completed")
   }, 500);
 }
 
 $(function () {
 
         $('#cf').on('submit', function (e) {
 
           $.ajax({
             type: 'post',
             url: 'https://matt-rudd.com/message.php',
             data: $('form').serialize(),
             success: function () {
               console.log("MESSAGE SENT VIA PHP");
             }
           });
 
         });
 
       });
 
 
 console.log("REACHED END");
 
 

//// END CONTACT FORM CODE

//// START FOOTER CODE
function footerCode() {
gsap.set('.footer-container', { yPercent: -50 })

let uncover = gsap.timeline({ paused:true })

uncover
.to('.footer-container', { yPercent: 0, ease: 'none' })
;

ScrollTrigger.create({ 
  trigger: '.spacer2',
  start: 'bottom bottom',
  end: '+=75%',
  animation: uncover,
  scrub: true,  
  markers: false,
 
})
}
footerCode();  
//// END FOOTER CODE
 
} ///END INDEXANITANIMS FUNCTION

// // // END OF INDEX ANIMATIONS FUNCTION // // //

// // // START OF SUBPAGE ANIMATIONS (PINNED SIDE PANEL) // // //

function initSubpageAnims() {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

//// TOP HALF

const smoother = ScrollSmoother.create({
  smooth: 2,
  normalizeScroll: true,
  ignoreMobileResize: true,
  effects: true,
  // normalizeScroll: true,
  smoothTouch: 0.1
});

const childSplit = new SplitText("h1", {
  type: "lines",
  linesClass: "split-child"
});
const parentSplit = new SplitText("h1", {
  // type: "lines",
  linesClass: "split-parent"
});

gsap.from(childSplit.lines, {
  duration: 2.5,
  yPercent: 100,
  ease: "power4",
  stagger: 0.1
});

var el = document.querySelector(".top-sub-copy-block");

var s = new SplitText(el, {
  type: "lines,words",
  linesClass: "ts-line"
});

gsap.from(s.lines, {
  duration: 2,
  y: 50,
  autoAlpha: 0,
  ease: "power3",
  stagger: 0.05
});

gsap.utils.toArray(".sub-copy-block").forEach(function (elem) {
  const SplitLine = new SplitText(elem, {
    type: "lines",
    linesClass: "ts-line"
  });
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: elem,
      start: "top 67.5%",
      markers: false
      // toggleActions: "restart pause resume reverse",
    }
  });
  tl.set(elem, { autoAlpha: 1 });
  tl.from(SplitLine.lines, {
    duration: 2,
    y: 50,
    ease: "power3",
    stagger: 0.05,
    autoAlpha: 0
  });
});

gsap.utils.toArray(".case-study-1-title").forEach(function (elem) {
  const SplitLine = new SplitText(elem, {
    type: "lines",
    linesClass: "ts-line"
  });
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: elem,
      start: "top 90%",
      markers: false
      // toggleActions: "restart pause resume reverse",
    }
  });
  tl.set(elem, { autoAlpha: 1 });
  tl.from(SplitLine.lines, {
    duration: 2,
    y: 50,
    ease: "power3",
    stagger: 0.05,
    autoAlpha: 0
  });

  tl.to("#underline1", { width: "79.75%", duration: 3, ease: Power3.easeOut });
});

console.log("split text + lines firing");

/*
const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".bottom-full-width-img",
    start: "top bottom",
    end: "top top",
    scrub: true,
    markers: true
  }
});
tl2.to("#mtb-full-width", { opacity: 1 });
*/
//// SIDEBAR JS

let tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".subtwo",
    start: "center 50%",
    end: "+=1000",
    pin: true,
    pinSpacing: true,
    markers: false,
    scrub: true
  }
});

tl3.from(".text_area", {
  opacity: 0,
  y: "200%"
}),

tl3.from(
  ".subfirst",
  {
    opacity: 0
  },
  { opacity: 1 }
);
tl3.from(".subsecond", {
  opacity: 0
});
tl3.from(".subthird", {
  opacity: 0
});
tl3.to(".fading_texts", {
  opacity: 0
});
tl3.to(".text_area", {
  opacity: 0,
  y: "-200%"
});

let tl4 = gsap.timeline({
  scrollTrigger: {
    trigger: ".subthree",
    start: "center 50%",
    end: "+=3000",
    pin: true,
    pinSpacing: true,
    markers: false,
    scrub: true
  }
});

tl4.from(".text_area1", {
  opacity: 0,
  y: "200%"
});

tl4.fromTo(
  ".subfourth",
  {
    opacity: 0
  },
  { opacity: 1 }
);
tl4.from(".subfifth", {
  opacity: 0
});
tl4.from(".subsixth", {
  opacity: 0
});
tl4.to(".fading_texts2", {
  opacity: 0
});
tl4.to(".text_area1", {
  opacity: 0,
  y: "-200%"
});

}  