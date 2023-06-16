import { VStack } from "@chakra-ui/react";
import { Layout, StudentAttendenceCard } from "components";
import { AbsentaStatus } from "types";

const attendences = [
  {
    id: 1,
    subject: "Proiectare conceptuală a unei aplicaţii IT",
    count: 2,
    prof: "Cojuhari Elena",
    status: AbsentaStatus.NEACHITAT,
    year: 2021,
    isChanged: false,
  },
  {
    id: 2,
    subject: "Comunicare şi scriere academică",
    count: 2,
    prof: "Gogoi Elena",
    status: AbsentaStatus.ACHITAT,
    year: 2021,
    isChanged: true,
  },
  {
    id: 3,
    subject: "Metode Numerice",
    count: 2,
    prof: "Viorel Bostan",
    status: AbsentaStatus.ACHITAT,
    year: 2023,
    isChanged: false,
  },
  {
    id: 4,
    subject: "Proiectare conceptuală a unei aplicaţii IT",
    count: 2,
    prof: "Gavrilița Mihai",
    status: AbsentaStatus.RECUPERAT,
    year: 2022,
    isChanged: false,
  },
];

export const StudentAttendence = () => {
  return (
    <Layout title="Recuperarea absențelor">
      <VStack spacing={2} align="stretch">
        {attendences.map((attendence) => (
          <StudentAttendenceCard key={attendence.id} {...attendence} />
        ))}
      </VStack>
    </Layout>
  );
};
