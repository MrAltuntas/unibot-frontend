'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import useQueryApi from '@/Hooks/useQueryApi'
import useMutateApi from '@/Hooks/useMutateApi'
import { TextField, Button, Typography, InputAdornment } from '@mui/material'
import CategoryIcon from '@mui/icons-material/Category'
import CodeIcon from '@mui/icons-material/Code'
import MessageIcon from '@mui/icons-material/Message'
import DescriptionIcon from '@mui/icons-material/Description'
import BusinessIcon from '@mui/icons-material/Business'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form'

// Reuse the same form type
export type TCategoryForm = {
    name: string
    description?: string
    syspromet: string
    data: string
    institutionId: string
}

const initialValues: TCategoryForm = {
    name: '', description: '', syspromet: '', data: '', institutionId: ''
}

export default function EditCategoryPage() {
    const router = useRouter()
    const params = useParams()
    const rawId = params?.id
    const id = Array.isArray(rawId) ? rawId[0] : rawId

    const [loadCategory, loadingCategory, categoryData] = useQueryApi({
        apiPath: id ? `/api/v1/categories/${id}` : ''
    })
    const [updateCategory, updatingCategory] = useMutateApi({
        apiPath: id ? `/api/v1/categories/${id}` : '',
        method: 'PUT'
    })

    const { control, handleSubmit, reset, formState: { errors } } = useForm<TCategoryForm>({ defaultValues: initialValues })

    // Load category when id changes
    useEffect(() => {
        if (id) loadCategory()
    }, [id, loadCategory])

    // When data arrives, reset form
    useEffect(() => {
        if (categoryData) reset(categoryData)
    }, [categoryData, reset])

    const onSubmit = async (data: TCategoryForm) => {
        if (!id) return
        const result = await updateCategory(data)
        if (!result.error) router.push('/categories')
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
            {/* Left Branding Column */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-primary-900">
                <div className="absolute inset-0 z-10 flex flex-col justify-between p-12">
                    <Typography variant="h4" className="text-white font-bold">UniBot</Typography>
                    <div className="max-w-md">
                        <Typography variant="h3" className="text-white font-bold mb-6">Edit Category</Typography>
                        <Typography variant="body1" className="text-white/80">
                            Modify the details of your existing chatbot category.
                        </Typography>
                        <div className="mt-12 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                            <Typography variant="body1" className="text-white font-medium italic">
                                &ldquo;Keeping categories up-to-date ensures accurate responses from the chatbot.&rdquo;
                            </Typography>
                            <Typography variant="body2" className="text-white/70 mt-4">— Chatbot Admin</Typography>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-8 rounded-full bg-white/30"></div>
                        <div className="h-1.5 w-8 rounded-full bg-white opacity-100"></div>
                        <div className="h-1.5 w-3 rounded-full bg-white/30"></div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-primary-700/80 to-primary-900/95 z-0"></div>
                <Image src="/university-campus.png" alt="Chatbot" fill style={{ objectFit: 'cover' }} className="mix-blend-overlay opacity-50" priority />
            </div>

            {/* Right Form Column */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-0">
                <div className="w-full max-w-md p-8 lg:p-12">
                    <div className="mb-10">
                    <Typography variant="body1" className="text-gray-600 mb-6">Update the fields below and save your changes.</Typography>
                    </div>

                    {(loadingCategory) ? (
                        <Typography>Loading category data...</Typography>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
                            <Controller name="name" control={control} rules={{ required: 'Category name is required' }} render={({ field }) => (
                                <TextField {...field} label="Category Name" fullWidth error={!!errors.name} helperText={errors.name?.message} className="bg-white" InputProps={{ startAdornment: (<InputAdornment position="start"><CategoryIcon className="text-gray-500" /></InputAdornment>) }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                            )} />
                            <Controller name="syspromet" control={control} rules={{ required: 'Syspromet is required' }} render={({ field }) => (
                                <TextField {...field} label="Syspromet" fullWidth error={!!errors.syspromet} helperText={errors.syspromet?.message} className="bg-white" InputProps={{ startAdornment: (<InputAdornment position="start"><CodeIcon className="text-gray-500" /></InputAdornment>) }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                            )} />
                            <Controller name="data" control={control} rules={{ required: 'Data is required' }} render={({ field }) => (
                                <TextField {...field} label="Data" fullWidth multiline rows={3} error={!!errors.data} helperText={errors.data?.message} className="bg-white" InputProps={{ startAdornment: (<InputAdornment position="start"><MessageIcon className="text-gray-500" /></InputAdornment>) }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                            )} />
                            <Controller name="description" control={control} render={({ field }) => (
                                <TextField {...field} label="Description" fullWidth className="bg-white" InputProps={{ startAdornment: (<InputAdornment position="start"><DescriptionIcon className="text-gray-500" /></InputAdornment>) }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                            )} />
                            <Controller name="institutionId" control={control} rules={{ required: 'Institution ID is required' }} render={({ field }) => (
                                <TextField {...field} label="Institution ID" fullWidth error={!!errors.institutionId} helperText={errors.institutionId?.message} className="bg-white" InputProps={{ startAdornment: (<InputAdornment position="start"><BusinessIcon className="text-gray-500" /></InputAdornment>) }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                            )} />

                            <Button type="submit" variant="contained" fullWidth size="large" disabled={updatingCategory} className="mt-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200" endIcon={<ArrowForwardIcon />}>Update Category</Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
