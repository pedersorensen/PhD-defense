$(document).ready(function(){
    //Create the canvas to draw on
    var placeholder = $("#zero_range_bound_states");
    var DX = 100, DY = 125;
    var paper = Raphael("zero_range_bound_states", 800,500);

    // Initial position of the particles, these dont matter much
    var radius = 34, x1, x2, x3, y1, y2, y3;
    // Overall 'size' of the three-body system
    x1 = 100, y1 = 100;
    x2 = 250, y2 = 100;
    function curvePath(x1,y1,x2,y2,F){
        var path = "M" + x1 + "," + y1;
        var xm = (x1+x2)/2, ym = (y1+y2)/2;
        var dx = x2-xm, dy = y2-ym;
        xm += dy*F;
        ym -= dx*F;
        path += "S" + xm + "," + ym + "," + x2 + "," + y2;
        return path;
    }
    function putText(x,y,text){
        placeholder.append("<div style='position:absolute;" +
                "left:"+(x+DX)+"px;" +
                "top:" +(y+DY)+"px'>" +
                text + "</div>")
    }

    var line_attr = {
        stroke:"blue",
        "stroke-width":5,
        "stroke-dasharray":"-",
    };
    paper.path(curvePath(x2,y2,x1,y1,1.5)).attr(line_attr);
    paper.path(curvePath(x2,y2,x1,y1,-1.5)).attr(line_attr);
    //Draw the spheres and give them a nice gradient
    var circle_attr = {"fill":"r(0.30,0.30)white-purple:60-purple"}
    paper.circle(x1,y1,radius).attr(circle_attr);
    paper.circle(x2,y2,radius).attr(circle_attr);
    putText(x1+42,y1+3,"a > 0");

    function dimer_negative(){
        x1 = 100;
        x2 = 250;
        y1 = 300;
        y2 = 300;
        paper.circle(x1,y1,radius).attr(circle_attr);
        paper.circle(x2,y2,radius).attr(circle_attr);
        putText(x1+42,y1+3,"a < 0");
    }

    function trimer_positive(){
        x1 = 500, y1 = 50;
        x2 = 650, y2 = 50;
        x3 = 575, y3 = 175;

        paper.path(curvePath(x1,y1,x2,y2,1)).attr(line_attr);
        paper.path(curvePath(x2,y2,x3,y3,1)).attr(line_attr);
        paper.path(curvePath(x3,y3,x1,y1,1)).attr(line_attr);
        paper.circle(x1,y1,radius).attr(circle_attr);
        paper.circle(x2,y2,radius).attr(circle_attr);
        paper.circle(x3,y3,radius).attr(circle_attr);
        putText(x1+42,y1+40,"a > 0");
    }

    function trimer_negative(){
        x1 = 500, y1 = 300;
        x2 = 650, y2 = 300;
        x3 = 575, y3 = 425;
        paper.path(curvePath(x1,y1,x2,y2,1)).attr(line_attr);
        paper.path(curvePath(x2,y2,x3,y3,1)).attr(line_attr);
        paper.path(curvePath(x3,y3,x1,y1,1)).attr(line_attr);
        paper.circle(x1,y1,radius).attr(circle_attr);
        paper.circle(x2,y2,radius).attr(circle_attr);
        paper.circle(x3,y3,radius).attr(circle_attr);
        putText(x1+42,y1+40,"a < 0");
    }
    $("#show_dimer_negative").on("impress:substep-enter",dimer_negative);
    $("#show_trimer_positive").on("impress:substep-enter",trimer_positive);
    $("#show_trimer_negative").on("impress:substep-enter",trimer_negative);
});
