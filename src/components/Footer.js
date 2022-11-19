import React from "react";
import styled from "styled-components";

export default () => {
  return (
    <Footer>
      <div className="container">
        <div className="row">
          <p style={{ marginLeft: "30px", marginRight: "30px" }}>
            <span style={{ textAlign: "left", lineHeight: "60px" }}>
              ©hackaTUM2022 <a> TUM Voices APP</a>
            </span>
          </p>
        </div>
      </div>
    </Footer>
  );
};

const Footer = styled.footer`
  background-color: #fff;
  width: 100%;
`;
