import React, { useRef, useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import './App.css';
import { Map, TileLayer, LayerGroup, FeatureGroup, Popup, Rectangle, Circle, WMSTileLayer } from 'react-leaflet';
import Freedraw, { CREATE, EDIT, APPEND, DELETE, ALL } from 'react-leaflet-freedraw';
import { EditControl } from 'react-leaflet-draw';
import CheckboxContainer from './containers/Checkbox';
import Menu from './containers/Menu';
import styled from 'styled-components';
import PopupComponent from './containers/Popup';

const MainContainer = styled.div`
  width: 100%;
`;

const DEFAULT_VIEWPORT = {
  center: [35.3, 128.3],
  zoom: 13,
}

const CONTROLS = [
  {
    id: 'create',
    label: 'Create',
    mode: CREATE,
    isChecked: true
  },
  {
    id: 'edit',
    label: 'Edit Polygons',
    mode: EDIT,
    isChecked: true
  },
  {
    id: 'attach-elbows',
    label: 'Attach Elbows',
    mode: APPEND,
    isChecked: true
  },
  {
    id: 'delete',
    label: 'Delete',
    mode: DELETE,
    isChecked: true
  }
];

const rectangle = [
  [35.3, 128.3],
  [35, 128.6]
];

function App() {

  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const [controls, setControls] = useState(CONTROLS);

  const mapRef = useRef();
  const freedrawRef = useRef();

  useEffect(() => {
    document.addEventListener('keydown', e => {
      if(e.key === 'Escape') {
        freedrawRef.current.leafletElement.cancle();
      }
    })
  }, []);

  const onViewportChanged = (viewport) => {
    console.log(viewport);
    setViewport(viewport);
  }

  const handleOptionsChange = e => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    const copyControls = controls.slice();
    const control = copyControls.find(each => each.id === item);
    control.isChecked = isChecked;
    setControls(copyControls);
  };

  // Listen for any markers added, removed or edited, and then output the lat lng boundaries.
  const handleOnMarkers = event => {
    console.log(
      'LatLngs:',
      event.latLngs,
      'Polygons:',
      freedrawRef.current.leafletElement.size()
    );
  };

  // Listen for when the mode changes
  const handleModeChange = event => {
    console.log('mode changed', event);
  };

  const onDrawStop = event => {
    console.log(event);
    console.log("객체타입 : " + event.layerType);
    switch(event.layerType) {
      case 'circle' : console.log("원"); return;
      case 'circlemarker' : console.log("Circle Marker"); return;
      default : 
      event.layer.getLatLngs()[0].map((item, index) => {
        console.log("좌표 " + (index+1) + " : Long [" + item.lng + "] Lat [" + item.lat + "]");
      })
    }
  }

  let mode = ALL;

  controls.forEach(control => {
    if (control.isChecked) {
      mode = mode | control.mode;
    } else {
      mode = mode ^ control.mode;
    }
  });

  return (
    <MainContainer>
      <Menu/>

      <PopupComponent/>

      <Map 
        onViewportChanged={onViewportChanged}
        viewport={viewport}
        ref={mapRef} >
        
        {/* <WMSTileLayer layers="nurc:Arc_Sample" url="http://118.220.143.151:8080/geoserver/nurc/wms" zIndex="2" opacity="0.5" crossOrigin="true"/> */}

        {/* <TileLayer url='http://192.168.0.17:3000/tiles/{z}/{x}/{y}.png' /> */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Freedraw
            onMarkers={handleOnMarkers}
            onModeChange={handleModeChange}
            ref={freedrawRef}
          />
          
          {/* <div className="checkboxContainer">
            <CheckboxContainer
              checkboxes={controls}
              onChange={handleOptionsChange}
            />
          </div> */}

        <FeatureGroup>
          <EditControl
            position='topright'
            onCreated={onDrawStop}
          />
        </FeatureGroup>
      </Map>
      </MainContainer>
  );
}

export default App;
