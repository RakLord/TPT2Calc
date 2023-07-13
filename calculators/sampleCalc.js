
export class Calculator {
    constructor() { 
      
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
  
  
      this.section = $("<section>").addClass("calc");
      this.title = $("<h2>").text("Calculator");
  
  
      // Inputs Stuff
      this.inputsGrid = $("<div>").addClass("grid-even-columns");
  
      this.inputs = {};
      
      this.inputs.value1 = newInput("Input 1");
      this.inputs.value2 = newInput("Input 2");
      this.inputs.value3 = newInput("Input 3");
      this.inputs.dropdown1 = newInput("Dropdown Test", ["Test1", ["Test 2"]])
  
      this.inputsGrid.append(this.inputs.value1);      
      this.inputsGrid.append(this.inputs.value2);      
      this.inputsGrid.append(this.inputs.value3);      
      this.inputsGrid.append(this.inputs.dropdown1);      
  
      // Output Stuff
      this.output = $("<div>").addClass("flex-container flex-col flex-center");
      this.outputTitle = $("<h2>").addClass("flex-container flex-col flex-center");
      this.outputTitle.text("Output");
      this.outputInput = $("<input>").addClass("output-box");
      this.outputInput.attr("placeholder", "OUTPUT");
      this.output.append(this.outputTitle, this.outputInput);
  
  
  
      // Add all to section
      this.section.append(this.title);
      this.section.append(this.inputsGrid)
      this.section.append(this.output);
      
      // Add section to main
      $("main").append(this.section);
  
      // Store reference to "this" so it can be used inside of the scope for checking input updates
      const self = this;
  
      function setupInputs(value) {
        value.on("input", function() {
          // This needs to reference the last child o fthe value1 selector as that is the input field
          let valid = checkValid(value.children().last());  
          if (valid) {
            self.calculate();
          }
        });
      }
      
      setupInputs(this.inputs.value1);
      setupInputs(this.inputs.value2);
      setupInputs(this.inputs.value3);
    }
    
    calculate() {
      let dropdownValue = this.inputs.dropdown1.find("option:selected").val();
      
      let outputValue =
      parseFloat(this.inputs.value1.children().last().val()) +
      parseFloat(this.inputs.value2.children().last().val()) +
      parseFloat(this.inputs.value3.children().last().val());
      
      console.log("OUTPUT:" + outputValue.toString());
      if (outputValue) {
          this.outputInput.val(outputValue);
      }
      else {
          this.outputInput.val("Output");
      }
    }
  }
