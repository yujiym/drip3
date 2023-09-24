import * as LitJsSdk from '@lit-protocol/lit-node-client';
import { createAccessControlConditions, litNodeClient, chain } from '@/lib/lit';

export async function POST(req: Request): Promise<string> {
  const { searchParams } = new URL(req.url);
  const tokenId = searchParams.get('tokenId') || '';

  await litNodeClient.connect();
  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })

  const ipfsCid = await LitJsSdk.encryptToIpfs({
    authSig,
    accessControlConditions: createAccessControlConditions(tokenId),
    chain,
    file: req.body,
    litNodeClient,
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID ?? '',
    infuraSecretKey: process.env.INFURA_SECRET ?? '',
  });
  console.log('req: ',req, 'ipfsCid', ipfsCid)
  return ipfsCid;
}
