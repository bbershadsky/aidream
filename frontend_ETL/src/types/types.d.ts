export interface IBusiness {
  $id: string;
  id: string;
  businessID: string;
  storeID: string;
  userID: string;
  name: string;
  description: string;
  email?: string;
  language: string;
  languages: string[];
  currency: string;
  imageURL: string;
  QRImageURL2: string;
  isPublic: boolean;
  phone?: string;
  categoryId: string;
  payments: string[];
}

export interface Proposal {
  $id: string;
  slug: string;
  companyId: string;
  country: string;
  category: string;
  name: string;
  description: string;
  title?: string;
  language: string;
  currency: string[];
  image: string;
  body: string;
  categoryId: string;
  status: string;
}

export type ProposalUpdateInput = {
  companyId?: InputMaybe<Scalars["ID"]["input"]>;
  contactId?: InputMaybe<Scalars["ID"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  //   items?: InputMaybe<Array<QuoteItemInput>>;
  //   salesOwnerId?: InputMaybe<Scalars["ID"]["input"]>;
  status?: InputMaybe<QuoteStatus>;
  //   tax?: InputMaybe<Scalars["Int"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
}
