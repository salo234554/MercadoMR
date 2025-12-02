import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getEditData } from "../../store/editdata/action";
import { getSelectViewPrd } from "../../store/selectviewprd/action";
import { getViewSearch } from "../../store/viewsearch/action";
import { MdOutlineLoop } from "react-icons/md";
import { getFilterSearchInteractive } from "~/store/filtersearchinteractive/action";
import { IconButton, Tooltip } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { getViewVehPrd } from "~/store/viewvehprd/action";
import { getResetDataSearch } from "~/store/resetdatasearch/action";
import { getPosicionHabitaculo } from "~/store/posicionhabitaculo/action";
import { getViewAddCart } from "~/store/viewaddcart/action";

const useStyles = makeStyles({
    tooltip: {
        backgroundColor: "#ABACCD !important",
        color: "#2D2E83 !important",
        fontSize: "12px !important",
        border: "1px solid #ABACCD",
    },
    arrow: {
        color: "red",
    },
});

let anosselect = ";";

const selectedvehicle = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [datSelSearch, setDatSelSearch] = useState([]);
    const [datSearchInteractive, setDatSearchInteractive] = useState([]);
    const [longitudDataVeh, setLongitudDataVeh] = useState(0);
    const [anoSelect, setAnoSelect] = useState("");
    const [classTextoSel, setClassTextoSel] = useState(
        "box textoselectedvehicle"
    );
    const [classTextoSelDos, setClassTextoSelDos] = useState(
        "textoselectedvehicledos"
    );

    const [classBotonera, setClassBotonera] = useState("");

    let dataselectsearch = [];
    dataselectsearch = useSelector(
        (state) => state.dataselectsearch.dataselectsearch
    );

    let datasearchinteractive = [];
    datasearchinteractive = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );

    const filtersearch = useSelector(
        (state) => state.filtersearch.filtersearch
    );

    //console.log("CONTROLSSSS : ", filtersearch)

    const deleteitemfind = useSelector(
        (state) => state.deleteitemfind.deleteitemfindz
    );

    const zoomdatasearch = useSelector(
        (state) => state.zoomdatasearch.zoomdatasearch
    );

    let viewvehprd = useSelector((state) => state.viewvehprd.viewvehprd);

    //console.log("ZOOMDATASEARCH : ", zoomdatasearch);
    //console.log("CONTROLSSSS : ", filtersearch, " - ", deleteitemfind)

    useEffect(() => {
        if (zoomdatasearch != "0" && zoomdatasearch != 0) {
            setClassBotonera("ubicarbotonera");
        } else {
            setClassBotonera("");
        }
    }, [zoomdatasearch]);

    const resetCarroceria = () => {
        //if (datSearchInteractive?.idcarrorecia > 0 && filtersearch == "0") {
        let carroceriaVehiculo = JSON.parse(
            localStorage.getItem("carroceriaselect")
        );

        if (carroceriaVehiculo == 24) {
            router.push("/searchinteractive/sedan/searchsedan#searchmr");
        } else if (carroceriaVehiculo == 8) {
            router.push("/searchinteractive/coupe/searchcoupe#searchmr");
        } else if (carroceriaVehiculo == 2) {
            router.push(
                "/searchinteractive/automoviltrespuertas/searchtrespuertas#searchmr"
            );
        } else if (carroceriaVehiculo == 3) {
            router.push(
                "/searchinteractive/automovilcincopuertas/searchcincopuertas#searchmr"
            );
        } else if (carroceriaVehiculo == 16) {
            router.push(
                "/searchinteractive/camionetas/estacadoblechasis/searchestacadoble#searchmr"
            );
        } else if (carroceriaVehiculo == 17) {
            router.push(
                "/searchinteractive/camionetas/estacacabinasencilla/searchestacasencilla#searchmr"
            );
        } else if (carroceriaVehiculo == 20) {
            router.push(
                "/searchinteractive/camionetas/volcodoblecabina/searchdoblevolco#searchmr"
            );
        } else if (carroceriaVehiculo == 21) {
            router.push(
                "/searchinteractive/camionetas/volcocabinasencilla/searchvolcosencilla#searchmr"
            );
        } else if (carroceriaVehiculo == 25) {
            router.push(
                "/searchinteractive/camionetas/suvcamperostrespuertas/searchsuvtrespuertas#searchmr"
            );
        } else if (carroceriaVehiculo == 26) {
            router.push(
                "/searchinteractive/camionetas/suvcamperoscincopuertas/searchsuvcincopuertas#searchmr"
            );
        } else if (carroceriaVehiculo == 60) {
            router.push(
                "/searchinteractive/camionestrompa/articuladocontrompa/searcharticulado#searchmr"
            );
        } else if (carroceriaVehiculo == 13) {
            router.push(
                "/searchinteractive/camionestrompa/dobletroquecontrompa/searchdobletroque#searchmr"
            );
        } else if (carroceriaVehiculo == 18) {
            router.push(
                "/searchinteractive/camionestrompa/gruacontrompa/searchgrua#searchmr"
            );
        } else if (carroceriaVehiculo == 35) {
            router.push(
                "/searchinteractive/camionestrompa/sencillocontrompa/searchsencillo#searchmr"
            );
        } else if (carroceriaVehiculo == 31) {
            router.push(
                "/searchinteractive/camionestrompa/volquetadoblecontrompa/searchvolquetadoble#searchmr"
            );
        } else if (carroceriaVehiculo == 32) {
            router.push(
                "/searchinteractive/camionestrompa/volquetasencillacontrompa/searchvolquetasencilla#searchmr"
            );
        } else if (carroceriaVehiculo == 1) {
            router.push(
                "/searchinteractive/camionessintrompa/articuladosintrompa/searcharticulado#searchmr"
            );
        } else if (carroceriaVehiculo == 10) {
            router.push(
                "/searchinteractive/camionessintrompa/cuatromanos/searchcuatromanos#searchmr"
            );
        } else if (carroceriaVehiculo == 84) {
            router.push(
                "/searchinteractive/camionessintrompa/dobletroquesintrompa/searchdobletroque#searchmr"
            );
        } else if (carroceriaVehiculo == 87) {
            router.push(
                "/searchinteractive/camionessintrompa/gruasintrompa/searchgrua#searchmr"
            );
        } else if (carroceriaVehiculo == 7) {
            router.push(
                "/searchinteractive/camionessintrompa/sencillosintrompa/searchsencillo#searchmr"
            );
        } else if (carroceriaVehiculo == 123) {
            router.push(
                "/searchinteractive/camionessintrompa/volquetadoblesintrompa/searchvolquetadoble#searchmr"
            );
        } else if (carroceriaVehiculo == 125) {
            router.push(
                "/searchinteractive/automovilcincopuertas/searchcincopuertas#searchmr"
            );
        } else if (carroceriaVehiculo == 124) {
            router.push(
                "/searchinteractive/automoviltrespuertas/searchtrespuertas#searchmr"
            );
        } else if (carroceriaVehiculo == 126) {
            router.push(
                "/searchinteractive/camionetas/suvcamperoscincopuertas/searchsuvcincopuertas#searchmr"
            );
        } else if (carroceriaVehiculo == 121) {
            router.push(
                "/searchinteractive/camionessintrompa/volquetasencillasintrompa/searchvolquetasencilla#searchmr"
            );
        } else if (carroceriaVehiculo == 4) {
            router.push("/searchinteractive/vansybuses/bus/searchbus#searchmr");
        } else if (carroceriaVehiculo == 122) {
            router.push(
                "/searchinteractive/vansybuses/buseta/searchbuseta#searchmr"
            );
        } else if (carroceriaVehiculo == 30) {
            router.push(
                "/searchinteractive/vansybuses/vans/searchvans#searchmr"
            );
        } else if (carroceriaVehiculo == 5) {
            router.push("/searchinteractive/motos/calle/searchcalle#searchmr");
        } else if (carroceriaVehiculo == 19 || carroceriaVehiculo == 9) {
            router.push(
                "/searchinteractive/motos/motocarro/searchcalle#searchmr"
            );
        } else if (carroceriaVehiculo == 12) {
            router.push(
                "/searchinteractive/motos/deportiva/searchdeportiva#searchmr"
            );
        } else if (carroceriaVehiculo == 14) {
            router.push(
                "/searchinteractive/motos/enduro/searchenduro#searchmr"
            );
        } else if (carroceriaVehiculo == 22) {
            router.push(
                "/searchinteractive/motos/scooter/searchscooter#searchmr"
            );
        } else if (carroceriaVehiculo == 28) {
            router.push(
                "/searchinteractive/motos/touring/searchtouring#searchmr"
            );
        }
        //}

        //}, [filtersearch, datSearchInteractive]);
    };

    const regresarAlBuscador = () => {
        sessionStorage.setItem("dataExpandirBase", JSON.stringify([]));
        dispatch(getViewVehPrd(0));
        dispatch(getViewAddCart(0));
        localStorage.setItem("datosbuscar", JSON.stringify(null));
        sessionStorage.setItem("dataExpandirFiltrada", JSON.stringify(null));
        sessionStorage.setItem("dataExpandirFiltradaII", JSON.stringify(null));
        let editdata = {
            editar: true,
        };
        dispatch(getEditData(editdata));
        dispatch(getSelectViewPrd(0));
        dispatch(getViewSearch(false));
        localStorage.setItem("editdata", JSON.stringify(true));
        localStorage.setItem("editVehHistory", JSON.stringify(false));
        router.push({
            pathname: "/searchinteractive/searchinteractive",
            query: {
                editVehSearch: JSON.stringify(true),
            },
        });
    };

    useEffect(() => {
        //datasearchinteractive
        let long = 0;
        if (datasearchinteractive.length == 0) {
            let data = JSON.parse(
                localStorage.getItem("datasearchinteractive")
            );
            setDatSearchInteractive(data);
        } else setDatSearchInteractive(datasearchinteractive);

        if (dataselectsearch.length == 0) {
            let dat = JSON.parse(localStorage.getItem("dataselectsearch"));
            setDatSelSearch(dat);
        } else setDatSelSearch(dataselectsearch);

        if (
            datSearchInteractive.length > 0 ||
            parseInt(datSearchInteractive.idvehiculo) > 0
        ) {
            long = datSearchInteractive.codigoano.length;
            if (long > 0) {
                long = datSearchInteractive.codigoano.length;
                //console.log("AÑOS : ", long);
                if (long == 0) anosselect = "";
                else anosselect = ";";

                if (datSearchInteractive.codigoano.length == 1) {
                    datSearchInteractive.codigoano &&
                        datSearchInteractive.codigoano.map((row, index) => {
                            index == 0
                                ? (anosselect = anosselect + "" + row.label)
                                : null;
                        });
                } else if (datSearchInteractive.codigoano.length == 2) {
                    datSearchInteractive.codigoano &&
                        datSearchInteractive.codigoano.map((row, index) => {
                            index == 0
                                ? (anosselect = anosselect + "" + row.label)
                                : index == 1
                                ? (anosselect = anosselect + ";" + row.label)
                                : null;
                        });
                } else if (datSearchInteractive.codigoano.length > 2) {
                    datSearchInteractive.codigoano &&
                        datSearchInteractive.codigoano.map((row, index) => {
                            index == 0
                                ? (anosselect = anosselect + "" + row.label)
                                : index == 1
                                ? (anosselect = anosselect + ";" + row.label)
                                : index == 2
                                ? (anosselect =
                                      anosselect + ";" + row.label + "...")
                                : null;
                        });
                }
            }
        } else anosselect = "";

        let varanos = "" + dataselectsearch.nombreanno;

        if (varanos == "Año") setAnoSelect("");
        else if (varanos) {
            let longano = varanos.length;

            if (longano > 15) {
                let val = ";" + varanos.substr(0, 14) + "...";
                setAnoSelect(val);
            } else {
                let val = ";" + varanos;
                setAnoSelect(val);
            }
        }

        let validar =
            "" +
            dataselectsearch.nombretipocombustible +
            " " +
            dataselectsearch.nombrecilindraje +
            " " +
            dataselectsearch.nombretransmision +
            " " +
            dataselectsearch.nombretraccion;

        let longitud = validar.length;

        if (longitud > 3) {
            setClassTextoSel("box textoselectedvehicle");
            setClassTextoSelDos("textoselectedvehicledos");
        } else {
            setClassTextoSel("box textoselectedvehicle");
            setClassTextoSelDos("textoselectedvehicledos");
        }
        setLongitudDataVeh(longitud);

        //console.log("SEACRH XXXX: ", longitud);
    }, [datasearchinteractive, dataselectsearch]);

    const resetDataFind = () => {
        dispatch(getResetDataSearch(true));
        dispatch(getFilterSearchInteractive(null));
        dispatch(getPosicionHabitaculo(null));
        dispatch(getViewAddCart(0));

        localStorage.setItem("datosbuscar", JSON.stringify(null));
        localStorage.setItem("partetrensel", JSON.stringify([]));
        resetCarroceria();
    };

    const classes = useStyles();

    useEffect(() => {
        localStorage.setItem("expandirdata", JSON.stringify(false));
    }, [filtersearch, deleteitemfind]);

    return (
        <div className={classBotonera}>
            <div className="newTopInteractSearch">
                <div className="textnewTopInteractSearch">
                    {console.log(
                        "DATXXX : ",
                        datSelSearch.nombremarca,
                        " - ",
                        datasearchinteractive?.nombremarca
                    )}
                    <div className={classTextoSel}>
                        <p>
                            {datSelSearch.nombretipovehiculo
                                ? datSelSearch.nombretipovehiculo
                                : ""}
                            {datSelSearch.nombrecarroceria
                                ? datSelSearch.nombrecarroceria
                                : ""}
                            {datSelSearch?.nombremarca?.includes("null")
                                ? "; " + datasearchinteractive?.nombremarca
                                : datSelSearch.nombremarca
                                ? datSelSearch.nombremarca
                                : datasearchinteractive?.nombremarca
                                ? "; " + datasearchinteractive?.nombremarca
                                : ""}
                            {!datSelSearch.nombremodelo ||
                            datSelSearch.nombremodelo == "null"
                                ? ""
                                : datSelSearch.nombremodelo}
                            {anoSelect == ";0;" ||
                            anoSelect == ";0" ||
                            !anoSelect ||
                            anoSelect == ";Año" ||
                            anoSelect == ";Año;"
                                ? ""
                                : anoSelect == ";undefined"
                                ? ""
                                : anoSelect}
                            {longitudDataVeh > 3 ? (
                                <>
                                    {datSelSearch.nombretipocombustible
                                        ? "; " +
                                          datSelSearch.nombretipocombustible.substr(
                                              1,
                                              14
                                          )
                                        : ""}
                                    {datSelSearch.nombrecilindraje &&
                                    datSelSearch.nombretipocombustible
                                        ? "" + datSelSearch.nombrecilindraje
                                        : datSelSearch.nombrecilindraje
                                        ? "; " + datSelSearch.nombrecilindraje
                                        : ""}
                                    {datSearchInteractive.idvehiculo != 3
                                        ? datSelSearch.nombretransmision
                                        : null}
                                    {datSearchInteractive.idvehiculo != 3 &&
                                    datSearchInteractive.idvehiculo != 6 &&
                                    datSearchInteractive.idvehiculo != 1
                                        ? datSelSearch.nombretraccion
                                        : null}
                                </>
                            ) : null}
                        </p>
                    </div>
                </div>

                <div
                    onClick={() => regresarAlBuscador()}
                    className="iconNewSearchInter">
                    <Tooltip
                        classes={classes}
                        title="Editar datos vehículo"
                        placement="top-start">
                        <span>
                            <i
                                className="tamañoiconoeditar fa fa-edit d-flex justify-content-center"
                                data-tip
                                data-for="registerEdit"></i>
                        </span>
                    </Tooltip>
                </div>
                {!filtersearch || filtersearch == "0" ? (
                    <div className="iconNewSearchInter2 deshabilitar">
                        <Tooltip
                            classes={classes}
                            placement="top-start"
                            sx={{ color: "#2D2E83" }}>
                            <IconButton className="customicon">
                                <MdOutlineLoop className="tamañoresetdata" />
                            </IconButton>
                        </Tooltip>
                    </div>
                ) : (
                    <div
                        onClick={() => resetDataFind()}
                        className="iconNewSearchInter2">
                        <Tooltip
                            classes={classes}
                            title="Limpiar filtros"
                            placement="top-start"
                            sx={{ color: "#2D2E83" }}>
                            <IconButton className="customicon">
                                <MdOutlineLoop className="tamañoresetdata" />
                            </IconButton>
                        </Tooltip>
                    </div>
                )}
            </div>
        </div>
    );
};

export default selectedvehicle;
