import { Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function ListNFT() {
  return (
    <>
      {Array(5)
        .fill("1")
        .map((item, index) => {
          // Removed curly braces around item and index
          return (
            <Flex flexDirection={"row"} key={index}>
              <Text>{index}</Text>
            </Flex>
          );
        })}
    </>
  );
}
