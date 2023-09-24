import * as LitJsSdk from '@lit-protocol/lit-node-client'

export const chain = 'sepolia'

export const litNodeClient = new LitJsSdk.LitNodeClient({
  litNetwork: "serrano",
  debug: true,
});

export const createAccessControlConditions = (tokenId: string) => ([
  {
    contractAddress: "0xC36dcDfF4968a80a91015A55fF07426E0e9F8658",
    standardContractType: "ERC721",
    chain,
    method: "ownerOf",
    parameters: [tokenId],
    returnValueTest: {
      comparator: '=',
      value: ':userAddress'
    }
  },
]);
