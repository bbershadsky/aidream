export const categories = [
  { label: "Art", value: "Art" },
  { label: "Comics", value: "Comics" },
  { label: "Crafts", value: "Crafts" },
  { label: "Dance", value: "Dance" },
  { label: "Design", value: "Design" },
  { label: "Fashion", value: "Fashion" },
  { label: "Film & Video", value: "Film & Video" },
  { label: "Food", value: "Food" },
  { label: "Games", value: "Games" },
  { label: "Journalism", value: "Journalism" },
  { label: "Music", value: "Music" },
  { label: "Photography", value: "Photography" },
  { label: "Publishing", value: "Publishing" },
  { label: "Technology", value: "Technology" },
  { label: "Theater", value: "Theater" },
];

import { CurrencyOption } from "../types/types";

export const currencyOptions: CurrencyOption[] = [
  { value: "CNY", label: "¥ (CNY / RMB)", symbol: "¥" },
  { value: "USD", label: "$ (USD)", symbol: "$" },
  { value: "EUR", label: "€ (EUR)", symbol: "€" },
  { value: "GBP", label: "£ (GBP)", symbol: "£" },
  { value: "JPY", label: "¥ (JPY)", symbol: "¥" },
  { value: "AUD", label: "$ (AUD)", symbol: "$" },
  { value: "CAD", label: "$ (CAD)", symbol: "$" },
  { value: "CHF", label: "Fr (CHF)", symbol: "Fr" },
  { value: "BTC", label: "₿ (BTC)", symbol: "₿" },
  { value: "ETH", label: "Ξ (ETH)", symbol: "Ξ" },
];

export const getCurrencySymbol = (currencyCode: string) => {
  const currency = currencyOptions.find(
    (option) => option.value === currencyCode
  );
  return currency ? currency.symbol : currencyCode; // Fallback to the code if no symbol is found
};
