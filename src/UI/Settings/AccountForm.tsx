'use client';
import React from 'react';
import { TextField, Button } from '@mui/material';

export default function AccountForm() {
    return (
        <form className="space-y-4">
            <TextField fullWidth label="Full Name" />
            <TextField fullWidth label="Email" disabled />
            <TextField fullWidth label="Phone" />
            <div className="flex gap-4 mt-6">
                <Button
                    variant="contained"
                    sx={{
                    backgroundColor: '#7e22ce', // Tailwind's bg-purple-700
                    '&:hover': {
                        backgroundColor: '#6b21a8' // Tailwind's bg-purple-800
                    },
                    color: '#fff',
                    paddingX: 3,
                    paddingY: 1.5,
                    borderRadius: '6px',
                    boxShadow: 'none'
                }}
                >
                    Save Changes
                </Button>
            </div>
        </form>
    );
}
