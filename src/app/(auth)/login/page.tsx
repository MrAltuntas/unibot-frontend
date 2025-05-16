'use client'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import LockIcon from '@mui/icons-material/Lock'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import useMutateApi from '@/Hooks/useMutateApi'
import { deleteCookie, setCookie } from 'cookies-next'
import { useAuth } from '@/context/AuthContext'

type TLoginForm = {
  email: string
  password: string
  rememberMe: boolean
}

const initialValues: TLoginForm = {
  email: '',
  password: '',
  rememberMe: false,
}

const LoginPage = () => {
  const { setUserData } = useAuth()

  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  })

  const [showPassword, setShowPassword] = useState(false)

  const [loginApi, loginApiLoading] = useMutateApi({
    apiPath: `/sessions/login`,
    method: 'POST',
  })

  const onSubmit = async (data: TLoginForm) => {
    deleteCookie('accessToken')
    deleteCookie('refreshToken')
    const loginApiResponse = await loginApi(data)
    if (loginApiResponse.error === null) {
      setCookie('accessToken', loginApiResponse.data.accessToken)
      setCookie('refreshToken', loginApiResponse.data.refreshToken)
      setUserData(loginApiResponse.data.user)
      router.push('/dashboard')
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
              Welcome back to your AI university assistant
            </Typography>
            <Typography variant="body1" className="text-white/80">
              Sign in to continue your journey with the most intelligent
              university assistant. Let UniBot help you achieve academic
              excellence.
            </Typography>
            <div className="mt-12 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <Typography
                variant="body1"
                className="text-white font-medium italic"
              >
                UniBot has transformed how I manage my university workload. The
                personalized support and intelligent features have made a real
                difference to my academic success.
              </Typography>
              <Typography variant="body2" className="text-white/70 mt-4">
                — Sarah Chen, Computer Science Student
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-8 rounded-full bg-white opacity-100"></div>
            <div className="h-1.5 w-3 rounded-full bg-white/30"></div>
            <div className="h-1.5 w-3 rounded-full bg-white/30"></div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-700/80 to-primary-900/95 z-0"></div>
        <Image
          src="/university-campus.png"
          alt="University campus"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
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
              Sign In
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              Enter your credentials to access your account
            </Typography>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-5"
            noValidate
          >
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
                  id="email-input"
                  label="Email Address"
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

            {/* Password Field */}
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required',
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="password-input"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  className="bg-white"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon className="text-gray-500" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          className="text-gray-600"
                          type="button"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
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

            <div className="flex justify-between items-center">
              {/* Remember Me Checkbox */}
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        id="remember-me-checkbox"
                        checked={field.value}
                        className="text-primary-600"
                      />
                    }
                    label={
                      <Typography variant="body2" className="text-gray-700">
                        Remember me
                      </Typography>
                    }
                  />
                )}
              />

              {/* Forgot Password Link */}
              <Link
                href="/forgot-password"
                className="text-primary-600 hover:text-primary-800 text-sm font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={loginApiLoading}
              className="mt-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              endIcon={<ArrowForwardIcon />}
            >
              Sign In
            </Button>

            <Divider className="my-6">
              <Typography variant="body2" className="text-gray-500 px-2">
                OR
              </Typography>
            </Divider>

            {/* Register Link */}
            <div className="text-center">
              <Link
                href="/register"
                className="text-primary-600 hover:text-primary-800 font-medium"
              >
                <Typography variant="body2" className="text-gray-600">
                  Dont have an account? Create an account
                </Typography>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
