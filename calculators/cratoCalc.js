
export class CratoCalculator {
    constructor(func) {
      this.clearSpeedCalculator = func;
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
      this.title = $("<h2>").text("Clear Speed Calculator (CSP)");
  
  
      // Inputs Stuff
      this.inputsGrid = $("<div>").addClass("grid-even-columns");
  
      this.inputs = {};
      

      //Time
      this.inputs.gameTimeH = newInput("Time spent in Round (H)");
      this.inputsGrid.append(this.inputs.gameTimeH);

      this.inputs.gameTimeM = newInput("Time spent in Round (M)");
      this.inputsGrid.append(this.inputs.gameTimeM);

      this.inputs.gameTimeS = newInput("Time spent in Round (S)");
      this.inputsGrid.append(this.inputs.gameTimeS);

      this.inputs.gameSpeed = newInput("Game Speed", 
      ["1X","2X","3X (POWERPLANT FLOOR 2)","0.5X (ABSOLUTE ZERO)","1.5X (AZ + PPF2)"]);
      this.inputsGrid.append(this.inputs.gameSpeed);


      //Round Kills
      this.inputs.kills = newInput("Total Kills");
      this.inputsGrid.append(this.inputs.kills);  


      this.inputs.CSPRegion = newInput("Current Region", ["FOREST","DESERT","WINTER","UNDERGROUND",
      "VOLCANO","HIGH MOUNTAIN","JUNGLE","METALLIC RUINS","BEACH","OCEAN","NEUTRAL",
      "DARK REALM","HEAVEN","UNIVERSE","CHAOS"]);
      this.inputsGrid.append(this.inputs.CSPRegion);

      this.inputs.difficulty = newInput("Current Difficulty", 
      ["EASY","MEDIUM","HARD","INSANE","NIGHTMARE","IMPOSSIBLE"]);
      this.inputsGrid.append(this.inputs.difficulty);

      this.inputs.waveCompression = newInput("Using Wave Compression?", ["No", "Yes"])
      this.inputsGrid.append(this.inputs.waveCompression)


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
        console.log(value.children().last());
        let inputBox = value.children().last().hasClass("input-box")

        if (inputBox) {
          value.on("input", function() {
            // This needs to reference the last child o fthe value1 selector as that is the input field
            let valid = checkValid(value.children().last());  
            if (valid) {
              self.calculate();
            }
          });
        }
        else {
          value.on("change", function() {
            self.calculate();
        });
        }

      }
      
      setupInputs(this.inputs.gameTimeH);
      setupInputs(this.inputs.gameTimeM);
      setupInputs(this.inputs.gameTimeS);
      setupInputs(this.inputs.gameSpeed);
      setupInputs(this.inputs.kills);
      setupInputs(this.inputs.CSPRegion);
      setupInputs(this.inputs.difficulty);
      setupInputs(this.inputs.waveCompression);

    }
    
    calculate() {

      let kills = parseFloat(this.inputs.kills.children().last().val());

      let hour = parseFloat(this.inputs.gameTimeH.children().last().val());
      let mins = parseFloat(this.inputs.gameTimeM.children().last().val());
      let secs = parseFloat(this.inputs.gameTimeS.children().last().val());
      let time = hour*3600 + mins*60 + secs;

      let indexRegion = this.inputs.CSPRegion.find("option:selected").val();
      let indexDifficulty = this.inputs.difficulty.find("option:selected").val();
      let indexSpeed = parseFloat(this.inputs.gameSpeed.find("option:selected").val());
      let indexWaveCompression = this.inputs.waveCompression.find("option:selected").val();




      let outputValue = this.clearSpeedCalculator(kills, time, indexRegion,
        indexDifficulty, indexSpeed, indexWaveCompression);
      
      console.log(outputValue);
      if (outputValue) {
          this.outputInput.val("Clear Speed: " + outputValue[0].toFixed(3) + "\n  Kill Speed: " + outputValue[1].toFixed(3));
      }
      else {
          this.outputInput.val("Output");
      }
    }
  }
