

// 题解：https://leetcode-cn.com/problems/reverse-linked-list/solution/206-fan-zhuan-lian-biao-shuang-zhi-zhen-fa-di-gui-/


//反转链表
const reverseList = function(head) {
 if(!head || !head.next) return head
 let pre = null;
 let curr = head;
  while(curr){
    let next = curr.next; //存放是下个结点
    curr.next = pre //使当前节点指向原有的前一个节点
    pre = curr  //移动原有上个节点的指针
    curr = next //移动原有当前节点的指针
  }
  return pre
}

console.log(reverseList([1,2,3]))



// 递归实现 （递归回溯）
const reverseList = function(head) {
  if(!head || !head.next) return head
  let pre = head;
  let curr = head.next;
  let p = reverseList(head.next)
  //回溯阶段
  pre.next = null;
  curr.next = pre

  return p  //翻转后的头节点
 }
 