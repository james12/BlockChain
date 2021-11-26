const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(index, timestamp, data, previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data= data;
        this.previousHash = previousHash
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0,'01/01/1999','Genesis', 0)
    }
    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }
    addNewBlock(addBlock){
        addBlock.previousHash = this.getLatestBlock().hash;
        addBlock.hash = addBlock.calculateHash();
        this.chain.push(addBlock)
    }

    isChainvalid(){
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false
            }
            if(previousBlock.hash !== currentBlock.previousHash){
                return false
            }
        }
        return true;
    }
}

let NewCoin = new BlockChain();

NewCoin.addNewBlock(new Block(1, '02/01/1999', {value: 50}))
NewCoin.addNewBlock(new Block(2, '03/01/1999', {value: 50}))

console.log(JSON.stringify(NewCoin, null, 4))

// console.log(' isChainValid ',NewCoin.isChainvalid())

// NewCoin.chain[1].data = {value : 500}

// console.log(' isChainValid ',NewCoin.isChainvalid())