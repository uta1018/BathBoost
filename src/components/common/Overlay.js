import React from "react";

const Overlay = () => {
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return <div style={overlayStyle}></div>;
};

export default Overlay;
