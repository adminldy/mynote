let arr = [1,1,2,2,2,3]

function sortArrNum(num, arr) {
  let count = 0
  for(let i = 0;i < arr.length;i++) {
    if(arr[i] === num) {
      count++
    }else if(arr[i] > num) {
      break;
    }
  }
  return count
}

let count = sortArrNum(2, arr)
console.log(count)