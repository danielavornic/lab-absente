import { Avatar, BoxProps, Button, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Student } from "types";

interface StudentCardProps extends BoxProps {
  student: Student;
  subject?: string;
}

export const StudentCard = ({ student, subject, ...rest }: StudentCardProps) => {
  const { name, surname, grupa, id } = student;

  const iconLetter = name[0].toUpperCase();

  return (
    <HStack spacing={4} boxShadow="sm" justifyContent="space-between" p={4} bg="white" {...rest}>
      <HStack justifyContent="space-between" w="full">
        <HStack spacing={4}>
          <Avatar name={iconLetter} bg="brand.500" size="sm" />
          <HStack spacing={2}>
            <Text fontWeight="medium" w="340px">
              {name} {surname}
            </Text>
            <Text w="220px">{grupa}</Text>

            <Text w="260px" color="gray.500">
              {subject}
            </Text>
          </HStack>
        </HStack>

        <HStack spacing={2}>
          <Link to={`/students/${id}/grades`}>
            <Button colorScheme="brand" variant="ghost" size="sm" fontWeight="normal">
              Vezi notele
            </Button>
          </Link>
          <Link to={`/students/${id}/absente`}>
            <Button colorScheme="brand" variant="fill" size="sm" fontWeight="normal">
              Vezi absențele
            </Button>
          </Link>
        </HStack>
      </HStack>
    </HStack>
  );
};
