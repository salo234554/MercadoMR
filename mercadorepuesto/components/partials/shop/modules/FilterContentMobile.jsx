import { IoClose } from "react-icons/io5";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaCarAlt } from "react-icons/fa";
import WidgetFilterByPriceRangeResults from "~/components/shared/widgets/WidgetFilterByPriceRangeResults";
import WidgetShopFilterByConditionsResult from "~/components/shared/widgets/WidgetShopFilterByConditionsResult";
import WidgetShopByLocationResult from "~/components/shared/widgets/WidgetShopByLocationResult";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { getFiltroOrderByPrd } from "../../../../store/filtroorderbyprd/action";

const FilterContentMobile = (props) => {

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
        productItems,
        ordenarPor,
        setOrdenarPor,
        textoOrdenar,
        setTextoOrdenar,
        onClose
    } = props;

    const dispatch = useDispatch();

    const sortByItems = [
        {
            id: 1,
            text: "Más reciente",
        },
        {
            id: 2,
            text: "De mayor a menor precio",
        },
        {
            id: 3,
            text: "De menor a mayor precio",
        },
    ];

    const ordenar = (item, texto) => {
        dispatch(getFiltroOrderByPrd(item));
        localStorage.setItem("orderbyprd", JSON.stringify(item));
        localStorage.setItem("textoorderbyprd", JSON.stringify(texto));
        setOrdenarPor(item);
        setTextoOrdenar(texto);
        onClose();
    };

    return (
        <div className="filterMainContainer">
            <div className="topFiltersMobile" onClick={onClose}>
                <h2>Filtros</h2>
                <IoClose />
            </div>

            <Link href="/searchinteractive/searchinteractive">
                <div className="buttonSearchVehicle">
                    <div>
                        <span>
                            <RiMotorbikeFill />
                            <p>Busca coincidencias</p>
                        </span>

                        <span>
                            <FaCarAlt />
                            <p>con tu vehiculo</p>
                        </span>
                    </div>
                </div>
            </Link>

            <div className="porPrecioFiltroMobile ">
                <WidgetFilterByPriceRangeResults
                    menorprecio={menorprecio}
                    mayorprecio={mayorprecio}
                    setMenorPrecio={setMenorPrecio}
                    setMayorPrecio={setMayorPrecio}
                    precioFiltroMinimo={precioFiltroMinimo}
                    setPrecioFiltroMinimo={setPrecioFiltroMinimo}
                    precioFiltroMaximo={precioFiltroMaximo}
                    setPrecioFiltroMaximo={setPrecioFiltroMaximo}
                    setFiltroPrecio={setFiltroPrecio}
                    dataPrd={dataPrd}
                    productItems={productItems}
                />
            </div>

            <aside className="ordenarPorMainMobile">
                <div className="tamañotextotitulocondicionSearchMobile">
                    Ordenar por
                </div>

                <div>

                    {sortByItems.map((item, index) => (
                        <div className=" " key={item.id}>
                            <div
                                className=""
                                onClick={() => ordenar(item.id, item.text)}
                                style={{ cursor: 'pointer' }}
                            >
                                {item.id === ordenarPor ? (
                                    <div>
                                        <i
                                            className="tamañoletra11 fa fa-check-square-o colorbase"
                                            aria-hidden="true"
                                        ></i>
                                        <label htmlFor={`orden-${item.id}`}>
                                            <span className="ps-rating tamañoletra11 colorbase">
                                                <a>{item.text}</a>
                                            </span>
                                        </label>
                                    </div>
                                ) : (
                                    <div>
                                        <i
                                            className="tamañoletra11 fa fa-square-o colorbase"
                                            aria-hidden="true"
                                        ></i>
                                        <label htmlFor={`orden-${item.id}`}>
                                            <span className="ps-rating tamañoletra11 colorbase">
                                                <a>{item.text}</a>
                                            </span>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))} 
                </div>
                
            </aside>

            <div className="conditionFilterMobile">
                <WidgetShopFilterByConditionsResult
                    marcarCondicion={marcarCondicion}
                    setMarcarCondicion={setMarcarCondicion}
                    condition={condition}
                    setCondition={setCondition}
                    setFiltroCond={setFiltroCond}
                    filtroCond={filtroCond}
                    setitemSelCond={setitemSelCond}
                    itemSelCond={itemSelCond}
                    setActCiy={setActCiy}
                    actCity={actCity}
                    setPaginaSel={setPaginaSel}
                    setitemIni={setitemIni}
                    setItemFin={setItemFin}
                    setIrInicio={setIrInicio}
                />
            </div>

            <div className="ubicacionFilterMobile">
                <WidgetShopByLocationResult
                    filtrarciud={filtrarciud}
                    cantidadPrdCiudad={cantidadPrdCiudad}
                    PrdCiudadUno={PrdCiudadUno}
                    PrdCiudadDos={PrdCiudadDos}
                    setActivar={setActivar}
                    setSelected={setSelected}
                    marcaSelected={marcaSelected}
                    setmarcaSelected={setmarcaSelected}
                    setActivaCiudad={setActivaCiudad}
                    activaCiudad={activaCiudad}
                    itemSel={itemSel}
                    setitemSel={setitemSel}
                    cerrarFiltro={cerrarFiltro}
                    setCerrarFiltro={setCerrarFiltro}
                    setEraseCitySel={setEraseCitySel}
                    eraseCitySel={eraseCitySel}
                    setCitySelected={setCitySelected}
                    filtroCond={filtroCond}
                    setIrInicio={setIrInicio}
                    setActCiy={setActCiy}
                    actCity={actCity}
                    setPaginaSel={setPaginaSel}
                    setitemIni={setitemIni}
                    setItemFin={setItemFin}
                    setclearFiltroCity={setclearFiltroCity}
                    citySelected={citySelected}
                />
            </div>

        </div>
    );
};

export default FilterContentMobile;
