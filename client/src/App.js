import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import Ticket from "./components/Ticket.js";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState();

  useEffect(() => {
    const fetchTickets = async () => {
      const { data } = await axios.get("/api/tickets");
      setTickets(data);
      console.log("Set");
    };

    fetchTickets();
  }, []);

  const printTickets = () => {
    return tickets.map((t) => (
      <li>
        <Ticket ticketData={t} />
      </li>
    ));
  };

  return <main>{tickets && printTickets()}</main>;
}

export default App;
