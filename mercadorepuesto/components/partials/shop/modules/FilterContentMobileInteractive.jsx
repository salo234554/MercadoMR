import { IoClose } from "react-icons/io5";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaCarAlt } from "react-icons/fa";
import WidgetFilterByPriceRangeResults from "~/components/shared/widgets/WidgetFilterByPriceRangeResults";
import WidgetShopFilterByConditionsResult from "~/components/shared/widgets/WidgetShopFilterByConditionsResult";
import WidgetShopByLocationResult from "~/components/shared/widgets/WidgetShopByLocationResult";
import Link from "next/link";
import { getFiltroOrderByPrd } from "../../../../store/filtroorderbyprd/action";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { getCitySelect } from "~/store/cityselect/action";
import { useEffect } from "react";
import WidgetFilterByPriceRangeSearch from "~/components/shared/widgets/WidgetFilterByPriceRangeSearch";
import WidgetShopFilterByConditionsSearch from "~/components/shared/widgets/WidgetShopFilterByConditionsSearch";
import WidgetShopByLocationSearch from "~/components/shared/widgets/WidgetShopByLocationSearch";
import SortByPrice from "./SortByPrice";
import WidgetShopFilterByConditionsSearchInteractive from "~/components/shared/widgets/WidgetShopFilterByConditionsSearchInteractive";

const FilterContentMobileInteractive = (props) => {

    const {
        orderPrice,
        setOrderPrice,
        onClose
    } = props;

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

    const leerciudadesSel = () => {
        let cityselect = JSON.parse(localStorage.getItem("cityselect"));
        dispatch(getCitySelect(cityselect));
        setUpdateData(!updateData)
        //console.log("CIUDAD : ", cityselect)
    };

    let addedtocart = [0];
    addedtocart = useSelector((state) => state.addedtocart.addedtocart);
    let viewSearch = useSelector((state) => state.viewsearch.viewsearch);


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
        let conditionselect = JSON.parse(localStorage.getItem("conditionselect"));
        setCondicionPrd(conditionselect);
        if (condicionPrd > 0) {
            setClassContainer("ps-sidebar--shop sizesidebarinteractivedos");
        } else {
            setClassContainer("ps-sidebar--shop sizesidebarinteractive");
        }
    }, [condicionPrd]);



    return (
        <div className="filterMainContainer">
            <div className="topFiltersMobile" onClick={onClose}>
                <h2>Filtros</h2>
                <IoClose />
            </div>



            <div className="porPrecioFiltroMobileIntSearch">
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
            </div>

            <div className="conditionFilterMobileInteractive">
                <WidgetShopFilterByConditionsSearchInteractive
                    condicionPrd={condicionPrd}
                    setCondicionPrd={setCondicionPrd}
                />
            </div>

            <div className="ubicacionFilterMobileIntS" onClick={() => leerciudadesSel()}>
                <WidgetShopByLocationSearch />
            </div>

            {/* 
            <aside className="ordenarPorMainMobile">
                <div className="tamañotextotitulocondicionSearchMobile">
                    Ordenar por
                </div>

                <div>
                    <SortByPrice
                        orderPrice={orderPrice}
                        setOrderPrice={setOrderPrice}
                    />
                </div>

            </aside>

          

           
*/}
        </div>
    );
};

export default FilterContentMobileInteractive;
