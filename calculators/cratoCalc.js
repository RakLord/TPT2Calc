
export class CratoCalculator {
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
      this.title = $("<h2>").text("Cratos Calculator");
  
  
      // Inputs Stuff
      this.inputsGrid = $("<div>").addClass("grid-even-columns");
  
      this.inputs = {};
      
      this.inputs.townLevel = newInput("Town Level");
      this.inputsGrid.append(this.inputs.townLevel);  

      this.inputs.currentExperience = newInput("Current Experience");
      this.inputsGrid.append(this.inputs.currentExperience);


      // Output Stuff
      this.output = $("<div>").addClass("flex-container flex-col flex-center");
      this.outputTitle = $("<h2>").addClass("flex-container flex-col flex-center");
      this.outputTitle.text("Output");
      this.outputInput = $("<input>").addClass("output-box");
      this.outputInput.attr("placeholder", "OUTPUT");
      this.output.append(this.outputTitle, this.outputInput);
    
      // Add all to section
      this.section.append(this.title);
      this.section.append(this.inputsGrid);
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
      
      setupInputs(this.inputs.townLevel);
      setupInputs(this.inputs.currentExperience);
    }
    
    calculate() {

      let v1 = parseFloat(this.inputs.townLevel.children().last().val());
      let v2 = parseFloat(this.inputs.currentExperience.children().last().val());

      let outputValue = v1 + v2;
      
      console.log(outputValue);
      if (outputValue) {
          this.outputInput.val(outputValue);
      }
      else {
          this.outputInput.val("Output");
      }
    }
  }
