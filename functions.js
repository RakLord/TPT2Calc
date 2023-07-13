
function regionToPath(regionNumber) {
    switch(regionNumber) {
        case 5:
            return 3;
        case 1: case 3: case 4: case 7:
            return 4;
        case 6: case 9: case 14:
            return 5;
        case 2: case 10: case 11: case 13:
            return 6;
        case 8:
            return 7;
        case 12:
            return 9;
        default: //case 15:
            return 10;
    }
}

function regionToElements(regionNumber) {
    switch (regNo) {
        case 11:
            return 2;
        case 1: case 2:
            return 4;
        case 10: case 12:
            return 5;
        case 3:	case 13:
            return 6;
        case 4:	case 5: case 6:	case 7:	case 8:	case 9:
            return 7;
        case 14:
            return 8;
        default: //case 15:
            return 10;
    }
}

function enemiesPerWave(difficulty, paths, moreAccuracy) {
    let enemies;
    if (moreAccuracy) {
        enemies = (difficulty * paths * 0.9) + (((difficulty - 1) * paths + 1) * 0.1);
    } else {
        enemies = difficulty * paths;
    }

    return enemies;
}

function calculateModuleDropChance(wave, countMode, playerDropChance, moduleDropChance, difficulty) {
    // countMode = era or infinity.

    let difficultyModifier = difficultyToDropchance(difficulty);

    let waveDropChance = Math.log10(wave) + waveAddLog(countMode);
    let dropChance = waveDropChance * playerDropChance * difficultyModifier;

    let estimate = Math.ceil(100 / dropChance)

    return (dropChance, estimate);
}

function waveAddLog(stage) {
    switch(stage) {
        case "era":
            return 11;
        case "infinity":
            return 22;
        default:
            return 0;
    }
}

function difficultyToDropchance(diff) {
    switch (diff) {
        case 1:
            return 1.5;
        case 2:
            return 2;
        case 3:
            return 2.25;
        case 4:
            return 2.5;
        default:
            return 1;
    }
}

function clearSpeedCalculator(kills, time, region, difficulty, gameSpeed) {
    // can accept 0-5 or "EASY" for difficulty (str name)

    let difficulty = getDifficultyValue(difficulty);
    let paths = regionToPath(region);
    let elements = 1;
    let enemiesWave;

    if (difficulty = 5) {
        elements = 10;
    } else {
        elements = regionToElements(region);
    }

    let clearSpeed = (kills * elements * gameSpeed) / (time / enemiesWave);
    let killsPerSec = (kills * elements * gameSpeed) / time;
    
    return (clearSpeed, killsPerSec);
}

function getDifficultyValue(difficulty) {
    if (difficulties.hasOwnProperty(difficulty)) {
        return difficulties[difficulty];
    } else {
        return difficulty;
    }
}