import { getNftAbi } from "@/utils/getAbi";
import { Erc20 } from "./interfaces";
import { getNftAddress } from "@/utils/getAddress";

export default class NFTContract extends Erc20 {
  constructor(provider: string) {
    super(provider, getNftAbi(), getNftAddress());
  }
}
