import Image from "next/image";
import styles from "./page.module.css";
import InvestView from "@/views/InvestView";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box pt={5} width="100vw" height="100vh" bg={"pink"}>
      <InvestView />
    </Box>
  );
}
