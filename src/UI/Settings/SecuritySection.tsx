'use client';
import React from 'react';
import { TextField, Button } from '@mui/material';

export default function SecuritySection() {
    return (
        <form className="space-y-4">
            <TextField fullWidth label="Current Password" type="password" />
            <TextField fullWidth label="New Password" type="password" />
            <TextField fullWidth label="Confirm Password" type="password" />
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

                    Change Password
                </Button></div>
        </form>
    );
}
