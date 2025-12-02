import React, { useState, useEffect } from "react";
import ModuleDetailTopInformation from "~/components/elements/detail/modules/ModuleDetailTopInformation";
import ModuleProductDetailDescription from "~/components/elements/detail/modules/ModuleProductDetailDescription";
import ModuleDetailShoppingActions from "~/components/elements/detail/modules/ModuleDetailShoppingActions";
import ModuleProductDetailSharing from "~/components/elements/detail/modules/ModuleProductDetailSharing";
import ModuleDetailThumbnail from "~/components/elements/detail/modules/ModuleDetailThumbnail";
import RatingPrdSingleView from "~/components/elements/products/modules/RatingPrdSingleView";
import axios from "axios";
import useProduct from "~/hooks/useProduct";
import useEcomerce from "~/hooks/useEcomerce";
import { connect, useDispatch } from "react-redux";
import ModuleDetailMeta from "~/components/elements/detail/modules/ModuleDetailMeta";
import ModuleDetailTabs from "~/components/elements/detail/modules/ModuleDetailTabs";
import FrequentlyBoughtTogether from "~/components/partials/products/FrequentlyBoughtTogether";
import { Box, Grid, Button } from "@mui/material";
import { FaShuttleVan } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa6";
import { PiTruckFill } from "react-icons/pi";
import { MdElectricCar } from "react-icons/md";
import { URL_BD_MR } from "~/helpers/Constants";

let clase = "0";

const SingleProductView = ({ product, status = "in-stock" }) => {
    const dispatch = useDispatch();
    const { loading, addItem } = useEcomerce();
    const { brand } = useProduct();
    const [classCompatbilidad, setclassCompatbilidad] = useState(
        "infovehiculoviewprdsingle apuntador"
    );
    const [classCompatbilidadDos, setclassCompatbilidadDos] = useState(
        "infovehiculoviewprdsingle apuntador"
    );
    const [vehCompatibles, setVehCompatibles] = useState([]);
    const [posicionPrdVeh, setPosicionPrdVeh] = useState(null);
    const [openClosePosPrdVeh, setOpenClosePosPrdVeh] = useState(null);

    //console.log("PRODUCTODETAIL : ", product);
    let statusView;

    if (status !== "out-stock") {
        statusView = (
            <p className="ps-product__log-status">
                Unidades Disponibles : {product && product.numerounidades}
            </p>
        );
    } else {
        statusView = (
            <p className="ps-product__log-status outstock">Out of stock</p>
        );
    }

    const handleAddItemToCart = (e) => {
        e.preventDefault();

        const dat = [
            {
                id: 9,
                quantity: 3,
            },
        ];
        //console.log("AGREGAR ITEM AL CARRITO : ", ecomerce.cartItems);
        return;

        addItem({ id: product.id, quantity: 1 }, dat, "cart");
        dispatch(toggleDrawer(true));
    };

    const handleCompatibilidad = () => {
        //alert(product.idproductovehiculo)

        if (vehCompatibles.length > 0)
            setclassCompatbilidadDos("infovehiculoviewprdsingle apuntador");
        else setclassCompatbilidadDos("infovehiculoviewprdsingledos apuntador");

        //console.log("vehCompatibles : ", vehCompatibles);
        //console.log("Idproductovehiculo : ", product.idproductovehiculo);

        if (vehCompatibles.length > 0) {
            setVehCompatibles([]);
        } else {
            const leeVehiculoPrd = async () => {
                let params = {
                    idvehiculo: product.idproductovehiculo,
                };

                await axios({
                    method: "post",
                    url: URL_BD_MR +"298",
                    params,
                })
                    .then((res) => {
                        //console.log("COMPATIBLES : ", res.data.listarprdvehiculo[0])

                        let dataveh = res.data.listarprdvehiculo[0];

                        let array = [];

                        let combustibleveh = "Gasolina";

                        if (dataveh.tipocombustible == 1)
                            combustibleveh = "Gasolina";
                        else if (dataveh.tipocombustible == 2)
                            combustibleveh = "Diesel";
                        else if (dataveh.tipocombustible == 3)
                            combustibleveh = "Gasolina - Gas";
                        else if (dataveh.tipocombustible == 4)
                            combustibleveh = "Gasolina – Eléctrico";

                        let traccionveh = "Tracción Delantera";

                        if (dataveh.tipotraccion == 1)
                            traccionveh = "Tracción Delantera";
                        else if (dataveh.tipotraccion == 2)
                            traccionveh = "Tracción Trasera";
                        else if (dataveh.tipotraccion == 3)
                            traccionveh = "Tracción 4x4";

                        let transmisionveh = "Automática";

                        if (dataveh.transmision == 1)
                            transmisionveh = "Automática";
                        else if (dataveh.transmision == 2)
                            transmisionveh = "Manual";

                        let row = {
                            marcaveh: dataveh.marca,
                            modeloveh: dataveh.modelos,
                            anovehiculo: dataveh.anovehiculo,
                            cilindraje: dataveh.cilindraje,
                            combustible: combustibleveh,
                            traccion: traccionveh,
                            transmision: transmisionveh,
                        };
                        //array.push(row);

                        //let arraycompatibilidad = [];
                        leeVehiculosCompatibles(row);
                    })
                    .catch(function (error) {
                        console.log("Error leyendo publicación");
                    });
            };

            leeVehiculoPrd();

            const leeVehiculosCompatibles = async (array) => {
                //console.log("COMPATIBLES : ", array)
                let params = {
                    idproducto: '"' + product.idproductovehiculo + '"',
                };

                await axios({
                    method: "post",
                    url: URL_BD_MR + "45",
                    params,
                })
                    .then((res) => {
                        //console.log("COMPATIBLES : ", res.data)
                        let arraycompatibilidad = [];

                        if (array) {
                            arraycompatibilidad.push(array);
                        }

                        res.data.vehiculoscomp &&
                            res.data.vehiculoscomp.map((item) => {
                                let combustibleveh = "Gasolina";

                                if (item.combustible == 1)
                                    combustibleveh = "Gasolina";
                                else if (item.combustible == 2)
                                    combustibleveh = "Diesel";
                                else if (item.combustible == 3)
                                    combustibleveh = "Gasolina - Gas";
                                else if (item.combustible == 4)
                                    combustibleveh = "Gasolina – Eléctrico";

                                let traccionveh = "Tracción Delantera";

                                if (item.traccion == 1)
                                    traccionveh = "Tracción Delantera";
                                else if (item.traccion == 2)
                                    traccionveh = "Tracción Trasera";
                                else if (item.traccion == 3)
                                    traccionveh = "Tracción 4x4";

                                let transmisionveh = "Automática";

                                if (item.transmision == 1)
                                    transmisionveh = "Automática";
                                else if (item.transmision == 2)
                                    transmisionveh = "Manual";

                                let row = {
                                    marcaveh: item.marcaveh,
                                    modeloveh: item.modeloveh,
                                    anovehiculo: item.anovehiculo,
                                    cilindraje: item.cilindraje,
                                    combustible: combustibleveh,
                                    traccion: traccionveh,
                                    transmision: transmisionveh,
                                };
                                arraycompatibilidad.push(row);
                            });

                        setVehCompatibles(arraycompatibilidad);
                    })
                    .catch(function (error) {
                        console.log("Error leyendo Prd Compatibles");
                    });
            };
        }
    };

    const handlePosicionPrd = () => {
        const leePosicionPrd = async () => {
            let compara = product.posicionproducto;

            await axios({
                method: "post",
                url: URL_BD_MR + "46",
            })
                .then((res) => {
                    let posicionprd = "";
                    let posicionprddescripcion = "";

                    res.data.listarposicionprd &&
                        res.data.listarposicionprd.map((item) => {
                            if (parseInt(item.codigo) == compara) {
                                posicionprd = item.nombre;
                                if (
                                    item.codigo == 11 ||
                                    item.codigo == 12 ||
                                    item.codigo == 13
                                )
                                    posicionprddescripcion = item.descripcion;
                                else posicionprddescripcion = item.nombre;
                            }
                        });
                    //console.log("POSPRD : ", posicionprd)
                    if (product?.tipovehiculo == 1) {
                        setPosicionPrdVeh(posicionprddescripcion);
                    } else {
                        setPosicionPrdVeh(posicionprd);
                    }

                    setOpenClosePosPrdVeh(!openClosePosPrdVeh);
                })
                .catch(function (error) {
                    console.log("Error Compatible PRD");
                });
        };
        leePosicionPrd();
    };

    useEffect(() => {
        if (product && product.productogenerico == "Si")
            setclassCompatbilidad(
                "infovehiculoviewprdsingle apuntador deshabilitardiv"
            );
        else setclassCompatbilidad("infovehiculoviewprdsingle apuntador");
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={5}>
                <ModuleDetailThumbnail product={product} />
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
                <ModuleDetailTopInformation product={product} />
                {
                    // product && product.numerounidades > 0 ? (
                }
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12} lg={12}>
                        <ModuleDetailShoppingActions product={product} />
                    </Grid>
                    {/*
                        <Grid item xs={6} md={6} lg={6}>
                            <label className="ml-20 ps-product__label mt-3">
                                Unidades disponibles:{" "}
                                {product.numerounidades}
                            </label>
                        </Grid>
                            */}
                </Grid>
                {
                    //) : null
                }
                <div>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12} lg={12}>
                            <a className="textoubicacionprd">
                                <span>ID producto:</span>
                                <a className="tamañotextoubicacioninfoproducto ">
                                    {product && product.compatible}
                                </a>
                            </a>
                        </Grid>
                    </Grid>
                </div>
                <div className="">
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12} lg={12}>
                            <a className="textoubicacionprd">
                                <span> Marca del repuesto:</span>
                                <a className="tamañotextoubicacioninfoproducto ">
                                    {product && product.marcarepuesto}
                                </a>
                            </a>
                        </Grid>
                    </Grid>
                </div>
                <div className="mt-2">
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12} lg={12}>
                            <a className="textoubicacionprd">
                                <span>Condición:</span>
                                <a className="tamañotextoubicacioninfoproducto ">
                                    {product && product.condicion}
                                </a>
                            </a>
                        </Grid>
                    </Grid>
                </div>

                {product && product.estadoproducto > 0 ? (
                    <div className="mt-2">
                        <a className="textoubicacionprd">
                            <div className="listoFer">
                                {" "}
                                Estado del producto:
                            </div>
                            <RatingPrdSingleView
                                estadoproducto={
                                    product && product.estadoproducto
                                }
                            />
                        </a>
                    </div>
                ) : null}

                <div className="mt-2">
                    <a className="textoubicacionprd">
                        <div className="listoFer"> Ubicación del producto:</div>
                        <div className=" textomostrarcantidadresult">
                            {product?.nombredepartamento}
                            {" - "}
                            {product?.nombreciudad}
                        </div>
                    </a>
                </div>

                {product && product.productogenerico == "No" ? (
                    <div className="mt-4">
                        <Grid container spacing={1} className="mbmenos7">
                            <Grid item xs={12} md={12} lg={12}>
                                <div
                                    className={classCompatbilidad}
                                    onClick={() => handleCompatibilidad()}>
                                    <span>Compatibilidad con vehículos</span>
                                    {vehCompatibles.length == 0 ? (
                                        <i
                                            className=" fa fa-chevron-down"
                                            aria-hidden="true"></i>
                                    ) : (
                                        <i
                                            className="fa fa-chevron-up"
                                            aria-hidden="true"></i>
                                    )}
                                </div>
                            </Grid>
                        </Grid>

                        {vehCompatibles.length > 0
                            ? vehCompatibles &&
                              vehCompatibles.map((itemselect) => {
                                  let texto =
                                      itemselect.marcaveh +
                                      ", " +
                                      itemselect.modeloveh +
                                      ", " +
                                      itemselect.anovehiculo +
                                      ", " +
                                      itemselect.cilindraje +
                                      ", " +
                                      itemselect.combustible +
                                      ", " +
                                      itemselect.traccion +
                                      ", " +
                                      itemselect.transmision;

                                  texto.length > 80
                                      ? (clase = "vehcompatiblesprddos")
                                      : (clase = "vehcompatiblesprd");

                                  return (
                                      <Grid
                                          container
                                          spacing={1}
                                          className={clase}>
                                          {(product &&
                                              product.tipovehiculo == 2) ||
                                          (product &&
                                              product.tipovehiculo == 0) ? (
                                              <a>
                                                  <i>
                                                      <FaCar className="iconposicionprd" />
                                                  </i>
                                              </a>
                                          ) : product &&
                                            product.tipovehiculo == 1 ? (
                                              <a>
                                                  <i>
                                                      <FaMotorcycle className="iconposicionprd" />
                                                  </i>
                                              </a>
                                          ) : product &&
                                            product.tipovehiculo == 3 ? (
                                              <a>
                                                  <i>
                                                      <PiTruckFill className="iconposicionprd" />
                                                  </i>
                                              </a>
                                          ) : product &&
                                            product.tipovehiculo == 4 ? (
                                              <a>
                                                  <i>
                                                      <MdElectricCar className="iconposicionprd" />
                                                  </i>
                                              </a>
                                          ) : product &&
                                            product.tipovehiculo == 6 ? (
                                              <a>
                                                  <i>
                                                      <FaShuttleVan className="iconposicionprd" />
                                                  </i>
                                              </a>
                                          ) : null}{" "}
                                          {texto.length > 80 ? (
                                              <a className="textocompatibilidad cursordisable">
                                                  {itemselect.marcaveh}

                                                  {", "}
                                                  {itemselect.modeloveh}
                                                  {", "}
                                                  {itemselect.anovehiculo}
                                                  {", "}
                                                  {itemselect.cilindraje}
                                                  {", "}
                                                  {itemselect.combustible}
                                                  {", "}
                                                  {itemselect.traccion}
                                                  {", "}
                                                  {itemselect.transmision}
                                              </a>
                                          ) : (
                                              <a className="cursordisable textocompatibilidad">
                                                  {itemselect.marcaveh}
                                                  {", "}
                                                  {itemselect.modeloveh}
                                                  {", "}
                                                  {itemselect.anovehiculo}
                                                  {", "}
                                                  {itemselect.cilindraje}
                                                  {", "}
                                                  {itemselect.combustible}
                                                  {", "}
                                                  {itemselect.traccion}
                                                  {", "}
                                                  {itemselect.transmision}
                                              </a>
                                          )}
                                      </Grid>
                                  );
                              })
                            : null}

                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                <div
                                    className={classCompatbilidadDos}
                                    onClick={() => handlePosicionPrd()}>
                                    <span>Posición del producto</span>
                                    {!openClosePosPrdVeh ? (
                                        <i
                                            className="fa fa-chevron-down"
                                            aria-hidden="true"></i>
                                    ) : (
                                        <i
                                            className="fa fa-chevron-up"
                                            aria-hidden="true"></i>
                                    )}
                                </div>
                            </Grid>
                        </Grid>
                        {openClosePosPrdVeh ? (
                            <div className="posicionprdveh">
                                {posicionPrdVeh}
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
                <ModuleDetailTabs product={product} />
            </Grid>
        </Grid>
    );
};

export default SingleProductView;
