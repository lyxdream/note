/**题目: JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善代码中Scheduler类，使得以下程序能正确输出
 * 条件: 只能修改Sheduler**/

/** 
class Scheduler {
  add(promiseCreator) { 
   }
}
const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})
const scheduler = new Scheduler()
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order))
}
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
// output 2 3 1 4
//一开始，1，2进入任务队列
//500ms时，2完成，输出2，任务3进入队列
//800ms时，3完成，输出3，任务4进入队列
//1000ms时，1完成，输出1
//1200ms时，4完成，输出4
*/


// 思路 一个递归函数拆分成两个，一个函数负责发送请求，另外一个负责调度。
class Scheduler{
constructor(){
  this.cacheList = [] //缓存排队中的任务列表
  this.task = [];//当前执行的任务列表
  this.max = 2 //最大并发任务
}
add(promiseCreator){
  return new Promise((resolve)=>{
    promiseCreator.resolve = resolve; // 保存当前promise的状态
    if( this.task.length<this.max){ //如果正在执行的任务列表里面的任务小于最大并发量
       this.runWork(promiseCreator)  //执行当前任务
    }else{
      this.cacheList.push(promiseCreator)
    }
  })
}
runWork(promiseCreator){
  this.task.push(promiseCreator)
  promiseCreator().then(()=>{
    promiseCreator.resolve()  //promiseCreator执行完毕之后，打印输出。如果去掉这句，控制台将无打印信息
    const taskIndex = this.task.indexOf(promiseCreator) 
    this.task.splice(taskIndex,1)  //当前任务执行完成 清除task中的数据
    if(this.cacheList.length){
      this.runWork(this.cacheList.shift()) // 根据执行的缓存顺序执行，保证执行的有序性
    }
  })
}
}

const timeout = (time) => new Promise(resolve => {
setTimeout(resolve, time)
})

const scheduler = new Scheduler()

const addTask = (time, order) => {
scheduler.add(() => timeout(time)).then(() => console.log(order + 'order'))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')