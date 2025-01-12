import { HStack, Image, Link, StackProps, Text } from "@chakra-ui/react";

const images: { image: string; link: string }[] = [
  { image: "ic_facebook.png", link: "https://www.facebook.com/codeit.kr/" },
  { image: "ic_twitter.png", link: "https://x.com/codeitkr" },
  {
    image: "ic_youtube.png",
    link: "https://www.youtube.com/channel/UCCM79CPm2WbBYTRaiNEExbg",
  },
  { image: "ic_instagram.png", link: "https://www.instagram.com/codeit_kr/" },
];
export const Footer: React.FC = () => (
  <HStack {...FooterStyled}>
    <Text>©codeit - 2024</Text>
    <HStack>
      <Link>Privacy Policy</Link>
      <Link>FQA</Link>
    </HStack>
    <HStack gap={3}>
      {images.map((row, index) => {
        return (
          <Link key={index} target="_blank" href={row.link}>
            <Image src={row.image} alt={row.link} />
          </Link>
        );
      })}
    </HStack>
  </HStack>
);

const FooterStyled: StackProps = {
  w: "full",
  h: "full",
  bg: "#111827",
  justifyContent: "space-between",
  color: "#9CA3AF",
  fontWeight: 400,
  textAlign: "center",
  px: 200,
  py: 8,
  whiteSpace: "nowrap",
};
