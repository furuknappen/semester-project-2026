import { get } from "../api/apiClient";
import type { Meta, Bids } from "../types";
import type { Result } from "../utils/result";

export type ListingsResponse = {
  data: Bids[];
  mets: Meta;
};

export async function getAllBidsByProfile(name: string): Promise<Result<ListingsResponse, Error>> {
  try {
    const response = await get<ListingsResponse>(
      `/auction/profiles/${name}/bids?_listings=true&_bids=true`,
    );

    if (!response) {
      return {
        ok: false,
        error: new Error("No response was recieved"),
      };
    }

    return { ok: true, value: response };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error as Error,
    };
  }
}
