// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IPFSRegistry {
    // Mapping from address to multiple IPFS Content Identifiers (CIDs)
    mapping(address => string[]) private _addressToCIDs;

    // Event that is emitted when a CID is added for an address
    event CIDAdded(address indexed addr, string cid);

    // Event that is emitted when a CID is removed for an address
    event CIDRemoved(address indexed addr, string cid);

    // Adds a new CID for the sender's address. Allows multiple CIDs per address.
    function addMyCID(string calldata cid, address _sender) public {
        _addressToCIDs[_sender].push(cid);
        emit CIDAdded(_sender, cid);
    }

    // Removes a CID for the sender's address. Assumes CIDs are unique per address.
    function removeMyCID(string calldata cid, address _sender) public {
        require(_addressToCIDs[_sender].length > 0, "No CIDs to remove.");

        for (uint i = 0; i < _addressToCIDs[_sender].length; i++) {
            if (
                keccak256(bytes(_addressToCIDs[_sender][i])) ==
                keccak256(bytes(cid))
            ) {
                _addressToCIDs[_sender][i] = _addressToCIDs[_sender][
                    _addressToCIDs[_sender].length - 1
                ];
                _addressToCIDs[_sender].pop();
                emit CIDRemoved(_sender, cid);
                return;
            }
        }

        require(false, "CID not found.");
    }

    // Retrieves all CIDs associated with an address. Returns an empty array if none are set.
    function getCIDs(address addr) public view returns (string[] memory) {
        return _addressToCIDs[addr];
    }
}
