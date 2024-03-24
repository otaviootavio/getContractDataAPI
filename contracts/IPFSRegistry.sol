// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IPFSRegistry {
    // A structure to hold two types of CIDs: .json and .pdf
    struct FileCIDs {
        string jsonCID;
        string pdfCID;
    }

    // Mapping from address to FileCIDs
    mapping(address => FileCIDs) private _addressToFileCIDs;

    // Events that are emitted when a CID is set
    event JsonCIDSet(address indexed addr, string cid);
    event PdfCIDSet(address indexed addr, string cid);

    // Sets the .json CID for the sender's address. Can replace an existing CID.
    function setMyJsonCID(string calldata cid, address _sender) public {
        _addressToFileCIDs[_sender].jsonCID = cid;
        emit JsonCIDSet(_sender, cid);
    }

    // Sets the .pdf CID for the sender's address. Can replace an existing CID.
    function setMyPdfCID(string calldata cid, address _sender) public {
        _addressToFileCIDs[_sender].pdfCID = cid;
        emit PdfCIDSet(_sender, cid);
    }

    // Retrieves the .json CID associated with an address. Returns an empty string if none is set.
    function getJsonCID(address addr) public view returns (string memory) {
        return _addressToFileCIDs[addr].jsonCID;
    }

    // Retrieves the .pdf CID associated with an address. Returns an empty string if none is set.
    function getPdfCID(address addr) public view returns (string memory) {
        return _addressToFileCIDs[addr].pdfCID;
    }
}
