
//  删除排序链表中的重复元素

// 存在一个按升序排列的链表，给你这个链表的头节点 head ，请你删除所有重复的元素，使每个元素 只出现一次 。
// 返回同样按升序排列的结果链表。


const head = [1,1,2]
// const deleteDuplicates = function(head) {
//   if(!head) return null
//   let pre = head;
//   let curr = head.next;
//   while(curr!==null){
//      if(curr.val===pre.val){
//        //如果重复
//        pre.next = curr.next
//        curr = curr.next
//      }else{
//         curr = curr.next
//         pre = pre.next
//      }
//   }
//   return head
// };
// console.log(deleteDuplicates(head))

var deleteDuplicates = function(head) {
  if (!head) {
      return head;
  }

  let cur = head;
  while (cur.next) {
      if (cur.val === cur.next.val) {
          cur.next = cur.next.next;
      } else {
          cur = cur.next;
      }
  }
  return head;
}



console.log(deleteDuplicates(head))