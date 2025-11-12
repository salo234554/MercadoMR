import React, { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

const BotoneraUbicacionInicio = ({
    onClickBoton1,
    infoBoton1,
    labelBoton1,
    onClickBoton2,
    infoBoton2,
    labelBoton2,
    onClickBoton3,
    infoBoton3,
    labelBoton3,
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
                            className="botonPartCarroceria"
                            onClick={onClickBoton1}>
                            {labelBoton1}
                        </button>
                        <Button
                            className="infoButtonNewSearch"
                            variant="outline-light"
                            onClick={infoBoton1}>
                            <i
                                className="fa fa-info d-flex justify-content-center"
                                aria-hidden="true"></i>
                        </Button>
                    </div>
                    <div>
                        <button
                            className="botonPartCarroceria"
                            onClick={onClickBoton2}>
                            {labelBoton2}
                        </button>
                        <Button
                            className="infoButtonNewSearch"
                            variant="outline-light"
                            onClick={infoBoton2}>
                            <i
                                className="fa fa-info d-flex justify-content-center"
                                aria-hidden="true"></i>
                        </Button>
                    </div>
                    <div>
                        <button
                            className="botonPartCarroceria"
                            variant="outline-light"
                            onClick={onClickBoton3}>
                            {labelBoton3}
                        </button>
                        <Button
                            className="infoButtonNewSearch"
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
                                className="botonPartCarroceriaMobile"
                                onClick={onClickBoton1}>
                                {labelBoton1}
                            </button>
                            <Button
                                className="infoButtonNewSearch"
                                variant="outline-light"
                                onClick={infoBoton1}>
                                <i
                                    className="fa fa-info d-flex justify-content-center"
                                    aria-hidden="true"></i>
                            </Button>
                        </div>
                        <div>
                            <button
                                className="botonPartCarroceriaMobile"
                                onClick={onClickBoton2}>
                                {labelBoton2}
                            </button>
                            <Button
                                className="infoButtonNewSearch"
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
                                className="botonPartCarroceriaMobile"
                                onClick={onClickBoton3}>
                                {labelBoton3}
                            </button>
                            <Button
                                className="infoButtonNewSearch"
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

export default BotoneraUbicacionInicio;
