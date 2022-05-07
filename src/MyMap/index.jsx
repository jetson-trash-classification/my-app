import React, { useState } from 'react';
import { Map, Markers } from 'react-amap';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox'
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { nanoid } from 'nanoid';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


export default function MyMap() {
  const newMarker = {
    data: {
      id: nanoid(),
      capacityRate: 0.0,
      totalCapacity: 10,
      curCapacitity: 0,
      add: true,
      closeOnFull: false,
      alertOnFull: false,
      residual: true,
      hazardous: true,
      food: true,
      recyclable: true
    },
    position: { longitude: 120.122504, latitude: 30.263686 }
  }

  const [markers, setMarkers] = useState([{
    data: {
      id: 'rKkwZHirl27G3XxrP62_s',
      capacityRate: 0.0,
      totalCapacity: 10,
      curCapacitity: 0,
      add: false,
      closeOnFull: false,
      alertOnFull: false,
      residual: true,
      hazardous: true,
      food: true,
      recyclable: true
    },
    position: { longitude: 120.122504, latitude: 30.263686 }
  }])

  const [mapCenter,] = useState({ longitude: 120.122504, latitude: 30.263686 })
  const [open, setOpen] = useState(false)

  const myRender = (extData) => {
    if (extData.data.capacityRate > 0.8) {
      return <div style={{
        background: `url('http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '30px',
        height: '40px',
        color: '#000',
        textAlign: 'center',
        lineHeight: '40px'
      }}></div>
    }
    else {
      return false
    }
  }


  const [curMarker, setCurMarker] = useState({ ...newMarker })

  let mapEvents = {
    dblclick: (e) => {
      const { lnglat } = e;
      setCurMarker({
        ...newMarker,
        position: { latitude: lnglat.getLat(), longitude: lnglat.getLng() }
      })
      setTabPage(1)
      setOpen(true)
    }
  }

  let markerEvents = {
    click: (originalMapsEvents, originalMarkerInstance) => {
      const extData = originalMarkerInstance.getExtData();
      setCurMarker({ ...extData })
      setTabPage(0)
      setOpen(true)
    }
  }

  let handleOK = () => {
    if (curMarker.data.add) {
      setMarkers([...markers, { ...curMarker, data: { ...curMarker.data, add: false } }])
    }
    else {
      setMarkers(markers.map((markerObj) => {
        return markerObj.data.id === curMarker.data.id ? curMarker : markerObj
      }))
    }
    setOpen(false)
    setCurMarker({ ...newMarker })
  }

  let handleCancle = () => {
    setOpen(false)
    setCurMarker({ ...newMarker })
  }

  let handleRecyclableChange = (e) => {
    setCurMarker({ ...curMarker, data: { ...curMarker.data, recyclable: e.target.checked } })
  }

  let handleResidualChange = (e) => {
    setCurMarker({ ...curMarker, data: { ...curMarker.data, residual: e.target.checked } })
  }

  let handleHazardousChange = (e) => {
    console.log(e.target.checked)
    setCurMarker({ ...curMarker, data: { ...curMarker.data, hazardous: e.target.checked } })
  }

  let handleFoodChange = (e) => {
    setCurMarker({ ...curMarker, data: { ...curMarker.data, food: e.target.checked } })
  }

  // let handleCloseOnFullChange = (e) => {
  //   setCurMarker({ ...curMarker, data: { ...curMarker.data, closeOnFull: e.target.checked } })
  // }

  let handleAlertOnFullChange = (e) => {
    setCurMarker({ ...curMarker, data: { ...curMarker.data, alertOnFull: e.target.checked } })
  }

  let handleCapacityChange = (e) => {
    console.log(e.target.value)
    setCurMarker({ ...curMarker, data: { ...curMarker.data, totalCapacity: e.target.value, capacityRate: curMarker.data.curCapacitity / e.target.value } })
  }

  const [tabPage, setTabPage] = React.useState(0);

  const handleTabPageChange = (event, newValue) => {
    setTabPage(newValue);
  };

  let mapPlugins = ['ToolBar']

  return (<div>
    <div style={{ width: '100%', height: 600 }}>
      <Dialog
        open={open}
        style={{ zIndex: 99 }}
      >
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs onChange={handleTabPageChange} value={tabPage}>
              <Tab disabled={curMarker.data.add} label="站点信息" />
              <Tab label="编辑站点" />
            </Tabs>
          </Box>
          <TabPanel index={0} value={tabPage}>
            <DialogContentText>经度: {curMarker.position.latitude.toFixed(2)} </DialogContentText>
            <DialogContentText>纬度: {curMarker.position.longitude.toFixed(2)} </DialogContentText>
            <DialogContentText>总容量: {curMarker.data.totalCapacity} </DialogContentText>
            <DialogContentText>当前容量: {(curMarker.data.capacityRate * 100).toFixed(2)}% </DialogContentText>
          </TabPanel>
          <TabPanel index={1} value={tabPage}>
            <FormGroup>
              <FormControlLabel control={<Checkbox onChange={handleRecyclableChange} checked={curMarker.data.recyclable} />} label="可回收垃圾" />
              <FormControlLabel control={<Checkbox onChange={handleResidualChange} checked={curMarker.data.residual} />} label="其他垃圾" />
              <FormControlLabel control={<Checkbox onChange={handleHazardousChange} checked={curMarker.data.hazardous} />} label="有害垃圾" />
              <FormControlLabel control={<Checkbox onChange={handleFoodChange} checked={curMarker.data.food} />} label="厨余垃圾" />
            </FormGroup>
            <FormGroup>
              {/* <FormControlLabel control={<Switch onChange={handleCloseOnFullChange} checked={curMarker.data.closeOnFull} />} label="装满后自动关闭" /> */}
              <FormControlLabel control={<Switch onChange={handleAlertOnFullChange} checked={curMarker.data.alertOnFull} />} label="装满后发出警告" />
            </FormGroup>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
              <Typography gutterBottom>总容量</Typography>
              <Slider max={20} min={1} value={curMarker.data.totalCapacity} onChange={handleCapacityChange} valueLabelDisplay="auto" />
            </Stack>

          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancle}>取消</Button>
          <Button onClick={handleOK} autoFocus>好的</Button>
        </DialogActions>
      </Dialog>
      <Map
        doubleClickZoom={false}
        events={mapEvents}
        plugins={mapPlugins}
        center={mapCenter}
        zoom={16}
      >
        <Markers markers={markers} events={markerEvents} render={myRender}>
        </Markers>
      </Map>
    </div>
  </div>)
}