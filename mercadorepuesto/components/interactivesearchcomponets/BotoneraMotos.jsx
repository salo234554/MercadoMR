import React from "react";
import { Button, Row } from "react-bootstrap";

const BotoneraMotos = ({
    onClickBoton1,
    infoBoton1,
    labelBoton1,
    onClickBoton2,
    infoBoton2,
    labelBoton2,
    seleccionadoono,
    tercerboton,
    onClickBoton3,
    infoBoton3,
    labelBoton3,

}) => (
    <div className="topSearchIntButtonsMotosMain">
        <Row className="topSearchIntButtonsMotos">
            <div className="contSearchIntButtonsMotos">
                <div>
                    <button
                        className={
                            seleccionadoono === 1
                                ? "botonPartCarroceriaMotosSeleccionada"
                                : seleccionadoono === 0
                                    ? "botonPartCarroceriaMotos"
                                    : "botonPartCarroceriaMotosDeseleccionado"
                        }
                        onClick={onClickBoton1}
                    >
                        {labelBoton1}
                    </button>
                    <Button
                        className={
                            seleccionadoono === 1
                                ? "infoButtonNewSearchMotosSeleccionado"
                                : seleccionadoono === 0
                                    ? "infoButtonNewSearchMotos"
                                    : "infoButtonNewSearchMotosDeseleccionado"
                        }
                        variant="outline-light"
                        onClick={infoBoton1}
                    >
                        <i className="fa fa-info d-flex justify-content-center" aria-hidden="true"></i>
                    </Button>
                </div>
                <div>
                    <button
                        className={
                            seleccionadoono === 2
                                ? "botonPartCarroceriaMotosSeleccionada"
                                : seleccionadoono === 0
                                    ? "botonPartCarroceriaMotos"
                                    : "botonPartCarroceriaMotosDeseleccionado"
                        }
                        onClick={onClickBoton2}
                    >
                        {labelBoton2}
                    </button>
                    <Button
                        className={
                            seleccionadoono === 2
                                ? "infoButtonNewSearchMotosSeleccionado"
                                : seleccionadoono === 0
                                    ? "infoButtonNewSearchMotos"
                                    : "infoButtonNewSearchMotosDeseleccionado"
                        }
                        variant="outline-light"
                        onClick={infoBoton2}
                    >
                        <i className="fa fa-info d-flex justify-content-center" aria-hidden="true"></i>
                    </Button>
                </div>
            </div>
            <div className="buttonstopIntMobileMotos">
                <div className="topSearchIntButtonsMobileMotos">
                    <div>
                        <button
                            className={
                                seleccionadoono === 1
                                    ? "botonPartCarroceriaMobileMotosSeleccionado"
                                    : seleccionadoono === 0
                                        ? "botonPartCarroceriaMobileMotos"
                                        : "botonPartCarroceriaMobileMotosDeseleccionado"
                            }
                            onClick={onClickBoton1}
                        >
                            {labelBoton1}
                        </button>
                        <Button
                            className={
                                seleccionadoono === 1
                                    ? "infoButtonNewSearchMotosSeleccionado"
                                    : seleccionadoono === 0
                                        ? "infoButtonNewSearchMotos"
                                        : "infoButtonNewSearchMotosDeseleccionado"
                            }
                            variant="outline-light"
                            onClick={infoBoton1}
                        >
                            <i className="fa fa-info d-flex justify-content-center" aria-hidden="true"></i>
                        </Button>
                    </div>
                    <div>
                        <button
                            className={
                                seleccionadoono === 2
                                    ? "botonPartCarroceriaMobileMotosSeleccionado"
                                    : seleccionadoono === 0
                                        ? "botonPartCarroceriaMobileMotos"
                                        : "botonPartCarroceriaMobileMotosDeseleccionado"
                            }
                            onClick={onClickBoton2}>

                            {labelBoton2}
                        </button>
                        <Button
                            className={
                                seleccionadoono === 2
                                    ? "infoButtonNewSearchMotosSeleccionado"
                                    : seleccionadoono === 0
                                        ? "infoButtonNewSearchMotos"
                                        : "infoButtonNewSearchMotosDeseleccionado"
                            }
                            variant="outline-light"
                            onClick={infoBoton2}
                        >
                            <i className="fa fa-info d-flex justify-content-center" aria-hidden="true"></i>
                        </Button>

                    </div>
                </div>
            </div>
        </Row>

        {tercerboton !== 0 && (
            <>
                <div className="mt-3 centrartextosexterior">
                    Elige en que parte del exterior está ubicado tu
                    repuesto
                </div>

                <div className="buttonBottomMoto">
                    <div>
                        <button
                            className={
                                tercerboton === 1
                                    ? "botonPartCarroceriaMobileMotos"
                                    : tercerboton === 2
                                        ? "botonPartCarroceriaMobileMotosSeleccionado"
                                        : tercerboton === 3
                                            ? "botonPartCarroceriaMobileMotosDeseleccionado"
                                            : "botonPartCarroceriaMobileMotos"
                            }
                            onClick={onClickBoton3}>

                            {labelBoton3}
                        </button>
                        <Button
                            className={
                                tercerboton === 1
                                    ? "infoButtonNewSearchMotos"
                                    : tercerboton === 2
                                        ? "infoButtonNewSearchMotosSeleccionado"
                                        : tercerboton === 3
                                            ? "infoButtonNewSearchMotosDeseleccionado"
                                            : "infoButtonNewSearchMotos"
                            }
                            variant="outline-light"
                            onClick={infoBoton3}
                        >
                            <i className="fa fa-info d-flex justify-content-center" aria-hidden="true"></i>
                        </Button>
                    </div>
                </div>
            </>
        )}

    </div>
);

export default BotoneraMotos;