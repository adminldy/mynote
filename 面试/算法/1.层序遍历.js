// 1. 从上到下打印二叉树

// 从上到下打印出二叉树的每个节点， 同一层的节点按照从左到右的顺序打印

function sequenceTraverse(root) {
  if(!root) {
    return []
  }
  let res = []
  let prev = [root] 
  while(prev) {
    let temp = []
    for(let i = prev.length;i > 0;i--) {
      let node = prev.shift()
      temp.push(node.val)
      if(node.left) {
        prev.push(node.left)
      }
      if(node.right) {
        prev.push(node.right)
      }
    }     
    res.push(temp)
  }
  return res
}