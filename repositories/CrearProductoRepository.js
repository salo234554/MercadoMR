//export const baseDomain = "https://api.aal-estate.com/mrp/api";
export const baseDomain = "https://mercadorepuesto.gimcloud.com/mrp/api";
import Repository, { serializeQuery } from "./Repository";

class CrearProductoRepository {
    async getCrearProducto(params) {
        //console.log("IMAGENES EN API : ", serializeQuery(params));

        const headers = new Headers();
        headers.append("accept", "application/json");

        await fetch(`${baseDomain}/16`, {
            method: "POST",
            body: params,
            //headers: headers,
        }).then((response) => {
            
            if (response) {
                console.log("VALOR RESPONSE : ", response)
                let prueba = 0;
                if (response.status === 200) {
                    swal(
                        "Mercado Repuesto",
                        "Fotos productos grabadas de forma correcta!",
                        "success",
                        { button: "Aceptar" }
                    );
                    console.log("VALOR QUE RETORNA 200 : ", response.message)
                    return 1;
                } else {
                    swal(
                        "Mercado Repuesto",
                        "Se presentaron inconvenientes al grabar los fotos, Intenta nuevamente!",
                        "warning",
                        { button: "Aceptar" }
                    );
                    return false;
                    setLoading(false);
                    router.push("/");
                }
            } else {
                    console.log("RESPONSE INGRESO FOTOS : ", response);
            }
        });

    }
}

export default new CrearProductoRepository();