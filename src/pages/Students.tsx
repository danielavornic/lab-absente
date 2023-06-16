import { HStack, Input } from "@chakra-ui/react";
import Select from "react-select";
import { Layout } from "components";
import { useSearchParams } from "react-router-dom";

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

export const Students = () => {
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
    <Layout title="Studenți">
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
    </Layout>
  );
};
