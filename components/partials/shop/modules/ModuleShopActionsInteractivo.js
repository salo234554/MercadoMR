import React, { useState, useEffect } from "react";
import SortByPrice from "~/components/partials/shop/modules/SortByPrice";
import { getChangeSearch } from "../../../../store/changesearch/action";
import { useSelector, useDispatch } from "react-redux";
import { getClearCondition } from "../../../../store/clearcondition/action";
import { getAddEdToCart } from "../../../../store/addedtocart/action";
import { getCustomVehicle } from "~/store/customvehicle/action";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { IoSearch } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import { LuChevronDown } from "react-icons/lu"
import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import FilterContentMobileInteractive from "./FilterContentMobileInteractive";;
import { getZoomDataSearch } from "~/store/zoomdatasearch/action";
import { getActivarViewPrd } from "~/store/activarviewprd/action";
import { getViewVehPrd } from "~/store/viewvehprd/action";
import { getFilterSearchInteractive } from "~/store/filtersearchinteractive/action";
import { getPageSelect } from "~/store/pageselect/action";
import { getOptionSelect } from "~/store/optionselect/action";
import { getViewAddCart } from "~/store/viewaddcart/action";

const layoutItems = [
    {
        id: 1,
        url: "/shop?layout=list",
        image: "/static/img/icon/bars.svg",
        imageActive: "/static/img/icon/bars.svg",
    },
    {
        id: 2,
        url: "/shop?layout=grid&columns=2",
        image: "/static/img/icon/gird2.svg",
        imageActive: "/static/img/icon/gird2.svg",
    },
    {
        id: 3,
        url: "/shop?layout=grid&columns=3",
        image: "/static/img/icon/gird3.svg",
        imageActive: "/static/img/icon/gird3.svg",
    },
    {
        id: 4,
        url: "/shop?layout=grid&columns=4",
        image: "/static/img/icon/gird4.svg",
        imageActive: "/static/img/icon/gird4.svg",
    },
];

let showItem = "fa fa-bars gripone";
let showPhoto = "fa fa-th-large griptwoselect";
let showItemPhoto = "fa fa-th-list gripthree";

const ModuleShopActionsInteractivo = (props) => {
    const {
        setOptionSelect,
        optionSelect,
        setMaximizarOption,
        maximizarOption,
        orderPrice,
        setOrderPrice,
        datosBuscar,
        setDatosBuscar,
        productItems,
        resetDataSearch,
        setResetDataSearch,
    } = props;

    const dispatch = useDispatch();
    const [selectedLayout, setSelectedLayout] = useState(layoutItems[3]);
    const Router = useRouter();
    const [selectItem, setSelectItem] = useState("botonheaderinteractivoderecha");
    const [selectPhoto, setSelectPhoto] = useState("botonheaderinteractivoderecha mlmenos20");
    const [selectMaximizar, setSelectMaximizar] = useState("botonheaderinteractivoderecha mlmenos35");
    const [filterData, setFilterData] = useState(null);

    const [open, setOpen] = useState(false);
    const [allData, setAllData] = useState(false);

    const theme = useTheme();
    // Detectamos el tamaño de pantalla con Material UI
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));  // <600px
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px - 899px
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg")); // 900px - 1199px
    const isLgOrMore = useMediaQuery(theme.breakpoints.up("lg")); // >=1200px

    const getDrawerWidth = () => {
        if (isXs) return "100%";  // Móviles: 100%
        if (isSm) return "40%";   // Tablets pequeñas: 60%
        if (isMd) return "30%";   // Tablets grandes: 50%
        return "30%";             // Escritorios grandes: 30%
    };

    useEffect(() => {
        let datosbuscar = JSON.parse(localStorage.getItem("datosbuscar"));
        setResetDataSearch(false);

        if (datosbuscar)
            setFilterData(datosbuscar);
        else
            setFilterData(datosBuscar);

        let dataPrdtItemsAll = JSON.parse(
            sessionStorage.getItem("dataPrdtItemsAll")
        );

    }, [datosBuscar]);

    useEffect(() => {
        if (isLgOrMore && open) {
            setOpen(false);
        }
    }, [isLgOrMore, open]);

    useEffect(() => {

        if (optionSelect == 1) {
            dispatch(getOptionSelect(1));
            showItem = "fa fa-bars griponeselect";
            showPhoto = "fa fa-th-large griptwo";
            showItemPhoto = "fa fa-th-list gripthree";
        } else
            if (optionSelect == 2) {
                dispatch(getOptionSelect(2));
                showItem = "fa fa-bars gripone";
                showPhoto = "fa fa-th-large griptwoselect";
                showItemPhoto = "fa fa-th-list gripthree";
            }
            else
                if (optionSelect == 3) {
                    dispatch(getOptionSelect(3));
                    showItem = "fa fa-bars gripone";
                    showPhoto = "fa fa-th-large griptwo";
                    showItemPhoto = "fa fa-th-list gripthreeselect";
                }
    }, [optionSelect]);

    //function handleSelecteLayout(e, layout) {
    function handleSelecteLayout(e) {
        let layout = {
            id: 1,
            image: "/static/img/icon/bar.svg",
            imageActive: "/static/img/icon/bars.svg",
            url: "/shop?layout=list"
        }
        //console.log("LAYOU : ", layout)
        e.preventDefault();
        setSelectedLayout(layout);
        Router.push(layout.url, undefined, { scroll: false });
    }

    //console.log("OPTION : ", 'ITEM: ', showItem, 'FOTO: ', showPhoto, 'ITEMFOTO: ', showItemPhoto)
    const MostrarItems = (seleccion) => {
        dispatch(getOptionSelect(1));
        showItem = "fa fa-bars griponeselect";
        showPhoto = "fa fa-th-large griptwo";
        showItemPhoto = "fa fa-th-list gripthree";
        setOptionSelect(1);
        localStorage.setItem("openviewprdsearch", JSON.stringify(true));
        setSelectItem("botonheaderinteractivoderechaselect mlmenos5");
        setSelectPhoto("botonheaderinteractivoderecha mlmenos20 colornoseleccion");
        setMaximizarOption(1);
    };

    const MostrarFotos = (seleccion) => {
        dispatch(getOptionSelect(2));
        showItem = "fa fa-bars gripone";
        showPhoto = "fa fa-th-large griptwoselect";
        showItemPhoto = "fa fa-th-list gripthree";
        localStorage.setItem("openviewprdsearch", JSON.stringify(true));
        setOptionSelect(2);
        setSelectPhoto("botonheaderinteractivoderechaselect mlmenos20");
        setSelectItem("botonheaderinteractivoderecha colornoseleccion");
        setMaximizarOption(2);
    };

    const MostrarFotosItems = (seleccion) => {
        dispatch(getViewAddCart(1));
        dispatch(getOptionSelect(3));
        showItem = "fa fa-bars gripone";
        showPhoto = "fa fa-th-large griptwo";
        showItemPhoto = "fa fa-th-list gripthreeselect";
        localStorage.setItem("aadditemcar", JSON.stringify(true));
        localStorage.setItem("openviewprdsearch", JSON.stringify(true));

        setOptionSelect(3);
        setSelectPhoto("botonheaderinteractivoderechaselect mlmenos20");
        setSelectItem("botonheaderinteractivoderecha colornoseleccion");
        setMaximizarOption(3);
    };

    const maximizar = () => {
        dispatch(getChangeSearch(0));
        localStorage.setItem("openviewprdsearch", JSON.stringify(true));
        if (maximizarOption === 0) {
            if (optionSelect === 1) setMaximizarOption(1);
            else if (optionSelect === 2) setMaximizarOption(2);
            //setZoom(true);
        }
    };

    //AQUIESTA
    const minimizar = () => {
        //localStorage.setItem("openviewprdsearch", JSON.stringify(true));
        dispatch(getViewAddCart(1));
        dispatch(getViewVehPrd(0));
        dispatch(getActivarViewPrd(false));
        dispatch(getZoomDataSearch(0));
        setResetDataSearch(false);
        setDatosBuscar(null);
        localStorage.setItem("openviewprdsearch", JSON.stringify(true));
        sessionStorage.setItem("datavalfltrciudad", JSON.stringify([]));
        sessionStorage.setItem("dataExpandirFiltrada", JSON.stringify([]));
        sessionStorage.setItem("dataExpandirFiltradaII", JSON.stringify([]));
        localStorage.setItem("activerangeprice", JSON.stringify(false));

        localStorage.setItem("datosbuscar", JSON.stringify(null));
        localStorage.setItem("expandirdata", JSON.stringify(true));
        localStorage.setItem("activargrilla", JSON.stringify(0));
        localStorage.setItem("aadditemcar", JSON.stringify(false));
        let item = {
            idproducto: 0,
            nombreimagen1: "",
            titulonombre: "",
        };
        localStorage.setItem("addedtocart", JSON.stringify(item));
        dispatch(getAddEdToCart(item));

        if (maximizarOption != 0) {
            setMaximizarOption(0);
            setSelectPhoto("botonheaderinteractivoderecha mlmenos20");
            setSelectItem("botonheaderinteractivoderecha");
            setSelectMaximizar("botonheaderinteractivoderecha mlmenos35")
            dispatch(getClearCondition(0));
            //setZoom(false);
        }
    };

    const tituloOnChange = (e) => {
        var strLength = e.length;
        //console.log("FILTER DATA : ", e);
        setResetDataSearch(true);
        setFilterData(e);
        dispatch(getCustomVehicle(1));
        dispatch(getPageSelect(1));
        localStorage.setItem("openviewprdsearch", JSON.stringify(true));
        if (!e) {
            localStorage.setItem("datosbuscar", JSON.stringify(null));
            setDatosBuscar(e);
            setResetDataSearch(false);
        }

        localStorage.setItem("ctlrCount", JSON.stringify(true));
        let viewDataSearch = JSON.parse(sessionStorage.getItem("dataExpandirFiltrada"));

        if (!allData) {
            setAllData(true);
        }

        if (parseInt(strLength) == 0) {
            let viewDataSearchAll = JSON.parse(localStorage.getItem("viewdatasearchall"));
        } else {
            let array = [];
            viewDataSearch &&
                viewDataSearch.map((row, index) => {
                    let valid;
                    let compara = row.name.toLowerCase();
                    let dat = e?.toLowerCase();

                    valid = compara?.includes(dat);
                    if (valid) {
                        array.push(row);
                    }
                });

        }
    };

    const filterDataSearch = () => {
        //alert(filterData)
        //return
        setDatosBuscar(filterData);
        localStorage.setItem("datosbuscar", JSON.stringify(filterData));
        dispatch(getCustomVehicle(2));

        if (!filterData) {
            setResetDataSearch(false);
        }
        //console.log("ON CLICK : ", datosBuscar);
    }

    const activeOrderPrice = () => {
        localStorage.setItem("openviewprdsearch", JSON.stringify(true));
    }

    //{swichersItemsView}
    //console.log("DATAYYYYY : ", datosBuscar);
    return (
        <div className="actionsinteractivo">
            <div className="ps-shop__actions none1325px">
                <div className="ps-shop__actions-left">
                    {showItem || showPhoto || showItemPhoto ?

                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs={1} md={1} lg={1}>
                                <i className={showItem}
                                    onClick={() => MostrarItems(1)}
                                ></i>
                            </Grid>
                            <Grid item xs={1} md={1} lg={1}>
                                <i className={showPhoto}

                                    onClick={() => MostrarFotos(2)}
                                ></i>
                            </Grid>
                            <Grid item xs={1} md={1} lg={1}></Grid>
                            <Grid item xs={1} md={1} lg={1}>
                                <i className={showItemPhoto}
                                    onClick={() => MostrarFotosItems(3)}
                                ></i>
                            </Grid>
                            <Grid item xs={1} md={1} lg={1}>
                                <div
                                    className="tamañoiconosheadershopzoom ml-15 apuntador"
                                    onClick={() => minimizar()}
                                >
                                    <i
                                        className="fa fa fa-compress"
                                        aria-hidden="true"></i>
                                </div>
                            </Grid>
                        </Grid>
                        :
                        null
                    }

                    <div className="tamañobarrasearinteractive ps-search-table-mr-zoom">
                        <Grid container>
                            <Grid item xs={10} md={10} lg={10}>
                                <input
                                    className="colorbuscadorsearchzoom sinborder textocolor"
                                    //name={datosBuscar}
                                    onChange={(e) => tituloOnChange(e.target.value)}
                                    value={filterData}
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={2} md={2} lg={2}>
                                <div className="input-group-append colorbuscador2">
                                    <a href="#" onClick={() => filterDataSearch()}>
                                        <i className="fa fa-search"></i>
                                    </a>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className="ps-shop__actions-right"
                    onClick={() => activeOrderPrice()}
                >
                    <SortByPrice
                        orderPrice={orderPrice}
                        setOrderPrice={setOrderPrice}
                    />
                </div>
            </div>

            <div className="topBarInteractiveSearchMax">
                <div className="subtopBarInteractiveSearchMax none620px">
                    <div className="iconssubtopBarInteractiveSearchMax">
                        <i className={showItem}
                            onClick={() => MostrarItems(1)}
                        ></i>

                        <i className={showPhoto}

                            onClick={() => MostrarFotos(2)}
                        ></i>

                        <i className={showItemPhoto}
                            onClick={() => MostrarFotosItems(3)}
                        ></i>

                        <div
                            className="tamañoiconosheadershopzoom apuntador"
                            onClick={() => minimizar()}
                        >
                            <i
                                className="fa fa fa-compress"
                                aria-hidden="true"></i>
                        </div>
                    </div>

                    <div className="tamañobarrasearinteractive ps-search-table-mr-zoom">
                        <Grid container>
                            <Grid item xs={9} md={9} lg={9}>
                                <input
                                    type="text"
                                    className="colorbuscadorsearchzoom2"
                                    onChange={(e) => tituloOnChange(e.target.value)}
                                    value={filterData}
                                />
                            </Grid>
                            <Grid item xs={2} md={2} lg={2}>
                                <div className="input-group-append colorbuscador3">
                                    <a href="#" onClick={() => filterDataSearch()}>
                                        <i className="mlmenos25 fa fa-search"></i>
                                    </a>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <div className="none950px"
                        onClick={() => activeOrderPrice()}
                    >
                        <SortByPrice
                            orderPrice={orderPrice}
                            setOrderPrice={setOrderPrice}
                        />
                    </div>

                    <div className="rightFilterReultsInterSearch">
                        <div onClick={() => setOpen(true)}>
                            <VscSettings />
                            Filtros
                            <LuChevronDown />
                        </div>
                    </div>
                </div>

                <div className="subtopBarInteractiveSearchMax show620px">
                    <div className="search-wrapper">
                        <input
                            type="text"
                            className="search-input-interactive-max"
                            onChange={(e) => tituloOnChange(e.target.value)}
                            value={filterData}
                        />
                        <div className="input-group-append colorbuscador">
                            <a href="#" onClick={() => filterDataSearch()}>
                                <i className="fa fa-search"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="subtopBarInteractiveSearchMax show620px">
                    <div className="iconssubtopBarInteractiveSearchMax">
                        <i className={showItem}
                            onClick={() => MostrarItems(1)}
                        ></i>

                        <i className={showPhoto}

                            onClick={() => MostrarFotos(2)}
                        ></i>

                        <i className={showItemPhoto}
                            onClick={() => MostrarFotosItems(3)}
                        ></i>

                        <div
                            className="tamañoiconosheadershopzoom apuntador"
                            onClick={() => minimizar()}
                        >
                            <i
                                className="fa fa fa-compress"
                                aria-hidden="true"></i>
                        </div>
                    </div>

                    <div className="rightFilterReults">
                        <div onClick={() => setOpen(true)}>
                            <VscSettings />
                            Filtros
                            <LuChevronDown />
                        </div>
                    </div>
                </div>
            </div>

            <Drawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
                className="drawerFilterright"
                PaperProps={{
                    sx: {
                        width: getDrawerWidth(),
                        ...(isXs
                            ? {
                                top: 260,
                                height: "calc(100% - 260px)",
                            }
                            : {})
                    },
                }}
            >
                {/* Contenido del Drawer */}
                <FilterContentMobileInteractive
                    orderPrice={orderPrice}
                    setOrderPrice={setOrderPrice}
                />
            </Drawer>

        </div>
    );
};

export default ModuleShopActionsInteractivo;
