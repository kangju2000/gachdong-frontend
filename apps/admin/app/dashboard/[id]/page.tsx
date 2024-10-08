import React from "react";
import { AdminLayout } from "./admin-layout";
import { DashboardContent } from "./dashboard-content";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <DashboardContent />
    </AdminLayout>
  );
}
