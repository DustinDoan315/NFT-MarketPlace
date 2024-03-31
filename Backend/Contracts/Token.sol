pragma solidity 0.8.24;

import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DTC is ERC721URIStorage {

  uint256 private _nextTokenId;

    constructor() ERC721("Dustin Token", "DTC") {

    }

    function mintNewToken(address _to, string memory _tokenURI) external returns(uint) {
         uint256 tokenId = _nextTokenId++;
        _mint(_to, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        return tokenId;
    }

}
