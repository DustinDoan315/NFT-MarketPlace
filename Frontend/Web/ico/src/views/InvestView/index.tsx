"use client";

import React from "react";
import { Col } from "antd";
import { FormInput } from "@/components";

export default function InvestView() {
  return (
    <Col span={24} style={style.container}>
      <Col style={style.col_input} span={18}>
        <FormInput />
      </Col>
    </Col>
  );
}

const style = {
  container: {
    background: "#21E09D",
    padding: "10px 0",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  col_input: {
    background: "white",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    alignSelf: "center",
  },
};
