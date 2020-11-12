import React, { Fragment } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import MUIDataTable from "mui-datatables";
import WarningIcon from "@material-ui/icons/Warning";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';

import { withStyles, makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "../../state";
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, red } from '@material-ui/core/colors';
import moment from 'moment'

export default function Patient(props) {
  const [{ patient }, dispatch] = useStateValue();
  const useStyles = makeStyles((theme) => ({
    alert: {
      borderLeft: "16px solid",
      borderLeftColor: red[600]
    },
    alarmIcon: {
      color: red[600],
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
      },
    icons: {
        '& > *': {
            margin: theme.spacing(1),
          },
    }
  }));
  const classes = useStyles();
  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        display: false,
        filter: false,
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "value",
      label: "Value",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "alarm",
      label: "Alarm",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return value ? (
            <div className={classes.alarmIcon}>
              <WarningIcon />
            </div>
          ) : (
            ""
          );
        },
      },
    },
  ];
  const options = {
    filterType: "checkbox",
    download: false,
    print: false,
    search: false,
    filter: false,
    viewColumns: false,
    selectableRows: "none",
    setRowProps: (row) => {
      if (row[3]) {
        return {
          className: classes.alert,
        };
      }
    },
  };
  const birthDate = patient.patientDetail.birthDate ? moment.utc(patient.patientDetail.birthDate).format('DD/MM/YYYY') : ''
  const familyName = patient.patientDetail.familyName || ''
  const givenName = patient.patientDetail.givenName || ''
  return (
    <Fragment>
      <Container style={{ width: "100%" }}>
        <div className={classes.icons}>
          <Fab aria-label="back" onClick={() => dispatch({ type: "BACK" })}>
            <ArrowBackIcon />
          </Fab>
          <Fab
            color="primary"
            onClick={() => dispatch({ type: "PATIENT EDIT OPEN" })}
            fontSize="large"
            aria-label="edit"
          >
            <EditIcon />
          </Fab>
        </div>
        <Divider variant="middle" />
        <Grid
          container
          alignItems="center"
          style={{ margin: "2em 0" }}
          spacing={2}
        >
          <Grid item xs={1}>
            <Avatar
              className={classes.orange}
              style={{ height: "70px", width: "70px" }}
            >
              {familyName.substring(0, 1)}
              {givenName.substring(0, 1)}
            </Avatar>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h2">
              {familyName} {givenName}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              Birth date:<strong> {birthDate} </strong>
            </Typography>
            <Typography variant="subtitle1">
              Sex: <strong>{patient.patientDetail.sex || ""}</strong>
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <MUIDataTable
        data={patient.patientDetail.parameters}
        columns={columns}
        options={options}
        elevation={1}
      />
    </Fragment>
  );
}
