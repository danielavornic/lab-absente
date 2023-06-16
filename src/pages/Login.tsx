import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Select,
  Image,
} from "@chakra-ui/react";

export const Login = () => {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Stack spacing={4} mx={"auto"} maxW={"lg"} py={12} px={6} minW={"xl"}>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <Image src="https://utm.md/track/img/logo.png"></Image>
            <Heading fontSize={"l"} alignSelf={"center"} color="brand.700">
              Sistem Informaţional de Management Universitar
            </Heading>
            <Select placeholder="Alegeţi facultatea" size="md" color="gray.600" minWidth="100%">
              <option value="1">Facultatea Electronică şi Telecomunicaţii</option>
              <option value="2">Facultatea Energetică şi Inginerie Electrică</option>
              <option value="3">Facultatea Calculatoare, Informatică şi Microelectronică</option>
              <option value="4">Facultatea Tehnologia Alimentelor</option>
              <option value="5">Facultatea Inginerie Mecanică, Industrială şi Transporturi</option>
              <option value="6">Facultatea Urbanism şi Arhitectură</option>
              <option value="7">Facultatea Construcţii, Geodezie şi Cadastru</option>
              <option value="8">Facultatea Inginerie Economică şi Business</option>
              <option value="9">Facultatea de Design</option>
              <option value="10">Facultatea Ştiinţe Agricole, Silvice şi ale Mediului</option>
              <option value="11">Facultatea Medicină Veterinară</option>
            </Select>
            <FormControl id="email">
              <FormLabel></FormLabel>
              <Input
                type="email"
                placeholder="Email corporativ"
                _placeholder={{ color: "gray.600" }}
                color="gray.600"
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={"brand.600"}
                color={"white"}
                _hover={{
                  bg: "brand.700",
                }}
              >
                Autentifică-te
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
