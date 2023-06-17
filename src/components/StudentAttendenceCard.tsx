import {
  Avatar,
  HStack,
  Text,
  useDisclosure,
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  Button,
  ModalFooter,
  ModalCloseButton,
  BoxProps,
  Badge,
  Box,
} from "@chakra-ui/react";
import { Absenta, AbsentaStatus } from "types";

interface StudentAttendenceCardProps extends BoxProps {
  absenta: Absenta;
  isChanged: boolean;
}

export const StudentAttendenceCard = ({
  absenta,
  isChanged,
  ...rest
}: StudentAttendenceCardProps) => {
  const { numeStudent, numeProf: prof, subject, status, datesAbsenta, datesRecuperare } = absenta;

  const year = datesAbsenta[0].date.slice(0, 4);
  const count = datesAbsenta.length;

  const { isOpen, onOpen, onClose } = useDisclosure();
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
      p={4}
      bg="white"
      cursor="pointer"
      _hover={{
        backgroundColor: "gray.50",
      }}
      onClick={onOpen}
      {...rest}
    >
      <HStack justifyContent="space-between" w="full">
        <HStack spacing={4}>
          <Avatar name={iconLetter} bg={iconColor} size="sm" />
          <HStack spacing={2}>
            <Text fontWeight="medium" w="340px">
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

        <HStack spacing={2}>
          <Text w="120px" color="gray.500">
            {count} absențe
          </Text>
          <Box w="80px">
            <Badge colorScheme={statusColorScheme} w="fit-content" ml="auto" display="block">
              {status}
            </Badge>
          </Box>
        </HStack>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Absență</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Obiect: {subject}
            <br />
            Profesor: {prof}
            <br />
            Nr. absenţe: {count}
            <br />
            Statut: {status}
            <br />
            Anul: {year}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" onClick={onClose} size="sm">
              Închide
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
};
