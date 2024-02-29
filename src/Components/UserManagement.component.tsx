import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
interface User {
  id: string;
  name: string;
  city: string;
  country: string;
  blocked: boolean;
}

const UserManagementComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Siddhant",
      city: "Moradabad",
      country: "India",
      blocked: true,
    },
  ]);

  const [message, setMessage] = useState<boolean>(false);
  useEffect(() => {
    // Fetch user list from backend
    axios
      .get(`/api/users`)
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const blockUser = (userId: string) => {
    // Send request to block user to backend
    axios
      .patch(`/api/user/block/${userId}`)
      .then((response) => {
        console.log("User blocked successfully");
        // Update user list

        axios
          .get(`/api/users`)
          .then((response) => {
            setUsers(response.data.users);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
      })
      .catch((error) => {
        console.error("Error blocking user:", error);
      });
  };
  const sendWeather = (userId: string) => {
    // Send request to block user to backend
    axios
      .get(`/api/weather/${userId}`)
      .then((response) => {
        console.log("User Message Send successfully");
        setMessage(true);

        // Update user list

        axios
          .get(`/api/users`)
          .then((response) => {
            setUsers(response.data.users);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
      })
      .catch((error) => {
        setMessage(false);
        console.error("Error Sernding Message:", error);
      });
  };
  const activateUser = (userId: string) => {
    // Send request to block user to backend
    axios
      .patch(`/api/user/activate/${userId}`)
      .then((response) => {
        console.log("User Activated successfully");
        // Update user list
        axios
          .get(`/api/users`)
          .then((response) => {
            setUsers(response.data.users);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
      })
      .catch((error) => {
        console.error("Error Activating user:", error);
      });
  };

  const deleteUser = (userId: string) => {
    // Send request to delete user to backend
    axios
      .delete(`/api/users/${userId}`)
      .then((response) => {
        console.log("User deleted successfully");
        // Update user list
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div>
      <h2>User Management</h2>
      <List>
        {users?.map((user: any) => (
          <ListItem key={user._id}>
            <ListItemText
              primary={user.first_name}
              secondary={`${user.city}, ${user.country}`}
            />
            <ListItemSecondaryAction>
              <Chip
                label={user.blocked ? "Inactive" : "Active"}
                color={user.blocked ? "secondary" : "primary"} // Red for inactive, Green for active
              />
              {user.blocked ? (
                <IconButton
                  onClick={() => activateUser(user._id)}
                  edge="end"
                  aria-label="activate"
                >
                  <CheckCircleIcon />
                </IconButton>
              ) : (
                <>
                  <IconButton
                    onClick={() => blockUser(user._id)}
                    edge="end"
                    aria-label="block"
                  >
                    <CancelIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => sendWeather(user._id)}
                    edge="end"
                    aria-label="block"
                  >
                    <SendIcon />
                  </IconButton>
                </>
              )}
              <IconButton
                onClick={() => deleteUser(user._id)}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Snackbar open={message} autoHideDuration={6000}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Success
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserManagementComponent;
