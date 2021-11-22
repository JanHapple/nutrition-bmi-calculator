"use strict";
const database = require('./database');

//====================================================================================================================//

class Person {
    constructor(firstName, lastName, weight, age, height) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.weight = weight;
    this.age = age;
    this.height = height;
    }; 
};

//====================================================================================================================//

class Male extends Person {
    constructor(firstName, lastName, weight, age, height, trackingPlan, performanceTurnover) {
        super(firstName, lastName, weight, age, height);
        this.performanceTurnover = performanceTurnover;
        this.trackingPlan = trackingPlan;


        //this.totalDailyNutriments = totalDailyNutriments;


       
        //this.calorieBalance = calorieBalance;
    }

    determineTrackingPlan(days) {
        this.trackingPlan = days;
        console.log(`You have set an tracking periode of ${this.trackingPlan} days.\n\nTrack your nutrition consumption as well as your sports activity within the chosen periode of time to calculate your calorin balance. You also have to enter your daily hours of sleep to get an exact assumtion of it. Furthermore to calculate your body performance turnover, we need the following infos: Please enter the Index number that fits to your personal job situation in "physicalActivityLevel()":`);
        console.table(['sedentary job = e.g. office worker', 'Predominantly sedentary = e.g. truck driver, laboratory technician', 'walking/standing activity = e.g. Craftsman, waiter', 'very strenuous activity = e.g. Salesman, housewife, craftsman']);
    }; 

    physicalActivityLevel(num) {
        //console.clear()
        let physicalActLev = num == 0 ? num = 1.45 
                        : num == 1 ? num = 1.65
                        : num == 2 ? num = 1.85
                        : num == 3 ? num = 2.2
                        : console.log('Please enter a number between 0 - 4. For more Infos please call "inputInfo()"');
        
        console.log(`Thanks for entering your PAL ('Physical Acivity Level'). Please start to record your nutition consumtions and activities throughout the day.`)
      //  let pal = (8 * 0.95) + (physicalActLev * (24 - 8)) / 24;

        let basalMetRate = 66.47+(13,7*this.weight)+(1.8*this.height)-(4.7*this.age);
        let performanceTover = (basalMetRate * physicalActLev).toFixed(0);

        return this.performanceTurnover = performanceTover; 
    }
};

//====================================================================================================================//

class MaleBmiCalculator extends Male {
    constructor(firstName, lastName, weight, age, height, trackingPlan, performanceTurnover, dailyNutriments, totalDailyNutriments, nutriListPlan, nutriments, sleepingTime, dailysportActivities, sportActivitiesPlan, calsPlan, avgCalsPlan, avgDailyCalsBalance, planCalsBalance, weightFluctuation, bmi) {
    super(firstName, lastName, weight, age, height, trackingPlan, performanceTurnover);    
    
    this.dailyNutriments = dailyNutriments;
    this.totalDailyNutriments = totalDailyNutriments;
    this.nutriListPlan = nutriListPlan;
    this.nutriments = nutriments = database.nutrimentsObj;
    this.metOfSportActivities = database.sportMET;
    
    this.sleepingTime = sleepingTime;
    this.dailysportActivities = dailysportActivities;
    this.sportActivitiesPlan = sportActivitiesPlan;
    //this.calorieBalance = calorieBalance;

    this.calsPlan = calsPlan;
    this.avgCalsPlan = avgCalsPlan;
    this.dailyNutriments = dailyNutriments;
    this.avgDailyCalsBalance = avgDailyCalsBalance;
    this.planCalsBalance = planCalsBalance;
    this.weightFluctuation = weightFluctuation;
    this.bmi = bmi;
    
    // this.totalDailyNutriments = totalDailyNutriments;
    }

    calcBreakfast(...strings) {
        if (this.dailyNutriments.length != 0) {
            console.log(`You didn't complete your dinner Tracking yesterday. Please enter, before continuing.`);
            return this.dailyNutriments;
        }
        
        let nutriStrings = strings;
        let nutriValues = [];      

        let nutriStringsToLowerCase = nutriStrings.map(values => values.toLowerCase());
        let nutrimentNamesToLowerCase = database.nutrimentNames.map(values => values.toLowerCase());

        let checkInput = nutriStringsToLowerCase.filter(nutris => nutrimentNamesToLowerCase.indexOf(nutris) == -1);
        let suggestion = [];

        //let suggestions = database.nutrimentNames.filter(value => value.indexOf(checkInput) >= 0);
        //let suggestions = checkInput.filter(value => database.nutrimentNames.indexOf(value) >= 0);
        
        for (let i=0; i < checkInput.length; i++) {
            for (let j=0; j < database.nutrimentNames.length; j++) {
                if (database.nutrimentNames[j].toLowerCase().includes(checkInput[i].toLowerCase())) {
                    suggestion.push(database.nutrimentNames[j]);
                }
            }
        }
        
        if (checkInput.length > 0) {
            console.log(`Sorry, our system doesn't know all of your inputs. Please check, if one of the following suggestions fit to your needs. If you can't find the nutriments you are looking for, please enter the missing nutriment to our database with "addNewNutriment()"`);
            console.log(`Unknown inputs:`);
            console.log(checkInput);
            console.log(`Here are our suggestions. Choose from our list and repeat your input:`)
            console.log(suggestion);
            return this.dailyNutriments;
        }
        
        for (let i=0; i < nutriStrings.length; i++) {
            for (let j=0; j < this.nutriments.length; j++) {
                if(nutriStrings[i].toLowerCase() == this.nutriments[j]["nutriName"].toLowerCase()) {
                nutriValues.push(this.nutriments[j]["cals"]);
                this.nutriListPlan.push(this.nutriments[j]);
            }
        }
        };

        let total = nutriValues.reduce((total, currValue) => total += currValue);

        console.log(`You have consumed ${total} kcal at breakfast`);
        
        if (this.dailyNutriments.length == 0) {
            this.dailyNutriments.push(total);
        } else {
            console.log(`Something went wrong. You have already recorded your breakfast nutriment tracking for today. Please go ahead with recording your lunch nutriments.`)
        }
    };

    calcLunch(...strings) {
        if (this.dailyNutriments.length != 1) {
            console.log(`You didn't complete your breakfast tracking. Please enter, before continuing.`);
            return this.dailyNutriments;
        }
        
        let nutriStrings = strings;
        let nutriValues = [];    
        
        let nutriStringsToLowerCase = nutriStrings.map(values => values.toLowerCase());
        let nutrimentNamesToLowerCase = database.nutrimentNames.map(values => values.toLowerCase());

        let checkInput = nutriStringsToLowerCase.filter(nutris => nutrimentNamesToLowerCase.indexOf(nutris) == -1);
        let suggestion = [];

        //let suggestions = database.nutrimentNames.filter(value => value.indexOf(checkInput) >= 0);
        //let suggestions = checkInput.filter(value => database.nutrimentNames.indexOf(value) >= 0);
        
        for (let i=0; i < checkInput.length; i++) {
            for (let j=0; j < database.nutrimentNames.length; j++) {
                if (database.nutrimentNames[j].toLowerCase().includes(checkInput[i].toLowerCase())) {
                    suggestion.push(database.nutrimentNames[j]);
                }
            }
        }
        
        if (checkInput.length > 0) {
            console.log(`Sorry, our system doesn't know all of your inputs. Please check, if one of the following suggestions fit to your needs. If you can't find the nutriments you are looking for, please enter the missing nutriment to our database with "addNewNutriment()"`);
            console.log(`Unknown inputs:`);
            console.log(checkInput);
            console.log(`Here are our suggestions. Choose from our list and repeat your input:`)
            console.log(suggestion);
            return this.dailyNutriments;
        }
    
        for (let i=0; i < nutriStrings.length; i++) {
            for (let j=0; j < this.nutriments.length; j++) {
                if(nutriStrings[i].toLowerCase() == this.nutriments[j]["nutriName"].toLowerCase()) {
                nutriValues.push(this.nutriments[j]["cals"]);
                this.nutriListPlan.push(this.nutriments[j]);
            }
        }
        };

        let total = nutriValues.reduce((total, currValue) => total += currValue);

        console.log(`You have consumed ${total} kcal at lunch`);
        
        if (this.dailyNutriments.length == 1) {
            return this.dailyNutriments.push(total);
        } else if (this.dailyNutriments.length == 0) {
            console.log(`Something went wrong. You probably forgot to record your breakfast nutriment tracking for today. Please catch up to do this now by entering calcBreakfast().`);
        } else {
            console.log(`Something went wrong. You have already recorded your lunch nutriment tracking for today. Please go ahead with recording your dinner nutriments.`);
        }
    };

    calcDinner(...strings) {
        if (this.dailyNutriments.length != 2) {
            console.log(`You didn't complete your lunch tracking. Please enter, before continuing.`);
            return this.dailyNutriments;
        }
        
        let nutriStrings = strings;
        let nutriValues = [];      

        let nutriStringsToLowerCase = nutriStrings.map(values => values.toLowerCase());
        let nutrimentNamesToLowerCase = database.nutrimentNames.map(values => values.toLowerCase());

        let checkInput = nutriStringsToLowerCase.filter(nutris => nutrimentNamesToLowerCase.indexOf(nutris) == -1);
        let suggestion = [];

        //let suggestions = database.nutrimentNames.filter(value => value.indexOf(checkInput) >= 0);
        //let suggestions = checkInput.filter(value => database.nutrimentNames.indexOf(value) >= 0);
        
        for (let i=0; i < checkInput.length; i++) {
            for (let j=0; j < database.nutrimentNames.length; j++) {
                if (database.nutrimentNames[j].toLowerCase().includes(checkInput[i].toLowerCase())) {
                    suggestion.push(database.nutrimentNames[j]);
                }
            }
        }
        
        if (checkInput.length > 0) {
            console.log(`Sorry, our system doesn't know all of your inputs. Please check, if one of the following suggestions fit to your needs. If you can't find the nutriments you are looking for, please enter the missing nutriment to our database with "addNewNutriment()"`);
            console.log(`Unknown inputs:`);
            console.log(checkInput);
            console.log(`Here are our suggestions. Choose from our list and repeat your input:`)
            console.log(suggestion);
            return this.dailyNutriments;
        }
        
        for (let i=0; i < nutriStrings.length; i++) {
            for (let j=0; j < this.nutriments.length; j++) {
                if(nutriStrings[i].toLowerCase() == this.nutriments[j]["nutriName"].toLowerCase()) {
                nutriValues.push(this.nutriments[j]["cals"]);
                this.nutriListPlan.push(this.nutriments[j]);
            }
        }
        };

        let total = nutriValues.reduce((total, currValue) => total += currValue);

        console.log(`You have consumed ${total} kcal at dinner.`);
        
        this.dailyNutriments.push(total);
        let totalKcalDay = this.dailyNutriments.reduce((totalKcalDay, currKcal) => totalKcalDay += currKcal);
        // 
        this.totalDailyNutriments = totalKcalDay;

        if (this.dailyNutriments.length == 3) {
            this.calsPlan.push(totalKcalDay);
        } else {
            console.log(`Something went wrong. Please enter first your breakfast and lunch, before entering your dinner.`)
        }
        

        if (this.dailyNutriments.length == 3 && this.calsPlan.length == this.trackingPlan) {
            this.avgCalsPlan = Math.round(this.calsPlan.reduce((total, currValue) => total += currValue) / this.trackingPlan);
            console.log(`You have consumed ${totalKcalDay} on the ${this.calsPlan.length} day of your trackingplan.`)
            console.log(`You have fullfilled your nutrition trackingplan. Your average nutritions were ${this.avgCalsPlan}Kcal over the last ${this.trackingPlan} days. To get the result of your calorin balance over the entier tracking periode, please don't forget to enter your last sleepingtime tomorrow morning. Afterwards you will get your results and can start a new tracking plan.`);
            this.dailyNutriments = [];
        } else if (this.dailyNutriments.length == 3 && this.calsPlan.length < this.trackingPlan) {
            console.log(`You have consumed ${totalKcalDay} on the ${this.calsPlan.length} day of your trackingplan.`);
            this.dailyNutriments = [];
        } else {
            console.log(`Something went wrong. Please enter first your breakfast and lunch, before entering your dinner.`)
        }
    };

    getsleepingtime(num) {
        this.sleepingTime.push(num);
        
        if (this.dailysportActivities.length == 0) {
            this.sportActivitiesPlan.push(0);
        } else {
            let totalDailySport = this.dailysportActivities.reduce((total, currKcal) => total += currKcal, 0);
            this.sportActivitiesPlan.push(totalDailySport);
            this.dailysportActivities = [];
        }
    
        if (this.sleepingTime.length == this.trackingPlan) {
            
            this.planCalsBalance = Math.round(this.calsPlan.reduce((total, currCals) => total += currCals)) - (this.performanceTurnover*this.trackingPlan) - this.sportActivitiesPlan.reduce((total, currBurnedCals) => total += currBurnedCals, 0);
            
            this.avgDailyCalsBalance = Math.round(this.avgCalsPlan - this.performanceTurnover - (this.sportActivitiesPlan.reduce((total, currBurnedCals) => total += currBurnedCals, 0) / this.trackingPlan));

            let roundNum = this.planCalsBalance * 100;
            this.weightFluctuation = Math.round(roundNum / 7500) / 100;

            this.weight = this.weight + this.weightFluctuation;
            
            if (this.planCalsBalance > 0) {
                console.log(`You have accomplished your tracking plan. Over the last ${this.trackingPlan} days, you had an average calorien balance of ${this.avgDailyCalsBalance} Kcal/day. Your total calorien balance was ${this.planCalsBalance} Kcal. That means your weight has grown ${this.weightFluctuation} kg. Your actual weight is ${this.weight}.`);
            } else {
                console.log(`You have accomplished your tracking plan. Over the last ${this.trackingPlan} days, you had an average calorien balance of ${this.avgDailyCalsBalance} Kcal/day. Your total calorien balance was ${this.planCalsBalance} Kcal. That means you have lost ${this.weightFluctuation} kg of weight. Your actual weight is ${this.weight} kg.`);
            }
            
            this.trackingPlan = 0;
            
        }
    
    };

    didSport(string, num) {
        let metSearch = 0;

        for (let value in this.metOfSportActivities) {
            if (string == value) {
            metSearch = this.metOfSportActivities[value];
            }
        }

        let calsBurned = Math.round(num * (metSearch*3.5*this.weight)/200);

        console.log(`You burned ${calsBurned} during your sports session.`)

        this.dailysportActivities.push(calsBurned);
        
    }

    getdailyCalBalance() {
        let dailyKcal = this.totalDailyNutriments - this.performanceTurnover - this.dailysportActivities;
        
        console.log(`Your calorie balance today is ${dailyKcal}.`)
        return this.calorieBalance = dailyKcal;
    }

    // getNewWeight() {
    //     return this.weight = this.weight + this.weightFluctuation; 
    // }

    /*
    predictBmi() {
        if(this.weightFluctuation)
    }
    */

    desiredBmi(num) {
        let desiredweight = num * (this.height * this.height);

        let neededWeightDiff = (this.weight - desiredweight).toFixed(1);

        let weightFluctuationHelper = this.weightFluctuation.toFixed(1);

        if (weightFluctuationHelper < 0) {
            weightFluctuationHelper *= -1
        } else {
            weightFluctuationHelper
        }

        let targetBmi = neededWeightDiff / weightFluctuationHelper;
        
        if (num < this.bmi) {
            console.log(`If you want to acchieve a Bmi of ${num} you need to loose ${neededWeightDiff} kg of weight. If you continue your daily nutritions and sports life like in your plan, you will need ${targetBmi} days to get your desired Bmi.`);    
        } else {
            console.log(`If you want to acchieve a Bmi of ${num} you need to gain ${neededWeightDiff} kg of weight. If you continue your daily nutritions and sports life like in your plan, you will need ${targetBmi} days to get your desired Bmi.`)
        }
    };

    getBmi() {
        let bmi = this.weight / (this.height * this.height);
        let bmiFixed = bmi.toFixed(1);
        if (bmiFixed < 10) {
            console.log(`Your BMI is ${bmiFixed}, you have to eat. Otherwise you will die.`);
            return this.bmi = bmiFixed;
        } else if (bmiFixed > 10 && bmiFixed <= 18.5) {
            console.log(`Your BMI is ${bmiFixed}. You are underweight.`);
            return this.bmi = bmiFixed;
        } else if (bmiFixed > 18.5 && bmiFixed <= 25) {
            console.log(`Your BMI is ${bmiFixed}. You are normal weight.`);
            return this.bmi = bmiFixed;
        } else if (bmiFixed > 25 && bmiFixed <= 30) {
            console.log(`Your BMI is ${bmiFixed}. You are overweight.`);
            return this.bmi = bmiFixed;
        } else {
            console.log(`Your BMI is ${bmiFixed}. You are suffering from obesity.`);
            return this.bmi = bmiFixed;  
        }
    }
}

const calorieCalculator = new MaleBmiCalculator('Thom', 'Thompson', 85, 32, 1.87, 0, 0, [], 0, [], [], [], [], [], [], 0, 0, 0, 0, 0);
calorieCalculator.determineTrackingPlan(7);
calorieCalculator.physicalActivityLevel(1);

// Day 1
calorieCalculator.calcBreakfast('Coffee', 'Banana', 'Cheese', 'Bagel', 'Butter');
calorieCalculator.calcLunch('Spaghetti', 'Tomato', 'Red wine');
calorieCalculator.calcDinner('Water', 'pizza slice');
calorieCalculator.didSport('martial arts', 90);


// Day 2
calorieCalculator.getsleepingtime(7);

calorieCalculator.calcBreakfast('Coffee', 'Cornflakes', 'Orange juice', 'Milk whole', 'Apple');
calorieCalculator.calcLunch('fried Sausage pork', 'Potatoes roasted', 'Broccoli', 'fried Mushrooms');
calorieCalculator.calcDinner('white bread', 'White wine', 'Butter', 'Sardines in tomato sauce', 'Cream crackers');
calorieCalculator.didSport('running', 60);
calorieCalculator.didSport('strength training', 15);

// Day 3
calorieCalculator.getsleepingtime(8);
calorieCalculator.calcBreakfast('Coffee', 'Banana', 'Cheese', 'Bagel', 'Butter');
calorieCalculator.calcLunch('Bagel', 'Tomato', 'Scampi fried in oil', 'Red wine');
calorieCalculator.calcDinner('Water', 'Pizza slice', 'Ice cream');
calorieCalculator.didSport('basketball', 90);
calorieCalculator.didSport('strength training', 15);

// Day 4
calorieCalculator.getsleepingtime(9);
calorieCalculator.calcBreakfast('Coffee', 'Cornflakes', 'Orange juice', 'Milk whole', 'Apple');
calorieCalculator.calcLunch('fried Sausage pork', 'Potatoes roasted', 'Broccoli', 'fried Mushrooms');
calorieCalculator.calcDinner('white bread', 'Water', 'Butter', 'Sardines in tomato sauce', 'Cream crackers');
calorieCalculator.didSport('running', 60);
calorieCalculator.didSport('strength training', 15);

// Day 5
calorieCalculator.getsleepingtime(5);
calorieCalculator.calcBreakfast('Coffee', 'Banana', 'Cheese', 'Bagel', 'Butter');
calorieCalculator.calcLunch('Bagel', 'Tomato', 'Scampi fried in oil', 'Red wine');
calorieCalculator.calcDinner('Water', 'Pizza Slice');
calorieCalculator.didSport('running', 40);
calorieCalculator.didSport('strength training', 15);

// Day 6
calorieCalculator.getsleepingtime(8);
calorieCalculator.calcBreakfast('Coffee', 'Banana', 'Cheese', 'Bagel', 'Butter');
calorieCalculator.calcLunch('Bagel', 'Tomato', 'Scampi fried in oil', 'Red wine');
calorieCalculator.calcDinner('Cola', 'Pizza Slice');

// Day 7
calorieCalculator.getsleepingtime(8);
calorieCalculator.calcBreakfast('Coffee', 'Cornflakes', 'Orange juice', 'Milk whole', 'Apple');
calorieCalculator.calcLunch('fried Sausage pork', 'Broccoli', 'fried Mushrooms');
calorieCalculator.calcDinner('white bread', 'White wine', 'Butter', 'Sardines in tomato sauce', 'Cream crackers');
calorieCalculator.didSport('strength training', 15);
calorieCalculator.didSport('cycling', 90);


// Day 8
calorieCalculator.getsleepingtime(6.5);
/*
console.log(calorieCalculator.calsPlan);
console.log(calorieCalculator.avgCalsPlan);
console.log(calorieCalculator.avgDailyCalsBalance);
console.log(calorieCalculator.planCalsBalance);
console.log(calorieCalculator.weightFluctuation);
console.log(calorieCalculator.weight);
*/

calorieCalculator.getBmi();
calorieCalculator.desiredBmi(20);



//console.log(calorieCalculator.nutriListPlan);
/*
console.log(calorieCalculator.dailysportActivities)
console.log(calorieCalculator.sportActivitiesPlan)
console.log(calorieCalculator.trackingPlan)
console.log(calorieCalculator.sleepingTime)
*/