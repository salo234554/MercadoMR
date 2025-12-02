import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import { Grid, Typography, Box } from '@mui/material';

function ModalEjemploBusqueda(props) {
    const { shown, close, titulo, mensaje, tipo } = props;

    return shown ? (
        <div
            className="modal-fondo"
            onClick={() => {
                close(false);
            }}>
            <div
                className="modal-ejemplo-busqueda redondearventamensajes"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div>
                  
                </div>
                <Grid container spacing={2} columns={12}>
                    {/* Primera columna: 6 columnas en todos los tamaños */}
                    <Grid item xs={6} md={6}>
                        <Box
                            sx={{
                                backgroundColor: '#F1F2F6',
                                padding: 2,
                                borderRadius: '8px',
                                height: '100%', // Para que las dos columnas tengan la misma altura si el contenido varía
                            }}
                        >
                            <p style={{ fontWeight: 'bold', marginBottom: '12px' }}>
                                Criterio de búsqueda
                            </p>
                            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                <li style={{ marginBottom: '8px', fontSize:'8px' }}>
                                    Nombre del producto + Especificaciones del vehículo
                                </li>
                                <li style={{ marginBottom: '8px', fontSize:'8px' }}>
                                    Nombre del producto + Marca del producto/fabricante
                                </li>
                                <li style={{ marginBottom: '8px', fontSize:'8px' }}>
                                    Nombre del producto + Número de parte
                                </li>
                                <li style={{ marginBottom: '8px', fontSize:'8px' }}>Número de parte</li>
                            </ul>
                        </Box>
                    </Grid>

                    {/* Segunda columna: 6 columnas en todos los tamaños */}
                    <Grid item xs={6} md={6}>
                        <Box
                            sx={{
                                backgroundColor: '#F1F2F6',
                                padding: 2,
                                borderRadius: '8px',
                                height: '100%',
                            }}
                        >
                            <p style={{ fontWeight: 'bold', marginBottom: '12px' }}>Ejemplo</p>
                            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                <li style={{ marginBottom: '8px', fontSize:'8px' }}>
                                    Disco de freno Chevrolet Aveo 2009
                                </li>
                                <li style={{ marginBottom: '8px', fontSize:'8px' }}>Filtro de aceite Motorcraft</li>
                                <li style={{ marginBottom: '8px', fontSize:'8px' }}>
                                    Limpiaparabrisas 578572
                                </li>
                                <li style={{ marginBottom: '8px', fontSize:'8px' }}>578572</li>
                            </ul>
                        </Box>
                    </Grid>
                </Grid>

                <div className="mt-50 textoventanamensajes"></div>
            </div>
        </div>
    ) : null;
}

export default ModalEjemploBusqueda;
