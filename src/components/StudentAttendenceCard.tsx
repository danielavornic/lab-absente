import { Avatar, HStack, Text, Badge, Box } from "@chakra-ui/react";
import { AbsentaStatus } from "types";

interface StudentAttendenceCardProps {
  subject: string;
  count: number;
  prof: string;
  status: AbsentaStatus;
  year: number;
  isChanged: boolean;
}

export const StudentAttendenceCard = ({
  subject,
  count,
  prof,
  status,
  year,
  isChanged,
}: StudentAttendenceCardProps) => {
  const iconLetter = subject[0].toUpperCase();
  const iconColor = isChanged ? "red.500" : "brand.500";
  const statusColorScheme =
    status === AbsentaStatus.NEACHITAT
      ? "red"
      : status === AbsentaStatus.RECUPERAT
      ? "green"
      : "yellow";

  return (
    <HStack
      spacing={4}
      boxShadow="sm"
      justifyContent="space-between"
      rounded="md"
      p={4}
      bg="white"
      cursor="pointer"
      _hover={{
        backgroundColor: "gray.50",
      }}
    >
      <HStack spacing={4}>
        <Avatar name={iconLetter} bg={iconColor} size="sm" />
        <HStack spacing={2}>
          <Text fontWeight="medium" w="320px">
            {subject}
          </Text>
          <Text w="220px" color="gray.500">
            Prof. {prof}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {year}
          </Text>
        </HStack>
      </HStack>
      <HStack spacing={6}>
        <Text fontSize="sm">{count} absențe</Text>
        <Box w="84px">
          <Badge colorScheme={statusColorScheme} ml="auto" display="block" w="fit-content">
            {status}
          </Badge>
        </Box>
      </HStack>
    </HStack>
  );
};
