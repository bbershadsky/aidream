import { useSelect } from "@refinedev/antd";
import type { GetFieldsFromList } from "@refinedev/nestjs-query";

import gql from "graphql-tag";

import type { CompaniesSelectQuery } from "../graphql/types";
import { resources } from "../utility";

const COMPANIES_SELECT_QUERY = gql`
  query CompaniesSelect(
    $filter: CompanyFilter!
    $sorting: [CompanySort!]
    $paging: OffsetPaging!
  ) {
    companies(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        name
        avatarUrl
      }
    }
  }
`;

export const useCompaniesSelect = () => {
  return useSelect<GetFieldsFromList<CompaniesSelectQuery>>({
    resource: resources.companies,
    optionLabel: "name",
    // meta: {
    //   gqlQuery: COMPANIES_SELECT_QUERY,
    // },
  });
};
