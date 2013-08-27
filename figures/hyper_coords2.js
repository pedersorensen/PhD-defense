$(document).ready(function(){
    // For the title page (very first slide) a little animation of three
    // particles 'orbiting' eachother is shown. This file describes this
    // animation.

    //Create the canvas to draw on
    var paper = Raphael("hyper_coords2", 800,500);
    //paper.rect(0,0,799,500);

    // Some practical constants
    var sq2_3  = Math.sqrt(2/3),
        sq6inv = 1/Math.sqrt(6),
        sq2inv = 1/Math.sqrt(2);

    var DX = 100, DY = 130;

    function moveId(elementId, x, y) {
        //Move an element given by it elementId to position (x,y) relative
        //to the top left corner of the canvas
        var element = document.getElementById(elementId)
        element.style.position = "absolute";
        element.style.left     = DX+x+"px";
        element.style.top      = DY+y+"px";
        return element
    }
    function getCartesian(alpha, alphax, alphay, rho, x0, y0){
        // Given three hyper-angles and a hyper-radius, calculate the
        // corresponsing Cartesian coordinates.

        var sinalpha = Math.sin(alpha),
            cosalpha = Math.cos(alpha);

        // The Jacobi-vectors x_i and y_i
        var xi1 = rho*sinalpha*Math.sin(alphax)
            xi2 = rho*sinalpha*Math.cos(alphax)
            yi1 = rho*cosalpha*Math.sin(alphay)
            yi2 = rho*cosalpha*Math.cos(alphay);

        // The Cartesian equivalents
        var x1 = sq2_3*yi1+x0,
            y1 = sq2_3*yi2+y0,
            x2 = -yi1*sq6inv+xi1*sq2inv+x0,
            y2 = -yi2*sq6inv+xi2*sq2inv+y0,
            x3 = -yi1*sq6inv-xi1*sq2inv+x0,
            y3 = -yi2*sq6inv-xi2*sq2inv+y0;
        return [x1,y1,x2,y2,x3,y3];
    }
    // Initial position of the particles, these dont matter much
    var x0 = 400,
        y0 = 175,
    radius = 34;
    // Overall 'size' of the three-body system
    var rho = 200;
    var animation_speed = 1000;
    // Initial hyper-angles and hyper-angular velocities
    var alpha  = Math.PI/4,
        alphax = Math.PI/2,
        alphay = 0.0;
    var xy123 = getCartesian(alpha, alphax, alphay, rho, x0, y0);
    x1 = xy123[0];
    y1 = xy123[1];
    x2 = xy123[2];
    y2 = xy123[3];
    x3 = xy123[4];
    y3 = xy123[5];

    //Draw the spheres and give them a nice gradient
    var circle_attr = {"fill":"r(0.30,0.30)white-purple:60-purple"}
    var circ1 = paper.circle(x1,y1,radius).attr(circle_attr);
    var circ2 = paper.circle(x2,y2,radius).attr(circle_attr);
    var circ3 = paper.circle(x3,y3,radius).attr(circle_attr);

    moveId("alpha_i",10,30)
    moveId("rho",10,70)
    var text_attr = {
        'font-size':30,
        'font-family':"'Open Sans', Arial, sans-serif",
        'text-anchor':'start',
        'fill':'#555555'
    }

    var text_alpha = paper.text(50,30," = " +(alpha/Math.PI).toFixed(3));
    var text_rho = paper.text(50,70," = " +(rho/radius).toFixed(0));
    text_alpha.attr(text_attr);
    text_rho.attr(text_attr);
    function animate_circles(alpha, alphax, alphay, rho){
        var xy123 = getCartesian(alpha, alphax, alphay, rho, x0, y0),
            dx1 = xy123[0]-x1,
            dy1 = xy123[1]-y1,
            dx2 = xy123[2]-x2,
            dy2 = xy123[3]-y2,
            dx3 = xy123[4]-x3,
            dy3 = xy123[5]-y3;

        // And finally we animate by doing a relative transition
        var t1 = "t"+dx1+","+dy1;
        var t2 = "t"+dx2+","+dy2;
        var t3 = "t"+dx3+","+dy3;
        // The animations run in parallel
        circ1.animate({'transform':t1},animation_speed);
        circ2.animate({'transform':t2},animation_speed);
        circ3.animate({'transform':t3},animation_speed);
    }
    function animate_text(start, end, element, precision, factor){
        var i = 0;
        var N = 50;
        var x = start;
        var interval = setInterval(function(){
            if(i<N){
                ++i;
                x = (start+(end-start)*i/N)/factor;
                element.attr({text:" = "+x.toFixed(precision)})
            }
            else{
                clearInterval(interval)
            }
        },20)
    }
    function animate(new_rho, new_alpha, alphax, alphay){
        var rho_old = rho;
        var alpha_old = alpha;
        rho = new_rho;
        alpha = new_alpha;
        animate_circles(alpha, alphax, alphay, rho);
        animate_text(rho_old,rho, text_rho,0, radius);
        animate_text(alpha_old,alpha, text_alpha,3, Math.PI);
    }
    $("#hyper_conf1").on( "impress:substep-enter",
            function(){ animate(2*radius, Math.PI/4, alphax, alphay);})
    $("#hyper_conf2").on( "impress:substep-enter",
            function(){ animate(400, Math.PI/4, alphax, alphay);})
    var alp = Math.sqrt(0.5)*Math.atan(2*radius/Math.sqrt(325*325-4*radius*radius))
    $("#hyper_conf3").on( "impress:substep-enter",
            function(){ animate(325, alp, alphax, alphay);})
    $("#hyper_conf4").on( "impress:substep-enter",
            function(){ animate(rho, Math.PI/2, alphax, alphay);})

});


