$(document).ready(function(){
    function curvePath(x1,y1,x2,y2,F){
        var path = "M" + x1 + "," + y1;
        var xm = (x1+x2)/2, ym = (y1+y2)/2;
        var dx = x2-xm, dy = y2-ym;
        xm += dy*F;
        ym -= dx*F;
        path += "S" + xm + "," + ym + "," + x2 + "," + y2;
        return path;
    }
    // Create the canvas
    var paper = Raphael("recombination_placeholder");

    var x1 = 50, y1 = 100,
        x2 = 210, y2 = 60,
        x3 = 175, y3 = 200,
        radius = 34;
    var line_attr = {
        stroke:"blue",
        "stroke-width":5,
        "stroke-dasharray":"-",
    };
    //Draw the spheres and give them a nice gradient
    var line_attr = {"stroke-width":4, "arrow-end":"block-wide-long"};
    paper.path("M50,100l80,30").attr(line_attr);
    paper.path("M210,60l-60,60").attr(line_attr);
    paper.path("M175,200l-30,-60").attr(line_attr);
    var circle_attr = {"fill":"r(0.30,0.30)white-purple:60-purple"}
    paper.circle(x1,y1,radius).attr(circle_attr);
    paper.circle(x2,y2,radius).attr(circle_attr);
    paper.circle(x3,y3,radius).attr(circle_attr);

    function drawProducts(){
        x1 = 500, y1 = 125;
        x2 = 660, y2 = 90;
        x3 = 660, y3 = 180;
        paper.path("M500,125l-100,-30").attr(line_attr);
        paper.path("M660,135l100,10").attr(line_attr);
        var line_attr2 = {
            stroke:"blue",
            "stroke-width":5,
            "stroke-dasharray":"-",
        };
        paper.path(curvePath(x3,y3,x2,y2,2)).attr(line_attr2)
        paper.path(curvePath(x3,y3,x2,y2,-2)).attr(line_attr2)
        paper.circle(x1,y1,radius).attr(circle_attr);
        paper.circle(x2,y2,radius).attr(circle_attr);
        paper.circle(x3,y3,radius).attr(circle_attr);
    }
    $("#draw_products").on("impress:substep-enter",drawProducts)


})
