import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import { IoClose } from "react-icons/io5";
import { IoMdInformationCircle } from "react-icons/io";

function ModalMensajesConfirmarMsj(props) {
    const {
        shown,
        setContinuarEliminar,
        setAbandonarEliminar,
        titulo,
        mensaje,
        tipo,
    } = props;

    return shown ? (
        <div
            className="modal-fondo"
            onClick={() => {
                close(false);
            }}>
            <div
                className="modal-mensajes-login-msj redondearventamensajes "
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div className="top-ventanamensajes">
                    <IoMdInformationCircle />
                    <p>{titulo}</p>
                   <IoClose onClick={() => { close(false); }} className="closeNone"/> 
                </div> 
                <div className="textoventanamensajes">
                    <div>{mensaje}</div>
                </div> 
                <div className="buttonsventanamensajes">
                    <Button
                        variant="outline-light"
                        // className="ps-btn baseinput itemsdropdowncustomeliminar redondearborde"
                        className="cancelButtonMsj"
                        onClick={() => setAbandonarEliminar(true)}>
                        {" "}
                        Cancelar
                    </Button>
                    <Button
                        variant="outline-light"
                        className="confirmButtonMsj"
                        onClick={() => setContinuarEliminar(true)}>
                        {" "}
                        Confirmar
                    </Button>
                </div> 
            </div>
        </div>
    ) : null;
}

export default ModalMensajesConfirmarMsj;
