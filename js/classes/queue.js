var Queue = function(){
	this.aQueue = [];
}
Queue.prototype.length = function(){
	return this.aQueue.length;
}
Queue.prototype.push = function(oElement){
	this.aQueue.push(oElement);
}
Queue.prototype.shift = function(){
	return this.aQueue.shift();
}
Queue.prototype.hasMoreElements = function(){
	return this.aQueue.length > 0;
}
Queue.prototype.getFirstElement = function(){
	var oElement = this.aQueue[0] || false;
	return oElement;
}




