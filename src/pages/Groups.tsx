import { HStack, VStack, Flex } from "@chakra-ui/react";
import { Layout } from "components";
import { Link } from "react-router-dom";

const grupe = [
  {
    grupa: "FAF-221",
    subject: "Comunicare şi scriere academică, Limba Engleză",
  },
  {
    grupa: "FAF-222",
    subject: "Comunicare şi scriere academică, Limba Engleză",
  },
  {
    grupa: "TI-222",
    subject: "Comunicare şi scriere academică, Limba Engleză",
  },
  {
    grupa: "TI-221",
    subject: "Comunicare şi scriere academică, Limba Engleză",
  },
  {
    grupa: "TI-224",
    subject: "Comunicare şi scriere academică, Limba Engleză",
  },
  {
    grupa: "TI-225",
    subject: "Comunicare şi scriere academică, Limba Engleză",
  },
  {
    grupa: "FAF-223",
    subject: "Comunicare şi scriere academică, Limba Engleză",
  },
  {
    grupa: "FAF-211",
    subject: "Comunicare şi scriere academică, Limba Engleză",
  },
  {
    grupa: "FAF-212",
    subject: "Comunicare şi scriere academică, Limba Engleză",
  },
];

export const Groups = () => {
  const groupedGrupe: { [key: string]: typeof grupe } = {};
  const sortedGrupe = grupe.sort((a, b) => {
    const yearA = a.grupa.split("-")[1].slice(0, 2);
    const yearB = b.grupa.split("-")[1].slice(0, 2);

    if (yearA < yearB) {
      return -1;
    }

    if (yearA > yearB) {
      return 1;
    }

    return 0;
  });

  for (const item of sortedGrupe) {
    const spec = item.grupa.split("-")[0];
    const year = item.grupa.split("-")[1].slice(0, 2);
    const key = `${spec}-${year}`;
    if (!groupedGrupe[key]) {
      groupedGrupe[key] = [];
    }
    groupedGrupe[key].push(item);
  }

  const groupedArray = Object.values(groupedGrupe).reverse();

  return (
    <Layout title="Grupe">
      <VStack align="flex-start" spacing={4}>
        {groupedArray.map((grupa, index) => {
          return (
            <HStack key={index} spacing={4}>
              {grupa.map((item, index) => {
                return (
                  <Link key={index} to={`/grupe/${item.grupa}`}>
                    <Flex
                      p={4}
                      bg="white"
                      borderWidth="1px"
                      rounded="md"
                      _hover={{
                        backgroundColor: "gray.50",
                      }}
                      w="140px"
                      h="100px"
                      fontSize="xl"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {item.grupa}
                    </Flex>
                  </Link>
                );
              })}
            </HStack>
          );
        })}
      </VStack>
    </Layout>
  );
};
