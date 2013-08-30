$(document).ready(function() {
    //Create the canvas to draw on
    var paper = Raphael("mass_imbalanced", 250, 200);

    paper.customAttributes.ballShading = function(r, g, b) {
        // Using customAttributes a new attribute named ballShading
        // is defined that gives a nice shiny sphere-like shading.
        // This furthermore allows us to animate the gradient, which
        // would not have been possible using the 'fill' attribute alone
        var col = "rgb(" + r + "," + g + "," + b + ")"
        return {fill: "r(0.30,0.30)white-" + col + ":60-" + col};
    }

    var radius = 30,
        x1 = 35, y1 = 35,
        x2 = 185, y2 = 35,
        x3 = 85, y3 = 135;
    var animation_time = 1000;    // in milliseconds
    var purple = [0x80, 0, 0x80]  // "purple" = "#800080"
        green  = [0, 0x80, 0x80]; // Just some greenish colour

    //Draw the spheres and give them a nice gradient using the above
    //defined ballShading attribute
    var circle_attr = {ballShading: purple};
    var circ1 = paper.circle(x1, y1, radius).attr(circle_attr);
    var circ2 = paper.circle(x2, y2, radius).attr(circle_attr);
    var circ3 = paper.circle(x3, y3, radius).attr(circle_attr);

    $("#decrease_ball").on("impress:substep-enter", function() {
        circ1.animate( {
            ballShading: green,
            r: radius * 2 / 3
        }, animation_time);
    })
});
