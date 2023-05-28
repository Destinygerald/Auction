const Auction = artifacts.require("Auction");
const web3 = require("web3");
const Web3 = new web3("http://127.0.0.1:9545/");

contract('Auction', (accounts) => {
	let Actn = null;
	
	before(async() => {
		Auc = await Auction.deployed();
	})


	it('1. Should make an auction Proposal', async() => {
		await Auc.addProposal("abc", {
			from: accounts[1],
			to: Auc.address,
			value: Web3.utils.toWei('5', 'gwei')
		});

		await Web3.eth.getBalance(Auc.address, (err,res) => {
			console.log(`1. Balance of ${Auc.address} is ${res}`);
		})
	});

	it('1.5. Should return auction info', async() => {
		let info = await Auc.getProposalInfo(0);
		console.log(info._auctionPeriod.toString(), info._description);
	})

	it('2. Should place bid', async() => {
		await Auc.placeBid(0, {
			from: accounts[2],
			to: Auc.address,
			value: Web3.utils.toWei('0.0002', 'ether')
		});

		await Web3.eth.getBalance(Auc.address, (err,res) => {
			console.log(`2. Balance of ${Auc.address} is ${res}`);
		})

	});

	it('3. Shouldnt place bid', async() => {
		await Auc.placeBid(0, {
			from: accounts[2],
			to: Auc.address,
			value: Web3.utils.toWei('0.0002', 'ether')
		});

		await Web3.eth.getBalance(Auc.address, (err,res) => {
			console.log(`3. Balance of ${Auc.address} is ${res}`);
		})

	});

	it('4. Should get highest bid', async() => {
		let highest_bid = await Auc.getHighestBid(0);
		console.log(`8. Highest bid is ${highest_bid}`);
	});

	it('5. Should place another bid', async() => {
		await Auc.placeBid(0, {
			from: accounts[3],
			to: Auc.address,
			value: Web3.utils.toWei('0.00021', 'ether')
		});

		await Web3.eth.getBalance(Auc.address, (err,res) => {
			console.log(`5. Balance of ${Auc.address} is ${res}`);
		})
	});

	it('6. Should get highest bid', async() => {
		let highest_bid = await Auc.getHighestBid(0);
		console.log(`8. Highest bid is ${highest_bid}`);
	});

	it('7. Should up the account1 bid', async() => {
		await Auc.upBid(0, {
			from: accounts[2],
			to: Auc.address,
			value: Web3.utils.toWei('0.00002', 'ether')
		})
	})

	it('8. Should get highest bid', async() => {
		let highest_bid = await Auc.getHighestBid(0);
		console.log(`8. Highest bid is ${highest_bid}`);
	});

	it('9. Should get bid', async() => {
		let balance = await Auc.getBid(0, {from: accounts[2]});
		console.log(`${accounts[2]} balance is ${balance}`);
	})

	it('10. Should withdraw bid', async() => {
		await Auc.withdrawBid(0, accounts[3]);
		let balance = await Auc.getBid(0, {from: accounts[3]});
		console.log(`10. ${accounts[3]} balance is ${balance}`);
	})
	
	it('11. Shouldnt withdraw bid', async() => {
		await Auc.withdrawBid(0, accounts[3]);
		let balance = await Auc.getBid(0, {from: accounts[3]});
		console.log(`11. ${accounts[3]} balance is ${balance}`);
	})

	it('12. Shouldnt withdraw bid', async() => {
		await Auc.withdrawBid(0, accounts[2]);
		let balance = await Auc.getBid(0, {from: accounts[2]});
		console.log(`12. ${accounts[2]} balance is ${balance}`);
	})
});

