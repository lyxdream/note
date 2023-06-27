/*
 * @Description:
 * @Author: 引霞
 * @Date: 2021-11-17 17:05:15
 * @LastEditors: 引霞
 * @FilePath: \note\js基础\1.js * @LastEditTime: 2023-06-27 12:33:08
 */
// 1
// function sum (arr) {
//   return arr.reduce((pre, curr) => {
//     return pre + curr
//   })
// }
// console.log(sum([1, 2, 3, 4, 5]))

/* 2 */
// const arr = [1, 2, 2, 3, 4, 2, 2]
// function remove (arr, item) {
//   return arr.filter(el => {
//     return el !== item
//   })
// }

/* 3 */
// function remove (arr, item) {
//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i] === item) {
//       arr.splice(i, 1)
//       i--
//     }
//   }
//   return arr
// }
// console.log(remove(arr, 2))

/* 4 */
// const arr = [1, 2, 3, 4]
// function append (arr, item) {
//   return [...arr, item]
// }
// console.log(append(arr, 10))

/* 5 */
// 删除数组 arr 最后一个元素。不要直接修改数组 arr，结果返回新的数组
// const arr = [1, 2, 3, 4]
// function truncate (arr) {
//   const newArr = []
//   const len = arr.length - 1
//   for (let i = 0; i < len; i++) {
//     newArr.push(arr[i])
//   }
//   return newArr
// }
// console.log(truncate(arr))

// function truncate (arr) {
//   return arr.slice(0, arr.length - 1)
// }

/* 6 */
// 在数组 arr 开头添加元素 item。不要直接修改数组 arr，结果返回新的数组
// function prepend (arr, item) {
//   return [item, ...arr]
// }
// console.log(prepend([1, 2, 3, 4], 10))

// // function prepend2 (arr, item) {
// //   var arr1 = [item];
// //   [].push.apply(arr1, arr)
// //   return arr1
// // }

/* 7 */
// 在数组 arr 开头添加元素 item。不要直接修改数组 arr，结果返回新的数组
// function curtail (arr) {
//   return arr.slice(1)
// }
// console.log(curtail([1, 2, 3, 4]))

/* 8 */
// 在数组 arr 的 index 处添加元素 item。不要直接修改数组 arr，结果返回新的数组
// function insert (arr, item, index) {
//   const newArr = [...arr]
//   newArr.splice(index, 0, item)
//   return newArr
// }
// console.log(insert([1, 2, 3, 4], 'z', 2))

/* 9 */
// 统计数组 arr 中值等于 item 的元素出现的次数
// function count(arr, item) { return arr.filter(p=>p === item).length; }

// function count (arr, item) {
//   return arr.reduce((count, curr) => count += Number(curr === item), 0)
// }

// function count (arr, item) {
//   let count = 0
//   arr.forEach(el => {
//     if (el === item) {
//       count++
//     }
//   })
//   return count
// }

// console.log(count([1, 2, 3, 2, 4], 2))

/* 10 */
// 找出数组 arr 中重复出现过的元素（不用考虑返回顺序）
// function duplicates (arr) {
//   const newArr = []
//   const duplicatesArr = []
//   arr.forEach(item => {
//     if (newArr.includes(item)) {
//       duplicatesArr.push(item)
//     } else {
//       newArr.push(item)
//     }
//   })
//   return [...new Set(duplicatesArr)]
// }
// console.log(duplicates([1, 2, 4, 4, 3, 3, 1, 5, 3]))

// 直接使用filter + index + lastIndexOf 去判断重复：
// function duplicates(arr) {
//     return arr.filter((el, i)=>arr.lastIndexOf(el) != i  &&  i == arr.indexOf(el))
// }

/* 11 */
// 为数组 arr 中的每个元素求二次方。不要直接修改数组 arr，结果返回新的数组
// function square (arr) {
//   return arr.map(item => Math.pow(item, 2))
// }

// function square (arr) {
//   return arr.reduce((r, o, i) => {
//     r.push(o * o)
//     return r
//   }, [])
// }
// console.log(square([1, 2, 3, 4]))

/* 12 */
// 在数组 arr 中，查找值与 item 相等的元素出现的所有位置
// function findAllOccurrences (arr, target) {
//   const indexArr = []
//   arr.forEach((item, index) => {
//     if (item === target) {
//       indexArr.push(index)
//     }
//   })
//   return indexArr
// }

// console.log(findAllOccurrences(['a', 'b', 'c', 'd', 'e', 'f', 'a', 'b', 'c'], 'a'))

/* 13 */
// function parse2Int (num) {
//   // if (num.indexOf('0x') === 0) {
//   //   return num.slice(2)
//   // }
//   return parseInt(num, 10)
// }
// console.log(parse2Int('12px'))
// console.log(parse2Int('0x12'))



