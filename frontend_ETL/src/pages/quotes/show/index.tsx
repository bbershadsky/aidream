import { lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";

import { useModal, useOne } from "@refinedev/core";

import { EditOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

// import { CustomAvatar, FullScreenLoading, Text } from "@/components";
// import type { Quote } from "@/graphql/schema.types";
import { CustomAvatar, FullScreenLoading, Text } from "../../../components";
// import type { Quote } from "../../../graphql/schema.types";

import {
  ProductsServices,
  QuotesFormModal,
  ShowDescription,
  StatusIndicator,
} from "../components";
import { QUOTES_GET_QUOTE_QUERY } from "../queries";
import styles from "./index.module.css";
import { resources } from "../../../utility";

const PdfExport = lazy(() => import("../components/pdf-export"));

interface Proposal {
  $id: string;
  username: string;
  email: string;
  title: string;
  status: string;
  description: string;
  language: string;
  companyId: string;
}

export const QuotesShowPage = () => {
  const { visible, show, close } = useModal();

  const params = useParams<{ id: string }>();

  const { data, isLoading } = useOne<Proposal>({
    resource: resources.projects,
    id: params.id,
    liveMode: "off",
    // meta: {
    //   gqlQuery: QUOTES_GET_QUOTE_QUERY,
    // },
  });

  if (isLoading || !data?.data) {
    return <FullScreenLoading />;
  }

  const { title, status, companyId, $id } = data?.data ?? {};

  return (
    <>
      <div className={styles.container}>
        <Link to="/proposals">
          {/* @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66 */}
          <Button icon={<LeftOutlined />}>Quotes</Button>
        </Link>
        <div className={styles.divider} />
        <div className={styles.title}>
          <Text
            size="xl"
            style={{
              fontWeight: 500,
            }}
          >
            {title}
          </Text>
          <Space>
            <Suspense>
              <PdfExport />
            </Suspense>
            {/* @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66 */}
            <Button icon={<EditOutlined />} onClick={() => show()}>
              Edit
            </Button>
          </Space>
        </div>
        {/* <StatusIndicator
          style={{
            marginTop: "32px",
          }}
          id={$id}
          status={status}
        /> */}
        <div className={styles.pdf}>
          {/*   <div className={styles.pdfQuoteInfo}>
            <CustomAvatar
              name={company?.name}
              src={company?.avatarUrl}
              shape="square"
              style={{
                width: "64px",
                height: "64px",
              }}
            />
            <div className={styles.companyInfo}>
              <div className={styles.company}>
                <Text strong>{company.name}</Text>
                <Text>{company.country}</Text>
                <Text>{company.website}</Text>
              </div>
            </div>
            <div className={styles.userInfo}>
              <div className={styles.user}>
                <Text strong>Prepared by:</Text>
                <Text>{salesOwner.name}</Text>
              </div>
              <div className={styles.user}>
                <Text strong>Prepared for:</Text>
                <Text>{contact.name}</Text>
              </div>
            </div>*/}
          {/* </div>  */}
          {/* <div className={styles.divider} /> */}
          {/* <ProductsServices /> */}
          <div className={styles.divider} />
          <ShowDescription />
        </div>
      </div>
      {visible && (
        <QuotesFormModal
          action={"edit"}
          redirect={false}
          onCancel={() => close()}
          onMutationSuccess={() => close()}
        />
      )}
    </>
  );
};
