pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "hardhat/console.sol";


contract DTCV3 is ERC20("Dustin", "DTCV3"), ERC20Burnable, Ownable {
    uint256 public cap = 5_000_000 * 10**uint256(18);

    constructor(address minter) Ownable(minter) {
        console.log("owner: %s maxcap: %s", msg.sender, cap);
        _mint(msg.sender, cap);
        transferOwnership(msg.sender);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(
            ERC20.totalSupply() + amount <= cap,
            "DTC: cap exceeded"
        );
        _mint(to, amount);
    }
}
