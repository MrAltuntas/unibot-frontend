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
} from '@mui/material'
import Link from 'next/link'

const Institutions = () => {
  const [institutions, setInstitutions] = useState<any[]>([])

  const [getInstitutions, institutionsLoading] = useMutateApi({
    apiPath: `/institution/get-institutions`,
    method: 'GET',
  })

  const fetchData = async () => {
    const getInstitutionsResponse = await getInstitutions({})

    if (getInstitutionsResponse.error === null) {
      setInstitutions(getInstitutionsResponse.data)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <div className="flex justify-end p-6 pb-0">
        <Link href={'/dashboard/add-institution'}>
          <Button
            variant="contained"
            className="bg-primary-600 hover:bg-primary-700"
          >
            Add Category
          </Button>
        </Link>
      </div>

      <Grid container spacing={3} className="p-6">
        {institutions.map((institution) => {
          return (
            <Grid size={4} key={institution._id}>
              <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <Typography
                      variant="h6"
                      className="font-bold text-gray-800"
                    >
                      {institution.title}
                    </Typography>
                    <Chip
                      label="Active"
                      size="small"
                      className="bg-green-100 text-green-800"
                    />
                  </div>

                  <Typography variant="body2" className="text-gray-600 mb-3">
                    {institution.description}
                  </Typography>

                  <div className="space-y-2">
                    <Typography variant="body2" className="text-gray-600">
                      <strong>System Prompt:</strong> {institution.systemPrompt}
                    </Typography>

                    <Typography variant="body2" className="text-gray-600">
                      <strong>Website:</strong> {institution.url}
                    </Typography>
                  </div>
                </CardContent>

                <CardActions className="p-4 pt-0 flex justify-between">
                  <Button
                    variant="contained"
                    size="small"
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
          )
        })}
      </Grid>
    </div>
  )
}

export default Institutions
