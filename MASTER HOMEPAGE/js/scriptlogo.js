const items = gsap.utils.toArray(".logo-lottieHolder"),
player = document.querySelector("logo-lottie-player");

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
    
    e.target.classList.toggle('fixed');
    isOpen = !isOpen

    Flip.from(state, {
      absolute: true,
      toggleClass: 'flipping'
    })
    
    if(isOpen) {
      playLottie(e.target)
    } else {
      pauseLottie(e.target)
    }

  })
})

let gridWidth = gsap.getProperty(".logo-gallery", "width", "px");

window.addEventListener('resize', recalc);

function recalc() {
  gridWidth = gsap.getProperty(".logo-gallery", "width", "px");
}

// Intro animation
window.addEventListener('load', () => {
	tl = gsap.timeline();

tl.fromTo("#logo-bottom", 
   {
    width: 0, 
    background: "#0177FF",
    immediateRender: false,
    autoRound: false,
    ease: Power4.out,
   }, 
   {
    stagger: {
    amount: 0.2,
    ease: Power4.out,
  },
    width: gridWidth,
    background: "#0177FF"
   }
);
  
tl.fromTo("#logo-vertical-r, #logo-vertical-l", 
   {
    height: 0, 
    background: "#0177FF",
    immediateRender: false,
    autoRound: false,
    ease: Power2.inOut,
   }, 
   {
    stagger: {
    amount: 0.5,
    ease: Power4.out,
  },
    height: 525, 
    background: "#0177FF"
   }, ">-0.5");

  
    tl.fromTo(".logo-lottieHolder",
            {
            autoAlpha: 0,
            ease: Power2.inOut,
            },
            {
          stagger: {
    amount: 1,
    ease: Power2.inOut,
  },
            autoAlpha: 1,
      duration: 2.75
}, ">-1");
});