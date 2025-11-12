import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import CheckIcon from "@material-ui/icons/Check";
import { useRouter } from "next/router";

function ModalControlAcceso(props) {

    const { shown, close, titulo, mensaje, tipo } = props;
    
    const router = useRouter();

    const cerrar = () => {
        close(false);
        //router.push(`/search?keyword=${""}`);
        
        router.push("/");
    };

    return shown ? (
        <div
            className="modal-fondo mtmenos15"
            onClick={() => {
                cerrar();
            }}>
            <div
                className="modal-control-acceso redondearventamensajes "
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
                           
                        </Col>
                        <Col xl={9} lg={9} md={9} sm={9}>
                            <div className="ml-30 titulodetaildescription">
                                {titulo}
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="mt-30 textoventanamensajesdos">
                    <div>{mensaje}</div>
                </div>
                <div className="mt-40">
                            <Button
                                variant="outline-light"
                                className="ps-btn redondearborde"
                                onClick={() => cerrar()}>
                                {" "}
                                Cerrar
                            </Button>
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalControlAcceso;
