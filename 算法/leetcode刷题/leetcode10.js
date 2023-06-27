


// 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。


// 解法1:双指针方式

/*
获取倒数第 n 个节点的前驱节点,则前驱节点的下个节点就是需要删除的节点。
可以考虑在初始时将 slow 指向哑节点，fast指向head，fast先走n步,slow再开始走,,这样一来，当 first 遍历到链表的末尾时，slow的下一个节点就是需要删除的节点。
 */
var removeNthFromEnd = function(head, n) {
  let dummyHead =  new ListNode(0);
  dummyHead.next = head;
  let slow = dummyHead
  let fast = head
  for(let i=0;i<n;i++){
    fast = fast.next
  }
  while(fast){
    // 未遍历到链表的末尾时
    slow = slow.next;
    fast = fast.next
  }
  slow.next = slow.next.next;//删除slow的下一个节点
  return dummyHead.next
};

/*
复杂度分析
时间复杂度：O(L)，其中 L 是链表的长度。
空间复杂度：O(1)。
*/



// 解法2:计算链表长度

/*
思路:首先从头节点开始对链表进行一次遍历，得到链表的长度 L。随后我们再从头节点开始对链表进行一次遍历，当遍历到第 L-n+1 个节点时，它就是我们需要删除的节点。
*/

// 为了与题目中的 n 保持一致，节点的编号从 1 开始，头节点为编号 1 的节点。


var removeNthFromEnd = function(head, n) {
  let dummyHead =  new ListNode(0);
  dummyHead.next = head;
  let curr = dummyHead;
  for(let i=1;i<len(head)-n+1;i++){
    curr = curr.next
  }
  curr.next = curr.next.next
  return dummyHead.next
};

const len = (head)=>{
  let length = 0;
  while(head){
    length++;
    head = head.next;
  }
  return length
}
/*
复杂度分析
时间复杂度：O(L)，其中 L 是链表的长度。
空间复杂度：O(1)。
*/


// 解法3:栈

/*
思路与算法:可以在遍历链表的同时将所有节点依次入栈。根据栈「先进后出」的原则，我们弹出栈的第 n 个节点就是需要删除的节点，并且目前栈顶的节点就是待删除节点的前驱节点。
*/

