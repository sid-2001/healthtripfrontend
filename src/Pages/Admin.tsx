// AdminPanelPage.tsx
import React from "react";

("../Comp");
import APIKeysComponent from "../Components/APIKeys.component";
import MessageFrequencyComponent from "../Components/MessageFrequency.component";
import UserManagementComponent from "../Components/UserManagement.component";

const AdminPanelPage: React.FC = () => {
  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <div className="admin-section">
        <APIKeysComponent />
      </div>

      <div className="admin-section">
        <UserManagementComponent />
      </div>
    </div>
  );
};

export default AdminPanelPage;
