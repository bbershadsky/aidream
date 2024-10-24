import type { FC, PropsWithChildren } from "react";

import {
  DeleteButton,
  EditButton,
  FilterDropdown,
  getDefaultSortOrder,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
// import { getDefaultFilter, type HttpError } from "@refinedev/core";
import type { GetFieldsFromList } from "@refinedev/nestjs-query";

import { SearchOutlined } from "@ant-design/icons";
import { Form, Grid, Input, Select, Space, Spin, Table } from "antd";
import dayjs from "dayjs";
import debounce from "lodash/debounce";

import {
  CustomAvatar,
  ListTitleButton,
  // PaginationTotal,
  Participants,
  // QuoteStatusTag,
  Text,
  // } from "@/components";
} from "../../components";
// import type { QuoteStatus } from "@/graphql/schema.types";
import type { QuoteStatus } from "../../graphql/schema.types";
// import type { QuotesTableQuery } from "@/graphql/types";
import type { QuotesTableQuery } from "../../graphql/types";
// import { useCompaniesSelect } from "@/hooks/useCompaniesSelect";
import { useCompaniesSelect } from "../../hooks/useCompaniesSelect";
// import { useUsersSelect } from "@/hooks/useUsersSelect";
import { useUsersSelect } from "../../hooks/useUsersSelect";
// import { currencyNumber } from "@/utilities";
import { currencyNumber } from "../../utilities";

// import { QUOTES_TABLE_QUERY } from "./queries";
import { resources } from "../../utility";

type Quote = GetFieldsFromList<Proposal>;
// type Proposal = GetFieldsFromList<QuotesTableQuery>;

interface Proposal {
  username: string;
  email: string;
  title: string;
}

type Quote1 = {
  id: string;
  // Add other properties of Quote here
};

const statusOptions: { label: string; value: QuoteStatus }[] = [
  {
    label: "Draft",
    value: "DRAFT",
  },
  {
    label: "Sent",
    value: "SENT",
  },
  {
    label: "Accepted",
    value: "ACCEPTED",
  },
];

export const QuotesListPage: FC<PropsWithChildren> = ({ children }) => {
  const screens = Grid.useBreakpoint();

  const { tableProps, searchFormProps, filters, sorters, tableQueryResult } =
    useTable<Proposal>({
      resource: resources.projects,
      // onSearch: (values) => {
      //   return [
      //     {
      //       field: "title",
      //       operator: "contains",
      //       value: values.title,
      //     },
      //   ];
      // },
      // filters: {
      //   initial: [
      //     {
      //       field: "title",
      //       value: "",
      //       operator: "contains",
      //     },
      //     {
      //       field: "status",
      //       value: undefined,
      //       operator: "in",
      //     },
      //   ],
      // },
      // sorters: {
      //   initial: [
      //     {
      //       field: "$createdAt",
      //       order: "desc",
      //     },
      //   ],
      // },
      // meta: {
      //   gqlQuery: QUOTES_TABLE_QUERY,
      // },
    });

  const { selectProps: selectPropsCompanies } = useCompaniesSelect();

  const { selectProps: selectPropsUsers } = useUsersSelect();
  // const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   searchFormProps?.onFinish?.({
  //     title: e.target.value ?? "",
  //   });
  // };

  // const debouncedOnChange = debounce(onSearch, 500);

  return (
    <div className="page-container">
      <List
        breadcrumb={false}
        headerButtons={({ defaultButtons }) => {
          return (
            <Space
              style={{
                marginTop: screens.xs ? "1.6rem" : undefined,
              }}
            >
              <Form
                {...searchFormProps}
                // initialValues={{
                //   title: getDefaultFilter("title", filters, "contains"),
                // }}
                layout="inline"
              >
                <Form.Item name="title" noStyle>
                  <Input
                    size="large"
                    // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                    prefix={<SearchOutlined className="anticon tertiary" />}
                    suffix={
                      <Spin
                        size="small"
                        spinning={tableQueryResult.isFetching}
                      />
                    }
                    placeholder="Search by name"
                    // onChange={debouncedOnChange}
                  />
                </Form.Item>
              </Form>
              {defaultButtons}
            </Space>
          );
        }}
        contentProps={{
          style: {
            marginTop: "28px",
          },
        }}
        // title={<ListTitleButton buttonText="Add proposal" toPath="/create" />}
      >
        <Table
          {...tableProps}
          pagination={{
            ...tableProps.pagination,
            // showTotal: (total) => (
            // <PaginationTotal total={total} entityName="quotes" />
            // ),
          }}
          rowKey="<id"
        >
          <Table.Column
            dataIndex="name"
            title="Title"
            // defaultFilteredValue={getDefaultFilter("title", filters)}
            // filterDropdown={(props) => (
            //   <FilterDropdown {...props}>
            //     <Input placeholder="Search Name" />
            //   </FilterDropdown>
            // )}
          />
          {/* <Table.Column<Quote>
            dataIndex={["company", "id"]}
            title="Company"
            // defaultFilteredValue={getDefaultFilter("company.id", filters, "in")}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  placeholder="Search Company"
                  style={{ width: 220 }}
                  {...selectPropsCompanies}
                />
              </FilterDropdown>
            )}
            render={(_, record) => {
              return (
                <Space>
                  <CustomAvatar
                    shape="square"
                    name={record.company.name}
                    src={record.company.avatarUrl}
                  />
                  <Text style={{ whiteSpace: "nowrap" }}>
                    {record.company.name}
                  </Text>
                </Space>
              );
            }}
          /> */}
          {/* <Table.Column
            dataIndex="total"
            title="Total Amount"
            sorter
            render={(value) => {
              return (
                <Text
                  style={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {currencyNumber(value)}
                </Text>
              );
            }}
          /> */}
          {/* <Table.Column<Quote>
            dataIndex="status"
            title="Stage"
            // defaultFilteredValue={getDefaultFilter("status", filters, "in")}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  style={{ width: "200px" }}
                  mode="multiple"
                  placeholder="Select Stage"
                  options={statusOptions}
                />
              </FilterDropdown>
            )}
            render={(value) => {
              return <QuoteStatusTag status={value} />;
            }}
          /> */}
          {/* <Table.Column<Quote>
            dataIndex={["salesOwner", "id"]}
            title="Participants"
            filterDropdown={(props) => {
              return (
                <FilterDropdown {...props}>
                  <Select
                    style={{ width: "200px" }}
                    placeholder="Select Sales Owner"
                    {...selectPropsUsers}
                  />
                </FilterDropdown>
              );
            }}
            render={(_, record) => {
              return (
                <Participants
                  userOne={record.salesOwner}
                  userTwo={record.contact}
                />
              );
            }}
          /> */}
          {/* <Table.Column<Quote>
            dataIndex={"$createdAt"}
            title="Created at"
            sorter
            defaultSortOrder={getDefaultSortOrder("$createdAt", sorters)}
            render={(value) => {
              return <Text>{dayjs(value).fromNow()}</Text>;
            }}
          /> */}
          <Table.Column<Quote1>
            fixed="right"
            title="Actions"
            dataIndex="actions"
            render={(_, record) => {
              return (
                <Space>
                  <ShowButton
                    hideText
                    size="small"
                    recordItemId={record.id}
                    style={{
                      backgroundColor: "transparent",
                    }}
                  />
                  <EditButton
                    hideText
                    size="small"
                    recordItemId={record.id}
                    style={{
                      backgroundColor: "transparent",
                    }}
                  />
                  <DeleteButton
                    hideText
                    size="small"
                    recordItemId={record.id}
                    style={{
                      backgroundColor: "transparent",
                    }}
                  />
                </Space>
              );
            }}
          />
        </Table>
      </List>
      {children}
    </div>
  );
};
