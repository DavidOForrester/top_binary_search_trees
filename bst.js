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
    function build(arr, start, end) {
      if (start > end) {
        return null;
      }
      let mid = parseInt((start + end) / 2);

      const node = new Node(arr[mid]);

      node.left = build(arr, start, mid - 1);
      node.right = build(arr, mid + 1, end);

      return node;
    }

    const set = new Set(arr);
    const uniqueArray = Array.from(set);
    const sortedArray = sortArray(uniqueArray);

    return build(sortedArray, 0, sortedArray.length - 1);
  }

  insert(value) {
    const node = new Node(value);

    if (this.root === null) {
      this.root = node;
    } else {
      this._insert(node, this.root);
    }
  }

  _insert(node, currentNode) {
    if (node.value < currentNode.value) {
      if (currentNode.left === null) {
        currentNode.left = node;
      } else {
        this._insert(node, currentNode.left);
      }
    } else {
      if (currentNode.right === null) {
        currentNode.right = node;
      } else {
        this._insert(node, currentNode.right);
      }
    }
  }

  delete(value) {}
}

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.insert(15);
tree.insert(55);
tree.insert(5473895432);

prettyPrint(tree.root);
