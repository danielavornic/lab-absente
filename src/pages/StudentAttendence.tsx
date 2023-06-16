import { HStack, VStack } from "@chakra-ui/react";
import { Layout, StudentAttendenceCard } from "components";
import { useSearchParams } from "react-router-dom";
import { Absenta, AbsentaStatus } from "types";

import Select from "react-select";

const attendences: Absenta[] = [
  {
    id: 1,
    numeStudent: "John Doe",
    numeProf: "Professor Smith",
    subject: "Math",
    status: AbsentaStatus.NEACHITAT,
    datesAbsenta: [
      { date: "2023-06-01", time: "09:00" },
      { date: "2023-06-02", time: "10:30" },
    ],
    datesRecuperare: [
      { date: "2023-06-03", time: "14:00" },
      { date: "2023-06-04", time: "16:30" },
    ],
  },
  {
    id: 2,
    numeStudent: "John Doe",
    numeProf: "Professor Johnson",
    subject: "English",
    status: AbsentaStatus.ACHITAT,
    datesAbsenta: [
      { date: "2023-06-05", time: "11:00" },
      { date: "2023-06-06", time: "13:30" },
    ],
  },
  {
    id: 3,
    numeStudent: "John Doe",
    numeProf: "Professor Brown",
    subject: "Science",
    status: AbsentaStatus.IN_PROGRESS,
    datesAbsenta: [
      { date: "2023-06-07", time: "10:00" },
      { date: "2023-06-08", time: "12:30" },
    ],
  },
  {
    id: 4,
    numeStudent: "John Doe",
    numeProf: "Professor Davis",
    subject: "History",
    status: AbsentaStatus.RECUPERAT,
    datesAbsenta: [
      { date: "2023-06-09", time: "09:30" },
      { date: "2023-06-10", time: "11:45" },
    ],
    datesRecuperare: [
      { date: "2023-06-11", time: "15:00" },
      { date: "2023-06-12", time: "17:30" },
    ],
  },
  {
    id: 5,
    numeStudent: "John Doe",
    numeProf: "Professor Wilson",
    subject: "Geography",
    status: AbsentaStatus.NEACHITAT,
    datesAbsenta: [
      { date: "2023-06-13", time: "08:30" },
      { date: "2023-06-14", time: "10:45" },
    ],
  },
];

const statuses = Object.values(AbsentaStatus).map((status) => ({
  label: status,
  value: status,
  color: "blue",
}));

const subjects = [
  { label: "Comunicare şi scriere academică", value: "Comunicare şi scriere academică" },
  { label: "Metode Numerice", value: "Metode Numerice" },
  {
    label: "Proiectare conceptuală a unei aplicaţii IT",
    value: "Proiectare conceptuală a unei aplicaţii IT",
  },
];

const years = [
  { label: "2021", value: "2021" },
  { label: "2022", value: "2022" },
  { label: "2023", value: "2023" },
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

export const StudentAttendence = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlStatuses = searchParams.get("status")?.split(",") ?? [];
  const urlSubjects = searchParams.get("subject")?.split(",") ?? [];
  const urlYears = searchParams.get("year")?.split(",") ?? [];
  const sortBy = searchParams.get("sortBy") || "newest";

  const updateSearchParams = (key: string, value: string | number | boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value.toString());
    setSearchParams(params.toString());
  };

  const setStatuses = (statuses: string[]) => {
    updateSearchParams("status", statuses.join(","));
  };

  const setSubjects = (subjects: string[]) => {
    updateSearchParams("subject", subjects.join(","));
  };

  const setYears = (years: string[]) => {
    updateSearchParams("year", years.join(","));
  };

  const setSortBy = (sortBy: string) => {
    updateSearchParams("sortBy", sortBy);
  };

  return (
    <Layout title="Recuperarea absențelor">
      <HStack spacing={4} mb={6} justifyContent="space-between">
        <HStack spacing={4}>
          <Select
            value={{
              label: sortBy === "newest" ? "Cele mai noi" : "Cele mai vechi",
              value: sortBy,
            }}
            onChange={(sortBy) => setSortBy(sortBy?.value)}
            options={[
              { label: "Cele mai noi", value: "newest" },
              { label: "Cele mai vechi", value: "oldest" },
            ]}
            placeholder="Sortează după"
            styles={{
              ...selectStyles,
              control: (base: any) => ({
                ...base,
                width: "180px",
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
                minWidth: "300px",
                maxWidth: "800px",
              }),
            }}
          />
        </HStack>

        <HStack>
          <Select
            value={years.filter((year) => urlYears.includes(year.value))}
            onChange={(years) => setYears(years.map((year) => year.value))}
            options={years}
            placeholder="An"
            isMulti
            styles={{
              ...selectStyles,
              control: (base: any) => ({
                ...base,
                minWidth: "180px",
                maxWidth: "300px",
              }),
            }}
          />

          <Select
            value={statuses.filter((status) => urlStatuses.includes(status.value))}
            onChange={(statuses) => setStatuses(statuses.map((status) => status && status?.value))}
            options={statuses}
            placeholder="Status"
            isMulti
            styles={{
              ...selectStyles,
              control: (base: any) => ({
                ...base,
                width: "200px",
              }),
            }}
          />
        </HStack>
      </HStack>

      <VStack spacing={0} align="stretch">
        {attendences.map((attendence, index) => (
          <StudentAttendenceCard
            key={attendence.id}
            absenta={attendence}
            borderBottom={index !== attendences.length - 1 ? "1px solid #E2E8F0" : "none"}
            roundedTop={index === 0 ? "md" : "none"}
            roundedBottom={index === attendences.length - 1 ? "md" : "none"}
          />
        ))}
      </VStack>
    </Layout>
  );
};
