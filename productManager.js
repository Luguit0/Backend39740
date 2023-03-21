const fs = require('fs').promises

class ProductManager {



    constructor() {
        this.products = []
        this.idAuto = 1;
        this.path = 'Productos.json'
    }

    async readProductsFromFile() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data)
        } catch
        {
            throw new Error('No se pudo leer')
        }
    }

    async saveProductFiles() {
        try {
            fs.writeFile(this.path, JSON.stringify(this.products))
        }
        catch
        {
            throw new Error('No se guardo')
        }
    }

    async updateProducts(id, updateProducts) {
        try {
            const index = await this.products.findIndex((product) => product.id === id)
            console.log(index)

            if (index !== -1) {
                this.products[index] =
                {
                    ...this.products[index],
                    ...updateProducts,
                    id
                }
            }
            this.saveProductFiles()
        }
        catch
        {
            throw new Error('Error, no se actualizo')
        }

    }

    async deleteProduct(id) {
        try {
            const index = await this.products.findIndex((product) => product.id === id)

            if (index !== -1) {
                this.products.splice(index, 1);
                this.saveProductFiles()

            }
        }
        catch
        {
            throw new Error('No se borro')
        }

    }




    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw Error('Todos los campos son obligatorios')
        }

        const sameCode = this.products.find(product => product.code === code)

        if (sameCode) {
            throw Error('Error el código ya está en uso')
        }

        const product = {
            id: this.idAuto,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        this.products.push(product);
        this.idAuto++
        return product
    }
    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id);

        if (product) {
            return product
        } else {
            console.error('Not found')
        }

    }



}

const productManager = new ProductManager();

let producto1 = productManager.addProduct("Termo Stanley Clasico", "Clasico termo Stanley de 1.3lts", 30000, "/imagen1.jpg", "TR-01", 10);

let producto2 = productManager.addProduct("Termo Stanley Rosa", "Termo Stanley limestone de 1lts", 35000, "/imagen2.jpg", "TR-02", 5);

let producto3 = productManager.addProduct("Botella Stanley Blanca", "Color Blanco, de 500cm3", 18900, "/imagen3.jpg", "BT-01", 7);

productManager.updateProducts(1, producto2)
