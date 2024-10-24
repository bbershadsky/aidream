import * as React from "react";
import { Card, Typography, Row, Col, Button } from "antd";
const { Title, Text } = Typography;
interface Props {
  address: string;
  paymentType: string;
  notes?: string;
}

const PaymentCard: React.FC<Props> = ({ address, paymentType, notes }) => {
  return (
    <Card style={{ width: "100%" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={3}>{address}</Title>
        </Col>
        {notes && (
          <Col span={24}>
            <Text type="secondary">Notes: {notes}</Text>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default PaymentCard;
