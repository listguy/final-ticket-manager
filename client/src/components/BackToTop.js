import React from "react";
import { TiArrowUpThick } from "react-icons/ti";
import styled from "styled-components";

export default function BackToTop() {
  const FloatingAddButton = styled.div`
     {
      position: fixed;
      top: 5vh;
      left: 93vw;
      background-color: rgba(230, 210, 40, 0.7);
      width: 4em;
      height: 4em;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  `;

  return (
    <a href="#">
      <FloatingAddButton id="bttButton">
        <TiArrowUpThick size={"2em"} />
      </FloatingAddButton>
    </a>
  );
}
