$(document).ready(function(){
    var canvas = document.getElementById('three_particles');

    //Create the canvas to draw on
    var paper = Raphael(canvas, 800,300);

    //Practical coordinates and a radius
    var x1 = -100, y1 = 0, x2 = -100, y2 = 0, x3 = -100, y3 = 0;
    var r  = 15;

    var sq_rho_squared = 100;
    var alphai   = Math.random()*2*Math.PI;
    var alphaxi  = Math.random()*2*Math.PI;
    var alphayi  = Math.random()*2*Math.PI;
    var valphai  = (Math.random()-0.5)/10;
    var valphaxi = (Math.random()-0.5)/10;
    var valphayi = (Math.random()-0.5)/10;

    alphai   = 0.8;
    alphaxi  = 0.4;
    alphayi  = 0.2;
    valphai  = 0.0;
    valphaxi = -0.05;
    valphayi = 0.05;

    console.log(alphai);
    console.log(alphaxi);
    console.log(alphayi);
    console.log(valphai);
    console.log(valphaxi);
    console.log(valphayi);

    var sq2_3 = Math.sqrt(2/3);
    var sq6inv = 1/Math.sqrt(6);
    var sq2inv = 1/Math.sqrt(2);
    var cmx = 400, cmy = 100;

    //Draw the spheres and give them a nice gradient
    var circle_attr = {"fill":"r(0.30,0.30)white-purple:60-purple"}
    circ1 = paper.circle(x1,y1,r).attr(circle_attr);
    circ2 = paper.circle(x2,y2,r).attr(circle_attr);
    circ3 = paper.circle(x3,y3,r).attr(circle_attr);
    function animateparticles(){
        alphai  += valphai;
        alphaxi += valphaxi;
        alphayi += valphayi;
        var sinalphai = Math.sin(alphai),
            cosalphai = Math.cos(alphai);

    var xi1 = sq_rho_squared*sinalphai*Math.sin(alphaxi)
        xi2 = sq_rho_squared*sinalphai*Math.cos(alphaxi)
        yi1 = sq_rho_squared*cosalphai*Math.sin(alphayi)
        yi2 = sq_rho_squared*cosalphai*Math.cos(alphayi);

    var dx1 = sq2_3*yi1+cmx-x1,
        dy1 = sq2_3*yi2+cmy-y1,
        dx2 = -yi1*sq6inv+xi1*sq2inv+cmx-x2,
        dy2 = -yi2*sq6inv+xi2*sq2inv+cmy-y2,
        dx3 = -yi1*sq6inv-xi1*sq2inv+cmx-x3,
        dy3 = -yi2*sq6inv-xi2*sq2inv+cmy-y3;

        var t1 = "t"+dx1+","+dy1;
        var t2 = "t"+dx2+","+dy2;
        var t3 = "t"+dx3+","+dy3;
        circ1.animate({transform:t1},25);
        circ2.animate({transform:t2},25);
        circ3.animate({transform:t3},25,animateparticles);
    }
    function stop_animation(){
        circ1.stop();
        circ2.stop();
        circ3.stop();
    }
    animateparticles();

    var title = document.getElementById("title");
    title.addEventListener("impress:stepenter", animateparticles, false);
    title.addEventListener("impress:stepleave", stop_animation, false);
});


