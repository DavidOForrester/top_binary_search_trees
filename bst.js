const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function sortArray(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  return array;
}

function minValue(root) {
  let minv = root.value;
  while (root.left != null) {
    minv = root.left.key;
    root = root.left;
  }
  return minv;
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    function buildRec(arr, start, end) {
      if (start > end) {
        return null;
      }
      let mid = parseInt((start + end) / 2);

      const node = new Node(arr[mid]);

      node.left = buildRec(arr, start, mid - 1);
      node.right = buildRec(arr, mid + 1, end);

      return node;
    }

    const set = new Set(arr);
    const uniqueArray = Array.from(set);
    const sortedArray = sortArray(uniqueArray);

    return buildRec(sortedArray, 0, sortedArray.length - 1);
  }

  insert(value) {
    function insertRec(node, currentNode) {
      if (node.value < currentNode.value) {
        if (currentNode.left === null) {
          currentNode.left = node;
        } else {
          insertRec(node, currentNode.left);
        }
      } else {
        if (currentNode.right === null) {
          currentNode.right = node;
        } else {
          insertRec(node, currentNode.right);
        }
      }
    }

    const node = new Node(value);

    if (this.root === null) {
      this.root = node;
    } else {
      insertRec(node, this.root);
    }
  }

  delete(value, root = this.root) {
    if (root === null) {
      return root;
    }
    if (root.value < value) {
      root.right = this.delete(value, root.right);
    } else if (root.value > value) {
      root.left = this.delete(value, root.left);
    } else {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }
      root.value = minValue(root.right)
      root.right = this.delete(value, root.right);
    }

    return root;
  }

  find(value) {}

  levelOrder() {}

  inOrder() {}

  preOrder() {}

  postOrder() {}

  height(node) {}

  depth(node) {}

  isBalanced() {}

  reBalance() {}
}

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(tree.root);

tree.insert(15);
tree.insert(55);
tree.insert(5473895432);
tree.delete(4);

prettyPrint(tree.root);
