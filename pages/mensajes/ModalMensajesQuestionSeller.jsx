import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";

function ModalMensajesQuestionSeller(props) {
    const { shown, close, titulo, mensaje, tipo } = props;

    return shown ? (
        <div
            className="modal-fondo-city "
            onClick={() => {
                close(false);
            }}>
            <div
                className="modal-mensajes-seller redondearventamensajes "
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                   <button
                        type="button"
                        className="cerrarmodal ml-40 sinborder colorbase"
                        data-dismiss="modal"
                        onClick={() => close(false)}>
                        {" "}
                        X{" "}
                    </button>
                <div>
                    <Row>
                        <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                            <div className="iconoventanamensajes mtmenos14">
                                <InfoIcon style={{ fontSize: 45 }} />
                            </div>
                        </Col>
                        <Col  lg={11} md={11} sm={9}>
                            <div className="titulodetaildescriptiondos">
                                {titulo}
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="mt-30 textoventanamensajes">
                    <div>{mensaje}</div>
                </div>
                <div className="mt-50">
                    <Button
                        variant="outline-light"
                        className="ps-btn redondearborde"
                        onClick={() => close(false)}>
                        {" "}
                        Cerrar
                    </Button>
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalMensajesQuestionSeller;
