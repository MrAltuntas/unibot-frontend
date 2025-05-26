'use client'
import { useState } from 'react'
import { Tabs, Tab, Box, Typography, Divider } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SchoolIcon from '@mui/icons-material/School'
import InfoIcon from '@mui/icons-material/Info'
import { AccountForm, InstitutionForm, SecuritySection } from '@/UI'

export default function SettingsPage() {
  const [tab, setTab] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  return (
    <div className="mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <Typography variant="h4" className="mb-4">
        User Settings
      </Typography>

      <Tabs
        value={tab}
        onChange={handleTabChange}
        TabIndicatorProps={{ style: { backgroundColor: '#7e22ce' } }} // Purple underline
        textColor="inherit"
        className="border-b border-gray-200"
      >
        <Tab
          icon={<AccountCircleIcon />}
          iconPosition="start"
          label="ACCOUNT"
          className={`${tab === 0 ? 'text-purple-700 font-bold' : 'text-gray-500'}`}
        />
        <Tab
          icon={<SchoolIcon />}
          iconPosition="start"
          label="INSTITUTION"
          className={`${tab === 1 ? 'text-purple-700 font-bold' : 'text-gray-500'}`}
        />
        <Tab
          icon={<InfoIcon />}
          iconPosition="start"
          label="SECURITY"
          className={`${tab === 2 ? 'text-purple-700 font-bold' : 'text-gray-500'}`}
        />
      </Tabs>

      <Divider className="my-4" />

      <Box hidden={tab !== 0}>
        <AccountForm />
      </Box>
      <Box hidden={tab !== 1}>
        <InstitutionForm />
      </Box>
      <Box hidden={tab !== 2}>
        <SecuritySection />
      </Box>
    </div>
  )
}
