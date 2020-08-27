import React from "react";
import { FiPlus } from "react-icons/fi";
import styled from "styled-components";

export default function (props) {
  const FloatingAddButton = styled.div`
     {
      position: fixed;
      top: 88vh;
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
    <FloatingAddButton id="addButton" onClick={props.clickHandler}>
      <FiPlus size={"2em"} />
    </FloatingAddButton>
  );
}
