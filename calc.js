class Calculation {

  constructor() {
    //Значения индекса случайной согласованности(СС)
    this.CONSISTENCY_RELATION = [0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];
  }

  //Округляет числа
  round(value, decimals) {
    const power = Math.pow(10, decimals);
    const answer = Math.ceil(value * power) / power;
    return answer;
  }

  //Находит собственный вектор
  eigenvector(arr) {
    let mult = 1;
    for (let i = 0; i < arr.length; i++) {
      mult *= arr[i];
    };
    let answer = Math.pow(mult, 1/(arr.length));
    return this.round(answer, 3);
  }

  //Возвращает массив собственных векторов
  findAllPriorityInMatrix(arr) {
    let ansArr = [];
    for (let i = 0; i < arr.length; i++) {
      ansArr.push(this.eigenvector(arr[i]));
    };
    return ansArr;
  }

  //Находит вектор приоритета
  priorityVector(arr) {
    let sum = 0;
    let ansArr = [];
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    };
    sum = this.round(sum, 3);
    for (let i = 0; i < arr.length; i++) {
      ansArr.push(this.round(arr[i]/sum, 3));
    };
    return ansArr;
  }

  //Возвращает массив, состоящий из сумм столбцов матрицы
  findSumColumn(matrix) {
    let sum = 0;
    let ansArr = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        sum += matrix[j][i];
      }
      ansArr.push(this.round(sum, 2));
      sum = 0;
    };
    return ansArr;
  }

  //Находит степень согласованности
  findAlphaMax(arrVector, arrSum) {
    let sum = 0;
    for (let i = 0; i < arrVector.length; i++) {
      sum += arrSum[i] * arrVector[i];
    }
    return this.round(sum, 3);
  }

  //Находит индекс согласованности
  indexCons(sum, n) {
    return this.round((sum - n) / (n - 1), 3);
  }

  //Находит отношение согласованности
  findConsistencyRelation(indexCons, arr) {
    return this.round(indexCons / this.CONSISTENCY_RELATION[arr.length-1], 3);
  }

  //Находит глобальные приоритеты
  calcGlobPrior(arrPrior, matrixVect) {
    let ans = [];
    let sum = 0;
    for (let i = 0; i < matrixVect[i].length; i++) {
      for (let j = 0; j < arrPrior.length; j++) {
        sum += arrPrior[j] * matrixVect[j][i];
      }
      ans.push(this.round(sum, 3));
    }
    return ans;
  }
  
  //Выбирает лучший вариант из предложенных
  findBest(arr) {
    let maxValue = 0;
    let maxIndex = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > maxValue) {
        maxValue = arr[i];
        maxIndex = i;
      }
    }
    return maxIndex;
  }

}

module.exports = Calculation;