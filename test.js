function fn2(){
  console.log(a)
}
function fn1(){
	const a = 1
  fn2()
}
const a = 2
// function fn2(){
//   console.log(a)
// }
// function fn3(f){
//   const a = 4;
//   f()      
// }
fn1()
// fn3(fn2)


// function fn3(){
//   const a = 4;
//   console.log(a)
// }
// fn3()