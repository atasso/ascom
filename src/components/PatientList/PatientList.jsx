import React, { Fragment, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import WarningIcon from "@material-ui/icons/Warning";
import PatientContainer from "./PatientContainer";
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import EditPatient from './EditPatient';
import moment from 'moment'
import { red } from '@material-ui/core/colors';

import { useStateValue } from '../../state'

export default function PatientList(props) {
const useStyles = makeStyles({
    alert: {
        borderLeft: "16px solid",
        borderLeftColor: red[600]
      },
      alarmIcon: {
        color: red[600],
      },
});
  const [{ patient, ui }, dispatch] = useStateValue();
  const classes = useStyles();
  const columns = [
    {
        name: 'id',
      label: "Id",
        options: {
            display: false,
            filter: false
        }
    },
    {
      name: "familyName",
      label: "Family Name",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "givenName",
      label: "Given Name",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "birthDate",
      label: "Birth Date",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return moment.utc(value).format('DD/MM/YYYY') ;
        },
      },
    },
    {
      name: "sex",
      label: "Sex",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "parameters",
      label: "# Parameters",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "alarm",
      label: "Alarm",
      options: {
        filter: true,
        filterOptions: {
            renderValue: v => v ? 'alarm' : 'no alarm'
          },
        sort: true,
        customBodyRender: (value) => {
          return value ? <div className={classes.alarmIcon}><WarningIcon /></div> : "";
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    download: false,
    print: false,
    selectableRows: "none",
    onRowClick: (rowData, rowMeta) => {
        dispatch({type: 'GET PATIENT', payload: {id: rowData[0]}})
    },
    setRowProps: (row) => {
      if (row[6]) {
        return {
          className: classes.alert,
        };
      }
    },
  };

  return (
    <Fragment>
    <Snackbar open={ui.toast} onClose={() => dispatch({type: 'TOAST CLOSE'})} anchorOrigin={{vertical: 'top', horizontal:'center'}} autoHideDuration={1200} >
        <Alert  severity="success">
        Success!
        </Alert>
      </Snackbar>
        <Slide direction="left" in={patient.showPatient}>
            <Paper elevation={4} style={{position:'absolute', left: '24px', right: '24px'}}>
        <PatientContainer />
            </Paper>
        </Slide>
        <Slide direction="right" in={!patient.showPatient}>
        <MUIDataTable 
          title={"Patients list"}
          data={patient.patientList}
          columns={columns}
          options={options}
        />
        </Slide>
        <EditPatient />
    </Fragment>
  );
}
