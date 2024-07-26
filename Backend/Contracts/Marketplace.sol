// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


contract Marketplace is IERC721Receiver, Ownable {
    using SafeERC20 for IERC20;

    IERC721Enumerable private nft;
    IERC20 private token;

    struct ListDetail {
        address payable author;
        uint256 price;
        uint256 tokenId;
    }

    mapping(uint256 => ListDetail) listDetail;
    uint256 private tax = 10;

    event ListNFT(address indexed _from, uint256 _tokenId, uint256 _price);
    event UnlistNFT(address indexed _from, uint256 _tokenId);
    event BuyNFT(address indexed _from, uint256 _tokenId, uint256 _price);
    event UpdateListingNFTPrice(uint256 _tokenId, uint256 _price);
    event SetToken(IERC20 _token);
    event SetTax(uint256 _tax);
    event SetNFT(IERC721Enumerable _nft);

    constructor(IERC20 _token, IERC721Enumerable _nft, address onwer) Ownable(onwer)  {
    nft = _nft;
    token = _token;
    }

   function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external override pure returns (bytes4) {
        return
            bytes4(
                keccak256("onERC721Received(address,address,uint256,bytes)")
            );
    }

    function setTax(uint256 _tax) public onlyOwner {
        tax = _tax;
        emit SetTax(_tax);
    }

    function setToken(IERC20 _token) public onlyOwner {
        token = _token;
        emit SetToken(_token);
    }

    function setNft(IERC721Enumerable _nft) public onlyOwner {
        nft = _nft;
        emit SetNFT(_nft);
    }

    modifier onlyMarketOwner(uint256 _tokenId) {
            require(nft.ownerOf(_tokenId) == address(this), "NFT not listed");
            _;
    }

    modifier onlyTokenOwner(uint256 _tokenId) {
        require(nft.ownerOf(_tokenId) == msg.sender, "Not the owner");
        _;
    }

    modifier onlyMarketApproved(uint256 _tokenId) {
        require(nft.getApproved(_tokenId) == address(this), "Not approved for transfer");
        _;
    }

    function getListedNft() view public returns (ListDetail [] memory)  {
        uint balance = nft.balanceOf(address(this));
        ListDetail[] memory listedNFTs = new ListDetail[](balance);

        for (uint256 i = 0; i < balance; i++) {
            uint256 tokenId = nft.tokenOfOwnerByIndex(address(this), i);
            listedNFTs[i] = listDetail[tokenId];
        }

        return listedNFTs;
    }

    function listNft(uint256 _tokenId, uint256 _price) public onlyTokenOwner(_tokenId) onlyMarketApproved(_tokenId) {
        listDetail[_tokenId] = ListDetail(payable(msg.sender), _price, _tokenId);

        nft.safeTransferFrom(msg.sender, address(this), _tokenId);
        emit ListNFT(msg.sender,_tokenId, _price);
    }

    function unListNft(uint256 _tokenId) public onlyTokenOwner(_tokenId) onlyMarketOwner(_tokenId) {
        nft.safeTransferFrom(address(this), msg.sender, _tokenId);
        emit UnlistNFT(msg.sender,_tokenId);
    }

    function updateListingNftPrice(uint256 _tokenId,uint256 _price) public onlyMarketOwner(_tokenId) {
         require(listDetail[_tokenId].author == msg.sender, "Only owner can update price of this NFT");

        listDetail[_tokenId].price = _price;
        emit UpdateListingNFTPrice(_tokenId, _price);
    }

    function buyNft(uint256 _tokenId, uint256 _price) public onlyMarketOwner(_tokenId){
        require(token.balanceOf(msg.sender) >= _price, "Insufficient account balance");
        require(listDetail[_tokenId].price <= _price, "Minimum price has not been reached");

        SafeERC20.safeTransferFrom(token,msg.sender, address(this), _price);
        token.transfer(listDetail[_tokenId].author, _price * (100-tax)/100);

        nft.safeTransferFrom(address(this), msg.sender, _tokenId);
        emit BuyNFT(msg.sender,_tokenId, _price);
    }

}