import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/http-hook';

import { Card, CircularProgress } from '@mui/material';
import EspecialidadList from '../components/EspecialidadList';

const Especialidades = () => {
    const [loadedEspecialidades, setLoadedEspecialidades] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    
    useEffect(() => {
        const fetchEspecialidades = async () => {
            try {
                console.log("fetching especialidades");
                console.log(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/especialidades`);
                const responseData = await sendRequest(
                    `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/especialidades`,
                );
                console.log('Response from fetch',responseData.especialidades);
                setLoadedEspecialidades(responseData.especialidades);
            } catch (err) {
                console.log('Error: ',err);
            }
        };
        fetchEspecialidades();
    }, [sendRequest]);
    
    return (
        <React.Fragment>
            {isLoading && (
                <div className="center">
                    <CircularProgress />
                </div>
            )}
            {!isLoading && loadedEspecialidades && <EspecialidadList items={loadedEspecialidades} />}
        </React.Fragment>
    );
};

export default Especialidades;