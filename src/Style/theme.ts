'use client';
import { createTheme } from '@mui/material/styles';
import GlobalColors from "./GlobalColors";


const theme = createTheme({
    cssVariables: true,
    typography: {
        fontFamily: 'var(--font-roboto)',
        
        h1: { fontFamily: 'var(--font-roboto)' },
        h2: { fontFamily: 'var(--font-roboto)' },
        h3: { fontFamily: 'var(--font-roboto)' },
        h4: { fontFamily: 'var(--font-roboto)' },
        h5: { fontFamily: 'var(--font-roboto)' },
        h6: { fontFamily: 'var(--font-roboto)' },
        subtitle1: { fontFamily: 'var(--font-roboto)' },
        subtitle2: { fontFamily: 'var(--font-roboto)' },
        body1: { fontFamily: 'var(--font-roboto)' },
        body2: { fontFamily: 'var(--font-roboto)' },
        button: { fontFamily: 'var(--font-roboto)' },
        caption: { fontFamily: 'var(--font-roboto)' },
        overline: { fontFamily: 'var(--font-roboto)' },
    },
    palette: {
        primary: {
            main: GlobalColors.primary[500],
            light: GlobalColors.primary[300],
            dark: GlobalColors.primary[700],
            contrastText: GlobalColors.common.white,
        },
        secondary: {
            main: GlobalColors.secondary[500],
            light: GlobalColors.secondary[300],
            dark: GlobalColors.secondary[700],
            contrastText: GlobalColors.common.white,
        },
        error: {
            main: GlobalColors.error[500],
            light: GlobalColors.error[300],
            dark: GlobalColors.error[700],
            contrastText: GlobalColors.common.white,
        },
        warning: {
            main: GlobalColors.warning[500],
            light: GlobalColors.warning[300],
            dark: GlobalColors.warning[700],
            contrastText: GlobalColors.common.white,
        },
        info: {
            main: GlobalColors.info[500],
            light: GlobalColors.info[300],
            dark: GlobalColors.info[700],
            contrastText: GlobalColors.common.white,
        },
        success: {
            main: GlobalColors.success[500],
            light: GlobalColors.success[300],
            dark: GlobalColors.success[700],
            contrastText: GlobalColors.common.white,
        },
        grey: {
            50: GlobalColors.gray[50],
            100: GlobalColors.gray[100],
            200: GlobalColors.gray[200],
            300: GlobalColors.gray[300],
            400: GlobalColors.gray[400],
            500: GlobalColors.gray[500],
            600: GlobalColors.gray[600],
            700: GlobalColors.gray[700],
            800: GlobalColors.gray[800],
            900: GlobalColors.gray[900],
            A100: GlobalColors.gray[100],
            A200: GlobalColors.gray[200],
            A400: GlobalColors.gray[400],
            A700: GlobalColors.gray[700],
        },
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: false,
            },
        },
        
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        paddingLeft: '15px',
                    },
                    '& .MuiInputLabel-root:not(.MuiInputLabel-shrink)': {
                        transform: 'translate(40px, 16px) scale(1)',
                    },
                    '& .MuiInputLabel-shrink': {
                        marginLeft: 0,
                    },
                    
                    '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active': {
                        WebkitBoxShadow: '0 0 0 1000px white inset',
                        WebkitTextFillColor: 'inherit',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                    
                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: GlobalColors.primary[500],
                    },
                    
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: GlobalColors.primary[500],
                    },
                },
            },
        },
        
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: '6px',
                },
                standardSuccess: {
                    backgroundColor: GlobalColors.success[50],
                    color: GlobalColors.success[900],
                    border: `1px solid ${GlobalColors.success[200]}`,
                    '& .MuiAlert-icon': {
                        color: GlobalColors.success[500],
                    },
                },
                standardError: {
                    backgroundColor: GlobalColors.error[50],
                    color: GlobalColors.error[900],
                    border: `1px solid ${GlobalColors.error[200]}`,
                    '& .MuiAlert-icon': {
                        color: GlobalColors.error[500],
                    },
                },
                standardWarning: {
                    backgroundColor: GlobalColors.warning[50],
                    color: GlobalColors.warning[900],
                    border: `1px solid ${GlobalColors.warning[200]}`,
                    '& .MuiAlert-icon': {
                        color: GlobalColors.warning[500],
                    },
                },
                standardInfo: {
                    backgroundColor: GlobalColors.info[50],
                    color: GlobalColors.info[900],
                    border: `1px solid ${GlobalColors.info[200]}`,
                    '& .MuiAlert-icon': {
                        color: GlobalColors.info[500],
                    },
                },
            },
        },
        
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '6px',
                    textTransform: 'none',
                    fontWeight: 500,
                    padding: '8px 16px',
                },
                containedPrimary: {
                    backgroundColor: GlobalColors.primary[600],
                    '&:hover': {
                        backgroundColor: GlobalColors.primary[700],
                    },
                },
                containedSecondary: {
                    backgroundColor: GlobalColors.secondary[600],
                    '&:hover': {
                        backgroundColor: GlobalColors.secondary[700],
                    },
                },
            },
        },
        
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                },
            },
        },
        
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                },
            },
        },
        
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: GlobalColors.gray[400],
                    '&.Mui-checked': {
                        color: GlobalColors.primary[500],
                    },
                },
            },
        },
        
        MuiDivider: {
            styleOverrides: {
                root: {
                    margin: '16px 0',
                },
            },
        },
    },
});

export default theme;