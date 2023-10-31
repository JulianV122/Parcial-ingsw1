import { Box, Button, Checkbox, Chip, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Modal, Paper, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import "./user.scss"
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
};

const clients = [
    {
        firstname: "Pepito",
        lastname: "Perez",
        email: "123@ejemplo.com",
        password: "123456",
        repeatPassword: "123456",
    },
    {
        firstname: "Ana",
        lastname: "Gloria",
        email: "12223@ejemplo.com",
        password: "123qa456",
        repeatPassword: "123qa456",
    },
];



export const Users = () => {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const [createdUser, setCreatedUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        repeatPassword: "",
        status: "",
    });

    const { firstname, lastname, email, password, repeatPassword, status } = createdUser;

    const handleChange = (event) => {
        setCreatedUser(createdUser => ({ ...createdUser, [event.target.name]: event.target.value, }))
    }

    const [selectedUser, setSelectedUser] = useState(null);

    const handleSubmit = () => {
        const urlPost = "http://localhost:3100/api/v1/user/signin";
        fetch(urlPost, {
            method: "POST", // or 'PUT'
            body: JSON.stringify(createdUser), // data can be string or {object}!
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => console.log("Success:", response));
    }

    const url = "http://localhost:3100/api/v1/user";


    useEffect(() => {
        fetch(url, {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => setUser(data))
            .catch((error) => console.log(error))
    }, []);

    return (
        <div className='user-container'>
            <div className='login-button'>
                <Button variant="contained" color="primary" mt="2px"> login</Button>
            </div>
            <h1>Register</h1>
            <div className="user-form">
                <form>
                    <p><TextField id="outlined-basic" label="firstname" variant="outlined" name='firstname' onChange={handleChange} /></p>
                    <p><TextField id="outlined-basic" label="lastname" variant="outlined" name='lastname' onChange={handleChange} /></p>
                    <p><TextField id="outlined-basic" label="email" variant="outlined" name='email' onChange={handleChange} /></p>
                    <p><TextField id="outlined-basic" label="cellphone" variant="outlined" name='cellphone' /></p>
                    <p><TextField id="outlined-basic" label="password" variant="outlined" name='password' onChange={handleChange} /></p>
                    <p><TextField id="outlined-basic" label="repeatPassword" variant="outlined" name='repeatPassword' onChange={handleChange} /></p>
                    <p><FormControlLabel control={<Checkbox />}/><a href="#" onClick={handleOpen}>Autorizar tratamiento de datos</a></p>
                    <Button variant="contained" color="success" sx={{ margin: 1 }} onClick={() => handleSubmit()}>Registrar</Button>
                    <Button variant="contained" sx={{ margin: 1 }} >Cancelar</Button>
                </form>
            </div>

            <div className="link-selected">
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Grid container spacing={2}>
                        <Box sx={style}>
                            <Grid item xs={10} md={10}>
                                <div className="link-information">
                                    <Typography id="modal-modal-title" variant="h5" component="h5">
                                        <h2>Información de tratamiento de datos</h2>
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        POLÍTICA GENERAL DE TRATAMIENTO DE DATOS PERSONALESCLIENTES, PROSPECTOS DE CLIENTES, FUNCIONARIOS, PROVEEDORES Y VISITANTES
                                        ENTRADA EN VIGENCIA: OCTUBRE DE 2023
                                        ÚLTIMA VERSIÓN: OCTUBRE DE 2023
                                        INTRODUCCIÓN
                                        Nombre pág. S.A.S. (en adelante, Nombre pág) es responsable de los Datos Personales e información que le suministran sus clientes, prospectos de clientes proveedores, contratistas, y visitantes (en adelante, los Titulares).
                                        En la presente Política de Tratamiento se establecen las finalidades, medidas y procedimientos de las Bases de Datos de Nombre pág así como los mecanismos con que los Titulares cuentan para conocer, actualizar, rectificar, suprimir los datos suministrados o revocar la autorización que se otorga con la aceptación de la presente Política de Tratamiento.
                                        La aceptación de propuestas, la celebración de contratos, el diligenciamiento de formatos, el acceso a los Servicios de la página web www.nombrepág.co (en adelante la Página Web) y/o la aceptación expresa o inequívoca de las presente políticas, implica la aceptación de los Titulares de la Política de Tratamiento y Protección de Datos Personales y su autorización para los usos y otros tratamientos que aquí se describen.
                                        DEFINICIONES
                                        Para los efectos de la presente Política de Privacidad, se entiende por:
                                        1.1. Dato personal: Cualquier información vinculada o que pueda asociarse a una o varias personas naturales determinadas o determinables.
                                        1.2. Dato público: Dato personal que no es semiprivado, privado o sensible. Entre otros, son los datos relativos al estado civil de las personas, a su profesión u oficio y a su calidad de comerciante o de servidor público. Por su naturaleza, los datos públicos pueden estar contenidos, entre otros, en registros y documentos públicos.
                                        1.3. Dato Privado: Es el dato que por su naturaleza íntima o reservada sólo es relevante para el Titular.
                                        1.4. Dato personal sensible: Se entiende como datos sensibles aquellos que afecten la intimidad del titular o cuyo uso indebido pueda afectar la intimidad del Titular o la potencialidad de generar su discriminación.
                                        1.5. Dato personal semiprivado: son aquellos datos que no tienen una naturaleza íntima, reservada, ni pública y cuyo conocimiento o divulgación puede interesar no solo a su titular, sino a un grupo de personas o a la sociedad en general. En este caso, para su Tratamiento se requiere a autorización expresa del Titular de la información. Por ejemplo: datos de carácter financiero, datos relativos a las relaciones con las entidades de seguridad social (EPS, AFP, ARL, Cajas de Compensación).
                                        1.6. Base de Datos: Conjunto organizado de Datos Personales que sea objeto de Tratamiento. Para los efectos del presente documento se entiende como Base de Datos, aquella que contiene información de los Titulares.
                                        1.7. Titular: Persona natural cuyos Datos Personales sean objeto de Tratamiento. Para los efectos del presente documento se entiende como Titulares, a los proveedores, contratistas, colaboradores, clientes, usuarios y visitantes de Nombre Pág.
                                        1.8. Responsable del Tratamiento: Es la Persona natural o jurídica de naturaleza pública o privada, que, actuando por ella misma o con otros, decida sobre la Base de Datos y/o el Tratamiento de los datos. Para los efectos de la presente Política para el Tratamiento de Datos Personales se entiende como Responsable del Tratamiento a Nombre Pág.
                                        1.9. Encargado del Tratamiento: Persona natural o jurídica, pública o privada, que por sí misma o en asocio con otros, realice el Tratamiento de Datos Personales por cuenta del Responsable del Tratamiento (Nombre Pág).
                                        1.10. Tratamiento: Cualquier operación o conjunto de operaciones sobre Datos Personales, tales como la recolección, almacenamiento, uso, circulación o supresión.
                                    </Typography>
                                </div>
                            </Grid>
                        </Box>
                    </Grid>
                </Modal>
            </div>
        </div>
    )
}
