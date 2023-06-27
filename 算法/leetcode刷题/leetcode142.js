// 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。


/***快慢指针*****/

/***第一种解法*****/
// var detectCycle = function(head) {
//     if(!head) return null
//     let slow = head;
//     let fast = head;
//     let isCyle = false
//     while(fast.next&&fast.next.next){
//       slow = slow.next;
//       fast = fast.next.next;
//       if(slow===fast){
//         isCyle = true;
//         break
//       }
//     }
//     if(!isCyle) return null
//     slow = head;
//     while(slow!==fast){
//       slow = slow.next;
//       fast = fast.next;
//     }
//     return slow
// };


/***第二种解法*****/
var detectCycle = function(head) {
  if(!head || !head.next) return null
  let slow = head.next;
  let fast = head.next.next;
  while(slow!==fast&&fast&&fast.next){
    slow = slow.next;
    fast = fast.next.next;
  }
  if(slow!==fast) return null
  slow = head
  while(slow!==fast){
    slow = slow.next;
    fast = fast.next;
  }
  return slow
};


/***第三种解法*****/
var detectCycle = function(head) {
  if(!head || !head.next) return null
  let slow = head;
  let fast = head;
  let start = head;
  while(fast&&fast.next){
    slow = slow.next;
    fast = fast.next.next;
    if(slow===fast){
      while(start!==slow){
        slow = slow.next;
        start = start.next
      }
      return start
    }
  }
  return null
};


/***hash*****/
var detectCycle = function(head) {
  if(!head || !head.next) return null
  let map = new Map();
  let current = head;
  while(current){
    //如果访问过直接返回
    if(map.has(current)) return current
    //在map中保存当前的节点
    map.set(current,true)
    //开始下一次循环
    current = current.next
  }
  return null
}