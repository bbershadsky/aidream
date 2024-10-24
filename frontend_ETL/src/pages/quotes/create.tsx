import React from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { resources } from "../../utility";
import MDEditor from "@uiw/react-md-editor";
import { Form, AutoComplete, Input, Select } from "antd";
import { categories } from "../../constants/forms";
export const QuotesCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  const { selectProps: companySelectProps } = useSelect({
    resource: resources.companies,
    optionLabel: "name",

    meta: {
      fields: ["$id", "name"],
    },
  });

  const { selectProps: salesOwnerSelectProps } = useSelect({
    resource: resources.users,
    meta: {
      fields: ["name", "$id"],
    },
    optionLabel: "name",
  });

  const countries = [
    { label: "Canada", value: "Canada" },
    { label: "United States", value: "United States" },
    { label: "Mexico", value: "Mexico" },
    { label: "United Kingdom", value: "United Kingdom" },
    { label: "France", value: "France" },
    { label: "Germany", value: "Germany" },
    { label: "Italy", value: "Italy" },
    { label: "Spain", value: "Spain" },
    { label: "Australia", value: "Australia" },
    { label: "Japan", value: "Japan" },
    { label: "China", value: "China" },
    { label: "India", value: "India" },
    { label: "Brazil", value: "Brazil" },
    { label: "Russia", value: "Russia" },
    { label: "South Africa", value: "South Africa" },
  ];

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name={["name"]} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Company"
          name={["companyId"]}
          rules={[{ required: true }]}
        >
          <Select {...companySelectProps} />
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select options={categories} placeholder="Select" />
        </Form.Item>

        <Form.Item label="Country" name="country">
          <AutoComplete
            options={countries}
            placeholder="Select"
            filterOption={(inputValue, option) =>
              option
                ? option.value.toLowerCase().includes(inputValue.toLowerCase())
                : false
            }
          />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <MDEditor preview="edit" data-color-mode="light" height={250} />
        </Form.Item>

        {/* <Form.Item
          label="Sales Owner"
          name="salesOwnerId"
          rules={[{ required: true }]}
        >
          <Select {...salesOwnerSelectProps} />
        </Form.Item> */}

        <Form.Item label="Status" name={["status"]}>
          <Select
            options={[
              { label: "NEW", value: "NEW" },
              { label: "PLANNING", value: "PLANNING" },
              { label: "CAMPAIGNING", value: "CAMPAIGNING" },
              { label: "FUNDS RAISED", value: "FUNDS RAISED" },
              { label: "STARTED BUILDING", value: "STARTED BUILDING" },
              { label: "COMPLETE", value: "COMPLETE" },
            ]}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
