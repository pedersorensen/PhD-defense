$(document).ready(function(){
    // For the title page (very first slide) a little animation of three
    // particles 'orbiting' eachother is shown. This file describes this
    // animation.

    //Create the canvas to draw on
    var paper = Raphael("three_particles", 500,300);
    // Overall 'size' of the three-body system
    var system_size = 100;
    var animation_speed = 250;
    // Initial hyper-angles and hyper-angular velocities
    var alphai   = 0.8,
        alphaxi  = 0.4,
        alphayi  = 0.2,
        valphai  = 0.5,
        valphaxi = -0.04,
        valphayi = 0.06;

    // Some practical constants
    var sq2_3  = Math.sqrt(2/3),
        sq6inv = 1/Math.sqrt(6),
        sq2inv = 1/Math.sqrt(2);

    // Initial position of the particles, these dont matter much
    var x0 = 400,
        y0 = 100,
    radius = 17;

    //Draw the spheres and give them a nice gradient
    var circle_attr = {"fill":"r(0.30,0.30)white-purple:60-purple"}
    var circ1 = paper.circle(x0,y0,radius).attr(circle_attr);
    var circ2 = paper.circle(x0,y0,radius).attr(circle_attr);
    var circ3 = paper.circle(x0,y0,radius).attr(circle_attr);
    function animate_particles(){
        // This function increments the hyper-angles and calculates the
        // new cartesian coordinates from the Jacobi-coordinates.
        alphai  += valphai;
        alphaxi += valphaxi;
        alphayi += valphayi;
        var sinalphai = Math.sin(alphai),
            cosalphai = Math.cos(alphai);

    var xi1 = system_size*sinalphai*Math.sin(alphaxi)
        xi2 = system_size*sinalphai*Math.cos(alphaxi)
        yi1 = system_size*cosalphai*Math.sin(alphayi)
        yi2 = system_size*cosalphai*Math.cos(alphayi);

    var dx1 = sq2_3*yi1,
        dy1 = sq2_3*yi2,
        dx2 = -yi1*sq6inv+xi1*sq2inv,
        dy2 = -yi2*sq6inv+xi2*sq2inv,
        dx3 = -yi1*sq6inv-xi1*sq2inv,
        dy3 = -yi2*sq6inv-xi2*sq2inv;

    // And finally we animate by doing a relative transition
        var t1 = "t"+dx1+","+dy1;
        var t2 = "t"+dx2+","+dy2;
        var t3 = "t"+dx3+","+dy3;
        // The animation run in parallel
        circ1.animate({transform:t1},animation_speed);
        circ2.animate({transform:t2},animation_speed);
        // Only provide the callback (the last argument) in one of the
        // animation commands, otherwise the number of animation instances
        // would multiply by 3 on every run
        circ3.animate({transform:t3},animation_speed,animate_particles);
    }
    function stop_animation(){
        circ1.stop();
        circ2.stop();
        circ3.stop();
    }
    // Only activate the animation when the title slide is active
    var title = document.getElementById("title");
    title.addEventListener("impress:stepenter", animate_particles, false);
    title.addEventListener("impress:stepleave", stop_animation, false);
});


