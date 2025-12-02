import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import CheckIcon from '@material-ui/icons/Check';
import { useRouter } from "next/router";
import { IoCheckmarkCircle, IoCloseOutline } from "react-icons/io5";

function ModalMensajesContactanos(props) {
    const { shown, close, titulo, mensaje, tipo, setActivarCity, textoBoton } = props;
    const router = useRouter();

    const cerrar = () => {
        close(false);
        router.push(`/search?keyword=${""}`);
        //setActivarCity(true);
    }

    return shown ? (
        <div
            className="modal-fondo-city mtmenos15"
            onClick={() => {
                cerrar();
            }}>
            <div
                className="modal-mensajes-chat-dos"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div className="mainModalMensajesChat">
                    <div className="topDivModalMensajesChat">
                        <IoCheckmarkCircle className="closeInfoGreen" />
                        <p>{titulo}</p>
                        <IoCloseOutline className="closeIconRed" onClick={() => {
                            cerrar();
                        }} />
                    </div>
                    <div className="contentModalMensajesChat">
                        <p>{mensaje}</p>
                    </div>
                    <div className="buttonsModalMensajesChat">
                        
                        <Button
                            variant="outline-light"
                            className="botonchatmiscompras redondearborde"
                            onClick={() => cerrar()}>
                            {" "}
                            {textoBoton}
                        </Button>
                    </div>
                </div>

            </div>

       
        </div>
    ) : null;
}

export default ModalMensajesContactanos;
