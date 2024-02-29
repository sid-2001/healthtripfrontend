import React, { useState, useEffect } from "react";
import axios from "axios";

const MessageFrequencyComponent: React.FC = () => {
  const [frequency, setFrequency] = useState<number>(0);

  useEffect(() => {
    // Fetch message frequency from backend
    axios
      .get(`/api/messageFrequency`)
      .then((response) => {
        setFrequency(response.data.frequency);
      })
      .catch((error) => {
        console.error("Error fetching message frequency:", error);
      });
  }, []);

  const updateFrequency = () => {
    // Send updated frequency to backend
    axios
      .post(`/api/updateMessageFrequency`, {
        frequency,
      })
      .then((response) => {
        console.log("Message frequency updated successfully");
      })
      .catch((error) => {
        console.error("Error updating message frequency:", error);
      });
  };

  const handleFrequencyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFrequency(Number(event.target.value));
  };

  return (
    <div>
      <h2>Manage Message Frequency</h2>
      <label>Frequency:</label>
      <input type="number" value={frequency} onChange={handleFrequencyChange} />
      <button onClick={updateFrequency}>Update Frequency</button>
    </div>
  );
};

export default MessageFrequencyComponent;
