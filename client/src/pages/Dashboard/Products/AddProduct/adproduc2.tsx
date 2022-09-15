import React from 'react';
import { useAuth } from '@/hooks/useAuth';
export function IMAGEN() {

    const auth = useAuth()
    var a = {
        id_category: 4,
        name: "zapatilla fachera",
        description: "stylish look, making these safety work shoes a matching item and it won't look too drab due to work.",
        gender: "Female",
        season: "Winter",
        buy_price: 1850,
        sell_price: 2112,
        details: {
            id_color: 2,
            size: [
                {
                    id: 4,
                    stock: 10,
                },
                {
                    id: 1,
                    stock: 16,
                },
                {
                    id: 3,
                    stock: 15,
                },
                {
                    id: 2,
                    stock: 18,
                },
            ],
        },
    };

    var imagen: any;
    const preGuardado = (e: any) => {
        imagen = e.target.files;
    }

    const onSubmit = async () => {
        var formData = new FormData();
        formData.append("body", JSON.stringify(a));
        if (imagen) {
            for (const file of imagen) {
                formData.append("image", file)
            }
        }
        await fetch("http://localhost:3001/products", { method: "POST", body: formData, headers: { "Authorization": `bearer ${auth.token}` } });
    };

    const formSubmit = (e: any) => {
        e.preventDefault();
        onSubmit()
    }
    return (
        <div>
            SUBIENDO IMAGEN
            <form onSubmit={formSubmit} method='POST' action='http://localhost:3001/products' encType='multipart/form-data'>
                <input type='file' name='image' id='imagen1' multiple onChange={preGuardado} />
                <button type="submit">Subir imagen</button>
            </form>
        </div>
    );
}

export default IMAGEN;