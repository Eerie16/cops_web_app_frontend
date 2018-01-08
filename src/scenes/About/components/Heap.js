class Heap {
	constructor(input, comp=(a, b) => a < b) {
		this.size = input.length;
		this.arr = [].concat(input);
		this.comp = comp;
		this.buildHeap = this.heapify.bind(this);
		this.swap = this.swap.bind(this);
		this.getParent = this.getParent.bind(this);
		this.getLeftChild = this.getLeftChild.bind(this);
		this.getRightChild = this.getRightChild.bind(this);
		this.heapify = this.heapify.bind(this);
		this.extractRoot = this.extractRoot.bind(this);
	}

	buildHeap() {
		for (var i = (this.size-1)/2; i >= 0; i--) {
			this.heapify(i);
		}
	}

	swap(a, b) {
		const tmp = this.arr[b];
		this.arr[b] = this.arr[a];
		this.arr[a] = tmp; 
	}

	getParent(index) {
		return (index-1)/2;
	}

	getLeftChild(index) {
		return 2*index + 1;
	}

	getRightChild(index) {
		return 2*index + 2;
	}

	heapify(index) {
		var left = this.getLeftChild(index);
		var right = this.getRightChild(index);
		var target = index;
		if (left < this.size && !this.comp(this.arr[target], this.arr[left]))
			target = left;
		if (right < this.size && !this.comp(this.arr[target], this.arr[right]))
			target = right;
		if (target !== index) {
			this.swap(target, index);
			this.heapify(target);
		}
	}

	extractRoot() {
		const root = this.arr[0];
		if (this.size > 1) {
			this.size = this.size - 1;
			this.arr[0] = this.arr[this.size];
			this.heapify(0);
		}
		return root;
	}
}

export default Heap;