'use client'

import { Controller, useForm } from 'react-hook-form'
import { TextField, Button } from '@mui/material'
import { useEffect } from 'react'

export type TCategoryForm = {
    name: string
    description?: string
    syspromet: string
    data: string
    institutionId: string
}

interface CategoryFormProps {
    initialValues?: TCategoryForm
    onSubmitAction: (data: TCategoryForm) => void
    loading: boolean
    submitText?: string
}

export default function CategoryForm({
                                         initialValues,
                                         onSubmitAction,
                                         loading,
                                         submitText = 'Submit',
                                     }: CategoryFormProps) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TCategoryForm>({
        defaultValues: initialValues || {
            name: '',
            syspromet: '',
            data: '',
            description: '',
            institutionId: '',
        },
    })

    useEffect(() => {
        if (initialValues) {
            reset(initialValues)
        }
    }, [initialValues, reset])

    return (
        <form onSubmit={handleSubmit(onSubmitAction)} className="flex flex-col gap-4">
            <Controller
                name="name"
                control={control}
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Category Name"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        className="bg-white"
                    />
                )}
            />

            <Controller
                name="syspromet"
                control={control}
                rules={{ required: 'Syspromet is required' }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Syspromet"
                        fullWidth
                        error={!!errors.syspromet}
                        helperText={errors.syspromet?.message}
                        className="bg-white"
                    />
                )}
            />

            <Controller
                name="data"
                control={control}
                rules={{ required: 'Data is required' }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Data"
                        fullWidth
                        multiline
                        rows={3}
                        error={!!errors.data}
                        helperText={errors.data?.message}
                        className="bg-white"
                    />
                )}
            />

            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Description"
                        fullWidth
                        className="bg-white"
                    />
                )}
            />

            <Controller
                name="institutionId"
                control={control}
                rules={{ required: 'Institution ID is required' }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Institution ID"
                        fullWidth
                        error={!!errors.institutionId}
                        helperText={errors.institutionId?.message}
                        className="bg-white"
                    />
                )}
            />

            <Button
                type="submit"
                variant="contained"
                disabled={loading}
                className="mt-2 py-3 rounded-xl shadow-md hover:shadow-lg bg-purple-700 text-white"
            >
                {submitText}
            </Button>
        </form>
    )
}
