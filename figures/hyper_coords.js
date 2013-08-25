window.onload = function()
{
    var canvas = document.getElementById('hyper_coords');
    var DX = 75, DY = 185;

    function moveId(elementId, x, y) {
        //Move an element given by it elementId to position (x,y) relative
        //to the top left corner of the canvas
        var element = document.getElementById(elementId)
        element.style.position = "absolute";
        element.style.left     = DX+x+"px";
        element.style.top      = DY+y+"px";
        return element
    }
    function arrow(x1,y1,x2,y2,r1,r2) {
        //A utility function that draws a line from the rim of a circle of
        //radius r1 at center (x1,y1) to a circle of radius r2 at center
        //(x2,y2). If only r1 is specified then r2 is assumed equal to r1

        r2 = (typeof r2 === 'undefined') ? r1 : r2
        var dx     = x2-x1;
        var dy     = y2-y1;
        var alpha  = Math.atan2(dy,dx);
        x1        += r1*Math.cos(alpha);
        y1        += r1*Math.sin(alpha);
        x2        -= r2*Math.cos(alpha);
        y2        -= r2*Math.sin(alpha);
        var line   = paper.path("M"+x1+","+y1+" L" +x2+","+y2);
        return line
    }
    //Create the canvas to draw on
    var paper = Raphael(canvas, 800,300);

    //Practical coordinates and a radius
    var x1 = 100, y1 = 100,
        x2 = 300, y2 = 100,
        x3 = 150, y3 = 250,
        r  = 40;

    //Draw the spheres and give them a nice gradient
    var circle_attr = {"fill":"r(0.30,0.30)white-purple:60-purple"}
    paper.circle(x1,y1,r).attr(circle_attr);
    paper.circle(x2,y2,r).attr(circle_attr);
    paper.circle(x3,y3,r).attr(circle_attr);

    //Draw the connecting arrows
    var line_attr = {"stroke-width":4, "arrow-end":"block-wide-long"};
    arrow(x2,y2,x1,y1,r).attr(line_attr);
    arrow(x3,y3,x1,y1,r).attr(line_attr);
    arrow(x3,y3,x2,y2,r).attr(line_attr);

    //Move the arrow "captions" into place
    //These are defined in the html document as <p id="r_ij">...</p>
    moveId("r_12", (x1+x2)/2   , (y1+y2)/2-30);
    moveId("r_13", (x1+x3)/2-30, (y1+y3)/2+10);
    moveId("r_23", (x2+x3)/2+30, (y2+y3)/2+10);

    //Place text-markers near the spheres
    moveId("v1",x1-40,y1-40);
    moveId("v2",x2+50,y2-40);
    moveId("v3",x3-50,y3+50);
    moveId("rho_def",50,350);

    //Now to draw the same spheres with Jacobi-coordinates
    //Start by moving everyting to the right
    x1 += 400;
    x2 += 400;
    x3 += 400;

    //Alternate emthod of setting the same attributes for several elements
    //All elements created between setStart() and setFinish() are "caught"
    //and stored in the 'st' variable
    paper.setStart();
        paper.circle(x1,y1,r);
        paper.circle(x2,y2,r);
        paper.circle(x3,y3,r);
    var st = paper.setFinish();
    //Apply attributes to all the "caught" elements ine one go
    st.attr({"fill":"r(0.30,0.30)white-purple:60-purple"});

    //Midpoint between particle 2 and 3
    var xm = (x2+x3)/2, ym = (y2+y3)/2

    arrow(x3,y3,x2,y2,r).attr(line_attr);
    arrow(xm,ym,x1,y1,0,r).attr(line_attr);
    moveId("x_1",xm+30,ym+20);
    moveId("y_1",xm-30,ym-50);
}
