
console.log("hello!");

// // THREE.JS IMPORTS
import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { SVGRenderer } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/renderers/SVGRenderer.js";
import { OBJLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/OBJLoader.js";
//

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Loader swipe animation setup

function removejscssfile(filename, filetype){
  var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
  var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
  var allsuspects=document.getElementsByTagName(targetelement)
  for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
  if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
      allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
  }
}


function init() {

    const animPageLeave = function () {
    
      
    
      return gsap.to("main", {
        duration: 1.5,
        opacity: 0,
        ease: "power2.inOut",
      });
    };
    
    window.scrollTo(0, 0);

    const animPageEnter = function () {
      return gsap.from("main", {
        duration: 1.5,
        opacity: 0,
        ease: "power2.inOut",
      }) ;
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
    console.log("Leave!!!");
  });
  
  barba.hooks.afterLeave(() => {
    let triggers = ScrollTrigger.getAll();
    triggers.forEach(function (trigger) {
      trigger.kill();
    });
    console.log("STs KILLED");

    removejscssfile("gallery.css", "css");
    console.log("GALLERY CSS REMOVED!");

    removejscssfile("logotypes.css", "css");
    console.log("LOGOTYPES CSS REMOVED!");
    

  });
    

  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }

barba.hooks.enter(() => {
  console.log("Enter!!!");
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
        namespace: "sealskinz",
        beforeEnter() {
          initSubpageAnims();
          console.log("SUBPAGE VIEW WORKING");
        }
      },
      {
      namespace: "gallery",
      beforeEnter() {
        initFullScreenGalleryAnims();
        console.log("FULLSCREEN GALLERY VIEW WORKING");
      }
    },
    {
      namespace: "logotypes",
      beforeEnter() {
        initLogotypesPageAnim();
        console.log("LOGOTYPES VIEW WORKING");
      }
    },
    {
      namespace: "about-me",
      beforeEnter() {
        initAboutMePageAnim();
        console.log("ABOUT ME VIEW WORKING");
      }
    },
    {
      namespace: "copywriting",
      beforeEnter() {
        initCopywritingPageAnim();
        console.log("ABOUT ME VIEW WORKING");
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




function initIndexAnims() {

  // Lottie cursor sync //

LottieInteractivity.create({
  player: '#sticker',
  mode: 'cursor',
  container: '#smooth-content',
  actions: [
      {
          position: { x: [0, 1], y: [0, 1] },
          type: 'seek',
          frames: [0, 90],
      }
  ]
});

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

//// TOP TEXT FADE-IN ////

gsap.from(".text-container", {
  opacity: 0,
  duration: 1.5,
  ease: "power4",
});


//// END TOP-TEXT FADE-IN ////


  //// TOP PANEL TEXT SWITCH/FADE SETUP
  
  let panels = gsap.utils.toArray(".panel");

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".text-container",
      start: "top top",
      end: "+=300%",
      scrub: true,
      pin: true,
      // onUpdate: self => console.log(self.progress, self.direction)
      onComplete: () => ScrollTrigger.refresh()
    }
  });

//  ScrollTrigger.refresh();
  
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
  
  gsap.set(".panel", { zIndex: (i, target, targets) => targets.length - i });
  
  gsap.set("line", {drawSVG:0});
  /*gsap.set("#details", {xPercent:-50});*/
  
  /*var strips = document.querySelectorAll("#strips rect");*/
  
  console.log('GOT TO HERE? SLICE!');

  let tl2 = gsap.timeline({paused: true});
  
  tl2
  .to("line", {duration: 0.4, drawSVG:true, ease:"power2.in", stagger: 0.25},  "lineStart")
  .to("line", {duration: 0.4, drawSVG:"100% 100%", ease:"power2.out", stagger: 0.25}, "lineStart+=0.25")
  .to("#slide1", {duration: 1, x:-13, y:9, ease:"circ"}, "lineStart+=0.25")
  .to("#slide2", {duration: 1, x:11, y:6.5, ease:"circ"}, "lineStart+=0.5");

  
  ScrollTrigger.create({
    trigger: ".text-container",
    start:document.documentElement.clientHeight * 0.12,
    toggleActions:"play none none reverse",
    animation:tl2,
    onComplete: () => ScrollTrigger.refresh()
  })

// ScrollTrigger.refresh();
  
  console.log('GOT TO HERE? SLICE2!');

  
  //// END TOP PANEL TEXT SWITCH/FADE SETUP

//// START TICKER SECTION ////

let setupTicker = (function() {
  $("#services .container-fluid span").wrapAll("<span class='ticker-wrapper'>");

  var tickerWidth = $(".ticker-wrapper").width(),
      spanWidth = $(".ticker-wrapper span").width(),
      speed = 85,
      proxy = { timeScale: 0 },
      pipe = gsap.utils.pipe(
          gsap.utils.clamp(-10, 10),
          gsap.utils.snap(0.125)
      ),
      tl = gsap.timeline({
              repeat: -1,
              onReverseComplete: () => tl.iteration(10),
              scrollTrigger: {
                pinnedContainer: ".ticker-container",
                  trigger: "#services",
                  start: "top bottom",
                  end: "bottom top",
                  toggleActions:"play pause resume pause",
                  // markers: true,
                  onUpdate: (self) => {
                      // let timeScaleFactor = pipe(Math.abs(self.getVelocity()) / 100);
                      let timeScaleFactor = pipe(self.getVelocity() / 100);
                      if (Math.abs(timeScaleFactor) > Math.abs(proxy.timeScale)) {
                          proxy.timeScale = timeScaleFactor;
                          gsap.to(proxy, {
                              timeScale: self.direction,
                              duration: 1.5,
                              ease: "power3",
                              overwrite: true,
                              onUpdate: () => {
                                  gsap.to(tl, {timeScale: proxy.timeScale, ease:"power3", duration: 0.5});
                              }
                          });
                      }
                  }
              }
          }
      );


  $(".ticker-wrapper span").clone().appendTo(".ticker-wrapper");

  tl.to(".ticker-wrapper", { // loop
      rotation: 0.01,
      force3D: true,
      xPercent: -50,
      ease: "none",
      duration: spanWidth / speed
  });
}());

let setupTicker2 = (function() {
  $("#services2 .container-fluid2 span").wrapAll("<span class='ticker-wrapper2'>");

  var tickerWidth = $(".ticker-wrapper2").width(),
      spanWidth = $(".ticker-wrapper2 span").width(),
      speed = 85,
      proxy = { timeScale: 0 },
      pipe = gsap.utils.pipe(
          gsap.utils.clamp(-10, 10),
          gsap.utils.snap(0.125)
      ),
      tl = gsap.timeline({
              repeat: -1,
              onReverseComplete: () => tl.iteration(10),
              scrollTrigger: {
                pinnedContainer: ".ticker-container",
                  trigger: "#services2",
                  start: "top bottom",
                  end: "bottom top",
                  toggleActions:"play pause resume pause",
                  // markers: true,
                  onUpdate: (self) => {
                      // let timeScaleFactor = pipe(Math.abs(self.getVelocity()) / 100);
                      let timeScaleFactor = pipe(self.getVelocity() / 100);
                      if (Math.abs(timeScaleFactor) > Math.abs(proxy.timeScale)) {
                          proxy.timeScale = timeScaleFactor;
                          gsap.to(proxy, {
                              timeScale: self.direction,
                              duration: 1.5,
                              ease: "power3",
                              overwrite: true,
                              onUpdate: () => {
                                  gsap.to(tl, {timeScale: proxy.timeScale, ease:"power3", duration: 0.5});
                              }
                          });
                      }
                  }
              }
          }
      );


  $(".ticker-wrapper2 span").clone().appendTo(".ticker-wrapper2");

  tl.to(".ticker-wrapper2", { // loop
      rotation: 0.01,
      force3D: true,
      xPercent: -50,
      reversed: true,
      ease: "none",
      duration: spanWidth / speed
  });
}());

let setupTicker3 = (function() {
  $("#services3 .container-fluid3 span").wrapAll("<span class='ticker-wrapper3'>");

  var tickerWidth = $(".ticker-wrapper3").width(),
      spanWidth = $(".ticker-wrapper3 span").width(),
      speed = 85,
      proxy = { timeScale: 0 },
      pipe = gsap.utils.pipe(
          gsap.utils.clamp(-10, 10),
          gsap.utils.snap(0.125)
      ),
      tl = gsap.timeline({
              repeat: -1,
              onReverseComplete: () => tl.iteration(10),
              scrollTrigger: {
                  pinnedContainer: ".ticker-container",
                  trigger: "#services3",
                  start: "top bottom",
                  end: "bottom top",
                  toggleActions:"play pause resume pause",
                  // markers: true,
                  onUpdate: (self) => {
                      // let timeScaleFactor = pipe(Math.abs(self.getVelocity()) / 100);
                      let timeScaleFactor = pipe(self.getVelocity() / 100);
                      if (Math.abs(timeScaleFactor) > Math.abs(proxy.timeScale)) {
                          proxy.timeScale = timeScaleFactor;
                          gsap.to(proxy, {
                              timeScale: self.direction,
                              duration: 1.5,
                              ease: "power3",
                              overwrite: true,
                              onUpdate: () => {
                                  gsap.to(tl, {timeScale: proxy.timeScale, ease:"power3", duration: 0.5});
                              }
                          });
                      }
                  }
              }
          }
      );


  $(".ticker-wrapper3 span").clone().appendTo(".ticker-wrapper3");

  tl.to(".ticker-wrapper3", { // loop
      rotation: 0.01,
      force3D: true,
      xPercent: -50,
      ease: "none",
      duration: spanWidth / speed
  });
}());



//// END TICKER SECTION ////


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
        onComplete: () =>
          ScrollTrigger.refresh()
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
tl.to(
    cursorVideoExit,
    {
      opacity: 0
    }),
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
  /*path: "https://matt-rudd.com/json/wireframemountain.json",*/
  speed: "medium",
  pin: ".LottieSection",
  start: "top top",
  end: "bottom top",
  scrub: 1,
  pinSpacing: true,
  markers: true

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
 

//// START APPROACH SECTION ////


let st1 = ScrollTrigger.create({
  trigger: ".column-block1",
  pin: ".column-block1",
  start: "top top",
  end: "bottom top-=200%"
});
gsap.to(".column-block1", {
  opacity: 1,
  ease: "none",
  scrollTrigger: {
    trigger: ".column-block1",
    start: "top 50%",
    end: "top top",
    scrub: true,
    markers: true
  }
});

let st2 = ScrollTrigger.create({
  trigger: ".column-block2",
  pin: ".column-block2",
  start: "top top",
  end: "bottom top-=100%"
});
gsap.to(".column-block2", {
  opacity: 1,
  ease: "none",
  scrollTrigger: {
    trigger: ".column-block2",
    start: "top 50%",
    end: "top top",
    scrub: true,
    markers: true
  }
});

let st3 = ScrollTrigger.create({
  trigger: ".column-block3",
  pin: ".column-block3",
  start: "top top",
  end: "bottom top"
});
gsap.to(".column-block3", {
  opacity: 1,
  ease: "none",
  scrollTrigger: {
    trigger: ".column-block3",
    start: "top 50%",
    end: "top top",
    scrub: true,
    markers: true
  }
});


//// END APPRAOCH SECTION ////

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

//   //// THREE.JS SECTION ////

  
  /* SETUP */
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 100;
  
  
  
  
  scene.background = new THREE.Color( 0, 0, 0 );
  
  /* Setup the renderer */
  const renderer = new SVGRenderer(); // Init a renderer
  renderer.overdraw = 0; // Allow three.js to render overlapping lines
  renderer.setSize(window.innerWidth, window.innerHeight); // Define its size
  let div = document.getElementById("three-section");
  div.appendChild(renderer.domElement); // Add the SVG in the DOM
  renderer.domElement.setAttribute('xmlns' ,'http://www.w3.org/2000/svg'); // Add the xmlns attribute
  
  
  
  
  
  const LoadingManager = new THREE.LoadingManager(() => {
    console.log("LoadingManager")
  
  });
  
  
  
  
  
  /* Setup a new loader */
  const loader = new OBJLoader(LoadingManager);
  // Load the OBJ file
  loader.load('https://mrc-website-assets.s3.eu-west-2.amazonaws.com/TOPOPLZ5.obj', (model) => {
    // Convert all materials into a wireframe 
    
    model.children[0].material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    });
    // Add the model in the scene
    scene.add(model);
  
  var modelClone = {}
  modelClone = model.clone();
      modelClone.traverse(node => {
      if (!node.isMesh) return;
        node.material = new THREE.MeshBasicMaterial({ color: 'black'});
      });
    
  
      
  
      
      scene.add(modelClone);
      
  
  model.rotation.z = 0;
  model.rotation.y = 9.4;
  model.scale.set(60, 60, 60);
  modelClone.rotation.y = 9.4;
  modelClone.position.set(0, 0, -0.01);
  modelClone.scale.set(60, 60, 60);
  
  
  /* Animation */
  
  const setupAnimation = () =>{
    console.log("setupAnimation")
      model.position.x = 0;
      model.rotation.x += 1.5;
      modelClone.position.x = 0;
      modelClone.rotation.x += 1.5;
      ScrollTrigger.matchMedia({"(prefers-reduced-motion: no-preference)":
  desktopAnimation})
    }
  
  const desktopAnimation = () => {
    let section = 0;
  const tl = gsap.timeline({
    default:{
      duration:1,
      ease: "power2.inOut"
    },
    scrollTrigger: {
      trigger: ".three-js-section",
      start: "top top",
      end: "bottom bottom",
      pin: true,
      pinSpacing: false,
      scrub: 0.1,
      markers: true
    }
    
  });
  console.log("Scrolltrigger")
  tl.to(model.rotation, {
    x:0.1,
    onUpdate: () => {
      renderer.render(scene, camera);
    }
  }, section);
    
    console.log("Scrolltrigger")
  tl.to(modelClone.rotation, {
    x:0.1,
    onUpdate: () => {
      renderer.render(scene, camera);
    }
  }, section);

ScrollTrigger.refresh();
  
  }
      setupAnimation();
  
    // Render the scene
    renderer.render(scene, camera);
  });
  // // Init the contoller
  // const controls = new OrbitControls(camera, renderer.domElement);
  // // Render the scene on each update of the controls
  // controls.addEventListener('change', () => {
  //   renderer.render(scene, camera);
  // });
  
  /* EVENTS */
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener("resize", onWindowResize, false);
  
  
  
  
  

    //// END THREE.JS SECTION ////

// //// FEATURED WORK TEXT PIN ////

// ScrollTrigger.create({
//   trigger: ".featured-work-title",
//   start: "top 10%",
//   end: "bottom 50%",
//   pin: ".pin-this",
//   pinSpacing: false,
//   markers: false
// });  

// //// END FEATURED TEXT PIN ////

// const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
// scrollColorElems.forEach((colorSection, i) => {
//   const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
//   const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;

//   ScrollTrigger.create({
//     trigger: colorSection,
//     start: "top 50%",
//     onEnter: () =>
//       gsap.to("body", {
//         backgroundColor: colorSection.dataset.bgcolor,
//         color: colorSection.dataset.textcolor,
//         overwrite: "auto"
//       }),
//     onLeaveBack: () =>
//       gsap.to("body", {
//         backgroundColor: prevBg,
//         color: prevText,
//         overwrite: "auto"
//       })
//   });
// });


// ScrollTrigger.refresh()

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
 
  ScrollTrigger.refresh()
  
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
//// END FOOTER CODE

ScrollTrigger.refresh();
console.log("STs REFRESHED!");
 
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

ScrollTrigger.refresh()
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

function initFullScreenGalleryAnims() {

  var cssId = 'myCss'; // you could encode the css path itself to generate id..
  if (!document.getElementById(cssId)) {
      var head = document.getElementsByTagName('head')[0];
      var link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = 'css/gallery.css';
      link.media = 'all';
      head.appendChild(link);
  }

  gsap.registerPlugin(Observer);

  // Track the cursor position
  let cursor = {x: 0, y: 0};
  window.addEventListener('mousemove', ev => cursor = getCursorPos(ev));
  
  class CursorText {
    // DOM elements
    DOM = {
      // Main element (.cursor)
      el: null,
      // Inner element (.cursor__text)
      text: null,
    }
    // Element style properties
    renderedStyles = {
      // With interpolation, we can achieve a smooth animation effect when moving the cursor. 
      // The "previous" and "current" values are the values that will interpolate. 
      // The returned value will be one between these two (previous and current) at a specific increment. 
      // The "amt" is the amount to interpolate. 
      // As an example, the following formula calculates the x-axis translation value to apply to the cursor element:
      // this.renderedStyles.tx.previous = lerp(this.renderedStyles.tx.previous, this.renderedStyles.tx.current, this.renderedStyles.tx.amt);
      
      // translation values
      // The lower the amt, the slower the cursor "follows" the user gesture
      tx: {previous: 0, current: 0, amt: 0.15},
      ty: {previous: 0, current: 0, amt: 0.15},
    };
    // Element size and position
    bounds;
  
    /**
     * Constructor.
     */
    constructor(DOM_el) {
      this.DOM.el = DOM_el;
      this.DOM.text = this.DOM.el.querySelector('.cursor__text');
      
      // Hide it initially
      this.DOM.el.style.opacity = 0;
      
      // Calculate size and position
      this.bounds = this.DOM.el.getBoundingClientRect();
  
      for (const key in this.renderedStyles) {
        this.renderedStyles[key].amt = this.DOM.el.dataset.amt || this.renderedStyles[key].amt;
      }
      
      // Show the element and start tracking its position as soon as the user moves the cursor.
      const onMouseMoveEv = () => {
        // Set up the initial values to be the same
        this.renderedStyles.tx.previous = this.renderedStyles.tx.current = cursor.x + 20;
        this.renderedStyles.ty.previous = this.renderedStyles.ty.previous = cursor.y - this.bounds.height/2;
        // Show it
        this.DOM.el.style.opacity = 1;
        // Start rAF loop
        requestAnimationFrame(() => this.render());
        // Remove the initial mousemove event
        window.removeEventListener('mousemove', onMouseMoveEv);
      };
      window.addEventListener('mousemove', onMouseMoveEv);
    }
  
    /**
     * Loop / Interpolation
     */
    render() {
      // New cursor positions
      this.renderedStyles['tx'].current = cursor.x + 20;
      this.renderedStyles['ty'].current = cursor.y - this.bounds.height/2;
      
      // Interpolation
      for (const key in this.renderedStyles ) {
        this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
      }
      
      // Apply interpolated values (smooth effect)
      this.DOM.el.style.transform = `translateX(${(this.renderedStyles['tx'].previous)}px) translateY(${this.renderedStyles['ty'].previous}px)`;
  
      // loop...
      requestAnimationFrame(() => this.render());
    }
  }
  
  /**
   * Linear interpolation
   * @param {Number} a - first value to interpolate
   * @param {Number} b - second value to interpolate 
   * @param {Number} n - amount to interpolate
   */
   const lerp = (a, b, n) => (1 - n) * a + n * b;
  
   /**
    * Gets the cursor position
    * @param {Event} ev - mousemove event
    */
   const getCursorPos = ev => {
       return { 
           x : ev.clientX, 
           y : ev.clientY 
       };
   };
  
  class Slide {
    // DOM elements
    DOM = {
      // main element (.slide)
      el: null,
      // slide inner element (.slide__inner)
      inner: null,
          // slide image element (.slide__img)
          img: null,
          // slide image inner element (.slide__img-inner)
          imgInner: null,
          // slide content element (.slide__content)
          content: null,
          // slide content image (slide__content-img)
          contentImg: null,
          // other content elements besides the image
          contentTexts: null,
    };
    
    /**
     * Constructor.
     * @param {Element} DOM_el - main element (.slide)
     */
    constructor(DOM_el) {
          this.DOM.el = DOM_el;
          this.DOM.inner = this.DOM.el.querySelector('.slide__inner');
          this.DOM.img = this.DOM.el.querySelector('.slide__img');
          this.DOM.imgInner = this.DOM.el.querySelector('.slide__img-inner');
          this.DOM.content = this.DOM.el.querySelector('.slide__content');
          this.DOM.contentImg = this.DOM.content.querySelector('.slide__content-img');
          this.DOM.contentTexts = [...this.DOM.content.children].filter(item => item != this.DOM.contentImg);
    }
  }
  
  
  // Some DOM elements
  const DOM = {
      slides: [...document.querySelectorAll('.slide')],
      cursor: document.querySelector('.cursor'),
      backCtrl: document.querySelector('.frame__back'),
      navigationItems: document.querySelectorAll('.frame__nav > .frame__nav-button'),
  };
  // cursor text chars
  DOM.cursorChars = DOM.cursor.querySelectorAll('.word > .char, .whitespace');
  // backCtrl text chars
  DOM.backChars = DOM.backCtrl.querySelectorAll('.word > .char, .whitespace');
  
  // total number of slides
  const totalSlides = DOM.slides.length;
  
  let slidesArr = [];
  DOM.slides.forEach(slide => {
      slidesArr.push(new Slide(slide));
  });
  
  // current slide position
  let current = -1;
  // check if animation is in progress
  let isAnimating = false;
  
  
  const setCurrentSlide = position => {
      if ( current !== -1 ) {
          slidesArr[current].DOM.el.classList.remove('slide--current');
      }
  
      current = position;
      slidesArr[current].DOM.el.classList.add('slide--current');
  
      DOM.navigationItems[current].classList.add('frame__nav-button--current');
  };
  
  const next = () => {
      const newPosition = current < totalSlides - 1 ? current + 1 : 0;
      navigate(newPosition);
  };
  
  const prev = () => {
      const newPosition = current > 0 ? current - 1 : totalSlides - 1;
      navigate(newPosition);
  };
  
  const navigate = newPosition => {
      isAnimating = true;
      
      // change navigation current class
      DOM.navigationItems[current].classList.remove('frame__nav-button--current');
      DOM.navigationItems[newPosition].classList.add('frame__nav-button--current');
      
      // navigation direction
      const direction = current < newPosition ? current === 0 && newPosition === totalSlides - 1 ? 'prev' : 'next' : current === totalSlides - 1 && newPosition === 0 ? 'next' : 'prev';
      
      const currentSlide = slidesArr[current];
      current = newPosition;
      const upcomingSlide = slidesArr[current];
  
      gsap.timeline({
          defaults: {
              duration: 1.6,
              ease: 'power3.inOut'
          },
          onComplete: () => {
              currentSlide.DOM.el.classList.remove('slide--current');
              // Close the current slide if it was open
              if ( currentSlide.isOpen ) {
                  hideContent(currentSlide);
              }
  
              isAnimating = false;
          }
      })
      .addLabel('start', 0)
  
      .set([currentSlide.DOM.imgInner, upcomingSlide.DOM.imgInner], {
          transformOrigin: direction === 'next' ? '50% 0%' : '50% 100%'
      }, 'start')
  
      // Place coming slide either above (translate -100%) or below (translate 100%) and the slide__inner to the opposite translate.
      .set(upcomingSlide.DOM.el, {
          yPercent: direction === 'next' ? 100 : -100
      }, 'start')
      .set(upcomingSlide.DOM.inner, {
          yPercent: direction === 'next' ? -100 : 100
      }, 'start')
      
      // Add current class
      .add(() => {
          upcomingSlide.DOM.el.classList.add('slide--current');
      }, 'start')
  
      // hide the back button and show back the cursor text if the current slide was open
      .add(() => {
          if ( currentSlide.isOpen ) {
              toggleCursorBackTexts();
          }
      }, 'start')
      
      // Current slide moves either up or down (translate 100% or -100%)
      .to(currentSlide.DOM.el, {
          yPercent: direction === 'next' ? -100 : 100
      }, 'start')
      .to(currentSlide.DOM.imgInner, {
          scaleY: 1.25
      }, 'start')
      // Upcoming slide translates to 0
      .to([upcomingSlide.DOM.el, upcomingSlide.DOM.inner], {
          yPercent: 0
      }, 'start')
      .to(upcomingSlide.DOM.imgInner, {
          ease: 'power2.inOut',
          startAt: {scaleY: 1.25},
          scaleY: 1
      }, 'start')
  };
  
  const toggleCursorBackTexts = isContent => {
      return gsap.timeline({
          onStart: () => {
              gsap.set(DOM.backChars, {opacity: isContent ? 0 : 1});
              if ( isContent ) {
                  DOM.backCtrl.classList.add('frame__back--show');
              }
          },
          onComplete: () => {
              DOM.backCtrl.classList[isContent ? 'add' : 'remove']('frame__back--show');
              if ( !isContent ) {
                  DOM.backCtrl.classList.remove('frame__back--show');
              }
          }
      })
      .to(DOM.cursorChars, {
          duration: 0.1,
          ease: 'expo',
          opacity: isContent ? 0 : 1,
          stagger: {
              amount: 0.5,
              grid: 'auto',
              from: 'random'
          }
      })
      .to(DOM.backChars, {
          duration: 0.1,
          ease: 'expo',
          opacity: isContent ? 1 : 0,
          stagger: {
              amount: 0.5,
              grid: 'auto',
              from: 'random'
          }
      }, 0);
  };
  
  const showContent = position => {
      if ( isAnimating ) return;
      isAnimating = true;
  
      const slide = slidesArr[position];
  
      slide.isOpen = true;
  
      gsap.timeline({
          defaults: {
              duration: 1.6,
              ease: 'power3.inOut'
          },
          onStart: () => {
              
          },
          onComplete: () => {
              isAnimating = false;
          }
      })
      .addLabel('start', 0)
      .add(() => {
          toggleCursorBackTexts('content');
      }, 'start')
      .to(slide.DOM.img, {
          yPercent: -100
      }, 'start')
      .set(slide.DOM.imgInner, {
          transformOrigin: '50% 100%'
      }, 'start')
      .to(slide.DOM.imgInner, {
          yPercent: 100,
          scaleY: 2
      }, 'start')
      .to(slide.DOM.contentImg, {
          startAt: {
              transformOrigin: '50% 0%',
              scaleY: 1.5
          },
          scaleY: 1
      }, 'start')
  };
  
  const hideContent = (slide, animate = false) => {
      // reset values
      isAnimating = true;
  
      const complete = () => {
          slide.isOpen = false;
          isAnimating = false;
      };
  
      if ( animate ) {
          gsap.timeline({
              defaults: {
                  duration: 1.6,
                  ease: 'power3.inOut'
              },
              onComplete: complete
          })
          .addLabel('start', 0)
          .to(slide.DOM.img, {
              yPercent: 0
          }, 'start')
          .to(slide.DOM.imgInner, {
              yPercent: 0,
              scaleY: 1
          }, 'start');
      }
      else {
          gsap.set(slide.DOM.img, {
              yPercent: 0
          });
          gsap.set(slide.DOM.imgInner, {
              yPercent: 0,
              scaleY: 1
          });
          complete();
      }
  };
  
  const initEvents = () => {
      // Links navigation
      [...DOM.navigationItems].forEach((item, position) => {
          item.addEventListener('click', () => {
              if ( current === position || isAnimating ) return;
              navigate(position);
          });
      });
  
      // Back click
      DOM.backCtrl.addEventListener('click', () => {
          if ( isAnimating ) return;
          isAnimating = true;
          toggleCursorBackTexts();
          hideContent(slidesArr[current], true);
      });
  
      // Initialize the GSAP Observer plugin
      Observer.create({
          type: 'wheel,touch,pointer',
          onDown: () => !isAnimating && prev(),
          onUp: () => !isAnimating && next(),
          // invert the mouse wheel delta
          wheelSpeed: -1,
          tolerance: 10
      });
  
      for (const [position, slide] of slidesArr.entries()) {
          slide.DOM.img.addEventListener('click', () => {
              showContent(position);
          });
      }
  };
  
  // Set current slide
  setCurrentSlide(0);
  
  // Initialize custom cursor
  new CursorText(DOM.cursor);
  
  // Initialize the events
  initEvents();
  
  // Preload images and initialize scrolling animations
  
    document.body.classList.remove('loading');

}


function initLogotypesPageAnim() {

  gsap.registerPlugin(Flip);

  const items = gsap.utils.toArray(".item"),
  details = document.querySelector('.detail'),
  detailContent = document.querySelector('.content'),
  detailImage = document.querySelector('.detail img'),
  detailTitle = document.querySelector('.detail .title'),
  detailSecondary = document.querySelector('.detail .secondary'),
  detailDescription = document.querySelector('.detail .description');

let activeItem; // keeps track of which item is open (details)

gsap.set(detailContent, { yPercent: -100 }); // close the details "drawer" (content) initially

function showDetails(item) {
if (activeItem) { // someone could click on an element behind the open details panel in which case we should just close it.
return hideDetails();
}
let onLoad = () => {

// position the details on top of the item (scaled down)
Flip.fit(details, item, {scale: true, fitChild: detailImage});

// record the state
const state = Flip.getState(details);

// set the final state
gsap.set(details, {clearProps: true}); // wipe out all inline stuff so it's in the native state (not scaled)
gsap.set(details, {xPercent: -50, top: "50%", yPercent: -50, visibility: "visible", overflow: "hidden"});

Flip.from(state, {
  duration: 0.5,
  ease: "power2.inOut",
  scale: true,
  onComplete: () => gsap.set(details, {overflow: "auto"}) // to permit scrolling if necessary
})
  // Flip.from() returns a timeline, so add a tween to reveal the detail content. That way, if the flip gets interrupted and forced to completion & killed, this does too.
  .to(detailContent, {yPercent: 0}, 0.2);

detailImage.removeEventListener("load", onLoad);
document.addEventListener('click', hideDetails);
};

// Change image and text
const data = item.dataset;
detailImage.addEventListener("load", onLoad);
detailImage.src = item.querySelector('img').src;
detailTitle.innerText = data.title;
detailSecondary.innerText = data.secondary;
detailDescription.innerText = data.text;

// stagger-fade the items out from the one that was selected in a staggered way (and kill the tween of the selected item)
gsap.to(items, {opacity: 0.3, stagger: { amount: 0.7, from: items.indexOf(item), grid: "auto"}}).kill(item);
gsap.to(".app", {backgroundColor: "#888", duration: 1, delay: 0.3}); // fade out the background
activeItem = item;
}

function hideDetails() {
document.removeEventListener('click', hideDetails);
gsap.set(details, {overflow: "hidden"});

// record the current state of details
const state = Flip.getState(details);

// scale details down so that its detailImage fits exactly on top of activeItem
Flip.fit(details, activeItem, {scale: true, fitChild: detailImage});

// animate the other elements, like all fade all items back up to full opacity, slide the detailContent away, and tween the background color to white.
const tl = gsap.timeline();
tl.set(details, {overflow: "hidden"})
.to(detailContent, {yPercent: -100})
.to(items, {opacity: 1, stagger: {amount: 0.7, from: items.indexOf(activeItem), grid: "auto"}})
.to(".app", {backgroundColor: "#fff"}, "<");

// animate from the original state to the current one.
Flip.from(state, {
scale: true,
duration: 0.5,
delay: 0.2, // 0.2 seconds because we want the details to slide up first, then flip.
onInterrupt: () => tl.kill()
})
.set(details, {visibility: "hidden"});

activeItem = null;
}

// Add click listeners
gsap.utils.toArray('.item').forEach(item => item.addEventListener('click', () => showDetails(item)));

// Intro animation
window.addEventListener('load', () => {
gsap.to('.app', { autoAlpha: 1, duration: 0.2 });
gsap.from('.item', {autoAlpha: 0, yPercent: 30, stagger: 0.04});
});



}

function initAboutMePageAnim() {

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
  
  ScrollTrigger.refresh()
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

  function initCopywritingPageAnim() {

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
    
    ScrollTrigger.refresh()
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
    
    };
  
  

