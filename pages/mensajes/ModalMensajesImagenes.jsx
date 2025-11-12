import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";

function ModalMensajesImagenes(props) {
    const {
        shown,
        close,
        titulo,
        textouno,
        textodos,
        textotres,
        textocuatro,
        mensaje,
        tipo,
        contadortexto,
        mensajeUno,
        mensajeDos,
    } = props;

    //console.log("CONTADOR TEXTO : ", mensajeUno)

    console.log(
        "TIPO : ",
        textouno,
        "DIMENSION : ",
        textodos,
        "PROPORCION : ",
        textotres,
        "LONGITUD : ",
        textocuatro
    );

    const cerrar = () => {
        shown(false);
        close(false);
    };

    return shown ? (
        <div
            className="modal-fondo mtmenos15"
            onClick={() => {
                close(false);
            }}>
            <div
                className="modal-mensajes-imagenes redondearventamensajes "
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <button
                    type="button"
                    className="cerrarmodalbuscar ml-55 sinborder colorbase"
                    data-dismiss="modal"
                    onClick={() => close(false)}>
                    {" "}
                    X{" "}
                </button>
                <div>
                    <Row className="gap-[14px] sm:gap-[0px]">
                        <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                            <div className="iconoventanamensajes">
                                <InfoIcon style={{ fontSize: 45 }} />
                            </div>
                        </Col>
                        <Col xs={12} sm={10}>
                            <div className="titulodetaildescriptionimagenes">
                                {titulo}
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="mt-25">
                    <div className={mensajeUno}>
                        <h4>{mensaje}</h4>
                    </div>
                </div>
                <div className="cajamodalmensajesimagenes pb-[5px]">
                    {textouno ? (
                        <div className={mensajeDos}>{textouno}</div>
                    ) : null}

                    {textodos ? (
                        <div className={mensajeDos}>{textodos}</div>
                    ) : null}

                    {textotres ? (
                        <div className={mensajeDos}>{textotres}</div>
                    ) : null}

                    {textocuatro ? (
                        <div className={mensajeDos}>{textocuatro}</div>
                    ) : null}
                </div>
                <div className="mt-1 flex justify-end items-center">
                        <Button
                            variant="outline-light"
                            className="claseNew redondearborde"
                            onClick={() => close(false)}>
                            {" "}
                            Cerrar
                        </Button>
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalMensajesImagenes;
