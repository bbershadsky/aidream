import React from "react";
import { useForm } from "@refinedev/antd";
import { Form, Input, Button, Row, Col } from "antd";
import dataProvider, { GraphQLClient } from "@refinedev/graphql";

// const client = new GraphQLClient(
//   (URL = import.meta.env.VITE_NEXT_PUBLIC_APPWRITE_ENDPOINT)
// );
//   .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite Endpoint
//   .setProject("<PROJECT_ID>"); // Your project ID

// const graphql = new graphql(client);

const createAccountMutation = `
  mutation CreateAccount($email: String!, $password: String!, $name: String) {
    accountCreate(email: $email, password: $password, name: $name, userId: "unique()") {
      _id
    }
  }
`;

export const Register = () => {
  const { form, formProps, saveButtonProps } = useForm();

  //   const onFinish = async (values) => {
  //     try {
  //       const response = await graphql.mutation({
  //         query: createAccountMutation,
  //         variables: {
  //           email: values.email,
  //           password: values.password,
  //           name: values.name,
  //         },
  //       });

  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <Row gutter={[32, 32]}>
      <Col xs={24} sm={24} xl={8}>
        {/* <Form {...formProps} form={form} layout="vertical" onFinish={onFinish}> */}
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, min: 6 }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" {...saveButtonProps}>
            Register
          </Button>
        </Form.Item>
        {/* </Form> */}
      </Col>
    </Row>
  );
};
