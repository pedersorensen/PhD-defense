clc, clf, clear all, hold on

function [dpdt] = ode(x, p, E, V)
    dpdt = [
        p(2)
        2*(V(x)-E)*p(1)];
endfunction

function [res] = V(x, r0, V0)
    %res = x.^2/2;
    res = -V0*heaviside(r0-x);
endfunction

function [x p] = solve(r0, V0)
    E = 0;
    p0 = [0 1];
    Tspan = [0 3];
    options = odeset("RelTol",1e-6,"AbsTol",1e-6,"InitialStep",0.1,"MaxStep",0.1);
    %[x p] = ode45(@ode,Tspan,p0,options,E, @(x) V(x,V0, r0));
    %return
    [x1 p1] = ode45(@ode,[0 r0],p0,options,E, @(x) -V0);
    [x2 p2] = ode45(@ode,[r0 Tspan(end)],p1(end,:),options,E, @(x) 0);
    x = [x1;x2];
    p = [p1;p2];
endfunction

function [fg a] = solve(r0, V0)
    k = sqrt(2*V0);
    f = @(x) sin(k*x);

    c = cos(k*r0)*k;
    d = (sin(k*r0)-k*r0*cos(k*r0));
    g = @(x) c*x+d;

    fg = @(x) f(x).*(x<r0)+g(x).*(x >= r0);
    %a = -d/c;
    a = r0-tan(k*r0)/k;
endfunction

function [] = draw(r0, V0, x)
    col = "rgbcmyk";
    persistent i = 0
    i = mod(i++,length(col))+1;
    [f a] = solve(r0,V0);
    plot(x, V(x, r0, V0), col(i), 'linewidth', 3)
    plot(x,f(x), col(i), 'linewidth', 3)
    plot(a,0,'.k', 'linewidth', 3)
endfunction

a = @(r0, V0) r0-tan(sqrt(2*V0)*r0)/sqrt(2*V0);

axis([0 3 -4 2])
plot(xlim, [0 0], 'k')
x = linspace(0,3, 1001);
f = @(r) 1.885*r.^-1.796;

ri = 2.^-[0:7]
%Vi = [2 6.1 21.9 83 323 1279 5085 20275];
ri = [1 0.75 0.5 0.25 0.125 0.0625 0.03125 0.0078125];
Vi = f(ri);
Vi(1) = 2;
Vi(5) = 83;
Vi(6) = 324;
Vi(7) = 1279;
Vi(8) = 20275;
a1 = a(ri(1), Vi(1));
for i = 1:length(ri)
    r0 = ri(i);
    V0 = Vi(i);
    V0 = fzero(@(V0) a(r0,V0)-a1, V0);
    Vi(i) = V0;
    draw(r0,V0,x)
endfor
[ri' Vi']

return
clf, hold on
loglog(r,V)
c = polyfit(log(r(4:end)), log(V(4:end)),1);
a = exp(c(2))
b = c(1)
f = @(x) a*x.^b;
loglog(r,f(r),'r')
