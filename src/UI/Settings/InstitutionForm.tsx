'use client'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { TextField, Button, Typography, InputAdornment } from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LinkIcon from '@mui/icons-material/Link'
import DescriptionIcon from '@mui/icons-material/Description'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Image from 'next/image'
import useMutateApi from '@/Hooks/useMutateApi'

type TInstitutionForm = {
  title: string
  description: string
  address: string
  url: string
  email: string
  phone: string
}

const initialValues: TInstitutionForm = {
  title: '',
  description: '',
  address: '',
  url: '',
  email: '',
  phone: '',
}

export default function AddInstitutionPage() {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  })

  const [addInstitution, addInstitutionLoading] = useMutateApi({
    apiPath: `/add-institution`,
    method: 'POST',
  })

  const onSubmit = async (data: TInstitutionForm) => {
    const addInstitutionResponse = await addInstitution(data)

    if (addInstitutionResponse.error === null) {
      // Navigate to institutions list or success page
      router.push('/institutions')
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
              Add Your Institution
            </Typography>
            <Typography variant="body1" className="text-white/80">
              Register your educational institution to make it available for
              students. Help students find and connect with your institution
              through UniBot.
            </Typography>
            <div className="mt-12 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <Typography
                variant="body1"
                className="text-white font-medium italic"
              >
                &ldquo;Adding our university to UniBot helped us reach more
                students and provide better support for their academic
                journey.&rdquo;
              </Typography>
              <Typography variant="body2" className="text-white/70 mt-4">
                — Dr. Sarah Wilson, University Administrator
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
          alt="University campus"
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
            <Typography variant="h4" className="text-gray-800 font-bold mb-2">
              Add Institution
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              Register your educational institution with UniBot
            </Typography>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-5"
          >
            {/* Institution Title Field */}
            <Controller
              name="title"
              control={control}
              rules={{
                required: 'Institution title is required',
                minLength: {
                  value: 2,
                  message: 'Title must be at least 2 characters',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Institution Title"
                  variant="outlined"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  className="bg-white"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon className="text-gray-500" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                    },
                  }}
                />
              )}
            />

            {/* Description Field */}
            <Controller
              name="description"
              control={control}
              rules={{
                required: 'Description is required',
                minLength: {
                  value: 10,
                  message: 'Description must be at least 10 characters',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  className="bg-white"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionIcon className="text-gray-500" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                    },
                  }}
                />
              )}
            />

            {/* Address Field */}
            <Controller
              name="address"
              control={control}
              rules={{
                required: 'Address is required',
                minLength: {
                  value: 5,
                  message: 'Address must be at least 5 characters',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  variant="outlined"
                  fullWidth
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  className="bg-white"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon className="text-gray-500" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                    },
                  }}
                />
              )}
            />

            {/* URL Field */}
            <Controller
              name="url"
              control={control}
              rules={{
                required: 'Institution URL is required',
                pattern: {
                  value:
                    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                  message: 'Please enter a valid URL',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Institution URL"
                  variant="outlined"
                  fullWidth
                  error={!!errors.url}
                  helperText={
                    errors.url?.message || 'e.g., https://university.edu'
                  }
                  className="bg-white"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkIcon className="text-gray-500" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                    },
                  }}
                />
              )}
            />

            {/* Email Field */}
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address format',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Institution Email"
                  variant="outlined"
                  fullWidth
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  className="bg-white"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon className="text-gray-500" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                    },
                  }}
                />
              )}
            />

            {/* Phone Field */}
            <Controller
              name="phone"
              control={control}
              rules={{
                required: 'Phone number is required',
                pattern: {
                  value: /^[\+]?[1-9][\d\-\(\)\s]+$/,
                  message: 'Please enter a valid phone number',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  className="bg-white"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon className="text-gray-500" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                    },
                  }}
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
              disabled={addInstitutionLoading}
              className="mt-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              endIcon={<ArrowForwardIcon />}
            >
              Add Institution
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
