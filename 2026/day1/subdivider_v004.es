// Camera settings. Place these before first rule call.
set translation [0.707864 2.64166 -20]
set rotation [0.173492 -0.804757 0.567721 -0.916348 0.0793205 0.39247 -0.36087 -0.58832 -0.72368]
set pivot [0 0 0]
set scale 7.51

// set some attribtes
set seed 33
set MaxObjects 15000000
set minSize 0.0045
#set minSize 0.1
#define FSCALE 0.9

// Setup rayracing
set raytracer::dof [0.16, 0.015]
set raytracer::size [1920x0] 
set raytracer::samples 16

// The core rule: a boximus is 3 floors
rule boximus {
	{x -0.3333} floor
	{x 0.0000} floor
	{x 0.3333} floor
}

// xforms so things aren't always aligned
rule rot_boximus {1 * {rx 0} boximus}
rule rot_boximus {1 * {rx 90} boximus}
rule rot_boximus {1 * {rx 180} boximus}
rule rot_boximus {1 * {rx 270} boximus}
rule rot_boximus {1 * {ry -90} boximus}
rule rot_boximus {1 * {ry 90} boximus}

// floors are either empty or contain 9 containers
rule floor w 1 {}
rule floor w 4 {
	{ y 0.00 z 0 s FSCALE } container
	{ y 0.33 z 0 s FSCALE} container
	{ y -0.33 z 0 s FSCALE} container
	{ y 0.33 z 0.33 s FSCALE} container
	{ y -0.33 z 0.33 s FSCALE} container
	{ y 0.33 z -0.33 s FSCALE} container
	{ y -0.33 z -0.33 s FSCALE} container
	{ y 0.00 z 0.33 s FSCALE} container
	{ y 0.00 z -0.33 s FSCALE} container
}

// a container is either the singular shape...
rule container w 1 {{s 0.13 0.33 0.66} box}
//OR another rot_boximus (recursion!)
rule container w 4 {{s 0.33} rot_boximus}

// Entry point
{c teal s 3} floor



