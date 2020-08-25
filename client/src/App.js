import React, { useEffect, useState } from "react";
import axios from "axios";
import Ticket from "./components/Ticket.js";
import AddButton from "./components/AddButton";
import NewTicketDialog from "./components/NewTicketDialog";
import { ThemeProvider } from "styled-components";
import { BodyStyle } from "./components/GlobalStyle.js";
import { lightTheme, darkTheme } from "./components/Themes.js";
import { useDarkMode } from "./components/useDarkMode.js";
import { FiSun, FiMoon } from "react-icons/fi";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState();
  const [searchText, setSearchText] = useState();
  const [hiddenTickets, setHiddenTickets] = useState([]);
  const [theme, changeTheme, themeLoaded] = useDarkMode();
  const [activeLabels, setActiveLabels] = useState([]);
  const [resultsCounter, setResultCounter] = useState(0);
  const [allLabels, setAlllabels] = useState([]);
  const [filterByAll, setFilterByAll] = useState(false);

  const currentStyle = theme === "light" ? lightTheme : darkTheme;

  const fetchTickets = async () => {
    let url = `/api/tickets${searchText ? `?searchText=${searchText}` : ``}`;
    const { data } = await axios.get(url);
    setTickets(data);
    let labels = await axios.get("/api/tickets/labels");
    labels = labels.data;
    allLabels.length !== labels.length && setAlllabels(labels);
    searchText ? setResultCounter(data.length) : setResultCounter(0);
  };

  useEffect(() => {
    fetchTickets();
  }, [searchText]);

  const hideTicket = (id) => {
    let updatedArr = hiddenTickets.slice();
    updatedArr.push(id);
    setHiddenTickets(updatedArr);
  };

  const addActiveLabel = (label) => {
    if (activeLabels.includes(label)) return;
    let newArr = activeLabels.slice();
    newArr.unshift(label);
    setActiveLabels(newArr);
  };
  const removeActiveLabel = (label) => {
    let newArr = activeLabels.slice();
    console.log(label);
    console.log(activeLabels.indexOf(label));
    newArr.splice(activeLabels.indexOf(label), 1);
    setActiveLabels(newArr);
    !newArr[0] && setResultCounter(0);
  };

  const addTicketToPage = () => {
    fetchTickets();
  };

  const displayTickets = () => {
    let toDisplay = tickets;
    if (activeLabels[0]) {
      let filterMethod = filterByAll ? "every" : "some";
      toDisplay = tickets.filter((t) => {
        return t.labels
          ? activeLabels[filterMethod]((al) => t.labels.includes(al))
          : false;
      });
      toDisplay.length !== resultsCounter && setResultCounter(toDisplay.length);
    }
    return toDisplay.map((t, i) => (
      <Ticket
        key={`ticket${i}`}
        ticketData={t}
        hide={hideTicket}
        setLabelActive={addActiveLabel}
        hidden={hiddenTickets.includes(t.id)}
      />
    ));
  };

  return themeLoaded ? (
    <ThemeProvider theme={currentStyle}>
      <>
        <BodyStyle />
        <div id="app">
          <div id="theme-toggler" onClick={changeTheme}>
            {theme === "light" ? <FiSun /> : <FiMoon />}{" "}
          </div>
          <div className="head">
            <div id="headers">
              <h1 id="header">Ticket Mannager</h1>
              <h3 id="subheader">The WIX way</h3>
            </div>
            <div id="search-container">
              <input
                id="searchInput"
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="I'm looking for..."
              ></input>
              <div className="head-messages">
                <span>
                  {resultsCounter !== 0 && `Showing ${resultsCounter} results `}
                </span>
                {hiddenTickets[0] && (
                  <span className="hidden-tickets-msg">
                    (<span id="hideTicketsCounter">{hiddenTickets.length}</span>{" "}
                    hidden tickets -{" "}
                    <span
                      id="restoreHideTickets"
                      onClick={() => setHiddenTickets([])}
                    >
                      restore
                    </span>
                    )
                  </span>
                )}
              </div>
            </div>
            <div id="filter-lables">
              <div id="lables-container">
                {allLabels[0] &&
                  allLabels.map((l) => {
                    let aState = activeLabels.includes(l);
                    return (
                      <span
                        className={aState ? "active-label" : "inactive-label"}
                        onClick={() =>
                          aState ? removeActiveLabel(l) : addActiveLabel(l)
                        }
                      >
                        {l}
                      </span>
                    );
                  })}
              </div>
              <div id="filterToggler">
                <input
                  type="checkbox"
                  onClick={(event) => setFilterByAll(event.target.checked)}
                />{" "}
                include all labels?
              </div>
            </div>
          </div>
          <main>{tickets && displayTickets()}</main>
        </div>
        <NewTicketDialog addTicketToPage={addTicketToPage} />
      </>
    </ThemeProvider>
  ) : (
    <div />
  );
}

export default App;
