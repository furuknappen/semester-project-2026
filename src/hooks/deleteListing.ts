import { del } from "../api/apiClient";
import type { Result } from "../utils/result";

export async function deleteListing(id: string): Promise<Result<void, Error>> {
  try {
    await del<void>(`/auction/listings/${id}`);

    return {
      ok: true,
      value: undefined,
    };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error as Error,
    };
  }
}
