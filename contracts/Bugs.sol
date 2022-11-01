// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Bugs is ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
	
	string baseUri;

    constructor(string memory _baseUri) ERC721("Bugs", "BUGS") {
		baseUri = _baseUri;
	}
	
	function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireMinted(tokenId);

        return baseUri;
    }

    function safeMint(address to) public {
        uint tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}
