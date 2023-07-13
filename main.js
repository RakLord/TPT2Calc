let input1;
let input2;
let input3;
let input4;

let output;

let outputValue;


$(document).ready(function() {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA");
    output = $(".output-box");

    input1 = $('div.flow:eq(0) input');
    input2 = $('div.flow:eq(1) input');
    input3 = $('div.flow:eq(2) input');
    input4 = $('div.flow:eq(3) input');

    function checkValid(input) {
        let val = input.val().trim();
        let isValid = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test(val);
        
        if (isValid) {
            input.removeClass("input-invalid");
            return val;
        }
        else {
            input.addClass("input-invalid");
            return false;
        }
    }

   input1.on("input", function() {
    if (checkValid(input1)) {
        calculate();
    }
   });

   input2.on("input", function() {
    if (checkValid(input2)) {
      calculate();
    }
  });
  
  input3.on("input", function() {
    if (checkValid(input3)) {
      calculate();
    }
  });
  
  input4.on("input", function() {
    if (checkValid(input4)) {
      calculate();
    }
  });
});

function calculate() {
    outputValue = 
    parseFloat(input1.val()) +
    parseFloat(input2.val()) +
    parseFloat(input3.val()) +
    parseFloat(input4.val());
    
    if (outputValue) {
        output.val(outputValue);
    }
    else {
        output.val("Output");
    }
    
}