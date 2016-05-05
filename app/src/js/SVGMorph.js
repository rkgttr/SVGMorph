'use strict';

/**
 * SVGMorph module
 */
var SVGMorph = ( function() {
  var P,
    animId = 0,
    inited = false,
    _path,
    /**
     * Private function
     */
    animate = function( currentTime, duration, path, step, tension ) {
      var pl,
      i;

      for ( i = 0; i < step; i++ ) {
        if ( P.length > path.length ) {
          P.pop();
          P.source.pop();
        }

        if ( path.length > P.length ) {
          pl = P.length;
          P.push( [ P[pl - 1][0], P[pl - 1][1] ] )
          P.source.push( [ P[pl - 1][0], P[pl - 1][1] ] );
        }
      }

      P.tension = -( path.tension - tension ) / 2 * ( Math.cos( Math.PI * currentTime / duration ) - 1 ) + tension;
      pl = Math.min( P.length, path.length );
      for ( i = 0; i < pl; i++ ) {
        P[i][0] = -( path[i][0] - P.source[i][0] ) / 2 * ( Math.cos( Math.PI * currentTime / duration ) - 1 ) + P.source[i][0];
        P[i][1] = -( path[i][1] - P.source[i][1] ) / 2 * ( Math.cos( Math.PI * currentTime / duration ) - 1 ) + P.source[i][1];
      }

      if ( currentTime === duration ) {
        window.cancelAnimationFrame( animId );
      } else {
        animId = window.requestAnimationFrame( function() {
          animate( currentTime + 1, duration, path, step, tension );
        }.bind( this ) );
      }

      drawClosedCat();
    },
    /**
     * Private function
     */
    drawClosedCat = function() {
      var pL = P.length,
        ii = +!P.closed,
        d = [],
        i,
        first,
        last,
        v;

      if ( P.closed ) {
        P[-1] = P[pL - 1];
      }

      for ( i = ii; i < pL - ii; i++ ) {
        v = CatmullRom.mul( CatmullRom.sub( P[( i + 1 ) % pL], P[i - 1] ), P.tension ); // vector for one control point
        d = d.concat( [ CatmullRom.sub( P[i], v ), P[i], CatmullRom.add( P[i], v ) ] ); // v to left and right of P[i]
      }

      if ( !P.closed ) {
        first = CatmullRom.lerpA( 0.5, P[0], d[0] ),
          last = [ CatmullRom.lerpA( 0.5, d[d.length - 1], P[pL - 1] ), P[pL - 1] ];

      }

      if ( _path.length ) {
        _path = _path[0];
      }

      _path.setAttribute( 'd', 'M' + P[0] + 'C' + ( P.closed ? [ d.slice( 2 ), d.slice( 0, 2 ) ] : [ first, d, last ] ) );

    };

  return {
    /**
     * Call this before anything else, this is the default
     * origin of the path, default to 320 x 240
     * @param  {Number} x origin
     * @param  {Number} y origin
     */
    init: function( x, y ) {
      inited = true;
      P = new Path( [ x || 320, y || 240 ], [ x || 320, y || 240 ] );
    },
    /**
     * Morph a path to another
     * @param  {Path} path     Path object
     * @param  {Number} duration Animation duration (in frames)
     * @param  {DOM element} opath    SVG path on which you want the animation to occur
     */
    morphTo: function( path, duration, opath ) {
      if ( !inited ) {
        this.init();
      }

      _path = opath;
      var step = 1;

      drawClosedCat( P );
      for ( var i = P.length - 1; i >= 0; i-- ) {
        P.source[i] = [ P[i][0], P[i][1] ];
      }

      P.closed = path.closed;
      if ( Math.abs( P.length - path.length ) > duration ) {
        step = Math.ceil( Math.abs( P.length - path.length ) / duration );
      }

      animate( 1, duration, path, step, P.tension );
    },
    /**
     * Create a path object from a SVG string
     * @param  {String} str    SVG string, e.g. "10,10 15,30 12,87"
     * @param  {Boolean:optional} opened Set to true if your path is an open path
     * @param  {Number:optional} tension of the curve, if 0, then path is not smoothed
     * @return {Path}        The resulting Path
     */
    createPathFromSVG: function( str, opened, tension ) {

      str = str.trim();
      if ( isNaN( str.charAt( 0 ) ) ) {
        str = str.slice( 1 );
      }

      if ( isNaN( str.charAt( str.length - 1 ) ) ) {
        str = str.slice( 0, -1 );
      }

      str = str.trim();

      var t = str.split( ' ' ),
        p = new Path();

      t.forEach( function( el, i ) {
        p.push( el.split( ',' ) );
        for ( var j = p[i].length - 1; j >= 0; j-- ) {
          p[i][j] = Number( p[i][j] );
        }
      } );
      p.tension = tension !== undefined ? tension : 1 / 6;
      p.closed = !opened;
      return p;
    }
  }
} )();

/**
 * Subclass Array
 */
function Path() {
  this.push.apply( this, arguments );
  this.tension = 1 / 6;
  this.closed = true;
  this.source = [];
  return this;
}

Path.prototype = new Array();

/**
 * Catmull Rom algorithm implementation
 * @type {Object}
 */
var CatmullRom = {
  lerp: function( p, a, b ) {
    return +a + ( b - a ) * p;
  },

  lerpA: function( p, a, b, c ) {
    c = c || [];
    for ( var i = a.length; i--; ) {
      c[i] = CatmullRom.lerp( p, a[i], b[i] );
    }

    return c;
  },
  add: function( a, b, c ) {
    c = c || [];
    c[0] = a[0] + b[0];
    c[1] = a[1] + b[1];
    return c
  },

  sub: function( a, b, c ) {
    c = c || [];
    c[0] = a[0] - b[0];
    c[1] = a[1] - b[1];
    return c
  },

  mul: function( a, b, c ) {
    c = c || [];
    c[0] = a[0] * ( b[0] || b );
    c[1] = a[1] * ( b[1] || b );
    return c
  }

};
