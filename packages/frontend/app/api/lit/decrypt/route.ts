import * as LitJsSdk from '@lit-protocol/lit-node-client';
import { litNodeClient, chain } from '@/lib/lit';

export async function POST(req: Request): Promise<string | Uint8Array> {
  const { searchParams } = new URL(req.url);
  const ipfsCid = searchParams.get('ipfsCid') || '';

  await litNodeClient.connect();
  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })

  const decryptString = await LitJsSdk.decryptFromIpfs({
    authSig,
    ipfsCid,
    litNodeClient,
  });

  return decryptString;
}
