/*
<!--
 Name: Brendan Jacques, brendan_jacques@student.uml.edu
 Student - Computer Science Major, UMass Lowell
 Comp.4610, GUI Programming I
 File: /usr/cs/2018/bjacques/public_html/461f2017/hw4/js/midterm.js
 Created: 7-November-2017
-->
*/

/* Explanation of the final program:
	When using innerHTML, insert javascript variables by bounding them with + signs.
	Create a specialized js code that inserts new html into the page, using the js
	rule to make <span id="item+variable+">. Then use a for loop to fill in each
	section of the table.

	+= operator allows for appending strings to innerhtml
 */
 /* Table cells each need to compute the car's cost per month & cost per mile. */

function table_compute() {
	/* For the final program, u should turn price and mpg into arrays to hold infinitely many inputs */
	var input_fields = document.getElementById("input_field_num").value;
	var inputs = [];
	var price = []; var current_p;
	var mpg = []; var current_m;
	var price_per_gallon = document.getElementById("per_gallon").value;
	var expected_miles = document.getElementById("miles_per_month").value;
	var i, j, k;
	var l = 0;
	var check1 = 0, check2 = 0;
	var extra;
	var per_month; var per_mile;
	var valid_entries_p = input_fields;
	var valid_entries_m = input_fields;
	var first_row = ""; var new_row = "";

	for(i = 1; i <= input_fields; i++) {
		current_p = document.getElementById("price"+ i).value;
		current_m = document.getElementById("mpg" + i).value;
		current_i = document.getElementById("insurance" + i).value;
		current_main = document.getElementById("maintenance" + i).value;

		if(((current_p != "") && (current_m != "") && (current_i != "") && (current_main != "")) && ((current_p >= 0) && (current_m >= 0) && (current_i >= 0) && (current_main >= 0))) {
			//current_p and current_m only inserted into array if they BOTH
			//have been given values.
			inputs[l] = {
				price: current_p,
				mpg: current_m,
				insurance: current_i,
				maintenance: current_main
			};
			l++;
			for(j = 0, check1 = 0; j < valid_entries_p && check1 != 1; j++) {
				//Searches through price[k] for the proper spot for the current_p
				//so that the array is ordered from least to greatest.
				if(price[j] == null) {
					//If current price[k] cell is empty, place current_p here
					//and end the loop.
					price[j] = current_p;
					check1 = 1;
				}
				else if(price[j] == +current_p) {
					check1 = 1;
					valid_entries_p = valid_entries_p - 1;
				}
				else if(+price[j] > +current_p) {
					//If current_p is less than the value in price[k], place
					//current_p here, make the original value of price[k] the
					//new current_p, and continue the loop.
					extra = price[j];
					price[j] = current_p;
					current_p = extra;
					extra = 0;
				}
			} //end of for loop
			for(k = 0, check2 = 0; k < valid_entries_m && check2 != 1; k++) {
				//Searches through mpg[k] for the proper spot for the current_m
				//so that the array is ordered from least to greatest.
				if(mpg[k] == null) {
					//If current mpg[k] cell is empty, place current_m here
					//and end the loop.
					mpg[k] = current_m;
					check2 = 1;
				}
				else if(mpg[k] == +current_m) {
					check2 = 1;
					valid_entries_m = valid_entries_m - 1;
				}
				else if(+mpg[k] > +current_m) {
					//If current_m is less than the value in mpg[k], place
					//current_m here, make the original value of mpg[k] the
					//new current_m, and continue the loop.
					extra = mpg[k];
					mpg[k] = current_m;
					current_m = extra;
					extra = 0;
				}
			} //end of for loop
		} else { //end of if statement
			valid_entries_p = valid_entries_p - 1;
			valid_entries_m = valid_entries_m - 1;
		}
	} //end of for statement
	if(valid_entries_p == 0 || valid_entries_m == 0 || (valid_entries_p == 0 && valid_entries_m == 0)) {
		document.getElementById("results").style.display = "block";
		document.getElementById("results").style.border = "none";
		document.getElementById("results").innerHTML = "No valid values given. Please submit both the price and miles per gallon for each Car being compared AND have both be greater than or equal to zero.";
		return;
	}
	/* Okay, starting from here you have every price & mpg value in sorted
	   arrays. Next steps:
	   1) First row should just be the list of every value in the price array
	   2) Each other row should be:
	   		a) That row's mpg value (in order)
	   		b) each cell (use 11, 12, 21, etc for cell content for now). 
	*/
	//First Row
	first_row = "<td class='title'>Price/Fuel Consumption</td>"
	for(i = 0; i < valid_entries_p; i++) {
		first_row += "<td class='price'>$"+ price[i] +"</td>";
	}
	document.getElementById("results").innerHTML ="<tr>" + first_row +"</tr>";
	//Every row afterward
	var new_row;
	for(i = 0; i < valid_entries_m; i++) {
		//loop for each row in the table
		//append innerHTML to table id="results".
		new_row = "";
		new_row += "<td class='mpg'>"+ mpg[i] +" mpg</td>";
		for(j = 0; j < valid_entries_p; j++) {
			//loop for each cell in each row
			for(k = 0, check1 = 0; k < inputs.length && check1 != 1; k++) {
				if((mpg[i] == inputs[k].mpg) && (price[j] == inputs[k].price)) {
					per_mile = ((+expected_miles / +inputs[k].mpg) * +price_per_gallon);
					per_month = (+inputs[k].insurance) + (+inputs[k].maintenance) + per_mile;
					new_row += "<td class='cell'>("+ per_month + " ) / (" + per_mile +")</td>";
					check1 = 1;
				}
			}
			if(check1 != 1) {
				new_row += "<td class='cell'> ... </td>";
			}
		}
		document.getElementById("results").innerHTML += "<tr>"+ new_row +"</tr>";
	}
	document.getElementById("results").style.display = "table";
	return;
}

//Creates a # of html form lines to account for the # of fields given in input_field_num.
function field_generate() {
	var input_fields = document.getElementById("input_field_num").value;
	if(input_fields <= 0) {
		document.getElementById("fields").innerHTML = "Invalid number of fields given.";
		return;
	}
	var i = +1;
	var blank = "";

	document.getElementById("fields").innerHTML = blank;

	var new_field = "";

	for(i = 1; i <= input_fields; i++) {
		new_field = "<tbody class='field'><tr><th>Car "+ i +":</th><th>Insert Values Below</th></tr><tr><td>Price:</td><td> <input id='price"+ i + "' type='number'/></td></tr><tr><td>Miles Per Gallon:</td><td><input id='mpg" + i + "' type='number'/></td></tr><tr><td>Insurance Cost Per Month:</td><td><input id='insurance" + i + "' type='number'/></td></tr><tr><td>Maintenance Cost Per Month:</td><td><input id='maintenance" + i + "' type='number'/></td></tr></tbody>";
		document.getElementById("fields").innerHTML += new_field;
	}
	document.getElementById("defaults").style.display = "table";
	document.getElementById("submit").style.display = "inline-block";
	document.getElementById("note1").style.display = "block";
	document.getElementById("note2").style.display = "block";
	return;
}