// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface ISubscriptionOwner {
    function getSubscriptionOwner() external view returns (address);
}
