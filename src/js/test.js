function sum(a, b) {
  return a + b;
}

const sumNew = (a, b) => a + b;

//const log = () => console.log("logging");

const x = [1, 2, 3];

const xDoubled = x.map(function double(el) {
  return el * 2;
});

const xDoubledNew = x.map((el, index, arr) => index * 2); // [2, 4, 6]

let sumFe = 0;
x.forEach((el) => {
  sumFe += el;
});

//console.log(xDoubled, xDoubledNew, sumFe);

const testArr = [2, 4, 6];

function sumArr(a = []) {
  let sumFe = 0;
  a.forEach((el) => {
    sumFe += el;
  });
  return sumFe;
}

const doubleArr = (a) => a.map((el) => el * 2);

function doStuffWithArray(fn, arr) {
  return fn(arr);
}

//console.log(sumArr(testArr));
//console.log(doubleArr(testArr));
//console.log(doStuffWithArray(doubleArr, testArr));

const obj = {
  x: 1,
  y: (a) => a * 2,
};

let blep = "blep";
const mlep = "mlep";

const mlem = [1, 2, 3, 4, 5];
const [mlemOne, mlemTwo, ...mlemRest] = mlem;
// console.log(mlemOne, mlemTwo, mlemRest)

arr = [1, 2, 0, 3, 0, 9]

function moveZeros(arr) {
  const zeros = arr.filter((el) => el === 0);
  const noZeros = arr.map((num) => (num === 0 ? undefined : num)).filter(Boolean);
  // console.log(noZeros);
  const final = noZeros.concat(zeros);
}

// noZeros(arr);

//YOU
str = "abcde";
function solution(str) {
  if (str.length !== 0) {
    let strCouples = [];
    let strChars = str.split("");
    strCouples = str.match(/.{1,2}/g);
    let lastEl = strCouples[strCouples.length - 1];
    const charToInsert = "_";
    if (lastEl.length === 1) {
      lastEl = lastEl + charToInsert;
    }
    return strCouples;
  }
  return [];
}
//VS THAT GUY SHE TELLS YOU NOT TO WORRY ABOUT££≠
function solutionNew(s){
  return (s+"_").match(/.{2}/g)||[]
}
console.log("jdein");

let value = 11;
function luckyNumber(value) {
  let digits = String(value).split("");
  console.log(digits);
  let reversedNumber = digits.reverse().join("");
  console.log(reversedNumber)
  return value === reversedNumber;
}
console.log(luckyNumber(value));

const nine = (rest) => {
  if (rest) {
    return Math.floor(eval(`9${rest}`));
  }
  return 9;
};

const times = (sec) => `*${sec}`;

console.log(nine(times(nine())));

