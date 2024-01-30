import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Image,
  Button,
  Header,
  Modal,
  Icon,
} from "semantic-ui-react";
import axios from "axios";
import AOS from "aos";
import Info from "./displaycontainer/info";
import Ticketbooking from "./ticketbooking";
import "aos/dist/aos.css";

AOS.init();

const Display = ({ tickets }) => {
  const [data, setData] = useState(tickets);
  const [open, setOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [booking, setBooking] = useState(false);
  const [ticketdeleted, setTicketdeleted] = useState(null);

  const handleDelete = async () => {
    try {
      if (!selectedTicketId) {
        console.log("No ticket selected for deletion");
        return;
      }
      setTicketdeleted(<div className="load" style={{color:"white"}}>Deleting....</div>);
      await axios.delete(
        `https://ticketapi-moinwkhan.onrender.com/deleteticket/${selectedTicketId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setData((prevData) =>
        prevData.filter((ticket) => ticket._id !== selectedTicketId)
      );
      setOpen(false);
      setSelectedTicket(null);
    } catch (error) {
      console.error("Error detecting in delete:", error.message);
      setSelectedTicket(null);
    } finally {
      setTicketdeleted(null);
    }
  };

  useEffect(() => {
    setData(tickets);
  }, [tickets]);

  const handleBooking = () => {
    setBooking(true);
  };

  const handleClose = () => setOpen(false);

  const handleOpen = (id) => {
    const selectedTicket = data.find((ticket) => ticket._id === id);
    setSelectedTicket(selectedTicket);
    setSelectedTicketId(id);
    setOpen(true);
  };

  const handleInfo = (id) => {
    const selectedTicket = data.find((ticket) => ticket._id === id);
    setSelectedTicket(selectedTicket);
    setSelectedTicketId(id);
    setInfoOpen(true);
  };

  return (
    <>
      <Button
        
        color="green"
        size="big"
        className="Ticketbook"
        icon="ticket"
        content="Book ticket"
        onClick={handleBooking}
      />
      <Grid centered className="ticketss">
        {data &&
          data.map((ticket) => (
            <Card
              color="olive"
              className="carders"
              key={ticket._id}
              data-aos="zoom-in"
            >
              <Image
                src="https://as2.ftcdn.net/v2/jpg/00/02/02/57/1000_F_2025793_X7MVoTH4EOCzeobGZsWBUm5blQj12C.jpg"
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>PassengerName: {ticket.passengerName}</Card.Header>
                <Card.Meta>
                  <span>TrainName: {ticket.trainName}</span>
                </Card.Meta>
                <Card.Description>
                  From: {ticket.departureStation} To: {ticket.arrivalStation}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button
                  onClick={() => handleInfo(ticket._id)}
                  icon="info"
                  color="blue"
                  className="del"
                  size="small"
                />

                <Button
                  onClick={() => handleOpen(ticket._id)}
                  icon="cancel"
                  color="red"
                  className="del"
                  size="small"
                />
              </Card.Content>

              <Modal
                className="custom-modal"
                basic
                onClose={handleClose}
                onOpen={() => setOpen(true)}
                open={open}
                size="small"
              >
                <Header icon>
                  <Icon name="ticket" />
                  Cancel the Ticket !!
                </Header>
                <Modal.Content style={{ fontSize: 22 }}>
                  <p>
                    Are you sure you want to{" "}
                    <span style={{ color: "red" }}>cancel</span> the{" "}
                    <span style={{ color: "chartreuse" }}>
                      {selectedTicket?.passengerName || "No selected ticket"}
                    </span>{" "}
                    ticket?
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    basic
                    color="red"
                    inverted
                    onClick={handleClose}
                    icon="remove"
                    content="No"
                  ></Button>
                  <Button
                    color="green"
                    inverted
                    onClick={handleDelete}
                    icon="checkmark"
                    content="Yes"
                  ></Button>
                </Modal.Actions>
               {ticketdeleted}
              </Modal>
              {selectedTicket && (
                <Info
                  infoOpen={infoOpen}
                  setInfoOpen={setInfoOpen}
                  selectedTicket={selectedTicket}
                />
              )}
              <Ticketbooking
                booking={booking}
                setBooking={setBooking}
                tickets={tickets}
                setData={setData}
              />
            </Card>
          ))}
      </Grid>
    </>
  );
};

export default Display;
