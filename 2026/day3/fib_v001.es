// Camera settings. Place these before first rule call.
set translation [6.45054 0.659113 -20]
set rotation [-0.717809 0.00307336 -0.696239 -0.441432 0.771303 0.458511 0.538419 0.636464 -0.552292]
set pivot [0 0 0]
set scale 2.35

#define GR 1.618033
#define IG 0.618033

set MaxObjects 10000000
set seed 1

set raytracer::dof [0.1112,0.05]
set raytracer::samples 64
set raytracer::size [1920x0] 
set raytracer::phong [0.6,0.6,0.3]
set raytracer::light [10,100,-29]
set colorpool image:/home/jesse/projects/genuary/2026/day3/mm2.jpg

rule pyramid { 
	 triangle[0,0,0;1,0,0;0.5,0.5,0.5] 
	 triangle[1,0,0;1,1,0;0.5,0.5,0.5] 
	 triangle[1,1,0;0,1,0;0.5,0.5,0.5] 
	 triangle[0,1,0;0,0,0;0.5,0.5,0.5] 
} 

rule randbox {{c random} box}

rule interestingbox w 1 {randbox}
rule interestingbox w 3 md 5 > randbox {
	{s 1.01 1 1.01} interestingbox
	{s 1.02   0.975      1.02} interestingbox
	{s 1.03 0.950 1.03  } interestingbox
}
/*
rule interestingbox w 2 {{rx 0} interestingbox}
rule interestingbox w 2 {{ry 90} interestingbox}
rule interestingbox w 2 {{rz 90} interestingbox}
*/

rule pyrframe  {
    { s 0.1 0.8 0.1 x 4.5  z 4.5} interestingbox
    { s 0.1 0.8 0.1 x 4.5  z -4.5} interestingbox
    { s 0.1 0.8 0.1 x -4.5 z 4.5 } interestingbox
    { s 0.1 0.8 0.1 x -4.5 z -4.5} interestingbox

    { s 0.8 1 0.1     z 4.5 } interestingbox
    { s 0.8 1 0.1     z -4.5} interestingbox
    { s 0.1 1 0.8     x 4.5 } interestingbox
    { s 0.1 1 0.8     x -4.5} interestingbox

	{ x 0.45 y 0.45 z 0.45 s 0.1 0.1 0.1} interestingbox
	{ x -0.45 y 0.45 z 0.45 s 0.1 0.1 0.1} interestingbox
	{ x 0.45 y -0.45 z 0.45 s 0.1 0.1 0.1} interestingbox
	{ x -0.45 y -0.45 z 0.45 s 0.1 0.1 0.1} interestingbox
	{ x 0.45 y 0.45 z -0.45 s 0.1 0.1 0.1} interestingbox
	{ x -0.45 y 0.45 z -0.45 s 0.1 0.1 0.1} interestingbox
	{ x 0.45 y -0.45 z -0.45 s 0.1 0.1 0.1} interestingbox
	{ x -0.45 y -0.45 z -0.45 s 0.1 0.1 0.1} interestingbox

    //{rx 90 ry 180 z 0.65 s 0.95 0.95 4 c random} pyramid
	{y 0.525 s 0.5 c white} sphere
}


rule ratio_box md 12 {
	{s IG} pyrframe
	{s IG 1 IG x 0.8090165  z 0.1909835 ry 90} ratio_box
}

1 * {s 5} 1 * {s GR 1 GR} ratio_box
//interestingbox
