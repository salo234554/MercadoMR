import React, { useState, useEffect } from "react";
import { Button, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

const BotoneraUbicacion = ({
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
}) => {
    const zoomdatasearch = useSelector(
        (state) => state.zoomdatasearch.zoomdatasearch
    );

    const [classBotonera, setClassBotonera] = useState("");
    //console.log("ZOOMDATASEARCH : ", zoomdatasearch);
    useEffect(() => {
        if (zoomdatasearch != "0" && zoomdatasearch != 0) {
            setClassBotonera("ubicarbotonera");
        } else {
            setClassBotonera("");
        }
    }, [zoomdatasearch]);

    return (
        <div className={classBotonera}>
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
                            onClick={onClickBoton1}>
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
                            onClick={infoBoton1}>
                            <i
                                className="fa fa-info d-flex justify-content-center"
                                aria-hidden="true"></i>
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
                            onClick={infoBoton2}>
                            <i
                                className="fa fa-info d-flex justify-content-center"
                                aria-hidden="true"></i>
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
                            onClick={infoBoton3}>
                            <i
                                className="fa fa-info d-flex justify-content-center"
                                aria-hidden="true"></i>
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
                                onClick={onClickBoton1}>
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
                                onClick={infoBoton1}>
                                <i
                                    className="fa fa-info d-flex justify-content-center"
                                    aria-hidden="true"></i>
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
                                onClick={infoBoton2}>
                                <i
                                    className="fa fa-info d-flex justify-content-center"
                                    aria-hidden="true"></i>
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
                                onClick={infoBoton3}>
                                <i
                                    className="fa fa-info d-flex justify-content-center"
                                    aria-hidden="true"></i>
                            </Button>
                        </div>
                    </div>
                </div>
            </Row>
        </div>
    );
};

export default BotoneraUbicacion;
