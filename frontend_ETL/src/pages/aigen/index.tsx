import { useState } from "react";
import axios from "axios";
import { Row, Col, Input, Button, Typography, Spin } from "antd";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;
import styles from "./index.module.css";
export const AiGen = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResponse(""); // Reset the response before starting

    try {
      const res = await fetch("http://gersu.com:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen2:0.5b",
          prompt,
          stream: true,
        }),
      });

      if (!res.body) {
        throw new Error("No response body");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;

      while (!done) {
        const { value, done: isDone } = await reader.read();
        done = isDone;
        const chunk = decoder.decode(value, { stream: true });

        // Split the stream data by newline and parse each line as JSON
        chunk.split("\n").forEach((line) => {
          if (line.trim()) {
            // Ignore empty lines
            try {
              const data = JSON.parse(line);
              if (data.response) {
                setResponse((prev) => prev + data.response);
              }
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          }
        });
      }
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("An error occurred while generating the response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <Title level={1}>A.I Project Generation</Title>
        <Paragraph>Get your project idea off the ground quicker</Paragraph>
        <TextArea
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
        />
        <Button
          type="primary"
          onClick={handleGenerate}
          style={{ marginTop: "16px" }}
          disabled={loading}
        >
          {loading ? <Spin /> : "Generate"}
        </Button>
        <div style={{ marginTop: "24px" }}>
          <div className={styles.divider} />
          <Paragraph style={{ whiteSpace: "pre-wrap" }}>{response}</Paragraph>
        </div>
      </Col>
    </Row>
  );
};
