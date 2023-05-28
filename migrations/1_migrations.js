const Auction = artifacts.require("Auction");

module.exports = async(deployer) =>{

	await deployer.deploy(Auction);
	
}