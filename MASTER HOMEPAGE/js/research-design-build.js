//// OVERVIEW BUTTON TRIGGER MAY 23 ////
const overviewComp = document.querySelector('.overview_component');

//// IN
const rdbButton = document.querySelector('.r_d_b-button');

// check if currently animating
let isAnimating = false;

// Back control
const backCtrl = document.querySelector('.preview__back');

    // click on a content item
    contentItem.DOM.rdbButton.addEventListener('click', () => {
        if ( isAnimating ) return;
        isAnimating = true;
        
        gsap.timeline({
            defaults: {
                duration: 1.1,
                ease: 'expo',
            },
            onStart: () => {
                bodyEl.classList.add('preview-open');
                overviewComp.DOM.el.classList.add('overview_component-open');

                // gsap.set(previewItem.DOM.img, {xPercent: 100});
                // gsap.set(previewItem.DOM.imgWrap, {xPercent: -102, opacity: 0});

                // gsap.set(previewItem.DOM.slideTexts, {yPercent: 100});
                // gsap.set(previewItem.DOM.descriptions, {yPercent: 15, opacity: 0});
                
                // gsap.set(backCtrl, {x: '+=15%', opacity: 0});

                // previewItem.DOM.el.classList.add('preview__item--current');
            },
            onComplete: () => isAnimating = false
        })
        // .addLabel('start', 0)
        // .addLabel('preview', 'start+=0.3')
        // .to(contentOverlayInner, {
        //     ease: 'power2',
        //     startAt: {xPercent: -100},
        //     xPercent: 0
        // }, 'start')
        // .to([previewItem.DOM.img, previewItem.DOM.imgWrap], {
        //     xPercent: 0,
        // }, 'preview')
        // .to(previewItem.DOM.imgWrap, {
        //     opacity: 1,
        // }, 'preview')
        // .to(previewItem.DOM.slideTexts, {
        //     yPercent: 0,
        //     stagger: 0.05,
        // }, 'preview')
        // .to(previewItem.DOM.descriptions, {
        //     ease: 'power2',
        //     opacity: 1,
        //     stagger: 0.05,
        // }, 'preview')
        // .to(previewItem.DOM.descriptions, {
        //     yPercent: 0,
        //     stagger: 0.05,
        // }, 'preview')
        // .to(backCtrl, {
        //     ease: 'power2',
        //     opacity: 1,
        //     x: '-=15%'
        // }, 'preview');
    });



//// OUT

backCtrl.addEventListener('click', () => {
    if ( isAnimating ) return;
    isAnimating = true;
    
    gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'power4',
        },
        onComplete: () => {
            previewItem.DOM.el.classList.remove('preview__item--current');
            bodyEl.classList.remove('rde-open');
            isAnimating = false;
        }
    })
    // .addLabel('start', 0)
    // .to(backCtrl, {
    //     ease: 'power2',
    //     opacity: 0
    // }, 'start')
    // .to(previewItem.DOM.descriptions, {
    //     ease: 'power2',
    //     opacity: 0
    // }, 'start')
    // .to(previewItem.DOM.descriptions, {
    //     yPercent: 15
    // }, 'start')
    // .to(previewItem.DOM.slideTexts, {
    //     yPercent: 100
    // }, 'start')
    // .to(previewItem.DOM.img, {
    //     xPercent: -100,
    // }, 'start')
    // .to(previewItem.DOM.imgWrap, {
    //     xPercent: 100,
    //     opacity: 1
    // }, 'start')
    // .to(contentOverlayInner, {
    //     ease: 'power2',
    //     xPercent: 100,
    // }, 'start+=0.4')
});







