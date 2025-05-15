"use client";

import React from "react";
import { Typography, Box, Paper } from "@mui/material";

export default function DashboardPage() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      {/* You can use the same spacing as the AppBar height */}
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Placeholder for future dashboard content */}
      <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
        <Typography variant="body1">
          Welcome to your dashboard. This area will display key stats,
          notifications, or widgets in the future.
        </Typography>
      </Paper>
    </Box>
  );
}
