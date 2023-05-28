//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auction{

	event ProposalCreated(uint indexed Proposal_ID, address Creator);
	event BidPlaced(uint indexed Proposal_ID, address Bidder);
	
	

	struct Proposal {
		uint32 auctionPeriod;
		string description;		
	}

	uint private id;

	mapping(uint => Proposal) id_to_proposal;

	mapping(address => mapping(uint => uint)) usersBids;

	mapping(address => mapping(uint => bool)) canWithdraw;

	mapping(uint => uint) HighestBid;

	mapping(uint => address) HighestBidder;

	function addProposal( uint32 _time,  string memory _description )
		public
		payable
	{	
		require(msg.value == 5 gwei, 
			"Use 5 gwei to make a proposal");
		require(_time < 1 weeks, 
			"1 week max for any auction");
		id_to_proposal[id] = Proposal(uint32(block.timestamp) + _time , _description);
		id++;
		uint y = id - 1;
		emit ProposalCreated(y, msg.sender);
	}

	function placeBid(uint proposal_ID)
		public
		payable
	{
		require(usersBids[msg.sender][proposal_ID] == 0, "Already bidded, Up bid");
		require(id_to_proposal[proposal_ID].auctionPeriod > block.timestamp, 
			"Already ended");
		require(msg.value > HighestBid[proposal_ID], 
			"Bid higher");

		usersBids[msg.sender][proposal_ID] = msg.value;
		canWithdraw[msg.sender][proposal_ID] = true;
		HighestBid[proposal_ID] = msg.value;
		HighestBidder[proposal_ID] = msg.sender;
		emit BidPlaced(proposal_ID, msg.sender);
	}

	function upBid(uint proposal_ID)
		public
		payable
	{	
		require(id_to_proposal[proposal_ID].auctionPeriod > block.timestamp, 
			"Already ended");
		require(usersBids[msg.sender][proposal_ID] > 0, 
			"Bid first");
		require((usersBids[msg.sender][proposal_ID] + msg.value) > HighestBid[proposal_ID], 
			"Bid should be higher than current highest bid");

		usersBids[msg.sender][proposal_ID] += msg.value;
		HighestBid[proposal_ID] = usersBids[msg.sender][proposal_ID];
		HighestBidder[proposal_ID] = msg.sender;
		emit BidPlaced(proposal_ID, msg.sender);
	}

	function withdrawBid(uint proposal_ID, address receiver)
		public
	{
		require(usersBids[receiver][proposal_ID] > 0, 
			"Only previous bidders can withdraw");
		require(id_to_proposal[proposal_ID].auctionPeriod < block.timestamp, 
			"Auction still ongoing");
		require(receiver != HighestBidder[proposal_ID], 
			"No takebacks from Highest Bidder");
		require(canWithdraw[receiver][proposal_ID] == true, 
			"Cant withdraw");
		canWithdraw[receiver][proposal_ID] = false;
		payable(receiver).transfer(usersBids[receiver][proposal_ID]);
	}

	//********* GETTER FUNCTIONS *********

	function getHighestBid(uint proposal_ID)
		public
		view
		returns(uint)
	{
		return HighestBid[proposal_ID];
	}


	function getBid(uint proposal_ID)
		public
		view
		returns(uint)
	{
		return usersBids[msg.sender][proposal_ID];
	}


	function getHighestBidder(uint proposal_ID)
		public
		view
		returns(address)
	{
		return HighestBidder[proposal_ID];
	}


	function getProposalInfo(uint proposal_ID)
		public
		view
		returns(uint _auctionPeriod, string memory _description)
	{
		_auctionPeriod = id_to_proposal[proposal_ID].auctionPeriod;
		_description = id_to_proposal[proposal_ID].description;
	}


}