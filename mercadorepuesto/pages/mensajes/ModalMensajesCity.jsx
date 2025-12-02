import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";

function ModalMensajesCity(props) {
    const { shown, close, titulo, mensaje, tipo, setActivarCity, textoBoton } =
        props;

    const cerrar = () => {
        close(false);
        //setActivarCity(true);
    };

    return shown ? (
        <div
            className="modal-fondo-city mtmenos15"
            onClick={() => {
                cerrar();
            }}>
            <div
                className="modal-mensajes-city redondearventamensajes"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <button
                    type="button"
                    className="cerrarmodal ml-40 sinborder colorbase"
                    data-dismiss="modal"
                    onClick={() => cerrar()}>
                    {" "}
                    X{" "}
                </button>
                <div>
                    <Row>
                        <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                            <div className="iconoventanamensajes mtmenos14">
                                <InfoIcon style={{ fontSize: 50 }} />
                            </div>
                        </Col>
                        <Col xl={9} lg={9} md={9} sm={9}>
                            <div className="ml-40 titulodetaildescriptioncity">
                                {titulo}
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="mt-45 textoventanamensajescity">
                    <div>{mensaje}</div>
                </div>
                <div className="btnmensajescity" onClick={() => cerrar()}>
                    {textoBoton}
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalMensajesCity;
