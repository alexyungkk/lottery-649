// let firstNum = document.getElementById("firstNum");
let countData = {};
let sumData = {};
var sumXValues = [];
var sumValues = [];

//fetch('./data/sample.csv')
fetch('./data/lotto_649.csv')
.then(response => response.text())
.then(csvData => {
  const results = Papa.parse(csvData, { header: true });
  // console.log(results.data[0]);
  // console.log(results.data[1]);
  // console.log(results.data[2]);
  // console.log(results.data);
  // console.log("1. Lotto Date: " + results.data[0]["Date"]);
  // // firstNum.innerHTML = results.data[0]["Num1"];
  // // console.log("2. All numbers: " + allNum(results));
  // console.log("3. Searching lotto by date: " + searchDate(results, "1982-06-12"));
  // console.log("4. Number counting: " + countNum(results, 44));
  // console.log("5. Bonus counting: " + countBonusNum(results, 44));

  // let totalDraw = totalLotto(results);
  // console.log("6. Display total number of drawing: " + totalDraw);  
  // console.log("7. Average sum of six numbers: " + averSumOfAllNumbers(results, totalDraw));
  // console.log("8. Sum of Each drawing: " + sumOfDraw(results, 0));

  numberCounting(results);

  /*----------------------------------------*/
  for (let i = 1; i < totalLotto(results); i++) {
    let sum = sumOfDraw(results, i);
    sumData[i] = sum;    
  }
  // console.log(sumData);
  for (let i = 0; i < totalLotto(results); i++) {
    sumXValues.push(i + 1);
    sumValues.push(sumData[i + 1]);
  }
  // console.log(sumValues);
  BinnedSum(sumValues, 5, "count");
});


// to display all the drawing result
function getAll(data) {
  console.log(data);
}

// to display all the Num1 of all the drawing
function allNum(result) {
  let numbers = result.data;
  let allNumbers = numbers.map((x) => x.Num1)
  return allNumbers;
}

// all six numabers by drawing date
function searchDate(result, day) {
  let year = result.data.filter((x) => x.Date.includes(day));
  let allNumByDate = year.map((x) => x.Num1 + ", " + x.Num2 + ", " + x.Num3 + ", " + 
    x.Num4  + ", " + x.Num5 + ", " + x.Num6);
  return allNumByDate;
}
// average of six numbers sum in all drawing
function averSumOfAllNumbers(result, totalDraw) {
  let sum = 0;
  let averageSum = 0;
  let numbers = result.data;
  numbers.forEach((x) => sum += parseInt(x.Num1) + parseInt(x.Num2) + parseInt(x.Num3)
+ parseInt(x.Num4) + parseInt(x.Num5) + parseInt(x.Num6));
  averageSum = (sum / totalDraw).toFixed(2);
    return averageSum;
}

// sum of each drawing covert to json
function sumOfDraw(result, drawingNum) {
  let sum = 0;
  let numbers = result.data[drawingNum];
  sum += parseInt(numbers.Num1) + parseInt(numbers.Num2) + parseInt(numbers.Num3)
+ parseInt(numbers.Num4) + parseInt(numbers.Num5) + parseInt(numbers.Num6);
  return sum;
}

// function countNum(result, num) {
//   let numbers = result.data;
//   let noOfno = numbers.filter((x => x.Num1.includes(num) + x.Num2.includes(num) 
// + x.Num3.includes(num) + x.Num4.includes(num) + x.Num5.includes(num) + x.Num6.includes(num)));
//   return noOfno.length;
// }

// counting specific number appearance time in Num1 to Num6
function countNum(result, num) {
  let numbers = result.data;
  let noOfno = numbers.filter(x => 
      Number(x.Num1) === Number(num) ||
      Number(x.Num2) === Number(num) ||
      Number(x.Num3) === Number(num) ||
      Number(x.Num4) === Number(num) ||
      Number(x.Num5) === Number(num) ||
      Number(x.Num6) === Number(num)
    );
  return noOfno.length;
}

// counting specific number appearance time as bonus number
function countBonusNum(result, num) {
  let numbers = result.data;
  let noOfno = numbers.filter((x => Number(x.Bonus) === Number(num)));
  return noOfno.length;
}

// counting drawing times
function totalLotto(result) {
  let numbers = result.data;
  return numbers.length;
}

function numberCounting(result) {
  for (let i = 1; i <= 49; i++) {
    let count = countNum(result, i)
    countData[i] = count;    
  }
  var xValues = [];
  var yValues = [];
  for (let i = 0; i < 49; i++) {
    xValues.push(i + 1);
    yValues.push(countData[i + 1]);
  }
  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: 'rgba(0, 153, 255, 0.5)',
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: "Winning Number Frequency (1–49)"
      }
    }
  });
}

function BinnedSum(sumArray, binnedSize, type) {
  const trace = {
    x: sumArray,
    type: 'histogram',
    autobinx: false,
    xbins: {
      start: Math.min(sumArray),   
      end: Math.max(sumArray),     
      size: binnedSize   
    },
    histnorm: type,
    hovertemplate: `Range: %{x}<br>${type}: %{y:.2f}<extra></extra>`,
    marker: {
      color: 'rgba(54, 162, 235, 0.7)',
      line: { color: 'rgb(0, 0, 0)', width: 1 }
    } 
  };

  const layout = {
    paper_bgcolor: "rgba(0,0,0,0",
    plot_bgcolor: "rgba(0,0,0,0)",
    title: `Draw Sum Distribution (Bin Width: ${binnedSize})`,
    xaxis: { title: 'Sum of 6 Numbers' },
    yaxis: { title: `${type}` },
  };

  Plotly.newPlot('chartContainer', [trace], layout);
  window.addEventListener('resize', function() {
    Plotly.Plots.resize('chartContainer');
});
}

/*list script*/
var selectField = document.getElementById("selectField");
var selectText = document.getElementById("selectText");
var list = document.getElementById("list");
var options = document.getElementsByClassName("options");
var arrowIcon = document.getElementById("arrowIcon");

var typeSelectField = document.getElementById("typeSelectField");
var typeSelectText = document.getElementById("typeSelectText");
var typeList = document.getElementById("typeList");
var typeOptions = document.getElementsByClassName("typeOptions");
var typeArrowIcon = document.getElementById("typeArrowIcon");

var submit = document.getElementById("submit");

selectField.onclick = function(){
  list.classList.toggle("hide");
  arrowIcon.classList.toggle("rotate");
}

typeSelectField.onclick = function(){
  typeList.classList.toggle("typeHide");
  typeArrowIcon.classList.toggle("rotate");
}

for(let option of options){
  for(let typeOption of typeOptions){
    typeOption.onclick = function(){
      typeSelectText.innerHTML = this.textContent;
      typeList.classList.toggle("typeHide");
      typeArrowIcon.classList.toggle("rotate");
      // BinnedSum(sumValues, this.textContent, typeSelectText.innerText);
      }
    option.onclick = function(){
      selectText.innerHTML = this.textContent;
      list.classList.toggle("hide");
      arrowIcon.classList.toggle("rotate");
      // BinnedSum(sumValues, this.textContent, typeSelectText.innerText);
    }
  } 
}

var error = document.getElementById("error");
submit.onclick = function(){
  if (selectText.innerText == "Select Bin Width" || typeSelectText.innerText == "Select Display Type"){
    error.innerText = "Please Enter Bin Width and Display Type!!!"
    } else {
    // console.log(selectText.innerText + typeSelectText.innerText);
    BinnedSum(sumValues, selectText.innerText, typeSelectText.innerText);
    error.innerText = "";
    }
    // console.log(selectText.innerText + typeSelectText.innerText);
    // BinnedSum(sumValues, selectText.innerText, typeSelectText.innerText);
  } 

// for(let option of typeOptions){
//   option.onclick = function(){
//     typeSelectText.innerHTML = this.textContent;
//     typeList.classList.toggle("typeHide");
//     typeArrowIcon.classList.toggle("rotate");
//     BinnedSum(sumValues, 20, typeSelectText.innerText);
//   }
// } 