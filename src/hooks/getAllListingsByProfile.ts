import { get } from "../api/apiClient";
import type { Meta, Listing } from "../types";
import type { Result } from "../utils/result";

export type ListingsResponse = {
  data: Listing[];
  mets: Meta;
};

export async function getAllListingsByProfile(name: string): Promise<Result<ListingsResponse, Error>> {
  try {
    const response = await get<ListingsResponse>(
      `/auction/profiles/${name}/listings?_bids=true`,
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
