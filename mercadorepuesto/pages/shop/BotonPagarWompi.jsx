import React from "react";

const BotonPagarWompi = ({ infoUserPago = {}, referencia = "" }) => {
    console.log("INFOUSER : ", infoUserPago)
    return (
        <form
            action="https://checkout.wompi.co/p/"
            method="GET"
            style={{ display: "inline" }}
        >
            <input
                type="hidden"
                name="public-key"
                value="pub_test_Xnmo3SoUCyyUOwkhsstfScsgLDOnfN2F"
            />
            <input type="hidden" name="currency" value="COP" />
            <input
                type="hidden"
                name="amount-in-cents"
                value={(infoUserPago.totalapagar || 0) + "00"}
            />
            <input type="hidden" name="reference" value={referencia || "default-ref"} />
            <input
                type="hidden"
                name="redirect-url"
                value="https://mercadorepuesto-psi.vercel.app/Transactions/consulttransactions"
            />
            <input
                type="hidden"
                name="tax-in-cents:vat"
                value={(infoUserPago.valorimpuesto || 0) + "00"}
            />
            <input
                type="hidden"
                name="tax-in-cents:consumption"
                value={"0" + "00"}
            />
            <input
                type="hidden"
                name="customer-data:email"
                value={infoUserPago.email || ""}
            />
            <input
                type="hidden"
                name="customer-data:full-name"
                value={
                    (infoUserPago.nombres || "") +
                    " " +
                    (infoUserPago.apellidos || "")
                }
            />
            <input
                type="hidden"
                name="customer-data:phone-number"
                value={"+57" + (infoUserPago.telefono || "")}
            />
            <input
                type="hidden"
                name="customer-data:legal-id"
                value={infoUserPago.documento || ""}
            />
            <input
                type="hidden"
                name="customer-data:legal-id-type"
                value="CC"
            />
            <input
                type="hidden"
                name="shipping-address:address-line-1"
                value={infoUserPago.direccion || ""}
            />
            <input
                type="hidden"
                name="shipping-address:country"
                value="CO"
            />
            <input
                type="hidden"
                name="shipping-address:phone-number"
                value={"+57" + (infoUserPago.telefono || "")}
            />
            <input
                type="hidden"
                name="shipping-address:city"
                value={infoUserPago.ciudad || ""}
            />
            <input
                type="hidden"
                name="shipping-address:region"
                value={infoUserPago.departamento || ""}
            />
            <button type="submit" className="BtnPagarNuevo">
                Pagar con Wompi
            </button>
        </form>
    );
};

export default BotonPagarWompi;