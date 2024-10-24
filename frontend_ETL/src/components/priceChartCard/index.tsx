import React from "react";
import { Card, Typography, Skeleton } from "antd";
import { useList } from "@refinedev/core";
import { Area, AreaConfig } from "@ant-design/plots";

export const PriceChartCard = () => {
  const { data, isLoading, isError, error } = useList({
    resource: "price_collection_id", // Replace with the actual collection ID
    meta: { fields: ["product_id", "price", "timestamp"] },
  });

  if (isError) {
    console.error("Error fetching price data", error);
    return null;
  }

  const chartData =
    data?.data.map((item) => ({
      timestamp: new Date(item.timestamp * 1000).toLocaleDateString(),
      price: item.price,
    })) || [];

  const config: AreaConfig = {
    data: chartData,
    xField: "timestamp",
    yField: "price",
    xAxis: {
      label: { formatter: (text) => new Date(text).toLocaleDateString() },
    },
    smooth: true,
    areaStyle: { fill: "l(270) 0:#fff 0.5:#69c0ff 1:#40a9ff" },
  };

  return (
    <Card title="Product Price History">
      {isLoading ? <Skeleton active /> : <Area {...config} />}
    </Card>
  );
};
