import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { PatientList } from './components/PatientList'
import { StateProvider } from './state';
import reducer from './reducer';

import logo from './ascom-logo.svg';



function App() {
  const initialState = {
    patient: {
      showPatient: false,
      patientId: null,
      patientList: [],
      patientDetail: {
        "id": "",
        "familyName": "",
        "givenName": "",
        "birthDate": "",
        "sex": "",
        "parameters": [
          {
            "id": 0,
            "name": "",
            "value": 0,
            "alarm": false
          }
        ]
      }
    },
    ui: {
      edit: false,
      toast: false
    }
  };
  

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <AppBar color="transparent" position="static">
  <Toolbar>
    <Typography variant="h6">
    <img height="30px" alt="logo" width="100px" src={logo} />
    </Typography>
  </Toolbar>
</AppBar>
    <Container fixed style={{marginTop: "2em", position:'relative'}}>
      <PatientList />

    </Container>
    </StateProvider>
  );
}

export default App;
