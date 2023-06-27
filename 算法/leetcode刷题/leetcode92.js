

var reverseBetween = function(head, left, right) {
  // 因为头节点有可能发生变化，使用虚拟头节点可以避免复杂的分类讨论
  const dummyNode = new ListNode(-1);
  dummyNode.next = head;

  let pre = dummyNode;
  // 第 1 步：从虚拟头节点走 left - 1 步，来到 left 节点的前一个节点
  // 建议写在 for 循环里，语义清晰
  for (let i = 0; i < left - 1; i++) {
      pre = pre.next;
  }

  // 第 2 步：从 pre 再走 right - left + 1 步，来到 right 节点
  let rightNode = pre;
  for (let i = 0; i < right - left + 1; i++) {
      rightNode = rightNode.next;
  }

  // 第 3 步：切断出一个子链表（截取链表）
  let leftNode = pre.next;
  let curr = rightNode.next;

  // 注意：切断链接
  pre.next = null;
  rightNode.next = null;

  // 第 4 步：同第 206 题，反转链表的子区间
  reverseLinkedList(leftNode);

  // 第 5 步：接回到原来的链表中
  pre.next = rightNode;
  leftNode.next = curr;
  return dummyNode.next;
};

const reverseLinkedList = (head) => {
  let pre = null;
  let cur = head;

  while (cur) {
      const next = cur.next;
      cur.next = pre;
      pre = cur;
      cur = next;
  }
}




// /**
//  * Definition for singly-linked list.
//  * function ListNode(val, next) {
//  *     this.val = (val===undefined ? 0 : val)
//  *     this.next = (next===undefined ? null : next)
//  * }
//  */
// /**
//  * @param {ListNode} head
//  * @param {number} left
//  * @param {number} right
//  * @return {ListNode}
//  */
//  var reverseBetween = function(head, left, right) {
//   if(left===right) return head;  
//    let count = 0;
//    let preNode = head;
//    let lastNode = head
//    let reverseList=head;
//    while(head){
//      count++
//      head = head.next;
//      console.log(head,'--head-next')
//      if(left>1&&count===left-1){
//        preNode.next = head
//      }
//      console.log(preNode,'--preNode')
//      if(count===left) {
//        reverseList = head
//      }
//      console.log(reverseList,'--reverseList')
//      if(count<=right){
//        reverseList.next = head.next
//      }
//      if(head.next&&right === count){
//        lastNode = head.next
//        lastNode.next = null
//        break
//      }
//    }
 
//    const reverseLinkedList = (head) => {
//      let pre = null;
//      let cur = head;
   
//      while (cur) {
//          const next = cur.next;
//          cur.next = pre;
//          pre = cur;
//          cur = next;
//      }
//      return pre
//    }
   
//    reverseList = reverseLinkedList(reverseList)
   
//    if(lastNode){
//      reverseList.next = lastNode
//    }
//    if(preNode){
//      preNode.next = reverseList
//    }
//    return preNode
//  };

var reverseBetween = function(head, left, right) {
  const dummyNode = new ListNode(-1);
  dummyNode.next = head;
  let preNode = dummyNode;

  for(let i=0;i<left-1;i++){
    preNode = preNode.next
  }

  //取出中间需要翻转的部分
  let rightNode = preNode
  for(let i=0;i<right-left+1;i++){
    rightNode = rightNode.next
  }

  // 切断出一个子链表（截取链表）
  let leftNode = preNode.next;
  //记录断链的之后，左边的第一个节点和右边的第一个节点
  let lastNode = rightNode.next

  //断链
  preNode.next = null
  rightNode.next = null

  reverseLinkedList(leftNode)

  const reverseLinkedList = (head) => {
    let pre = null;
    let cur = head;
  
    while (cur) {
        const next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre
  }
  
  // 接链
  preNode.next = rightNode;
  leftNode.next = lastNode
  return dummyNode.next
};


// 第二种解法


var reverseBetween = function(head, left, right) {
  const dummyNode = new ListNode(-1);
  dummyNode.next = head;
  let pre = dummyNode
  for(let i=0;i<left-1;++i){
    pre = pre.next
  }
  let curr = pre.next;
  for(let i=0;i<right-left;++i){
    const next = curr.next;
    curr.next = next.next
    next.next = pre.next
    pre.next = next
  }
  return dummyNode.next
}