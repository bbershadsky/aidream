import type { FC, PropsWithChildren } from "react";

// import { QuotesFormModal } from "./components";
import { Modal, Spin, Form, Input, Select, Button } from "antd";
import { replace } from "lodash";

export const QuotesCreatePage: FC<PropsWithChildren> = ({ children }) => {
  const loading = false;
  return (
    <>
      <Modal
        // {...modalProps}
        // confirmLoading={loading}
        width={560}
        // style={{ display: isHaveOverModal ? "none" : "inherit" }}
        // onCancel={() => {
        //   if (onCancel) {
        //     onCancel();
        //     return;
        //   }
        //   //TODO: modalProps.onCancel expect an event so, I used close. Actually both of them are same.
        //   close();
        //   list("quotes", "replace");
        // }}
      >
        <Spin spinning={loading}>
          <Form
            // {...formProps}
            layout="vertical"
          >
            <Form.Item
              rules={[{ required: true }]}
              name="title"
              label="Quotes title"
            >
              <Input placeholder="Please enter quote title" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true }]}
              name={["salesOwnerId"]}
              // initialValue={formProps?.initialValues?.salesOwner?.id}
              label="Sales owner"
            >
              <Select
                // {...selectPropsSalesOwners}
                placeholder="Please select user"
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true }]}
              name={["companyId"]}
              // initialValue={
              //   searchParams.get("companyId") ??
              //   formProps?.initialValues?.company?.id
              // }
              label="Company"
              extra={
                <Button
                  style={{ paddingLeft: 0 }}
                  type="link"
                  // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                  icon={<PlusCircleOutlined />}
                  // onClick={() => replace(`company-create?to=${pathname}`)}
                >
                  Add new company
                </Button>
              }
            >
              <Select
                // {...selectPropsCompanies}
                placeholder="Please select company"
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true }]}
              name={["contactId"]}
              // initialValue={formProps?.initialValues?.contact?.id}
              label="Quote Contact"
            >
              <Select
                // {...selectPropsContacts}
                placeholder="Please select contact"
              />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
      {/* <QuotesFormModal action="create" /> */}
      {children}
    </>
  );
};
