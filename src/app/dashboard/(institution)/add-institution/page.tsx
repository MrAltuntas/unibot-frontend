'use client'
import { useForm, Controller } from 'react-hook-form'
import {
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  InputAdornment,
} from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import DescriptionIcon from '@mui/icons-material/Description'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import LanguageIcon from '@mui/icons-material/Language'
import DataObjectIcon from '@mui/icons-material/DataObject'
import useMutateApi from '@/Hooks/useMutateApi'
import { useRouter } from 'next/navigation'

type TAddInstitutionForm = {
  title: string
  description: string
  systemPrompt: string
  data: string
  url: string
}

const initialValues: TAddInstitutionForm = {
  title: '',
  description: '',
  systemPrompt: '',
  data: '',
  url: '',
}

const AddInstitution = () => {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  })

  const [addInstitutions, institutionsLoading] = useMutateApi({
    apiPath: `/category/add-category`,
    method: 'POST',
  })

  const onSubmit = async (data: TAddInstitutionForm) => {
    const addInstitutionResponse = await addInstitutions(data)

    if (addInstitutionResponse.error === null) {
      router.push('/dashboard/institutions')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <Paper className="w-full max-w-md p-8 shadow-lg rounded-lg">
        <div className="text-center mb-8">
          <Typography variant="h4" className="text-primary-700 font-bold mb-2">
            Add Category
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            Create a new category for chatbot
          </Typography>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-6"
        >
          <Controller
            name="title"
            control={control}
            rules={{
              required: 'Title is required',
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
                      <SchoolIcon className="text-gray-500" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

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
                rows={4}
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
              />
            )}
          />

          <Controller
            name="systemPrompt"
            control={control}
            rules={{
              required: 'System prompt is required',
              minLength: {
                value: 20,
                message: 'System prompt must be at least 20 characters',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="System Prompt"
                variant="outlined"
                fullWidth
                multiline
                rows={6}
                error={!!errors.systemPrompt}
                helperText={errors.systemPrompt?.message}
                className="bg-white"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SmartToyIcon className="text-gray-500" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="data"
            control={control}
            rules={{
              required: 'Data is required',
              minLength: {
                value: 10,
                message: 'Data must be at least 10 characters',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Category Data"
                variant="outlined"
                fullWidth
                multiline
                rows={5}
                error={!!errors.data}
                helperText={errors.data?.message}
                className="bg-white"
                placeholder="Enter additional category data or content..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DataObjectIcon className="text-gray-500" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="url"
            control={control}
            rules={{
              required: 'URL is required',
              pattern: {
                value:
                  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: 'Please enter a valid URL',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Website URL"
                variant="outlined"
                fullWidth
                error={!!errors.url}
                helperText={errors.url?.message}
                className="bg-white"
                placeholder="https://example.com"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LanguageIcon className="text-gray-500" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={institutionsLoading}
            className="bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
          >
            {institutionsLoading ? 'Adding Institution...' : 'Add Institution'}
          </Button>
        </form>
      </Paper>
    </div>
  )
}

export default AddInstitution
