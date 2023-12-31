import {
  BoxProps,
  useColorModeValue,
  Flex,
  CloseButton,
  Box,
  Icon,
  Text,
  FlexProps,
  Image,
  HStack,
  VStack,
  Stack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import {
  FiTrendingUp,
  FiLogOut,
  FiHome,
  FiFileText,
  FiDollarSign,
  FiBook,
  FiUser,
  FiFile,
  FiLayers,
  FiCalendar,
  FiSlash,
  FiUsers,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import utmBadge from "assets/utm_icon.jpg";
import { useAuth } from "hooks";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const studentLinkItems: Array<LinkItemProps> = [
  { name: "Noutăți", icon: FiHome, href: "/noutati" },
  { name: "Informație Student", icon: FiUser, href: "/informatie-student" },
  { name: "Situație academică", icon: FiBook, href: "/situatie-academica" },
  { name: "Recuperarea absențelor", icon: FiSlash, href: "/absente" },
  { name: "Contract de studii", icon: FiDollarSign, href: "/contract-de-studii" },
  { name: "Acord de studii", icon: FiFileText, href: "/acord-de-studii" },
  { name: "Orar de studii", icon: FiCalendar, href: "/orar-de-studii" },
  { name: "Ordine și extrase", icon: FiLayers, href: "/ordine-si-extrase" },
  { name: "Fișa de lichidare", icon: FiFile, href: "/fisa-de-lichidare" },
  { name: "Finalizare studii", icon: FiTrendingUp, href: "/finalizare-studii" },
];

const profLinkItems: Array<LinkItemProps> = [
  { name: "Noutăți", icon: FiHome, href: "/noutati" },
  { name: "Materii", icon: FiLayers, href: "/materii" },
  { name: "Grupe", icon: FiUsers, href: "/grupe" },
];

const adminLinkItems: Array<LinkItemProps> = [
  { name: "Noutăți", icon: FiHome, href: "/noutati" },
  { name: "Materii", icon: FiLayers, href: "/materii" },
  { name: "Grupe", icon: FiUsers, href: "/grupe" },
  { name: "Cadre Didactice", icon: FiUsers, href: "/ppl" },
];

export const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
  const { pathname } = useLocation();
  const { user } = useAuth();

  // const linkItems = studentLinkItems;
  const linkItems = profLinkItems;

  return (
    <Flex
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 80 }}
      pos="fixed"
      h="full"
      justifyContent="space-between"
      flexDir="column"
      height="full"
      pb="4"
      {...rest}
    >
      <Box>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Flex
            h="20"
            alignItems="center"
            px="8"
            borderBottomWidth="1px"
            borderBottomColor="gray.200"
          >
            <Image src={utmBadge} alt="logo" w="68px" mr="4" />
            <Text fontSize="3xl" fontWeight="bold" mt="-8px" color="brand.500">
              SIMU
            </Text>
            <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
          </Flex>
        </Link>
        <Stack spacing={2} py={2} w="full">
          {linkItems.map((link) => {
            const isActive = pathname.split("/")[1] === link.href.slice(1, link.href.length);
            return (
              <NavItem
                key={link.name}
                icon={link.icon}
                to={link.href}
                bg={isActive ? "brand.500" : undefined}
                color={isActive ? "white" : undefined}
              >
                {link.name}
              </NavItem>
            );
          })}
        </Stack>
      </Box>
      <NavItem icon={FiLogOut} alignSelf="flex-start" to="/login">
        Ieșire
      </NavItem>
    </Flex>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  to: string;
}
const NavItem = ({ icon, children, to, ...rest }: NavItemProps) => {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "brand.500",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
