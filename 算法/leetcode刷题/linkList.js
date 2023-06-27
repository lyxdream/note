class Node{
  constructor(val,next=null){
    this.val = val;
    this.next = next;
  }
}


// //节点加指针
// function ListNode(){
//   let head = new Node(1);
//   head.next = new Node(2);
//   head.next.next = new Node(3);
//   head.next.next.next = new Node(4);
//   let p = head,ret = '';
//   console.log(head)
//   while(p){
//     ret += `${p.val}->`
//     p = p.next;
   
//   }
//   ret+='null' 
//   console.log(ret)
// }

//双数组
function ListNode(){
   const data = [];//数据
   const next = []; //指针

   //节点的位置 p  in上一个节点的位置
   function addNode(ind,p,val){
      next[p] = next[ind];//p指向index的下一个节点
      next[ind] = p;//把index的指针指向p
      data[p] = val
  }
  let head = 3;
  data[3] = 'a'
  addNode(3,5,'b')
  addNode(5,7,'c')
  addNode(7,2,'d')
  addNode(2,1,'e')
  addNode(7,4,'f')
  console.log(JSON.stringify(data),JSON.stringify(next))
  let p = head,ret ='';
  while(p){
    ret+=`${data[p]}->`
    p = next[p]
  }
  ret+='null' 
  console.log(ret)
  console.log(head)
}

ListNode()