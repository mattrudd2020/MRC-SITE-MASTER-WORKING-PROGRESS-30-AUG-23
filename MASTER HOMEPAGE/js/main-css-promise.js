



// import * as THREE from "https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/build/three.module"
// import { SVGRenderer } from "https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/jsm/renderers/SVGRenderer.js";
// import { OBJLoader } from "https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/jsm/loaders/OBJLoader.js";

import * as THREE from "three";
import { SVGRenderer} from "three/addons/renderers/SVGRenderer.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
//

// function loadCSS(url) {
//   return new Promise((resolve, reject) => {
//     var cssId = 'myCSS';
//     if (!document.getElementById(cssId)) {
//       var head = document.getElementsByTagName('head')[0];
//       var link = document.createElement('link');
//       link.id = cssId;
//       link.rel = 'stylesheet';
//       link.type = 'text/css';
//       link.href = url;
//       link.media = 'all';
//       link.onload = resolve; // Resolve the Promise when CSS is loaded
//       link.onerror = reject; // Reject the Promise if an error occurs
//       head.appendChild(link);
//     } else {
//       resolve(); // CSS is already loaded, resolve immediately
//     }
//   });
// }

// function removeCSS(cssId) {
//   var cssElement = document.getElementById(cssId);
//   if (cssElement) {
//     cssElement.parentNode.removeChild(cssElement);
//   }
// }

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

// function loaderAway () {

//   let clips = gsap.utils.toArray(".clip"),
//       shape = document.querySelector(".shape");
  
//   let loader1 = gsap.timeline({
//     // repeat:7, yoyo:true, repeatDelay:1,
//     onUpdate: () => {
//       clips.forEach(el => {
//         el.style.clipPath = "none";
//         el.style.clipPath = "url(#clippath)";
//       })
//     }
//   });
  
//   loader1.to(".shape", {
//     attr: {d:"M 0 0.5 Q 0.5 0 1 0.5 L 1 0 L 0 0 L 0 1"},
//     duration: 1, ease:'power2.in'
//   })
//   .to(".shape", {
//     attr: {d:"M 0 0 Q 0.5 0 1 0 L 1 0 L 0 0 L 0 1"},
//     duration: 0.5, ease:'power2.out'
//   })
  
//   }
  
  
  //////
  
  
  // var imgLoad = imagesLoaded('.images-loaded');
  
  // var count = $(".c-preloader__count"),
  //     images = $(".content img").length,
  //     loadedCount = 0,
  //     loadingProgress = 0,
  //     tlProgress = new gsap.timeline();
   
  // imgLoad.on( 'progress', function( instance, image ) {
  //     loadProgress();
  // });
  
  // imgLoad.on( 'always', function( instance ) {
  //   console.log('ALWAYS - all images have been loaded');
  // });
   
  // function loadProgress(imgLoad, image) {
  
  //     loadedCount++;
    
  //     loadingProgress = (loadedCount/images);
  //     console.log(loadingProgress);
  
  //     gsap.to(tlProgress, 3,{progress:loadingProgress});
  // }
  
  // var tlProgress = gsap.timeline({
  //     paused: true,
  //     onUpdate: countPercent,
  //     onComplete: loadComplete
  // });
  
  // let customEase = "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1"
  
  // tlProgress
  //    .fromTo(".loader_elements", 
  //   {"--mywidth": "0%"}, {"--mywidth": "100%", duration: 3, repeat: 0, ease: CustomEase.create(
  //         "custom", customEase)
  //             });
   
  
  // function countPercent() {
  //       var newPercent = (tlProgress.progress()*100).toFixed();
  //       count.text(newPercent + "%");
  // }
  

  // function loadComplete() {
  //   var tlEnd = new gsap.timeline();
  //   tlEnd
  //         .to(".section-46", 1, {autoAlpha:0},"+=2")
  //       .to(".loader_container", 1, {autoAlpha:0},">-1")
  //       .to(count, 1, {autoAlpha:0},"<")
  //       // .to(".loader_full_section", 0.5, {scaleX:0, transformOrigin: "center right"});
  //       // .add(loaderAway(), "+=10")
  //       .from(".text-container", {
  //         opacity: 0,
  //         duration: 1.5,
  //         ease: "power4",
  //         });
  // }


/// NEW CURSOR JS

// make follower follow - implified with quickTo
gsap.set(".follower", {xPercent: -50, yPercent: -50});

let xTo = gsap.quickTo(".follower", "x", {duration: 0.6, ease: "power2"}),
    yTo = gsap.quickTo(".follower", "y", {duration: 0.6, ease: "power2"});

window.addEventListener("mousemove", e => {
  xTo(e.clientX);
  yTo(e.clientY);
});


var cursor = $('#cursor');


//animate when passing over relevant objects
var followerText = document.querySelector('.follower__content');
let followerAnim = gsap.timeline({paused: true, overwrite: 'auto'});


followerAnim.to('.follower__inner', {
  backgroundColor: '#1a1a1a',
},"<+=.1.5");

followerAnim.to('.follower__inner', {
  height:"110px", 
  width:"110px",
  duration: .4,
  ease: "power2.inOut"
}, 0);

followerAnim.to('.follower__content', {
  height: "32px",
},"<+=.3");

document.querySelectorAll('.followerchangetest').forEach(item => {
  item.addEventListener('mouseenter', (event) => {
    var text = item.dataset.followerText;
    if (text == 0) {
      // followerAnim.set('.follower__inner',{backgroundColor:'#f4f4f4', duration:0});
      text = "";
    }
    followerText.innerHTML = text;
    animateFollower('in');
  });

  item.addEventListener('mouseleave', (event) => {
    animateFollower('out');
  });
});

function animateFollower(direction = 'in') {
  if (direction == 'in') {
    followerAnim.play().timeScale(1);
  } else {
    followerAnim.timeScale(-2);
  }
}


const slidePointerOff = document.querySelectorAll(".slide");
const elements = document.querySelectorAll('[data-no-cursor-info]');

elements.forEach(element => {
  element.addEventListener('mouseleave', () => {
    // Run your function here
    followerAnim.timeScale(-2);
  });
});

// function resetCursor() {
//   slidePointerOff.forEach(item => {
//     item.classList.remove('followerchangetest');
//   });
//   console.log('cursor reset!');
// }

// const button = document.querySelector('#resetCursor');

// button.addEventListener('click', () => {
//   slidePointerOff.forEach(item => {
//     item.classList.add('followerchangetest');
//   });
// });
  

$('[class*=cursor]').on({
    mouseover: function(){
     
        if($(this).hasClass('cursor-color'))
        {
            cursor.addClass('color');
        }
    },


    mouseout: function(){
        if($(this).hasClass('cursor-color'))
        {
            cursor.removeClass('color');
        }
    }
})

$('[class*=cursor]').on({
  mouseover: function(){
   
      if($(this).hasClass('cursor-transparent'))
      {
          cursor.addClass('cursor_no-colour');
      }
  },


  mouseout: function(){
      if($(this).hasClass('cursor-transparent'))
      {
          cursor.removeClass('cursor_no-colour');
      }
  }
})

/// END NEW CURSOR JS


// Loader swipe animation setup

// function removejscssfile(filename, filetype){
  
//   var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
//   var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
//   var allsuspects=document.getElementsByTagName(targetelement)
//   for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
//   if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
//       allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
//   }
// }

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const scroller = document.querySelector("#smooth-content");

const smoother = ScrollSmoother.create({
  el: scroller,
  smooth: 2,
  effects: true,
  speed: 0.85,
  // normalizeScroll: true,
  smoothTouch: 0.1
});


///// MAIN MENU CODE! ////

// frame element
const frame = document.querySelector('.home-menu_main');

// overlay (SVG path element)
const overlayPath = document.querySelectorAll('.overlay__path');

// menu (wrap) element
const menuWrap = document.querySelector('.home-menu-wrap');

// menu items
const menuItems = menuWrap.querySelectorAll('.home-menu__item');

// open menu button
const openMenuCtrl = document.querySelector('button.button-menu');

// close menu button
const closeMenuCtrl = menuWrap.querySelector('.button-close');

// menu button container
const openMenuShift = frame.querySelector('.home-frame__button');

// big title elements
const title = {
    main: document.querySelector('.content__title-main'),
    sub: document.querySelector('.content__title-sub')
};

let isAnimating = false;

// opens the menu
const openMenu = ()  => {

   function addClass(){document.body.classList.add('disable-scroll');}
    
   function addClass2(){openMenuShift.classList.add('add-padding');}
    
    if ( isAnimating ) return;
    isAnimating = true;
    gsap.timeline({ 
            onComplete: () => isAnimating = false
        })

        .call(addClass)

        .call(addClass2)

        .set("#clipReveal",{
            opacity: "100%"
        })

        .set(overlayPath, {
            attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' }
        })
        .to(overlayPath, { 
            duration: 0.8,
            ease: 'power4.in',
            attr: { d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z' }
        }, 0)
        .to(overlayPath, { 
            duration: 0.3,
            ease: 'power2',
            attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' },
            onComplete: () => {
                frame.classList.add('frame--menu-open');
                menuWrap.classList.add('menu-wrap--open');
            }
        })
        // title elements
        // .to([title.main, title.sub], { 
        //     duration: 0.8,
        //     ease: 'power3.in',
        //     y: -200,
        //     stagger: 0.05
        // }, 0.2)

        // now reveal
        .set(menuItems, { 
            opacity: 0
        })
        .set(overlayPath, { 
            attr: { d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' }
        })
        .to(overlayPath, { 
            duration: 0.3,
            ease: 'power2.in',
            attr: { d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z' }
        })
        .to(overlayPath, { 
            duration: 0.8,
            ease: 'power4',
            attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
        })
        // menu items translate animation
        .to(menuItems, { 
            duration: 1.1,
            ease: 'power4',
            startAt: {y: 150},
            y: 0,
            opacity: 1,
            stagger: 0.05
        }, '>-=1.1');

}

// closes the menu
const closeMenu = ()  => {
    
    if ( isAnimating ) return;
    isAnimating = true;
    gsap.timeline({
            onComplete: () => isAnimating = false 
        })
        .set(overlayPath, {
            attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
        })
        .to(overlayPath, { 
            duration: 0.8,
            ease: 'power4.in',
            attr: { d: 'M 0 0 V 50 Q 50 100 100 50 V 0 z' }
        }, 0)
        .to(overlayPath, { 
            duration: 0.3,
            ease: 'power2',
            attr: { d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' },
            onComplete: () => {
                frame.classList.remove('frame--menu-open');
                menuWrap.classList.remove('menu-wrap--open');
                document.body.classList.remove('disable-scroll');
                openMenuShift.classList.remove('add-padding');
            }
        })
        // now reveal
        .set(overlayPath, { 
            attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' }
        })
        .to(overlayPath, { 
            duration: 0.3,
            ease: 'power2.in',
            attr: { d: 'M 0 100 V 50 Q 50 100 100 50 V 100 z' }
        })
        .to(overlayPath, { 
            duration: 0.8,
            ease: 'power4',
            attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' }
        })
        // title elements
        // .to([title.main, title.sub], { 
        //     duration: 1.1,
        //     ease: 'power4',
        //     y: 0,
        //     stagger: -0.05
        // }, '>-=1.1')
        // menu items translate animation
        .to(menuItems, { 
            duration: 0.8,
            ease: 'power2.in',
            y: 100,
            opacity: 0,
            stagger: -0.05
        }, 0)

}


// click on menu button
openMenuCtrl.addEventListener('click', openMenu);
// click on close menu button
closeMenuCtrl.addEventListener('click', closeMenu);



///// END MAIN MENU CODE //////


function init() {

    // const animPageLeave = function () {
    
      
    
    //   return gsap.to("main", {
    //     duration: 1.5,
    //     opacity: 0,
    //     ease: "power2.inOut",
    //   });
    // };
    
    // window.scrollTo(0, 0);

  //   const animPageEnter = function () {
  //     return gsap.from("main", {
  //       duration: 2,
  //       opacity: 0,
  //       ease: "power2.inOut",
  //     }) ;
  // }
    



  const animPageEnter = (container) => {
//     const titleSplit = new SplitText(".title-split", {
//       type: "lines",
//       linesClass: "split-title"
//     });

    const tl = gsap.timeline();
      tl.from(container, { autoAlpha: 0, duration: 1, clearProps: 'all', ease: 'none' });
      
// /// TITLE SPLIT ///

//       tl.fromTo(titleSplit.lines, {
//           yPercent: 100,
//           autoAlpha: 0.01
//         }, {
//           autoAlpha: 0.999,
//           yPercent: 0,
//           duration: 1.2,
//           stagger: 0.1,
//           ease: 'cubic'
//         });
// ///
//       return tl; 
}

/// END OF BARBA ENTER SEQUENCE

window.addEventListener('popstate', function(e) {
  e.preventDefault();
}, false);

  const animPageLeave = (container, done) => {
    return gsap.to(container, { autoAlpha: 0, duration: 1, clearProps: 'all', ease: 'none'});
  }



  //barba.js setup!

  // do something before the transition starts
  //barba.hooks.before(() => {
  //...
  //});

  // kill old ScrollTriggers
  // barba.hooks.leave(() => {
  //   /*scrollX = barba.history.current.scroll.x;
  //   scrollY = barba.history.current.scroll.y; */
  //   console.log("Leave!!!");
  // });

  barba.hooks.before((data) => {
    console.log("Before Enter Page Scroll to top!!!");
    // window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  });

  
  
  barba.hooks.afterLeave(() => {
    let triggers = ScrollTrigger.getAll();
    triggers.forEach(function (trigger) {
      trigger.kill();
    });
    console.log("STs KILLED");

    // removejscssfile("gallery.css", "css");
    // console.log("GALLERY CSS REMOVED!");

    // removejscssfile("logotypes.css", "css");
    // console.log("LOGOTYPES CSS REMOVED!");

    // removejscssfile("videography.css", "css");
    // console.log("VIDEOGRAPHY CSS REMOVED!");

    // removejscssfile("creative-direction.css", "css");
    // console.log("CREATIVE DIRECTION CSS REMOVED!");

    // removejscssfile("rdb.css", "css");
    // console.log("RDB CSS REMOVED!");
    

  });
    

  // if (history.scrollRestoration) {
  //   history.scrollRestoration = 'manual';
  // }




history.scrollRestoration = "manual";
var scrollPosY = [0];

barba.hooks.enter((data) => {
  if(data.trigger !== "back") {
    // scrollPosY.push(barba.history.current.scroll.y);
  }
});

barba.hooks.after((data) => {
  if(data.trigger !== "back") {
    window.scrollTo(0,0);
  } else {
    window.scrollTo(0, scrollPosY.pop())
  }
});




// barba.hooks.afterEnter((data) => {
//   animFadeIn(data.next.container);
// });



barba.init({
  timeout: 5000,
    views: [
      {
        namespace: "index",
        beforeEnter() {
          // window.scrollTo(0, 0); // Scroll to top before entering the page
          initIndexAnims();
          window.scrollTo(0, 0);
          console.log("INDEX VIEW WORKING");
        }
      },
      {
        namespace: "sealskinz",
        beforeEnter() {
          initSealskinzAnims();
          window.scrollTo(0, 0);
          console.log("SEALSKINZ VIEW WORKING");
        }
      },
      {
        namespace: "creative-direction",
        beforeEnter() {
            initCreativeDirectionAnims();
            window.scrollTo(0, 0);
          console.log("CREATIVE DIRECTION VIEW WORKING");
        }
      },
      {
        namespace: "content-strategy",
        beforeEnter() {
          initContentStrategyAnims();
          window.scrollTo(0, 0);
          console.log("CONTENT STRATEGY VIEW WORKING");
        }
      },
      {
        namespace: "graphic-design",
        beforeEnter() {
          initGraphicDesignAnims();
          window.scrollTo(0, 0);
          console.log("FULLSCREEN GALLERY VIEW WORKING");
        }
      },
      {
      namespace: "gallery",
      beforeEnter() {
        initFullScreenGalleryAnims();
        window.scrollTo(0, 0);
        console.log("FULLSCREEN GALLERY VIEW WORKING");
      }
    },
    {
      namespace: "logotypes",
      beforeEnter() {
        initLogotypesPageAnim();
        window.scrollTo(0, 0);
        console.log("LOGOTYPES VIEW WORKING");
      }
    },
    {
      namespace: "about-me",
      beforeEnter() {
        initAboutMePageAnim();
        window.scrollTo(0, 0);
        console.log("ABOUT ME VIEW WORKING");
        
      }
    },
    {
      namespace: "copywriting",
      beforeEnter() {
        initCopywritingPageAnim();
        window.scrollTo(0, 0);
        console.log("ABOUT ME VIEW WORKING");
      }
    },
    {
      namespace: "british-cycling",
      beforeEnter() {
        initBritishCyclingAnims();
        window.scrollTo(0, 0);
        console.log("BRITISH CYCLING WORKING");
      }
    },
    {
      namespace: "videography",
      beforeEnter() {
        initVideographyPageAnim();
        window.scrollTo(0, 0);
        console.log("VIDEOGRAPHY WORKING");
      }
    },
    {
      namespace: "hoverscroll",
      beforeEnter() {
        console.log("HOVER here ok?");
        initHoverTestAnim();
        window.scrollTo(0, 0);
        console.log("HOVER NEW WORKING");
      }
    },
    {
      namespace: "brand-development",
      beforeEnter() {
        initBrandDevelopmentAnims();
        window.scrollTo(0, 0);
        console.log("VIDEOGRAPHY WORKING");
      }
    },
    {
      namespace: "web-design",
      beforeEnter() {
        initWebDesign();
        window.scrollTo(0, 0);
        console.log("WEB DESIGN VIEW WORKING");
      }
    },
    {
      namespace: "ICAT",
      beforeEnter() {
        initIcatPageAnim();
        window.scrollTo(0, 0);
        console.log("ICAT VIEW WORKING");
      }
    },
    {
      namespace: "logofolio",
      beforeEnter() {
        initLogofolioPageAnim();
        window.scrollTo(0, 0);
        console.log("LOGOFOLIO VIEW WORKING");
      }
    },
    {
    namespace: "research-design-build",
    beforeEnter() {
      initRDBPageAnim();
      window.scrollTo(0, 0);
      console.log("R-D-B VIEW WORKING");
    }
  }
         ],

    transitions: [
      {
        once({next}){
          animPageEnter(next.container);
          console.log("ONCE TRANSITION FIRED");
        },
        leave: ({current}) => animPageLeave(current.container),
        enter({next}){
          console.log("ENTERING");
          animPageEnter(next.container);
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


//// LOADER CODE END ////


  // async function myFunction() {
  //   let myModule;
  
  //   // Load the module conditionally
  //   if (shouldLoadModule()) {
  //     myModule = await import('https://cdn.skypack.dev/three@0.136.0');
  //   }

    
  
  //   // Use myModule in your code if it's defined
  //   if (myModule) {
  //     // Do something with myModule
  //     console.log(myModule.someExport);
  //   } else {
  //     console.log('myModule was not loaded');
  //   }
  // }


  //// SCHEDULE BUTTON CODE ////

  let span = document.querySelectorAll(".hover-text span");
let buttonContainer = document.querySelector(".schedule_hover-container");
let scheduleButton = document.querySelector(".schedule_button");

gsap.to(buttonContainer,{
  opacity: 1,
  duration: 2.5,
  ease: "power2.inOut",
})

// create a GSAP animation with the new text and vertical movements
let hover = gsap.timeline({ paused:true })

hover.to(span, {
  duration: 1,
  y: -70, // move up by 50 pixels
  // scaleY: 2, // scale by 2 along the y-axis
  ease: "power2.inOut",
});

hover.to(scheduleButton, {
  duration: 1,
  scale: 1.1,
  ease: "power2.inOut"
},"<")

// add event listeners for mouse enter and leave
buttonContainer.addEventListener("mouseenter", () => hover.play(0.3)); // add delay
buttonContainer.addEventListener("mouseleave", () => hover.reverse(0.5)); // add delay and reduce duration


  // Lottie sticker in footer cursor sync //

LottieInteractivity.create({
  player: '#mrc-sticker',
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
    speed: 0.85,
    // normalizeScroll: true,
    smoothTouch: 0.1
  });
 console.log("ST/SM INITIALISED");
  //// END SCROLLTRIGGER/SMOOTHER SETUP


// //// EXIT ////

// $('plyr__video-wrapper').hover(
//   function () {
//     gsap.to(
//       cursorVideo,
//       {
//         opacity: 0
//       })  
//     // the element is hovered over... do stuff

//   }, 
//   function () {
//     gsap.to(
//       cursorVideoExit,
//       {
//         opacity: 0
//       })    
//     // the element is no longer hovered... do stuff
//   }
// );


//// TOP TEXT FADE-IN ////

// gsap.from(".text-container", {
//   opacity: 0,
//   duration: 15.5,
//   ease: "power4",
// });


//// END TOP-TEXT FADE-IN ////


  //// TOP PANEL TEXT SWITCH/FADE SETUP
  
  let panels = gsap.utils.toArray(".panel");

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".text-container",
      start: "top top",
      end: "+=475%",
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

  tl.to(".scroll-text-container, .panel-one-bottom-container, .scroll-arrow-lottie-container", {
    opacity: 0
  },"<0.25");
  
  tl.to("#para-text", { opacity: 0 }, "<1");
  
  gsap.set(".panel", { zIndex: (i, target, targets) => targets.length - i });

  tl.to(".panel.second", {
    background: "#000",
    duration: 1,
    ease: "power2.out"
  })
  
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
    trigger: ".stage",
    // start:document.documentElement.clientHeight * 0.2,
    // end: "top+=600",
    start: "85% top-=1100",
    // end: "bottom top",
    toggleActions:"play none none reverse",
    animation:tl2,
    markers: { startColor: "teal", endColor: "coral", indent: "600px" },
    onComplete: () => ScrollTrigger.refresh()
  })

// ScrollTrigger.refresh();
  
  console.log('GOT TO HERE? SLICE2!');

  
  //// END TOP PANEL TEXT SWITCH/FADE SETUP

//// START GRID-ZOOM BLOCK  ////


// Function to trigger Flip animations when scrolling
const triggerFlipOnScroll = (galleryEl, options) => {
	// Default settings for Flip and ScrollTrigger
	let settings = {
		flip: {
			absoluteOnLeave: false,
			absolute: false,
			scale: true,
			simple: true,
			//...
		},
		scrollTrigger: {
			start: 'center center',
			end: '+=300%',
		},
		stagger: 0
	};

	// Merge default settings with options provided when calling the function
	settings = Object.assign({}, settings, options);
	
	// Select elements within the gallery that will be animated
	const galleryCaption = galleryEl.querySelector('.zoom-caption');
	const galleryItems = galleryEl.querySelectorAll('.gallery__item');
	const galleryItemsInner = [...galleryItems].map(item => item.children.length > 0 ? [...item.children] : []).flat();
	
	// Temporarily add the final class to capture the final state
	galleryEl.classList.add('gallery--switch');
	const flipstate = Flip.getState([galleryItems, galleryCaption], {props: 'filter, opacity'});

	// Remove the final class to revert to the initial state
	galleryEl.classList.remove('gallery--switch');
	
	// Create the Flip animation timeline
	const tl = Flip.to(flipstate, {
		ease: 'none',
		absoluteOnLeave: settings.flip.absoluteOnLeave,
		absolute: settings.flip.absolute,
		scale: settings.flip.scale,
		simple: settings.flip.simple,
		scrollTrigger: {
			trigger: galleryEl,
			start: settings.scrollTrigger.start,
			end: settings.scrollTrigger.end,
			pin: galleryEl.parentNode,
			anticipatePin: true,
			scrub: true,
		},
		stagger: settings.stagger
	});

	// If there are inner elements in the gallery items, animate them too
	if ( galleryItemsInner.length ) {
		tl.fromTo(galleryItemsInner, {
			scale: 1.75
		}, {
			scale: 1.1,
			scrollTrigger: {
				trigger: galleryEl,
				start: settings.scrollTrigger.start,
				end: settings.scrollTrigger.end,
				scrub: true,
			},
		}, 0)
	}
};

// Function to apply scroll-triggered animations to various galleries
// Apply scroll-triggered animations to each gallery with specific settings
const scroll = () => {
	// Define the gallery IDs and their options
    const galleries = [
        { id: '#gallery-2' },
    ];

    // Loop through the galleries and apply the scroll-triggered animations
    galleries.forEach(gallery => {
        const galleryElement = document.querySelector(gallery.id);
        triggerFlipOnScroll(galleryElement, gallery.options);
    });
}

	scroll();

//// END GRID-ZOOM BLOCK  ////




//// START TICKER SECTION ////

let setupTicker = (function() {
  $("#homepage-services .homepage-container-fluid span").wrapAll("<span class='homepage-ticker-wrapper'>");

  var tickerWidth = $(".homepage-ticker-wrapper").width(),
      spanWidth = $(".homepage-ticker-wrapper span").width(),
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
                pinnedContainer: ".homepage-ticker-container",
                  trigger: "#homepage-services",
                  start: "top bottom",
                  end: "bottom top",
                  toggleActions:"play pause resume pause",
                  markers: { startColor: "pink", endColor: "teal", indent: "700px" },
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


  $(".homepage-ticker-wrapper span").clone().appendTo(".homepage-ticker-wrapper");

  tl.to(".homepage-ticker-wrapper", { // loop
      rotation: 0.01,
      force3D: true,
      xPercent: -50,
      ease: "none",
      duration: spanWidth / speed
  });
}());

let setupTicker2 = (function() {
  $("#homepage-services2 .homepage-container-fluid2 span").wrapAll("<span class='homepage-ticker-wrapper2'>");

  var tickerWidth = $(".homepage-ticker-wrapper2").width(),
      spanWidth = $(".homepage-ticker-wrapper2 span").width(),
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
                pinnedContainer: ".homepage-ticker-container",
                  trigger: "#homepage-services2",
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


  $(".homepage-ticker-wrapper2 span").clone().appendTo(".homepage-ticker-wrapper2");

  tl.to(".homepage-ticker-wrapper2", { // loop
      rotation: 0.01,
      force3D: true,
      xPercent: -50,
      reversed: true,
      ease: "none",
      duration: spanWidth / speed
  });
}());

let setupTicker3 = (function() {
  $("#homepage-services3 .homepage-container-fluid3 span").wrapAll("<span class='homepage-ticker-wrapper3'>");

  var tickerWidth = $(".homepage-ticker-wrapper3").width(),
      spanWidth = $(".homepage-ticker-wrapper3 span").width(),
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
                  pinnedContainer: ".homepage-ticker-container",
                  trigger: "#homepage-services3",
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


  $(".homepage-ticker-wrapper3 span").clone().appendTo(".homepage-ticker-wrapper3");

  tl.to(".homepage-ticker-wrapper3", { // loop
      rotation: 0.01,
      force3D: true,
      xPercent: -50,
      ease: "none",
      duration: spanWidth / speed
  });
}());



//// END TICKER SECTION ////


//// START NOISE/MUSIC SECTION ////

gsap.registerPlugin(MorphSVGPlugin, ScrollTrigger)

const colors = ["#46a4cc", "#50a39e", "#a63e4b", "#e3aa59", "#a63ba0"];

const words = ['Story takes', 'and makes'];
const textClass = '.typewriter-text';


const tlMusic = gsap.timeline({
  scrollTrigger: {
   trigger: ".noise_container",
    pin: ".noise_container",
    pinSpacing: true,
    start: "top top",
    end: "bottom top-=300",
    markers: true,
    anticipatePin: 1
//     onUpdate() {
//             const noiseSvg = noiseSvg = document.querySelector(".noise_svg");
// noiseSvg.current.style.clipPath = "none";

//   // force the browser to recalculate the element
//   noiseSvg.current.offsetWidth;

//   noiseSvg.current.style.clipPath = "url(#endPaths)";
// }
  }
})

 tlMusic.fromTo('.music_noise-cursor', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, repeat: -1, ease: SteppedEase.config(1) });

tlMusic.to(textClass, { text: 'Story takes', opacity: 1, duration: 0.75, repeat:1, repeatDelay: 1.5, ease: SteppedEase.config(15), yoyo:true });

tlMusic.to("#vid-fade", {
  autoAlpha: 1,
  duration: 1
}, ">-2")

tlMusic.to(textClass, { text: 'and makes', opacity: 1, duration: 0.75 }, ">1.5");

  tlMusic.to("#start0", {
    duration: 2,
    morphSVG:"m122.23,40.44h12.88l8.69,16.09,8.69-16.09h12.88v28.16h-10.46v-13.4l-7.68,13.4h-6.84l-7.69-13.4v13.4h-10.46v-28.16Z",
    ease: "power3.inOut"
  },">-0.75");

  tlMusic.to("#start1", {
    duration: 2,
    morphSVG:"m185.48,69.01c-12.35,0-17.7-4.75-17.7-14.52s0-14.05,0-14.05h10.46s0,11.11,0,14.05,1.09,5.67,7.24,5.67c6.16,0,7.24-2.69,7.24-5.67v-14.05h10.46v14.05c0,9.78-5.35,14.52-17.7,14.52Z",
    ease: "power3.inOut"
  },"<");

  tlMusic.to("#start2", {
    duration: 2,
    morphSVG:"m215.66,58.67c0,1.37,1.29,2.29,7.93,2.29,6.2,0,7.12-.4,7.12-1.45,0-1.21-.93-1.37-7.52-1.57-12.71-.4-17.58-2.49-17.58-9.05,0-6.2,6.08-8.85,17.18-8.85s17.18,2.66,17.18,9.86h-10.46c0-1.49-2.41-1.81-7.52-1.81s-5.91.24-5.91,1.33,1.01,1.05,7.12,1.29c11.11.44,17.99,1.21,17.99,8.57,0,7.77-6.44,9.74-17.99,9.74s-17.99-1.97-17.99-10.34h10.46Z",
    ease: "power3.inOut"
  },"<");

  tlMusic.to("#start3", {
    duration: 2,
    morphSVG: "m253.64,68.61h-10.46v-28.16h10.46v28.16Z",
    // fill: colors[i],
    // yoyo: true,
    // repeat: -1,
    // repeatDelay: 1 ,
    ease: "power3.inOut"
  },"<");


  tlMusic.to("#start4", {
    duration: 2,
    morphSVG: "m272.95,40.04c11.27,0,17.14,3.94,17.58,12.84h-10.7c-.4-2.66-2.45-3.98-6.88-3.98-6.2,0-7.24,2.62-7.24,5.59s1.09,5.67,7.24,5.67c4.43,0,6.48-1.37,6.88-4.06h10.7c-.44,8.93-6.28,12.92-17.58,12.92-12.39,0-17.7-4.71-17.7-14.52s5.31-14.44,17.7-14.44Z",
    // fill: colors[i],
    // yoyo: true,
    // repeat: -1,
    // repeatDelay: 1,
    ease: "power3.inOut"
  },"<");

tlMusic.to("#vid-fade", {
  autoAlpha: 0
}, "<1")
tlMusic.to("#vid-fade2", {
  autoAlpha: 1
}, "<")

//// END NOISE/MUSIC SECTION ////



//// START SHOWREEL CONTAINER


//// START BORDER-LINE 1a CODE ////

const borderLine1a = document.querySelector(".border_line1a");

let borderLineGrow1a = gsap.timeline({
  scrollTrigger: {
    trigger: borderLine1a,
    start: "top 75%",
    scrub: false,
    markers: true
  }
});

    borderLineGrow1a.to(borderLine1a, {
        width: "100%",
        duration: 3,
        ease: "power4.out"
      });

      const childSplit1a = new SplitText("#section_title1a", {
        type: "lines",
        linesClass: "split-child"
      });
      const parentSplit1a = new SplitText("#section_title1a", {
        // type: "lines",
        linesClass: "split-parent"
      });
      
      borderLineGrow1a.from(childSplit1a.lines, {
        duration: 2.5,
        yPercent: 1100,
        ease: "power4",
        stagger: 0.1
      },0.25);


// VIDEO CORNER TICKER START //


let videoTicker = (function() {
  $("#videoTicker .video_ticker-div span").wrapAll("<span class='video-ticker-wrap'>");

  var tickerWidth = $(".video-ticker-wrap").width(),
      spanWidth = $(".video-ticker-wrap span").width(),
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
                  // pinnedContainer: "#main",
                  trigger: "#videoTicker",
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


  $(".video-ticker-wrap span").clone().appendTo(".video-ticker-wrap");

  tl.to(".video-ticker-wrap", { // loop
      rotation: 0.01,
      force3D: true,
      xPercent: -50,
      reversed: true,
      ease: "none",
      duration: spanWidth / speed
  });
}());



// VIDEO CORNER TICKER END //

      
// Click button to change lightbox to opacity 1 and visible
// And start video (autoplay)

const element = document.getElementById('video-block');
const video = document.querySelector('#video');

const player = new Plyr('#video', {
  loadSprite: false,
  controls: false,
  poster: "img/simplicity.jpg"
});

element.addEventListener('click', function () {
  videoStartEffect();
});

function videoStartEffect() {
  video.src = "video/SHOWREEL FINAL!.mp4";
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



  let dimDiv = gsap.timeline({
    scrollTrigger: {
      trigger: ".showreel-section",
      start: "bottom 90%",
      scrub: false,
      markers: true,
      toggleActions: "play none none reverse",
    }
  });

  dimDiv.to(".showreel-section, .expertise_section", {
    background: "#f4f4f4",
    duration: 1,
    ease: "power2.out"
  })


//// START BORDER-LINE 1 CODE ////

const borderLine1 = document.querySelector(".border_line1");

let borderLineGrow1 = gsap.timeline({
  scrollTrigger: {
    trigger: borderLine1,
    start: "top 75%",
    scrub: false,
    markers: true
  }
});

    borderLineGrow1.to(borderLine1, {
        width: "100%",
        duration: 3,
        ease: "power4.out"
      });

      const childSplit = new SplitText("#section_title1", {
        type: "lines",
        linesClass: "split-child"
      });
      // const parentSplit = new SplitText("#section_heading_1", {
      //   // type: "lines",
      //   linesClass: "split-parent"
      // });
      
      borderLineGrow1.from(childSplit.lines, {
        duration: 2.5,
        yPercent: 110,
        ease: "power4",
        stagger: 0.1
      },0.25);


//// END BORDER-LINE 1 CODE ////



  //// START HOVER-LIST SECTION CODE ////


  let images = [
    "https://images.unsplash.com/photo-1530064073344-4c9a218a3653?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODUxNDE2MDJ8&ixlib=rb-4.0.3&q=80&w=400",
    "https://images.unsplash.com/photo-1684437310642-c3660c463cf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODUxOTk4MjF8&ixlib=rb-4.0.3&q=80&w=400",
    "https://images.unsplash.com/photo-1682905926517-6be3768e29f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODU2MTQ1NDF8&ixlib=rb-4.0.3&q=80&w=400",
    "https://images.unsplash.com/photo-1683654968102-da4bf0d2d179?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODU2MTQ1OTF8&ixlib=rb-4.0.3&q=80&w=400",
    "https://images.unsplash.com/photo-1605271864611-58dd08d10547?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODU2MTQ4NTl8&ixlib=rb-4.0.3&q=80&w=400",
    "https://images.unsplash.com/photo-1490507278117-59a4ccd0165f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODU2MTQ4OTV8&ixlib=rb-4.0.3&q=80&w=400",
    "https://images.unsplash.com/photo-1624715153088-8f2b8478cfb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODU2MTQ5MzN8&ixlib=rb-4.0.3&q=80&w=400"
  ];
  
  let currentIndex = 0;
  
  // you only need one 'hover-reveal' element. More is overkill
  gsap.set(".hover-reveal", { yPercent: -50, xPercent: -50 });
  
  let activeImage;
  
  let image = document.querySelector(".hover-reveal"),
    setX,
    setY,
    align = (e) => {
      setX(e.clientX);
      setY(e.clientY);
    },
    startFollow = () => document.addEventListener("mousemove", align),
    stopFollow = () => document.removeEventListener("mousemove", align),
    fade = gsap.to(image, {
      autoAlpha: 1,
      ease: "none",
      paused: true,
      onReverseComplete: stopFollow
    });
  
  // Create a new timeline for the scaling effect outside the event listener
  const scaleTl = gsap.timeline({ paused: true });
  
  scaleTl.fromTo(
    ".hover-reveal__inner",
    { scale: 0.3 }, // Change the starting scale value to 0.3
    {
      ease: "Expo.easeOut",
      duration: 1,
      scale: 1
    }
  );
  
  scaleTl.fromTo(
    ".hover-reveal__img",
    { scale: 2.5 },
    {
      ease: "Expo.easeOut",
      duration: 1,
      scale: 1
    },
    0
  );
  
  function handleEnter(e, el, index) {
    console.log("enter", index, "👀", images[index]);
  
    if (currentIndex != index) {
      console.log("swopsies");
      // we're just swopping out the image but you could do whatevs
      gsap.set(".hover-reveal__img", {
        backgroundImage: `url(${images[index]})`
      });
    }
    currentIndex = index;
  
    fade.play();
    startFollow();
  
    (setX = gsap.quickTo(image, "x", { duration: 3.25, ease: "expo.out" })),
      (setY = gsap.quickTo(image, "y", { duration: 3.25, ease: "expo.out" }));
    align(e);
  
    // Play the timeline
    scaleTl.play();
  }
  
  function handleLeave() {
    console.log("reverse");
    fade.reverse();
    scaleTl.timeScale(2).reverse(); // Reverse the scaling effect on mouseleave
  }

  function handleLinkClick() {
    stopFollow();
    fade.reverse();
  }
  
  
  gsap.utils.toArray(".skills_menu__item").forEach((el, index) => {
    el.addEventListener("mouseenter", (e) => handleEnter(e, el, index));
    el.addEventListener("mouseleave", handleLeave);
    el.addEventListener("click", handleLinkClick);
  });


//// HOVER-LIST TICKER FUNCTION ////

function skillsMenuInit() {

  // Detect Closest Edge
  // from https://codepen.io/johnstew/pen/zxYJZP?editors=0010
  const closestEdge = (x,y,w,h) => {
      const topEdgeDist = distMetric(x,y,w/2,0);
      const bottomEdgeDist = distMetric(x,y,w/2,h);
      const min = Math.min(topEdgeDist,bottomEdgeDist);
      return min === topEdgeDist ? 'top' : 'bottom';
  }
  
  // Distance Formula
  // from https://codepen.io/johnstew/pen/zxYJZP?editors=0010
  const distMetric = (x,y,x2,y2) => {
      const xDiff = x - x2;
      const yDiff = y - y2;
      return (xDiff * xDiff) + (yDiff * yDiff);
  }
  
  // initialize the menu
  
  class MenuItem {
      constructor(el) {
          // .menu__item element
          this.DOM = {el: el};
          // .menu__item-link element
          this.DOM.link = this.DOM.el.querySelector('a.menu__item-link');
          // .marquee element
          this.DOM.marquee = this.DOM.el.querySelector('.skills_marquee');
          // .marquee__inner-wrap element
          this.DOM.marqueeInner = this.DOM.marquee.querySelector('.skills_marquee__inner-wrap');
          // some default options for the animation's speed and easing
          this.animationDefaults = {duration: 0.6, ease: 'expo'};
          // events initialization
          this.initEvents();
      }
      initEvents() {
          this.onMouseEnterFn = ev => this.mouseEnter(ev);
          this.DOM.link.addEventListener('mouseenter', this.onMouseEnterFn);
          this.onMouseLeaveFn = ev => this.mouseLeave(ev);
          this.DOM.link.addEventListener('mouseleave', this.onMouseLeaveFn);
      }
      mouseEnter(ev) {
          // find closest side to the mouse
          const edge = this.findClosestEdge(ev);
          
          // set the initial y position for both the marquee and marqueeInner elements
          // for the reveal effect to happen, both start at opposite positions
          // the directions are different depending on the direction the cursor enters the element (bottom or top)
          gsap.timeline({defaults: this.animationDefaults})
          .set(this.DOM.marquee, {y: edge === 'top' ? '-101%' : '101%'}, 0)
          .set(this.DOM.marqueeInner, {y: edge === 'top' ? '101%' : '-101%'}, 0)
          .to([this.DOM.marquee, this.DOM.marqueeInner], {y: '0%'}, 0);
      }
      mouseLeave(ev) {
          // find closest side to the mouse
          const edge = this.findClosestEdge(ev);
          
          gsap.timeline({defaults: this.animationDefaults})
          .to(this.DOM.marquee, {y: edge === 'top' ? '-101%' : '101%'}, 0)
          .to(this.DOM.marqueeInner, {y: edge === 'top' ? '101%' : '-101%'}, 0);
      }
      // find closest side to the mouse when entering/leaving
      findClosestEdge(ev) {
          const x = ev.pageX - this.DOM.el.offsetLeft;
          const y = ev.pageY - this.DOM.el.offsetTop;
          return closestEdge(x,y,this.DOM.el.clientWidth, this.DOM.el.clientHeight);
      }
  }
  
  class Menu {
      constructor(el) {
          // .menu element
          this.DOM = {el: el};
          // the menu items
          this.DOM.menuItems = this.DOM.el.querySelectorAll('.skills_menu__item');
          // array of MenuItem
          this.menuItems = [];
          this.DOM.menuItems.forEach(menuItem => this.menuItems.push(new MenuItem(menuItem)));
      }
  }
  
  new Menu(document.querySelector('.skills_menu'));
  
  }
  
  skillsMenuInit()

//// END HOVER-LIST SECTION CODE ////

//// EXPERTISE SECTION COLOUR SHIFT ////

let dimDiv2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".case-studies_section",
    start: "top 75%",
    scrub: false,
    markers: true,
    toggleActions: "play none none reverse",
  }
});

dimDiv2.to(".expertise_section, .case-studies_section", {
  background: "#000",
  duration: 1,
  ease: "power2.out"
})


//// START BORDER-LINE 2 CODE ////

const borderLine2 = document.querySelector(".border_line2");

let borderLineGrow2 = gsap.timeline({
  scrollTrigger: {
    trigger: borderLine2,
    start: "top 75%",
    scrub: false,
    markers: true
  }
});

    borderLineGrow2.to(borderLine2, {
        width: "100%",
        duration: 3,
        ease: "power4.out"
      });

      const childSplit2 = new SplitText("#section_title2", {
        type: "lines",
        linesClass: "split-child"
      });
      const parentSplit2 = new SplitText("#section_title2", {
        // type: "lines",
        linesClass: "split-parent"
      });
      
      borderLineGrow2.from(childSplit2.lines, {
        duration: 2.5,
        yPercent: 110,
        ease: "power4",
        stagger: 0.1
      },0.25);


//// END BORDER-LINE 2 CODE ////


//// START HORIZONTAL SECTION CODE

//Horizontal Scroll Galleries

gsap.registerPlugin(Flip);

const subjectTitleSplit = document.querySelector(".section_title-shift");
const toFlipTitle = document.querySelector("#section_title");
const titleContainer = document.querySelector("#title-shift-pin");

let state = Flip.getState(toFlipTitle);
titleContainer.appendChild(toFlipTitle);
const myFlip = Flip.from(state,{
  paused: true,
  duration: 1,
  ease: "power2.out"
})


gsap.to("#title-shift-pin", {
  scrollTrigger: {
    trigger: ".section_title-shift",
    pin: true,
    start: "top 10%",
    end: "bottom top-=3100",
    markers: true,
    onEnter: () => {
      myFlip.play();
    },
    onLeaveBack: () => {
      myFlip.reverse();
    }
  }
})



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


///FADE IN

let tlcontoursFade = gsap.timeline({
  scrollTrigger: {
    trigger: ".LottieSection",
    start: "top 25%",
    end: "bottom top",
    scrub: true,
    toggleActions: "play reverse play reverse",
    markers: true
  }
});
tlcontoursFade.to("#contours", { opacity: 1, duration: 1 });
tlcontoursFade.to("#contours", { opacity: 0.4, duration: 2 },">");

const logoTitleQuote = new SplitText(".quote-1", {
  type: "lines",
  linesClass: "split-child"
});

const logoTitleQuote2 = new SplitText(".quoter-1", {
  type: "lines",
  linesClass: "split-child"
});

let tlQuoteFade = gsap.timeline({
  scrollTrigger: {
    trigger: ".quote-1",
    start: "top top",
    end: "bottom top-=1000",
    toggleActions: "play complete reverse none",
    markers: { startColor: "teal", endColor: "coral", indent: "200px" }
  }
});

tlQuoteFade.from(logoTitleQuote.lines, {
  duration: 2.5,
  yPercent: 200,
  ease: "power4",
  stagger: 0.1
});

tlQuoteFade.from(logoTitleQuote2.lines, {
  duration: 2.5,
  yPercent: 110,
  ease: "power4",
  stagger: 0.1
},">-=0.75");



///
  
LottieScrollTrigger({
  target: "#contours",
  path: "https://assets.codepen.io/4086427/data_6.json",
  /*path: "https://matt-rudd.com/json/wireframemountain.json",*/
  speed: "medium",
  pin: ".LottieSection",
  start: "top top",
  end: "bottom top-=500",
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


//// START MINI HORIZ GALLERY SECTION ////

const galleryRows = document.querySelectorAll('.rowmini');


galleryRows.forEach((el, index) => {
  
  let direction;
  
  if(index%2 == 1) {
    direction = '0%';
  }
  else {
    direction = '-10%';
  }
  
  gsap.to(el, {
    x: direction,
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      end: () => 'bottom top',
      scrub: 1,
      markers: false,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      pin: false
    }
})
});


//// END MINI HORIZ GALLERY SECTION ////


//// START APPROACH SECTION ////

function approach() {
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

}
approach();

//// END APPROACH SECTION ////


//// START BORDER-LINE 3 CODE ////

const borderLine3 = document.querySelector(".border_line3");

let borderLineGrow3 = gsap.timeline({
  scrollTrigger: {
    trigger: borderLine3,
    start: "top 75%",
    scrub: false,
    markers: true
  }
});

    borderLineGrow3.to(borderLine3, {
        width: "100%",
        duration: 3,
        ease: "power4.out"
      });

      const childSplit3 = new SplitText("#section_title3", {
        type: "lines",
        linesClass: "split-child"
      });
      const parentSplit3 = new SplitText("#section_title3", {
        // type: "lines",
        linesClass: "split-parent"
      });
      
      borderLineGrow3.from(childSplit3.lines, {
        duration: 2.5,
        yPercent: 110,
        ease: "power4",
        stagger: 0.1
      },0.25);


//// END BORDER-LINE 2 CODE ////

const subjectTitleSplit2 = document.querySelector(".section_title-shift");
const toFlipTitle2 = document.querySelector("#section_title3");
const titleContainer2 = document.querySelector("#title-shift-pin2");

let state2 = Flip.getState(toFlipTitle2);
titleContainer2.appendChild(toFlipTitle2);
const myFlip2 = Flip.from(state2,{
  paused: true,
  duration: 1,
  ease: "power2.out"
})


gsap.to("#title-shift-pin2", {
  scrollTrigger: {
    trigger: ".section_title-shift2",
    pin: true,
    start: "top 10%",
    end: "bottom top-=1355",
    markers: true,
    onEnter: () => {
      myFlip2.play();
    },
    onLeaveBack: () => {
      myFlip2.reverse();
    }
  }
})


//// CORE VALUES COLOUR CHANGE ////

let dimDiv3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".approach_section",
    start: "top 75%",
    scrub: false,
    markers: true,
    toggleActions: "play none none reverse",
  }
});

dimDiv3.to(".section-gallery, .approach_section", {
  background: "#f4f4f4",
  duration: 1,
  ease: "power2.out"
})


//// START VALUES SECTION ////

function values() {
/**
 * Class representing a content item element (.content__item)
 */
class ContentItem {
	// DOM elements
	DOM = {
		// main element (.content__item)
		el: null,
        // title (.content__item-title)
        title: null,
        // title inner (.content__item-title > .oh__inner)
        titleInner: null,
        // imgWrap (.content__item-imgwrap)
        imgWrap : null,
        // image (.content__item-img)
        img : null,
        // caption (.content__item-caption)
        caption: null,
	};
	
	/**
	 * Constructor.
	 * @param {Element} DOM_el - main element (.content__item)
     * @param {PreviewItem} previewItemInstance - PreviewItem (.preview__item)
	 */
	constructor(DOM_el, previewItemInstance) {
        this.previewItem = previewItemInstance;
		this.DOM.el = DOM_el;
        this.DOM.title = this.DOM.el.querySelector('.content__item-title');
        this.DOM.titleInner = this.DOM.title.querySelector('.oh__inner');
        this.DOM.imgWrap = this.DOM.el.querySelector('.content__item-img-wrap');
        this.DOM.img = this.DOM.imgWrap.querySelector('.content__item-img');
        this.DOM.caption = this.DOM.el.querySelector('.content__item-caption');
	}
}


/**
 * Class representing a preview item element (.preview__item)
 */
class PreviewItem {
	// DOM elements
	DOM = {
		// main element (.preview__item)
		el: null,
        // image outer (.preview__item-img-outer)
        imgOuter: null,
        // imgWrap (.preview__item-img-wrap)
        imgWrap : null,
        // image (.content__item-img)
        img : null,
        // texts that slide in/out (.oh__inner)
        slideTexts: null,
        // description elements (.preview__item-box-desc)
        descriptions: null,
        // title (.preview__item-title)
        title: null,
        // right and left text boxes (.preview__item-box)
        boxes: null,
	};
	
	/**
	 * Constructor.
	 * @param {Element} DOM_el - main element (.preview__item)
	 */
	constructor(DOM_el) {
		this.DOM.el = DOM_el;
        this.DOM.imgOuter = this.DOM.el.querySelector('.preview__item-img-outer');
        this.DOM.imgWrap = this.DOM.el.querySelector('.preview__item-img-wrap');
        this.DOM.img = this.DOM.el.querySelector('.preview__item-img');
        this.DOM.slideTexts = this.DOM.el.querySelectorAll('.oh__inner');
        this.DOM.descriptions = this.DOM.el.querySelectorAll('.preview__item-box-desc');
        this.DOM.title = this.DOM.el.querySelector('.preview__item-title');
        this.DOM.boxes = this.DOM.el.querySelectorAll('.preview__item-box');
	}
}

// Body 
const bodyEl = document.body;

// Content overlay
const contentOverlayInner = document.querySelector('.content__overlay > .overlay__inner');
gsap.set(contentOverlayInner, {
    xPercent: -100
})
// Preview Items
const previewItems = [];
[...document.querySelectorAll('.preview__item')].forEach(previewItem => {
    previewItems.push(new PreviewItem(previewItem));
});

// Content Items
const contentItems = [];
[...document.querySelectorAll('.content__item')].forEach((contentItem, pos) => {
    contentItems.push(new ContentItem(contentItem, previewItems[pos]));
});

// current element
let current = -1;

// check if currently animating
let isAnimating = false;

// Back control
const backCtrl = document.querySelector('.preview__back');

// Events
for (const [pos, contentItem] of contentItems.entries()) {
    
    // click on a content item
    contentItem.DOM.imgWrap.addEventListener('click', () => {
        if ( isAnimating ) return;
        isAnimating = true;

        current = pos;

        const previewItem = previewItems[pos];
        
        gsap.timeline({
            defaults: {
                duration: 1.1,
                ease: 'expo',
            },
            onStart: () => {
                bodyEl.classList.add('preview-open');
                gsap.set(previewItem.DOM.img, {xPercent: 100});
                gsap.set(previewItem.DOM.imgWrap, {xPercent: -102, opacity: 0});

                gsap.set(previewItem.DOM.slideTexts, {yPercent: 120});
                gsap.set(previewItem.DOM.descriptions, {yPercent: 15, opacity: 0});
                
                gsap.set(backCtrl, {x: '+=15%', opacity: 0});

                previewItem.DOM.el.classList.add('preview__item--current');
            },
            onComplete: () => isAnimating = false
        })
        .addLabel('start', 0)
        .addLabel('preview', 'start+=0.3')
        .to(contentOverlayInner, {
            ease: 'power2',
            startAt: {xPercent: -100},
            xPercent: 0
        }, 'start')
        .to([previewItem.DOM.img, previewItem.DOM.imgWrap], {
            xPercent: 0,
        }, 'preview')
        .to(previewItem.DOM.imgWrap, {
            opacity: 1,
        }, 'preview')
        .to(previewItem.DOM.slideTexts, {
            yPercent: 0,
            stagger: 0.05,
        }, 'preview')
        .to(previewItem.DOM.descriptions, {
            ease: 'power2',
            opacity: 1,
            stagger: 0.05,
        }, 'preview')
        .to(previewItem.DOM.descriptions, {
            yPercent: 0,
            stagger: 0.05,
        }, 'preview')
        .to(backCtrl, {
            ease: 'power2',
            opacity: 1,
            x: '-=15%'
        }, 'preview');
    });
    
    // mouseenter / mouseleave effect
    contentItem.DOM.imgWrap.addEventListener('mouseenter', () => {
        gsap.timeline({
            defaults: {
                duration: 0.6,
                ease: 'expo'
            }
        })
        .addLabel('start', 0)
        .set(contentItem.DOM.titleInner, {transformOrigin: '0% 50%'}, 'start')
        .to(contentItem.DOM.titleInner, {
            startAt: {filter: 'blur(0px)'},
            duration: 0.2,
            ease: 'power1.in',
            yPercent: -100,
            rotation: -4,
            filter: 'blur(6px)'
        }, 'start')
        .to(contentItem.DOM.titleInner, {
            startAt: {yPercent: 100, rotation: 4, filter: 'blur(6px)'},
            yPercent: 0,
            rotation: 0,
            filter: 'blur(0px)'
        }, 'start+=0.2')
        .to(contentItem.DOM.imgWrap, {
            scale: 0.95
        }, 'start')
        .to(contentItem.DOM.img, {
            scale: 1.2
        }, 'start')
    });

    contentItem.DOM.imgWrap.addEventListener('mouseleave', () => {
        gsap.timeline({
            defaults: {
                duration: 0.8,
                ease: 'power4'
            }
        })
        .addLabel('start', 0)
        .to([contentItem.DOM.imgWrap, contentItem.DOM.img], {
            scale: 1,
            //rotation: 0
        }, 'start');
    });

}

// Back to grid
backCtrl.addEventListener('click', () => {
    if ( isAnimating ) return;
    isAnimating = true;

    const previewItem = previewItems[current];
    
    gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'power4',
        },
        onComplete: () => {
            previewItem.DOM.el.classList.remove('preview__item--current');
            bodyEl.classList.remove('preview-open');
            isAnimating = false;
        }
    })
    .addLabel('start', 0)
    .to(backCtrl, {
        ease: 'power2',
        opacity: 0
    }, 'start')
    .to(previewItem.DOM.descriptions, {
        ease: 'power2',
        opacity: 0
    }, 'start')
    .to(previewItem.DOM.descriptions, {
        yPercent: 15
    }, 'start')
    .to(previewItem.DOM.slideTexts, {
        yPercent: 120
    }, 'start')
    .to(previewItem.DOM.img, {
        xPercent: -100,
    }, 'start')
    .to(previewItem.DOM.imgWrap, {
        xPercent: 100,
        opacity: 1
    }, 'start')
    .to(contentOverlayInner, {
        ease: 'power2',
        xPercent: 100,
    }, 'start+=0.4')
});

}
values();

//// END VALUES SECTION ////

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

//// PREVIOUSLY WORKED WITH SECTION COLOUR CHANGE ////

//// CORE VALUES COLOUR CHANGE ////

let dimDiv4 = gsap.timeline({
  scrollTrigger: {
    trigger: ".worked-for-section",
    start: "top 75%",
    scrub: false,
    markers: true,
    toggleActions: "play none none reverse",
  }
});

dimDiv4.to(".approach_section, .worked-for-section", {
  background: "#000",
  duration: 1,
  ease: "power2.out"
})


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
  const loader3d = new OBJLoader(LoadingManager);
  // Load the OBJ file
  loader3d.load('https://mrc-website-assets.s3.eu-west-2.amazonaws.com/TOPOPLZ5.obj', (model) => {
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
      trigger: ".threejs_contours-wrapper",
      start: "top top",
      end: "bottom top-=1900",
      pin: true,
      pinSpacing: true,
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

  //ATTEMPT AT DELAY
  // tl.to({}, {duration: 500})


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

    //// START THREE CONTOURS FADE IN

let tlcontoursFade2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".threejs_contours-wrapper",
    start: "top 25%",
    end: "bottom top",
    scrub: true,
    toggleActions: "play reverse play reverse",
    markers: true
  }
});
tlcontoursFade2.to("#three-section", { opacity: 1, duration: 1 });
tlcontoursFade2.to("#three-section", { opacity: 0.4, duration: 2 },">");

const logoTitleQuote3 = new SplitText(".quote-2", {
  type: "lines",
  linesClass: "split-child"
});

const logoTitleQuote4 = new SplitText(".quoter-2", {
  type: "lines",
  linesClass: "split-child"
});

let tlQuoteFade2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".quote-2",
    start: "top top",
    end: "bottom top-=1000",
    toggleActions: "play complete reverse none",
    markers: { startColor: "teal", endColor: "coral", indent: "200px" }
  }
});

tlQuoteFade2.from(logoTitleQuote3.lines, {
  duration: 2.5,
  yPercent: 200,
  ease: "power4",
  stagger: 0.1
});

tlQuoteFade2.from(logoTitleQuote4.lines, {
  duration: 2.5,
  yPercent: 110,
  ease: "power4",
  stagger: 0.1
},">-=0.75");



///


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
//     markers: {indent: "500px", startColor: "purple", endColor: "yellow"},
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


ScrollTrigger.refresh()

// END COLOUR CHANGE CODE ////


   //// START CIRCLE GROW
 

  gsap.timeline({
    scrollTrigger: {
      trigger: ".container-circle",
      pin: true,
      start: "top top",
      end: "bottom middle",
      pinSpacing: false,
      scrub: 1,
      markers: { startColor: "yellow", endColor: "coral", indent: "200px" }
    }
  })
  .to(".masker", { duration: 10, attr: { r: 800 } },2)
  .to("#circleClipPathReveal", { duration: 10, rotation: -180, svgOrigin:"200 200" }, 0.4)
.to(".wheel", {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".spacer1",
        start: "top middle",
        end: "bottom 50%",
        scrub: true,
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
 
 gsap.to("#underline1", { width: "100%", 
   duration: 3,
   ease: Power4.easeOut
 });
 gsap.to("#underline2", { width: "100%", 
   duration: 3,
   ease: Power4.easeOut
 });
 gsap.to("#underline3", { width: "100%", 
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

//// START SPOKES SPIN CODE ////

LottieScrollTriggerSpokes({
  target: "#spokes",
  path: "https://mrc-website-assets.s3.eu-west-2.amazonaws.com/spoked-wheel.json",
  speed: "medium",
  pin: ".spacer3",
  start: "top top",
  end: "bottom -=2000",
  scrub: 1,
  pinSpacing: true,
  markers: true

});    

function LottieScrollTriggerSpokes(vars) {
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
      scrollTrigger: st
  });  
  // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
ScrollTrigger.sort();
  ScrollTrigger.refresh(); 
});
return animation;   
}
//Not loading after above animation!?//
const boxes = gsap.utils.toArray('.box');

// Set things up
gsap.set(boxes, {autoAlpha: 0, y: 100});

boxes.forEach((box, i) => {
// Set up your animation
const anim = gsap.to(box, {delay: 1, duration: 2, autoAlpha: 1, y: 0, ease:"power3", paused: true});

// Use callbacks to control the state of the animation
ScrollTrigger.create({
  trigger: box,
  pinnedContainer: ".spacer3",
  end: "top top",
  once: true,
  markers: true,
  onEnter: self => {
    // If it's scrolled past, set the state
    // If it's scrolled to, play it
    self.progress === 1 ? anim.progress(1) : anim.play()
  }
});
});


//// END SPOKES SPIN CODE ////

//// START FOOTER CODE

gsap.set('.footer-container', { yPercent: -50 })

let uncover = gsap.timeline({ paused:true })

uncover
.to('.footer-container', { yPercent: 0, ease: 'none' })
;

ScrollTrigger.create({ 
  trigger: '.spacer3',
  start: 'bottom bottom',
  end: '+=100%',
  // end was '+=75%', //
  animation: uncover,
  scrub: true,  
  markers: false,
 
}) 
//// END FOOTER CODE

ScrollTrigger.refresh();
console.log("STs REFRESHED!");
 
} ///END INDEXANITANIMS FUNCTION

// // // END OF INDEX ANIMATIONS FUNCTION // // //


// // // START OF CREATIVE DIRECTION ANIMATIONS // // //


function initCreativeDirectionAnims() {

  // var cssId = 'myCss'; // you could encode the css path itself to generate id..
  // if (!document.getElementById(cssId)) {
  //     var head = document.getElementsByTagName('head')[0];
  //     var link = document.createElement('link');
  //     link.id = cssId;
  //     link.rel = 'stylesheet';
  //     link.type = 'text/css';
  //     link.href = 'css/creative-direction.css';
  //     link.media = 'all';
  //     head.appendChild(link);
  // }

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  const scroller = document.querySelector("#smooth-content");
  
  const smoother = ScrollSmoother.create({
    el: scroller,
    smooth: 2,
    effects: true,
    // normalizeScroll: true,
    smoothTouch: 0.1
  });
  
/////





gsap.registerPlugin(Flip);

const element = document.querySelector("#element_cd");

function flipFixed() {
  // get the current state (before we make changes)
  let state = Flip.getState(element, "backgroundColor");
  
  // now make our changes
  element.classList.toggle("fixed");
  if (element.classList.contains("fixed")) {
  gsap.to(element, {fontSize: 30, duration: 1});
  //   // element.innerText = "position: fixed";
  } else {
  gsap.to(element, {fontSize: 60, duration: 1});
  //   // element.innerText = "position: relative";
  }

  // "FLIP" animate from that previous state. 
  Flip.from(state, {
    duration: 1,
    ease: "power2.out"
  });
  
};

////// TITLE 

const cd_title_video = document.querySelector("video");
if (window.matchMedia('(prefers-reduced-motion)').matches) {
  cd_title_video.removeAttribute("autoplay");
  cd_title_video.pause();
}

gsap.to(".screen-fade",{
   opacity: 0,
  duration: 2.5,
  ease: "power2.out"
        })


////
  
  
  // var videoElem = document.querySelector('#vid1');
  // var h = window.innerHeight/2;
  
  
  //   ScrollTrigger.create({
  //     trigger: videoElem,
  //     // markers: {startColor: "purple", endColor: "yellow"},
  //     start: "top top",
  //     end: "bottom top",
  //     // once: true,
  //     onEnter: () => videoElem.play(),
  //     // onEnterBack: () => videoElem.pause(),
  //     onLeave: () => videoElem.pause(),
  //     // onLeaveBack: () => videoElem.pause(),
  // })
  
  // ///// Video section /////
  
//TITLES/VIDEO FLIP

gsap.registerPlugin(Flip);

console.log('-----')
const video = document.querySelector(".rolloverVideo");
const videoContainer = document.querySelector(".video-container");
const flippedContainer = document.querySelector(".flipped_stories-container");
const stories = document.querySelectorAll('.stories a');

function moveCircle(e) {
  console.log(e);
  console.log(videoContainer.clientWidth);
  gsap.to(videoContainer, 0.3, {
    css: {
      left: e.pageX - (videoContainer.clientWidth / 2),
      top: e.pageY - (videoContainer.clientHeight / 2)
    }
  });
}

var flag = false;

// For each story on mouseover, update which video is visible
$(stories).each(function(i, value){
  
  $(this).mouseover(function(e){
    flag=true; 
    const video_id = value.dataset.id;
    console.log(video_id);
    const video_target = $('video[data-id='+video_id+']');
    console.log(video_target);
    video_target.addClass('visible');
    
    gsap.to(videoContainer,0.4,{scale:1,autoAlpha:1})
    $(this).on('mousemove', moveCircle);
  });
  $(this).mouseout(function(){
    flag=false;
    const video_id = value.dataset.id;
    const video_target = $('video[data-id='+video_id+']');
    video_target.removeClass('visible');
    
    gsap.to(videoContainer,0.4,{scale:0.1,autoAlpha:0})
  });
});

console.clear();

gsap.registerPlugin(Flip);

const lines = gsap.utils.toArray("li");
let target;
let currentIndex = null;

// Create a timeline
let tl = gsap.timeline();

lines.forEach((e, i) => {
  e.addEventListener("click", () => {
    if (target) return;
    const state = Flip.getState(video);
    target = e;
    currentIndex = i;
    
    // Add a class to the video that gets reparented
    flippedContainer.appendChild(video);
    video.classList.add('flipped');
    flippedContainer.classList.add('flipped-top');
  // To change the value of the data-follower-text attribute:


    
    Flip.from(state, {
      duration: 1,
      ease: "power3.out",
      absolute: true
    });
    
        // Fade out inactive titles
    tl.to(
      lines,
      { opacity: 0, duration: 1, ease: "power3.out" }
    );

    // Fade out inactive videos
    tl.to(
      'video:not(.flipped)', // Select all videos except the one with the 'flipped' class
      { opacity: 0, duration: 0, ease: "power3.out" }
    ,"<");
  });
});



flippedContainer.addEventListener("click", () => {
  if (!target) return;
  
  // Remove the 'flipped' class from the video
  video.classList.remove('flipped');
  flippedContainer.classList.remove('flipped-top');


// // To append additional text to the existing value:
// const currentValue = container.dataset.followerText; // Get the current value
// const appendedText = currentValue + ' MORE TEXT'; // Append the desired text
// container.dataset.followerText = appendedText; // Set the new value

  
  const state = Flip.getState(video);
  videoContainer.appendChild(video);
  Flip.from(state, {
    duration: 1,
    ease: "power3.out",
    absolute: true
  });
  target = null;
  currentIndex = null;

  // Fade in videos
  gsap.to(
    '.rolloverVideo',
    { opacity: 1, duration: 1, ease: "power3.out" }
  );
  
          // Fade in inactive titles
    gsap.to(
      lines,
      { opacity: 1, duration: 1, ease: "power3.out" }
    );
  
});

  //// END Video section ////   
  
  const galleryRows = document.querySelectorAll('.cd-row');
  
  
  galleryRows.forEach((el, index) => {
    
    
    gsap.to(el, {
      x: -400,
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: () => 'bottom top',
        scrub: 1,
        markers: false,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        pin: false
      }
  })
  });


  /* RDB SECTION */

  ScrollTrigger.create({
    trigger: ".cta_sticky",
    start: "top top",
    endTrigger: ".cta-wrapper",
    end: "bottom bottom",
    pin: true,
    pinSpacing: false
  });
  
  $("[tr-scroll-toggle='component']").each(function (index) {
    // get elements
    let component = $(this);
    let lists = component.find("[tr-scroll-toggle='list']");
    // set item total
    let itemTotal = lists.first().children().length;
    component.find("[tr-scroll-toggle='number-total']").text(itemTotal);
    // create trigger divs & spacer
    let firstTrigger = component.find("[tr-scroll-toggle='trigger']").first();
    for (let i = 1; i < itemTotal; i++) {
      firstTrigger.clone().appendTo(component);
    }
    let triggers = component.find("[tr-scroll-toggle='trigger']");
    firstTrigger.css("margin-top", "-100vh");
    let trSpacer = $(
      "<div class='tr-scroll-toggle-spacer' style='width: 100%; height: 100vh;'></div>"
    )
      .hide()
      .appendTo(component);
    // check for min width
    let minWidth = 0;
    let trMinWidth = component.attr("tr-min-width");
    if (trMinWidth !== undefined && trMinWidth !== false) {
      minWidth = +trMinWidth;
    }
    // main breakpoint
    gsap.matchMedia().add(`(min-width: ${minWidth}px)`, () => {
      // show spacer
      trSpacer.show();
      // switch which item is active
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
        lists.each(function (index) {
          $(this).children().removeClass("is-active");
          $(this).children().eq(activeIndex).addClass("is-active");
        });
      }
      makeItemActive(0);
      // scroll to trigger div on click of anchor
      let anchorLinks = component.find("[tr-anchors]").children();
      anchorLinks.on("click", function () {
        let myIndex = $(this).index();
        let scrollDistance =
          triggers.eq(myIndex).offset().top + triggers.eq(myIndex).height() - 1;
        $("html, body").animate({ scrollTop: scrollDistance });
      });
      // triggers timeline
      triggers.each(function (index) {
        let triggerIndex = index;
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: "top top",
            end: "bottom top",
            scrub: true,
            onToggle: ({ self, isActive }) => {
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
          let childItem = $(this).children().eq(triggerIndex);
          tl.to(
            childItem.find("[tr-item-animation='scale-to-1']"),
            { scale: 1 },
            0
          );
          tl.from(
            childItem.find("[tr-item-animation='scale-from-1']"),
            { scale: 1 },
            0
          );
          tl.to(
            childItem.find("[tr-item-animation='progress-horizontal']"),
            { width: "100%" },
            0
          );
          tl.to(
            childItem.find("[tr-item-animation='progress-vertical']"),
            { height: "100%" },
            0
          );
          tl.to(
            childItem.find("[tr-item-animation='rotate-to-0']"),
            { rotation: 0 },
            0
          );
          tl.from(
            childItem.find("[tr-item-animation='rotate-from-0']"),
            { rotation: 0 },
            0
          );
        });
      });
      // component timeline
      let tl = gsap.timeline({
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
      );
      tl.from(
        component.find("[tr-section-animation='scale-from-1']"),
        { scale: 1 },
        0
      );
      tl.to(
        component.find("[tr-section-animation='progress-horizontal']"),
        { width: "100%" },
        0
      );
      tl.to(
        component.find("[tr-section-animation='progress-vertical']"),
        { height: "100%" },
        0
      );
      tl.to(
        component.find("[tr-section-animation='rotate-to-0']"),
        { rotation: 0 },
        0
      );
      tl.from(
        component.find("[tr-section-animation='rotate-from-0']"),
        { rotation: 0 },
        0
      );
      // optional scroll snapping
      // if (component.attr("tr-scroll-snap") === "false") {
      //   let tl2 = gsap.timeline({
      //     scrollTrigger: {
      //       trigger: component,
      //       start: "top top",
      //       end: "bottom bottom",
      //       snap: {
      //         snapTo: "labelsDirectional",
      //         duration: { min: 0.01, max: 0.2 },
      //         delay: 0.0001,
      //         ease: "power1.out"
      //       }
      //     }
      //   });
      //   triggers.each(function (index) {
      //     tl2.to($(this), { scale: 1, duration: 1 });
      //     tl2.addLabel("trigger" + index);
      //   });
      // }
      // smaller screen sizes
      return () => {
        trSpacer.hide();
        component
          .find("[tr-scroll-toggle='transform-y']")
          .css("transform", "translateY(0%)");
        component
          .find("[tr-scroll-toggle='transform-x']")
          .css("transform", "translateX(0%)");
        lists.each(function (index) {
          $(this).children().removeClass("is-active");
        });
      };
    });
  });
  
  
  /* WEB ART SECTION GSAP */
  
  const panels = gsap.utils.toArray(".cd_panel");
  
  gsap.set(panels, {
    yPercent: (i) => (i ? 100 : 0)
  });
  
  const tlWeb = gsap.timeline({
    scrollTrigger: {
      trigger: ".cd_sections",
      start: "top top",
      end: () => "+=" + 100 * panels.length + "%",
      pin: true,
      pinSpacing: true,
      scrub: 1,
      markers: true
    }
  });
  
  panels.forEach((panel, index) => {
    if (index) {
      tlWeb.to(
        panel,
        {
          yPercent: 0,
          ease: "none"
        },
        "+=0.25"
      );
    }
  });
  
}

//// WD NEXT/CONTACT SECTION ////

// // TEXT TICKER

gsap.utils.toArray(".wd_stb_line_single").forEach((line, i) => {
  const links = line.querySelectorAll("a"),
    tl = horizontalLoop(links, {
      repeat: -1,
      speed: 1.75,
      reversed: true,
      paddingRight: parseFloat(gsap.getProperty(links[0], "marginRight", "px")) // otherwise first element would be right up against the last when it loops. In this layout, the spacing is done with marginRight.
    });
  links.forEach((link) => {
    link.addEventListener("mouseenter", () =>
      gsap.to(tl, { timeScale: 0, overwrite: true })
    );
    link.addEventListener("mouseleave", () =>
      gsap.to(tl, { timeScale: -1, overwrite: true })
    );
  });
});

/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
 */
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    }
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          )
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}

//// END WD NEXT/CONTACT SECTION ////

// // // END OF CREATIVE DIRECTION ANIMATIONS // // //


//////****  START RDB PAGE CODE **** //////


function initRDBPageAnim() {

  //   var cssId = 'myCss'; // you could encode the css path itself to generate id..
  // if (!document.getElementById(cssId)) {
  //     var head = document.getElementsByTagName('head')[0];
  //     var link = document.createElement('link');
  //     link.id = cssId;
  //     link.rel = 'stylesheet';
  //     link.type = 'text/css';
  //     link.href = 'css/rdb.css';
  //     link.media = 'all';
  //     head.appendChild(link);
  // }

  // $(document).ready(function(){


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const scroller = document.querySelector("#smooth-content");

const smoother = ScrollSmoother.create({
  el: scroller,
  smooth: 2,
  effects: true,
  speed: 0.85,
  normalizeScroll: true,
  smoothTouch: 0.1
});

// gsap.registerPlugin(ScrollTrigger);

// WORKS FINE WITHOUT SCROLLSMOOTHER

ScrollTrigger.create({
  trigger: ".overview_sticky",
  start: "top top",
  endTrigger: ".overview_component",
  end: "bottom top",
  pin: true,
  pinSpacing: false
});

$("[tr-scroll-toggle='component']").each(function (index) {
  // get elements
  let component = $(this);
  let lists = component.find("[tr-scroll-toggle='list']");
  // set item total
  let itemTotal = lists.first().children().length;
  component.find("[tr-scroll-toggle='number-total']").text(itemTotal);
  // create trigger divs & spacer
  let firstTrigger = component.find("[tr-scroll-toggle='trigger']").first();
  for (let i = 1; i < itemTotal; i++) {
    firstTrigger.clone().appendTo(component);
  }
  let triggers = component.find("[tr-scroll-toggle='trigger']");
  firstTrigger.css("margin-top", "-100vh");
  let trSpacer = $(
    "<div class='tr-scroll-toggle-spacer' style='width: 100%; height: 100vh;'></div>"
  )
    .hide()
    .appendTo(component);
  // check for min width
  let minWidth = 0;
  let trMinWidth = component.attr("tr-min-width");
  if (trMinWidth !== undefined && trMinWidth !== false) {
    minWidth = +trMinWidth;
  }
  // main breakpoint
  gsap.matchMedia().add(`(min-width: ${minWidth}px)`, () => {
    // show spacer
    trSpacer.show();
    // switch which item is active
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
      lists.each(function (index) {
        $(this).children().removeClass("is-active");
        $(this).children().eq(activeIndex).addClass("is-active");
      });
    }
    makeItemActive(0);
    // triggers timeline
    triggers.each(function (index) {
      let triggerIndex = index;
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: "top top",
          end: "bottom top",
          scrub: true,
          onToggle: ({ self, isActive }) => {
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
        let childItem = $(this).children().eq(triggerIndex);
        tl.to(
          childItem.find("[tr-item-animation='scale-to-1']"),
          { scale: 1 },
          0
        );
        tl.from(
          childItem.find("[tr-item-animation='scale-from-1']"),
          { scale: 1 },
          0
        );
        tl.to(
          childItem.find("[tr-item-animation='progress-horizontal']"),
          { width: "100%" },
          0
        );
        tl.to(
          childItem.find("[tr-item-animation='progress-vertical']"),
          { height: "100%" },
          0
        );
        tl.to(
          childItem.find("[tr-item-animation='rotate-to-0']"),
          { rotation: 0 },
          0
        );
        tl.from(
          childItem.find("[tr-item-animation='rotate-from-0']"),
          { rotation: 0 },
          0
        );
      });
    });
    // component timeline
    let tl = gsap.timeline({
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
    );
    tl.from(
      component.find("[tr-section-animation='scale-from-1']"),
      { scale: 1 },
      0
    );
    tl.to(
      component.find("[tr-section-animation='progress-horizontal']"),
      { width: "100%" },
      0
    );
    tl.to(
      component.find("[tr-section-animation='progress-vertical']"),
      { height: "100%" },
      0
    );
    tl.to(
      component.find("[tr-section-animation='rotate-to-0']"),
      { rotation: 0 },
      0
    );
    tl.from(
      component.find("[tr-section-animation='rotate-from-0']"),
      { rotation: 0 },
      0
    );
    // optional scroll snapping
    let tl2;
    if (component.attr("tr-scroll-snap") === "true") {
      tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: component,
          start: "top top",
          end: "bottom bottom",
          markers: {},
          id: index + 1
          // snap: {
          //   snapTo: "labelsDirectional",
          //   duration: { min: 0.01, max: 0.2 },
          //   delay: 0.0001,
          //   ease: "power1.out"
          // }
        }
      });
      triggers.each(function (index) {
        tl2.to($(this), { scale: 1, duration: 1, ease: "none" });
        tl2.addLabel("trigger" + index);
      });
    }
    console.log(smoother);

    // // scroll to trigger div on click of anchor
    // let anchorLinks = component.find("[tr-anchors]").children();
    // anchorLinks.on("click", function () {
    //   let myIndex = $(this).index();
    //   const targetTrigger = triggers.eq(myIndex);
    //   const targetPosition = targetTrigger.offset().top - scroller.offsetTop;
    //   smoother.scrollTo(targetPosition, 0.25);
    // });

    // smaller screen sizes
    return () => {
      trSpacer.hide();
      component
        .find("[tr-scroll-toggle='transform-y']")
        .css("transform", "translateY(0%)");
      component
        .find("[tr-scroll-toggle='transform-x']")
        .css("transform", "translateX(0%)");
      lists.each(function (index) {
        $(this).children().removeClass("is-active");
      });
    };
  });
});


 // Get the div with the text 'plan'
 const planDiv = document.querySelector(".tab1");

 if (planDiv) {
   // Add the click event listener
   planDiv.addEventListener("click", function() {
     // Calculate the target scroll position (33.33% down the page)
     const targetPosition1 = window.innerHeight * 0.3333;

     // Animate the scroll to the target position using GSAP
     gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
     const scroller = document.querySelector("#smooth-content");
     
     const smoother = ScrollSmoother.create({
       el: scroller,
       smooth: 2,
       effects: true,
       speed: 0.85,
       normalizeScroll: true,
       smoothTouch: 0.1
     });
     
     // gsap.registerPlugin(ScrollTrigger);
     
     // WORKS FINE WITHOUT SCROLLSMOOTHER
     
     ScrollTrigger.create({
       trigger: ".overview_sticky",
       start: "top top",
       endTrigger: ".overview_component",
       end: "bottom top",
       pin: true,
       pinSpacing: false
     });
     
     $("[tr-scroll-toggle='component']").each(function (index) {
       // get elements
       let component = $(this);
       let lists = component.find("[tr-scroll-toggle='list']");
       // set item total
       let itemTotal = lists.first().children().length;
       component.find("[tr-scroll-toggle='number-total']").text(itemTotal);
       // create trigger divs & spacer
       let firstTrigger = component.find("[tr-scroll-toggle='trigger']").first();
       for (let i = 1; i < itemTotal; i++) {
         firstTrigger.clone().appendTo(component);
       }
       let triggers = component.find("[tr-scroll-toggle='trigger']");
       firstTrigger.css("margin-top", "-100vh");
       let trSpacer = $(
         "<div class='tr-scroll-toggle-spacer' style='width: 100%; height: 100vh;'></div>"
       )
         .hide()
         .appendTo(component);
       // check for min width
       let minWidth = 0;
       let trMinWidth = component.attr("tr-min-width");
       if (trMinWidth !== undefined && trMinWidth !== false) {
         minWidth = +trMinWidth;
       }
       // main breakpoint
       gsap.matchMedia().add(`(min-width: ${minWidth}px)`, () => {
         // show spacer
         trSpacer.show();
         // switch which item is active
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
           lists.each(function (index) {
             $(this).children().removeClass("is-active");
             $(this).children().eq(activeIndex).addClass("is-active");
           });
         }
         makeItemActive(0);
         // triggers timeline
         triggers.each(function (index) {
           let triggerIndex = index;
           let tl = gsap.timeline({
             scrollTrigger: {
               trigger: $(this),
               start: "top top",
               end: "bottom top",
               scrub: true,
               onToggle: ({ self, isActive }) => {
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
             let childItem = $(this).children().eq(triggerIndex);
             tl.to(
               childItem.find("[tr-item-animation='scale-to-1']"),
               { scale: 1 },
               0
             );
             tl.from(
               childItem.find("[tr-item-animation='scale-from-1']"),
               { scale: 1 },
               0
             );
             tl.to(
               childItem.find("[tr-item-animation='progress-horizontal']"),
               { width: "100%" },
               0
             );
             tl.to(
               childItem.find("[tr-item-animation='progress-vertical']"),
               { height: "100%" },
               0
             );
             tl.to(
               childItem.find("[tr-item-animation='rotate-to-0']"),
               { rotation: 0 },
               0
             );
             tl.from(
               childItem.find("[tr-item-animation='rotate-from-0']"),
               { rotation: 0 },
               0
             );
           });
         });
         // component timeline
         let tl = gsap.timeline({
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
         );
         tl.from(
           component.find("[tr-section-animation='scale-from-1']"),
           { scale: 1 },
           0
         );
         tl.to(
           component.find("[tr-section-animation='progress-horizontal']"),
           { width: "100%" },
           0
         );
         tl.to(
           component.find("[tr-section-animation='progress-vertical']"),
           { height: "100%" },
           0
         );
         tl.to(
           component.find("[tr-section-animation='rotate-to-0']"),
           { rotation: 0 },
           0
         );
         tl.from(
           component.find("[tr-section-animation='rotate-from-0']"),
           { rotation: 0 },
           0
         );
         // optional scroll snapping
         let tl2;
         if (component.attr("tr-scroll-snap") === "false") {
           tl2 = gsap.timeline({
             scrollTrigger: {
               trigger: component,
               start: "top top",
               end: "bottom bottom",
               markers: {},
               id: index + 1
               // snap: {
               //   snapTo: "labelsDirectional",
               //   duration: { min: 0.01, max: 0.2 },
               //   delay: 0.0001,
               //   ease: "power1.out"
               // }
             }
           });
           triggers.each(function (index) {
             tl2.to($(this), { scale: 1, duration: 1, ease: "none" });
             tl2.addLabel("trigger" + index);
           });
         }
         console.log(smoother);
     
         // // scroll to trigger div on click of anchor
         // let anchorLinks = component.find("[tr-anchors]").children();
         // anchorLinks.on("click", function () {
         //   let myIndex = $(this).index();
         //   const targetTrigger = triggers.eq(myIndex);
         //   const targetPosition = targetTrigger.offset().top - scroller.offsetTop;
         //   smoother.scrollTo(targetPosition, 0.25);
         // });
     
         // smaller screen sizes
         return () => {
           trSpacer.hide();
           component
             .find("[tr-scroll-toggle='transform-y']")
             .css("transform", "translateY(0%)");
           component
             .find("[tr-scroll-toggle='transform-x']")
             .css("transform", "translateX(0%)");
           lists.each(function (index) {
             $(this).children().removeClass("is-active");
           });
         };
       });
     });

    })
  }

// });

}


// // // START OF CONTENT STRATEGY // // //

function initContentStrategyAnims() {

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  const scroller = document.querySelector("#smooth-content");
  
  const smoother = ScrollSmoother.create({
    el: scroller,
    smooth: 2,
    effects: true,
    // normalizeScroll: true,
    smoothTouch: 0.1
  });
  
  /////
  
  /* BLOTTER.JS */
  
  var text = new Blotter.Text("unclear?", {
    family: "Monument Extended-Bold",
    size: 100,
    weight: 700,
    color: "#1a1a1a",
    paddingTop: 0,
    paddingBottom: 0
  });
  
  var material = new Blotter.ChannelSplitMaterial();
  material.uniforms.uOffset.value = 0;
  material.uniforms.uRotation.value = 0;
  material.uniforms.uApplyBlur.value = 1;
  material.uniforms.uAnimateNoise.value = 0.3;
  
  console.log(material.uniforms.uOffset);
  
  let element = document.querySelector(".hello");
  
  var blotter = new Blotter(material, {
    texts: text
  });
  
  var scope = blotter.forText(text);
  
  scope.appendTo(element);
  
  const blottertl = gsap.timeline({
    scrollTrigger: {
      trigger: ".blotter-container",
      start: "top top",
      end: "bottom top",
      pin: true,
      scrub: 1,
      toggleActions: "play pause resume pause",
      markers: true
    }
  });
  
  blottertl.fromTo(
    material.uniforms.uOffset,
    { value: 0 },
    { value: 0.09, duration: 3 }
  );
  blottertl.fromTo(
    material.uniforms.uRotation,
    { value: 0 },
    { value: 40, duration: 3 },
    "<"
  );
  
  /* FINAL ANIMATION BLOCK */
  
  gsap.set(".tell-container", { y: "0%" });
  gsap.set(".ticker-container", { y: "-200%", x: "100%" });
  gsap.set(".services-ticker-block", { y: "0%" });
  gsap.set(".tgs-bottom-right-container", { y: "-200%", x: "100%" });
  
  /* TOP LEFT */
  
  const tl = gsap.timeline({
    repeat: -1,
    defaults: { duration: 1, ease: "Power2.easeInOut" }
  });
  
  tl.to(".tell", { opacity: 1, duration: 0.5 });
  tl.to(".tell", { opacity: 0, duration: 0.5 });
  tl.to(".great", { opacity: 1, duration: 0.5 });
  tl.to(".great", { opacity: 0, duration: 0.5 });
  
  /* BOTTOM LEFT */
  
  gsap.utils.toArray(".stb_line_single").forEach((line, i) => {
    const speed = 100; // (in pixels per second)
  
    const links = line.querySelectorAll("a"),
      tl = verticalLoop(links, i ? -speed : speed);
  
    links.forEach((link) => {
      link.addEventListener("mouseenter", () =>
        gsap.to(tl, { timeScale: 0, overwrite: true })
      );
      link.addEventListener("mouseleave", () =>
        gsap.to(tl, { timeScale: 1, overwrite: true })
      );
    });
  });
  
  // speed can be positive or negative (in pixels per second)
  function verticalLoop(elements, speed) {
    elements = gsap.utils.toArray(elements);
    let firstBounds = elements[0].getBoundingClientRect(),
      lastBounds = elements[elements.length - 1].getBoundingClientRect(),
      top =
        firstBounds.top -
        firstBounds.height -
        Math.abs(elements[1].getBoundingClientRect().top - firstBounds.bottom),
      bottom = lastBounds.top,
      distance = bottom - top,
      duration = Math.abs(distance / speed),
      tl = gsap.timeline({ repeat: -1 }),
      plus = speed < 0 ? "-=" : "+=",
      minus = speed < 0 ? "+=" : "-=";
    elements.forEach((el) => {
      let bounds = el.getBoundingClientRect(),
        ratio = Math.abs((bottom - bounds.top) / distance);
      if (speed < 0) {
        ratio = 1 - ratio;
      }
      tl.to(
        el,
        {
          y: plus + distance * ratio,
          duration: duration * ratio,
          ease: "none"
        },
        0
      );
      tl.fromTo(
        el,
        {
          y: minus + distance
        },
        {
          y: plus + (1 - ratio) * distance,
          ease: "none",
          duration: (1 - ratio) * duration,
          immediateRender: false
        },
        duration * ratio
      );
    });
    return tl;
  }
  
  /* GREAT */
  
  let setupTicker = (function () {
    $("#services .container-fluid span").wrapAll("<span class='ticker-wrapper'>");
  
    var tickerWidth = $(".ticker-wrapper").width(),
      spanWidth = $(".ticker-wrapper span").width(),
      speed = 85,
      proxy = { timeScale: 0 },
      pipe = gsap.utils.pipe(gsap.utils.clamp(-10, 10), gsap.utils.snap(0.125)),
      tl = gsap.timeline({
        repeat: -1,
        onReverseComplete: () => tl.iteration(10)
      });
  
    $(".ticker-wrapper span").clone().appendTo(".ticker-wrapper");
  
    tl.to(".ticker-wrapper", {
      // loop
      rotation: 0.01,
      force3D: true,
      xPercent: -50,
      ease: "none",
      duration: spanWidth / speed
    });
  })();
  
  var mySplitText = new SplitText(".tell-great-stories", { type: "lines" });
  
  let tl1 = gsap.timeline({
    repeat: -1,
    defaults: { duration: 0.5, ease: "Power2.easeInOut" }
  });
  
  tl1.from(mySplitText.lines[0], { x: "-75vw" });
  tl1.from(mySplitText.lines[1], { x: "75vw" });
  tl1.from(mySplitText.lines[2], { x: "-75vw" });
  tl1.to(mySplitText.lines[0], { x: "75vw" }, "+=1");
  tl1.to(mySplitText.lines[1], { x: "-75vw" }, "<");
  tl1.to(mySplitText.lines[2], { x: "75vw" }, "<");
    
}

// // // END OF CONTENT STRATEGY ANIMATIONS // // //


// // // START OF SUBPAGE ANIMATIONS (PINNED SIDE PANEL) // // //

function initSealskinzAnims() {

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
    
    const smoother = ScrollSmoother.create({
      smooth: 2,
      normalizeScroll: true,
      ignoreMobileResize: true,
      effects: true,
      // normalizeScroll: true,
      smoothTouch: 0.1
    });
  
  
  // SPLIT TEXT BLURB //   
  
  
  
  var splitLines = $('.split-text_blurb .blurb-wrap'),
            blurb = splitLines.find('p'),
            splitParent = new SplitText(blurb, {
              type: 'lines',
              linesClass: "bl"
            }),
            splitTitle = new SplitText(splitParent.lines, {
              type: 'lines',
              linesClass: "lines"
            });
          gsap.set(splitLines, {
            visibility: 'visible'
          });
          splitLines.each(function () {
            var block = $(this),
              lines = block.find('.lines');
            var linesTl2 = gsap.timeline({
              scrollTrigger: {
                trigger: block,
                start: "top 75%"
              }
            }).fromTo(lines, {
              yPercent: 100,
              autoAlpha: 0.01
            }, {
              autoAlpha: 0.999,
              yPercent: 0,
              duration: 1.2,
              stagger: 0.1,
              ease: 'cubic'
            });
          });
  
  ////


//// SEALSKINZ VIDEO HOVER BLOCK ////

   // Listening to the video element
   let clip = document.querySelector(".bc-top-section-video")

   /* Adding the event listeners on the video to play/pause the video. */
   clip.addEventListener("mouseover", function (e) {
      clip.play();
   })

   /* Applying the mouse out event to pause the video */
   clip.addEventListener("mouseout", function (e) {
      clip.pause();
   })

//// END SEALSKINZ VIDEO HOVER BLOCK /////
  
  //// PARALLAX IMAGE BLOCK 1 ////
  
  smoother.effects(".icat_parallax", { speed: "0.8" });
  
  //// END PARALLAX IMAGE BLOCK 1 ////
  
  ScrollTrigger.sort();
    ScrollTrigger.refresh(); 
  
  // }

  //// SOCIAL IG PHONE MOCK-UPS

  let igSSkinz_mock = gsap.timeline({
    scrollTrigger: {
      trigger: ".social_phone_trio",
      start: "top center",
      // end: "bottom+=650",
      scrub: 6,
      toggleActions: "play none reverse reverse",
      //              onEnter onLeave onEnterBack onLeaveBack
      markers: false
    }
  });
  
  igSSkinz_mock.from("#two", 
  {y: 600,
    // autoAlpha: 0,
  });

  igSSkinz_mock.fromTo("#one, #three", 
  {y: -1000,
    // autoAlpha: 0,
  },
  {
    y: 1000,
    // ease: "power2.inOut"
    // ease: "back.out(0.75)"
  },"<");

  ///////
  
  
  //// ICAT PROCESS HOVER BLOCKS ////
  // console.clear();
  let targets = document.querySelectorAll(".icat-title");
  let numbers = document.querySelectorAll(".icat-numbers");
  let lines = document.querySelectorAll(".bottom-side-b");
  let articles = document.querySelectorAll(".article");
  let articlesTitles = document.querySelectorAll("h1");
  let activeTab = 0;
  let old = 0;
  let heights = [];
  let dur = 0.4;
  let animation;
  
  function setupTabSlider() {
    for (let i = 0; i < targets.length; i++) {
      targets[i].index = i;
      heights.push(articles[i].offsetHeight); // get height of each article
      gsap.set(articles[i], {top: 0, y:0, opacity: 0}); // push all articles up 20 and opacity 0
      targets[i].addEventListener("mouseover", doCoolStuff);
    }
    
    // set initial article on first tab
    gsap.set(articles[0], {y:0, autoAlpha: 1, });
    gsap.set(targets[0], {color:"#00ffa3"});
    gsap.set(numbers[0], {color:"#00ffa3"});
    gsap.set(lines[0], {width:"100%"});
    // gsap.set(".article-block", {height:heights[0]});
  
    function doCoolStuff() {
      // check if clicked target is new and if the timeline is currently active
      if(this.index != activeTab) {
        //if there's an animation in-progress, jump to the end immediately so there aren't weird overlaps. 
        if (animation && animation.isActive()) {
          animation.progress(1);
        }
        animation = gsap.timeline({
          defaults:{
            duration:0.5,
          }
        });
        old = activeTab;
        activeTab = this.index;
        // change text color on old and new tab targets
        animation.to(targets, {color:"#ddd", x: 0, ease:"none"}, 0);
        animation.to(numbers, {color:"#ddd", x: 0, ease:"none"}, 0);
        animation.to(lines, {duration: 1, width: "0%", ease:"power2.out"}, 0);
        animation.to(targets[activeTab], {color:"#00ffa3", x:10, ease:"power2.out"}, 0);
        animation.to(numbers[activeTab], {color:"#00ffa3", x:0, ease:"none"}, 0);
         animation.to(lines[activeTab], {duration: 1, width: "100%", ease:"power2.out"}, 0);
        // slide current article down out of view and then set it to starting position at top
        animation.to(articles, {y:0, autoAlpha: 0, ease:"back.in" }, 0);
        // animation.set(articles[old], {y:0});
        // resize article block to accommodate new content
        animation.to(".article-block", {height:heights[activeTab]});
        // slide in new article
        animation.to(articles[activeTab], {duration: 0.4, y:0, autoAlpha:2, ease: "power3.inOut"}, "-=1");
        animation.fromTo(articlesTitles[activeTab], {y:0, autoAlpha:0 }, {duration: 0.4, y:0, autoAlpha:2, ease: "ease"}, "-=1");
      }
      
      
    }
    
  }
  
  
  setupTabSlider();


  function sskinz() {

    const wrapLines = (arr, wrapType, wrapClass) => {
        arr.forEach(el => {
            const wrapEl = document.createElement(wrapType);
            wrapEl.classList = wrapClass;
            el.parentNode.appendChild(wrapEl);
            wrapEl.appendChild(el);
        });
    }  
      
    class TextLinesReveal {
        // DOM elements
        DOM = {
            // main element (a text DOM element)
            el: null
        }
        // Split Type instance
        SplitTypeInstance;
        // Checks if the Split Type lines are visible or not
        isVisible;
        // Animation timelines
        inTimeline;
        outTimeline;
    
        /**
         * Constructor.
         * @param {Element} DOM_el - a text DOM element
         */
        constructor(DOM_el) {
            this.DOM = {
                el: DOM_el
            };
    
            this.SplitTypeInstance = new SplitType(this.DOM.el, { types: 'lines' });
            // Wrap the lines (div with class .ss_oh)
            // The inner child will be the one animating the transform
            wrapLines(this.SplitTypeInstance.lines, 'div', 'ss_oh');
            
            this.initEvents();
        }
    
        /**
         * Animates the lines in.
         * @return {GSAP Timeline} the animation timeline
         * @param {Boolean} animation - with or without animation.
         */
        in(animation = true) {
            // Lines are visible
            this.isVisible = true;
    
            gsap.killTweensOf(this.SplitTypeInstance.lines);
            this.inTimeline = gsap.timeline({defaults: {
                duration: 1.1, 
                ease: 'power4.inOut'
            }})
            .addLabel('start', 0)
            .set(this.SplitTypeInstance.lines, {
                yPercent: 105
            }, 'start');
            
            if ( animation ) {
                this.inTimeline.to(this.SplitTypeInstance.lines, {
                    yPercent: 0,
                    stagger: 0.05
                }, 'start');
            }
            else {
                this.inTimeline.set(this.SplitTypeInstance.lines, {
                    yPercent: 0
                }, 'start');
            }
            
            return this.inTimeline;
        }
    
        /**
         * Animates the lines out.
         * @param {Boolean} animation - with or without animation.
         * @return {GSAP Timeline} the animation timeline
         */
        out(animation = true) {
            // Lines are invisible
            this.isVisible = false;
    
            gsap.killTweensOf(this.SplitTypeInstance.lines);
            
            this.outTimeline = gsap.timeline({defaults: {
                duration: 1.1, 
                ease: 'power4.inOut'
            }}).addLabel('start', 0);
            
            if ( animation ) {
                this.outTimeline.to(this.SplitTypeInstance.lines, {
                    yPercent: -105,
                    stagger: 0.05
                }, 'start');
            }
            else {
                this.outTimeline.set(this.SplitTypeInstance.lines, {
                    yPercent: -105,
                }, 'start');
            }
    
            return this.outTimeline;
        }
    
        /**
         * Initializes some events.
         */
        initEvents() {
            // Re-initialize the Split Text on window resize.
            window.addEventListener('resize', () => {
                // Re-split text
                // https://github.com/lukePeavey/SplitType#instancesplitoptions-void
                this.SplitTypeInstance.split();
    
                // Need to wrap again the new lines elements (div with class .oh)
                wrapLines(this.SplitTypeInstance.lines, 'div', 'ss_oh');
                    
                // Hide the lines
                if ( !this.isVisible ) {
                    gsap.set(this.SplitTypeInstance.lines, {yPercent: 105});
                }
            });
        }
    }  
      
    class Preview {
        // DOM elements
        DOM = {
            // main element (.preview)
            el: null,
            // image element (.preview__img)
            image: null,
            // image inner element (.preview__img-inner)
            imageInner: null,
            // title
            title: null,
            // backCtrl
            backCtrl: null,
    
            // oh__inner elements
            innerElements: null,
            multiLineWrap: null,
        };
        multiLines = [];
        
        /**
         * Constructor.
         * @param {Element} DOM_el - main element (.preview)
         */
        constructor(DOM_el) {
            this.DOM.el = DOM_el;
            this.DOM.image = this.DOM.el.querySelector('.ss_preview__img');
            this.DOM.imageInner = this.DOM.el.querySelector('.ss_preview__img-inner');
            this.DOM.title = this.DOM.el.querySelector('.ss_preview__title');
            this.DOM.backCtrl = this.DOM.el.querySelector('.ss_preview__back');
    
            this.DOM.innerElements = [...this.DOM.el.querySelectorAll('.ss_oh__inner')];
            // the TextLinesReveal instance (animate each text line using the SplitText library)
            this.DOM.multiLineWrap = [...this.DOM.el.querySelectorAll('.ss_preview__column > p')];
            this.DOM.multiLineWrap.forEach(line => this.multiLines.push(new TextLinesReveal(line)));
        }
    }
      
    class Item {
        // DOM elements
        DOM = {
            // main element (.item)
            el: null,
            // image element (.item__img)
            image: null,
            // image inner element (.item__img-inner)
            imageInner: null,
            // item link (.item__link)
            link: null,
            // item meta (.item__meta)
            meta: null,
            // item link (.item__title)
            title: null,
            // item link (.item__desc)
            desc: null,
        }
        
        /**
         * Constructor.
         * @param {Element} DOM_el - main element (.item)
         * @param {Preview} previewEl - the Preview element
         */
        constructor(DOM_el, previewEl) {
            this.DOM.el = DOM_el;
            this.preview = previewEl;
            this.DOM.image = this.DOM.el.querySelector('.ss_item__img');
            this.DOM.imageInner = this.DOM.el.querySelector('.ss_item__img-inner');
            this.DOM.link = this.DOM.el.querySelector('.ss_item__link');
            this.DOM.meta = this.DOM.el.querySelector('.ss_item__meta');
            this.DOM.title = this.DOM.el.querySelector('.ss_item__title');
            this.DOM.desc = this.DOM.el.querySelector('.ss_item__desc');
    
            this.DOM.link.addEventListener('mouseenter', () => {
                gsap.killTweensOf(this.DOM.imageInner);
                gsap.to(this.DOM.imageInner, {
                    duration: 2,
                    ease: 'power4',
                    scale: 1.2
                });
            });
            this.DOM.link.addEventListener('mouseleave', () => {
                gsap.killTweensOf(this.DOM.imageInner);
                gsap.to(this.DOM.imageInner, {
                    duration: 0.7,
                    ease: 'expo',
                    scale: 1
                });
            });
        }
    }
    
    
    
    
    // body element
    const body = document.querySelector('.ss_main');
    
    // .content element
    const contentEl = document.querySelector('.ss_content');
    
    // frame element
    const frameEl = document.querySelector('.ss_frame');
    
    // top and bottom overlay overlay elements
    const overlayRows = [...document.querySelectorAll('.ss_overlay__row')];
    
    // Preview instances array
    const previews = [];
    [...document.querySelectorAll('.ss_preview')].forEach(preview => previews.push(new Preview(preview)));
    
    // Item instances array
    const items = [];
    [...document.querySelectorAll('.ss_item')].forEach((item, pos) => items.push(new Item(item, previews[pos])));
    
    const openItem = item => {
        
        gsap.timeline({
            defaults: {
                duration: 1, 
                ease: 'power3.inOut'
            }
        })
        .add(() => {
            // pointer events none to the content
            contentEl.classList.add('ss_content--hidden');
        }, 'start')
    
        .addLabel('start', 0)
        .set([item.preview.DOM.innerElements, item.preview.DOM.backCtrl], {
            opacity: 0
        }, 'start')
        .to(overlayRows, {
            scaleY: 1
        }, 'start')
    
        .addLabel('content', 'start+=0.6')
    
        .add(() => {
            body.classList.add('ss_preview-visible');
    
            gsap.set(frameEl, {
                opacity: 0
            }, 'start')
            item.preview.DOM.el.classList.add('ss_preview--current');
        }, 'content')
        // Image animation (reveal animation)
        .to([item.preview.DOM.image, item.preview.DOM.imageInner], {
            startAt: {y: pos => pos ? '101%' : '-101%'},
            y: '0%'
        }, 'content')
        
        .add(() => {
            for (const line of item.preview.multiLines) {
                line.in();
            }
            gsap.set(item.preview.DOM.multiLineWrap, {
                opacity: 1,
                delay:0.1
            })
        }, 'content')
        // animate frame element
        .to(frameEl, {
            ease: 'expo',
            startAt: {y: '-100%', opacity: 0},
            opacity: 1,
            y: '0%'
        }, 'content+=0.3')
        .to(item.preview.DOM.innerElements, {
            ease: 'expo',
            startAt: {yPercent: 101},
            yPercent: 0,
            opacity: 1
        }, 'content+=0.3')
        .to(item.preview.DOM.backCtrl, {
            opacity: 1
        }, 'content')
    
    };
    
    const closeItem = item => {
        
        gsap.timeline({
            defaults: {
                duration: 1, 
                ease: 'power3.inOut'
            }
        })
        .addLabel('start', 0)
        .to(item.preview.DOM.innerElements, {
            yPercent: -101,
            opacity: 0,
        }, 'start')
        .add(() => {
            for (const line of item.preview.multiLines) {
                line.out();
            }
        }, 'start')
        
        .to(item.preview.DOM.backCtrl, {
            opacity: 0
        }, 'start')
    
        .to(item.preview.DOM.image, {
            y: '101%'
        }, 'start')
        .to(item.preview.DOM.imageInner, {
            y: '-101%'
        }, 'start')
        
        // animate frame element
        .to(frameEl, {
            opacity: 0,
            y: '-100%',
            onComplete: () => {
                body.classList.remove('ss_preview-visible');
                gsap.set(frameEl, {
                    opacity: 1,
                    y: '0%'
                })
            }
        }, 'start')
    
        .addLabel('grid', 'start+=0.6')
    
        .to(overlayRows, {
            //ease: 'expo',
            scaleY: 0,
            onComplete: () => {
                item.preview.DOM.el.classList.remove('ss_preview--current');
                contentEl.classList.remove('ss_content--hidden');
            }
        }, 'grid')
    };
    
    for (const item of items) {
        // Opens the item preview
        item.DOM.link.addEventListener('click', () => openItem(item));
        // Closes the item preview
        item.preview.DOM.backCtrl.addEventListener('click', () => closeItem(item));
    }
      
      
      
    }
    
    sskinz();
    
    
    

/// END SEALSKINZ PINNED GALLERY SECTION ///

  
  
  //// END ICAT PROCESS HOVER BLOCKS ////
  
  
  //// START ICAT RESULTS COUNTER ////
  
  
  
  //// END ICAT RESULTS COUNTER ////
  
  const items = document.querySelectorAll(".data");
  
  const tl = gsap.timeline({
    paused: true,
    scrollTrigger: {
     trigger: ".results-counter",
      pin: ".results-counter",
      pinSpacing: true,
      start: "top top",
      end: "bottom top"
    }
  });
  
  tl.from(items, {
    textContent: 0,
    duration: 1.5,
    ease: "power1.in",
    snap: { textContent: 1 },
    stagger: {
      each: 1.0,
      onUpdate: function() {
        this.targets()[0].innerHTML = numberWithCommas(Math.ceil(this.targets()[0].textContent));
      },
    }
  });
  
  
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  
  //// WD NEXT/CONTACT SECTION ////
  
  // // TEXT TICKER
  
  gsap.utils.toArray(".wd_stb_line_single").forEach((line, i) => {
    const links = line.querySelectorAll("a"),
      tl = horizontalLoop(links, {
        repeat: -1,
        speed: 1.75,
        reversed: true,
        paddingRight: parseFloat(gsap.getProperty(links[0], "marginRight", "px")) // otherwise first element would be right up against the last when it loops. In this layout, the spacing is done with marginRight.
      });
    links.forEach((link) => {
      link.addEventListener("mouseenter", () =>
        gsap.to(tl, { timeScale: 0, overwrite: true })
      );
      link.addEventListener("mouseleave", () =>
        gsap.to(tl, { timeScale: -1, overwrite: true })
      );
    });
  });
  
  /*
  This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.
  
  Features:
   - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
   - When each item animates to the left or right enough, it will loop back to the other side
   - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
   - The returned timeline will have the following methods added to it:
     - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
     - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
     - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
     - current() - returns the current index (if an animation is in-progress, it reflects the final index)
     - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
   */
  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      xPercents = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      totalWidth,
      curX,
      distanceToStart,
      distanceToLoop,
      item,
      i;
    gsap.set(items, {
      // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
      xPercent: (i, el) => {
        let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
            gsap.getProperty(el, "xPercent")
        );
        return xPercents[i];
      }
    });
    gsap.set(items, { x: 0 });
    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
        gsap.getProperty(items[length - 1], "scaleX") +
      (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
      item = items[i];
      curX = (xPercents[i] / 100) * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop =
        distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond
        },
        0
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
            )
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false
          },
          distanceToLoop / pixelsPerSecond
        )
        .add("label" + i, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index, vars) {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex) {
        // if we're wrapping the timeline's playhead, make the proper adjustments
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }
    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    return tl;
  }
  
  //// END WD NEXT/CONTACT SECTION ////
  
  
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
  
  

 

}  


//// START BRITISH CYCLING ANIM CODE ///

function initBritishCyclingAnims() {

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
    
    const smoother = ScrollSmoother.create({
      smooth: 2,
      normalizeScroll: true,
      ignoreMobileResize: true,
      effects: true,
      // normalizeScroll: true,
      smoothTouch: 0.1
    });
  
  
  // SPLIT TEXT BLURB //   
  
  
  
  var splitLines = $('.split-text_blurb .blurb-wrap'),
            blurb = splitLines.find('p'),
            splitParent = new SplitText(blurb, {
              type: 'lines',
              linesClass: "bl"
            }),
            splitTitle = new SplitText(splitParent.lines, {
              type: 'lines',
              linesClass: "lines"
            });
          gsap.set(splitLines, {
            visibility: 'visible'
          });
          splitLines.each(function () {
            var block = $(this),
              lines = block.find('.lines');
            var linesTl2 = gsap.timeline({
              scrollTrigger: {
                trigger: block,
                start: "top 75%"
              }
            }).fromTo(lines, {
              yPercent: 100,
              autoAlpha: 0.01
            }, {
              autoAlpha: 0.999,
              yPercent: 0,
              duration: 1.2,
              stagger: 0.1,
              ease: 'cubic'
            });
          });
  
  ////
  
//// BC VIDEO HOVER BLOCK ////

   // Listening to the video element
   let clip = document.querySelector(".bc-top-section-video")

   /* Adding the event listeners on the video to play/pause the video. */
   clip.addEventListener("mouseover", function (e) {
      clip.play();
   })

   /* Applying the mouse out event to pause the video */
   clip.addEventListener("mouseout", function (e) {
      clip.pause();
   })

//// END BC VIDEO HOVER BLOCK /////

  //// PARALLAX IMAGE BLOCK 1 ////
  
  smoother.effects(".icat_parallax", { speed: "0.8" });
  
  //// END PARALLAX IMAGE BLOCK 1 ////
  
  ScrollTrigger.sort();
    ScrollTrigger.refresh(); 
  
  // }
  
  
  //// ICAT PROCESS HOVER BLOCKS ////
  console.clear();
  let targets = document.querySelectorAll(".icat-title");
  let numbers = document.querySelectorAll(".icat-numbers");
  let lines = document.querySelectorAll(".bottom-side-b");
  let articles = document.querySelectorAll(".article");
  let articlesTitles = document.querySelectorAll("h1");
  let activeTab = 0;
  let old = 0;
  let heights = [];
  let dur = 0.4;
  let animation;
  
  function setupTabSlider() {
    for (let i = 0; i < targets.length; i++) {
      targets[i].index = i;
      heights.push(articles[i].offsetHeight); // get height of each article
      gsap.set(articles[i], {top: 0, y:0, opacity: 0}); // push all articles up 20 and opacity 0
      targets[i].addEventListener("mouseover", doCoolStuff);
    }
    
    // set initial article on first tab
    gsap.set(articles[0], {y:0, autoAlpha: 1, });
    gsap.set(targets[0], {color:"#00ffa3"});
    gsap.set(numbers[0], {color:"#00ffa3"});
    gsap.set(lines[0], {width:"100%"});
    // gsap.set(".article-block", {height:heights[0]});
  
    function doCoolStuff() {
      // check if clicked target is new and if the timeline is currently active
      if(this.index != activeTab) {
        //if there's an animation in-progress, jump to the end immediately so there aren't weird overlaps. 
        if (animation && animation.isActive()) {
          animation.progress(1);
        }
        animation = gsap.timeline({
          defaults:{
            duration:0.5,
          }
        });
        old = activeTab;
        activeTab = this.index;
        // change text color on old and new tab targets
        animation.to(targets, {color:"#ddd", x: 0, ease:"none"}, 0);
        animation.to(numbers, {color:"#ddd", x: 0, ease:"none"}, 0);
        animation.to(lines, {duration: 1, width: "0%", ease:"power2.out"}, 0);
        animation.to(targets[activeTab], {color:"#00ffa3", x:10, ease:"power2.out"}, 0);
        animation.to(numbers[activeTab], {color:"#00ffa3", x:0, ease:"none"}, 0);
         animation.to(lines[activeTab], {duration: 1, width: "100%", ease:"power2.out"}, 0);
        // slide current article down out of view and then set it to starting position at top
        animation.to(articles, {y:0, autoAlpha: 0, ease:"back.in" }, 0);
        // animation.set(articles[old], {y:0});
        // resize article block to accommodate new content
        animation.to(".article-block", {height:heights[activeTab]});
        // slide in new article
        animation.to(articles[activeTab], {duration: 0.4, y:0, autoAlpha:2, ease: "power3.inOut"}, "-=1");
        animation.fromTo(articlesTitles[activeTab], {y:0, autoAlpha:0 }, {duration: 0.4, y:0, autoAlpha:2, ease: "ease"}, "-=1");
      }
      
      
    }
    
  }
  
  
  setupTabSlider();

function copywritingSectionBC() {

// intro section
const intro = document.querySelector('.intro_bc');
// an array with the intro text spans that we want to animate (data-direction will define the animation direction)
const introTexts = [...intro.querySelectorAll('.row__text.oh_bc > span')];
// an array with the intro images that will trigger the effect when clicked
const images = [...intro.querySelectorAll('.image_bc')];
// an array with the content sections. These will map with the images (one content element per image)
const contents = [...document.querySelectorAll('.content_bc')];
// an array of arrays for the content text spans (one sub array per content).
let contentTexts = [];
contents.forEach(content => {
    contentTexts.push([...content.querySelectorAll('.oh_bc > span, .oh_bc > *')]);
});
// these will be the area where the intro image will be animated/moved to
const contentRowImages = [...document.querySelectorAll('.content_bc > .content__row--image')];
const contentBackCtrls = [...document.querySelectorAll('.content_bc button.content__back')];

const titles = [...document.querySelectorAll('.row__text.oh_bc > span')];



const elementrow1 = document.querySelector('.row--1');

elementrow1.addEventListener('mouseover', onMouseOver);
function onMouseOver(event) {
const tl=new gsap.timeline();
tl.to(".first_row > *",{scale: 1.25, ease:"cubic"})

    }

    elementrow1.addEventListener('mouseout', onMouseOut);
    function onMouseOut(event) {
    const tl=new gsap.timeline();
    tl.to(".first_row > *",{scale: 1, ease:"cubic"})
        }

const elementrow2 = document.querySelector('.row--2');

elementrow2.addEventListener('mouseover', onMouseOver2);
function onMouseOver2(event) {
const tl=new gsap.timeline();
tl.to(".second_row > *",{scale: 1.25, ease:"cubic"})

    }

    elementrow2.addEventListener('mouseout', onMouseOut2);
    function onMouseOut2(event) {
    const tl=new gsap.timeline();
    tl.to(".second_row > *",{scale: 1, ease:"cubic"})
        }

const elementrow3 = document.querySelector('.row--3');

elementrow3.addEventListener('mouseover', onMouseOver3);
function onMouseOver3(event) {
const tl=new gsap.timeline();
tl.to(".third_row > *",{scale: 1.25, ease:"cubic"})

    }

    elementrow3.addEventListener('mouseout', onMouseOut3);
    function onMouseOut3(event) {
    const tl=new gsap.timeline();
    tl.to(".third_row > *",{scale: 1, ease:"cubic"})
        }


const elementrow4 = document.querySelector('.row--4');

elementrow4.addEventListener('mouseover', onMouseOver4);
function onMouseOver4(event) {
const tl=new gsap.timeline();
tl.to(".fourth_row > *",{scale: 1.25, ease:"cubic"})

    }

    elementrow4.addEventListener('mouseout', onMouseOut4);
    function onMouseOut4(event) {
    const tl=new gsap.timeline();
    tl.to(".fourth_row > *",{scale: 1, ease:"cubic"})
        }

// Opens the content view when clicking on the intro images
const openContent = (title, position) => {
    const image = images[position];
    // Other intro images (we'll need to hide them)
    const otherImages = images.filter((el, index) => index !== position).map(el => el.querySelector('.image__inner'));

    gsap.timeline({
        defaults: {
            duration: 1.1,
            ease: 'power4.inOut',
        }
    })
    .addLabel('start', 0)
    .add(() => {
        // Get state
        const state = Flip.getState(image);
        // Change place
        contentRowImages[position].appendChild(image);
        // Flip
        Flip.from(state, {
            duration: 1.2,
            ease: 'power4.inOut',
            absolute: true
        });

        intro.classList.add('intro--close');
        contents[position].classList.add('content--open');

        // hide back arrow ctrl
        gsap.set(contentBackCtrls[position], {
            xPercent: 20,
            opacity: 0
        });
        // hide text spans
        gsap.set(contentTexts[position], {
            yPercent: 111
        });
    }, 'start')
    .to([introTexts, otherImages], {
        xPercent: (_, target) => {
            switch (target.dataset.direction) {
                case 'right': return 101;
                case 'left': return -101;
                default: return 0;
            }
        },
        yPercent: (_, target) => {
            switch (target.dataset.direction) {
                case 'top': return -101;
                case 'bottom': return 101;
                default: return 0;
            }
        }
    }, 'start')
    .addLabel('content', 'start+=0.7')
    .to(contentTexts[position], {
        ease: 'expo',
        yPercent: 0
    }, 'content')
    .to(contentBackCtrls[position], {
        ease: 'expo',
        xPercent: 0,
        opacity: 1
    }, 'content');

};



const closeContent = (image, position) => {
    
    // Other intro images (we'll need to hide them)
    const otherImages = images.filter(el => el != image).map(el => el.querySelector('.image__inner'));
        
    gsap.timeline({
        defaults: {
            duration: 1.1,
            ease: 'power4.inOut',
        },
        onComplete: () => {
            intro.classList.remove('intro--close');
            contents[position].classList.remove('content--open');
        }
    })
    .addLabel('start', 0)
    .to(contentTexts[position], {
        duration: 0.8,
        yPercent: 111
    }, 'start')
    .to(contentBackCtrls[position], {
        duration: 0.8,
        xPercent: 20,
        opacity: 0
    }, 'start')
    .add(() => {
        // Get state
        const state = Flip.getState(image);
        // Change place
        intro.appendChild(image);
        // Flip
        Flip.from(state, {
            duration: 1.2,
            ease: 'power4.inOut',
            absolute: true
        });
    }, 'start')
    .addLabel('intro', 'start+=0.6')
    .to([introTexts, otherImages], {
        ease: 'expo',
        xPercent: 0,
        yPercent: 0,
        /*stagger: {
            each: 0.08,
            grid: 'auto',
            from: 'random'
        }*/
    }, 'intro');

};

// Images click event
images.forEach((image, position) => {  
    image.addEventListener('click', () => {
        openContent(image, position);
    });
});

titles.forEach((title, position) => {  
    title.addEventListener('click', () => {
        openContent(title, position);
    });
});

contentBackCtrls.forEach((ctrl, position) => {  
    ctrl.addEventListener('click', () => {
        closeContent(images[position], position);
        gsap.to(window, {duration: 0.5, delay:0.5,scrollTo:"#top_scroll"});
    });
});

// LOTTIE COG SPIN SECTION //

LottieScrollTriggerBigCog({
    target: "#big_cog_bc",
    path:
      "https://mrc-website-assets.s3.eu-west-2.amazonaws.com/lottie/big_cog-pale-blue-rev.json",
    /*path: "https://matt-rudd.com/json/wireframemountain.json",*/
    speed: "medium",
    pin: ".LottieSection_bc2",
    start: "top bottom",
    end: "bottom top-=3000",
    scrub: 2.5,
    pinSpacing: true,
    markers: { startColor: "green", endColor: "red", indent: "200px" }
  });
  
  function LottieScrollTriggerBigCog(vars) {
    let playhead = { frame: 0 },
      target = gsap.utils.toArray(vars.target)[0],
      speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" },
      st = {
        trigger: target,
        pin: true,
        start: "top top",
        end: speeds[vars.speed] || "+=1000",
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
  
//   let tlcontoursBigCog = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".LottieSection_bc",
//       start: "bottom+=1000 top",
//       end: "bottom+=4000 top",
//       scrub: true,
//       toggleActions: "play reverse play reverse",
//       markers: { startColor: "yellow", endColor: "pink" }
//     }
//   });
//   tlcontours.to(".web-design-title", { autoAlpha: 0, duration: 0.75});
//   tlcontours.to(".wd-text-container", { y: "-100vh" });

  // tlcontours.to(".lottie-container", { scale: 2, y: 100 }, "<");
  
  //// END LOTTIE


  // DISC SPIN SECTION //

LottieScrollTriggerDisc({
    target: "#disc_bc",
    path:
      "https://mrc-website-assets.s3.eu-west-2.amazonaws.com/lottie/disc_rotor_pale-blue2.json",
    /*path: "https://matt-rudd.com/json/wireframemountain.json",*/
    speed: "medium",
    pin: ".LottieSection_bc",
    start: "top top+=40",
    end: "bottom top-=3000",
    scrub: 2.5,
    pinSpacing: true,
    markers: { startColor: "green", endColor: "red", indent: "200px" }
  });
  
  function LottieScrollTriggerDisc(vars) {
    let playhead = { frame: 0 },
      target = gsap.utils.toArray(vars.target)[0],
      speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" },
      st = {
        trigger: target,
        pin: true,
        start: "top top",
        end: speeds[vars.speed] || "+=1000",
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

  LottieScrollTriggerLittleCog({
    target: "#little_cog_bc",
    path:
      "https://mrc-website-assets.s3.eu-west-2.amazonaws.com/lottie/little_cog-pale-blue.json",
    /*path: "https://matt-rudd.com/json/wireframemountain.json",*/
    speed: "medium",
    pin: ".LottieSection_bc3",
    start: "top-=750 top",
    end: "bottom top",
    scrub: 2.5,
    pinSpacing: true,
    markers: { startColor: "blue", endColor: "coral", indent: "200px" }
  });
  
  function LottieScrollTriggerLittleCog(vars) {
    let playhead = { frame: 0 },
      target = gsap.utils.toArray(vars.target)[0],
      speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" },
      st = {
        trigger: target,
        pin: true,
        start: "top top",
        end: speeds[vars.speed] || "+=1000",
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
  
}

copywritingSectionBC();

  /// SEALSKINZ PINNED GALLERY SECTION ///

 
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

/// END SEALSKINZ PINNED GALLERY SECTION ///

  
  
  //// END ICAT PROCESS HOVER BLOCKS ////
  
  
  //// START ICAT RESULTS COUNTER ////
  
  
  
  //// END ICAT RESULTS COUNTER ////
  
  const items = document.querySelectorAll(".data");
  
  const tl = gsap.timeline({
    paused: true,
    scrollTrigger: {
     trigger: ".results-counter",
      pin: ".results-counter",
      pinSpacing: true,
      start: "top top",
      end: "bottom top"
    }
  });
  
  tl.from(items, {
    textContent: 0,
    duration: 1.5,
    ease: "power1.in",
    snap: { textContent: 1 },
    stagger: {
      each: 1.0,
      onUpdate: function() {
        this.targets()[0].innerHTML = numberWithCommas(Math.ceil(this.targets()[0].textContent));
      },
    }
  });
  
  
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  
  //// WD NEXT/CONTACT SECTION ////
  
  // // TEXT TICKER
  
  gsap.utils.toArray(".wd_stb_line_single").forEach((line, i) => {
    const links = line.querySelectorAll("a"),
      tl = horizontalLoop(links, {
        repeat: -1,
        speed: 1.75,
        reversed: true,
        paddingRight: parseFloat(gsap.getProperty(links[0], "marginRight", "px")) // otherwise first element would be right up against the last when it loops. In this layout, the spacing is done with marginRight.
      });
    links.forEach((link) => {
      link.addEventListener("mouseenter", () =>
        gsap.to(tl, { timeScale: 0, overwrite: true })
      );
      link.addEventListener("mouseleave", () =>
        gsap.to(tl, { timeScale: -1, overwrite: true })
      );
    });
  });
  
  /*
  This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.
  
  Features:
   - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
   - When each item animates to the left or right enough, it will loop back to the other side
   - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
   - The returned timeline will have the following methods added to it:
     - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
     - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
     - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
     - current() - returns the current index (if an animation is in-progress, it reflects the final index)
     - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
   */
  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      xPercents = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      totalWidth,
      curX,
      distanceToStart,
      distanceToLoop,
      item,
      i;
    gsap.set(items, {
      // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
      xPercent: (i, el) => {
        let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
            gsap.getProperty(el, "xPercent")
        );
        return xPercents[i];
      }
    });
    gsap.set(items, { x: 0 });
    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
        gsap.getProperty(items[length - 1], "scaleX") +
      (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
      item = items[i];
      curX = (xPercents[i] / 100) * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop =
        distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond
        },
        0
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
            )
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false
          },
          distanceToLoop / pixelsPerSecond
        )
        .add("label" + i, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index, vars) {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex) {
        // if we're wrapping the timeline's playhead, make the proper adjustments
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }
    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    return tl;
  }
  
  //// END WD NEXT/CONTACT SECTION ////
  
  
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

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, Observer);

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
  
const slidePointerOff = document.querySelectorAll(".slide");

  const toggleCursorBackTexts = isContent => {
      return gsap.timeline({
          onStart: () => {
              gsap.set(DOM.backChars, {opacity: isContent ? 0 : 1});
              if ( isContent ) {
                  DOM.backCtrl.classList.add('frame__back--show');
                  gsap.to(".frame__back--show",{      
                    duration: 1,
                    ease: 'expo',
                    opacity: 1
                  })
                  gsap.to('.follower__inner', {
                    backgroundColor: '#f4f4f4',
                    duration: .4,
                    ease: "power2.inOut"
                  });
                  slidePointerOff.forEach(item => {
                    item.classList.add('blocked');
                });    
                  

              }
          },
          onComplete: () => {
              DOM.backCtrl.classList[isContent ? 'add' : 'remove']('frame__back--show');
              if ( !isContent ) {
                  DOM.backCtrl.classList.remove('frame__back--show');
                  slidePointerOff.forEach(item => {
                      item.classList.remove('blocked');
                  });          
                }
          }
      })
      .to(DOM.cursorChars, {
          duration: 1,
          ease: 'expo',
          y: 110
      })
      .to(".go_back-move", {
          duration: 1,
          ease: 'expo',
          opacity: isContent ? 1 : 0,
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
  preloadImages('.slide__img-inner').then( _ => {
    document.body.classList.remove('loading');

});

}


function initAboutMePageAnim() {

  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('embed-iframe');
    const options = {
        uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'
      };
    const callback = (EmbedController) => {};
    IFrameAPI.createController(element, options, callback);
  };

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
  
  const smoother = ScrollSmoother.create({
    smooth: 2,
    normalizeScroll: true,
    ignoreMobileResize: true,
    effects: true,
    // normalizeScroll: true,
    smoothTouch: 0.1
  });
  
//// TITLE SECTION


  const childSplit = new SplitText(".about-me-top-section-heading", {
    type: "lines",
    linesClass: "split-child"
  });

  const parentSplit = new SplitText(".about-me-top-section-heading", {
    // type: "lines",
    linesClass: "split-parent"
  });
  
  const tl = gsap.timeline();
  tl.from(childSplit.lines, {
    duration: 2.5,
    yPercent: 110,
    ease: "power4",
    stagger: 0.1,
  });
  


//// ABOUT ME HOVER BLOCK ////

   // Listening to the video element
   let clip = document.querySelector(".about-me-top-section-video")

   /* Adding the event listeners on the video to play/pause the video. */
   clip.addEventListener("mouseover", function (e) {
      clip.play();
   })

   /* Applying the mouse out event to pause the video */
   clip.addEventListener("mouseout", function (e) {
      clip.pause();
   })

//// END ABOUT ME VIDEO HOVER BLOCK /////

//// START BORDER-LINE 2 CODE ////

const borderLine2 = document.querySelector(".border_line3");

let borderLineGrow2 = gsap.timeline({
  scrollTrigger: {
    trigger: borderLine2,
    start: "top 75%",
    scrub: false,
    markers: true
  }
});

    borderLineGrow2.to(borderLine2, {
        width: "100%",
        duration: 3,
        ease: "power4.out"
      });

      const childSplit2 = new SplitText("#section_title2", {
        type: "lines",
        linesClass: "split-child"
      });
      const parentSplit2 = new SplitText("#section_title2", {
        // type: "lines",
        linesClass: "split-parent"
      });
      
      borderLineGrow2.from(childSplit2.lines, {
        duration: 2.5,
        yPercent: 110,
        ease: "power4",
        stagger: 0.1
      },0.25);

      borderLineGrow2.from("#smiley_lottie", {
        duration: 2.5,
        opacity:0,
        ease: "power4",
      },"<");


//// END BORDER-LINE 2 CODE ////

// // SPLIT TEXT BLURB //   



// var splitLines = $('.blurb-wrapper .blurb-wrap'),
//           blurb = splitLines.find('p'),
//           splitParent = new SplitText(blurb, {
//             type: 'lines',
//             linesClass: "bl"
//           }),
//           splitTitle = new SplitText(splitParent.lines, {
//             type: 'lines',
//             linesClass: "lines"
//           });
//         gsap.set(splitLines, {
//           visibility: 'visible'
//         });
//         splitLines.each(function () {
//           var block = $(this),
//             lines = block.find('.lines');
//          borderLine2.fromTo(lines, {
//             yPercent: 100,
//             autoAlpha: 0.01
//           }, {
//             autoAlpha: 0.999,
//             yPercent: 0,
//             duration: 5.2,
//             stagger: 0.1,
//             ease: 'cubic'
//           });
//         });

// ////

 // SPLIT TEXT BLURB //   
  
  
  
 const splitLines = $('.split-text_blurb'),
 blurb = splitLines.find('p'),
 splitParent = new SplitText(blurb, {
   type: 'lines',
   linesClass: "bl"
 }),
 splitTitle = new SplitText(splitParent.lines, {
   type: 'lines',
   linesClass: "lines"
 });
gsap.set(splitLines, {
 visibility: 'visible'
});
splitLines.each(function () {
 var block = $(this),
   lines = block.find('.lines');
 var linesTl2 = gsap.timeline({
   scrollTrigger: {
     trigger: block,
     start: "top 75%"
   },
   onComplete() {
    splitParent.revert();
  }
 }).fromTo(lines, {
   yPercent: 100,
   autoAlpha: 0.01
 }, {
   autoAlpha: 0.999,
   yPercent: 0,
   duration: 1.2,
   stagger: 0.1,
   ease: 'cubic'
 });
});

////


const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
scrollColorElems.forEach((colorSection, i) => {
  const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
  const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;

  ScrollTrigger.create({
    trigger: colorSection,
    start: "top 50%",
    markers: {indent: "500px", startColor: "purple", endColor: "yellow"},
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

/// END COLOUR CHANGE ///


// // LOTTIE ANIMATION

// LottieScrollTrigger({
//   target: "#videog-map",
//   path: 
//   "https://assets7.lottiefiles.com/packages/lf20_5rxtcrxl.json",
//   speed: "medium",
//   start: "top 20%",
//   markers: { indent: 300 },
//   id: "lottie"
// });

// function LottieScrollTrigger(vars) {
//   let playhead = { frame: 0 },
//     target = gsap.utils.toArray(vars.target)[0],
//     speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" },
//     st = {
//       trigger: target,
//       // pin: true,
//       start: "top top",
//       end: speeds[vars.speed] || "+=2000",
//       scrub: 1
//     },
//     animation = lottie.loadAnimation({
//       container: target,
//       renderer: vars.renderer || "svg",
//       loop: false,
//       autoplay: false,
//       path: vars.path
//     });
//   for (let p in vars) {
//     // let users override the ScrollTrigger defaults
//     st[p] = vars[p];
//   }
//   animation.addEventListener("DOMLoaded", function () {
//     gsap.to(playhead, {
//       frame: animation.totalFrames - 1,
//       ease: "none",
//       onUpdate: () => animation.goToAndStop(playhead.frame, true),
//       scrollTrigger: st
//     });
//     // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
//     ScrollTrigger.sort();
//     ScrollTrigger.refresh();
//   });
//   return animation;
// }



//// LOTTIE MRC > MCR 

  // Lottie sticker in footer cursor sync //

  LottieInteractivity.create({
    player: '#mrc_mcr',
    mode: 'cursor',
    actions: [
        {
            type: "click",
            forceFlag: false
        }
      ]
    });

/// Spin text under MRC > MCR

// gsap.set("#mrc", {autoAlpha:1})
// gsap.set("#mcr", {rotationX:-90
// })

let split1;
let split2;

split1 = new SplitText("#mrc", {type:"chars"})
//  animation.to('#mrc',{opacity:1, ease: "power2.in", duration: 0.5})
	gsap.set(split1.chars, {transformPerspective:1000})

  	
  split2 = new SplitText("#mcr", {type:"chars"})

  gsap.set(split2.chars, {transformPerspective:1000})
  gsap.set(split2.chars, {opacity: 0})

  let isTimelineRunning = false; 
function runMrc() {

  if (isTimelineRunning) {
    return;
  }

  isTimelineRunning = true; // Set the variable to true to indicate the animation has started


  gsap.set(split2.chars, { opacity: 0 });

// let animation = gsap.timeline({ repeat: -1, defaults: { stagger: 0.015 } });
let animation = gsap.timeline({
  // scrollTrigger: {
  //   trigger: ".mrc_mcr_section",
  //   start: "top middle",
  //   // end: "top top",
  //   toggleActions: "play none reverse reverse",
  //   //              onEnter onLeave onEnterBack onLeaveBack
  //   markers: false
  // }
    onComplete: () => {
      isTimelineRunning = false; // Set the variable to false when the animation is complete
    }
  });

// gsap.set("#mrc",{opacity:1})
	animation.fromTo(split1.chars, {
                'will-change': 'opacity, transform', 
                opacity: 1,
              duration:1, 
							ease: "power2.in"},                
              {
              opacity: 0,
              duration:1, 
							ease: "power2.in"
              });

		animation.fromTo(split2.chars, {
                'will-change': 'opacity, transform', 
                duration:1, 
                opacity: 0,
							ease: "power1.out"}, 
              {
							opacity: 1, 
							ease: "power1.out"},">+0.5");

              animation.to(split2.chars, {
                opacity: 0,
                duration: 1,
                ease: "power1.out"
              },">+0.5")
            
animation.to(split1.chars, {
  opacity: 1,
  duration: 1,
  ease: "power1.out"
},">+0.5")


              }

              // runMrc();

              document.querySelector("#mrc_mcr").addEventListener("click", () => runMrc());


// HORIZONTAL

const horizontalSections = gsap.utils.toArray('section.about-me-horizontal')

horizontalSections.forEach(function (sec, i) {	
  
  var thisPinWrap = sec.querySelector('.about-me-pin-wrap');
  var thisAnimWrap = thisPinWrap.querySelector('.about-me-animation-wrap');
  
  var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth); 
  

    
const tl = gsap.timeline({   
    scrollTrigger: {
      trigger: sec,		
      start: "top top",
      end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth),
      pin: thisPinWrap,
      invalidateOnRefresh: true,
      anticipatePin: 0,
      scrub: true,
      normalizeScroll: true,
          ease: "none",
      // snap: 1,
      markers: true
    }
  })

  .fromTo(thisAnimWrap, { 
    x: () => thisAnimWrap.classList.contains('about-me-to-right') ? 0 : getToValue() 
  }, { 
    x: () => thisAnimWrap.classList.contains('about-me-to-right') ? getToValue() : 0, })

.to("#about-me-quote", {
  "--target": "0%",})

.to("#about-me-nudge-quote", {
  opacity: 0,})

                ScrollTrigger.sort();
      ScrollTrigger.refresh();    
  
})




/// THREE ...
let container_am;
let camera, scene, renderer1;
let uniforms;
let mouse = new THREE.Vector2();
let mouseO = new THREE.Vector2();
let offsets = new THREE.Vector2();

let loader = new THREE.TextureLoader();
let texture, _500;
loader.setCrossOrigin("anonymous");
loader.load(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/noise.png",
  (tex) => {
    texture = tex;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearFilter;

    loader.load(
      "https://mrc-website-assets.s3.eu-west-2.amazonaws.com/MRC-for-three-glow-m-over.png",
      (tex) => {
        _500 = tex;

        init();
        animate();
      }
    );
  }
);

function init() {
  container_am = document.getElementById("container_am");

  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();

  var geometry = new THREE.PlaneBufferGeometry(2, 2);

  uniforms = {
    u_time: {
      type: "f",
      value: 1.0
    },
    u_resolution: {
      type: "v2",
      value: new THREE.Vector2()
    },
    u_pxaspect: {
      type: "f",
      value: window.devicePixelRatio
    },
    u_noise: {
      type: "t",
      value: texture
    },
    u_text500: {
      type: "t",
      value: _500
    },
    u_mouse: {
      type: "v2",
      value: new THREE.Vector2(-0.1, -0.1)
    }
  };

  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: `
          void main() {
              gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }
      `,
    fragmentShader: `
      uniform vec2 u_resolution;
    uniform float u_pxaspect;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform sampler2D u_noise;
    uniform sampler2D u_text500;
    uniform bool u_mousemoved;
    
    #define PI 3.141592653589793
    #define TAU 6.283185307179586
  
    const bool addNoise = true; // Whether to add noise to the rays
    const float decay = .96; // the amount to decay each sample by
    const float exposure = .35; // the screen exposure
    const float lightStrength = 3.5;
    const vec3 lightcolour = vec3(1.5, 1.6, .6); // the colour of the light
    const vec3 falloffcolour = vec3(.0, 1.0, 2.3); // the colour of the falloff
    // const vec3 bgcolour = vec3(.0, 0.25, .25); 
      const vec3 bgcolour = vec3(0.102,0.102,0.102); // the base 
    // the base colour of the render
    const float falloff = .5;
    const int samples = 12; // The number of samples to take
    const float density = .98; // The density of the "smoke"
    const float weight = .25; // how heavily to apply each step of the supersample
    const int octaves = 1; // the number of octaves to generate in the FBM noise
    const float seed = 43758.5453123; // A random seed :)
    
    vec2 res;
    
    float starSDF(vec2 st, int V, float s) {
        // st = st*4.-2.;
        float a = atan(st.y, st.x)/TAU;
        float seg = a * float(V);
        a = ((floor(seg) + 0.5)/float(V) + 
            mix(s,-s,step(.5,fract(seg)))) 
            * TAU;
        return abs(dot(vec2(cos(a),sin(a)),
                       st));
    }
    
    float random2d(vec2 uv) {
      uv /= 256.;
      vec4 tex = texture2D(u_noise, uv);
      return mix(tex.x, tex.y, tex.a);
    }
    vec2 random2(vec2 st, float seed){
        st = vec2( dot(st,vec2(127.1,311.7)),
                  dot(st,vec2(269.5,183.3)) );
        return -1.0 + 2.0*fract(sin(st)*seed);
    }
    
    // Value Noise by Inigo Quilez - iq/2013
    // https://www.shadertoy.com/view/lsf3WH
    float noise(vec2 st, float seed) {
      vec3 x = vec3(st, 1.);
      vec3 p = floor(x);
      vec3 f = fract(x);
      f = f*f*(3.0-2.0*f);
      vec2 uv = (p.xy+vec2(37.0,17.0)*p.z) + f.xy;
      vec2 rg = texture2D(u_noise, (uv+0.5) / 256., 0.).yx - .5;
      return mix( rg.x, rg.y, f.z );
    }
    
    float fbm1(in vec2 _st, float seed) {
      float v = 0.0;
      float a = 0.5;
      vec2 shift = vec2(100.0);
      // Rotate to reduce axial bias
      mat2 rot = mat2(cos(0.5), sin(0.5),
                      -sin(0.5), cos(0.50));
      for (int i = 0; i < octaves; ++i) {
          v += a * noise(_st, seed);
          _st = rot * _st * 2.0 + shift;
          a *= 0.4;
      }
      return v + .4;
    }
    
    float pattern(vec2 uv, float seed, float time, inout vec2 q, inout vec2 r) {
  
      q = vec2( fbm1( uv + vec2(0.0,0.0), seed ),
                     fbm1( uv + vec2(5.2,1.3), seed ) );
  
      r = vec2( fbm1( uv + 4.0*q + vec2(1.7 - time / 2.,9.2), seed ),
                     fbm1( uv + 4.0*q + vec2(8.3 - time / 2.,2.8), seed ) );
  
      float rtn = fbm1( uv + 4.0*r, seed );
  
      return rtn;
    }
    
    float tri(vec2 uv) {
      uv = (uv * 2.-1.)*2.;
      return max(abs(uv.x) * 0.866025 + uv.y * 0.5, -uv.y * 0.5);
    }
    float smin(float a, float b, float k) {
        float res = exp(-k*a) + exp(-k*b);
        return -log(res)/k;
    }
  
    float shapes(vec2 uv) {
  //     vec2 _uv = uv * .1;
      
  //     const float k = 6.0;
  //     const float w = 2.0;
  //     const float t = .5;
      
  //     float i = floor(length(uv)*k);
      
  //     float c = cos(cos(u_time * .3) * 3. / i * 5.);
  //     float s = sin(cos(u_time * .3) * 3. / i * 5.);
  //     uv *= mat2(c, -s, s, c);
      
  //     vec2 radial = vec2(i, atan(uv.y, uv.x));
      
  //     radial = vec2((i + .5)*(1.0/k), 
  //              (floor(radial.y*(1.0/PI)*(i*w+t)) + 0.5 ) * PI/(i*w+t));
    
  //     vec2 cart = vec2(cos(radial.y), sin(radial.y)) * radial.x;
      
  //     float shade = length(uv-cart) * 30.;
      
  //     return smoothstep(0.5, 0.5 + fwidth(shade), shade - 0.02);
      
      uv += u_mouse * .1;
      
      float aspect = res.x / res.y;
      
      float scale = 1. / aspect * .3;
      
      return texture2D(u_text500, (uv) * scale + .5, -1.).x;
      
    }
    
    float occlusion(vec2 uv, vec2 lightpos, float objects) {
      return (1. - smoothstep(0.0, lightStrength, length(lightpos - uv))) * (1. - objects);
    }
    
    vec4 mainRender(vec2 uv, inout vec4 fragcolour) {
    
      float scale = 4.;
      uv *= scale;
      
      float exposure = exposure + (sin(u_time) * .5 + 1.) * .05;
  
      vec2 _uv = uv;
      vec2 lightpos = (vec2(u_mouse.x, u_mouse.y * -1.)) / u_resolution.y;
      lightpos = u_mouse * scale;
      
      if(!u_mousemoved) {
        // lightpos.x += cos(u_time * .25);
        // lightpos.y += sin(u_time * .5);
      }
      
      float obj = shapes(uv);
      float map = occlusion(uv, lightpos, obj);
      // dither = 0.;
  
      float _pattern = 0.;
      vec2 q = vec2(0.);
      vec2 r = vec2(0.);
      if(addNoise) {
        _pattern = pattern(_uv * 3. , seed, u_time, q, r) / 2.;
      }
  
      vec2 dtc = (_uv - lightpos) * (1. / float(samples) * density);
      // dtc += _pattern / 80.;
      float illumination_decay = 1.;
      vec3 basecolour = bgcolour;
  
      for(int i=0; i<samples; i++) {
        _uv -= dtc;
        if(addNoise) {
          uv += _pattern / 16.;
        }
        
        float movement = u_time * 20. * float(i + 1);
        
        float dither = random2d(uv * 512. + mod(vec2(movement*sin(u_time * .5), -movement), 1000.)) * 2.;
  
        float stepped_map = occlusion(uv, lightpos, shapes(_uv+dtc*dither));
        stepped_map *= illumination_decay * weight;
        illumination_decay *= decay;
  
        map += stepped_map;
      }
  
      float l = length(lightpos - uv);
  
      vec3 lightcolour = mix(lightcolour, falloffcolour, l*falloff);
  
      vec3 colour = vec3(basecolour+map*exposure*lightcolour);
      
      fragcolour = vec4(colour,1.0);
      return fragcolour;
    }
  
  void main() {
    res = u_resolution / u_pxaspect;
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
    
    mainRender(uv, gl_FragColor);
  }
      `
  });
  material.extensions.derivatives = true;

  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer1 = new THREE.WebGLRenderer();
  renderer1.setPixelRatio(window.devicePixelRatio);

  // NEW PLACEMENT CODE - CONTAINER.CLIENTH/W

  renderer1.setSize(container_am.clientWidth, container_am.clientHeight);

  ///// NEED TO TWEAK SHADER MOVEMENT TO MATCH!

  container_am.appendChild(renderer1.domElement);

  onWindowResize();
  window.addEventListener("resize", onWindowResize, false);

  document.addEventListener("pointermove", (e) => {
    mouseO.x = e.clientX;
    mouseO.y = e.clientY;

    mouse.x = ((mouseO.x - offsets.x) / container_am.offsetWidth) * 2 - 1;
    mouse.y = -((mouseO.y - offsets.y) / container_am.offsetHeight) * 2 + 1;

    uniforms.u_mouse.value.x = mouse.x;
    uniforms.u_mouse.value.y = mouse.y;

    e.preventDefault();
  });
}

window.addEventListener("scroll", function () {
  // container_am = document.getElementById('container_am');
  // offsets.x = container_am.offsetLeft - window.pageXOffset
  // offsets.y = container_am.offsetTop - window.pageYOffset
  // mouse.x = ((mouseO.x - offsets.x) / container_am.offsetWidth) * 2 - 1;
  // mouse.y = -((mouseO.y - offsets.y) / container_am.offsetHeight) * 2 + 1;
  // uniforms.u_mouse.value.x = mouse.x
  // uniforms.u_mouse.value.y = mouse.y
});

function onWindowResize() {
  renderer1.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = renderer1.domElement.width;
  uniforms.u_resolution.value.y = renderer1.domElement.height;
}

function animate(delta) {
  requestAnimationFrame(animate);
  render(delta);
}

function render(delta) {
  uniforms.u_time.value = delta * 0.0005;
  renderer1.render(scene, camera);

  /* } */
}

}



function initCopywritingPageAnim() {

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
  

const scroller = document.querySelector("#smooth-content");

const smoother = ScrollSmoother.create({
  el: scroller,
  smooth: 2,
  effects: true,
  // normalizeScroll: true,
  smoothTouch: 0.1
});


// /*//// SCROLL ARROW HIDE! /////*/

// // SPLIT TEXT + ARROW //
// const childSplit = new SplitText(".text-block-49", {
//   type: "lines",
//   linesClass: "split-child"
// });
// const parentSplit = new SplitText(".text-block-49", {
//   // type: "lines",
//   linesClass: "split-parent"
// });

// const tl = gsap.timeline();
// tl.from(childSplit.lines, {
//   duration: 2.5,
//   yPercent: 100,
//   ease: "power4",
//   stagger: 0.1,
//   toggleActions: "play none reverse reverse"
// });
// tl.fromTo(
//   ".copy-scroll-arrow",
//   {
//     opacity: 0
//   },
//   { opacity: 1, duration: 1, ease: "power4" },
//   "-=1.5"
// );
// tl.fromTo(
//   ".copy-scroll-arrow",
//   {
//     opacity: 1
//   },
//   { opacity: 0, duration: 1, ease: "power4" },
//   5
// );

// ///

const sections = gsap.utils.toArray(".copyw-section");

let maxWidth = 0;

const getMaxWidth = () => {
  maxWidth = 0;
  sections.forEach((section) => {
    maxWidth += section.offsetWidth;
  });
};
getMaxWidth();
ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

let scrollTween = gsap.to(sections, {
  x: () => -(maxWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: ".copyw-container",
    pin: true,
    scrub: true,
    end: "+=5000",
    invalidateOnRefresh: true
  }
});

// ScrollTrigger.create({
//   start: 0.1,
//   end: () => ScrollTrigger.maxScroll(window) - 1,
//   refreshPriority: -100, // always update last
//   onLeave: (self) => {
//     self.scroll(self.start + 1);
//     ScrollTrigger.update();
//   },
//   onLeaveBack: (self) => {
//     self.scroll(self.end - 1);
//     ScrollTrigger.update();
//   }
// });

///// QUOTE BGRND TEXT ANIM /////

let tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".quote-section",
    start: "top+=2000",
    end: "top+=2450",
    // scrub: 1,
    toggleActions: "play none reverse reverse",
    //              onEnter onLeave onEnterBack onLeaveBack
    markers: false
  }
});

tl1.from(".copy-simplicity-backdrop", {
  x: 500,
  autoAlpha: 0,
  duration: 2,
  ease: "power2.inOut"
});

tl1.from(
  ".copy-clarity-backdrop",
  {
    x: -500,
    autoAlpha: 0,
    duration: 2,
    ease: "power2.inOut"
  },
  0.5
);

tl1.from(
  ".quote-main-text",
  {
    autoAlpha: 0,
    duration: 2,
    ease: "power2.inOut"
  },
  1.75
);

tl1.from(
  ".quote-caption",
  {
    autoAlpha: 0,
    duration: 2,
    ease: "power2.inOut"
  },
  2.25
);

tl1.from(
  ".quote-body-text",
  {
    autoAlpha: 0,
    duration: 2,
    ease: "power2.inOut"
  },
  1.5
);

///// W>O>R>D /////

let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".word-section",
    start: "top+=600",
    end: "bottom+=650",
    // scrub: 1,
    toggleActions: "play none reverse reverse",
    //              onEnter onLeave onEnterBack onLeaveBack
    markers: false
  }
});

tl2.from(".big-w", {
  y: 1100,
  autoAlpha: 0,
  duration: 2,
  // ease: "power2.inOut"
  ease: "back.out(0.75)"
});

let tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".word-section",
    start: "top+=650",
    end: "bottom+=700",
    // scrub: 1,
    toggleActions: "play none reverse reverse",
    //              onEnter onLeave onEnterBack onLeaveBack
    markers: false
  }
});

tl3.from(".big-o", {
  y: -1100,
  autoAlpha: 0,
  duration: 2,
  ease: "back.out(0.75)"
});

let tl4 = gsap.timeline({
  scrollTrigger: {
    trigger: ".word-section",
    start: "top+=750",
    end: "bottom+=800",
    // scrub: 1,
    toggleActions: "play none reverse reverse",
    //              onEnter onLeave onEnterBack onLeaveBack
    markers: false
  }
});

tl4.from(".big-r", {
  y: 1100,
  autoAlpha: 0,
  duration: 2,
  ease: "back.out(0.75)"
});

let tl5 = gsap.timeline({
  scrollTrigger: {
    trigger: ".word-section",
    start: "top+=850",
    end: "bottom+=900",
    // scrub: 1,
    toggleActions: "play none reverse reverse",
    //              onEnter onLeave onEnterBack onLeaveBack
    markers: false
  }
});

tl5.from(".big-d", {
  y: -1100,
  autoAlpha: 0,
  duration: 2,
  ease: "back.out(0.75)"
});

///// VARIABLE TEXT GROW ////

// select = (e) => document.querySelector(e);

// let fontSize = gsap.getProperty(":root", "--fontSize");
// let txt = select(".final-text-text");
// let frame = select(".frame");
// let face = select(".face--front");
// let numLines = 10;

let tlx = gsap.timeline({
  scrollTrigger: {
    trigger: ".final-text-section",
    start: "top+=3850",
    end: "top+=4100",
    scrub: 1,
    markers: false
  }
});

tlx.to(".final-text-text", {
  fontWeight: 900,
  stagger: {
    each: 0.07
  },
  duration: 2,
  ease: "power2.inOut"
});

// SPLIT TEXT SERVICES SECTION //
const childSplit2 = new SplitText(".services-heading", {
  type: "lines",
  linesClass: "split-child"
});
const parentSplit2 = new SplitText(".services-heading", {
  // type: "lines",
  linesClass: "split-parent"
});

const childSplit3 = new SplitText(".copy-body", {
  type: "lines",
  linesClass: "split-child"
});
const parentSplit3 = new SplitText(".copy-body", {
  // type: "lines",
  linesClass: "split-parent"
});

let tl6 = gsap.timeline({
  scrollTrigger: {
    trigger: ".services-section",
    start: "top+=1250",
    end: "top+=1350",
    scrub: 1,
    markers: true,
    toggleActions: "play none reverse reverse"
  }
});

tl6.from(childSplit2.lines, {
  duration: 2.5,
  yPercent: 100,
  ease: "power4",
  stagger: 0.1,
  opacity: 0
});

tl6.from(childSplit3.lines, {
  duration: 2.5,
  yPercent: 100,
  ease: "power4",
  stagger: 0.1,
  opacity: 0
});

    
    };
 
  // Lottie back home sticker //

  LottieInteractivity.create({
    player: '#bh-sticker',
    mode: 'cursor',
    container: '#smooth-content',
    actions: [
        {
            position: { x: [0, 1], y: [0, 1] },
            type: 'seek',
            frames: [0, 75],
        }
    ]
  });
  
///// END COPYWRITING CODE /////
  
function initVideographyPageAnim() {

//  var cssId = 'myCss'; // you could encode the css path itself to generate id..
//   if (!document.getElementById(cssId)) {
//       var head = document.getElementsByTagName('head')[0];
//       var link = document.createElement('link');
//       link.id = cssId;
//       link.rel = 'stylesheet';
//       link.type = 'text/css';
//       link.href = 'css/videography.css';
//       link.media = 'all';
//       head.appendChild(link);

//   }


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const scroller = document.querySelector("#smooth-content");

const smoother = ScrollSmoother.create({
  el: scroller,
  smooth: 2,
  effects: true,
  // normalizeScroll: true,
  smoothTouch: 0.1
});

  // SPLIT TEXT BLURB //   
  
  
  
  var splitLines = $('.split-text_blurb .blurb-wrap'),
            blurb = splitLines.find('p'),
            splitParent = new SplitText(blurb, {
              type: 'lines',
              linesClass: "bl"
            }),
            splitTitle = new SplitText(splitParent.lines, {
              type: 'lines',
              linesClass: "lines"
            });
          gsap.set(splitLines, {
            visibility: 'visible'
          });
          splitLines.each(function () {
            var block = $(this),
              lines = block.find('.lines');
            var linesTl2 = gsap.timeline({
              scrollTrigger: {
                trigger: splitLines,
                start: "top 33.33%"
              }
            }).fromTo(lines, {
              yPercent: 100,
              autoAlpha: 0.01
            }, {
              autoAlpha: 0.999,
              yPercent: 0,
              duration: 1.2,
              stagger: 0.1,
              ease: 'cubic'
            });
          });
  
  ////

// let st = ScrollTrigger.create({
//   trigger: ".videog-left-side-column",
//   pin: ".videog-right-side-column",
//   start: "top top",
//   pinSpacing: true,
//   anticipatePin: 1,
//   end: "bottom top",
//   markers: false
// });

// // LOTTIE ANIMATION

// LottieScrollTrigger({
//   target: "#videog-map",
//   path:
//     "https://mrc-website-assets.s3.eu-west-2.amazonaws.com/Seattle-Zoom4.json",
//   speed: "medium",
//   pin: ".videog-left-side-column",
//   start: "top 20%",
//   end: "+=2000",
//   pinnedContainer: ".videog-left-side-column",
//   scrub: 1,
//   pinSpacing: true,
//   markers: false
// });


let st = ScrollTrigger.create({
  trigger: ".videog-left-side-column",
  pin: ".videog-right-side-column",
  start: "top top",
  // pinSpacing: true,
  anticipatePin: 1,
  end: "bottom top+=1000",
  markers: true
});

// LOTTIE ANIMATION

LottieScrollTrigger({
  target: "#videog-map",
  path: 
  "https://mrc-website-assets.s3.eu-west-2.amazonaws.com/Seattle-Zoom4.json",
  speed: "medium",
  pin: ".videog-left-side-column",
  start: "top 20%",
  end: (self) => self.previous().end,
  // end: "top top",
  scrub: 1,
  markers: { indent: 300 },
  id: "lottie"
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

// //Not loading after above animation!?//
// const boxes = gsap.utils.toArray(".box");

// // Set things up
// gsap.set(boxes, { autoAlpha: 0, y: 100 });

// boxes.forEach((box, i) => {
//   // Set up your animation
//   const anim = gsap.to(box, {
//     delay: 1,
//     duration: 2,
//     autoAlpha: 1,
//     y: 0,
//     ease: "power3",
//     paused: true
//   });

//   // Use callbacks to control the state of the animation
//   ScrollTrigger.create({
//     trigger: box,
//     pinnedContainer: ".LottieSection",
//     end: "top top",
//     once: true,
//     markers: true,
//     onEnter: (self) => {
//       // If it's scrolled past, set the state
//       // If it's scrolled to, play it
//       self.progress === 1 ? anim.progress(1) : anim.play();
//     }
//   });
// });






//// START HORIZONTAL SECTION CODE

//Horizontal Scroll Galleries
let horizontalSection = document.querySelector('.videog-horiz-gallery-wrapper')

console.log(horizontalSection.scrollWidth)

gsap.to('.videog-horiz-gallery-wrapper', {
  x: () => horizontalSection.scrollWidth * -1,
  xPercent: 100,
  scrollTrigger: {
    trigger: '.videog-horiz-gallery-wrapper',
    start: 'center center',
    end: '+=3000px',
    pin: '.videog-container-fluid',
    scrub: true,
    markers: true,
    invalidateOnRefresh: true,
  }
})

      ScrollTrigger.addEventListener("refreshInit", refresh);
    // });


  ScrollTrigger.refresh(); 
  



//// END HORIZONTAL SECTION CODE


}


//// START BRAND DEVELOPMENT CODE ////

function initBrandDevelopmentAnims() {

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
  
  const smoother = ScrollSmoother.create({
    smooth: 2,
    normalizeScroll: true,
    ignoreMobileResize: true,
    effects: true,
    // normalizeScroll: true,
    smoothTouch: 0.1
  });

}

//// END BRAND DEVELOPMENT CODE ////


//// START GRAPHIC DESIGN CODE ////

function initGraphicDesignAnims() {

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
  
  const smoother = ScrollSmoother.create({
    smooth: 2,
    normalizeScroll: true,
    ignoreMobileResize: true,
    effects: true,
    // normalizeScroll: true,
    smoothTouch: 0.1
  });

// GRAPHICS MAIN HEADER TICKER CODE //

let setupTicker = (function() {
    $("#graphics-ticker .graphics-container-fluid span").wrapAll("<span class='ticker-wrapper'>");

    var tickerWidth = $(".ticker-wrapper").width(),
        spanWidth = $(".ticker-wrapper span").width(),
        speed = 160,
        proxy = { timeScale: 0 },
        pipe = gsap.utils.pipe(
            gsap.utils.clamp(-10, 10),
            gsap.utils.snap(0.125)
        ),
        tl = gsap.timeline({
                repeat: -1,
                onReverseComplete: () => tl.iteration(10),
                scrollTrigger: {
                    // pinnedContainer: "#main",
                    trigger: "#graphics-ticker",
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


// TITLE SPLITTEXT ANIMS //

gsap.utils.toArray(".logos-number-1").forEach(function (elem) {
  const SplitLine = new SplitText(elem, {
    type: "lines",
    linesClass: "ts-line"
  });
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: elem,
      start: "top 40%",
      markers: false
      // toggleActions: "restart pause resume reverse",
    }
  });
  tl.set(elem, { autoAlpha: 1 });
  tl.from(SplitLine.lines, {
    duration: 2,
    y: 235,
    ease: "power3",
    stagger: 0.05,
    autoAlpha: 1
  });
});

// IMAGE PARALLAX REVEAL ANIMS //

let revealContainers = document.querySelectorAll(".reveal");

revealContainers.forEach((container) => {
  let image = container.querySelector(".logos-image-1");
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      toggleActions: "play none none none"
    }
  });

  tl.set(container, { autoAlpha: 1 });
  tl.from(container, 1.5, {
    yPercent: 100,
    ease: Power2.out
  });
  // tl.from(image, 1.5, {
  //   yPercent: -100,
  //   scale: 1.3,
  //   delay: -1.5,
  //   ease: Power2.out
  // });
});


// TITLES SPLIT_TEXT //

// SPLIT TEXT BLURB //   

var splitLines = $('.split-text_blurb .blurb-wrap'),
          blurb = splitLines.find('p'),
          splitParent = new SplitText(blurb, {
            type: 'lines',
            linesClass: "bl"
          }),
          splitTitle = new SplitText(splitParent.lines, {
            type: 'lines',
            linesClass: "lines"
          });
        gsap.set(splitLines, {
          visibility: 'visible'
        });
        splitLines.each(function () {
          var block = $(this),
            lines = block.find('.lines');
          var linesTl2 = gsap.timeline({
            scrollTrigger: {
              trigger: block,
              start: "top 75%"
            }
          }).fromTo(lines, {
            yPercent: 100,
            autoAlpha: 0.01
          }, {
            autoAlpha: 0.999,
            yPercent: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: 'cubic'
          });
        });

////

// IMAGE PARALLAX VERSION 2! //

let revealContainers2 = document.querySelectorAll(".g_reveal");

revealContainers2.forEach((container) => {
  let image = container.querySelector(".logos-image-3");
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      toggleActions: "play none none none"
    }
  });

  tl.set(container, { autoAlpha: 1 });
  tl.from(container, 1.5, {
    xPercent: -100,
    ease: Power2.out
  });
  tl.from(image, 1.5, {
    xPercent: 100,
    scale: 1.3,
    delay: -1.5,
    ease: Power2.out
  });
});


// LOGO MARQUEE VERTICAL SCROLL ANIM //

// 1. LOGOS //

// const wrapper = document.querySelector(".wrapper");
// const colors = ["#f38630","#6fb936", "#ccc", "#6fb936"];
const boxes = gsap.utils.toArray(".gbox");

// gsap.set(boxes , {
// 	backgroundColor: gsap.utils.wrap(colors)
// });

const loop = horizontalLoop(".gbox", {
  reversed: true,
  repeat: -1
});

// boxes.forEach((box, i) => box.addEventListener("click", () => loop.toIndex(i, {duration: 0.8, ease: "power1.inOut"})));

// document.querySelector(".toggle").addEventListener("click", () => wrapper.classList.toggle("show-overflow"));
// document.querySelector(".next").addEventListener("click", () => loop.next({duration: 0.4, ease: "power1.inOut"}));
// document.querySelector(".prev").addEventListener("click", () => loop.previous({duration: 0.4, ease: "power1.inOut"}));

/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
 */
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    }
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          )
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}

const tlfade = gsap.timeline({
  scrollTrigger: {
    trigger: ".ninety-deg",
    start: "bottom 70%",
    // scrub: true,
    markers: true,
    toggleActions: "play reverse play reverse"
  }
});

tlfade.to(".gwrapper", { opacity: 0, duration: 0.5 }, 0.5);


// 2. POSTERS //

// const wrapper = document.querySelector(".wrapper");
// const colors = ["#f38630","#6fb936", "#ccc", "#6fb936"];
const boxes2 = gsap.utils.toArray(".gbox2");

// gsap.set(boxes , {
// 	backgroundColor: gsap.utils.wrap(colors)
// });

const loop2 = horizontalLoop(".gbox2", {
  reversed: true,
  repeat: -1
});

// boxes.forEach((box, i) => box.addEventListener("click", () => loop.toIndex(i, {duration: 0.8, ease: "power1.inOut"})));

// document.querySelector(".toggle").addEventListener("click", () => wrapper.classList.toggle("show-overflow"));
// document.querySelector(".next").addEventListener("click", () => loop.next({duration: 0.4, ease: "power1.inOut"}));
// document.querySelector(".prev").addEventListener("click", () => loop.previous({duration: 0.4, ease: "power1.inOut"}));

/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
 */
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl2 = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl2.totalTime(tl2.rawTime() + tl2.duration() * 100)
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    }
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl2.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          )
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl2.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl2.duration()) };
      time += tl2.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl2.tweenTo(time, vars);
  }
  tl2.next = (vars) => toIndex(curIndex + 1, vars);
  tl2.previous = (vars) => toIndex(curIndex - 1, vars);
  tl2.current = () => curIndex;
  tl2.toIndex = (index, vars) => toIndex(index, vars);
  tl2.times = times;
  tl2.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl2.vars.onReverseComplete();
    tl2.reverse();
  }
  return tl2;
}

const tl2fade = gsap.timeline({
  scrollTrigger: {
    trigger: ".ninety-deg2",
    start: "bottom 70%",
    // scrub: true,
    markers: true,
    toggleActions: "play reverse play reverse"
  }
});

tl2fade.to(".gwrapper2", { opacity: 0, duration: 0.5 }, 0.5);



// 3. PRESENTATIONS //

// const wrapper = document.querySelector(".wrapper");
// const colors = ["#f38630","#6fb936", "#ccc", "#6fb936"];
const boxes3 = gsap.utils.toArray(".gbox3");

// gsap.set(boxes , {
// 	backgroundColor: gsap.utils.wrap(colors)
// });

const loop3 = horizontalLoop(".gbox3", {
  reversed: true,
  repeat: -1
});

// boxes.forEach((box, i) => box.addEventListener("click", () => loop.toIndex(i, {duration: 0.8, ease: "power1.inOut"})));

// document.querySelector(".toggle").addEventListener("click", () => wrapper.classList.toggle("show-overflow"));
// document.querySelector(".next").addEventListener("click", () => loop.next({duration: 0.4, ease: "power1.inOut"}));
// document.querySelector(".prev").addEventListener("click", () => loop.previous({duration: 0.4, ease: "power1.inOut"}));

/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
 */
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl3 = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl3.totalTime(tl3.rawTime() + tl3.duration() * 100)
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    }
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl3.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          )
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl3.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl3.duration()) };
      time += tl3.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl3.tweenTo(time, vars);
  }
  tl3.next = (vars) => toIndex(curIndex + 1, vars);
  tl3.previous = (vars) => toIndex(curIndex - 1, vars);
  tl3.current = () => curIndex;
  tl3.toIndex = (index, vars) => toIndex(index, vars);
  tl3.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl3.vars.onReverseComplete();
    tl3.reverse();
  }
  return tl3;
}

const tl3fade = gsap.timeline({
  scrollTrigger: {
    trigger: ".ninety-deg3",
    start: "bottom 70%",
    // scrub: true,
    markers: true,
    toggleActions: "play reverse play reverse"
  }
});

tl3fade.to(".gwrapper3", { opacity: 0, duration: 0.5 }, 0.5);

// 4. REPORTS //

// const wrapper = document.querySelector(".wrapper");
// const colors = ["#f38630","#6fb936", "#ccc", "#6fb936"];
const boxes4 = gsap.utils.toArray(".gbox4");

// gsap.set(boxes , {
// 	backgroundColor: gsap.utils.wrap(colors)
// });

const loop4 = horizontalLoop(".gbox4", {
  reversed: true,
  repeat: -1
});

// boxes.forEach((box, i) => box.addEventListener("click", () => loop.toIndex(i, {duration: 0.8, ease: "power1.inOut"})));

// document.querySelector(".toggle").addEventListener("click", () => wrapper.classList.toggle("show-overflow"));
// document.querySelector(".next").addEventListener("click", () => loop.next({duration: 0.4, ease: "power1.inOut"}));
// document.querySelector(".prev").addEventListener("click", () => loop.previous({duration: 0.4, ease: "power1.inOut"}));

/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
 */
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl4 = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl4.totalTime(tl4.rawTime() + tl4.duration() * 100)
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    }
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl4.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          )
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl4.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl4.duration()) };
      time += tl4.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl4.tweenTo(time, vars);
  }
  tl4.next = (vars) => toIndex(curIndex + 1, vars);
  tl4.previous = (vars) => toIndex(curIndex - 1, vars);
  tl4.current = () => curIndex;
  tl4.toIndex = (index, vars) => toIndex(index, vars);
  tl4.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl4.vars.onReverseComplete();
    tl4.reverse();
  }
  return tl4;
}

const tl4fade = gsap.timeline({
  scrollTrigger: {
    trigger: ".ninety-deg4",
    start: "bottom 70%",
    // scrub: true,
    markers: true,
    toggleActions: "play reverse play reverse"
  }
});

tl4fade.to(".gwrapper4", { opacity: 0, duration: 0.5 }, 0.5);

}

//// END GRAPHIC DESIGN CODE ////

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


  LottieScrollTriggerGlobe({
    target: "#globe_contours",
    path:
      "https://mrc-website-assets.s3.eu-west-2.amazonaws.com/lottie/globe-spin.json",
    /*path: "https://matt-rudd.com/json/wireframemountain.json",*/
    speed: "medium",
    pin: ".wd-header-container",
    start: "top top",
    end: "bottom top-=7500",
    scrub: 1,
    pinSpacing: true,
    markers: { startColor: "green", endColor: "red", indent: "200px" }
  });
  
  function LottieScrollTriggerGlobe(vars) {
    let playhead = { frame: 0 },
      target = gsap.utils.toArray(vars.target)[0],
      speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" },
      st = {
        trigger: target,
        pin: true,
        start: "top top",
        end: speeds[vars.speed] || "+=1000",
        scrub: 1,
        refreshPriority: 14,
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
  
  let tlcontours = gsap.timeline({
    scrollTrigger: {
      trigger: "#globe_contours",
      start: "bottom 80%",
      end: "bottom+=5500 top",
      scrub: true,
      toggleActions: "play reverse play reverse",
      markers: { startColor: "yellow", endColor: "pink" },
      refreshPriority: 13,
    }
  });
  tlcontours.to(".web-design-title", { autoAlpha: 1, duration: 0.75},"0");
  tlcontours.to(".wd-text-container", { y: "-100vh", duration: 2 },"<");
  tlcontours.to(".web-design-title", { autoAlpha: 0, duration: 0.75},"+=1");

  // tlcontours.to(".lottie-container", { scale: 2, y: 100 }, "<");
  
  //// END LOTTIE
  
  ///// END LOTTIE GLOBE SECTION


// const globetl = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".second-section-overlap",
//     start: "top bottom+=500",
//     scrub: true,
//     markers: false,
//     toggleActions: "play reverse play reverse"
//   }
// });

// globetl.to(".second-section-overlap", { y: "-100vh", duration: 1 }, 1);


//// BG FIXED GLOVE SPIN

LottieScrollTriggerBG({
  target: "#globe_inside",
  path:
    "https://mrc-website-assets.s3.eu-west-2.amazonaws.com/lottie/globe-inside-drk.json",
  /*path: "https://matt-rudd.com/json/wireframemountain.json",*/
  speed: "medium",
  pin: ".globe-inside-bg-container",
  start: "top top",
  end: "bottom top-=15000",
  scrub: 1,
  pinSpacing: false,
  refreshPriority: 12,
  markers: { startColor: "green", endColor: "red", indent: "200px" }
});

function LottieScrollTriggerBG(vars) {
  let playhead = {frame: 0},
    target = gsap.utils.toArray(vars.target)[0],
    speeds = {slow: "+=2000", medium: "+=1000", fast: "+=500"},
    st = {trigger: target, pin: true, start: "top top", end: speeds[vars.speed] || "+=1000", scrub: 1},
    animation = lottie.loadAnimation({
      container: target,
      renderer: vars.renderer || "svg",
      loop: false,
      autoplay: false,
      path: vars.path,
      refreshPriority: 11,
    });
  for (let p in vars) { // let users override the ScrollTrigger defaults
    st[p] = vars[p];
  }
  
  animation.addEventListener("DOMLoaded", function() {
    let wrap = gsap.utils.wrap(0, animation.totalFrames - 1)
    gsap.to(playhead, {
      frame: (animation.totalFrames - 1) * 20,
      ease: "none",
      onUpdate: () => animation.goToAndStop(wrap(playhead.frame), true),
      scrollTrigger: st
    });
        ScrollTrigger.sort();
    ScrollTrigger.refresh();
  });
  return animation;
}

// let tlBG = gsap.timeline({
//   scrollTrigger: {
//     trigger: "#globe_contours",
//     start: "bottom+=1000 top",
//     end: "bottom+=4000 top",
//     scrub: true,
//     toggleActions: "play reverse play reverse",
//     markers: { startColor: "yellow", endColor: "pink" }
//   }
// });
// tlBG.to(".web-design-title", { autoAlpha: 0, duration: 0.75});
// tlBG.to(".wd-text-container", { y: "-100vh" });

// tlcontours.to(".lottie-container", { scale: 2, y: 100 }, "<");

////




// SPLIT TEXT BLURB //   



var splitLines = $('.split-text_blurb .blurb-wrap'),
          blurb = splitLines.find('p'),
          splitParent = new SplitText(blurb, {
            type: 'lines',
            linesClass: "bl"
          }),
          splitTitle = new SplitText(splitParent.lines, {
            type: 'lines',
            linesClass: "lines"
          });
        gsap.set(splitLines, {
          visibility: 'visible'
        });
        splitLines.each(function () {
          var block = $(this),
            lines = block.find('.lines');
          var linesTl2 = gsap.timeline({
            scrollTrigger: {
              trigger: block,
              start: "top 75%"
            }
          }).fromTo(lines, {
            yPercent: 100,
            autoAlpha: 0.01
          }, {
            autoAlpha: 0.999,
            yPercent: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: 'cubic'
          });
        });

////

//// PARALLAX IMAGE BLOCK 1 ////

smoother.effects(".wd_parallax", { speed: "0.8" });

//// END PARALLAX IMAGE BLOCK 1 ////

ScrollTrigger.sort();
  ScrollTrigger.refresh(); 

// }

//// MOBILE MOCKUP SECTION ////
ScrollTrigger.create({ 
  trigger:".lp-phone-mockup-block", 
  start: "top top",
  end: () => '+='+ (document.querySelector('.lp-phone-mockup-slides-container').offsetHeight * 5),
  pin: true, 
  refreshPriority: 10,
  markers: true, 
});

const lottie1 = document.querySelector('#lottie-phone') 

LottieScrollTriggerPhone({ 
  target: lottie1, 
  path: "https://mrc-website-assets.s3.eu-west-2.amazonaws.com/lottie/AB-logo-for-iPhone-mockupe.json", 
  trigger:".lp-phone-mockup-block", 
  start: "top top", 
  end: () => '+='+ (document.querySelector('.lp-phone-mockup-slides-container').offsetHeight),  
  pin: false, 
  scrub: 1, 
  refreshPriority: 9,
  markers: true 
}); 

let tl = gsap.timeline({ 
  scrollTrigger: { 
    start: self => self.previous().end, 
    end: () => '+='+ (document.querySelector('.lp-phone-mockup-slides-container').offsetHeight * 4), 
    scrub: 1, 
    refreshPriority: 8,
    invalidateOnRefresh: true,
    markers: true, 
  } 
}); 

tl.to(".lp-phone-mockup-slides-container", { 
  y: () => document.querySelector('.lp-phone-mockup-frame').offsetHeight - document.querySelector('.lp-phone-mockup-slides-container').offsetHeight, 
  ease: "none" 
}) 



function LottieScrollTriggerPhone(vars) {
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
      refreshPriority: 7,
      toggleActions: "play none none reverse",
    }
  });
});

console.log("ST PHONE MOCKUP 3rd PHASE SETUP COMPLETE");


//// END MOBILE MOCKUP SECTION ////

//// WD NEXT/CONTACT SECTION ////

// // TEXT TICKER

gsap.utils.toArray(".wd_stb_line_single").forEach((line, i) => {
  const links = line.querySelectorAll("a"),
    tl = horizontalLoop(links, {
      repeat: -1,
      speed: 1.75,
      reversed: true,
      paddingRight: parseFloat(gsap.getProperty(links[0], "marginRight", "px")) // otherwise first element would be right up against the last when it loops. In this layout, the spacing is done with marginRight.
    });
  links.forEach((link) => {
    link.addEventListener("mouseenter", () =>
      gsap.to(tl, { timeScale: 0, overwrite: true })
    );
    link.addEventListener("mouseleave", () =>
      gsap.to(tl, { timeScale: -1, overwrite: true })
    );
  });
});

/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
 */
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    }
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          )
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}

//// END WD NEXT/CONTACT SECTION ////


//// START FOOTER CODE

gsap.set('.footer-container', { yPercent: -50 })

let uncover = gsap.timeline({ paused:true })

uncover
.to('.footer-container', { yPercent: 0, ease: 'none' })
;

ScrollTrigger.create({ 
  trigger: '.contact-post-section',
  start: 'bottom bottom',
  end: '+=75%',
  animation: uncover,
  scrub: true,  
  markers: true,
 
}) 
//// END FOOTER CODE


}



//// END WEB-DESIGN CODE ////


//// START ICAT CODE ////


function initIcatPageAnim() {


  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
  
  const smoother = ScrollSmoother.create({
    smooth: 2,
    normalizeScroll: true,
    ignoreMobileResize: true,
    effects: true,
    // normalizeScroll: true,
    smoothTouch: 0.1
  });


// SPLIT TEXT BLURB //   



var splitLines = $('.split-text_blurb .blurb-wrap'),
          blurb = splitLines.find('p'),
          splitParent = new SplitText(blurb, {
            type: 'lines',
            linesClass: "bl"
          }),
          splitTitle = new SplitText(splitParent.lines, {
            type: 'lines',
            linesClass: "lines"
          });
        gsap.set(splitLines, {
          visibility: 'visible'
        });
        splitLines.each(function () {
          var block = $(this),
            lines = block.find('.lines');
          var linesTl2 = gsap.timeline({
            scrollTrigger: {
              trigger: block,
              start: "top 75%"
            }
          }).fromTo(lines, {
            yPercent: 100,
            autoAlpha: 0.01
          }, {
            autoAlpha: 0.999,
            yPercent: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: 'cubic'
          });
        });

////

//// PARALLAX IMAGE BLOCK 1 ////

smoother.effects(".icat_parallax", { speed: "0.8" });

//// END PARALLAX IMAGE BLOCK 1 ////

ScrollTrigger.sort();
  ScrollTrigger.refresh(); 

// }


//// ICAT PROCESS HOVER BLOCKS ////
console.clear();
let targets = document.querySelectorAll(".icat-title");
let numbers = document.querySelectorAll(".icat-numbers");
let lines = document.querySelectorAll(".bottom-side-b");
let articles = document.querySelectorAll(".article");
let articlesTitles = document.querySelectorAll("h1");
let activeTab = 0;
let old = 0;
let heights = [];
let dur = 0.4;
let animation;

function setupTabSlider() {
  for (let i = 0; i < targets.length; i++) {
    targets[i].index = i;
    heights.push(articles[i].offsetHeight); // get height of each article
    gsap.set(articles[i], {top: 0, y:0, opacity: 0}); // push all articles up 20 and opacity 0
    targets[i].addEventListener("mouseover", doCoolStuff);
  }
  
  // set initial article on first tab
  gsap.set(articles[0], {y:0, autoAlpha: 1, });
  gsap.set(targets[0], {color:"#00ffa3"});
  gsap.set(numbers[0], {color:"#00ffa3"});
  gsap.set(lines[0], {width:"100%"});
  // gsap.set(".article-block", {height:heights[0]});

  function doCoolStuff() {
    // check if clicked target is new and if the timeline is currently active
    if(this.index != activeTab) {
      //if there's an animation in-progress, jump to the end immediately so there aren't weird overlaps. 
      if (animation && animation.isActive()) {
        animation.progress(1);
      }
      animation = gsap.timeline({
        defaults:{
          duration:0.5,
        }
      });
      old = activeTab;
      activeTab = this.index;
      // change text color on old and new tab targets
      animation.to(targets, {color:"#ddd", x: 0, ease:"none"}, 0);
      animation.to(numbers, {color:"#ddd", x: 0, ease:"none"}, 0);
      animation.to(lines, {duration: 1, width: "0%", ease:"power2.out"}, 0);
      animation.to(targets[activeTab], {color:"#00ffa3", x:10, ease:"power2.out"}, 0);
      animation.to(numbers[activeTab], {color:"#00ffa3", x:0, ease:"none"}, 0);
       animation.to(lines[activeTab], {duration: 1, width: "100%", ease:"power2.out"}, 0);
      // slide current article down out of view and then set it to starting position at top
      animation.to(articles, {y:0, autoAlpha: 0, ease:"back.in" }, 0);
      // animation.set(articles[old], {y:0});
      // resize article block to accommodate new content
      animation.to(".article-block", {height:heights[activeTab]});
      // slide in new article
      animation.to(articles[activeTab], {duration: 0.4, y:0, autoAlpha:2, ease: "power3.inOut"}, "-=1");
      animation.fromTo(articlesTitles[activeTab], {y:0, autoAlpha:0 }, {duration: 0.4, y:0, autoAlpha:2, ease: "ease"}, "-=1");
    }
    
    
  }
  
}


setupTabSlider();




//// END ICAT PROCESS HOVER BLOCKS ////


//// START ICAT RESULTS COUNTER ////



//// END ICAT RESULTS COUNTER ////

//// ICAT LOTTIE LOGO SECTION CODE ////

LottieInteractivity.create({
  player:'#icat-logo-lottie-holder1',
  mode:"cursor",
  actions: [
      {
          type: "hover",
          forceFlag: false
      }
  ]
});

LottieInteractivity.create({
  player:'#icat-logo-lottie-holder2',
  mode:"cursor",
  actions: [
      {
          type: "hover",
          forceFlag: false
      }
  ]
});

LottieInteractivity.create({
  player:'#icat-logo-lottie-holder3',
  mode:"cursor",
  actions: [
      {
          type: "hover",
          forceFlag: false
      }
  ]
});

//// END LOTTIE LOGO SECTION CODE ////

const items = document.querySelectorAll(".data");

const tl = gsap.timeline({
  paused: true,
  scrollTrigger: {
   trigger: ".results-counter",
    pin: ".results-counter",
    pinSpacing: true,
    start: "top top",
    end: "bottom top"
  }
});

tl.from(items, {
  textContent: 0,
  duration: 1.5,
  ease: "power1.in",
  snap: { textContent: 1 },
  stagger: {
    each: 1.0,
    onUpdate: function() {
      this.targets()[0].innerHTML = numberWithCommas(Math.ceil(this.targets()[0].textContent));
    },
  }
});


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


//// WD NEXT/CONTACT SECTION ////

// // TEXT TICKER

gsap.utils.toArray(".wd_stb_line_single").forEach((line, i) => {
  const links = line.querySelectorAll("a"),
    tl = horizontalLoop(links, {
      repeat: -1,
      speed: 1.75,
      reversed: true,
      paddingRight: parseFloat(gsap.getProperty(links[0], "marginRight", "px")) // otherwise first element would be right up against the last when it loops. In this layout, the spacing is done with marginRight.
    });
  links.forEach((link) => {
    link.addEventListener("mouseenter", () =>
      gsap.to(tl, { timeScale: 0, overwrite: true })
    );
    link.addEventListener("mouseleave", () =>
      gsap.to(tl, { timeScale: -1, overwrite: true })
    );
  });
});

/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
 */
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    }
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          )
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}

//// END WD NEXT/CONTACT SECTION ////


//// START FOOTER CODE

gsap.set('.footer-container', { yPercent: -50 })

let uncover = gsap.timeline({ paused:true })

uncover
.to('.footer-container', { yPercent: 0, ease: 'none' })
;

ScrollTrigger.create({ 
  trigger: '.spacer3',
  start: 'bottom bottom',
  end: '+=75%',
  animation: uncover,
  scrub: true,  
  markers: false,
 
}) 
//// END FOOTER CODE


}


//// END ICAT PAGE CODE ////



function initLogofolioPageAnim() {

//// START TITLE GROW CODE ////


const tlLogo = gsap.timeline();

      const logoTitle = new SplitText(".logo-title", {
        type: "lines",
        linesClass: "split-child"
      });

      const logoTitle2 = new SplitText(".logo-sub", {
        type: "lines",
        linesClass: "split-child"
      });
      

    tlLogo.from(logoTitle.lines, {
        duration: 2.5,
        yPercent: 110,
        ease: "power4",
        stagger: 0.1
      });

      tlLogo.from(logoTitle2.lines, {
        duration: 2.5,
        yPercent: 110,
        ease: "power4",
        stagger: 0.1
      },"<");

      tlLogo.to(".logo-lottieHolder", {
        duration: 3,
        opacity: 1,
        ease: "power4",
      },">-1.5");




//// END TITLE GROW CODE ////

function animateLines() {
  gsap.fromTo(
    ".logo-colour-bg",
    { "clip-path": "polygon(0 0%, 100% 0%,0% 0%, 0% 100%)" },
    {
      duration: 2,
      "clip-path": "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "none"
    }
  );
}

let someDelay = gsap.delayedCall(0.2, animateLines).pause();
window.addEventListener("resize", () => someDelay.restart(true));

animateLines();


// const items = gsap.utils.toArray(".logo-lottieHolder"),
// player = document.querySelector("logo-lottieHolder");

gsap.registerPlugin(Flip);


function playLottie(player) {
player.seek(0);
player.play();
}

function pauseLottie(player) {
player.seek(0);
player.stop();
}

let lotties = gsap.utils.toArray('.logo-lottieHolder')

lotties.forEach((lottie) => {
  let isOpen = false;
  lottie.addEventListener('click', (e) => {
    
    let state = Flip.getState(e.target);
    
    e.target.classList.toggle('logofixed');
    isOpen = !isOpen

    Flip.from(state, {
      absolute: true,
      toggleClass: 'logoflipping'
    })
    
    if(isOpen) {
      playLottie(e.target)
    } else {
      pauseLottie(e.target)
    }

  })
})

// let gridWidth = gsap.getProperty(".logo-gallery", "width", "px");

// window.addEventListener('resize', recalc);

// function recalc() {
//   gridWidth = gsap.getProperty(".logo-gallery", "width", "px");
// }

// console.log("GRID WIDTH CALC");


// // Intro animation
// window.addEventListener('load', () => {
// 	tl = gsap.timeline();

//   console.log("WINDOW LOAD");


// tl.fromTo("#logo-bottom", 
//    {
//     width: 0, 
//     background: "#0177FF",
//     immediateRender: false,
//     autoRound: false,
//     ease: Power4.out,
//    }, 
//    {
//     stagger: {
//     amount: 0.2,
//     ease: Power4.out,
//   },
//     width: gridWidth,
//     background: "#0177FF"
//    }
// );
  
// console.log("Bottom border added");


// tl.fromTo("#logo-vertical-r, #logo-vertical-l", 
//    {
//     height: 0, 
//     background: "#0177FF",
//     immediateRender: false,
//     autoRound: false,
//     ease: Power2.inOut,
//    }, 
//    {
//     stagger: {
//     amount: 0.5,
//     ease: Power4.out,
//   },
//     height: 525, 
//     background: "#0177FF"
//    }, ">-0.5");

  
//     tl.fromTo(".logo-lottieHolder",
//             {
//             autoAlpha: 0,
//             ease: Power2.inOut,
//             },
//             {
//           stagger: {
//     amount: 1,
//     ease: Power2.inOut,
//   },
//             autoAlpha: 1,
//       duration: 2.75
// }, ">-1");
// });


// END LOTTIE LOGO POP-UP BLOCK CODE ////

}


function initHoverTestAnim() {

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
  smooth: 2,
  normalizeScroll: true,
  ignoreMobileResize: true,
  effects: true,
  // normalizeScroll: true,
  smoothTouch: 0.1
});

var $cursor = $(".hover-list"),
    $overlay = $(".hover-project-overlay");

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
  $(".hover-list").css({ "background-image": "url(https://i.pinimg.com/564x/85/24/d7/8524d785a8427617d475bf02d51710fc.jpg)" });
});

$(".p-2").hover(function(){
  $(".hover-list").css({ "background-image": "url(https://i.pinimg.com/564x/97/59/85/9759859a26a8f8195d1c4dd92f00cb73.jpg)" });
});
$(".p-3").hover(function(){
  $(".hover-list").css({ "background-image": "url(https://i.pinimg.com/564x/9c/52/81/9c528158c74da06541565671cfc2644b.jpg)" });
});
$(".p-4").hover(function(){
  $(".hover-list").css({ "background-image": "url(https://i.pinimg.com/564x/38/18/c3/3818c31969226e29a9dabd5e3cd0802a.jpg)" });
});

var flag = false;
$($overlay).mousemove(function() {
  flag = true;
  gsap.to($cursor, 0.5, {scale: 1, autoAlpha: 1});
  $($overlay).on("mousemove", moveCircle);
});

$($overlay).mouseout(function() {
  flag = false;
 gsap.to($cursor, 0.5, {scale: 0.25, autoAlpha: 0});
});

}