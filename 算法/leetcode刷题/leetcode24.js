// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换

var swapPairs = function(head) {
  const dummyHead = new ListNode(0);
  dummyHead.next = head;
  let temp = dummyHead;
  while (temp.next !== null && temp.next.next !== null) {
      const node1 = temp.next;
      const node2 = node1.next;
      temp.next = node2;   //先让头节点指针指向node2
      node1.next = node2.next; //再让node指向node2的下一个节点
      node2.next = node1; //再让node2指向node1
      temp = node1; //再移动指针到node1
  }
  return dummyHead.next;
};

console.log(swapPairs([1,2,3]))

// // 第二种 递归
// var swapPairs = function(head) {
//   if (head === null|| head.next === null) {
//     return head;
// }
//  const newHead = head.next;
//   head.next = swapPairs(newHead.next)
//   newHead.next = head;
//   return newHead;
// };






