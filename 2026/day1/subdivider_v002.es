// Camera settings. Place these before first rule call.
set translation [-0.171765 -0.600375 -20]
set rotation [-0.706279 0.706133 -0.0506809 0.512022 0.460066 -0.725383 -0.488897 -0.538273 -0.686489]
set pivot [0 0 0]
set scale 5.85

// set some attributes
set seed 321
set MaxObjects 10000000
set minSize 0.01

// Setup rayracing
set raytracer::dof [0.27, 0.045]
set raytracer::size [0x1080] 
set raytracer::samples 16

// utility rules
rule abox {{s 0.95} box}

// Base Cases
rule piller w 2 {}
rule piller w 8 { 
	{x 0 y 0.25 z 0.25 s 1 0.5 0.5 } abox
}

//  Recursion
rule piller w 10 {
	{x 0.25 y 0.25 z 0.25 s 0.5 0.5 0.5 } shiftcube
	{x -0.25 y 0.25 z 0.25 s 0.5 0.5 0.5 } shiftcube
}

rule piller w 10 { 
	{x 0.2 y 0.25 z 0.25 s 0.6 0.5 0.5 } shiftcube
	{x -0.3 y 0.25 z 0.25 s 0.4 0.5 0.5 } shiftcube
}

rule piller w 10 { 
	{x 0.15 y 0.25 z 0.25 s 0.7 0.5 0.5 } shiftcube
	{x -0.35 y 0.25 z 0.25 s 0.3 0.5 0.5 } shiftcube
}

rule piller w 10 { 
	{x 0.1 y 0.25 z 0.25 s 0.8 0.5 0.5 } shiftcube
	{x -0.4 y 0.25 z 0.25 s 0.2 0.5 0.5 } shiftcube
}

rule piller w 10 { 
	{x 0.05 y 0.25 z 0.25 s 0.9 0.5 0.5 } shiftcube
	{x -0.45 y 0.25 z 0.25 s 0.1 0.5 0.5 } shiftcube
}

// Equalize Orientation
rule shiftcube {1 * {rx 0} inner}
rule shiftcube {1 * {rx 90} inner}
rule shiftcube {1 * {rx 180} inner}
rule shiftcube {1 * {rx 270} inner}
rule shiftcube {1 * {ry -90} inner}
rule shiftcube {1 * {ry 90} inner}

// an "inner" is 4 pillars with some variation in size
rule inner {4 * {rx 90} piller}

// create the outermost cube
{c teal} shiftcube
