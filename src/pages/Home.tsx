import { Container, Text } from "@chakra-ui/react";

export const Home = () => {
  return (
    <Container maxW="container.xl">
      <Text
        fontSize="6xl"
        fontWeight="extrabold"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
      >
        Hello World
      </Text>
    </Container>
  );
};
