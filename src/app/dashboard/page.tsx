'use client'

import React from 'react'
import {
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
} from '@mui/material'
import {
  School as SchoolIcon,
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  Chat as ChatIcon,
  People as PeopleIcon,
} from '@mui/icons-material'
import Link from 'next/link'

export default function DashboardPage() {
  // Mock data for stats - replace with real data from your API
  const stats = [
    {
      title: 'Total Categories',
      value: '12',
      icon: <SchoolIcon className="text-primary-600" />,
      color: 'bg-primary-50 border-primary-200',
    },
    {
      title: 'Active Chats',
      value: '248',
      icon: <ChatIcon className="text-success-600" />,
      color: 'bg-success-50 border-success-200',
    },
    {
      title: 'Total Users',
      value: '1,543',
      icon: <PeopleIcon className="text-info-600" />,
      color: 'bg-info-50 border-info-200',
    },
    {
      title: 'Response Rate',
      value: '98.5%',
      icon: <TrendingUpIcon className="text-warning-600" />,
      color: 'bg-warning-50 border-warning-200',
    },
  ]

  return (
    <Box component="main" className="p-6">
      {/* Header */}
      <div className="mb-8">
        <Typography variant="h4" className="text-gray-800 font-bold mb-2">
          Dashboard Overview
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Manage your UniBot categories and monitor system performance
        </Typography>
      </div>

      {/* Stats Grid */}
      <Grid container spacing={3} className="mb-8">
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              className={`h-full shadow-md hover:shadow-lg transition-shadow duration-200 border ${stat.color}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Typography variant="body2" className="text-gray-600 mb-1">
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      className="font-bold text-gray-800"
                    >
                      {stat.value}
                    </Typography>
                  </div>
                  <div className="p-3 rounded-full bg-white shadow-sm">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Paper className="p-6 mb-8 shadow-md rounded-lg">
        <Typography variant="h5" className="text-gray-800 font-bold mb-4">
          Quick Actions
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-primary-500">
              <CardContent className="p-4">
                <Typography variant="h6" className="text-gray-800 mb-2">
                  Manage Categories
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-4">
                  View, edit, and organize your institution categories
                </Typography>
              </CardContent>
              <CardActions className="p-4 pt-0">
                <Link href="/dashboard/institutions" className="w-full">
                  <Button
                    variant="contained"
                    fullWidth
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    View Categories
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-success-500">
              <CardContent className="p-4">
                <Typography variant="h6" className="text-gray-800 mb-2">
                  Add New Category
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-4">
                  Create a new institution category for the chatbot
                </Typography>
              </CardContent>
              <CardActions className="p-4 pt-0">
                <Link href="/dashboard/add-institution" className="w-full">
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<AddIcon />}
                    className="bg-success-600 hover:bg-success-700"
                  >
                    Add Category
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-info-500">
              <CardContent className="p-4">
                <Typography variant="h6" className="text-gray-800 mb-2">
                  Test Chatbot
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-4">
                  Interact with the UniBot to test functionality
                </Typography>
              </CardContent>
              <CardActions className="p-4 pt-0">
                <Link href="/chatbot" className="w-full">
                  <Button
                    variant="outlined"
                    fullWidth
                    className="border-info-500 text-info-600 hover:bg-info-50"
                  >
                    Open Chatbot
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Recent Activity */}
      <Paper className="p-6 shadow-md rounded-lg">
        <Typography variant="h5" className="text-gray-800 font-bold mb-4">
          Recent Activity
        </Typography>
        <div className="space-y-4">
          {[
            {
              action: 'New category created',
              item: 'Computer Science Department',
              time: '2 hours ago',
              status: 'success',
            },
            {
              action: 'Category updated',
              item: 'Engineering Faculty',
              time: '5 hours ago',
              status: 'info',
            },
            {
              action: 'System prompt modified',
              item: 'Mathematics Department',
              time: '1 day ago',
              status: 'warning',
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Chip
                  label={activity.status}
                  size="small"
                  className={`
                    ${activity.status === 'success' ? 'bg-success-100 text-success-800' : ''}
                    ${activity.status === 'info' ? 'bg-info-100 text-info-800' : ''}
                    ${activity.status === 'warning' ? 'bg-warning-100 text-warning-800' : ''}
                  `}
                />
                <div>
                  <Typography
                    variant="body2"
                    className="text-gray-800 font-medium"
                  >
                    {activity.action}
                  </Typography>
                  <Typography variant="caption" className="text-gray-600">
                    {activity.item}
                  </Typography>
                </div>
              </div>
              <Typography variant="caption" className="text-gray-500">
                {activity.time}
              </Typography>
            </div>
          ))}
        </div>
      </Paper>
    </Box>
  )
}
