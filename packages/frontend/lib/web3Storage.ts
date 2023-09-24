//@ts-ignore
import { Web3Storage } from 'web3.storage'

const client = new Web3Storage({
  token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN || '',
})

export const uploadData = async (
  data: string,
): Promise<string> => {
  try {
    const file = new File([data])
    const cid = await client.put([file], "drip3files")
    return cid
  } catch (e) {
    console.log('error - uploadData: ', e)
    throw e
  }
}

export const getCidLink = async (w3name: string): Promise<string> => {
  return `https://${revision.value.replace(/^\/ipfs\//, '')}.ipfs.w3s.link/`
}

export const readData = async (w3name: string): Promise<string> => {
  try {
    const data = await files[0].text()
    return data
  } catch (e) {
    console.log('error - readData: ', e)
    throw e
  }
}
