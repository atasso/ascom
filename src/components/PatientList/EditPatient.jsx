import React, {useRef} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Slide from "@material-ui/core/Slide";
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import { useStateValue } from "../../state";
import moment from "moment";
import { getList, getPatient, savePatient } from "../../effects";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function EditPatient() {
  const [{ patient, ui }, dispatch] = useStateValue();
  const inputEl = useRef(null);
  const handleChange = (event) => {
    const value = event.target.name === 'birthDate' ? moment.utc(event.target.value).toISOString() : event.target.value
    console.log('Value', value)
    dispatch({
      type: "PATIENT EDIT",
      payload: { name: event.target.name, value: value },
    });
  };
  const handleSave = async () => {
    dispatch({ type: "PATIENT SAVE REQUEST" });
    try {
      await savePatient(patient.patientDetail);
      dispatch({ type: "PATIENT SAVE SUCCESS" });
    } catch (error) {
      console.log("Error", error);
    }
    try {
      const response = await getPatient(patient.patientId);
      dispatch({
        type: "PATIENT FETCH SUCCESS",
        payload: { detail: response.data },
      });
    } catch (error) {
      console.log("Error", error);
    }
    try {
      const response = await getList();
      dispatch({
        type: "PATIENT LIST FETCH SUCCESS",
        payload: { list: response },
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  const birthDate = moment.utc(patient.patientDetail.birthDate).format("YYYY-MM-DD");
  return (
    <div>
      <Dialog
        open={ui.edit}
        TransitionComponent={Transition}
        onClose={() => dispatch({ type: "PATIENT EDIT CLOSE" })}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Edit patient"}
        </DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
          <Grid
          container
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6}>
            <TextField
              id="familyName"
              name="familyName"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={patient.patientDetail.familyName}
              label="Family name"
              onChange={handleChange}
            />
            </Grid>
          <Grid item xs={6}>
            <TextField
              id="givenName"
              name="givenName"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={patient.patientDetail.givenName}
              label="Given name"
              onChange={handleChange}
            />
            </Grid>
          <Grid item xs={6}>
            <TextField
              id="birthDate"
              name="birthDate"
              type="date"
              ref={inputEl}
              fullWidth
              InputLabelProps={{ shrink: true }}
              defaultValue={birthDate}
              label="Birth date"
              onBlur={handleChange}
            />
            </Grid>
          <Grid item xs={6}>

            <FormControl>
              <InputLabel id="demo-simple-select-helper-label" shrink>
                Sex
              </InputLabel>
              <Select
                native
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={patient.patientDetail.sex}
                name="sex"
                onChange={handleChange}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </Select>
            </FormControl>
            </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => dispatch({ type: "PATIENT EDIT CLOSE" })}
          >
            Close
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
