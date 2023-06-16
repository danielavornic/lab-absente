import { ReactNode } from "react";
import {
  IconButton,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  FlexProps,
  Menu,
  MenuButton,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { Sidebar } from "components";

export const Layout = ({ children, title }: { title: string; children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Sidebar onClose={() => onClose} display={{ base: "none", md: "flex" }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} title={title} />
      <Box ml={{ base: 0, md: 80 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, title, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 80 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }} justifyContent="space-between" w="full">
        <Text fontSize="2xl" fontWeight="bold">
          {title}
        </Text>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
              <HStack>
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-end"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Gusev Roman</Text>
                  <Text fontSize="xs" color="gray.600">
                    Student
                  </Text>
                </VStack>
              </HStack>
            </MenuButton>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
