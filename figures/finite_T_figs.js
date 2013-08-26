$(document).ready(function(){
    // For the title page (very first slide) a little animation of three
    // particles 'orbiting' eachother is shown. This file describes this
    // animation.

    //Create the canvas to draw on
    var paper = Raphael("finite_T_figs", 800,600);
    var tree = paper.image("images/tree.jpg",-50,0,305*1.5,165*1.5);
    var F = 5;
    var bird = paper.image("images/bird.jpg",450,10,1600/F,1200/F);
    tree.attr({opacity:0.1});
    bird.attr({opacity:0.1});

    var source1 = document.getElementById("source1");
    var source2 = document.getElementById("source2");

    source1.addEventListener("impress:substep-enter",function(){
        tree.animate({opacity:1},1000);
    });
    source2.addEventListener("impress:substep-enter",function(){
        tree.animate({opacity:0.3},1000);
    });
    source1.addEventListener("impress:substep-exit",function(){
        bird.animate({opacity:1},1000);
    });
    source2.addEventListener("impress:substep-exit",function(){
        bird.animate({opacity:0.3},1000);
    });



});
