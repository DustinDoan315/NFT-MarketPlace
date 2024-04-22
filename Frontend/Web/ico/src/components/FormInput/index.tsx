"use client";

import React, { useState } from "react";
import { Alert, Button, Form, Input, Spin } from "antd";
import { nftContract } from "@/utils/Contract";

type EthereumAddress = `0x${string}`;
type FormValueType = {
  address: EthereumAddress;
  heroType: string;
};
const myAddress: EthereumAddress = "0xbB66BcBcE152273DF812bd988405168ADB889285";

const isFormValues = (values: any): values is FormValueType => {
  return (
    typeof values.address === "string" && typeof values.heroType === "string"
  );
};

const FormInput: React.FC = () => {
  const [alertType, setAlertType] = useState<boolean>(false);
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      if (isFormValues(values)) {
        const tx = await nftContract.methods
          .mint(values.address, values.heroType)
          .send({
            from: myAddress,
            gasPrice: "300000000",
          });
        setIsLoading(false);

        setAlertType(true);
        setAlertMessage(
          `Transaction successful! Transaction hash: ${tx.transactionHash}`
        );
      } else {
        setIsLoading(false);

        setAlertType(false);
        setAlertMessage("Invalid form values");
      }
    } catch (error: any) {
      setIsLoading(false);

      setAlertType(false);
      setAlertMessage(`Error: ${error.message}`);
    } finally {
      setIsShowAlert(true);
      setTimeout(() => {
        setIsShowAlert(false);
      }, 5000);
    }
  };

  return (
    <Form
      onFinish={onFinish}
      name="wrap"
      labelCol={{ flex: "110px" }}
      labelAlign="left"
      labelWrap
      wrapperCol={{ flex: 1 }}
      colon={false}
      style={{ maxWidth: 600 }}>
      {isShowAlert && (
        <Alert message={alertMessage} type={alertType ? "success" : "error"} />
      )}
      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            required: true,
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item label="NFT type" name="heroType" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label=" ">
        {!isLoading ? (
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        ) : (
          <Spin size="large" />
        )}
      </Form.Item>
    </Form>
  );
};

export default FormInput;
