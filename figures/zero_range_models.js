$(document).ready(function(){
    var r0, V0;
    var rmax = 4;
    var N = 26;
    // A series of (r0,V0) pairs that all give the same scattering length
    var rV = [
        [1.000e+00,2.00000000000000e+00],
        [7.500e-01,3.08261930499008e+00],
        [5.000e-01,6.11429462438777e+00],
        [2.500e-01,2.18516116801242e+01],
        [1.250e-01,8.29709969833133e+01],
        [6.250e-02,3.23660080860245e+02],
        [3.125e-02,1.27878618383715e+03],
        [7.8125e-03,2.02743027142125e+04] ]

    function psi(rV){
        // Declare local variables
        var i,x,y,k,c,d,N1,N2;
        var data = [];
        r0 = rV[0];
        V0 = rV[1];
        k  = Math.sqrt(2*V0);
        c  = Math.cos(k*r0)*k;
        d  = Math.sin(k*r0)-k*r0*Math.cos(k*r0);
        for(i = 0; i<N; ++i){
            // Wave-function inside the well
            x = r0*i/(N-1);
            y = Math.sin(x*k);
            data.push([x,y]);
        }
        for(i = 0; i<2; ++i){
            // Wave-function outside the well
            x = r0+(rmax-r0)*i;
            y = c*x+d;
            data.push([x,y]);
        }
        return data;
    }
    function V(rV){
        // Returns an array suitable for plotting the potential
        r0 = rV[0];
        V0 = rV[1];
        V0 = Math.sqrt(V0/10);
        return [[0,-V0],[r0,-V0],[r0,0],[rmax,0]];
    }
    function a(rV){
        // Return the scattering length given potential depth and width
        r0 = rV[0];
        V0 = rV[1];
        return r0-Math.tan(Math.sqrt(2*V0)*r0)/Math.sqrt(2*V0);
    }
    var a_i = a(rV[0])
    var psi_i = [], V_i = [];
    for(var i=0;i<rV.length;++i){
        psi_i.push(psi(rV[i]));
        V_i.push(V(rV[i]));
    }
    var plot_options = {
        legend:{
            backgroundOpacity:0
        },
        xaxis:{
            min:0,
            max:rmax,
            font:{size:25,color:"#555555"},
        },
        yaxis:{
            min:-4,
            max:2,
            font:{size:25,color:"#555555"},
        }
    };
    var placeholder = $("#zero_range_placeholder");
    var plot_struct = [
        {
            // Draw the x-axis at y = 0
            color:"black",
            data:[[0,0],[rmax,0]]
        },
        {
            // Draw the wave-function
            color:0,
            data:psi_i[0],
            lines:{show:true},
        },
        {
            // Draw the potential
            color:0,
            data:V(rV[0]),
        },
        {
            // Draw the point marking the scattering length
            color:"purple",
            data:[[a_i,0]],
            points:{
                show:true,
                lineWidth:5,
            }
        },
        {
            // Draw the arrow pointing down from the label 'a'
            color:"red",
            data:[[a_i-.05,0.55],[a_i,0.4],[a_i+.05,0.55],NaN,[a_i,0.4],[a_i,1]]
        }
    ]
    var plot = $.plot(placeholder, plot_struct, plot_options);
    var point = plot.pointOffset({ x: 2.05, y: 1.7});
    placeholder.append(
        "<p id='pp' style='position:absolute;left:" +
        point.left + "px;top:" + point.top +
        "px;font-size:30px'>\\(a\\)</p>");

    var prev = 0;
    function animate(event){
        var next = event.data.next;
        //console.log("prev = " + prev + ", next = " + next)
        var i = 0, N = 21, animate = 500;
        var interval = setInterval(function(){
        var psi_dat = [];
        for(var k = 0; k<psi_i[0].length; ++k){
            var x1 = psi_i[prev][k][0];
            var x2 = psi_i[next][k][0];
            var y1 = psi_i[prev][k][1];
            var y2 = psi_i[next][k][1];
            var x = x1+(x2-x1)*i/(N-1);
            var y = y1+(y2-y1)*i/(N-1);
            psi_dat.push([x, y]);
        }
        var V_dat = [];
        for(var k = 0; k<V_i[0].length;++k){
            var x1 = V_i[prev][k][0];
            var x2 = V_i[next][k][0];
            var y1 = V_i[prev][k][1];
            var y2 = V_i[next][k][1];
            var x = x1+(x2-x1)*i/(N-1);
            var y = y1+(y2-y1)*i/(N-1);
            V_dat.push([x, y]);
        }
        plot_struct[1].data = psi_dat;
        plot_struct[2].data = V_dat;
        plot.setData(plot_struct)
        plot.draw();
        ++i;
        if(i === N){
            clearInterval(interval);
            prev = next;
        }
        }, animate/(N-1));
    }
    $("#reduce_range1").on("impress:substep-exit" ,{next:0}, animate);
    $("#reduce_range1").on("impress:substep-enter",{next:1}, animate);
    $("#reduce_range2").on("impress:substep-enter",{next:2}, animate);
    $("#reduce_range3").on("impress:substep-enter",{next:3}, animate);
    $("#reduce_range4").on("impress:substep-enter",{next:4}, animate);
    $("#reduce_range5").on("impress:substep-enter",{next:5}, animate);
    $("#reduce_range6").on("impress:substep-enter",{next:6}, animate);
    $("#reduce_range7").on("impress:substep-enter",{next:7}, animate);
})
