function sign(x) {
    // Returns +1 of x is positive, -1 of x is negative, 0 is x is 0
    return x ? x < 0 ? -1 : 1 : 0;
}
function sign_string(x) {
    // Return '+' if x is positive or zero and '-' if x in negative
    return x < 0 ? '-' : '+';
}
function hex2rgb(col) {
    // Parse a html hex color of the format col="#rrggbb"
    // returns a struct with r, g and b components from 0 to 255
    var col = parseInt(col.slice(1),16);
    var r = (col>>16) & 0xff;
    var g = (col>>8) & 0xff;
    var b = col & 0xff;
    return {r:r,g:g,b:b}
}
function rgb2Hex(col) {
    // Transformes a struct of {r:r_val,g:g_val,b:b_val} to the
    // corresponding hex color of the form "#rrggbb"
    var r = col.r;
    var g = col.g;
    var b = col.b;
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function colorLerp(col1, col2, f) {
    // Interpolate linearly between colors col1 and col2
    // both in the form "#rrggbb"
    col1 = hex2rgb(col1);
    col2 = hex2rgb(col2);
    result = {
        r: col1.r+Math.floor((col2.r-col1.r)*f),
        g: col1.g+Math.floor((col2.g-col1.g)*f),
        b: col1.b+Math.floor((col2.b-col1.b)*f),
    }
    return rgb2Hex(result)
}
function bezier3(p0,p1,p2,N) {
    // Three point spline curve from point p0 to point p2 using control
    // point p1. Use N points along the way (default value 101);
    var data = [];
    N = (typeof N === 'undefined') ? 101 : N
    for(var i = 0;i<N;i += 1) {
        var t = i/(N-1)
        var x = (1-t)*(1-t)*p0[0]+2*(1-t)*t*p1[0]+t*t*p2[0]
        var y = (1-t)*(1-t)*p0[1]+2*(1-t)*t*p1[1]+t*t*p2[1]
        data.push([x,y])
    }
    return data
}

function bezier4(p0,p1,p2,p3,N) {
    // Four point spline curve from point p0 to point p3 using control
    // points p1 and p2. Use N points along the way (default value 101);
    var data = [];
    N = (typeof N === 'undefined') ? 101 : N
    for(var i = 0;i<N;i += 1) {
        var t = i/(N-1)
        var x = Math.pow(1-t,3)*p0[0]+3*Math.pow(1-t,2)*t*p1[0]+3*(1-t)*t*t*p2[0]+t*t*t*p3[0];
        var y = Math.pow(1-t,3)*p0[1]+3*Math.pow(1-t,2)*t*p1[1]+3*(1-t)*t*t*p2[1]+t*t*t*p3[1];
        data.push([x,y])
    }
    return data
}

/******************************
 *  Stuff to use for Flot.js  *
 ******************************/
function log10TickGenerator(axis,step) {
    // Generate ticks for logarithmic scales to use with Flot.js
    var ln10 = Math.log(10);
    var res = [];
    var min = Math.abs(axis.min);
    var max = Math.abs(axis.max);
    var max = Math.floor(Math.log(max)/ln10);
    var min = Math.ceil(Math.log(min)/ln10);
    var s = sign(max-min);
    if(min>max) {
        var tmp = min;
        var min = max;
        var max = tmp;
    }
    var pm = (s>0)?" ":" -";

    do {
        var p = Math.pow(10,min);
        res.push([s*p, "\\("+pm+"10^{"+min+"}\\)"]);
        min += step;
    } while (min <= max);
    return res;
}
