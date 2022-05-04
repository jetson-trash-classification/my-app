import * as React from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Routes, Route, useNavigate } from "react-router-dom";


import MyMap from './MyMap';
import MyData from './MyData';
import Analysis from './Analysis'

export default function App() {
  let navigate = useNavigate()
  const [path, setPath] = React.useState('/')

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            垃圾回收
          </Typography>
          <Button color="inherit">登录</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<MyMap />} />
        <Route path="my-data" element={<MyData />} />
        <Route path="analysis" element={<Analysis />} />
      </Routes>

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={path}
          onChange={(event, newValue) => {
            setPath(newValue);
            navigate(newValue);
          }}
        >
          <BottomNavigationAction value="/" label="站点编辑" icon={<RestoreIcon />} />
          <BottomNavigationAction value="/my-data" label="查询数据" icon={<FavoriteIcon />} />
          <BottomNavigationAction value="/analysis" label="数据分析" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Paper>
    </React.Fragment>
  );
}
