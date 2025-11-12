import React from "react";
import { Button, Row } from "react-bootstrap";

const BotoneraCamiones = ({
    onClickBoton1,
    infoBoton1,
    labelBoton1,
    onClickBoton2,
    infoBoton2,
    labelBoton2,
    onClickBoton3,
    infoBoton3,
    labelBoton3,
    seleccionado, // 1, 2, 3 (el botón activo)
    colorActived,
    tercerboton,
    onClickBoton4,
    infoBoton4,
    labelBoton4,

}) => (
    <div className="topSearchIntButtonsMotosMain">
        <Row className="topSearchIntButtons">
            <div className="contSearchIntButtons">
                <div>
                    <button
                        className={
                            seleccionado === 1
                                ? colorActived === 1
                                    ? "seleccionadoClaro"
                                    : "seleccionadoOscuro"
                                : "deseleccionadoClaro"
                        }
                        onClick={onClickBoton1}
                    >
                        {labelBoton1}
                    </button>
                    <Button
                        className={
                            seleccionado === 1
                                ? colorActived === 1
                                    ? "infoSeleccionadoClaro"
                                    : "infoSeleccionadoOscuro"
                                : "infoButtonNewSearchDeseleccionado"
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
                            seleccionado === 2
                                ? colorActived === 1
                                    ? "seleccionadoClaro"
                                    : "seleccionadoOscuro"
                                : "deseleccionadoClaro"
                        }
                        onClick={onClickBoton2}
                    >
                        {labelBoton2}
                    </button>
                    <Button
                        className={
                            seleccionado === 2
                                ? colorActived === 1
                                    ? "infoSeleccionadoClaro"
                                    : "infoSeleccionadoOscuro"
                                : "infoButtonNewSearchDeseleccionado"
                        }
                        variant="outline-light"
                        onClick={infoBoton2}
                    >
                        <i className="fa fa-info d-flex justify-content-center" aria-hidden="true"></i>
                    </Button>
                </div>
                <div>
                    <button
                        className={
                            seleccionado === 3
                                ? colorActived === 1
                                    ? "seleccionadoClaro"
                                    : "seleccionadoOscuro"
                                : "deseleccionadoClaro"
                        }
                        variant="outline-light"
                        onClick={onClickBoton3}
                    >
                        {labelBoton3}
                    </button>
                    <Button
                        className={
                            seleccionado === 3
                                ? colorActived === 1
                                    ? "infoSeleccionadoClaro"
                                    : "infoSeleccionadoOscuro"
                                : "infoButtonNewSearchDeseleccionado"
                        }
                        variant="outline-light"
                        onClick={infoBoton3}
                    >
                        <i className="fa fa-info d-flex justify-content-center" aria-hidden="true"></i>
                    </Button>
                </div>
            </div>

            <div className="buttonstopIntMobile">
                <div className="topSearchIntButtonsMobile">
                    <div>
                        <button
                            className={
                                seleccionado === 1
                                    ? colorActived === 1
                                        ? "botonPartSeleccionadoClaro"
                                        : "botonPartSeleccionadoOscuro"
                                    : "botonPartCarroceriaMobileDeseleccionado"
                            }
                            onClick={onClickBoton1}
                        >
                            {labelBoton1}
                        </button>
                        <Button
                            className={
                                seleccionado === 1
                                    ? colorActived === 1
                                        ? "infoSeleccionadoClaro"
                                        : "infoSeleccionadoOscuro"
                                    : "infoButtonNewSearchDeseleccionado"
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
                                seleccionado === 2
                                    ? colorActived === 1
                                        ? "botonPartSeleccionadoClaro"
                                        : "botonPartSeleccionadoOscuro"
                                    : "botonPartCarroceriaMobileDeseleccionado"
                            }
                            onClick={onClickBoton2}>

                            {labelBoton2}
                        </button>
                        <Button
                            className={
                                seleccionado === 2
                                    ? colorActived === 1
                                        ? "infoSeleccionadoClaro"
                                        : "infoSeleccionadoOscuro"
                                    : "infoButtonNewSearchDeseleccionado"
                            }
                            variant="outline-light"
                            onClick={infoBoton2}
                        >
                            <i className="fa fa-info d-flex justify-content-center" aria-hidden="true"></i>
                        </Button>

                    </div>
                </div>

                <div className="bottomSearchIntButtonsMobile">
                    <div>
                        <button
                            className={
                                seleccionado === 3
                                    ? colorActived === 1
                                        ? "botonPartSeleccionadoClaro"
                                        : "botonPartSeleccionadoOscuro"
                                    : "botonPartCarroceriaMobileDeseleccionado"
                            }
                            onClick={onClickBoton3}>
                            {labelBoton3}
                        </button>
                        <Button
                            className={
                                seleccionado === 3
                                    ? colorActived === 1
                                        ? "infoSeleccionadoClaro"
                                        : "infoSeleccionadoOscuro"
                                    : "infoButtonNewSearchDeseleccionado"
                            }
                            variant="outline-light"
                            onClick={infoBoton3}
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
                            onClick={onClickBoton4}>

                            {labelBoton4}
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
                            onClick={infoBoton4}
                        >
                            <i className="fa fa-info d-flex justify-content-center" aria-hidden="true"></i>
                        </Button>
                    </div>
                </div>
            </>
        )}
    </div>
);

export default BotoneraCamiones;