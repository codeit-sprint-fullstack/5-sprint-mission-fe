import { Button } from "@/components/ui/button";
import {
  Box,
  HStack,
  Image,
  Link,
  LinkProps,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";

export const Header: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [smallScreen] = useMediaQuery(["(max-width:768px)"], {
    ssr: true,
    fallback: [false],
  });
  return (
    <HStack
      w={"full"}
      h={68}
      px={smallScreen ? 6 : 200}
      justifyContent={"space-between"}
      whiteSpace={"nowrap"}
    >
      <HStack gap={6}>
        <Link w={153} h={51} href="/">
          <Image src="logo_icon.png" alt="logo_icon" />
        </Link>
        <Box fontWeight={700} fontSize={"18px"} textAlign={"center"}>
          <Link px={15} py={21}>
            자유게시판
          </Link>
          <Link px={15} py={21}>
            중고마켓
          </Link>
        </Box>
      </HStack>

      {isLogin ? (
        <Button
          onClick={() => {
            setIsLogin(!isLogin);
          }}
          {...LinkBtnStyle}
        >
          로그인
        </Button>
      ) : (
        <Image
          onClick={() => setIsLogin(!isLogin)}
          src="ic_login.png"
          alt="login"
        />
      )}
    </HStack>
  );
};

const LinkBtnStyle: LinkProps = {
  fontWeight: 600,
  textAlign: "center",
  px: 23,
  py: 3,
  bgColor: "#3692FF",
  borderRadius: 8,
  color: "white",
  // href: "/login",
};
