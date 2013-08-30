$(document).ready(function() {
    //Create the canvas to draw on
    var paper = Raphael("animated_graph", 800, 450);
    paper.rect(0,0,800,450);

    var xmin = 0, xmax = 10, ymin = -2, ymax = 2;
    var l = 25, t = 25, r = 775, b = 425;
    var N = 51;

    var A = (t-b)/(ymax-ymin),
        B = (b*ymax-t*ymin)/(ymax-ymin)
        C = (l-r)/(xmin-xmax),
        D = (r*xmin-l*xmax)/(xmin-xmax);

    function transX(x) {return C*x+D;}
    function transY(y) {return A*y+B;}
    function get_plot_path(x,y){
        var path = "M"+transX(x[0])+","+transY(y[0]);
        for(var i = 1;i<x.length;++i){
            var xt = transX(x[i]);
            var yt = transY(y[i]);
            path += "L"+xt+","+yt
        }
        return path
    }

    // Generate some data, here a simple sine curve
    var x = [], y = [], z = [];
    for(var i = 0;i<N;++i){
        var xi = xmin+(xmax-xmin)*i/(N-1);
        var yi = Math.sin(xi);
        var zi = xi*xi/50;
        x.push(xi);
        y.push(yi);
        z.push(zi);
    }
    var line1 = paper.path(get_plot_path(x,y));
    var path2 = get_plot_path(x,z);

    $("#morf_graph").on("impress:substep-enter", function(){
        line1.animate({path:path2}, 1000);
    });
});
