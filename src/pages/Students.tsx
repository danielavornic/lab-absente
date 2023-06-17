import {
  Box,
  HStack,
  Input,
  List,
  ListIcon,
  ListItem,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import Select from "react-select";
import { Layout, StudentCard } from "components";
import { useSearchParams } from "react-router-dom";
import { Role, Student } from "types";

import { MdCheckCircle } from "react-icons/md";

const subjects = [
  { label: "Comunicare şi scriere academică", value: "Comunicare şi scriere academică" },
  { label: "Metode Numerice", value: "Metode Numerice" },
  {
    label: "Proiectare conceptuală a unei aplicaţii IT",
    value: "Proiectare conceptuală a unei aplicaţii IT",
  },
];

const groups = [
  { label: "FAF-221", value: "FAF-221" },
  { label: "FAF-222", value: "FAF-222" },
  { label: "FAF-223", value: "FAF-223" },
  { label: "TI-171", value: "TI-171" },
  { label: "TI-172", value: "TI-172" },
  { label: "TI-173", value: "TI-173" },
];

const studentArray: Student[] = [
  {
    id: 1,
    name: "John",
    surname: "Doe",
    role: Role.STUDENT,
    grupa: "FAF-222",
  },
  {
    id: 2,
    name: "Jane",
    surname: "Smith",
    role: Role.STUDENT,
    grupa: "FAF-221",
  },
  {
    id: 3,
    name: "Michael",
    surname: "Johnson",
    role: Role.STUDENT,
    grupa: "TI-171",
  },
  {
    id: 4,
    name: "Emily",
    surname: "Brown",
    role: Role.STUDENT,
    grupa: "CR-21",
  },
  {
    id: 5,
    name: "David",
    surname: "Wilson",
    role: Role.STUDENT,
    grupa: "FAF-223",
  },
];

const selectStyles = {
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: "#0B5493",
    color: "#fff",
    borderRadius: "4px",
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "#fff",
  }),
  control: (base: any) => ({
    ...base,
    borderColor: "#E2E8F0",
    fontSize: "14px",
  }),
};

export const Students = ({ id }: { id: string }) => {
  const title = "FAF-221";
  const subjects =
    "Comunicare şi scriere academică, Metode Numerice, Proiectare conceptuală a unei aplicaţii IT".split(
      ", ",
    );

  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") || "";
  const urlGroups = searchParams.get("grup")?.split(",") ?? [];
  const urlSubjects = searchParams.get("subject")?.split(",") ?? [];
  const page = parseInt(searchParams.get("page") || "1");

  const updateSearchParams = (key: string, value: string | number | boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value.toString());
    setSearchParams(params.toString());
  };

  const setSearchTerm = (searchTerm: string) => {
    updateSearchParams("search", searchTerm);
  };

  const setGroups = (groups: string[]) => {
    updateSearchParams("grup", groups.join(","));
  };

  const setSubjects = (subjects: string[]) => {
    updateSearchParams("subject", subjects.join(","));
  };

  const setPage = (page: number) => {
    updateSearchParams("page", page);
  };

  return (
    <Layout title={title}>
      <List mb={8}>
        {subjects.map((subject) => (
          <ListItem key={subject} color="gray.700">
            {subject}
          </ListItem>
        ))}
      </List>
      <HStack spacing={4} mb={6} justifyContent="start">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Caută după nume"
          bg="white"
          borderColor="#E2E8F0"
          maxWidth="300px"
        />
        <Select
          value={groups.filter((group) => urlGroups.includes(group.value))}
          onChange={(groups) => setGroups(groups.map((group) => group.value))}
          options={groups}
          placeholder="Grupă"
          isMulti
          styles={{
            ...selectStyles,
            control: (base: any) => ({
              ...base,
              width: "220px",
            }),
          }}
        />
        <Select
          value={subjects.filter((subject) => urlSubjects.includes(subject.value))}
          onChange={(subjects) => setSubjects(subjects.map((subject) => subject.value))}
          options={subjects}
          placeholder="Materie"
          isMulti
          styles={{
            ...selectStyles,
            control: (base: any) => ({
              ...base,
              minWidth: "350px",
              maxWidth: "800px",
            }),
          }}
        />
      </HStack>

      <VStack spacing={0} align="stretch">
        {studentArray.map((student, index) => (
          <StudentCard
            key={student.id}
            student={student}
            subject="Comunicare şi scriere academică"
            borderBottom={index !== studentArray.length - 1 ? "1px solid #E2E8F0" : "none"}
            roundedTop={index === 0 ? "md" : "none"}
            roundedBottom={index === studentArray.length - 1 ? "md" : "none"}
          />
        ))}
      </VStack>
    </Layout>
  );
};
