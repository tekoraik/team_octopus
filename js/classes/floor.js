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

var aLetters = ["A", "B", "C", "D"];
var Floor = function(nDoorQueue, nPannelControl) {
	var i = 0,
		nDoorQueue = nDoorQueue || 1,
		nPannelControl = nPannelControl || 1;
	this.oEntranceQueue = new Queue();
	this.oDoorQueue = {};
	this.oControlPannel = {};
	for(; i < nDoorQueue; ++i){
		this.oDoorQueue[ aLetters[i] ] = new Queue();
	}
	for(i = 0; i < nPannelControl; ++i){
		this.oControlPannel[ aLetters[i] ] = new Queue();
	}
}
Floor.prototype.fpAddPersonToEntranceQueue = function(oPerson){
		this.oEntranceQueue.push(oPerson);
}
Floor.prototype.fpDoorQueueLenth = function(sLetter){
	if(this.oDoorQueue[sLetter]){
		return this.oDoorQueue[sLetter].length();
	}
	return false;
}
Floor.prototype.fpControlPannelQueueLength = function(sPannel){
	if(this.oControlPannel[sPannel]){
		return this.oControlPannel[sPannel].length();
	}
	return false;
}
Floor.prototype.fpEntranceQueueLength = function(){
	if(this.oEntranceQueue){
		return this.oEntranceQueue.length();
	}
	return false;
}
Floor.prototype.fpMoveFromEntranceToPannelQueue = function(sDoorPannel){
	this.oControlPannel[sDoorPannel].push(this.oEntranceQueue.shift() );
}
Floor.prototype.fpMoveFromControlPannelToDoorQueue = function(sDoorQueue,sPannelControl){
	this.oDoorQueue[sDoorQueue].push(this.oControlPannel[sPannelControl].shift());
}
Floor.prototype.fpExtracFromDoorQueue = function(sDoorQueue){
	return this.oDoorQueue[sDoorQueue].shift();
}