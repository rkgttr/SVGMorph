// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

var HELPERS = HELPERS || {
    // use with document.location.search as parameter
    urlVariables: function(qs) {
        qs = qs.split("+").join(" ");
        var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;
        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
    },
    /**
     *
     * Media tracking method
     * 
     * A media tag looks like this:
     * <script type='text/javascript'>
     * var ebRand = Math.random()+'';
     * ebRand = ebRand * 1000000;
     * //<![CDATA[ 
     * document.write('<scr'+'ipt src="HTTPs://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=479513&amp;rnd=' + ebRand + '"></scr' + 'ipt>');
     * //]]>
     * </script>
     * <noscript>
     * <img width="1" height="1" style="border:0" src="HTTP://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=479513&amp;ns=1"/>
     * </noscript>
     *
     * In order to emulate that tag, you need to isolate the url contained into the script tag without "HTTP:" and  use it as the trackingURL, for example:
     * HELPERS.mediaTrack('//bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=479513&amp;rnd=');
     * 
     **/
    mediaTrack : function (trackingURL) {
        var scope = this;
        if(trackingURL) {
            var ebRand = Math.random();
            ebRand = (ebRand * 1000000);
            $.getScript( trackingURL + ebRand );
        }
    }

}

if (!('trim' in String.prototype)) {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}
if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf = function(find, i /*opt*/ ) {
        if (i === undefined) i = 0;
        if (i < 0) i += this.length;
        if (i < 0) i = 0;
        for (var n = this.length; i < n; i++)
            if (i in this && this[i] === find)
                return i;
        return -1;
    };
}
if (!('lastIndexOf' in Array.prototype)) {
    Array.prototype.lastIndexOf = function(find, i /*opt*/ ) {
        if (i === undefined) i = this.length - 1;
        if (i < 0) i += this.length;
        if (i > this.length - 1) i = this.length - 1;
        for (i++; i-- > 0;) 
            if (i in this && this[i] === find)
                return i;
        return -1;
    };
}
if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach = function(action, that /*opt*/ ) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
}
if (!('map' in Array.prototype)) {
    Array.prototype.map = function(mapper, that /*opt*/ ) {
        var other = new Array(this.length);
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this)
                other[i] = mapper.call(that, this[i], i, this);
        return other;
    };
}
if (!('filter' in Array.prototype)) {
    Array.prototype.filter = function(filter, that /*opt*/ ) {
        var other = [],
            v;
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && filter.call(that, v = this[i], i, this))
                other.push(v);
        return other;
    };
}
if (!('every' in Array.prototype)) {
    Array.prototype.every = function(tester, that /*opt*/ ) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && !tester.call(that, this[i], i, this))
                return false;
        return true;
    };
}
if (!('some' in Array.prototype)) {
    Array.prototype.some = function(tester, that /*opt*/ ) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && tester.call(that, this[i], i, this))
                return true;
        return false;
    };
}

