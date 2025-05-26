'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useQueryApi from '@/Hooks/useQueryApi'
import useMutateApi from '@/Hooks/useMutateApi'
import {
    Typography,
    Button,
    IconButton,
    CircularProgress,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Image from 'next/image'

export default function CategoryListPage() {
    const router = useRouter()

    // Destructure tuple from useQueryApi
    const [fetchCategories, loading, categories] = useQueryApi({
        apiPath: '/api/v1/categories',
    })
    const [deleteCategory, deleting] = useMutateApi({
        apiPath: '/api/v1/categories',
        method: 'DELETE',
    })

    // Fetch on mount
    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return
        const result = await deleteCategory({}, id)
        if (!result.error) fetchCategories()
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
            {/* Left Branding Column */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-primary-900">
                <div className="absolute inset-0 z-10 flex flex-col justify-between p-12">
                    <Typography variant="h4" className="text-white font-bold">
                        UniBot
                    </Typography>
                    <div className="max-w-md">
                        <Typography variant="h3" className="text-white font-bold mb-6">
                            Categories
                        </Typography>
                        <Typography variant="body1" className="text-white/80">
                            View, edit, or delete your chatbot categories to keep your bot
                            organized and efficient.
                        </Typography>
                        <div className="mt-12 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                            <Typography
                                variant="body1"
                                className="text-white font-medium italic"
                            >
                                &ldquo;Regularly reviewing categories ensures our chatbot
                                stays relevant.&rdquo;
                            </Typography>
                            <Typography variant="body2" className="text-white/70 mt-4">
                                — Chatbot Admin
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-8 rounded-full bg-white/30"></div>
                        <div className="h-1.5 w-8 rounded-full bg-white opacity-100"></div>
                        <div className="h-1.5 w-3 rounded-full bg-white/30"></div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-primary-700/80 to-primary-900/95 z-0"></div>
                <Image
                    src="/university-campus.png"
                    alt="Chatbot Categories"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="mix-blend-overlay opacity-50"
                    priority
                />
            </div>

            {/* Right Content Column */}
            <div className="flex-1 flex flex-col p-6 lg:p-0">
                <div className="w-full max-w-4xl mx-auto p-8 lg:p-12">
                    <div className="flex justify-between items-center mb-6">
                        <Typography variant="body1" className="text-gray-600">
                            Manage your chatbot categories below.
                        </Typography>
                    </div>

                    <div className="bg-white rounded-xl shadow overflow-x-auto">
                        <table className="w-full table-fixed">
                            <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Syspromet</th>
                                <th className="py-3 px-4">Institution</th>
                                <th className="py-3 px-4">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="py-10 text-center">
                                        <CircularProgress />
                                    </td>
                                </tr>
                            ) : categories && categories.length > 0 ? (
                                categories.map((cat: any) => (
                                    <tr key={cat._id} className="border-t">
                                        <td className="py-2 px-4 font-medium">{cat.name}</td>
                                        <td className="py-2 px-4">{cat.syspromet}</td>
                                        <td className="py-2 px-4 text-sm text-gray-500">
                                            {cat.institutionId}
                                        </td>
                                        <td className="py-2 px-4 flex items-center gap-2">
                                            <IconButton
                                                aria-label="edit"
                                                onClick={() =>
                                                    router.push(
                                                        `/categories/edit/${cat._id}`
                                                    )
                                                }
                                            >
                                                <EditIcon className="text-purple-700" />
                                            </IconButton>
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => handleDelete(cat._id)}
                                                disabled={deleting}
                                            >
                                                <DeleteIcon className="text-red-500" />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-10 text-center text-gray-500">
                                        No categories found. Click “Add” to create one.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
