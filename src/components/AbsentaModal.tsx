import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAuth } from "hooks";
import React, { useState } from "react";
import { Absenta, AbsentaStatus, DataAbsenta, ModalMode, Role } from "types";
import { TiDeleteOutline } from "react-icons/ti";

interface AbsentaModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalState: ModalMode;
  setModalState: (state: ModalMode) => void;
  absenta: Absenta;
  setAbsenta: (absenta: Absenta) => void;
}

export const AbsentaModal = ({
  isOpen,
  onClose,
  modalState,
  setModalState,
  absenta,
  setAbsenta,
}: AbsentaModalProps) => {
  const { user } = useAuth();
  const { numeStudent, numeProf: prof, subject, status, datesAbsenta, datesRecuperare } = absenta;
  const [newDateTime, setNewDateTime] = useState({
    date: "",
    time: "",
  });
  const [newRecuperareTimes, setNewRecuperareTimes] = useState<DataAbsenta[]>([]);
  const [newStatus, setNewStatus] = useState(status);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setAbsenta({ ...absenta, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleDeleteDate = (index: number) => {
    const updatedDates = [...datesAbsenta];
    updatedDates.splice(index, 1);
    setAbsenta({ ...absenta, datesAbsenta: updatedDates });
  };

  const handleAddAbsenta = () => {
    setAbsenta({
      id: 0,
      numeProf: user?.role === Role.PROF ? `${user?.name} ${user?.surname}` : "",
      numeStudent: numeStudent,
      subject: "",
      status: newStatus,
      datesAbsenta: [],
      datesRecuperare: [],
    });
    setNewDateTime({ date: "", time: "" });
    onClose();
  };

  const handleEditAbsenta = () => {
    console.log(absenta, newStatus, newRecuperareTimes);
    // setAbsenta({
    //   id: 0,
    //   numeProf: user?.role === Role.PROF ? `${user?.name} ${user?.surname}` : "",
    //   numeStudent: numeStudent,
    //   subject: "",
    //   status: newStatus,
    //   datesAbsenta: [],
    //   datesRecuperare: [],
    // });
    setNewDateTime({ date: "", time: "" });
    onClose();
  };

  const showEdit = () => {
    if (modalState !== "view") return false;

    if (user && user?.role === Role.PROF) {
      if (absenta.status !== AbsentaStatus.IN_PROGRESS || !absenta.datesRecuperare) {
        return false;
      }
    }

    return true;
  };

  const showAddRecuperareDates = () => {
    if (modalState !== "view") return false;

    if (user && user?.role === Role.PROF) {
      if (absenta.status !== AbsentaStatus.ACHITAT) {
        return false;
      }

      return true;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Absență</ModalHeader>
        <ModalCloseButton />
        {modalState === "view" && (
          <ModalBody>
            <Text as="b">Obiect</Text>
            <br />
            <Text>{subject}</Text>
            <br />
            <Text as="b">Student</Text>
            <br />
            <Text>{numeStudent}</Text>
            <br />
            <Text as="b">Profesor</Text>
            <br />
            <Text>{prof}</Text>
            <br />
            <Text as="b">Statut</Text>
            <br />
            <Text>{status}</Text>
            <br />
            <Text as="b">Data absenţei</Text>
            <br />
            {datesAbsenta &&
              datesAbsenta.map((date, index) => (
                <React.Fragment key={index}>
                  <Text ml={4}>
                    {index + 1}) {date?.date}, {date?.time}
                  </Text>
                </React.Fragment>
              ))}
            {datesRecuperare && datesRecuperare?.length > 0 && (
              <>
                <br />
                <Text as="b">Data recuperare</Text>
                <br />
                {datesRecuperare?.map((date, index) => (
                  <React.Fragment key={index}>
                    <Text ml={4}>
                      {index + 1}) {date.date}, {date.time}
                    </Text>
                  </React.Fragment>
                ))}
              </>
            )}
          </ModalBody>
        )}
        {modalState === "edit" && (
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Text as="b">Obiect</Text>
              <br />
              <Text>{subject}</Text>
              <br />
              <Text as="b">Student</Text>
              <br />
              <Text>{numeStudent}</Text>
              <br />
              <Text as="b">Profesor</Text>
              <br />
              <Text>{prof}</Text>
              <br />
              <FormControl>
                <FormLabel htmlFor="status">Statut</FormLabel>
                <Select
                  id="status"
                  name="status"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as AbsentaStatus)}
                >
                  {user?.role === Role.ADMIN && (
                    <>
                      <option value="neachitat">Neachitat</option>
                      <option value="achitat">Achitat</option>
                    </>
                  )}
                  {user?.role === Role.PROF && (
                    <>
                      <option value="in progres">In progres</option>
                      <option value="recuperat">Recuperat</option>
                    </>
                  )}
                </Select>
              </FormControl>
              <br />
              <>
                {datesAbsenta?.length > 0 && (
                  <>
                    <Text as="b">Data absente</Text>
                    {datesAbsenta.map((date, index) => (
                      <React.Fragment key={index}>
                        <Text ml={4}>
                          {index + 1}) {date.date}, {date.time}
                        </Text>
                      </React.Fragment>
                    ))}
                  </>
                )}
              </>
              {datesRecuperare && datesRecuperare?.length > 0 && (
                <>
                  <br />
                  <Text as="b">Data recuperare</Text>
                  <br />
                  {datesRecuperare.map((date, index) => (
                    <React.Fragment key={index}>
                      <Text ml={4}>
                        {index + 1}) {date.date}, {date.time}
                      </Text>
                    </React.Fragment>
                  ))}
                </>
              )}
            </form>
          </ModalBody>
        )}
        {modalState === "add" && (
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Text as="b">Obiect</Text>
              <br />
              <Select mt={2} id="subject" name="subject" value={subject} onChange={handleChange}>
                <option value="Metode numerice">Metode Numerice</option>
                <option value="Analiza matematică">Analiza matematică</option>
              </Select>
              <br />
              <Text as="b">Student</Text>
              <br />
              <Text>{numeStudent}</Text>
              <br />
              <Text as="b">Profesor</Text>
              <br />
              <Text>{prof}</Text>
              <br />
              <Text as="b">Statut</Text>
              <br />
              <Text>{status}</Text>
              <br />
              <Text as="b">Data absenței</Text>
              {datesAbsenta &&
                datesAbsenta[datesAbsenta.length - 1]?.date &&
                datesAbsenta[datesAbsenta.length - 1]?.time &&
                datesAbsenta.map((date, index) => (
                  <>
                    <HStack
                      mt={2}
                      key={date.date}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text ml={4}>
                        {index + 1}) {date.date}, {date.time}
                      </Text>
                      <Button
                        size="sm"
                        onClick={() => handleDeleteDate(index)}
                        variant="link"
                        textDecor="underline"
                      >
                        Șterge
                      </Button>
                    </HStack>
                  </>
                ))}
              <HStack mt="2">
                <FormControl>
                  <Input
                    type="date"
                    id="date"
                    value={newDateTime?.date}
                    onChange={(e) => {
                      const { value } = e.target;
                      setNewDateTime({ ...newDateTime, date: value });
                    }}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="time"
                    id="time"
                    value={newDateTime.time}
                    onChange={(e) => {
                      const { value } = e.target;
                      setNewDateTime({ ...newDateTime, time: value });
                    }}
                  />
                </FormControl>
              </HStack>
              <Button
                colorScheme="gray"
                isDisabled={!newDateTime?.date || !newDateTime.time}
                onClick={() => {
                  setAbsenta({
                    ...absenta,
                    datesAbsenta: [...datesAbsenta, newDateTime],
                  });
                  setNewDateTime({ date: "", time: "" });
                }}
                size="sm"
                mt="2"
              >
                Adaugă dată
              </Button>
              <br />
            </form>
          </ModalBody>
        )}
        {modalState === "recuperare" && (
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Text as="b">Obiect</Text>
              <br />
              <Text>{subject}</Text>
              <br />
              <Text as="b">Student</Text>
              <br />
              <Text>{numeStudent}</Text>
              <br />
              <Text as="b">Profesor</Text>
              <br />
              <Text>{prof}</Text>
              <br />
              <Text as="b">Statut</Text>
              <br />
              <Text>{status}</Text>
              <br />
              <Text as="b">Data absenţei</Text>
              <br />
              {datesAbsenta &&
                datesAbsenta.map((date, index) => (
                  <React.Fragment key={index}>
                    <Text ml={4}>
                      {index + 1}) {date?.date}, {date?.time}
                    </Text>
                  </React.Fragment>
                ))}
              <Text as="b" display="block" mt="4">
                Data recuperare
              </Text>
              <VStack mt="2" w="full">
                {datesAbsenta &&
                  datesAbsenta.map((date, index) => (
                    <React.Fragment key={index}>
                      <HStack w="full">
                        <Text ml={4}>{index + 1})</Text>
                        <FormControl>
                          <Input
                            type="date"
                            id="date"
                            value={newRecuperareTimes[index]?.date}
                            onChange={(e) => {
                              const { value } = e.target;
                              setNewRecuperareTimes({
                                ...newRecuperareTimes,
                                [index]: { ...newRecuperareTimes[index], date: value },
                              });
                            }}
                          />
                        </FormControl>
                        <FormControl>
                          <Input
                            type="time"
                            id="time"
                            value={newRecuperareTimes[index]?.time}
                            onChange={(e) => {
                              const { value } = e.target;
                              setNewRecuperareTimes({
                                ...newRecuperareTimes,
                                [index]: { ...newRecuperareTimes[index], time: value },
                              });
                            }}
                          />
                        </FormControl>
                      </HStack>
                    </React.Fragment>
                  ))}
              </VStack>
              <br />
            </form>
          </ModalBody>
        )}
        <ModalFooter mt={2}>
          {modalState !== "view" && (
            <Button
              colorScheme="brand"
              size="sm"
              onClick={() => (modalState === "add" ? handleAddAbsenta() : handleEditAbsenta())}
              mr={2}
            >
              Save
            </Button>
          )}
          {showAddRecuperareDates() && (
            <Button
              colorScheme="brand"
              size="sm"
              mr={2}
              onClick={() => {
                setNewRecuperareTimes(datesAbsenta.map(() => ({ date: "", time: "" })));
                setModalState("recuperare");
              }}
            >
              Adaugă dățile de recuperare
            </Button>
          )}
          {showEdit() && (
            <Button colorScheme="brand" size="sm" onClick={() => setModalState("edit")} mr={2}>
              Edit
            </Button>
          )}
          <Button colorScheme="brand" onClick={onClose} size="sm" variant="ghost">
            Închide
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
