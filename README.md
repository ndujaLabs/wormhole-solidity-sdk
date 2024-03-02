# Wormhole Solidity SDK for Hardhat

The purpose of this SDK is to provide helpers to take your existing single-chain solidity application cross-chain using Wormhole's automatic relayers.

### Installation

```bash
npm install wormhole-solidity-sdk
```

### Example Usage + Introduction to Automatic Relayers

[HelloWormhole - Simple cross-chain message sending application](https://github.com/wormhole-foundation/hello-wormhole)

[HelloToken - Simple cross-chain token sending application](https://github.com/wormhole-foundation/hello-tokens)

[HelloUSDC - Simple cross-chain USDC sending application using CCTP](https://github.com/wormhole-foundation/hello-usdc)

### SDK Summary

- Includes interfaces to interact with contracts in the Wormhole ecosystem ([src/interfaces](https://github.com/wormhole-foundation/wormhole-solidity-sdk/tree/main/src/interfaces))
- Includes the base class ‘Base’ with helpers for common actions that will typically need to be done within ‘receiveWormholeMessages’:
  - [`onlyWormholeRelayer()`](https://github.com/wormhole-foundation/wormhole-solidity-sdk/blob/main/src/Base.sol#L24): Checking that msg.sender is the wormhole relayer contract
    Sometimes, Cross-chain applications may be set up such that there is one ‘spoke’ contract on every chain, which sends messages to the ‘hub’ contract. If so, we’d ideally only want to allow messages to be sent from these spoke contracts. Included are helpers for this:
    
    - [`setRegisteredSender(uint16 sourceChain, bytes32 sourceAddress)`](https://github.com/wormhole-foundation/wormhole-solidity-sdk/blob/main/src/Base.sol#L47): Setting the specified sender for ‘sourceChain’ to be ‘sourceAddress’
    - [`isRegisteredSender(uint16 sourceChain, bytes32 sourceAddress)`](https://github.com/wormhole-foundation/wormhole-solidity-sdk/blob/main/src/Base.sol#L35): Checking that the sender who requested the delivery is the registered address for that chain
    
    Look at test/Counter.t.sol for an example usage of Base~~~~
    
- Included are also the ‘[TokenSender](https://github.com/wormhole-foundation/wormhole-solidity-sdk/blob/main/src/TokenBase#L36)’ and ‘[TokenReceiver](https://github.com/wormhole-foundation/wormhole-solidity-sdk/blob/main/src/TokenBase.sol#L126)’ base classes with helpers for smart contracts that wish to send and receive tokens using Wormhole’s TokenBridge. See ‘[HelloToken](https://github.com/wormhole-foundation/hello-token)’ for example usage.
- Included are also the ‘[CCTPSender](https://github.com/wormhole-foundation/wormhole-solidity-sdk/blob/main/src/CCTPBase#L70)’ and ‘[CCTPReceiver](https://github.com/wormhole-foundation/wormhole-solidity-sdk/blob/main/src/CCTPBase.sol#L134)’ base classes with helpers for smart contracts that wish to send and receive both tokens using Wormhole’s TokenBridge as well as USDC using CCTP. See ‘[HelloUSDC](https://github.com/wormhole-foundation/hello-usdc)’ for example usage.
- Included are helpers that help set up a local forge testing environment. See ‘[HelloWormhole](https://github.com/wormhole-foundation/hello-wormhole)’ for example usage.

**Note: This code is meant to be used as starter / reference code. Feel free to modify for use in your contracts, and also make sure to audit any code used from here as part of your contracts before deploying to mainnet.**


### License

Copyright 2022 Wormhole Project Contributors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

### Note

This version for Hardhat has been set up by [ndujaLabs](https://ndujalabs.com) to work with Hardhat. It uses the original SDK as a submodule, so that it can be easily updated to the latest version.