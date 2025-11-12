import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";

function ModalMensajesDuplicarPublicacion(props) {
    const {
        shown,
        setShowModalMensajesDuplicar,
        setContinuarDuplicar,
        setAbandonarDuplicar,
        titulo,
        mensaje,
        tipo,
    } = props;

    const continuar = () =>{
        setShowModalMensajesDuplicar(false);
        setContinuarDuplicar(true);
    }

    const cerrar = () =>{
        setShowModalMensajesDuplicar(false);
    }

    return shown ? (
        <div
            className="modal-fondo"
            onClick={() => {
                close(false);
            }}>
            <div
                className="modal-mensajes-login redondearventamensajes "
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div>
                    <Row>
                        <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                            <div className="iconoventanamensajes mtmenos14">
                                <InfoIcon style={{ fontSize: 45 }} />
                            </div>
                        </Col>
                        <Col xl={9} lg={9} md={9} sm={9}>
                            <div className="ml-40 titulodetaildescription">
                                {titulo}
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <button
                                type="button"
                                className="cerrarmodal ml-40 sinborder colorbase"
                                data-dismiss="modal"
                                //onClick={() => close(false)}
                            >
                                {" "}
                            </button>
                        </Col>
                    </Row>
                </div>
                <div className="mt-50 textoventanamensajes">
                    <div>{mensaje}</div>
                </div>
                <div className="mt-60">
                            <Button
                                style={{right: "134px"}}
                                variant="outline-light"
                                className="ps-btn baseinput itemsdropdowncustomeliminar redondearborde"
                                onClick={() => cerrar()}>
                                {" "}
                                Cancelar
                            </Button>
                     
                            <Button
                                variant="outline-light"
                                className=" ps-btn redondearborde"
                                onClick={() => continuar()}>
                                {" "}
                                Continuar
                            </Button>
                    
                    
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalMensajesDuplicarPublicacion;
