'use client'
import { createTheme } from '@mui/material/styles'
import GlobalColors from './GlobalColors'

const createAppTheme = (mode: 'light' | 'dark') =>
  createTheme({
    cssVariables: true,
    palette: {
      mode,
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
      background: {
        default: mode === 'dark' ? '#0f172a' : '#f9fafb',
        paper: mode === 'dark' ? '#1e293b' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#f1f5f9' : '#111827',
        secondary: mode === 'dark' ? '#94a3b8' : '#6b7280',
      },
      grey: {
        50: mode === 'dark' ? '#1e293b' : GlobalColors.gray[50],
        100: mode === 'dark' ? '#334155' : GlobalColors.gray[100],
        200: mode === 'dark' ? '#475569' : GlobalColors.gray[200],
        300: mode === 'dark' ? '#64748b' : GlobalColors.gray[300],
        400: mode === 'dark' ? '#94a3b8' : GlobalColors.gray[400],
        500: mode === 'dark' ? '#cbd5e1' : GlobalColors.gray[500],
        600: mode === 'dark' ? '#e2e8f0' : GlobalColors.gray[600],
        700: mode === 'dark' ? '#f1f5f9' : GlobalColors.gray[700],
        800: mode === 'dark' ? '#f8fafc' : GlobalColors.gray[800],
        900: mode === 'dark' ? '#ffffff' : GlobalColors.gray[900],
        A100: GlobalColors.gray[100],
        A200: GlobalColors.gray[200],
        A400: GlobalColors.gray[400],
        A700: GlobalColors.gray[700],
      },
    },
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
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: mode === 'dark' ? '#0f172a' : '#f9fafb',
            color: mode === 'dark' ? '#f1f5f9' : '#111827',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#1e293b' : '#ffffff',
            color: mode === 'dark' ? '#f1f5f9' : '#111827',
            borderBottom: `1px solid ${mode === 'dark' ? '#334155' : '#e5e7eb'}`,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === 'dark' ? '#0f172a' : '#1e293b',
            borderRight: `1px solid ${mode === 'dark' ? '#334155' : 'transparent'}`,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#1e293b' : '#ffffff',
            borderRadius: '8px',
            boxShadow:
              mode === 'dark'
                ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
                : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: mode === 'dark' ? '1px solid #334155' : 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#1e293b' : '#ffffff',
            borderRadius: '8px',
            border: mode === 'dark' ? '1px solid #334155' : 'none',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            // Only apply dark styles for dashboard pages
            '&.dashboard-textfield': {
              '& .MuiInputBase-input': {
                paddingLeft: '15px',
                color: mode === 'dark' ? '#f1f5f9' : '#111827',
              },
              '& .MuiInputLabel-root': {
                color: mode === 'dark' ? '#94a3b8' : '#6b7280',
              },
              '& .MuiOutlinedInput-root': {
                backgroundColor: mode === 'dark' ? '#334155' : '#ffffff',
                '& fieldset': {
                  borderColor: mode === 'dark' ? '#475569' : '#d1d5db',
                },
                '&:hover fieldset': {
                  borderColor: GlobalColors.primary[500],
                },
                '&.Mui-focused fieldset': {
                  borderColor: GlobalColors.primary[500],
                },
              },
            },
            // Default light styling for all other TextFields (auth pages)
            '&:not(.dashboard-textfield)': {
              '& .MuiInputBase-input': {
                paddingLeft: '15px',
                color: '#111827',
              },
              '& .MuiInputLabel-root': {
                color: '#6b7280',
              },
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#ffffff',
                '& fieldset': {
                  borderColor: '#d1d5db',
                },
                '&:hover fieldset': {
                  borderColor: GlobalColors.primary[500],
                },
                '&.Mui-focused fieldset': {
                  borderColor: GlobalColors.primary[500],
                },
              },
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
          outlined: {
            borderColor: mode === 'dark' ? '#475569' : '#d1d5db',
            color: mode === 'dark' ? '#f1f5f9' : '#374151',
            '&:hover': {
              borderColor: GlobalColors.primary[500],
              backgroundColor: mode === 'dark' ? '#334155' : '#f3f4f6',
            },
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === 'dark' ? '#1e293b' : '#ffffff',
            border: `1px solid ${mode === 'dark' ? '#334155' : '#e5e7eb'}`,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#f1f5f9' : '#374151',
            '&:hover': {
              backgroundColor: mode === 'dark' ? '#334155' : '#f9fafb',
            },
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#f1f5f9' : '#e2e8f0',
          },
        },
      },
    },
  })

export default createAppTheme
