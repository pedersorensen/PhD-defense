window.onload = function()
{
    var DX = 75, DY = 205;
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
    var paper = Raphael('hyper_coords', 800,300);

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

    // Now everything is translated to the right
    var jacobi_shift = 400;
    x1 += jacobi_shift;
    x2 += jacobi_shift;
    x3 += jacobi_shift;
    //Midpoint between particle 2 and 3
    var xm = (x2+x3)/2, ym = (y2+y3)/2;

    // The jacobi coordinate vectors x_1 and y_1 are properly positioned
    // and then hidden
    line_attr.opacity = 0;
    var arr1 = arrow(x3,y3,x2,y2,r).attr(line_attr);
    var arr2 = arrow(xm,ym,x1,y1,0,r).attr(line_attr);
    // Move the labels for x_1 and y_1 into place and hide them
    moveId("x_1",xm+30,ym+20).style.opacity = 0;
    moveId("y_1",xm-30,ym-50).style.opacity = 0;
    moveId("jacobi_coordinates",510,-11).style.opacity = 0;

    // Here a second jacobi set
    var xm = (x3+x1)/2, ym = (y3+y1)/2;
    var arr3 = arrow(x1,y1,x3,y3,r).attr(line_attr);
    var arr4 = arrow(xm,ym,x2,y2,0,r).attr(line_attr);
    moveId("x_2",xm-20,ym+10).style.opacity = 0;
    moveId("y_2",xm+50,ym-50).style.opacity = 0;

    // And a third
    var xm = (x1+x2)/2, ym = (y1+y2)/2;
    var arr5 = arrow(x2,y2,x1,y1,r).attr(line_attr);
    var arr6 = arrow(xm,ym,x3,y3,0,r).attr(line_attr);
    moveId("x_3",xm,ym-20).style.opacity = 0;
    moveId("y_3",xm+30,ym+60).style.opacity = 0;

    function animate_jacobi(dx){
        var t1 = "t"+dx+","+0;
        st.animate({transform:t1},1000,show_labels1);
    }
    function show_labels1(dx){
        $("#jacobi_coordinates").animate({opacity:1},1000,'linear');
        $("#x_1").animate({opacity:1},1000,'linear');
        $("#y_1").animate({opacity:1},1000,'linear');
        arr1.animate({opacity:1},1000,'linear');
        arr2.animate({opacity:1},1000,'linear');
    }
    function show_labels2(){
        $("#x_1").animate({opacity:0},1000,'linear');
        $("#y_1").animate({opacity:0},1000,'linear');
        arr1.animate({opacity:0},1000,'linear');
        arr2.animate({opacity:0},1000,'linear');
        $("#x_2").animate({opacity:1},1000,'linear');
        $("#y_2").animate({opacity:1},1000,'linear');
        arr3.animate({opacity:1},1000,'linear');
        arr4.animate({opacity:1},1000,'linear');
    }
    function show_labels3(){
        $("#x_2").animate({opacity:0},1000,'linear');
        $("#y_2").animate({opacity:0},1000,'linear');
        arr3.animate({opacity:0},1000,'linear');
        arr4.animate({opacity:0},1000,'linear');
        $("#x_3").animate({opacity:1},1000,'linear');
        $("#y_3").animate({opacity:1},1000,'linear');
        arr5.animate({opacity:1},1000,'linear');
        arr6.animate({opacity:1},1000,'linear');
    }
    $("#show_jacobi1").on("impress:substep-enter", function(){
        var t1 = "t"+jacobi_shift+","+0;
        st.animate({transform:t1},1000,show_labels1);
    })
    $("#show_jacobi2").on("impress:substep-enter", show_labels2);
    $("#show_jacobi3").on("impress:substep-enter", show_labels3);
}
