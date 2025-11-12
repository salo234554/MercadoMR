import React, { useEffect, useState } from "react";
import ModalLocationSearchInteractive from "../../../pages/mensajes/ModalLocationSearchInteractive";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import ModalMensajesCity from "../../../pages/mensajes/ModalMensajesCity";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCitySelect } from "../../../store/cityselect/action";
//import { getClearLocation } from "../../../store/clearlocation/action";
import { getClearLocation } from "../../../store/clearlocation/action";
import { getBlockScreen } from "~/store/blockscreen/action";
import { getDataCityPrd } from "~/store/datacityprd/action";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

let ciudadesAlt = [];
let ciudadesselAlt = [];

const WidgetShopByLocationSearch = (props) => {
    const dispatch = useDispatch();
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [count, setCount] = useState(0);

    const [showModalMensajesCity, setShowModalMensajesCity] = useState(false);
    const [tituloMensajesCity, setTituloMensajesCity] = useState("");
    const [textoMensajesCity, setTextoMensajesCity] = useState("");
    const [textoBoton, setTextoBoton] = useState("Cerrar");

    const [PrdCiudadUno, setPrdCiudadUno] = useState([]);
    const [PrdCiudadDos, setPrdCiudadDos] = useState([]);

    const [cambia, setCambia] = useState(false);
    const [activar, setActivar] = useState(false);
    const [activarCity, setActivarCity] = useState(false);
    const [abrirModal, setAbrirModal] = useState(false);
    const [ciudades, setCiudades] = useState([]);
    const [ciudadesSel, setCiudadesSel] = useState([]);
    const [classCity, setClassCity] = useState("form-group");

    const [selected, setSelected] = useState([]);
    const [marcaSelected, setmarcaSelected] = useState("");
    const [activaCiudad, setActivaCiudad] = useState(true);
    const [citySelected, setCitySelected] = useState([]);
    const [activoFiltroCiud, setActivoFiltroCiud] = useState(false);

    const [classBlock, setClassBlock] = useState("positionfiltersearch");
    const [classBlockFiltros, setClassBlockFiltros] = useState(
        "buttonsLocationSearchInt"
    );

    const [itemSel, setitemSel] = useState(null);

    let clearLocation = useSelector(
        (state) => state.clearlocation.clearlocation
    );

    let dataciudad = useSelector((state) => state.datacityprd.datacityprd);
    console.log("dataciudad : ", dataciudad);

    const changesearch = useSelector(
        (state) => state.changesearch.changesearch
    );

    let blockscreen = useSelector((state) => state.blockscreen.blockscreen);

    const valfltrciudad = useSelector(
        (state) => state.valfltrciudad.valfltrciudad
    );

    console.log("valfltrciudad : ", valfltrciudad);

    useEffect(() => {
        if (valfltrciudad == 1) {
            const datavalfltrciudad = JSON.parse(
                sessionStorage.getItem("datavalfltrciudad")
            );
            let idciudad = [];
            datavalfltrciudad &&
                datavalfltrciudad.map((reg) => {
                    let validar;
                    validar = idciudad.includes(reg);
                    if (!validar) {
                        idciudad.push(reg);
                    }
                });

            setCiudades(idciudad);
        }
    }, [valfltrciudad]);

    useEffect(() => {
        if (clearLocation == 0) {
            limpiarFiltro();
        }
    }, [clearLocation]);

    useEffect(() => {
        // setClassBlock("positionfiltersearch deshabilitardos");
        if (blockscreen == 1) {
            setClassBlockFiltros("buttonsLocationSearchInt deshabilitardos");
            setClassBlock("positionfiltersearch");
        } else {
            setClassBlock("positionfiltersearch");
            setClassBlockFiltros("buttonsLocationSearchInt");
        }
    }, [blockscreen]);

    useEffect(() => {
        const activafiltrociudad = JSON.parse(
            localStorage.getItem("activafiltrociudad")
        );

        if (activafiltrociudad) {
            if (count < 2) {
                setCount(count + 1);

                setActivoFiltroCiud(true);
                let idciudad = [];
                dataciudad &&
                    dataciudad.map((reg) => {
                        let validar;
                        validar = idciudad.includes(reg.idciu);
                        if (!validar) {
                            idciudad.push(reg.idciu);
                        }
                    });

                setCiudades(idciudad);
                sessionStorage.setItem(
                    "datavalfltrciudad",
                    JSON.stringify(idciudad)
                );
            } else {
                setActivoFiltroCiud(false);
            }

            setCambia(!cambia);
        }
        let numprdciudad = [];
        let prdciudaduno = [];
        let prdciudaddos = [];

        dataciudad &&
            dataciudad.map((item, index) => {
                let contador = 0;
                let nombreciudad = "";

                if (index % 2 == 0) {
                    prdciudaduno.push(item);
                } else {
                    prdciudaddos.push(item);
                }
            });
        setPrdCiudadUno(prdciudaduno);
        setPrdCiudadDos(prdciudaddos);
    }, [dataciudad]);

    const limpiarFiltro = () => {
        setCiudades([]);
        setCiudadesSel([]);
        ciudadesAlt = [];
        ciudadesselAlt = [];
        setmarcaSelected("");
        dispatch(getCitySelect(ciudadesselAlt));
        sessionStorage.setItem("datavalfltrciudad", JSON.stringify([]));
        localStorage.setItem("activafiltrociudad", JSON.stringify(false));
        localStorage.setItem("cityselect", JSON.stringify(ciudadesselAlt));
    };

    const filtrar = () => {
        //console.log("CUDAXXX : ", PrdCiudadUno);
        if (ciudadesAlt.length > 4) {
            setActivar("deshabilitar");
            setShowModalMensajesCity(true);
            setTituloMensajesCity("Filtro por Ubicación");
            setTextoMensajesCity(
                "Puedes escoger un maximo de cuatro ciudades!"
            );
            return;
        } else {
            if (ciudadesselAlt.length > 0 && ciudadesAlt.length > 0) {
                localStorage.setItem(
                    "activafiltrociudad",
                    JSON.stringify(true)
                );
                dispatch(getClearLocation(1));
                localStorage.setItem(
                    "cityselect",
                    JSON.stringify(ciudadesselAlt)
                );
            }
        }
    };

    const SelectCity = (item, ciudad, nombreciu, productosciudad) => {
        if (ciudades.includes(ciudad)) {
        } else {
            setitemSel(item);
            setmarcaSelected("subrayartexto");
            //setActivaCiudad(!activaCiudad);
            ciudadesAlt.push(ciudad);
            setCiudades(ciudadesAlt);
            sessionStorage.setItem(
                "datavalfltrciudad",
                JSON.stringify(ciudadesAlt)
            );
            //setActCiy(true);
            let row = {
                id: item,
                idciu: ciudad,
                nombreciu: nombreciu,
                productosciudad: productosciudad,
            };
            ciudadesselAlt.push(row);
        }
    };

    useEffect(() => {
        if (!showModalMensajes) {
            dispatch(getBlockScreen(0));
        }
    }, [showModalMensajes]);

    const activarAyuda = () => {
        dispatch(getBlockScreen(1));
        //setActivar("deshabilitar");
        setShowModalMensajes(true);
        setTituloMensajes("Ubicación de los productos");
        setTextoMensajes("");
        setSelected([]);
        setCiudades([]);
        setCiudadesSel([]);
        ciudadesAlt = [];
        ciudadesselAlt = [];
        setActivaCiudad(false);
        setitemSel(100000000);
        setmarcaSelected("");
        //setIrInicio(true);
        //setPaginaSel(1);
        //setitemIni(1);
        //setItemFin(40);
        /*
        setShowModalMensajesCity(true);
        setTituloMensajesCity("Mostrar más ciudades");
        setTextoMensajesCity("Esta en desarrollo");
        return
        */
    };

    const handleClickAway = () => {
        setCount(0);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <aside className={classBlock}>
                <ModalMensajesCity
                    shown={showModalMensajesCity}
                    close={setShowModalMensajesCity}
                    titulo={tituloMensajesCity}
                    mensaje={textoMensajesCity}
                    setActivarCity={setActivarCity}
                    textoBoton={textoBoton}
                    tipo="6"
                />

                <ModalLocationSearchInteractive
                    shown={showModalMensajes}
                    close={setShowModalMensajes}
                    titulo={tituloMensajes}
                    setActivar={setActivar}
                    PrdCiudadUno={PrdCiudadUno}
                    PrdCiudadDos={PrdCiudadDos}
                    setSelected={setSelected}
                    marcaSelected={marcaSelected}
                    setmarcaSelected={setmarcaSelected}
                    setShowModalMensajesCity={setShowModalMensajesCity}
                    setTituloMensajesCity={setTituloMensajesCity}
                    setTextoMensajesCity={setTextoMensajesCity}
                    ciudades={ciudades}
                    setCiudades={setCiudades}
                    ciudadesSel={ciudadesSel}
                    setCiudadesSel={setCiudadesSel}
                    setActivaCiudad={setActivaCiudad}
                    setAbrirModal={setAbrirModal}
                    setCitySelected={setCitySelected}
                />

                <div className="tamañotextotitulocondicionIntSearch">
                    Por ubicación
                </div>

                <div className="widget__content tamañotextofiltroresultcondicion">
                    {dataciudad &&
                        dataciudad.map((item, index) => {
                            return (
                                <div className={classCity}>
                                    {index < 5 ? (
                                        <div
                                            className="mt-3"
                                            onClick={() =>
                                                SelectCity(
                                                    index,
                                                    item.idciu,
                                                    item.nombre_ciu,
                                                    item.productosciudad
                                                )
                                            }>
                                            {dataciudad ? (
                                                ciudades.includes(
                                                    item.idciu
                                                ) ? (
                                                    <Row className="mtmenos25 mbSpecialInt">
                                                        <Col
                                                            item
                                                            xs={1}
                                                            md={1}
                                                            lg={1}>
                                                            <i
                                                                className="iconochecklocationsearchIntS fa fa-check-square-o"
                                                                aria-hidden="true"></i>
                                                        </Col>
                                                        <Col
                                                            item
                                                            xs={7}
                                                            md={7}
                                                            lg={7}>
                                                            <div className="tamañoletra11IntSs">
                                                                {
                                                                    item.nombre_ciu
                                                                }{" "}
                                                            </div>
                                                        </Col>
                                                        <Col
                                                            item
                                                            xs={1}
                                                            md={1}
                                                            lg={1}>
                                                            <div className="tamañoletra11IntSs">
                                                                (
                                                                {
                                                                    item.productosciudad
                                                                }
                                                                )
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                ) : (
                                                    <Row className="mtmenos25 mbSpecialInt">
                                                        <Col
                                                            item
                                                            xs={1}
                                                            md={1}
                                                            lg={1}>
                                                            <div
                                                                className="iconochecklocationsearchIntS fa fa-square-o"
                                                                aria-hidden="true"></div>
                                                        </Col>
                                                        <Col
                                                            item
                                                            xs={7}
                                                            md={7}
                                                            lg={7}>
                                                            <div className="tamañoletra11IntSs">
                                                                {
                                                                    item.nombre_ciu
                                                                }{" "}
                                                            </div>
                                                        </Col>
                                                        <Col
                                                            item
                                                            xs={1}
                                                            md={1}
                                                            lg={1}>
                                                            <div className="tamañoletra11IntSs">
                                                                (
                                                                {
                                                                    item.productosciudad
                                                                }
                                                                )
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                )
                                            ) : null}
                                        </div>
                                    ) : null}
                                </div>
                            );
                        })}
                    <div>
                        {!activoFiltroCiud && dataciudad?.length > 4 ? (
                            <div
                                className="textomostrarmassearch"
                                onClick={() => activarAyuda()}>
                                Mostrar más
                            </div>
                        ) : (
                            <div
                                className="textomostrarmassearch disabledButton"
                                onClick={() => activarAyuda()}>
                                Mostrar más
                            </div>
                        )}
                        <div className={classBlockFiltros}>
                            <button
                                onClick={() => limpiarFiltro()}
                                className="limpiarfiltrocitysearch">
                                Limpiar
                            </button>
                            <button
                                onClick={() => filtrar()}
                                className="limpiarfiltrocitysearch">
                                Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </ClickAwayListener>
    );
};

export default WidgetShopByLocationSearch;
