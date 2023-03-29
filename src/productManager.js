import fs from "fs/promises";

class ProductManager
{
    #products;
    idAuto = 1;
    path = ``;
    
    constructor(){
        this.#products = [];
        this.path = `./src/products.json`;
    }

    async getProduct(limit){
        try
        {
            const productFile = await fs.readFile(this.path, "utf-8");
            const product = JSON.parse (productFile);
            if (limit) {
                const subArray = product.slice(0, limit);
                return subArray;
            } 
            return product;
        }
        catch(error){
            await fs.writeFile(this.path, "[]");
            return "No existe el archivo.";
        }
    }

    async addProduct(product){
        try
        {
            const productFile = await fs.readFile(this.path, "utf-8");
            let newProduct = JSON.parse (productFile);

            const valid = newProduct.find(
                (p)=> p.id === product.id || p.code === product.code );

            if(valid){
                throw new Error ("Id o Code repetido.")
            }

            if (newProduct.length > 0) {
                const lastProduct = newProduct [newProduct.length - 1];
                this.idAuto = lastProduct.id + 1;
            }
            newProduct.push({
                id: this.idAuto++,
                ...product,
            }); 
            await fs.writeFile(this.path, JSON.stringify(newProduct,null,2));
            return "Se creo correctamente el obj."

        } catch (error) {
            throw new Error(error);
        }
    }

    async getProductById (id){
        try 
        {
            const productFile = await fs.readFile(this.path, "utf-8");
            let idProduct = JSON.parse (productFile);

            const findProduct = idProduct.find ( (p) => p.id === id);

            if (!findProduct) {
                throw new Error ("Producto no encontrado.")
            }
            return findProduct;
        } catch (error) {
            throw new Error(error);
        }
    }


    async updateProduct (id, product){
        try {
            const productFile = await fs.readFile(this.path, "utf-8");
        let products = JSON.parse (productFile);

        const idProduct = products.findIndex ((p) => p.id === id);

        products.splice (idProduct, 1, {id, ...product});

        await fs.writeFile(this.path, JSON.stringify(products, null, 2));

        return "Producto modificado."
        }catch (error) {
            throw new Error (error);
        }
    }


    async deleteProduct (id){

        try
        {
        const productFile = await fs.readFile(this.path, "utf-8");
        let products = JSON.parse (productFile);
        const idProduct = products.find((p) => p.id === id);

        if(!idProduct) {
            throw new Error ("El id no existe")
        }
        const deletedProducts = products.filter((p) => p.id !== id);

        await fs.writeFile(this.path, JSON.stringify(deletedProducts, null, 2));

        return "Producto eliminado."

        }catch (error) {
            throw new Error (error);
        }
    }
}

export default ProductManager;