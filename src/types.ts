

export type Bidder = {
  name: string;
  email: string;
  bio: string;
  avatar: Avatar
  banner: Banner;
};
export type Seller = Bidder

export type Banner = {
  url: string;
  alt: string;
};
export type Avatar = {
  url: string;
  alt: string;
};
// TODO: api sier, postman finner det ikke
// export type Seller = Profile & {
//   wins: string[];
// };

export type NewListingRespose = {
  data: Listing;
  meta: Meta;
};

export type Listing = {
  id: string;
  title: string;
  description: string;
  media: Media[];
  tags: string[];
  created: string;
  updated: string;
  endsAt: string;
  bids?: Bids[];
  seller?: Seller
  _count: {
    bids: number;
  };
};

export type Media = {
  url: string;
  alt: string;
};

export type CreateListingRequirement = {
  title: string;
  description?: string;
  tags?: [string];
  media?: Media[];
  endsAt: string; // Required - Instance of new Date()
};

export type BidAmount = {
  amount: number;
};

export type Meta = {
  isFirstPag: boolean;
  isLastPag: boolean;
  currentPag: number;
  previousPag: null;
  nextPag: null;
  pageCoun: number;
  totalCoun: number;
};

export type Bids = {
  id: string;
  amount: number;
  bidder: Bidder
  created: string;
};


export type Profile = {
    name: string,
    email: string,
    bio: string,
    avatar: Avatar,
    banner:Banner,
    credits: number,
    listings?: Listing[],
    wins?: Listing[]
    _count: {
      listings: number,
      wins: number
    }
  }
