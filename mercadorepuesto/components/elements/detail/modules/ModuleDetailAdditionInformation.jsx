import React from "react";
import { Box, Grid, Button } from "@mui/material";

// Change your description content here
const ModuleDetailDescription = ({ product }) => {
    return (
        <div>
            <Grid container alignItems="stretch" spacing={1}>
                <Grid item xs={6} sm={4} >
                    <div className="rowinformacionadicionalcero">
                        Marca del repuesto
                    </div>
                </Grid>
                <Grid item xs={6} sm={8} >
                    <div className="rowinformacionadicionalcerodos  ">
                        {product.marcarepuesto}
                    </div>
                </Grid>
            </Grid>
            <Grid container alignItems="stretch" spacing={1}>
                <Grid item xs={ 6} sm={4} >
                    <div className="rowinformacionadicional">Condición</div>
                </Grid>
                <Grid item xs={6} sm={8} >
                    <div className="rowinformacionadicionaldos  ">
                        {product.condicion}
                    </div>
                </Grid>
            </Grid>
            <Grid container alignItems="stretch" spacing={1}>
                <Grid item xs={6} sm={4}>
                    <div className="rowinformacionadicional">
                        Número de parte
                    </div>
                </Grid>
                <Grid item xs={6} sm={8}>
                    {product.numerodeparte == 0 ? (
                        <div className="condicionnoaplica">N/A</div>
                    ) : (
                            <div className="rowinformacionadicionaldos  ">
                            {product.numerodeparte}
                        </div>
                    )}
                </Grid>
            </Grid>
            <Grid container alignItems="stretch" spacing={1}>
                <Grid item xs={6} sm={4} >
                    <div className="rowinformacionadicional">
                        Escala de funcionalidad
                    </div>
                </Grid>
                <Grid item xs={6} sm={8}>
                    {product.funcionalidad == "Funcionalidad del producto" ? (
                        <div className="condicionnoaplica">N/A</div>
                    ) : (
                            <div className="rowinformacionadicionaldos  ">
                            {product.funcionalidad}
                        </div>
                    )}
                </Grid>
            </Grid>
            {
                console.log("VENDE PARTES : ", product)
            }
            <Grid container alignItems="stretch" spacing={1} className="h-[55px]">
                <Grid item xs={6} sm={4} className="flex items-center h-full !pt-0">
                    <div className="rowinformacionadicional">
                        Vender por partes
                    </div>
                </Grid>
                <Grid item xs={6} sm={8}>
                    {product.vendeporpartes == 1 ? (
                        <div className="rowinformacionadicionaldos">
                            Si, se vende por partes
                        </div>
                    ) : product.vendeporpartes == 2 ? (
                        <div className="rowinformacionadicionaldos">
                            No, se vende completo
                        </div>
                    ) : (
                        <div className="condicionnoaplica">N/A</div>
                    )}
                </Grid>
            </Grid>
            <Grid container alignItems="stretch" spacing={1}>
                <Grid item xs={6} sm={4}>
                    <div className="rowinformacionadicional">
                        Estado del producto
                    </div>
                </Grid>
                <Grid item xs={6} sm={8} >
                    {product.estadoproducto == 0 ? (
                        <div className="condicionnoaplica">
                            N/A
                        </div>
                    ) : (
                            <div className="rowinformacionadicionaldos  ">
                            {product.estadoproducto}
                        </div>
                    )}
                </Grid>
            </Grid>
            <Grid container alignItems="stretch" spacing={1}>
                <Grid item xs={6} sm={4} >
                    <div className="rowinformacionadicional">
                        Largo del producto
                    </div>
                </Grid>
                <Grid item xs={6} sm={8}>
                    <div className="rowinformacionadicionaldos  ">
                        {product.largo}
                    </div>
                </Grid>
            </Grid>
            <Grid container alignItems="stretch" spacing={1}>
                <Grid item xs={6} sm={4} >
                    <div className="rowinformacionadicional">
                        Peso del producto
                    </div>
                </Grid>
                <Grid item xs={6} sm={8}>
                    <div className="rowinformacionadicionaldos  ">
                        {product.peso}
                    </div>
                </Grid>
            </Grid>
            <Grid container alignItems="stretch" spacing={1}>
                <Grid item xs={6} sm={4}>
                    <div className="rowinformacionadicional">
                        Ancho del producto
                    </div>
                </Grid>
                <Grid item xs={6} sm={8} >
                    <div className="rowinformacionadicionaldos  ">
                        {product.ancho}
                    </div>
                </Grid>
            </Grid>
            <Grid container alignItems="stretch" spacing={1}>
                <Grid item xs={6} sm={4}>
                    <div className="rowinformacionadicional">
                        Alto del producto
                    </div>
                </Grid>
                <Grid item xs={6} sm={8}>
                    <div className="rowinformacionadicionaldos  ">
                        {product.alto}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default ModuleDetailDescription;
