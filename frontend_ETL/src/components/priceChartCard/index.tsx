import React from "react";
import { Card, Skeleton, Tooltip, Image } from "antd";
import { useList } from "@refinedev/core";
import { Area, AreaConfig } from "@ant-design/plots";

export const PriceChartCard = () => {
  const { data, isLoading, isError, error } = useList({
    resource: import.meta.env.VITE_APPWRITE_PRICE_COLLECTION_ID,
    meta: { fields: ["product_id", "price", "$createdAt", "name", "productImageUrl"] },
  });

  if (isError) {
    console.error("Error fetching price data", error);
    return null;
  }

  // Mapping the data to use the $createdAt field, price, and other relevant fields
  const chartData =
    data?.data?.map((item: any) => ({
      timestamp: new Date(item.$createdAt).toLocaleString(),  // Convert $createdAt to readable format
      price: item.price,
      name: item.name,
      productImageUrl: item.productImageUrl,
    })) || [];

  // Get the first available name and image to use in the chart's legend
  const firstProduct = chartData.find((item) => item.name && item.productImageUrl);

  // Chart configuration
  const config: AreaConfig = {
    data: chartData,
    xField: "timestamp",
    yField: "price",
    xAxis: {
      label: { formatter: (text) => new Date(text).toLocaleDateString() }, // Format the x-axis with date
    },
    smooth: true,
    areaStyle: { fill: "l(270) 0:#fff 0.5:#69c0ff 1:#40a9ff" }, // Gradient style
    point: {
      size: 5, // Display dots at data points
      shape: "circle",
    },
    tooltip: {
      showMarkers: true, // Enable markers on hover
      customContent: (title, items) => {
        const currentItem = items?.[0]?.data || {};
        return (
          <div style={{ padding: "10px" }}>
            <p><strong>Date:</strong> {title}</p>
            <p><strong>Price:</strong> ${currentItem.price}</p>
            {currentItem.name && (
              <p><strong>Product:</strong> {currentItem.name}</p>
            )}
            {currentItem.productImageUrl && (
              <Image
                width={50}
                src={currentItem.productImageUrl}
                alt={currentItem.name || "Product Image"}
                preview={false}
              />
            )}
          </div>
        );
      },
    },
    legend: {
      position: "top-right",
      custom: true,
      items: [
        {
          name: firstProduct?.name || "Product", // Use product name if available
          value: "price",
          marker: { symbol: "circle", style: { fill: "#69c0ff" } },
        },
      ],
    },
  };

  return (
    <Card title="Product Price History">
      {isLoading ? <Skeleton active /> : <Area {...config} />}
    </Card>
  );
};
