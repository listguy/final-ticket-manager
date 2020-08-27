import { createGlobalStyle } from "styled-components";

export const BodyStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body.body};
    color: ${({ theme }) => theme.body.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }

  #searchInput {
    background: ${({ theme }) => theme.body.text};
    color: ${({ theme }) => theme.body.body};
  }
  .ticket {
    background: ${({ theme }) => theme.ticket.background};
    box-shadow: ${({ theme }) => theme.ticket.boxShadow};
    color: ${({ theme }) => theme.ticket.background};
  }

  .ticket-title, .ticket-content, .ticket-footer {
    color: ${({ theme }) => theme.body.text};
  }

  .ticket:hover {
    box-shadow: ${({ theme }) => theme.ticket.boxShadowHover};
    color: ${({ theme }) => theme.body.text}; 
  }

  .label {
    background: ${({ theme }) => theme.body.body};
  }

  .label:hover, .head-label:hover, .inactive-label {
    background: ${({ theme }) => theme.body.text};
    color: ${({ theme }) => theme.body.body};
  }
  
  .hideTicketButton:hover {
    color: ${({ theme }) => theme.body.text}; 
  }

  
    `;
