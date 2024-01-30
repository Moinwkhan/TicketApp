import axios from "axios";

const fetchData = async () => {
  try {
    let response = await axios.get("https://ticketapi-moinwkhan.onrender.com/tickets");
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching tickets:", error.message);
  }
};

export default fetchData;
