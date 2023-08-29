
let lottieAnimation = lottie.loadAnimation({
    container: document.getElementById('lottie_svg-container'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    //path: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1778710/development-services.json' //this one works
    path: 'https://mrc-website-assets.s3.eu-west-2.amazonaws.com/lottie/MRC+loader+logo.json' //this doesn't work
  });


lottie.inBrowser(true);
lottieAnimation.stop();

  let lottieControl = gsap.timeline();

  // lottieControl.to ('.box', {
  //   delay: 1,
  //   x: 100,
  //   duration: 1
  // })
    lottieControl.call
      (function () {lottieAnimation.play()})