import { Box, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ReactNode } from "react";
type LayoutProps = { children: ReactNode };
export const Layout: NextPage<LayoutProps> = ({ children }) => (
  <VStack w={"full"} h={"full"}>
    <Header />
    <Box maxW={1200} w={"full"} h={"full"} justifyItems={"center"} spaceY={10}>
      {children}
    </Box>
    <Footer />
  </VStack>
);
