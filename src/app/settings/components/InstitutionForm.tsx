'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import type { AlertColor } from '@mui/material';

type InstitutionFormData = {
    name: string;
    description: string;
    address: string;
    url: string;
    email: string;
    phone: string;
};

export default function InstitutionForm() {
    const [form, setForm] = useState<InstitutionFormData>({
        name: '',
        description: '',
        address: '',
        url: '',
        email: '',
        phone: ''
    });

    const [institutionId, setInstitutionId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{
        open: boolean;
        type: AlertColor;
        message: string;
    }>({
        open: false,
        type: 'success',
        message: ''
    });

    useEffect(() => {
        fetchInstitution();
    }, []);

    const fetchInstitution = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/institution'); // Replace or mock if needed
            if (data) {
                setForm(data);
                setInstitutionId(data._id);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (institutionId) {
                await axios.put(`/api/institution/${institutionId}`, form);
                setAlert({ open: true, type: 'success', message: 'Institution updated successfully.' });
            } else {
                const { data } = await axios.post('/api/institution', form);
                setInstitutionId(data._id);
                setAlert({ open: true, type: 'success', message: 'Institution created successfully.' });
            }
        } catch (err) {
            setAlert({ open: true, type: 'error', message: 'Failed to save institution data.' });
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setForm({
            name: '',
            description: '',
            address: '',
            url: '',
            email: '',
            phone: ''
        });
        setInstitutionId(null);
    };

    return (
        <div className="relative p-4">
            {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
                    <CircularProgress />
                </div>
            )}

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {Object.entries(form).map(([key, value]) => (
                    <TextField
                        key={key}
                        fullWidth
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        name={key}
                        value={value}
                        onChange={handleChange}
                        disabled={loading}
                    />
                ))}
            </form>

            <div className="flex gap-4 mt-6">
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#7e22ce',
                        '&:hover': {
                            backgroundColor: '#6b21a8'
                        },
                        color: '#fff',
                        paddingX: 3,
                        paddingY: 1.5,
                        borderRadius: '6px',
                        boxShadow: 'none'
                    }}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Save Changes
                </Button>

                <Button
                    variant="outlined"
                    sx={{
                        color: '#374151', // Tailwind's text-gray-700
                        borderColor: '#d1d5db', // Tailwind's border-gray-300
                        '&:hover': {
                            backgroundColor: '#f3f4f6' // Tailwind's bg-gray-100
                        },
                        paddingX: 3,
                        paddingY: 1.5,
                        borderRadius: '6px'
                    }}
                    onClick={handleReset}
                    disabled={loading}
                >
                    Reset
                </Button>

            </div>

            <Snackbar
                open={alert.open}
                autoHideDuration={4000}
                onClose={() => setAlert({ ...alert, open: false })}
            >
                <Alert severity={alert.type}>{alert.message}</Alert>
            </Snackbar>
        </div>
    );
}
