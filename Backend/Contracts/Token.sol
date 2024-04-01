// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DTC is ERC721URIStorage {

    uint public _nextTokenId;
    constructor() ERC721("Dustin Token", "DTCv2")
      {}

    function mintNewToken(address _to, string memory _tokenURI) external returns(uint){
          _nextTokenId ++;
        _mint(_to, _nextTokenId);
        _setTokenURI(_nextTokenId, _tokenURI);
        return _nextTokenId;
    }

}
