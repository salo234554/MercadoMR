import React, { useEffect, useState, useRef } from "react";
import Router, { useRouter } from "next/router";
import SkeletonProductDetail from "~/components/elements/skeletons/SkeletonProductDetail";
import InfoViewPrdSingle from "~/components/shared/widgets/InfoViewPrdSingle";
import SingleProductView from "~/components/elements/detail/SingleProductView";
import WidgetShopRelatedProducts from "~/components/shared/widgets/WidgetShopRelatedProducts";
import { useSelector, useDispatch } from "react-redux";
import { getViewSearch } from "../../store/viewsearch/action";
import { getActivarViewPrd } from "~/store/activarviewprd/action";
import { getViewVehPrd } from "~/store/viewvehprd/action";
import { getViewAddCart } from "~/store/viewaddcart/action";

function ViewPrd({
    producto,
    optionSelect,
    setOptionSelect,
    setMaximizarOption,
    maximizarOption,
    viewSearch,
    setCloseWindow,
    setIsLoading
}) {
    const Router = useRouter();
    const { id } = Router.query;
    const irA = useRef(null);

    //console.log("DATOS PRODUCTO : ", producto);
    //console.log("OPTION SELECT : ", optionSelect, " - ", maximizarOption);
    const [nombreProducto, setNombreProducto] = useState("Productos");
    const [irInicio, setIrInicio] = useState(false);
    let product = producto;
    const [classViewPrd, setClassViewPrd] = useState("searchviewprd");

    //searchviewprd
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem("ctrview", JSON.stringify(false));
        if (optionSelect == 1 && maximizarOption == 1) {
            localStorage.setItem("activargrilla", JSON.stringify(1));
            localStorage.setItem("viewsearchinteractive", JSON.stringify(true));
        } else if (optionSelect == 2 && maximizarOption == 2) {
            localStorage.setItem("activargrilla", JSON.stringify(2));
            localStorage.setItem("viewsearchinteractive", JSON.stringify(true));
        } else if (optionSelect == 3 && maximizarOption == 3) {
            localStorage.setItem("activargrilla", JSON.stringify(3));
            localStorage.setItem("viewsearchinteractive", JSON.stringify(true));
        } else {
            localStorage.setItem("activargrilla", JSON.stringify(3));
            localStorage.setItem("viewsearchinteractive", JSON.stringify(true));
        }
    }, [optionSelect, maximizarOption]);

    // View area
    let productView;

    if (product === null) {
        productView = (
            <div className="container">
                <SkeletonProductDetail />
            </div>
        );
    } else {
        productView = <SingleProductView product={product} />;
    }

    //console.log("PROASAS: ", product);

    const optionselect = useSelector(
        (state) => state.optionselect.optionselect
    );

    const breadcrumb = [
        {
            id: 1,
            text: "Inicio",
            url: "/",
        },
        {
            id: 3,
            text: nombreProducto,
        },
    ];

    const returnViewPrd = () => {
        localStorage.setItem("returnviewprd", JSON.stringify(true));
        dispatch(getViewSearch(true));
    };

    useEffect(() => {
        dispatch(getViewAddCart(1));
        dispatch(getActivarViewPrd(false));
        dispatch(getViewVehPrd(1));
        setCloseWindow(true);
        localStorage.setItem("ctlredirigir", JSON.stringify("91209012"));

        irA?.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
        localStorage.setItem("openviewprdsearch", JSON.stringify(false));
    }, []);

    useEffect(() => {
        if (optionselect === 3) {
            setClassViewPrd("searchviewprd1");
        } else {
            setClassViewPrd("searchviewprd");
        }
    }, [optionselect]);

    return (
        <div className={classViewPrd} ref={irA}>
            <div className="ps-layout--with-sidebar ps-reverse mt-10">
                <div className="ps-layout__left">
                    <InfoViewPrdSingle />
                    <div className="ml-40">
                        <WidgetShopRelatedProducts />
                    </div>
                </div>
                <div
                    className="ps-layout__right"
                    onClick={() => returnViewPrd()}>
                    {productView}
                </div>
            </div>
        </div>
    );
}

export default ViewPrd;
