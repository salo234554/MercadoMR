import React, { useState, useEffect } from "react";
import ModuleShopSortBy from "~/components/partials/shop/modules/ModuleShopSortBy";
import ModuleShopPaginationRange from "~/components/partials/shop/modules/ModuleShopPaginationRange";
import { getGripSelect } from "../../../../store/gripselect/action";
import { useRouter } from "next/router";
import { Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { VscSettings } from "react-icons/vsc";
import { LuChevronDown } from "react-icons/lu";
import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import FilterContentMobile from "./FilterContentMobile";
import FilterContentMobileContactanos from "./FilterContentMobileContactanos";
import { getLongPage } from "../../../../store/longpage/action"

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

const ModuleShopResults = (props) => {
    const dispatch = useDispatch();

    const {
        filtrarciud,
        prdfiltrados,
        setCantidadPrdCiudad,
        cantidadPrdCiudad,
        setActivar,
        PrdCiudadUno,
        PrdCiudadDos,
        menorprecio,
        mayorprecio,
        setMenorPrecio,
        setMayorPrecio,
        precioFiltroMinimo,
        setPrecioFiltroMinimo,
        precioFiltroMaximo,
        setPrecioFiltroMaximo,
        setSelected,
        marcaSelected,
        setmarcaSelected,
        marcarCondicion,
        setMarcarCondicion,
        condition,
        setCondition,
        numProdRel,
        setActivaCiudad,
        activaCiudad,
        itemSel,
        setitemSel,
        itemSelCond,
        setitemSelCond,
        setFiltroCond,
        filtroCond,
        cerrarFiltro,
        setCerrarFiltro,
        setEraseCitySel,
        eraseCitySel,
        setCitySelected,
        citySelected,
        setIrInicio,
        setActCiy,
        actCity,
        setPaginaSel,
        setitemIni,
        setItemFin,
        setclearFiltroCity,
        setFiltroPrecio,
        longprd,
        dataPrd,
        productItems
    } = props;

    const {
        setSelectGrid, itemsPaginas, setItemsPaginas, ordenarPor, setOrdenarPor,
        textoOrdenar, setTextoOrdenar } = props;

    const [showItem, setShowItem] = useState("fa fa-bars tamañoiconogridresult mtr-3");
    const [showPhoto, setShowPhoto] = useState("fa fa-th-large tamañoiconogridresult selecticonogrip");
    const [showItemPhoto, setShowItemPhoto] = useState("fa fa-th-list tamañoiconogridresult mtr-3");

    const router = useRouter();

    const [open, setOpen] = useState(false);

    const [openFilterContactanos, setOpenFilterContactanos] = useState(false);

    // Detecta si la ruta contiene "Contactanos"
    const isContactanos = router.pathname.toLowerCase().includes("contactanos");


    const theme = useTheme();
    // Detectamos el tamaño de pantalla con Material UI
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));  // <600px
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px - 899px
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg")); // 900px - 1199px
    const isLgOrMore = useMediaQuery(theme.breakpoints.up("lg")); // >=1200px

    // Función para determinar el ancho del Drawer
    const getDrawerWidth = () => {
        if (isXs) return "100%";  // Móviles: 100%
        if (isSm) return "40%";   // Tablets pequeñas: 60%
        if (isMd) return "30%";   // Tablets grandes: 50%
        return "30%";             // Escritorios grandes: 30%
    };

    // Cerrar el Drawer automáticamente cuando la pantalla sea >=1200px
    useEffect(() => {
        if (isLgOrMore && open) {
            setOpen(false);
            setOpenFilterContactanos(false);
        }
    }, [isLgOrMore, open]);

    const selectGrilla = (value) => {
        sessionStorage.removeItem('paginaActualGeneral');
        dispatch(getLongPage(1));
        localStorage.setItem("activargrilla", JSON.stringify(1));

        if (value == 1) {
            MostrarItems();
        } else
            if (value == 2) {
                MostrarFotos();
            } else
                if (value == 3) {
                    MostrarFotosItems();    
                }
    }

    useEffect(() => {
        let activargrilla = JSON.parse(localStorage.getItem("activargrilla"));
        if (activargrilla == 1) {
            MostrarItems();
        } else
            if (activargrilla == 2) {
                MostrarFotos();
            } else
                if (activargrilla == 3) {
                    MostrarFotosItems();
                } else
                    dispatch(getGripSelect(2));
    }, []);

    const MostrarItems = () => {
        dispatch(getGripSelect(1));
        setSelectGrid(2);
        setShowItem("fa fa-bars tamañoiconogridresult selecticonogrip")
        setShowPhoto("fa fa-th-large tamañoiconogridresult mtr-3")
        setShowItemPhoto("fa fa-th-list tamañoiconogridresult mtr-3")
    };

    const MostrarFotos = () => {
        dispatch(getGripSelect(2));
        setSelectGrid(1);
        setShowPhoto("fa fa-th-large tamañoiconogridresult  selecticonogrip")
        setShowItem("fa fa-bars tamañoiconogridresult mtr-3")
        setShowItemPhoto("fa fa-th-list tamañoiconogridresult mtr-3")
    };

    const MostrarFotosItems = () => {
        dispatch(getGripSelect(3));
        setSelectGrid(3);
        setShowItemPhoto("fa fa-th-list tamañoiconogridresult  selecticonogrip")
        setShowPhoto("fa fa-th-large tamañoiconogridresult mtr-3")
        setShowItem("fa fa-bars tamañoiconogridresult mtr-3")

    };
    //{swichersItemsView}

    console.log("Maximo precio: ", mayorprecio)

    return (
        <>
            <div className="ps-shop__actions altobarragripresult none1200px">
                <div className="ps-shop__actions-left ">
                    <div className="apuntador">
                        <Row>
                            <Col xs={3} sm={3} md={3} lg={3}>
                                <i className={showItem} aria-hidden="true"
                                    onClick={() => selectGrilla(1)}>
                                </i>
                            </Col>
                            <div className="ml-3" onClick={() => selectGrilla(2)}>
                                <Col xs={3} sm={3} md={3} lg={3}>
                                    <i className={showPhoto} aria-hidden="true">
                                    </i>
                                </Col>
                            </div>
                            <div onClick={() => selectGrilla(3)}>
                                <Col xs={3} sm={3} md={3} lg={3}>
                                    <i className={showItemPhoto}>
                                    </i>
                                </Col>
                            </div>
                        </Row>
                    </div>
                </div>
                <div className="ps-shop__actions-right none1200px">
                    <ModuleShopSortBy
                        ordenarPor={ordenarPor}
                        setOrdenarPor={setOrdenarPor}
                        textoOrdenar={textoOrdenar}
                        setTextoOrdenar={setTextoOrdenar}
                    />
                </div>
            </div>
            <div className="topBarFiltersResults">
                <div className="iconsLeftResults">
                    <i className={showItem} aria-hidden="true"
                        onClick={() => selectGrilla(1)}>
                    </i>
                    <i className={showPhoto} aria-hidden="true" onClick={() => selectGrilla(2)}>
                    </i>
                    <i className={showItemPhoto} onClick={() => selectGrilla(3)}>
                    </i>
                </div>

                <div className="rightFilterReults">
                    <div
                        onClick={() =>
                            isContactanos
                                ? setOpenFilterContactanos(true)
                                : setOpen(true)
                        }
                    >
                        <VscSettings />
                        Filtros
                        <LuChevronDown />
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
                <FilterContentMobile
                    ordenarPor={ordenarPor}
                    setOrdenarPor={setOrdenarPor}
                    textoOrdenar={textoOrdenar}
                    setTextoOrdenar={setTextoOrdenar}
                    onClose={() => setOpen(false)}
                    filtrarciud={filtrarciud}
                    prdfiltrados={prdfiltrados}
                    setCantidadPrdCiudad={setCantidadPrdCiudad}
                    cantidadPrdCiudad={cantidadPrdCiudad}
                    PrdCiudadUno={PrdCiudadUno}
                    PrdCiudadDos={PrdCiudadDos}
                    setActivar={setActivar}
                    menorprecio={menorprecio}
                    mayorprecio={mayorprecio}
                    setMenorPrecio={setMenorPrecio}
                    setMayorPrecio={setMayorPrecio}
                    precioFiltroMinimo={precioFiltroMinimo}
                    setPrecioFiltroMinimo={
                        setPrecioFiltroMinimo
                    }
                    precioFiltroMaximo={precioFiltroMaximo}
                    setPrecioFiltroMaximo={
                        setPrecioFiltroMaximo
                    }
                    setSelected={setSelected}
                    marcaSelected={marcaSelected}
                    setmarcaSelected={setmarcaSelected}
                    marcarCondicion={marcarCondicion}
                    setMarcarCondicion={setMarcarCondicion}
                    condition={condition}
                    setCondition={setCondition}
                    numProdRel={numProdRel}
                    setActivaCiudad={setActivaCiudad}
                    activaCiudad={activaCiudad}
                    itemSel={itemSel}
                    setitemSel={setitemSel}
                    itemSelCond={itemSelCond}
                    setitemSelCond={setitemSelCond}
                    setFiltroCond={setFiltroCond}
                    filtroCond={filtroCond}
                    cerrarFiltro={cerrarFiltro}
                    setCerrarFiltro={setCerrarFiltro}
                    setEraseCitySel={setEraseCitySel}
                    eraseCitySel={eraseCitySel}
                    setCitySelected={setCitySelected}
                    citySelected={citySelected}
                    setIrInicio={setIrInicio}
                    setActCiy={setActCiy}
                    actCity={actCity}
                    setPaginaSel={setPaginaSel}
                    setitemIni={setitemIni}
                    setItemFin={setItemFin}
                    setclearFiltroCity={setclearFiltroCity}
                    setFiltroPrecio={setFiltroPrecio}
                    longprd={longprd}
                    dataPrd={dataPrd}
                    productItems={productItems}
                />
            </Drawer>

            <Drawer
                anchor="right"
                open={openFilterContactanos}
                onClose={() => setOpenFilterContactanos(false)}
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
                <FilterContentMobileContactanos
                    ordenarPor={ordenarPor}
                    setOrdenarPor={setOrdenarPor}
                    textoOrdenar={textoOrdenar}
                    setTextoOrdenar={setTextoOrdenar}
                    onClose={() => setOpenFilterContactanos(false)}
                    filtrarciud={filtrarciud}
                    prdfiltrados={prdfiltrados}
                    setCantidadPrdCiudad={setCantidadPrdCiudad}
                    cantidadPrdCiudad={cantidadPrdCiudad}
                    PrdCiudadUno={PrdCiudadUno}
                    PrdCiudadDos={PrdCiudadDos}
                    setActivar={setActivar}
                    menorprecio={menorprecio}
                    mayorprecio={mayorprecio}
                    setMenorPrecio={setMenorPrecio}
                    setMayorPrecio={setMayorPrecio}
                    precioFiltroMinimo={precioFiltroMinimo}
                    setPrecioFiltroMinimo={
                        setPrecioFiltroMinimo
                    }
                    precioFiltroMaximo={precioFiltroMaximo}
                    setPrecioFiltroMaximo={
                        setPrecioFiltroMaximo
                    }
                    setSelected={setSelected}
                    marcaSelected={marcaSelected}
                    setmarcaSelected={setmarcaSelected}
                    marcarCondicion={marcarCondicion}
                    setMarcarCondicion={setMarcarCondicion}
                    condition={condition}
                    setCondition={setCondition}
                    numProdRel={numProdRel}
                    setActivaCiudad={setActivaCiudad}
                    activaCiudad={activaCiudad}
                    itemSel={itemSel}
                    setitemSel={setitemSel}
                    itemSelCond={itemSelCond}
                    setitemSelCond={setitemSelCond}
                    setFiltroCond={setFiltroCond}
                    filtroCond={filtroCond}
                    cerrarFiltro={cerrarFiltro}
                    setCerrarFiltro={setCerrarFiltro}
                    setEraseCitySel={setEraseCitySel}
                    eraseCitySel={eraseCitySel}
                    setCitySelected={setCitySelected}
                    citySelected={citySelected}
                    setIrInicio={setIrInicio}
                    setActCiy={setActCiy}
                    actCity={actCity}
                    setPaginaSel={setPaginaSel}
                    setitemIni={setitemIni}
                    setItemFin={setItemFin}
                    setclearFiltroCity={setclearFiltroCity}
                    setFiltroPrecio={setFiltroPrecio}
                    longprd={longprd}
                    dataPrd={dataPrd}
                    productItems={productItems}
                />
            </Drawer>
        </>
    );
};

export default ModuleShopResults;
