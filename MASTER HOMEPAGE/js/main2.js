function initAboutMePageAnim() {

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


  // const childSplit = new SplitText(".about-me-top-section-heading", {
  //   type: "lines",
  //   linesClass: "split-child"
  // });

  // const parentSplit = new SplitText(".about-me-top-section-heading", {
  //   // type: "lines",
  //   linesClass: "split-parent"
  // });
  
  // const tl = gsap.timeline();
  // tl.from(childSplit.lines, {
  //   duration: 2.5,
  //   yPercent: 100,
  //   ease: "power4",
  //   stagger: 0.1,
  // });
  


// HORIZONTAL

// const horizontalSections = gsap.utils.toArray('section.about-me-horizontal')

// horizontalSections.forEach(function (sec, i) {	
  
//   var thisPinWrap = sec.querySelector('.about-me-pin-wrap');
//   var thisAnimWrap = thisPinWrap.querySelector('.about-me-animation-wrap');
  
//   var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth); 
  

    
// const tl = gsap.timeline({   
//     scrollTrigger: {
//       trigger: sec,		
//       start: "top top",
//       end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth),
//       pin: thisPinWrap,
//       invalidateOnRefresh: true,
//       anticipatePin: 0,
//       scrub: true,
//           ease: "none",
//       // snap: 1,
//       markers: true
//     }
//   })

//   .fromTo(thisAnimWrap, { 
//     x: () => thisAnimWrap.classList.contains('about-me-to-right') ? 0 : getToValue() 
//   }, { 
//     x: () => thisAnimWrap.classList.contains('about-me-to-right') ? getToValue() : 0, })

// .to("#about-me-quote", {
//   "--target": "0%",})

// .to("#about-me-nudge-quote", {
//   opacity: 0,})

//                 ScrollTrigger.sort();
//       ScrollTrigger.refresh();    
  
// })

/// THREE ...
/*
Most of the stuff in here is just bootstrapping. Essentially it's just
setting ThreeJS up so that it renders a flat surface upon which to draw 
the shader. The only thing to see here really is the uniforms sent to 
the shader. Apart from that all of the magic happens in the HTML view
under the fragment shader.
*/

let container_am;
let camera, scene, renderer;
let uniforms;
let mouse = new THREE.Vector2()
let mouseO = new THREE.Vector2()
let offsets = new THREE.Vector2()

let loader = new THREE.TextureLoader();
let texture, _500;
loader.setCrossOrigin("anonymous");
loader.load(
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/noise.png',
  (tex) => {
    texture = tex;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearFilter;

    loader.load(
      'https://mrc-website-assets.s3.eu-west-2.amazonaws.com/MRC-for-three-glow-m-over.png',
      (tex) => {
        _500 = tex;

        init();
        animate();
      }
    );
  }
);

function init() {
  container_am = document.getElementById('container_am');

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
      type: 'f',
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
      value: new THREE.Vector2(-.1, -.1)
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
    const vec3 bgcolour = vec3(.0, 0, 0); // the base 
  // the base colour of the render
  const float falloff = .5;
  const int samples = 12; // The number of samples to take
  const float density = .98; // The density of the "smoke"
  const float weight = .25; // how heavily to apply each step of the supersample
  const int octaves = 1; // the number of octaves to generate in the FBM noise
  const float seed = 43758.5453123; // A random seed :)
  
  vec2 res = u_resolution / u_pxaspect;
  
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
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
  
  mainRender(uv, gl_FragColor);
}
    `
  });
  material.extensions.derivatives = true;

  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);

  // NEW PLACEMENT CODE - CONTAINER.CLIENTH/W 

  renderer.setSize(container_am.clientWidth, container_am.clientHeight);

  ///// NEED TO TWEAK SHADER MOVEMENT TO MATCH!

  container_am.appendChild(renderer.domElement);

  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);

  document.addEventListener('pointermove', (e) => {

    mouseO.x = event.clientX
    mouseO.y = event.clientY

    mouse.x = ((mouseO.x - offsets.x) / container_am.offsetWidth) * 2 - 1;
    mouse.y = -((mouseO.y - offsets.y) / container_am.offsetHeight) * 2 + 1;

    uniforms.u_mouse.value.x = mouse.x
    uniforms.u_mouse.value.y = mouse.y

    e.preventDefault();
  });
}

window.addEventListener('scroll', function() {
  // container_am = document.getElementById('container_am');

  // offsets.x = container_am.offsetLeft - window.pageXOffset
  // offsets.y = container_am.offsetTop - window.pageYOffset

  mouse.x = ((mouseO.x - offsets.x) / container_am.offsetWidth) * 2 - 1;
  mouse.y = -((mouseO.y - offsets.y) / container_am.offsetHeight) * 2 + 1;

  uniforms.u_mouse.value.x = mouse.x
  uniforms.u_mouse.value.y = mouse.y

})

function onWindowResize(event) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate(delta) {
  requestAnimationFrame(animate);
  render(delta);
}

let then = 0;

function render(delta) {

  uniforms.u_time.value = delta * 0.0005;
  renderer.render(scene, camera);


}

}

initAboutMePageAnim();