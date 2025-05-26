'use client'
import useMutateApi from '@/Hooks/useMutateApi'
import { useEffect, useState } from 'react'
import { Grid } from '@mui/system'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Tooltip,
  Snackbar,
  Alert,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
} from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { getCookie } from 'cookies-next'

const Institutions = () => {
  const [institutions, setInstitutions] = useState<any[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedInstitution, setSelectedInstitution] = useState<any>(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  })
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [menuInstitution, setMenuInstitution] = useState<any>(null)

  const router = useRouter()

  const [getInstitutions, institutionsLoading] = useMutateApi({
    apiPath: `/institution/get-institutions`,
    method: 'GET',
  })

  const [deleteInstitution, deleteLoading] = useMutateApi({
    apiPath: `/institution/delete-institution-by-id`,
    method: 'DELETE',
  })

  const fetchData = async () => {
    const getInstitutionsResponse = await getInstitutions({})

    if (getInstitutionsResponse.error === null) {
      setInstitutions(getInstitutionsResponse.data)
    }
  }

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    institution: any,
  ) => {
    setAnchorEl(event.currentTarget)
    setMenuInstitution(institution)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setMenuInstitution(null)
  }

  const handleDeleteClick = (institution: any) => {
    setSelectedInstitution(institution)
    setDeleteDialogOpen(true)
    handleMenuClose()
  }

  const handleDeleteConfirm = async () => {
    if (!selectedInstitution || deleteLoading) {
      return
    }

    try {
      const deleteResponse = await deleteInstitution(
        {},
        { id: selectedInstitution._id },
      )

      if (deleteResponse && deleteResponse.error === null) {
        setSnackbar({
          open: true,
          message: 'Category deleted successfully!',
          severity: 'success',
        })

        await fetchData()
      } else {
        setSnackbar({
          open: true,
          message:
            deleteResponse?.error ||
            'Failed to delete category. Please try again.',
          severity: 'error',
        })
      }
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: 'An unexpected error occurred while deleting the category.',
        severity: 'error',
      })
    }

    setDeleteDialogOpen(false)
    setSelectedInstitution(null)
  }

  const handleEditClick = (institution: any) => {
    router.push(`/dashboard/edit-institution/${institution._id}`)
    handleMenuClose()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Typography variant="h4" className="text-gray-800 font-bold mb-2">
            Institution Categories
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Manage your UniBot institution categories and configurations
          </Typography>
        </div>
        <Link href={'/dashboard/add-institution'}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            className="bg-primary-600 hover:bg-primary-700 shadow-md"
          >
            Add Category
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="shadow-sm border-l-4 border-primary-500">
          <CardContent className="p-4">
            <Typography variant="h6" className="text-primary-600 font-bold">
              {institutions.length}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Total Categories
            </Typography>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-success-500">
          <CardContent className="p-4">
            <Typography variant="h6" className="text-success-600 font-bold">
              {institutions.filter((inst) => inst.status === 'active').length ||
                institutions.length}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Active Categories
            </Typography>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-info-500">
          <CardContent className="p-4">
            <Typography variant="h6" className="text-info-600 font-bold">
              {institutions.reduce(
                (acc, inst) => acc + (inst.systemPrompt?.length || 0),
                0,
              )}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Total Prompt Characters
            </Typography>
          </CardContent>
        </Card>
      </div>

      {institutionsLoading && (
        <div className="flex justify-center items-center h-64">
          <Typography variant="body1" className="text-gray-500">
            Loading categories...
          </Typography>
        </div>
      )}

      {!institutionsLoading && institutions.length === 0 && (
        <Card className="shadow-sm">
          <CardContent className="text-center py-12">
            <Typography variant="h6" className="text-gray-600 mb-2">
              No categories found
            </Typography>
            <Typography variant="body2" className="text-gray-500 mb-4">
              Create your first institution category to get started
            </Typography>
            <Link href={'/dashboard/add-institution'}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                className="bg-primary-600 hover:bg-primary-700"
              >
                Add Your First Category
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <Grid container spacing={3}>
        {institutions.map((institution) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={institution._id}>
            <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="flex-grow p-6">
                <div className="flex items-start justify-between mb-4">
                  <Typography
                    variant="h6"
                    className="font-bold text-gray-800 line-clamp-2 flex-1"
                  >
                    {institution.title}
                  </Typography>
                  <div className="flex items-center gap-1">
                    <Chip
                      label="Active"
                      size="small"
                      className="bg-success-100 text-success-800"
                    />
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, institution)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </div>
                </div>

                <Typography
                  variant="body2"
                  className="text-gray-600 mb-4 line-clamp-3"
                >
                  {institution.description}
                </Typography>

                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <Typography
                      variant="caption"
                      className="text-gray-500 font-medium"
                    >
                      SYSTEM PROMPT
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-gray-700 mt-1 line-clamp-2"
                    >
                      {institution.systemPrompt}
                    </Typography>
                  </div>

                  <div className="flex items-center gap-2">
                    <Typography variant="caption" className="text-gray-500">
                      WEBSITE:
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-primary-600 hover:text-primary-800 cursor-pointer truncate"
                      onClick={() =>
                        window.open(
                          institution.url.startsWith('http')
                            ? institution.url
                            : `https://${institution.url}`,
                          '_blank',
                        )
                      }
                    >
                      {institution.url}
                    </Typography>
                  </div>
                </div>
              </CardContent>

              <CardActions className="p-4 pt-0 flex justify-between bg-gray-50">
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={() =>
                    window.open(
                      institution.url.startsWith('http')
                        ? institution.url
                        : `https://${institution.url}`,
                      '_blank',
                    )
                  }
                  className="bg-primary-600 hover:bg-primary-700"
                >
                  Visit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: { minWidth: 140 },
        }}
      >
        <MenuItem onClick={() => handleEditClick(menuInstitution)}>
          <EditIcon fontSize="small" className="mr-2" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => handleDeleteClick(menuInstitution)}
          className="text-error-600"
        >
          <DeleteIcon fontSize="small" className="mr-2" />
          Delete
        </MenuItem>
      </Menu>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="text-error-700">Delete Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete &ldquo;{selectedInstitution?.title}
            &rdquo;? This action cannot be undone and will permanently remove
            the category and its associated configuration.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="p-4">
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            className="text-gray-600"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            disabled={deleteLoading}
            className="bg-error-600 hover:bg-error-700"
          >
            {deleteLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Institutions
