import { useEffect, useState } from "react";
import WidgetShopFilterByConditionsSearch from "~/components/shared/widgets/WidgetShopFilterByConditionsSearch";
import WidgetShopRelatedProductsSearch from "~/components/shared/widgets/WidgetShopRelatedProductsSearch";
import WidgetShopByLocationSearch from "~/components/shared/widgets/WidgetShopByLocationSearch";
import WidgetFilterByPriceRangeSearch from "~/components/shared/widgets/WidgetFilterByPriceRangeSearch";
import { getCitySelect } from "../../../store/cityselect/action";
import { useSelector, useDispatch } from "react-redux";

let ciudadesselAlt = [];

const SidebarShopInteractiveSearch = (props) => {
    const dispatch = useDispatch();
    const [menorprecio, setMenorPrecio] = useState(0);
    const [mayorprecio, setMayorPrecio] = useState(0);
    const [precioFiltroMinimo, setPrecioFiltroMinimo] = useState(1);
    const [precioFiltroMaximo, setPrecioFiltroMaximo] = useState(100000000);
    const [condicionPrd, setCondicionPrd] = useState(0);
    const [filtroPrecio, setFiltroPrecio] = useState(false);
    const [updateData, setUpdateData] = useState(false);
    const [margen, setMargen] = useState("");
    const [classContainer, setClassContainer] = useState(
        "ps-sidebar--shop sizesidebarinteractive"
    );

    const [classFilterInteractive, setClassFilterInteractive] = useState(
        "positionfilterinteractive2"
    );

    const leerciudadesSel = () => {
        let cityselect = JSON.parse(localStorage.getItem("cityselect"));
        dispatch(getCitySelect(cityselect));
        setUpdateData(!updateData);
        //console.log("CIUDAD : ", cityselect)
    };

    let addedtocart = [0];
    addedtocart = useSelector((state) => state.addedtocart.addedtocart);
    let viewSearch = useSelector((state) => state.viewsearch.viewsearch);

    const filtersearch = useSelector(
        (state) => state.filtersearch.filtersearch
    );

    //console.log("FILTERSEARCH : ", filtersearch);
    useEffect(() => {
        /* Al colocar Position: Relative en el fijardatosvehiculo para los tres latoneria, habitaculo y
        motor, fue necesario asignar valor fijo de posicion al SideerBarShopInteractive

        Dos Class: positionfilterinteractive2  y positionfilterinteractive
        */

        if (
            filtersearch == 0 ||
            filtersearch == "0" ||
            filtersearch == 1 ||
            filtersearch == 11 ||
            filtersearch == 12 ||
            filtersearch == 13
        ) {
            setClassFilterInteractive("positionfilterinteractive2");
        } else {
            setClassFilterInteractive("positionfilterinteractive2");
        }
    }, [filtersearch]);

    let gripselect = 0;
    gripselect = useSelector((state) => state.gripselect.gripselect);

    useEffect(() => {
        let aadditemcar = JSON.parse(localStorage.getItem("aadditemcar"));
        if (aadditemcar) {
            setMargen("marginsuperior");
        } else {
            setMargen("");
        }
    }, [addedtocart]);

    useEffect(() => {
        let conditionselect = JSON.parse(
            localStorage.getItem("conditionselect")
        );
        setCondicionPrd(conditionselect);
        if (condicionPrd > 0) {
            setClassContainer("ps-sidebar--shop sizesidebarinteractivedos");
        } else {
            setClassContainer("ps-sidebar--shop sizesidebarinteractivetres");
        }
    }, [condicionPrd]);

    return (
        <div className="positionfilterinteractive2">
            {!viewSearch ? (
                <div className={classContainer}>
                    <div className="tamañotextonombrefiltro textocolor">
                        Filtros
                    </div>
                    <hr />
                    <div>
                        <WidgetFilterByPriceRangeSearch
                            menorprecio={menorprecio}
                            mayorprecio={mayorprecio}
                            setMenorPrecio={setMenorPrecio}
                            setMayorPrecio={setMayorPrecio}
                            precioFiltroMinimo={precioFiltroMinimo}
                            setPrecioFiltroMinimo={setPrecioFiltroMinimo}
                            precioFiltroMaximo={precioFiltroMaximo}
                            setPrecioFiltroMaximo={setPrecioFiltroMaximo}
                            setFiltroPrecio={setFiltroPrecio}
                            condicionPrd={condicionPrd}
                            updateData={updateData}
                        />
                        <div className="pt-140">
                            <hr />
                            <br />
                            <WidgetShopFilterByConditionsSearch
                                condicionPrd={condicionPrd}
                                setCondicionPrd={setCondicionPrd}
                            />

                            <hr />
                            <br />
                            <div onClick={() => leerciudadesSel()}>
                                <WidgetShopByLocationSearch />
                            </div>
                            <hr />
                            {gripselect > 1 ? (
                                <WidgetShopRelatedProductsSearch />
                            ) : null}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default SidebarShopInteractiveSearch;
