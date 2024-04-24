// pragma solidity 0.8.24;
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/access/extensions/AccessControlEnumerable.sol";
// import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
// import "@openzeppelin/contracts/utils/Context.sol";

// interface IDTC {
//     function mint(address to, uint256 token_type) external returns(uint256);
// }

// contract DTC is ERC721Enumerable, Ownable, AccessControlEnumerable, IDTC {
//     uint256 private _tokenIdTracker;
//     string private _url;

//     bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

//     event Mint(address to, uint256 token_type, uint256 token_id);

//     constructor(address minter) ERC721("Dustin Token", "Dustin") Ownable(minter) {
//         _grantRole(DEFAULT_ADMIN_ROLE, minter);
//     }

//     function mint(address to, uint256 hero_type) external override returns (uint256) {
//         require(owner() == _msgSender() || hasRole(MINTER_ROLE, _msgSender()), "Caller is not a minter");
//         _tokenIdTracker++;
//         uint256 token_id = _tokenIdTracker;
//         _mint(to, token_id);
//         emit Mint(to, hero_type, token_id);
//         return token_id;
//     }
//     function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable, AccessControlEnumerable) returns (bool) {
//       return super.supportsInterface(interfaceId);
//     }
// }
