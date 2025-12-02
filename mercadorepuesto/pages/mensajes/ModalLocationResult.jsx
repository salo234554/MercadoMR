import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getOpenCloseCity } from "../../store/openclosecity/action";
import { IoClose } from "react-icons/io5";
import { FaLongArrowAltDown } from "react-icons/fa";
import { useRef } from "react";

let ciudadesAlt = [];
let ciudadesselAlt = [];

function ModalLocationResult(props) {
    const dispatch = useDispatch();

    const {
        shown,
        close,
        titulo,
        setActivar,
        PrdCiudadUno,
        PrdCiudadDos,
        setSelected,
        marcaSelected,
        setmarcaSelected,
        ciudades,
        setCiudades,
        ciudadesSel,
        setCiudadesSel,
        setActivaCiudad,
        setAbrirModal,
        setActivarCity,
        setCitySelected,
        setActivoFiltroCiud
    } = props;

    const [itemSel, setitemSel] = useState(null);
    const [cambia, setCambia] = useState(false);
    const messagesRef = useRef(null);

    const cerrar = () => {
        close(false);
        setCiudades([]);
        setCiudadesSel([]);
        setActivaCiudad(false);
        setActivar("habilitar");
        ciudadesAlt = [];
        ciudadesselAlt = [];
        //setActivarCity(true);
    };

    const filtrar = () => {
        if (ciudadesSel.length > 4) {
            setAbrirModal(true);
            return;
        } else {
            close(false);
            if (ciudadesSel.length > 0) {
                localStorage.setItem("activafiltrociudad", JSON.stringify(true));
                dispatch(getOpenCloseCity(1));
                setActivoFiltroCiud(true);
                setSelected(ciudadesSel);
                setCitySelected(ciudadesSel);
                setActivaCiudad(true);
                ciudadesAlt = [];
                ciudadesselAlt = [];
                //ciudades = [];
            }
            setActivar("habilitar");
        }
    };

    const control = () => {
        setCambia(!cambia);
    };

    const SelectCity = (item, ciudad, nombreciu, productosciudad) => {

        if (ciudades.includes(ciudad)) {
            setCambia(!cambia);

            let idcity = ciudades;
            let idcitysel = ciudadesSel;

            setCiudades([]);
            setCiudadesSel([]);

            let idcitydos = [];
            let idcitydossel = [];

            idcity &&
                idcity.map((row, index) => {
                    if (row != ciudad) {
                        idcitydos.push(row);
                        setmarcaSelected("");
                    }
                });

            idcitysel &&
                idcitysel.map((row, index) => {
                    if (row.idciu != ciudad) {
                        idcitydossel.push(row);
                        setmarcaSelected("");
                    }
                });

            setCiudades(idcitydos);
            setCiudadesSel(idcitydossel);
            ciudadesAlt = idcitydos;
            ciudadesselAlt = idcitydossel;
            setSelected(idcitydossel);
        } else {
            setitemSel(item);
            setmarcaSelected("subrayartexto");
            setActivaCiudad(false);
            ciudadesAlt.push(ciudad);
            setCiudades(ciudadesAlt);
            let row = {
                id: item,
                idciu: ciudad,
                nombreciu: nombreciu,
                productosciudad: productosciudad
            };
            ciudadesselAlt.push(row);
            setCiudadesSel(ciudadesselAlt);
        }
    };

    console.log("ciudadesAlt : ", ciudadesAlt)

    return shown ? (
        <div
            className="modal-fondo"
            onClick={() => {
                cerrar();
            }}>
            <div
                className="modal-location-result redondearventamensaje"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div>
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12}>
                            <div className="mtmenos10 titulomodallocationresult">
                                <p>{titulo}</p>
                                <IoClose onClick={() => {
                                    cerrar();
                                }} />
                            </div>
                        </Col>
                    </Row>
                </div>
             
                <div className="dropdowncity" ref={messagesRef}>
                    <Row className="mlmenos">
                        <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                            <div
                                className="dropdown-ubicacion-prd-ciudad"
                                onMouseEnter={() => control()}>

                                {PrdCiudadUno &&
                                    PrdCiudadUno.map((item, index) => {
                                        return (
                                            <div
                                                className="mt-1"
                                                onClick={() =>
                                                    SelectCity(
                                                        item.id,
                                                        item.idciu,
                                                        item.nombre_ciu,
                                                        item.productosciudad
                                                    )
                                                }>

                                                {cambia || !cambia ? (
                                                    ciudades.includes(
                                                        item.idciu
                                                    ) ? (
                                                        <div>
                                                            <i
                                                                className="tamañoletra11 fa fa-check-square-o"
                                                                aria-hidden="true"></i>
                                                            <label
                                                                className={
                                                                    marcaSelected
                                                                }
                                                                htmlFor="five-star">
                                                                <span className="ps-rating">
                                                                    <a>
                                                                        {
                                                                            item.nombre_ciu
                                                                        }{" "}
                                                                    </a>
                                                                </span>
                                                                <span className="total">
                                                                    (
                                                                    {
                                                                        item.productosciudad
                                                                    }
                                                                    )
                                                                </span>
                                                            </label>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <i
                                                                className="tamañoletra11 fa fa-square-o"
                                                                aria-hidden="true"></i>
                                                            <label htmlFor="five-star">
                                                                <span className="ps-rating">
                                                                    <a>
                                                                        {
                                                                            item.nombre_ciu
                                                                        }{" "}
                                                                    </a>
                                                                </span>
                                                                <span className="total">
                                                                    (
                                                                    {
                                                                        item.productosciudad
                                                                    }
                                                                    )
                                                                </span>
                                                            </label>
                                                        </div>
                                                    )
                                                ) : null}
                                            </div>
                                        );
                                    })}

                                {PrdCiudadDos &&
                                    PrdCiudadDos.map((item, index) => {
                                        return (
                                            <div
                                                className="mt-1 dropdown-ubicacion-prd-ciudad-mobile"
                                                onClick={() =>
                                                    SelectCity(
                                                        item.id,
                                                        item.idciu,
                                                        item.nombre_ciu,
                                                        item.productosciudad
                                                    )
                                                }>

                                                {cambia || !cambia ? (
                                                    ciudades.includes(
                                                        item.idciu
                                                    ) ? (
                                                        <div>
                                                            <i
                                                                className="tamañoletra11 fa fa-check-square-o"
                                                                aria-hidden="true"></i>
                                                            <label
                                                                className={
                                                                    marcaSelected
                                                                }
                                                                htmlFor="five-star">
                                                                <span className="ps-rating">
                                                                    <a>
                                                                        {
                                                                            item.nombre_ciu
                                                                        }{" "}
                                                                    </a>
                                                                </span>
                                                                <span className="total">
                                                                    (
                                                                    {
                                                                        item.productosciudad
                                                                    }
                                                                    )
                                                                </span>
                                                            </label>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <i
                                                                className="tamañoletra11 fa fa-square-o"
                                                                aria-hidden="true"></i>
                                                            <label htmlFor="five-star">
                                                                <span className="ps-rating">
                                                                    <a>
                                                                        {
                                                                            item.nombre_ciu
                                                                        }{" "}
                                                                    </a>
                                                                </span>
                                                                <span className="total">
                                                                    (
                                                                    {
                                                                        item.productosciudad
                                                                    }
                                                                    )
                                                                </span>
                                                            </label>
                                                        </div>
                                                    )
                                                ) : null}
                                            </div>
                                        );
                                    })}
                                {

                                }{" "}
                            </div>



                        </Col>
                        <div className="mlmenos55 none805px" >
                            <Col xl={3} lg={3} md={3} sm={3}>
                                <div
                                    className="dropdown-ubicacion-prd-ciudad"
                                    onMouseEnter={() => control()}>
                                    {PrdCiudadDos &&
                                        PrdCiudadDos.map((item, index) => {
                                            return (
                                                <div
                                                    className="mt-1"
                                                    onClick={() =>
                                                        SelectCity(
                                                            item.id,
                                                            item.idciu,
                                                            item.nombre_ciu,
                                                            item.productosciudad
                                                        )
                                                    }>
                                                    {cambia || !cambia ? (
                                                        ciudades.includes(
                                                            item.idciu
                                                        ) ? (
                                                            <div>
                                                                <i
                                                                    className="tamañoletra11 fa fa-check-square-o"
                                                                    aria-hidden="true"></i>
                                                                <label
                                                                    className={
                                                                        marcaSelected
                                                                    }
                                                                    htmlFor="five-star">
                                                                    <span className="ps-rating">
                                                                        <a>
                                                                            {
                                                                                item.nombre_ciu
                                                                            }{" "}
                                                                        </a>
                                                                    </span>
                                                                    <span className="total">
                                                                        (
                                                                        {
                                                                            item.productosciudad
                                                                        }
                                                                        )
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <i
                                                                    className="tamañoletra11 fa fa-square-o"
                                                                    aria-hidden="true"></i>
                                                                <label htmlFor="five-star">
                                                                    <span className="ps-rating">
                                                                        <a>
                                                                            {
                                                                                item.nombre_ciu
                                                                            }{" "}
                                                                        </a>
                                                                    </span>
                                                                    <span className="total">
                                                                        (
                                                                        {
                                                                            item.productosciudad
                                                                        }
                                                                        )
                                                                    </span>
                                                                </label>
                                                            </div> 
                                                        )
                                                    ) : null}
                                                </div>
                                            );
                                        })}
                                </div>
                            </Col>
                        </div>
                    </Row>
                </div>
                <div className="divAcceptMobile">
                    <div>
                        <span className="circuloIconoBottomCiudades"
                            onClick={() => {
                                setTimeout(() => {
                                    if (messagesRef.current) {
                                        messagesRef.current.scrollTo({
                                            top: messagesRef.current.scrollHeight,
                                            behavior: "smooth",
                                        });
                                    }
                                }, 100);
                            }}>
                            <FaLongArrowAltDown color="#ffffff" />
                        </span>
                        <Button
                            onClick={() => filtrar()}
                            className="botoncityMobile">
                            Aceptar
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    ) : null;
}

export default ModalLocationResult;
