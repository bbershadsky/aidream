import { useState } from "react";
import axios from "axios";
import { Row, Col, Input, Button, Typography, Spin } from "antd";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

export const AiGen = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const handleGenerate = async () => {
    setLoading(true); // Start the spinner
    try {
      const res = await axios.post("http://gersu.com:11434/api/generate", {
        model: "qwen2:0.5b",
        prompt,
        stream: false,
      });
      setResponse(res.data.response); // Assuming the response is in res.data
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("An error occurred while generating the response.");
    }
    setLoading(false); // Stop the spinner
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
          disabled={loading} // Disable the button when loading
        >
          {loading ? <Spin /> : "Generate"}
        </Button>
        <div style={{ marginTop: "24px" }}>
          <Title level={3}>Response:</Title>
          <Paragraph style={{ whiteSpace: "pre-wrap" }}>{response}</Paragraph>
        </div>
      </Col>
    </Row>
  );
};
