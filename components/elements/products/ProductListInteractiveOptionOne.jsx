import React from "react";
import Link from "next/link";
import useProductInteractive from "~/hooks/useProductInteractive";
import { myNumber } from "../../../utilities/ArrayFunctions";
import { Box, Grid, Button } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getViewSearch } from "../../../store/viewsearch/action";
import { getSelectViewPrd } from "../../../store/selectviewprd/action";
import { getViewCheckout } from "../../../store/viewcheckout/action";
//Constantes
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../helpers/Constants";
import { useRouter } from "next/router";

const ProductListInteractiveOptionOne = ({ product }) => {
    const dispatch = useDispatch();
    //console.log("PRD VIEW SEARCh : ", product);
    const { price, badges, iditem } = useProductInteractive();
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

     const router = useRouter();

    const onClickImagen = () => {
        dispatch(getViewSearch(true));
        dispatch(getSelectViewPrd(product.id));
        dispatch(getViewCheckout(false));
        const addItemVisita = async () => {
            let params = {
                idproducto: product.id,
                usuario: datosusuarios.uid,
                compatible: product.compatible,
            };

            //console.log("PARAMS PRD : ", params)
            //return
            await axios({
                method: "post",
                url: URL_BD_MR + "70",
                params,
            })
                .then((res) => {
                    if (res.data.type == 1) {
                        console.log("LEER : ", res.data)
                    } else console.log("ERROR : ", res.data)
                })
                .catch(function (error) {
                    console.log("ERROR : ", res.data)
                    return;
                });
        };
        addItemVisita();

        const addItemHistoryPrd = async () => {
            let datauser = JSON.parse(localStorage.getItem("datauser"));

            let params = {
                idproducto: product.id,
                usuario: datauser?.uid,
                compatible: product.compatible,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "87",
                params,
            })
                .then((res) => {
                    if (res.data.type == 1) {
                        console.log("LEER : ", res.data)
                    } else console.log("ERROR : ", res.data)
                })
                .catch(function (error) {
                    console.log("ERROR : ", res.data)
                    return;
                });
        };
        addItemHistoryPrd();
    };

    const handleClick = () => {
        router.push(`/product/${product.id}`);
    };

    return (
        <div className="bordeproductlistinteractivemaximizeIntMNew">
            <Grid container alignItems="center" className="none650px">
                <Grid item xs={9} md={9} lg={9} pl={0}>
                    <div className="textoproductlistinteractivemaximizeInt none1255px"
                        onClick={() => onClickImagen(product)}
                    >
                        {product.name}
                    </div>
                    <div className="textoproductlistinteractivemaximizeIntShow"
                        onClick={handleClick}
                    >
                        {product.name} 
                    </div>
                </Grid>


                <Grid item xs={1} md={1} lg={1}>
                    <a className="pSpecialInt colorbase"> $ </a>
                </Grid>
                <Grid item xs={2} md={2} lg={2}>
                    <div className="formatoprecioproductlistmaximizeInt">
                        {myNumber(1, product.price, 2)}
                    </div>
                </Grid>
            </Grid>

            <div className="itemsLineBuscadorSep2Inteact" onClick={handleClick}>
                <div className="itemsLineBuscadorSep2Big">
                    <p>{product.name}</p>
                </div>
                <div className="itemsLineBuscadorSep2Small">
                    <span>
                        <h4>$</h4>
                    </span>
                    <h4>{myNumber(1, product.price, 2)}</h4>
                </div>
            </div>

        </div>
    );
};

export default ProductListInteractiveOptionOne;
