"use client";

import React, { useState } from "react";
import { Alert, Button, Form, Input, Modal, Spin } from "antd";
import { nftContract } from "@/utils/Contract";
import { useAppSelector } from "@/redux/hooks";
import { CHAIN_ID } from "@/utils/common";
import { mintNft } from "@/utils/helper";

declare var window: any;

type EthereumAddress = `0x${string}`;
type FormValueType = {
  address: EthereumAddress;
};

const isFormValues = (values: any): values is FormValueType => {
  return typeof values.address === "string";
};

const FormInput: React.FC = () => {
  const { wallet } = useAppSelector((state: any) => state.account);

  const [alertType, setAlertType] = useState<boolean>(false);
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: "0xaa36a7",
          },
        ],
      });
      console.log("Switched to Sepolia chain successfully");
    } catch (error) {
      console.error("Error switching to Sepolia chain:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const checkChain = (value: any) => {
    // getOwnedNFTs();
    if (window.ethereum && window.ethereum.networkVersion == CHAIN_ID.SEPOLIA) {
      onFinish(value);
    } else {
      showModal();
    }
  };

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      if (isFormValues(values)) {
        const tx = await mintNft(values.address, wallet.address);
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

  async function getOwnedNFTs(ownerAddress?: string) {
    let tokenId = 1;
    const ownedTokenIDs = [];

    try {
      while (tokenId < 10) {
        const tokenOwner = await nftContract.methods.ownerOf(21).call();
        if (tokenOwner === ownerAddress) {
          ownedTokenIDs.push(tokenId);
        }
        tokenId++;
      }
    } catch (error: any) {
      if (error.code !== "CALL_EXCEPTION") {
        throw error;
      }
    }

    return ownedTokenIDs;
  }

  return (
    <Form
      onFinish={checkChain}
      name="wrap"
      labelCol={{ flex: "110px" }}
      labelAlign="left"
      labelWrap
      wrapperCol={{ flex: 1 }}
      colon={false}
      style={{ maxWidth: 600 }}>
      {isShowAlert && (
        <div
          style={{
            padding: "0px  0px 10px 0px",
          }}>
          <Alert
            message={alertMessage}
            type={alertType ? "success" : "error"}
          />
        </div>
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

      <Form.Item label=" ">
        {!isLoading ? (
          <Button type="primary" htmlType="submit">
            Mint
          </Button>
        ) : (
          <Spin size="large" />
        )}
      </Form.Item>

      <Modal
        title="Network chain is not matching"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p style={{ color: "red", fontSize: "14px" }}>
          Please switch to the Sepolia chain
        </p>
      </Modal>
    </Form>
  );
};

export default FormInput;
