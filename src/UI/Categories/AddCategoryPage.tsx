'use client'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { TextField, Button, Typography, InputAdornment } from '@mui/material'
import CategoryIcon from '@mui/icons-material/Category'
import CodeIcon from '@mui/icons-material/Code'
import MessageIcon from '@mui/icons-material/Message'
import DescriptionIcon from '@mui/icons-material/Description'
import BusinessIcon from '@mui/icons-material/Business'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Image from 'next/image'
import useMutateApi from '@/Hooks/useMutateApi'

type TCategoryForm = {
    name: string
    description?: string
    syspromet: string
    data: string
    institutionId: string
}

const initialValues: TCategoryForm = {
    name: '',
    description: '',
    syspromet: '',
    data: '',
    institutionId: '',
}

export default function AddCategoryPage() {
    const router = useRouter()
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TCategoryForm>({ defaultValues: initialValues })

    const [addCategory, addCategoryLoading] = useMutateApi({
        apiPath: '/api/v1/categories',
        method: 'POST',
    })

    const onSubmit = async (formData: TCategoryForm) => {
        const response = await addCategory(formData)
        if (response.error === null) {
            router.push('/categories')
        }
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
            {/* Left Branding Column */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-primary-900">
                <div className="absolute inset-0 z-10 flex flex-col justify-between p-12">
                    <div>
                        <Typography variant="h4" className="text-white font-bold">
                            UniBot
                        </Typography>
                    </div>
                    <div className="max-w-md">
                        <Typography variant="h3" className="text-white font-bold mb-6">
                            Add Category
                        </Typography>
                        <Typography variant="body1" className="text-white/80">
                            Define a new category for your chatbot to improve organization
                            and tailor its responses.
                        </Typography>
                        <div className="mt-12 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                            <Typography
                                variant="body1"
                                className="text-white font-medium italic"
                            >
                                &ldquo;Adding this category helped us streamline our bot’s
                                conversational flow and boost user satisfaction.&rdquo;
                            </Typography>
                            <Typography variant="body2" className="text-white/70 mt-4">
                                — Product Team Lead
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
                    alt="Chatbot"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="mix-blend-overlay opacity-50"
                    priority
                />
            </div>

            {/* Right Form Column */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-0">
                <div className="w-full max-w-md p-8 lg:p-12">
                    <div className="mb-10">

                        <Typography variant="body1" className="text-gray-600">
                            Create a new chatbot category
                        </Typography>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
                        {/* Name Field */}
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: 'Category name is required' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Category Name"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    className="bg-white"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CategoryIcon className="text-gray-500" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                                />
                            )}
                        />

                        {/* Syspromet Field */}
                        <Controller
                            name="syspromet"
                            control={control}
                            rules={{ required: 'Syspromet is required' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Syspromet"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.syspromet}
                                    helperText={errors.syspromet?.message}
                                    className="bg-white"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CodeIcon className="text-gray-500" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                                />
                            )}
                        />

                        {/* Data Field */}
                        <Controller
                            name="data"
                            control={control}
                            rules={{ required: 'Data is required' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Data"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    error={!!errors.data}
                                    helperText={errors.data?.message}
                                    className="bg-white"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MessageIcon className="text-gray-500" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                                />
                            )}
                        />

                        {/* Description Field */}
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    className="bg-white"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <DescriptionIcon className="text-gray-500" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                                />
                            )}
                        />

                        {/* Institution ID Field */}
                        <Controller
                            name="institutionId"
                            control={control}
                            rules={{ required: 'Institution ID is required' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Institution ID"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.institutionId}
                                    helperText={errors.institutionId?.message}
                                    className="bg-white"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BusinessIcon className="text-gray-500" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                                />
                            )}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            disabled={addCategoryLoading}
                            className="mt-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                            endIcon={<ArrowForwardIcon />}
                        >
                            Add Category
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
