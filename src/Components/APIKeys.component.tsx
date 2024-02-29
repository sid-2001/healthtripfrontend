import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import api1 from "../services/api1";

import { BACKEND_URL } from "../configraion";

const APIKeysComponent: React.FC = () => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    // Fetch API key from backend
    axios
      .get(`/api/apiKey`)
      .then((response: any) => {
        console.log();
        setApiKey(response.data.apiKey.key); //setting the api keys
      })
      .catch((error: any) => {
        console.error("Error fetching API key:", error);
      });
  }, []);

  const updateApiKey = () => {
    // Send updated API key to backend
    axios
      .put(`/api/apiKey`, { apiKey })
      .then((response: any) => {
        console.log("API key updated successfully");
      })
      .catch((error: any) => {
        console.error("Error updating API key:", error);
      });
  };

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  return (
    <div>
      <h2>Manage API Keys</h2>
      <TextField
        label="API Key"
        variant="outlined"
        value={apiKey}
        onChange={handleApiKeyChange}
      />
      &nbsp;&nbsp;
      <button onClick={updateApiKey}> Update API Key</button>
    </div>
  );
};

export default APIKeysComponent;
