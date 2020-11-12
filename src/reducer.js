
  const reducer = (state, action) => {
    switch (action.type) {
      case 'GET PATIENT':
        return {
          ...state,
          patient: {
            ...state.patient,
            showPatient: true,
            patientId: action.payload.id 
          }
        };
      case 'PATIENT LIST FETCH SUCCESS':
        return {
          ...state,
          patient: {
            ...state.patient,
            patientList: action.payload.list
          }
        };
      case 'PATIENT FETCH SUCCESS':
        return {
          ...state,
          patient: {
            ...state.patient,
            patientDetail: action.payload.detail
          }
        };
      case 'PATIENT SAVE REQUEST':
        return {
            ...state,
            ui: {
                ...state.ui,
                edit: false
            }
        };
      case 'PATIENT SAVE SUCCESS':
        return {
            ...state,
            ui: {
                ...state.ui,
                toast: true
            }
        };
      case 'PATIENT EDIT OPEN':
        return {
            ...state,
            ui: {
                ...state.ui,
                edit: true
            }
        };
      case 'PATIENT EDIT':
        return {
            ...state,
          patient: {
            ...state.patient,
            patientDetail: {
                ...state.patient.patientDetail,
                [action.payload.name]: action.payload.value
            }
          }
        };
      case 'PATIENT EDIT CLOSE':
        return {
            ...state,
            ui: {
                ...state.ui,
                edit: false
            }
        };
      case 'TOAST CLOSE':
        return {
            ...state,
            ui: {
                ...state.ui,
                toast: false
            }
        };
      case 'BACK':
        return {
          ...state,
          patient: {
            ...state.patient,
            showPatient: false,
            patientId: null,
            patientDetail: {
                "id": 0,
                "familyName": "",
                "givenName": "",
                "birthDate": "",
                "sex": "",
                "parameters": []
              }
          }
        };
      default:
        return state;
    }
  };
  export default reducer;