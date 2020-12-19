const Calculation = require('./calc');
const arrays = require('./matrix');
const calc = new Calculation();

function findValues(arr) {
  let vectorPrior = calc.findAllPriorityInMatrix(arr);
  let vectorsArr = calc.priorityVector(calc.findAllPriorityInMatrix(arr));
  let sumColumnArr = calc.findSumColumn(arr);
  let alphaMaxArr = calc.findAlphaMax(vectorsArr, sumColumnArr);
  let indexConsArr = calc.indexCons(alphaMaxArr, arr.length);
  let consistencyRelationArr = calc.findConsistencyRelation(indexConsArr, arr);
  
  console.log("Собственный вектор (W(n)) - ");
  for (let i = 0; i < vectorPrior.length; i++) {
    console.log("                        " + (i+1) + ": " + vectorPrior[i])
  }
  console.log("Вектор приоритетов (W) - ");
  for (let i = 0; i < vectorsArr.length; i++) {
    console.log("                        " + (i+1) + ": " + vectorsArr[i])
  }
  console.log("Сумма (S) - ");
  for (let i = 0; i < sumColumnArr.length; i++) {
    console.log("                        " + (i+1) + ": " + sumColumnArr[i])
  }
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
findValues(arrays.sizeOfHouse);

console.log("\n=== Глобальные приоритеты ===");
const globalPrior = calc.calcGlobPrior(calc.priorityVector(calc.findAllPriorityInMatrix(arrays.lvl2mtrx)),
                                  [
                                    calc.priorityVector(calc.findAllPriorityInMatrix(arrays.sizeOfHouse)),
                                    calc.priorityVector(calc.findAllPriorityInMatrix(arrays.convenientBus)),
                                    calc.priorityVector(calc.findAllPriorityInMatrix(arrays.neighborhood)),
                                    calc.priorityVector(calc.findAllPriorityInMatrix(arrays.whenBuilt)),
                                    calc.priorityVector(calc.findAllPriorityInMatrix(arrays.yard)),
                                    calc.priorityVector(calc.findAllPriorityInMatrix(arrays.generalState)),
                                    calc.priorityVector(calc.findAllPriorityInMatrix(arrays.financialСonditions)),
                                  ])

for (let i = 0; i < globalPrior.length; i++) {
  console.log(`${i+1}: ${globalPrior[i]}`);
}
const answer = calc.findBest(globalPrior);
console.log("\n=== Вывод ===\n" + "Дом номер " + (answer+1) + " в приоритете");