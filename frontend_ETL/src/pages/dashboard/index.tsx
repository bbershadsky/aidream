import { Row, Col } from "antd";

import { MetricCard } from "../../components/metricCard";
import { PriceChartCard } from "../../components/priceChartCard";
// import { DealChart } from "../../components/dealChart";

export const Dashboard = () => {
  return (
    <Row gutter={[32, 32]}>
      <Col xs={24} sm={24} xl={8}>
        <MetricCard variant="66a031420005f3d71bd7" />
      </Col>
      <Col xs={24} sm={24} xl={8}>
        <MetricCard variant="66a0301600057f98bdc8" />
      </Col>
      <Col xs={24} sm={24} xl={8}>
        <MetricCard variant="669e459d001d91a860c3" />
      </Col>
      <Col span={24}>
        <h1>Favourite Foods</h1>
        <PriceChartCard/>
        {/* <DealChart /> */}
      </Col>
    </Row>
  );
};
