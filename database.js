const insertNutrimentNames = (...strings) => {
    let nutrimentNames = strings;
    return nutrimentNames;
};

const insertNutrimentValues = (...values) => {
    let nutrimentValues = values;
    return nutrimentValues;
};

const buildNutrimentsObj = (arr1, arr2) => {
    let nutrimentObj = arr1.map((currNutriment, index) => {
        let obj = {};
        obj.nutriName = currNutriment;
        obj.cals = arr2[index];
        return obj;  
     }); 
    return nutrimentObj;
};

const nutrimentNames = insertNutrimentNames('Bagel', 'Biscuit', 'Soft cake', 'white bread', 'wholemeal bread', 'Chapatis', 'Cornflakes', 'Crackerbread', 'Cream crackers', 'Crumpets', 'Flapjacks', 'Macaroni', 'Muesli', 'Naan bread', 'Noodles', 'Pasta', 'wholemeal Pasta', 'Porridge oats', 'Potatoes boiled', 'Potatoes roasted', 'Rice', 'Spaghetti', 'Anchovies', 'fried Bacon', 'grilled Bacon', 'Beef', 'Chicken', 'Cockles', 'Cod', 'Crab', 'roasted Duck', 'Fish cake', 'Fish fingers', 'Gammon', 'Haddock', 'Halibut', 'Ham', 'grilled Herring', 'Kidney', 'Kipper', 'Liver', 'Liver pate', 'roasted Lamb', 'boiled Lobster', 'Luncheon meat', 'Mackeral', 'Mussels', 'roasted Pheasant', 'Pilchards', 'Prawns', 'Pork', 'Pork pie', 'Rabbit', 'Salmon', 'Sardines in oil', 'Sardines in tomato sauce', 'fried Sausage pork', 'grilled Sausage pork', 'Sausage roll', 'Scampi fried in oil', 'Steak & kidney pie', 'Taramasalata', 'Trout fresh', 'tinned Tuna water', 'tinned Tuna oil', 'Turkey', 'Veal', 'Apple', 'Banana', 'baked Beans', 'boiled Beans', 'Blackberries', 'Blackcurrant', 'Broccoli', 'boiled Cabbage', 'boiled Carrot', 'boiled Cauliflower', 'boiled Celery', 'Cherry', 'Courgette', 'Cucumber', 'Dates', 'Grapes', 'Grapefruit', 'Kiwi', 'boiled Leek', 'boiled Lentils', 'Lettuce', 'Melon', 'raw Mushrooms', 'boiled Mushrooms', 'fried Mushrooms', 'Olives', 'boiled Onion', 'red Onion', 'spring Onion', 'fried Onion', 'Orange', 'Peas', 'Peas', 'Peach', 'Pear', 'yellow Pepper', 'Pineapple', 'Plum', 'Spinach', 'Strawberries', 'Sweetcorn', 'Tomato', 'cherry Tomato', 'Tomato puree', 'Watercress', 'Cheese', 'Cheddar', 'Cottage cheese', 'Cream cheese', 'Cream fresh half', 'Cream fresh single', 'Cream fresh double', 'Cream fresh clotted', 'Custard', 'Egg', 'fried Egg', 'Fromage frais', 'Ice cream', 'Milk whole', 'Milk semi-skimmed', 'Milk skimmed', 'Soya Milk', 'Mousse flavored', 'Omelette with cheese', 'Trifle with cream', 'Yogurt natural', 'Yogurt reduced fat', 'Bombay mix', 'Butter', 'Chewing gum', 'Chocolate', 'Cod liver oil', 'Corn snack', 'Crisps', 'Honey', 'Jam', 'Lard', 'Low fat spread', 'Margarine', 'Mars', 'Mint sweets', 'Oil', 'Popcorn', 'Sugar', 'Sweets', 'Syrup', 'Toffee', 'Apple', 'Apricot', 'Avocado', 'Banana', 'Blackberries', 'Blackcurrant', 'Blueberries', 'Cherry', 'Clementine', 'Currants', 'Damson', 'Dates', 'Figs', 'Gooseberries', 'Grapes', 'Grapefruit', 'Guava', 'Kiwi', 'Lemon', 'Lychees', 'Mango', 'Melon Honeydew', 'Melon Canteloupe', 'Nectarines', 'Olives', 'Orange average', 'Orange large 350g', 'Papaya Diced', 'Passion Fruit', 'Paw Paw', 'Peach', 'Pear', 'Pineapple', 'Plum', 'Prunes', 'Raisins', 'Raspberries each', 'Rhubarb', 'Satsuma', 'Strawberries', 'Sultanas', 'Tangerine', 'Tomatoes', 'Tomatoes Cherry', 'Beer', 'Chocolate cookie', 'Coffee', 'Cola', 'Hot Dog', 'Ice cream', 'Ketchup', 'Mixed nuts', 'Orange juice', 'Peanut butter', 'Pizza slice', 'Potato chips', 'Pretzels', 'Red wine', 'White wine', 'Water');

const nutrimentValues = insertNutrimentValues(140, 86, 48, 96, 88, 250, 130, 17, 35, 93, 320, 238, 195, 300, 175, 330, 315, 193, 210, 420, 420, 303, 300, 250, 150, 300, 220, 50, 150, 200, 400, 90, 50, 320, 200, 220, 6, 300, 200, 200, 200, 150, 300, 200, 300, 320, 90, 200, 140, 180, 320, 320, 200, 220, 220, 180, 250, 220, 290, 400, 400, 130, 200, 100, 180, 200, 300, 44, 107, 170, 180, 25, 30, 27, 15, 16, 20, 5, 35, 8, 3, 100, 55, 32, 40, 10, 150, 4, 14, 3, 12, 100, 50, 14, 49, 3, 86, 40, 210, 200, 35, 45, 6, 40, 38, 8, 10, 95, 70, 30, 6, 70, 5, 110, 40, 49, 200, 128, 160, 340, 480, 210, 90, 120, 125, 200, 175, 125, 95, 90, 120, 300, 290, 90, 250, 112, 8, 200, 135, 125, 100, 42, 38, 225, 50, 50, 240, 10, 135, 150, 20, 100, 15, 100, 35, 30, 150, 107, 1, 1.1, 49, 2.4, 24, 5, 5, 250, 10, 2.6, 3, 100, 24, 34, 20, 3, 40, 36, 25, 42, 6.8, 35, 100, 67, 30, 28, 35, 45, 50, 25, 9, 5, 1.1, 29, 35, 2.7, 5, 26, 9, 2, 153, 59, 2, 136, 137, 145, 15, 168, 112, 180, 298, 155, 108, 123, 121, 0);

const sportMET = {aerobics: 6.83, baseball: 5, basketball: 8, rowing: 4.64, climbing: 8, cycling: 9.5, dancing: 4.5, fencing: 6, football: 8, soccer: 7, golfing: 3.75, gymnastics: 4, hiking: 6, hockey: 8, "ice skating": 7, kitesurfing: 11, "martial arts": 10, tennis: 8.5, rollerblading: 6, rugby: 10, running: 9.8, skiing: 7, swimming: 8, volleyball: 5.5, "water sports": 5.22, "strength training": 3, yoga: 3};

const nutrimentsObj = buildNutrimentsObj(nutrimentNames, nutrimentValues);

module.exports = {nutrimentsObj, sportMET, nutrimentNames};