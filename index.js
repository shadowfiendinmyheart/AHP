const Calculation = require('./calc');
const arrays = require('./matrix');
const calc = new Calculation();

function setw(number1) {
  let number = String(calc.round(number1, 3));
  switch(number.length) {
    case 0:
      return "     ";
    case 1:
      return number + "    ";
    case 2:
      return number + "   ";
    case 3: 
      return number + "  ";
    case 4:
      return number + " ";
    case 5:
      return number;
    default:
      return NaN;
  }
}

function showMatrixGlob(arrPrior, matrixVect, globPrior) {
  let lineArr = "    ";
  for (let i = 0; i < arrPrior.length; i++) {
    lineArr += setw(arrPrior[i]) + "|";
  }
  console.log(lineArr);
  console.log("----------------------------------------------");
  let lineMatrix = "    ";
  for (let i = 0; i < matrixVect[i].length; i++) {
    for (let j = 0; j < matrixVect.length; j++) {
      lineMatrix += setw(matrixVect[j][i]) + "|";
    }
    console.log(lineMatrix + " G" + (i+1) +": " + globPrior[i]); 
    lineMatrix = "    ";
  }
}

function findValues(arr) {
  //let vectorPrior = calc.findAllPriorityInMatrix(arr);
  let vectorsArr = calc.priorityVector(calc.findAllPriorityInMatrix(arr));
  let sumColumnArr = calc.findSumColumn(arr);
  let alphaMaxArr = calc.findAlphaMax(vectorsArr, sumColumnArr);
  let indexConsArr = calc.indexCons(alphaMaxArr, arr.length);
  let consistencyRelationArr = calc.findConsistencyRelation(indexConsArr, arr);

  function showMatrix(matrix, vector, sum) {
    let line = "    ";
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        line += setw(matrix[i][j]) + "|";
      }
      console.log(line + " W" + (i+1) + ": " + vector[i]); 
      line = "    ";
    }
    let lineSum = "S:  ";
    for (let i = 0; i < sum.length; i++) {
      lineSum += setw(sum[i]) + "|";
    }
    console.log(lineSum);
  }

  showMatrix(arr, vectorsArr, sumColumnArr);
  console.log("λmax - "  + alphaMaxArr);
  console.log("Индекс согласованности (ИС) - " + indexConsArr);
  console.log("Отношение согласованности (ОС) - " + consistencyRelationArr);
}

console.log("=== Матрица попарных сравнений для уровня 2 ===\n");
findValues(arrays.lvl2mtrx);

console.log("\n=== Матрица попарных сравнений для уровня 3 ===\n");
console.log("Размер дома К1");
findValues(arrays.sizeOfHouse);

console.log("\nУдобное автобусное сообщение К2");
findValues(arrays.convenientBus);

console.log("\nОкрестности К3");
findValues(arrays.neighborhood);

console.log("\nКогда построен дом К4");
findValues(arrays.whenBuilt);

console.log("\nДвор К5");
findValues(arrays.yard);

console.log("\nОбщее состояние К7");
findValues(arrays.generalState);

console.log("\nФинансовые условия К8");
findValues(arrays.financialСonditions);

console.log("\n=== Матрица глобальных приоритетов ===");
const arrPrior = calc.priorityVector(calc.findAllPriorityInMatrix(arrays.lvl2mtrx));
const matrixVect = [
  calc.priorityVector(calc.findAllPriorityInMatrix(arrays.sizeOfHouse)),
  calc.priorityVector(calc.findAllPriorityInMatrix(arrays.convenientBus)),
  calc.priorityVector(calc.findAllPriorityInMatrix(arrays.neighborhood)),
  calc.priorityVector(calc.findAllPriorityInMatrix(arrays.whenBuilt)),
  calc.priorityVector(calc.findAllPriorityInMatrix(arrays.yard)),
  calc.priorityVector(calc.findAllPriorityInMatrix(arrays.generalState)),
  calc.priorityVector(calc.findAllPriorityInMatrix(arrays.financialСonditions)),
];
const globalPrior = calc.calcGlobPrior(arrPrior, matrixVect);
showMatrixGlob(arrPrior, matrixVect, globalPrior);

const answer = calc.findBest(globalPrior);
console.log(`\n=== Вывод ===\nДом номер ${answer+1} в приоритете`);