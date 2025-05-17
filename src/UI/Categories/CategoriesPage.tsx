'use client'

import { useState } from 'react'
import { Tabs, Tab, Box, Typography, Divider } from '@mui/material'
import CategoryIcon from '@mui/icons-material/Category'
import AddBoxIcon from '@mui/icons-material/AddBox'
import EditNoteIcon from '@mui/icons-material/EditNote'
import CategoryListPage from './CategoryListPage'
import AddCategoryPage from './AddCategoryPage'
import EditCategoryPage from './EditCategoryPage'

export default function CategoriesPage() {
    const [tab, setTab] = useState(0)

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue)
    }

    return (
        <div className="mx-auto mt-10 bg-white p-6 rounded-xl shadow">
            <Typography variant="h4" className="mb-4">
                Category Management
            </Typography>

            <Tabs
                value={tab}
                onChange={handleTabChange}
                TabIndicatorProps={{ style: { backgroundColor: '#7e22ce' } }}
                textColor="inherit"
                className="border-b border-gray-200"
            >
                <Tab
                    icon={<CategoryIcon />}
                    iconPosition="start"
                    label="LIST"
                    className={`${tab === 0 ? 'text-purple-700 font-bold' : 'text-gray-500'}`}
                />
                <Tab
                    icon={<AddBoxIcon />}
                    iconPosition="start"
                    label="ADD"
                    className={`${tab === 1 ? 'text-purple-700 font-bold' : 'text-gray-500'}`}
                />
                <Tab
                    icon={<EditNoteIcon />}
                    iconPosition="start"
                    label="EDIT"
                    className={`${tab === 2 ? 'text-purple-700 font-bold' : 'text-gray-500'}`}
                />
            </Tabs>

            <Divider className="my-4" />

            <Box hidden={tab !== 0}>
                <CategoryListPage />
            </Box>
            <Box hidden={tab !== 1}>
                <AddCategoryPage />
            </Box>
            <Box hidden={tab !== 2}>
                <EditCategoryPage />
            </Box>
        </div>
    )
}
