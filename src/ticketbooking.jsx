import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

export default function TicketBooking({
  booking,
  setBooking,
  setData,
  tickets,
}) {
  const [ticketCounter, setTicketCounter] = useState(12112);
  const [addtickets, setAddtickets] = useState({
    ticketNo: "",
    passengerName: "",
    trainName: "",
    departureStation: "",
    arrivalStation: "",
    departureTime: Date.now(),
    arrivalTime: "",
    seatNumber: "RAC",
    price: "",
    bookingDate: Date.now(),
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setAddtickets((prevTicket) => ({
      ...prevTicket,
      [name]: newValue,
    }));
  };

  const generateRandomArrivalTime = () => {
    const now = new Date();
    const minTime = now.getTime() + 60 * 60 * 1000;
    const maxTime = now.getTime() + 7 * 12 * 60 * 60 * 1000;

    const randomTime = Math.floor(
      Math.random() * (maxTime - minTime + 1) + minTime
    );

    return new Date(randomTime).toISOString();
  };

  const generateTicketNumber = () => {
    const ticketNo = ticketCounter.toString();
    setTicketCounter(ticketCounter + 1);
    return ticketNo;
  };

  const handleClose = () => {
    setBooking(false);
  };

  const handleSubmit = async () => {
    try {
      if (addtickets.departureStation === addtickets.arrivalStation) {
        alert("Enter the proper city name");
      } else {
        const randomArrivalTime = generateRandomArrivalTime();
        const ticketNo = generateTicketNumber();

        const response = await axios.post(
          "https://ticketapi-moinwkhan.onrender.com/ticketbooking",
          {
            ...addtickets,
            ticketNo,
            arrivalTime: randomArrivalTime,
          }
        );
        console.log("Server response:", response);

        if (response.status === 200) {
          setAddtickets({
            ticketNo: "",
            passengerName: "",
            trainName: "",
            departureStation: "",
            arrivalStation: "",
            departureTime: Date.now(),
            arrivalTime: "",
            seatNumber: "RAC",
            price: "",
            bookingDate: Date.now(),
          });
          const updatedTickets = await fetchTicketData();
          setData(updatedTickets);
          alert(`Ticket of ${addtickets.passengerName} is Sucessfully Booked`);
          handleClose();
        } else {
          throw new Error("Failed For Booking");
        }
      }
    } catch (error) {
      console.error("Error submitting ticket: ", error.message);
      alert("Enter the Full Information ");
    }
  };

  const fetchTicketData = async () => {
    const response = await axios.get("http://localhost:4000/tickets");
    return response.data.Tickets;
  };

  return (
    <>
      <Modal onClose={handleClose} open={booking} className="trains">
        <h1 style={{ color: "green" }}>Ticket Booking</h1>
        <Form onSubmit={handleSubmit} widths="equal" size="large">
          <Form.Group>
            <Form.Field>
              <label>Passenger Name</label>
              <input
                placeholder="Passenger Name"
                value={addtickets.passengerName}
                onChange={handleChange}
                name="passengerName"
              />
            </Form.Field>
            <Form.Field>
              <label>Train Name</label>
              <input
                placeholder="Train Name"
                value={addtickets.trainName}
                onChange={handleChange}
                name="trainName"
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Departure Station</label>
            <input
              placeholder="Departure Station"
              value={addtickets.departureStation}
              onChange={handleChange}
              name="departureStation"
            />
          </Form.Field>
          <Form.Field>
            <label>Arrival Station</label>
            <input
              placeholder="Arrival Station"
              value={addtickets.arrivalStation}
              onChange={handleChange}
              name="arrivalStation"
            />
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <div className="input-group has-validation">
              <input
                placeholder="Price"
                value={addtickets.price}
                onChange={handleChange}
                name="price"
              />
            </div>
          </Form.Field>
          <Button color="violet" type="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
}
