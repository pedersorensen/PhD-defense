
window.onload = function () {
    var r = Raphael("gRaphTest",800,640);
    var txtattr = { font: "30 sans-serif" };
    r.text(360, 25, "Symbols, axis and hover effect").attr(txtattr);

    var options = {
        nostroke: false,
        axis: "0 0 1 1",
        symbol: "circle",
        smooth: true
    };
    var lines = r.linechart(10, 50, 640, 480,
        [
            [1, 2, 3, 4, 5, 6, 7],        //x-values for the blue curve
            [3.5, 4.5, 5.5, 6.5, 7, 8]    //x-values for the green curve
        ],
        [
            [12, 32, 23, 15, 17, 27, 22], //y-values for the blue curve
            [10, 20, 30, 25, 15, 28]      //y-values for the green curve
        ],
        options);
    lines.attr(txtattr);
};
