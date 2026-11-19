import { get } from "../api/apiClient";
import type { Meta, Listing } from "../types";
import type { Result } from "../utils/result";

export type ListingsResponse = {
  data: Listing[];
  mets: Meta;
};

export async function getAllListings(): Promise<Result<ListingsResponse, Error>> {
  try {
    const response = await get<ListingsResponse>(
      "/auction/listings",
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
