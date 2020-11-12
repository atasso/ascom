import React, {useEffect} from 'react';
import Patient from './Patient';
import { useStateValue } from '../../state'
import axios from 'axios';
import { getPatient } from '../../effects'

export default function PatientContainer(props) {
const [{patient}, dispatch] = useStateValue();
    useEffect(() => {
        if (patient.patientId !== null) {
            const fetchData = async () => {
                try {
                const response = await getPatient(patient.patientId)
                dispatch({ type: 'PATIENT FETCH SUCCESS', payload: { detail: response.data } })
                }
                catch(error) {
                    console.log('Error', error)
                }
            }
            fetchData()
        }
    }, [patient.patientId])
    return (
        <Patient {...props} />
    );
}