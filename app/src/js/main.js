'use strict';

/**
 *
 * Following is a SuperClass with a few useful shortcuts
 *
 **/

function LTApp() {
    this.WIN = $( window );
    this.DOC = $( document );
    this.BODY = $( 'body' );
    this.HTML = $( 'html' );
    this.INITED = false;
  }
  /**
   *
   * Main Application
   *
   **/

function App_test() {
  if ( App_test.instance !== undefined ) {
    return App_test.instance;
  } else {
    App_test.instance = this;
  }

  LTApp.call( this );
  return App_test.instance;
}

App_test.prototype = new LTApp();

/**
 *
 * Singleton thing
 *
 **/
App_test.getInstance = function() {
  if ( App_test.instance === undefined ) {
    new App_test();
  }

  return App_test.instance;
}

/**
 *
 * Initialize your app, surcharge with whatever needed
 *
 **/
App_test.prototype.init = function() {

  if ( !this.INITED ) {
    this.INITED = true;
    if( $('#1').length ) {
      var words = new Array(
          SVGMorph.createPathFromSVG( 'M213.5,210.4 311.2,147.9 324.7,81.4 301.7,92.6 260.5,257.7 283.6,257 304.6,237.7 304.6,237.7 336.8,247.4 366.1,219.7 345.4,215.4 345.2,268.7 392.8,236.8 397.5,268.8 411.9,240 444.6,273.4 526,281.6 Z ', true ),

          SVGMorph.createPathFromSVG( '200.4,191.9 217.5,219.6 241.1,228.4 259.3,212.9 243.5,197.9 233.6,207.2 239.6,259.8 258.5,268.4 274.4,254.8 292.7,203.9 277.2,216 325,210.8 322.5,263.4 334.3,264.8 360.5,215.5 360.5,215.5 354.3,254.7 367,269 472.1,104.2 448,57.5 402.3,287 409.9,241.4 424.2,230.7 427.6,247.8 408.8,256.1 444.6,282 485.6,265.4', true ),

          SVGMorph.createPathFromSVG( '151.7,185 122.5,191 108.7,228 138.5,231.2 157.1,189 153.1,229.2 164.7,230.2 192.2,201.6 203.4,203.6 199.6,238.5 217.5,206.3 216.8,244.3 240.3,203.5 255.1,251.9 283.9,239.1 335.8,158.3 316.8,122.5 283.4,257.7 295.3,266.1 319.5,224.9 319.5,224.9 339.5,232.7 372.9,210.2 348.7,206.8 342.5,262.1 356.7,271 365.4,261 375.4,224 375.4,224 388,226 400.5,224.4 400.5,224.4 393.4,252.2 414.8,262.7 457,144.7 448.7,122.3 430,254 469.3,244.7 459.9,223.3 447.7,265.3 451.2,272.9 469.1,264.3 482.7,233.4 477.3,261.4 481.8,268.8 500.4,240.3 425.5,440.9 429.9,396.4 577.4,298.6', true ) );
      setInterval( function() {
        SVGMorph.morphTo( words[0], 30, $( 'path' ) );
        words.push( words.shift() );
      }, 3000 );
    } else if ( $('#2').length ) {
      var shapes = new Array(
          SVGMorph.createPathFromSVG( '429,122.5 300.7,345.4 172.4,122.5', false, 0 ),

          SVGMorph.createPathFromSVG( '406.5,128.5 406.5,339 196.5,339 196.5,128.5', false, 0 ),

          SVGMorph.createPathFromSVG( '387.8,98.5 441.6,265.5 300.7,368.4 159.8,265.5 213.7,98.5', false, 0 ),

          SVGMorph.createPathFromSVG( '374.8,105.5 448.9,234.2 374.8,362.6 226.7,362.6 152.6,234.3 226.7,105.5', false, 0 ),

          SVGMorph.createPathFromSVG( '365,93.5 445.2,194 416.6,319.3 300.7,375.1 184.9,319.3 156.3,194 236.5,93.5', false, 0 )

           );
      setInterval( function() {
        SVGMorph.morphTo( shapes[0], 30, $( 'path' ) );
        shapes.push( shapes.shift() );
      }, 3000 );
    }  else if ( $('#3').length ) {
      var woob = new Array(
          SVGMorph.createPathFromSVG( '429,122.5 300.7,345.4 172.4,122.5', false, -.3 ),

          SVGMorph.createPathFromSVG( '406.5,128.5 406.5,339 196.5,339 196.5,128.5', false, -.6 ),

          SVGMorph.createPathFromSVG( '387.8,98.5 441.6,265.5 300.7,368.4 159.8,265.5 213.7,98.5', false, .3 ),

          SVGMorph.createPathFromSVG( '374.8,105.5 448.9,234.2 374.8,362.6 226.7,362.6 152.6,234.3 226.7,105.5', false, -.4 ),

          SVGMorph.createPathFromSVG( '365,93.5 445.2,194 416.6,319.3 300.7,375.1 184.9,319.3 156.3,194 236.5,93.5', false, .3 )

           );
      setInterval( function() {
        SVGMorph.morphTo( woob[0], 30, $( 'path' ) );
        woob.push( woob.shift() );
      }, 3000 );
    }

  }

};

/**
 *
 * Launch the application
 *
 **/
$( document ).ready( function() {
  App_test.getInstance().init();
} );

// tool to convert svg string into path
