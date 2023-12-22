import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/http-hook';

import { Card, CircularProgress } from '@mui/material';
import MedicoList from '../components/MedicoList';

const Medicos = () => {
    const [loadedMedicos, setLoadedMedicos] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    
    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                console.log("fetching medicos");
                console.log(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/medicos`);
                const responseData = await sendRequest(
                    `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/medicos`,
                );
                console.log('Response from fetch',responseData.medicos);
                setLoadedMedicos(responseData.medicos);
            } catch (err) {
                console.log('Error: ',err);
            }
        };
        fetchMedicos();
    }, [sendRequest]);
    
    return (
        <React.Fragment>
            {isLoading && (
                <div className="center">
                    <CircularProgress />
                </div>
            )}
            {!isLoading && loadedMedicos && <MedicoList items={loadedMedicos} />}
        </React.Fragment>
    );
};

export default Medicos;