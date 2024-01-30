import React, { useEffect, useRef } from "react";
import { Button, Header } from "semantic-ui-react";

function Home() {
  const buttonRef = useRef(null);

  useEffect(() => {
    const panels = document.querySelectorAll(".panel");

    function toggleOpen() {
      this.classList.toggle("open");
      this.classList.toggle("open-active");
    }

    function toggleActive() {
      this.classList.toggle("close");
    }

    panels.forEach((panel) => panel.addEventListener("click", toggleOpen));
    panels.forEach((panel) =>
      panel.addEventListener("transitionend", toggleActive)
    );

    return () => {
      panels.forEach((panel) => {
        panel.removeEventListener("click", toggleOpen);
        panel.removeEventListener("transitionend", toggleActive);
      });
    };
  }, []);

  return (
    <div className="homes">
      <div className="panels">
        <div className="Homemobile">
          <Header
            size="huge"
            color="orange"
            style={{ fontFamily: "cursive", fontSize: 36, width: 400 }}
          >
            Always say yes to Travel for new adventures.
          </Header>
          <Button
            ref={buttonRef}
            className="mobilebtn"
            size="huge"
            color="green"
          >
            Book Ticket
          </Button>
        </div>
        <div className="panel panel2">
          <p>Always say yes to</p>
          <p>Travel</p>
          <p>for new adventures.</p>
        </div>
        <div className="panel panel1">
          <p>السَّلَامُ عَلَيْكُمْ</p>
          <p>Hello</p>
          <p>नमस्ते</p>
        </div>
        <div className="panel panel3">
          <p>Nature is the</p>
          <p>Purest</p>
          <p>Portal to inner-peace</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
