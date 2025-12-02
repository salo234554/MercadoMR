import React, { useEffect, useState } from "react";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroupInteractive";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getClearLocation } from "../../store/clearlocation/action";
import { getClearCondition } from "../../store/clearcondition/action";
import { getCitySelect } from "../../store/cityselect/action";
import { Box, Grid, Button } from "@mui/material";

const ViewFilterSelect = (props) => {
    const {
        classSearch,
        setclassSearch,
        eraseCitySel,
        setEraseCitySel,
        citySelected,
        setCitySelected,
        filtroCond,
        setFiltroCond,
        condition,
        setCondition,
        marcarCondicion,
        setMarcarCondicion,
        itemSelCond,
        setitemSelCond,
        classCity,
        setClassCity,
        classCitySel,
        setClassCitySel,
        maximizarOption,
        optionSelect
    } = props;

    const dispatch = useDispatch();
    const Router = useRouter();
    const { keyword } = Router.query;

    const { loading, productItems, getProducts } = useGetProducts();
    let dataCitySelect = useSelector((state) => state.cityselect.cityselect);
    //console.log("QUE BUSCA : ", dataCitySelect);

    const [classCondicion, setClassCondicion] = useState("ml-0 mt-10 mb-0");
    const [classCerrarFiltr, setClassCerrarFiltr] = useState("colorxcerrarfiltrocuatroNuevoF");
    const condicionPrd = useSelector(
        (state) => state.selectcondition.selectcondition
    );
    const rangoPrd = useSelector((state) => state.rangosprecio.rangosprecio);
    const changesearchprice = useSelector(
        (state) => state.changesearchprice.changesearchprice
    );

    //className="ps-page ps-page--shopping"

    const { withGrid } = useProductGroup();

    useEffect(() => {
        let conditionselect = JSON.parse(localStorage.getItem("conditionselect"));
        setFiltroCond(conditionselect);
    }, []);

    useEffect(() => {
        setCitySelected(dataCitySelect);
        if (dataCitySelect?.length == 0) {
            localStorage.setItem("activafiltrociudad", JSON.stringify(false));
        }
    }, [dataCitySelect]);

    const SelectCondition = (item) => {
        if (item == 1) {
            setCondition(null);
            setitemSelCond(0);
            setFiltroCond(item);
            setMarcarCondicion("");
            dispatch(getClearCondition(1));
        } else if (item == 2) {
            setCondition(null);
            setitemSelCond(0);
            setFiltroCond(item);
            setMarcarCondicion("");
            dispatch(getClearCondition(2));
        } else {
            setCondition(item);
            dispatch(getClearCondition(0));
            //setitemSel(item);
            setFiltroCond(item);
            //setMarcarCondicion("subrayartexto");
        }
    };

    const cerrarCity = (dato) => {
        let ciudades = citySelected;
        let citysel = [];
        let contcity = [];
        ciudades &&
            ciudades.map((item, index) => {
                if (dato != item.idciu) {
                    citysel.push(item);
                } else setEraseCitySel(dato);
            });
        setCitySelected(citysel);

        localStorage.setItem("cityselect", JSON.stringify(citysel));
        dispatch(getCitySelect(citysel));

        if (citysel.length > 0) {
            dispatch(getClearLocation(1));
        } else if (citysel.length == 0) {
            dispatch(getClearLocation(0));
        }
        //console.log("RESTA CIDU : ", citysel);
    };

    //console.log("CLASE SEARCH : ", classSearch);
    //console.log("classCitySel : ", classCitySel);

    return (
        <div className={`${classSearch}`}>
            {maximizarOption > 0 ? (
                <div className="contFiltersTopViewInt">
                    <Grid container spacing={1}>
                        {filtroCond > 0 && (
                            <Grid item xs={6} md={2.4} lg={2.4} sm={3}>
                                <div className="tamañotextociudadeselectcincoNuevo">
                                    {filtroCond === 1 ? 'Nuevo' : filtroCond === 2 ? 'Usado' : ''}
                                    <a onClick={() => SelectCondition(0)}>
                                        <div className="colorxcerrarfiltrocuatroNuevoF">X</div>
                                    </a>
                                </div>
                            </Grid>
                        )}
                        {citySelected.length > 0 ? (
                            citySelected.map((city, index) => (
                                <Grid
                                    key={index}
                                    item
                                    xs={6}
                                    md={2.4}
                                    lg={2.4}
                                    sm={3}
                                    className={index > 0 ? classCitySel : undefined}
                                >
                                    <div className="tamañotextociudadeselectcincoNuevo">
                                        {city.nombreciu}
                                        <a onClick={() => cerrarCity(city.idciu)}>
                                            <div className="colorxcerrarfiltrocuatroNuevoF">X</div>
                                        </a>
                                    </div>
                                </Grid>
                            ))
                        ) : (
                            <div className="mtmenos90"></div>
                        )}
                    </Grid>
                </div>
            ) : null}
        </div>
    );
};

export default ViewFilterSelect;
