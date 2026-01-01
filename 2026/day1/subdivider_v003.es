// Camera settings. Place these before first rule call.
set translation [-0.171765 -0.4803 -20]
set rotation [-0.706279 0.706133 -0.0506809 0.512022 0.460066 -0.725383 -0.488897 -0.538273 -0.686489]
set pivot [0 0 0]
set scale 5.7

// set some attributes
set seed 375
set MaxObjects 15000000
set minSize 0.1

// Setup rayracing
set raytracer::dof [0.29, 0.033]
set raytracer::size [0x1080] 
set raytracer::samples 16

#define OUTER 0.98
#define INNER 0.965

// utility rules
rule shape {
	 {s 0.1 0.5 0.5 s INNER} box
}
rule container w 1 {shape}
rule container w 1 {
	 {s 0.1 0.5 0.5 s INNER} shiftcube
}
rule field {
	1 * {x -4.5 y -4.5 z -4.5} 20 * {x 1.1} 20 * {y 1.1} 20 * {z 1.1} 1 * {s 0.05} box
}

// xforms
rule rotshape {1 * {rx 0} shape}
rule rotshape {1 * {rx 90} shape}
rule rotshape {1 * {rx 180} shape}
rule rotshape {1 * {rx 270} shape}
rule rotshape {1 * {ry -90} shape}
rule rotshape {1 * {ry 90} shape}

rule onebox {1 * {s OUTER} 1 * {x 0.1} container}
rule twobox {1 * {s OUTER} 2 * {x 0.1} container}
rule threebox {1 * {s OUTER} 3 * {x 0.1} container}
rule fourbox {1 * {s OUTER} 4 * {x 0.1} container}
rule fivebox {1 * {s OUTER} 5 * {x 0.1} container}
rule sixbox {1 * {s OUTER} 6 * {x 0.1} container}
rule sevenbox {1 * {s OUTER} 7 * {x 0.1} container}
rule eightbox {1 * {s OUTER} 8 * {x 0.1} container}
rule ninebox {1 * {s OUTER} 9 * {x 0.1} container}
rule tenbox {1 * {s OUTER} 10 * {x 0.1} container}


//  Recursion
rule piller w 10 {
	1 * {x -0.55 y 0.25 z 0.25} fivebox
	1 * {ry 180 x -0.55 y 0.25 z -0.25} fivebox
}

rule piller w 10 {
	1 * {x -0.55 y 0.25 z 0.25} fourbox
	1 * {ry 180 x -0.55 y 0.25 z -0.25} sixbox
}

rule piller w 10 {
	1 * {x -0.55 y 0.25 z 0.25} threebox
	1 * {ry 180 x -0.55 y 0.25 z -0.25} sevenbox
}

rule piller w 10 {
	1 * {x -0.55 y 0.25 z 0.25} twobox
	1 * {ry 180 x -0.55 y 0.25 z -0.25} eightbox
}

rule piller w 10 {
	1 * {x -0.55 y 0.25 z 0.25} onebox
	1 * {ry 180 x -0.55 y 0.25 z -0.25} ninebox
}

rule piller w 10 {
	1 * {x -0.55 y 0.25 z 0.25} tenbox
}

rule piller w 10 {
	1 * {x -0.55 y 0.25 z 0.25} fourbox
	1 * {ry 180 x -0.55 y 0.25 z -0.25} fourbox
}

rule piller w 10 {
	1 * {x -0.55 y 0.25 z 0.25} threebox
	1 * {ry 180 x -0.55 y 0.25 z -0.25} threebox
}

rule piller w 10 {
	1 * {x -0.55 y 0.25 z 0.25} twobox
	1 * {ry 180 x -0.55 y 0.25 z -0.25} twobox
}



// Equalize Orientation
rule shiftcube {1 * {rx 0} inner}
rule shiftcube {1 * {rx 90} inner}
rule shiftcube {1 * {rx 180} inner}
rule shiftcube {1 * {rx 270} inner}
rule shiftcube {1 * {ry -90} inner}
rule shiftcube {1 * {ry 90} inner}

// an "inner" is 4 pillars
rule inner {4 * {rx 90} piller}

// create the outermost cube
//{c teal} shiftcube
//{c teal} field
 {s 0.1 0.5 0.5 s INNER} box
{x 1 color green} box



