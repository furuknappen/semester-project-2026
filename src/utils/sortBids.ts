import type { Bids } from "../types";

export function sortBids(bids: Bids[], key: "amount"): Bids[] {
  const sortedBids = [...bids];

  sortedBids.sort((a, b) => b[key] - a[key]);

  return sortedBids;
}
