import React, { useState, useEffect, useRef } from "react";
import Container from "~/components/layouts/Container";
import { useRouter } from "next/router";
import { Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { URL_BD_MR } from "../../helpers/Constants";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";

function terminapublicacion(props) {
    // Lee modelos de los Vehiculos del state
    const router = useRouter();
    const irA = useRef(null);
    const [publicacion, setPublicacion] = useState("");
    const [tituloPublicacion, setTituloPublicacion] = useState("");
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    let estadopublicacion = 0;
    let estadotitulo = "";
    let idprd = 0;

    if (typeof window !== "undefined") {
        if (router.query.estadopublicacion != 2) {
            if (router.query.estadopublicacion == 1) {
                estadopublicacion = 1;
                estadotitulo = router.query.titulopublicacion;
                idprd = router.query.idprd;
            } else {
                estadopublicacion = 0;
                estadotitulo = "";
                idprd = 0;
            }
        }
    }

    useEffect(() => {
        const leerVentas = async () => {
            //console.log("USUARIO : ", datosusuarios);
            let params = {
                uidvendedor: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "160",
                params,
            })
                .then((res) => {
                    if (res.data.listarmisventas.length > 0) {
                        //console.log("DATOS VENTA : ", res.data.listarmisventas[0]);

                        if (estadopublicacion == 1) {
                            setPublicacion(idprd);
                            setTituloPublicacion(estadotitulo);
                        } else {
                            setPublicacion(res.data.listarmisventas[0].id);
                            setTituloPublicacion(
                                res.data.listarmisventas[0].titulonombre
                            );
                        }
                    } else
                        console.log("ERROR : ", "Error leyendo datos ventas");
                })
                .catch(function (error) {
                    console.log("ERROR : ", res.data);
                    return;
                });
        };
        leerVentas();
    }, [datosusuarios, estadopublicacion]);

    const irAlInicio = async () => {
        router.push("/");
    };

    const leerPublicacion = async () => {
        //alert(publicacion);
        //alert(tituloPublicacion);
        let dato = publicacion;
        router.push("/product/" + dato);
    };

    useEffect(() => {
        setTimeout(() => {
            irA.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

        }, 100);
    }, []);

    return (
        <div >
            <Container title="Mi Cuenta">
                <div className="container" ref={irA} >
                    <div className="cuadropublicacionproducto mt-20 mb-30">
                        <div className=" mt-20">
                            <div className="topTerminoPublicacion">
                                <i
                                    className="tamañoiconoterminarpublicacion fa fa-check-circle"
                                    aria-hidden="true"></i>
                                <h1 className=" textoterminapublicacion mt-10 mb-20">
                                    ¡ Publicación realizada con exito !
                                </h1>
                            </div>
                            <div className="cuadrointernopublicacionproducto">
                                <h1 className="textoterminapublicacion">
                                    Tu publicación ha sido creada y publicada.
                                    <br />
                                    Puede tardar algunos minutos en aparecer en
                                    los resultados de búsquedas.
                                    <br />
                                    <br />
                                    Recuerda que el titulo de la publicacion es:{" "}
                                    {tituloPublicacion}
                                    <br />

                                    {/*
                                    <h2 className="textoalert">
                                        Link de la publicacion es : .
                                    </h2>
                                */}

                                    {/*publicacion.titulo*/}
                                </h1>


                            </div>

                            <Grid container spacing={2} justifyContent="flex-end" className="ButtonsRegistrarFotos" mt={3}>
                                <div
                                    className="PubliNuevoMobileCancel"
                                    onClick={() => irAlInicio()}

                                >
                                    Ir al inicio
                                </div>
                                <div
                                    className="PubliNuevoMobile"
                                    onClick={leerPublicacion}>
                                    Ver publicación
                                </div>
                            </Grid>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default terminapublicacion;
