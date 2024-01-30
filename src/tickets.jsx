import React, { useEffect, useState } from "react";
import Fetching from "./api";
import Displaytickets from "./Displaytickets";

const TicketBooking = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);

  const getTickets = async () => {
    try {
      const result = await Fetching();
      if (result && result.Tickets) {
        setTickets(result.Tickets);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <>
      <h1 className="heading">Confirm Tickets</h1>
      {loading ? (
        <h1 className="load">
          <div className="loader"></div>
        </h1>
      ) : (
        <Displaytickets tickets={tickets} />
      )}
    </>
  );
};

export default TicketBooking;
