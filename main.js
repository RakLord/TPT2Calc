import { Calculator } from "./calculators/sampleCalc.js";
import { CratoCalculator } from "./calculators/cratoCalc.js";
import { clearSpeedCalculator } from "./functions.js";


$(document).ready(function() {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA");

    let calc1 = new Calculator();
    let calc2 = new CratoCalculator(clearSpeedCalculator);
});


