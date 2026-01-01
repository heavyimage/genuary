set MaxObjects 10000000
set seed 237

rule abox {
	{s 0.99} box
}


rule piller {
	{x 0.25 y 0.25 z 0.25 s 0.5 0.5 0.5 } shiftcube
	{x -0.25 y 0.25 z 0.25 s 0.5 0.5 0.5 } shiftcube
}

rule piller { 
	{x 0.2 y 0.25 z 0.25 s 0.6 0.5 0.5 } shiftcube
	{x -0.3 y 0.25 z 0.25 s 0.4 0.5 0.5 } shiftcube
}

rule piller { 
	{x 0.15 y 0.25 z 0.25 s 0.7 0.5 0.5 } shiftcube
	{x -0.35 y 0.25 z 0.25 s 0.3 0.5 0.5 } shiftcube
}

rule piller { 
	{x 0.1 y 0.25 z 0.25 s 0.8 0.5 0.5 } shiftcube
	{x -0.4 y 0.25 z 0.25 s 0.2 0.5 0.5 } shiftcube
}

rule piller { 
	{x 0.05 y 0.25 z 0.25 s 0.9 0.5 0.5 } shiftcube
	{x -0.45 y 0.25 z 0.25 s 0.1 0.5 0.5 } shiftcube
}

rule piller { 
{x 0 y 0.25 z 0.25 s 1 0.5 0.5 } abox
}

rule piller {}

rule inner {
	4 * {rx 90} piller
}

rule shiftcube {1 * {rx 0} inner}
rule shiftcube {1 * {rx 90} inner}
rule shiftcube {1 * {rx 180} inner}
rule shiftcube {1 * {rx 270} inner}
rule shiftcube {1 * {ry -90} inner}
rule shiftcube {1 * {ry 90} inner}



{c teal} shiftcube
