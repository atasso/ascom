import React, { useEffect } from 'react';
import PatientList from './PatientList';
import { useStateValue } from '../../state';
import { getList } from '../../effects'

export default function PatientListContainer() {
    const [{patient}, dispatch] = useStateValue();
      
    useEffect(() => {
            const fetchData = async () => {
                try {
                const response = await getList()
                dispatch({type:'PATIENT LIST FETCH SUCCESS', payload: {list: response}})
                }
                catch(error) {
                    console.log('Error', error)
                }
            }
            fetchData()
    },[])
    return (
        <PatientList />
    );
}
