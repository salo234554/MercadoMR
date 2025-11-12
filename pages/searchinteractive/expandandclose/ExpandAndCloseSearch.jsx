import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { IoExpand } from "react-icons/io5";
import { RiCloseLargeLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getZoomDataSearch } from "~/store/zoomdatasearch/action";
import { getViewVehPrd } from "~/store/viewvehprd/action";
import { getCloseOpenVehSearch } from "~/store/closeopenvehsearch/action";
import { getViewAddCart } from "~/store/viewaddcart/action";

function ExpandAndCloseSearch({
    maximizarOption,
    setMaximizarOption,
    setCloseWindow,
}) {
    const router = useRouter();
    const dispatch = useDispatch();

    const closeopenvehsearch = useSelector(
        (state) => state.closeopenvehsearch.closeopenvehsearch
    );

    const minimizar = () => {
        //localStorage.setItem("openviewprdsearch", JSON.stringify(true));
        localStorage.setItem("expandirdata", JSON.stringify(true));
        localStorage.setItem("datosbuscar", JSON.stringify(null));
        dispatch(getZoomDataSearch(0));
        dispatch(getViewVehPrd(0));
        dispatch(getViewAddCart(1));
        sessionStorage.setItem("datavalfltrciudad", JSON.stringify([]));
        sessionStorage.setItem("dataExpandirFiltrada", JSON.stringify([]));
        sessionStorage.setItem("dataExpandirFiltradaII", JSON.stringify([]));
        localStorage.setItem("activerangeprice", JSON.stringify(false));

        if (maximizarOption != 0) {
            localStorage.setItem("activargrilla", JSON.stringify(0));
            setMaximizarOption(0);
        }
    };

    //Cierre la venta con las caracteristicas del vehículo seleccionado
    const cerrarVenta = () => {
        setCloseWindow(true);
    };


    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={1.5} md={1.5} lg={1.5}>
                    <div
                        className="iconexpandirdata"
                        onClick={() => minimizar()}>
                        <IoExpand />
                    </div>
                </Grid>
                <Grid item xs={1.5} md={1.5} lg={1.5}>
                    <div
                        className="iconclosedata"
                        onClick={() => cerrarVenta()}>
                        <RiCloseLargeLine />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default ExpandAndCloseSearch;
