class Calculation {

  constructor() {
    this.CONSISTENCY_RELATION = [0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];
  }

  round(value, decimals) {
    //Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    const power = Math.pow(10, decimals);
    const answer = Math.ceil(value * power) / power;
    return answer;
  }

  eigenvector(arr) {
    let mult = 1;
    for (let i = 0; i < arr.length; i++) {
      mult *= arr[i];
    };
    let answer = Math.pow(mult, 1/(arr.length));
    return this.round(answer, 3);
  }

  findAllPriorityInMatrix(arr) {
    let ansArr = [];
    for (let i = 0; i < arr.length; i++) {
      ansArr.push(this.eigenvector(arr[i]));
    };
    return ansArr;
  }

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

  findSumColumn(arr) {
    let sum = 0;
    let ansArr = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        sum += arr[j][i];
      }
      ansArr.push(this.round(sum, 2));
      sum = 0;
    };
    return ansArr;
  }

  findAlphaMax(arrVector, arrSum) {
    let sum = 0;
    for (let i = 0; i < arrVector.length; i++) {
      sum += arrSum[i] * arrVector[i];
    }
    return this.round(sum, 3);
  }

  indexCons(sum, n) {
    return this.round((sum - n) / (n - 1), 3);
  }

  findConsistencyRelation(indexCons, arr) {
    return this.round(indexCons / this.CONSISTENCY_RELATION[arr.length-1], 3);
  }

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