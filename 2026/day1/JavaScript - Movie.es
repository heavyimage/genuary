#javascript

function pad(number) {
	number = number + ''; // convert to string
 	while (number.length < 4) {
		number = "0" + number;
	}
	return number;
}


Builder.load("subdivider_v002.es");
max = 500;
for (i = 1; i <=  max; i+=1) {
       c = 1/i

	Builder.reset();	
	Builder.setSize(0,512);
	Builder.define("msize",c);

	Builder.build();

	 // ---- Internal raytrace ------
       Builder.raytraceToFile("N" + pad(i) + ".png",true);
}
