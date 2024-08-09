import { ProductRepository } from "../repositories/product.repository.js";
const productRepository = new ProductRepository();

export class ProductManager {
    async addProduct(req, res) {
        const nuevoProducto = req.body;
        try {
            const resultado = await productRepository.agregarProducto(nuevoProducto);
            res.json(resultado);

        } catch (error) {
            res.status(500).send("Error");
        }
    }

    async getProducts(req, res) {
        try {
            let { limit = 10, page = 1, sort, query } = req.query;

            const products = await productRepository.obtenerProductos(limit, page, sort, query);
           
            res.json(products);
            console.log(products);
        } catch (error) { 
            res.status(500).send("Error");
        }
    }

    async getProductById(req, res) {
        const id = req.params.pid;
        try {
            const buscado = await productRepository.obtenerProductoPorId(id);
            if (!buscado) {
                return res.json({
                    error: "Producto no encontrado"
                });
            }
            res.json(buscado);
        } catch (error) {
            res.status(500).send("Error");
        }
    }

    async updateProduct(req, res) {
        try {
            const id = req.params.pid;
            const productoActualizado = req.body;

            const resultado = await productRepository.actualizarProducto(id, productoActualizado);
            res.json(resultado);
        } catch (error) {
            res.status(500).send("Error al actualizar el producto");
        }
    }

    async deleteProduct(req, res) {
        const id = req.params.pid;
        try {
            let respuesta = await productRepository.eliminarProducto(id);

            res.json(respuesta);
        } catch (error) {
            res.status(500).send("Error al eliminar el producto");
        }
    }

}

/*
PRODUCTOS:

{
    "title": "Disco Rígido WD 2TB BLUE 256MB SATA 6.0GB/s",
    "description": "Tipo de conexión: SATA, Consumo: 5w y Tipo de disco: Mecánico",
    "code": "WD20EZBX-00AYRA0",
    "price": 73840,
    "status": true,
    "stock": 50,
    "category": "Disco rígido",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_35996_Disco_Rigido_WD_2TB_BLUE_256MB_SATA_6.0GB_s_7200RPM_dc36f8f5-grn.jpg"	
}

{
    "title": "Disco Sólido SSD WD 480GB GREEN 545MB/s SATA",
    "description": "Tipo de conexión: SATA, Consumo: 3w y Tipo de Disco: Sólido",
    "code": "WDS480G2G0A",
    "price": 42600,
    "status": true,
    "stock": 100,
    "category": "Disco rígido",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_11198_Disco_S__lido_SSD_WD_480GB_GREEN_545MB_s_SATA_401cd02f-grn.jpg"	
}

{
    "title": "Disco Solido SSD M.2 WD 1TB Green SN350 3200MB/s NVMe PCI-E Gen3 x4",
    "description": "Tipo de conexión: M2, Consumo: 3w y Tipo de disco: Sólido",
    "code": "WDS100T3G0C-00AZL0",
    "price": 90250,
    "status": true,
    "stock": 75,
    "category": "Disco rígido",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_31382_Disco_Solido_SSD_M.2_WD_1TB_Green_SN350_3200MB_s_NVMe_PCI-E_Gen3_x4_b02bfa23-grn.jpg"	
}

{
    "title": "Disco Solido SSD M.2 2230 WD_Black 500GB SN770M 5000MB/s NVMe PCIe Gen4 x4",
    "description": "Tipo de conexión: M2 2230, Consumo: 3v y Tipo de disco: Sólido",
    "code": "WDS500G3X0G",
    "price": 102450,
    "status": true,
    "stock": 20,
    "category": "Disco rígido",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_39229_Disco_Solido_SSD_M.2_2230_WD_Black_500GB_SN770M_5000MB_s_NVMe_PCIe_Gen4_x4_226b3c58-grn.jpg"	
}

{
    "title": "Fuente Deepcool 500W DA500 80 Plus Bronze",
    "description": "Watts Nominal: 500w y Watts Reales: 500w",
    "code": "4718009157231",
    "price": 67900,
    "status": true, 
    "stock": 30,
    "category": "Fuente",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_14808_Fuente_Aerocool_Cylon_500W_Full_Range_RGB_80_Plus_Bronze_a3fec892-grn.jpg"	
}

{
    "title": "Fuente Deepcool 600W DA600 80 Plus Bronze",
    "description": "Watts Nominal: 600w y Watts Reales: 600w",
    "code": "4718009157248",
    "price": 77500,
    "status": true, 
    "stock": 40,
    "category": "Fuente",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_14814_Fuente_Aerocool_Cylon_600W_Full_Range_RGB_80_Plus_Bronze_a3fec892-grn.jpg"
}

{
    "title": "Fuente Aerocool Cylon 700W Full Range RGB 80 Plus Bronze",
    "description": "Watts Nominal: 700w y Watts Reales: 636w",
    "code": "4718009153363",
    "price": 87900,
    "status": true,
    "stock": 90,
    "category": "Fuente",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_14820_Fuente_Aerocool_Cylon_700W_Full_Range_RGB_80_Plus_Bronze_a3fec892-grn.jpg"	
}

{
    "title": "Fuente Cougar 750W 80 Plus Gold GEC750",
    "description": "Watts Nominal: 750w y Watts Reales: 750w",
    "code": "31GC075.0006P",
    "price": 123550,
    "status": true,
    "stock": 25,
    "category": "Fuente",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_39112_Fuente_Cougar_750W_80_Plus_Gold_GEC750_1d2f2d18-grn.jpg"	
}

{
    "title": "Memoria Team DDR4 8GB 3200MHz T-Force Vulcan Z",
    "description": "Latencia: 16 cl y Voltaje: 1.35v",
    "code": "TLZGD48G3200HC16F01",
    "price": 27900,
    "status": true, 
    "stock": 100,
    "category": "Memoria RAM", 
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_33872_Memoria_Team_DDR4_8GB_3200MHz_T-Force_Vulcan_Z_Grey_CL16_07ea04cc-grn.jpg"
}

{
    "title": "Memoria Corsair DDR4 16GB 3200MHz Vengeance RGB RS Black",
    "description": "Latencia: 16cl y Voltaje: 1.20 v",
    "code": "CMG16GX4M1E3200C16",
    "price": 56990,
    "status": true, 
    "stock": 50,
    "category": "Memoria RAM",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_39404_Memoria_Corsair_DDR4_16GB_3200MHz_Vengeance_RGB_RS_Black_CL16_13536a39-grn.jpg"
}

{
    "title": "Memoria Kingston DDR4 16GB 3200Mhz Fury CL16",
    "description": "Latencia: 16cl y Voltaje: 1.35v",
    "code": "KF432C16BB/16",
    "price": 54900,
    "status": true,
    "stock": 100,
    "category": "Memoria RAM",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_35568_Memoria_Kingston_DDR4_16GB_3200Mhz_Fury_CL16_ac9d0774-grn.jpg"	
}

{
    "title": "Memoria Team DDR4 16GB (2x8GB) 3200MHz Night Hawk RGB Black CL16 RGB Black",
    "description": "Latencia: 16cl y Voltaje:1.35v",
    "code": "TF14D416G3200HC16CDC",
    "price": 62300,
    "status": true,
    "stock": 70,
    "category": "Memoria RAM",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_11557_Memoria_Team_DDR4_16GB__2x8GB__3200MHz_Night_Hawk_RGB_Black_CL16_RGB_Black_f04f26c3-grn.jpg"	
}

{
    "title": "Mother Asrock H610M-HVS LGA 1700",
    "description": "Chipseat principal: Intel H610",
    "code": "H610M-HVS",
    "price": 89950,
    "status": true,
    "stock": 10,
    "category": "Mother",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_34006_Mother_Asrock_H610M-HVS_LGA_1700_486791bd-grn.jpg"	
}

{
    "title": "Mother Gigabyte H470M H Socket 1200",
    "description": "Chipseat principal: Intel H470",
    "code": "H470M-H",
    "price": 89110,
    "status": true,
    "stock": 150,
    "category": "Mother",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_37182_Mother_Gigabyte_H470M_H_Socket_1200_11c1fdca-grn.jpg" 
}

{
    "title": "Mother Asrock Z390 Phantom Gaming 4S Wi-Fi BULK Pack S1151",
    "description": "Chipsets: Intel Z390",
    "code": "Z390 PHANTOM GAMING 4S/AC",
    "price": 74900,
    "status": true,
    "stock": 50,
    "category": "Mother",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_39387_Mother_Asrock_Z390_Phantom_Gaming_4S_Wi-Fi_BULK_Pack_S1151_2e0b0123-grn.jpg"	
}

{
    "title": "Mother ASUS PRIME A320M-K AM4",
    "description": "Chipsets: AMD A320",
    "code": "PRIME A320M-K",
    "price": 77800,
    "status": true,
    "stock": 200,
    "category": "Mother",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_15566_Mother_ASUS_PRIME_A320M-K_AM4_9f5c58de-grn.jpg"	
}

{
    "title": "Procesador AMD Ryzen 5 4500 + Wraith Stealth Cooler AM4",
    "description": "Núcleos:6",
    "code": "100-100000644BOX",
    "price": 118450,
    "status": true,
    "stock": 100, 		
    "category": "Procesador",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_32727_Procesador_AMD_Ryzen_5_4500___Wraith_Stealth_Cooler_AM4_475b8356-grn.jpg"
}

{
    "title": "Procesador AMD Ryzen 5 4600G 3.7GHz + Wraith Stealth Cooler AM4",
    "description": "Núcleos: 6",
    "code": "100-100000031SBX",
    "price": 154500,
    "status": true,
    "stock": 20,
    "category": "Procesador",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_16749_Procesador_AMD_RYZEN_5_3600_4.2GHz_Turbo_AM4_Wraith_Stealth_Cooler_f8ab4915-grn.jpg"
}

{
    "title": "Procesador AMD Ryzen 7 5700G 4.6GHz Turbo + Wraith Stealth Cooler",
    "description": "Núcleos: 8",
    "code": "100-100000263BOX",
    "price": 255000,
    "status": true,
    "stock": 50,
    "category": "Procesador",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_27673_Procesador_AMD_Ryzen_7_5700G_4.6GHz_Turbo___Wraith_Stealth_Cooler_cb33e4fa-grn.jpg"	
}

{
    "title": "Procesador Intel Core i7 12700k 5.0GHz Turbo Socket 1700 Alder Lake",
    "description": "Núcleos: 12",
    "code": "BX8071512700K",
    "price": 409900,
    "status": true,
    "stock": 30,
    "category": "Procesador",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_29140_Procesador_Intel_Core_i7_12700K_5.0GHz_Turbo_Socket_1700_Alder_Lake_4319ac0c-grn.jpg"	
}

*/