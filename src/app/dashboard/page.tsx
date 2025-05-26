'use client'

import React, { useEffect, useState } from 'react'
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
  CircularProgress,
} from '@mui/material'
import {
  School as SchoolIcon,
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  Chat as ChatIcon,
  People as PeopleIcon,
} from '@mui/icons-material'
import Link from 'next/link'
import useMutateApi from '@/Hooks/useMutateApi'

interface Institution {
  _id: string
  title: string
  description: string
  systemPrompt: string
  data: string
  url: string
  createdAt: string
  updatedAt: string
}

interface User {
  _id: string
  email: string
  firstName: string
  lastName: string
  verified: boolean
  createdAt: string
  updatedAt: string
}

export default function DashboardPage() {
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState({
    totalCategories: 0,
    totalUsers: 0,
    verifiedUsers: 0,
    avgPromptLength: 0,
  })

  const [getInstitutions, institutionsLoading] = useMutateApi({
    apiPath: `/category/get-Categories`,
    method: 'GET',
  })

  const [getUserStats, userStatsLoading] = useMutateApi({
    apiPath: `/sessions/checkAccessToken`,
    method: 'POST',
  })

  const fetchDashboardData = async () => {
    try {
      const institutionsResponse = await getInstitutions({})

      if (institutionsResponse && institutionsResponse.error === null) {
        const institutionData = institutionsResponse.data || []
        setInstitutions(institutionData)

        const totalCategories = institutionData.length
        const totalPromptChars = institutionData.reduce(
          (acc: number, inst: Institution) =>
            acc + (inst.systemPrompt?.length || 0),
          0,
        )
        const avgPromptLength =
          totalCategories > 0
            ? Math.round(totalPromptChars / totalCategories)
            : 0

        setStats((prev) => ({
          ...prev,
          totalCategories,
          avgPromptLength,
        }))
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const getRecentActivity = () => {
    interface Activity {
      action: string
      item: string
      time: string
      status: 'success' | 'info' | 'warning'
      description: string
    }

    const activities: Activity[] = []

    const recentInstitutions = [...institutions]
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      .slice(0, 5)

    recentInstitutions.forEach((institution, index) => {
      const updatedDate = new Date(institution.updatedAt)
      const createdDate = new Date(institution.createdAt)
      const now = new Date()

      const isRecentlyCreated =
        updatedDate.getTime() - createdDate.getTime() < 60000

      const diffHours = Math.floor(
        (now.getTime() - updatedDate.getTime()) / (1000 * 60 * 60),
      )
      const diffDays = Math.floor(diffHours / 24)

      let timeAgo = ''
      if (diffDays > 0) {
        timeAgo = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
      } else if (diffHours > 0) {
        timeAgo = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
      } else {
        timeAgo = 'Just now'
      }

      activities.push({
        action: isRecentlyCreated ? 'Category created' : 'Category updated',
        item: institution.title,
        time: timeAgo,
        status: isRecentlyCreated ? 'success' : 'info',
        description: `${institution.description.slice(0, 50)}...`,
      })
    })

    return activities
  }

  const statsData = [
    {
      title: 'Total Categories',
      value: stats.totalCategories.toString(),
      icon: <SchoolIcon className="text-primary-600" />,
      color: 'bg-primary-50 border-primary-200',
      subtitle: 'Institution categories',
    },
    {
      title: 'Avg Prompt Length',
      value: stats.avgPromptLength.toString(),
      icon: <ChatIcon className="text-success-600" />,
      color: 'bg-success-50 border-success-200',
      subtitle: 'Characters per prompt',
    },
    {
      title: 'Active Categories',
      value: institutions
        .filter((inst) => inst.systemPrompt && inst.systemPrompt.length > 0)
        .length.toString(),
      icon: <TrendingUpIcon className="text-info-600" />,
      color: 'bg-info-50 border-info-200',
      subtitle: 'With system prompts',
    },
    {
      title: 'System Status',
      value: '99.9%',
      icon: <PeopleIcon className="text-warning-600" />,
      color: 'bg-warning-50 border-warning-200',
      subtitle: 'Uptime this month',
    },
  ]

  if (institutionsLoading) {
    return (
      <Box component="main" className="p-6">
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
          <Typography variant="body1" className="ml-4 text-gray-500">
            Loading dashboard data...
          </Typography>
        </div>
      </Box>
    )
  }

  return (
    <Box component="main" className="p-6">
      {/* Header */}
      <div className="mb-8">
        <Typography variant="h4" className="text-gray-800 font-bold mb-2">
          Dashboard Overview
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Real-time statistics and system monitoring for UniBot
        </Typography>
      </div>

      {/* Stats Grid */}
      <Grid container spacing={3} className="mb-8">
        {statsData.map((stat, index) => (
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
                    <Typography variant="caption" className="text-gray-500">
                      {stat.subtitle}
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
        {institutions.length > 0 ? (
          <div className="space-y-4">
            {getRecentActivity().map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Chip
                    label={activity.status === 'success' ? 'New' : 'Updated'}
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
                      {activity.action}: {activity.item}
                    </Typography>
                    <Typography variant="caption" className="text-gray-600">
                      {activity.description}
                    </Typography>
                  </div>
                </div>
                <Typography variant="caption" className="text-gray-500">
                  {activity.time}
                </Typography>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Typography variant="body2" className="text-gray-500">
              No recent activity. Create your first category to see activity
              here.
            </Typography>
          </div>
        )}
      </Paper>
    </Box>
  )
}
