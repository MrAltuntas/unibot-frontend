'use client'
import React, { useState, useEffect } from 'react'
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  CircularProgress,
  Divider,
  Chip,
  Badge,
  Menu,
  MenuItem,
  Button,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Collapse,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Add as AddIcon,
  Chat as ChatIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  NotificationsOutlined as NotificationsIcon,
  Person as PersonIcon,
  ExpandLess,
  ExpandMore,
  Analytics as AnalyticsIcon,
  Help as HelpIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const drawerWidth = 280
const miniDrawerWidth = 64

const menuItems = [
  {
    text: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    text: 'Institution Management',
    icon: <SchoolIcon />,
    children: [
      {
        text: 'View Categories',
        href: '/dashboard/institutions',
        icon: <SchoolIcon />,
      },
      {
        text: 'Add Category',
        href: '/dashboard/add-institution',
        icon: <AddIcon />,
      },
    ],
  },
  {
    text: 'Chatbot',
    href: '/chatbot',
    icon: <ChatIcon />,
    badge: 'New',
  },
  {
    text: 'Analytics',
    href: '/dashboard/analytics',
    icon: <AnalyticsIcon />,
  },
  {
    text: 'Settings',
    href: '/dashboard/settings',
    icon: <SettingsIcon />,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopOpen, setDesktopOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [notificationAnchor, setNotificationAnchor] =
    useState<null | HTMLElement>(null)
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean
  }>({
    'Institution Management': true,
  })
  const [darkMode, setDarkMode] = useState(false)

  const { userData, logout } = useAuth() // Make sure to destructure logout from useAuth

  // Add logout handler
  const handleLogout = async () => {
    try {
      console.log('🚪 Logging out user...')

      // Call the logout function from AuthContext
      await logout()

      // Close any open menus
      setAnchorEl(null)

      console.log('✅ Logout successful, redirecting...')

      // Redirect to login page
      window.location.href = '/login'
    } catch (error) {
      console.error('❌ Logout error:', error)
      // Even if logout fails, redirect to login
      window.location.href = '/login'
    }
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const pathname = usePathname()

  const getUserInitials = (firstName?: string, lastName?: string) => {
    if (!firstName || !lastName) return 'AU'
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const getFullName = (firstName?: string, lastName?: string) => {
    if (!firstName || !lastName) return 'Admin User'
    return `${firstName} ${lastName}`
  }

  const getUserRole = (role?: string) => {
    return role || 'Administrator'
  }

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen)
    } else {
      setDesktopOpen(!desktopOpen)
    }
  }

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget)
  }

  const handleExpandClick = (itemText: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemText]: !prev[itemText],
    }))
  }

  const isItemActive = (href: string) => {
    return (
      pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
    )
  }

  const currentDrawerWidth = isMobile
    ? drawerWidth
    : desktopOpen
      ? drawerWidth
      : miniDrawerWidth

  const SidebarContent = ({ isMinified = false }: { isMinified?: boolean }) => (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#1e293b',
      }}
    >
      {/* Logo/Brand Section */}
      <Box
        sx={{
          p: isMinified ? 1 : 3,
          borderBottom: '1px solid #334155',
          minHeight: 80,
        }}
      >
        {isMinified ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <SchoolIcon sx={{ color: 'white', fontSize: 16 }} />
            </div>
          </Box>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <SchoolIcon sx={{ color: 'white', fontSize: 20 }} />
            </div>
            <div>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                UniBot
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                Admin Dashboard
              </Typography>
            </div>
          </div>
        )}
      </Box>

      {/* User Profile Section */}
      {!isMinified && (
        <Box sx={{ p: 2 }}>
          <Card sx={{ bgcolor: '#334155', border: '1px solid #475569' }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <div className="flex items-center gap-3">
                <Avatar sx={{ width: 40, height: 40, bgcolor: '#3b82f6' }}>
                  {getUserInitials(userData?.firstName, userData?.lastName)}
                </Avatar>
                <div className="flex-1 min-w-0">
                  <Typography
                    variant="subtitle2"
                    sx={{ color: 'white', fontWeight: 500 }}
                    title={getFullName(userData?.firstName, userData?.lastName)}
                  >
                    {getFullName(userData?.firstName, userData?.lastName)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    {getUserRole(userData?.role)}
                  </Typography>
                </div>
                <Chip
                  label="Online"
                  size="small"
                  sx={{
                    bgcolor: '#10b981',
                    color: 'white',
                    fontSize: '0.7rem',
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Navigation Menu - Scrollable */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: isMinified ? 1 : 2, pb: 2 }}>
        {!isMinified && (
          <Typography
            variant="overline"
            sx={{
              color: '#64748b',
              px: 1,
              mb: 1,
              display: 'block',
              fontSize: '0.7rem',
            }}
          >
            NAVIGATION
          </Typography>
        )}
        <List sx={{ py: 0 }}>
          {menuItems.map((item) => (
            <React.Fragment key={item.text}>
              {item.children && !isMinified ? (
                <>
                  <ListItem
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      cursor: 'pointer',
                      bgcolor: expandedItems[item.text]
                        ? '#475569'
                        : 'transparent',
                      '&:hover': { bgcolor: '#475569' },
                      transition: 'all 0.2s ease-in-out',
                    }}
                    onClick={() => handleExpandClick(item.text)}
                  >
                    <ListItemIcon sx={{ color: '#cbd5e1', minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        '& .MuiTypography-root': {
                          color: '#e2e8f0',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                        },
                      }}
                    />
                    {expandedItems[item.text] ? (
                      <ExpandLess sx={{ color: '#cbd5e1' }} />
                    ) : (
                      <ExpandMore sx={{ color: '#cbd5e1' }} />
                    )}
                  </ListItem>
                  <Collapse
                    in={expandedItems[item.text]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List sx={{ pl: 2, py: 0 }}>
                      {item.children.map((child) => (
                        <Link
                          href={child.href}
                          key={child.text}
                          style={{ textDecoration: 'none' }}
                        >
                          <ListItem
                            sx={{
                              borderRadius: 1.5,
                              mb: 0.5,
                              bgcolor: isItemActive(child.href)
                                ? '#3b82f6'
                                : 'transparent',
                              '&:hover': {
                                bgcolor: isItemActive(child.href)
                                  ? '#3b82f6'
                                  : '#475569',
                              },
                              transition: 'all 0.2s ease-in-out',
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                color: isItemActive(child.href)
                                  ? 'white'
                                  : '#94a3b8',
                                minWidth: 36,
                              }}
                            >
                              {child.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={child.text}
                              sx={{
                                '& .MuiTypography-root': {
                                  color: isItemActive(child.href)
                                    ? 'white'
                                    : '#cbd5e1',
                                  fontSize: '0.8rem',
                                  fontWeight: isItemActive(child.href)
                                    ? 600
                                    : 400,
                                },
                              }}
                            />
                          </ListItem>
                        </Link>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <Link
                  href={item.href || '#'}
                  key={item.text}
                  style={{ textDecoration: 'none' }}
                >
                  <ListItem
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      bgcolor: isItemActive(item.href || '')
                        ? '#3b82f6'
                        : 'transparent',
                      '&:hover': {
                        bgcolor: isItemActive(item.href || '')
                          ? '#3b82f6'
                          : '#475569',
                      },
                      transition: 'all 0.2s ease-in-out',
                      justifyContent: isMinified ? 'center' : 'flex-start',
                      px: isMinified ? 1 : 2,
                    }}
                    title={isMinified ? item.text : undefined}
                  >
                    <ListItemIcon
                      sx={{
                        color: isItemActive(item.href || '')
                          ? 'white'
                          : '#cbd5e1',
                        minWidth: isMinified ? 'auto' : 40,
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!isMinified && (
                      <>
                        <ListItemText
                          primary={item.text}
                          sx={{
                            '& .MuiTypography-root': {
                              color: isItemActive(item.href || '')
                                ? 'white'
                                : '#e2e8f0',
                              fontSize: '0.875rem',
                              fontWeight: isItemActive(item.href || '')
                                ? 600
                                : 500,
                            },
                          }}
                        />
                        {item.badge && (
                          <Chip
                            label={item.badge}
                            size="small"
                            sx={{
                              bgcolor: '#f59e0b',
                              color: 'white',
                              fontSize: '0.7rem',
                            }}
                          />
                        )}
                      </>
                    )}
                  </ListItem>
                </Link>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Bottom Section - Fixed */}
      {!isMinified && (
        <Box sx={{ borderTop: '1px solid #475569', p: 2 }}>
          <Button
            fullWidth
            startIcon={<HelpIcon />}
            sx={{
              color: '#cbd5e1',
              justifyContent: 'flex-start',
              textTransform: 'none',
              mb: 1,
              '&:hover': { bgcolor: '#475569' },
            }}
          >
            Help & Support
          </Button>
          <Button
            fullWidth
            startIcon={<LogoutIcon />}
            onClick={handleLogout} // Add onClick handler
            sx={{
              color: '#f87171',
              justifyContent: 'flex-start',
              textTransform: 'none',
              '&:hover': { bgcolor: '#dc2626', color: 'white' },
            }}
          >
            Logout
          </Button>
        </Box>
      )}
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />

      {/* Top App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: {
            xs: '100%',
            md: desktopOpen
              ? `calc(100% - ${drawerWidth}px)`
              : `calc(100% - ${miniDrawerWidth}px)`,
          },
          ml: {
            xs: 0,
            md: desktopOpen ? `${drawerWidth}px` : `${miniDrawerWidth}px`,
          },
          bgcolor: 'white',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
          borderBottom: '1px solid #e5e7eb',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="default"
            aria-label="toggle drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: '#374151' }}
          >
            {isMobile ? (
              <MenuIcon />
            ) : desktopOpen ? (
              <ChevronLeftIcon />
            ) : (
              <MenuIcon />
            )}
          </IconButton>

          {/* Page Title */}
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, color: '#111827', fontWeight: 600 }}
          >
            {pathname === '/dashboard' && 'Dashboard Overview'}
            {pathname === '/dashboard/institutions' && 'Institution Categories'}
            {pathname === '/dashboard/add-institution' && 'Add New Category'}
            {pathname.includes('/dashboard/edit-institution') &&
              'Edit Category'}
            {pathname === '/chatbot' && 'Chatbot Interface'}
          </Typography>

          {/* Top Bar Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Theme Toggle */}
            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              sx={{ color: '#6b7280', '&:hover': { bgcolor: '#f3f4f6' } }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            {/* Notifications */}
            <IconButton
              onClick={handleNotificationClick}
              sx={{ color: '#6b7280', '&:hover': { bgcolor: '#f3f4f6' } }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Profile Avatar */}
            <IconButton onClick={handleProfileClick} sx={{ ml: 1 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#3b82f6' }}>
                {getUserInitials(userData?.firstName, userData?.lastName)}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            border: 'none',
          },
        }}
      >
        <SidebarContent />
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: currentDrawerWidth,
            border: 'none',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
          },
        }}
        open
      >
        <SidebarContent isMinified={!desktopOpen} />
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            xs: '100%',
            md: desktopOpen
              ? `calc(100% - ${drawerWidth}px)`
              : `calc(100% - ${miniDrawerWidth}px)`,
          },
          ml: {
            xs: 0,
            md: desktopOpen ? `${drawerWidth}px` : `${miniDrawerWidth}px`,
          },
          bgcolor: '#f9fafb',
          minHeight: '100vh',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar />
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <CircularProgress sx={{ mb: 2 }} />
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Loading...
              </Typography>
            </div>
          </Box>
        ) : (
          <Box sx={{ p: 3 }}>{children}</Box>
        )}
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            mt: 1,
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
            border: '1px solid #e5e7eb',
            minWidth: 200,
          },
        }}
      >
        <MenuItem sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
          <PersonIcon sx={{ mr: 2, color: '#6b7280' }} />
          Profile Settings
        </MenuItem>
        <MenuItem sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
          <SettingsIcon sx={{ mr: 2, color: '#6b7280' }} />
          Account Settings
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout} // Add onClick handler
          sx={{ '&:hover': { bgcolor: '#fef2f2' }, color: '#dc2626' }}
        >
          <LogoutIcon sx={{ mr: 2 }} />
          Sign Out
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={() => setNotificationAnchor(null)}
        PaperProps={{
          sx: {
            mt: 1,
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
            border: '1px solid #e5e7eb',
            minWidth: 320,
            maxHeight: 400,
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid #e5e7eb' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Notifications
          </Typography>
        </Box>
        <MenuItem sx={{ '&:hover': { bgcolor: '#f9fafb' }, py: 2 }}>
          <div>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              New category created
            </Typography>
            <Typography variant="caption" sx={{ color: '#6b7280' }}>
              Computer Science Department - 2 hours ago
            </Typography>
          </div>
        </MenuItem>
        <MenuItem sx={{ '&:hover': { bgcolor: '#f9fafb' }, py: 2 }}>
          <div>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              System update completed
            </Typography>
            <Typography variant="caption" sx={{ color: '#6b7280' }}>
              All services are running normally - 5 hours ago
            </Typography>
          </div>
        </MenuItem>
        <MenuItem sx={{ '&:hover': { bgcolor: '#f9fafb' }, py: 2 }}>
          <div>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              New user registered
            </Typography>
            <Typography variant="caption" sx={{ color: '#6b7280' }}>
              Student portal access granted - 1 day ago
            </Typography>
          </div>
        </MenuItem>
      </Menu>
    </Box>
  )
}
