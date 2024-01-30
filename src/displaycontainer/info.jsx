import React, { useRef } from "react";
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Header,
  Image,
  Modal,
} from "semantic-ui-react";

const Info = ({ infoOpen, setInfoOpen, selectedTicket }) => {
  const modalRef = useRef(null);

  const handleClose = () => {
    setInfoOpen(false);
  };

  return (
    <Modal open={infoOpen} onClose={handleClose} ref={modalRef} style={{ height: "78%", position: "absolute", left: "18%", top: "2%" }}>
      <ModalHeader>Information of Ticket No "<span style={{ color: "red" }}>{selectedTicket.ticketNo}</span>"</ModalHeader>
      <ModalContent image>
        <Image size="big" src="https://as2.ftcdn.net/v2/jpg/00/02/02/57/1000_F_2025793_X7MVoTH4EOCzeobGZsWBUm5blQj12C.jpg" wrapped  />
        <ModalDescription>
          {selectedTicket ? (
            <>
              <Header>Train Name: {selectedTicket.trainName}</Header>
              <p>Passenger Name: {selectedTicket.passengerName}</p>
              <p>Departure Station: {selectedTicket.departureStation}</p>
              <p>Arrival Station: {selectedTicket.arrivalStation}</p>
              <p>Seat Number: {selectedTicket.seatNumber}</p>
              <p>Price: {selectedTicket.price}/-</p>
            </>
          ) : (
            <p>No ticket selected</p>
          )}
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button
          content="OK!"
          labelPosition="right"
          icon="checkmark"
          onClick={handleClose}
          positive
        />
      </ModalActions>
    </Modal>
  );
};

export default Info;
