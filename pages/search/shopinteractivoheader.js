
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Row, Col, Button } from "react-bootstrap";
import SidebarShop from "~/components/shared/sidebar/SidebarShopSearchInteractive";
import imagenbarra from "../../public/static/img/icon/bars.svg";
import imagenfoto from "../../public/static/img/icon/gird2.svg";
import SortBySearchInteractive from "../../components/partials/shop/modules/SortBySearchInteractive"
import { useSelector, useDispatch } from "react-redux";
import { getChangeSearch } from "../../store/changesearch/action";
import { getBlockScreen } from "../../store/blockscreen/action";
import { getViewSearch } from "../../store/viewsearch/action";
import { getPageSelect } from "../../store/pageselect/action";
import { getRangosPrecio } from "~/store/rangosprecio/action";

import { CgSearch } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { TbLayoutGridFilled } from "react-icons/tb";
import { getClearCondition } from "../../store/clearcondition/action";
import { getClearLocation } from "../../store/clearlocation/action";
import { getZoomDataSearch } from "~/store/zoomdatasearch/action";
import { getViewVehPrd } from "~/store/viewvehprd/action";
import { getSelectViewPrd } from "~/store/selectviewprd/action";
import { getViewAddCart } from "~/store/viewaddcart/action";

const ShopInteractivoHeader = (props) => {
    const {
        showProductInteractivo,
        setShowProductInteractivo,
        setOptionSelect,
        optionSelect,
        setMaximizarOption,
        maximizarOption,
        zoom,
        setZoom,
        setActualiza,
        setPalabra,
        setOrderPrice,
        registrosPorPagina,
        setRegistrosPorPagina,
        datosBuscar,
        setDatosBuscar,
        dataFiltrada
    } = props;
    const dispatch = useDispatch();

    const [selectItem, setSelectItem] = useState("botonheaderinteractivoderecha");
    const [selectPhoto, setSelectPhoto] = useState("botonheaderinteractivoderecha");
    const [selectMaximizar, setSelectMaximizar] = useState("botonheaderinteractivoderecha");
    const [titulo, setTitulo] = useState("Ordenar por");

    let selectviewprd = useSelector((state) => state.selectviewprd.selectviewprd);
    let viewSearch = useSelector((state) => state.viewsearch.viewsearch);

    //console.log("selectviewprd : ",selectviewprd, " - ", viewSearch)
    // Condición para redirigir View de Productos Buscador Especial
    useEffect(() => {
        if (selectviewprd > 0 && viewSearch) {
            setMaximizarOption(1);
            let ctrview = JSON.parse(localStorage.getItem("ctrview"));

            if (selectviewprd == 10) {
                dispatch(getSelectViewPrd(0));
                dispatch(getViewVehPrd(0));
                dispatch(getViewSearch(null));
            }

            if (ctrview) {
                dispatch(getViewSearch(true));
                //dispatch(getSelectViewPrd(0));
            } else {
                dispatch(getViewSearch(false));
            }

            dispatch(getChangeSearch(1));
            dispatch(getBlockScreen(0));
        } else {
            setMaximizarOption(0);
        }
    }, [selectviewprd, viewSearch])

    useEffect(() => {
        setOptionSelect(1);
        setRegistrosPorPagina(9);
        setSelectItem("botonheaderinteractivoderechaselect");
    }, []);

    const MostrarItems = () => {
        setOptionSelect(1);
        setRegistrosPorPagina(9);
        setSelectItem("botonheaderinteractivoderechaselect");
        setSelectPhoto("botonheaderinteractivoderecha colornoseleccion");

        if (zoom) {
            setMaximizarOption(1);
        }
    };

    const MostrarFotos = () => {
        setOptionSelect(2);
        setRegistrosPorPagina(6);
        setSelectPhoto("botonheaderinteractivoderechaselect");
        setSelectItem("botonheaderinteractivoderecha colornoseleccion");

        if (zoom) {
            setMaximizarOption(2);
        }
    };

    const maximizar = () => {
        const url = window.location.pathname;
         alert("URL555555")
        localStorage.setItem("urlviewprd", JSON.stringify(url));
        dispatch(getViewVehPrd(0));
        sessionStorage.setItem("datavalfltrciudad", JSON.stringify([]));
        localStorage.setItem("activerangeprice", JSON.stringify(false));

        //*****REINICIAL FILTRO DE PRECIOS ***/
        let item = {
            menorprecio: 1,
            mayorprecio: 100000000,
        };

        // Coloca los datos en state arreglo de años de los vehiculos
        dispatch(getRangosPrecio(item));
        localStorage.setItem("orderbyprd", JSON.stringify(0));
        localStorage.setItem("rangoprecios", JSON.stringify(item));
        localStorage.setItem("activerangeprice", JSON.stringify(false));
        localStorage.setItem("openviewprdsearch", JSON.stringify(false));

        localStorage.setItem("aadditemcar", JSON.stringify(false));
        sessionStorage.setItem("dataExpandirFiltrada", JSON.stringify(dataFiltrada));
        sessionStorage.setItem("dataExpandirFiltradaII", JSON.stringify(dataFiltrada));
        sessionStorage.setItem("dataExpandirBase", JSON.stringify(dataFiltrada));
        dispatch(getZoomDataSearch(1));

        if (maximizarOption === 0) {
            if (optionSelect === 1) setMaximizarOption(1);
            else if (optionSelect === 2) setMaximizarOption(2);
            //setZoom(true);
        }
        dispatch(getClearCondition(0));
        dispatch(getClearLocation(0));
        dispatch(getChangeSearch(1));
        dispatch(getBlockScreen(0));
    };

    useEffect(() => {
        let activargrilla = JSON.parse(localStorage.getItem("activargrilla"));
        if (activargrilla == 1) {
            setMaximizarOption(1);
            setOptionSelect(1);
            setRegistrosPorPagina(9);
        } else
            if (activargrilla == 2) {
                setMaximizarOption(2);
                setOptionSelect(2);
                setRegistrosPorPagina(6);
            } else
                if (activargrilla == 3) {
                    setMaximizarOption(3);
                    setOptionSelect(3);
                    setRegistrosPorPagina(6);
                }
    }, []);

    const minimizar = () => {

        //*****REINICIAL FILTRO DE PRECIOS ***/
        let item = {
            menorprecio: 1,
            mayorprecio: 100000000,
        };

        // Coloca los datos en state arreglo de años de los vehiculos
        dispatch(getViewAddCart(0));
        dispatch(getRangosPrecio(item));
        localStorage.setItem("orderbyprd", JSON.stringify(0));
        localStorage.setItem("rangoprecios", JSON.stringify(item));
        localStorage.setItem("activerangeprice", JSON.stringify(false));
        localStorage.setItem("openviewprdsearch", JSON.stringify(false));

        sessionStorage.setItem("dataExpandirFiltrada", JSON.stringify(dataFiltrada));
        sessionStorage.setItem("dataExpandirFiltradaII", JSON.stringify(dataFiltrada));
        sessionStorage.setItem("dataExpandirBase", JSON.stringify(dataFiltrada));

        localStorage.setItem("activerangeprice", JSON.stringify(false));
        const url = window.location.pathname;

         alert("URL666666")
        localStorage.setItem("urlviewprd", JSON.stringify(url));
        dispatch(getViewVehPrd(0));
        sessionStorage.setItem("datavalfltrciudad", JSON.stringify([]));

        if (maximizarOption != 0) {
            setMaximizarOption(0);
            setSelectPhoto("botonheaderinteractivoderecha  ");
            setSelectItem("botonheaderinteractivoderecha");
            setSelectMaximizar("botonheaderinteractivoderecha  ")
            //setZoom(false);
        }

        localStorage.setItem("aadditemcar", JSON.stringify(false));
        dispatch(getChangeSearch(1));
        dispatch(getBlockScreen(0));
    };

    function handleSubmit(e) {
        setActualiza(true);
    }

    const tituloOnChange = (e) => {
        dispatch(getPageSelect(1));
        dispatch(getViewVehPrd(0));
        var strLength = e.length;
        //console.log("INPUTXX : ", e);
        setPalabra(e);
        setDatosBuscar(e);
        setTitulo("Ordenar por");
        localStorage.setItem("datosbuscar", JSON.stringify(e));
    };

    useEffect(() => {
        if (!datosBuscar || datosBuscar == null || datosBuscar == "") {
            localStorage.setItem("expandirdata", JSON.stringify(false));
        } else
            if (datosBuscar) {
                localStorage.setItem("expandirdata", JSON.stringify(true));
            }
    }, [datosBuscar])

    return (
        <div className="tamañobuscadorsearchinteractive">
            <div className="rightFiltersInteractiveSearch">
                <div className="searchContNewSearchInteractiveMain">
                    <div className="searchContNewSearchInteractive">
                        <input
                            onChange={(e) => tituloOnChange(e.target.value)}
                            type="text"
                            value={datosBuscar}
                            className="search-input-interactive"
                        />
                        <CgSearch className="search-icon-interactive" />
                    </div>
                </div>

                <div className="iconsFiltersInteractiveSearch">
                    <Button
                        className={selectItem}
                        variant="outline-light"
                        onClick={() => MostrarItems()}
                    >
                        <TiThMenu />
                    </Button>
                    <Button
                        className={selectPhoto}
                        variant="outline-light"
                        onClick={() => MostrarFotos()}
                    >
                        <TbLayoutGridFilled />
                    </Button>
                    {
                        maximizarOption === 0 ?
                            (
                                <Button
                                    className={selectMaximizar}
                                    variant="outline-light"
                                >
                                    <i
                                        onClick={() => maximizar()}
                                        className="tamañomaximizarminimizar fa fa-arrows-alt"
                                        aria-hidden="true"></i>
                                </Button>
                            )
                            :
                            (
                                <Button
                                    className={selectMaximizar}
                                    variant="outline-light"
                                >
                                    <i
                                        onClick={() => minimizar()}
                                        className="tamañomaximizarminimizar fa fa-2x fa fa-compress"
                                        aria-hidden="true"></i>
                                </Button>
                            )
                    }
                </div>
            </div>
            <Row>
                <Col xs={9} sm={9} md={9} lg={12}>
                    {maximizarOption != 2 && maximizarOption != 1 ?
                        <div className="ml-1 mb-2 ps-layout__left">
                            <SortBySearchInteractive
                                setOrderPrice={setOrderPrice}
                                titulo={titulo}
                                setTitulo={setTitulo}
                            />
                        </div>
                        :
                        <div className="ml-15 mt-15 ps-layout__left">

                        </div>
                    }
                </Col>
            </Row>
        </div>
    );
};

export default ShopInteractivoHeader;