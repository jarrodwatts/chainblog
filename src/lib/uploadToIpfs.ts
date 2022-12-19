import { ThirdwebStorage } from "@thirdweb-dev/storage";

export default async function uploadToIpfs(data: any) {
  const storage = new ThirdwebStorage();

  return await storage.upload(data);
}
