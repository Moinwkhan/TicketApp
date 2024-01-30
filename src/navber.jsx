import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default class Navbar extends Component {
  state = {
    activeItem: "Home",
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu borderless fixed="top" size="large" color="blue" style={{fontSize:17}}>
        <Menu.Item>
          <img
            src="https://pics.craiyon.com/2023-08-04/dec4c5a0cb004c60a5a7cce3716ff403.webp"
            alt="LOGO" style={{ height: 70, width: 70, borderRadius: 15 }}
          />
        </Menu.Item>
        <Menu.Item
          name="Home"
          active={activeItem === "Home"}
          onClick={this.handleItemClick}
          as={Link}
          to="/"
        >
          Home
        </Menu.Item>

        <Menu.Item
          name="booking"
          active={activeItem === "booking"}
          onClick={this.handleItemClick}
          as={Link}
          to="/Tickets"
        >
          Tickets
        </Menu.Item>

      </Menu>
    );
  }
}
