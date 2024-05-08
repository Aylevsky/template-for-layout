/*
  * Animate CSS
*/
// import 'animate.css';
// Command: npm install animate.css --save

/*
  * Wow.js
*/
// import WOW from wowjs;
// new WOW().init();
// Command: npm install wowjs

/*
  * Swiper
*/
/* Command: npm install swiper

import Swiper from 'swiper';
import Navigation from '../../node_modules/swiper/modules/navigation/navigation.js';
import Pagination from '../../node_modules/swiper/modules/pagination/pagination.js';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination],
});*/

/*
  * Paralax.js
*/
/* Command: npm i -s parallax-js

import Parallax from "parallax-js";

window.addEventListener('load', function () {
  if (document.getElementById('index')) {
    var scene = document.getElementById('index__paralax');
    var parallaxInstance = new Parallax(scene, {
      relativeInput: true
    });
  }
})
*/

import * as functions from "./modules/functions.js";
functions.isWebp();
