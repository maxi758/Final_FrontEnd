import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTurnos } from "../reducers/turnosReducer";
const Turnos = React.lazy(() => import("../../turnos/pages/GetTurnos"));
/*const NewTurno = React.lazy(() => import("../turnos/pages/NewTurno"));
const UpdateTurno = React.lazy(() => import("../turnos/pages/UpdateTurno"));
const MyTurnos = React.lazy(() => import("../turnos/pages/GetTurnosUsuario"));
const TurnosMedico = React.lazy(() => import("../turnos/pages/GetTurnosMedico"));*/

const TurnosContainer = () => {
    const dispatch = useDispatch();
    const { turnos, isLoading } = useSelector((state) => state.turnos);
    const { token } = useSelector((state) => state.auth);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            dispatch(getTurnos(token));
        } catch (err) {
            setError(err);
            console.log('error: ', err);
        }
    }, [dispatch]);

    /*return (
        <Routes>
            <Route
                path="new"
                element={<NewTurno />}
            />
            <Route
                path=":id"
                element={<UpdateTurno />}
            />
            <Route
                path="me"
                element={<MyTurnos />}
            />
            <Route
                path="me/cancelados"
                element={<MyTurnos />}
            />
            <Route
                path="medicos/:id"
                element={<TurnosMedico />}
            />
            <Route
                path=""
                element={<Turnos />}
            />
        </Routes>
    );*/
    return <Turnos turnos={turnos} isLoading={isLoading} error={error} />;
}

export default TurnosContainer;