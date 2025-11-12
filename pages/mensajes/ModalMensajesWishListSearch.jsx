import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import { getBlockScreen } from "~/store/blockscreen/action";
import { useDispatch } from "react-redux";

function ModalMensajesWishList(props) {
    const dispatch = useDispatch();
    const { shown, close, titulo, mensaje, tipo, setOnOffClick } = props;

    const cerrar = () => {
        close(false);
        setOnOffClick("ps-page ps-page--shopping ml-82 cajaprueba habilitar");
        dispatch(getBlockScreen(0));
    };

    useEffect(() => {
        if (shown) {
            dispatch(getBlockScreen(1));
        } else {
            dispatch(getBlockScreen(0));
        }
    }, [shown]);

    return shown ? (
        <div
            className="modal-fondo-city mtmenos15"
            onClick={() => {
                cerrar();
            }}>
            <div
                className="modal-wish-list redondearventamensajes "
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
                                <InfoIcon style={{ fontSize: 45 }} />
                            </div>
                        </Col>
                        <Col xl={9} lg={9} md={9} sm={9}>
                            <div className="ml-20 titulolistadeseos">
                                {titulo}
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="mt-30 textomensajeslistadeseos">{mensaje}</div>
                <div className="mt-35">
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

export default ModalMensajesWishList;
