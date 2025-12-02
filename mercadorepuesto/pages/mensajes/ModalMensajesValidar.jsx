import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";

function ModalMensajesValidar(props) {
    const {
        shown,
        setContinuarRegistro,
        setAbandonarRegistro,
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
                className="modal-mensajes-login redondearventamensajes "
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <button
                    type="button"
                    className="cerrarmodal ml-40 sinborder colorbase"
                    data-dismiss="modal"
                //onClick={() => close(false)}
                >
                    X{" "}
                </button>
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
                    
                    </Row>
                </div>
                <div className="mt-30 textoventanamensajes">
                    <div>{mensaje}</div>
                </div>
                <div className=" mt-45">

                    <Button
                        variant="outline-light"
                        className="ps-btn baseinput mr-[101px] itemsdropdowncustomvalidar redondearborde"
                        onClick={() => setContinuarRegistro(true)}>
                        {" "}
                        Seguir editando
                    </Button>

                    <Button
                        variant="outline-light"
                        className="ps-btn redondearborde"
                        onClick={() => setAbandonarRegistro(true)}>
                        {" "}
                        Cerrar
                    </Button>

                </div>
            </div>
        </div>
    ) : null;
}

export default ModalMensajesValidar;
