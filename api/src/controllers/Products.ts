"use strict"
// se requiere el models
import { Category, Color, Images, Orders_details, Products, Product_details, Sizes, Users } from '../db';
import { createImages } from './Images';
// import { createP_Details } from './Product_details';

//* README *
//* LAS OPCIONES DE AGREGAR, ACTUALIZA, ELIMINAR, SOLO ESTAN DISPONIBLES PARA EL USUARIO DE NIVEL ADMINISTRADOR
//* GET http://localhost:3001/carrousel/ = Lista de todas las imagenes para el carrousel [Slider] (isActive=true)
//* NOTA: Es un Array de objetos. ejemplo ↓
//* [
//*   {
//*     "id": 1,
//*     "image": "foTO2",
//*     "isActive": true
//*   },
//*   {
//*     "id": 2,
//*     "image": "foTO3",
//*     "isActive": true
//*   }
//* ]
//* GET http://localhost:3001/carrousel/all = Lista de todas las imagenes para el carrousel [Slider] (isActive=true y isActive=false)

//* POST http://localhost:3001/products = Envio por BODY[req.body], ejemplo ↓
//* NOTA: agregar imagenes sera por formulario cuando queramos agregar imagenes del producto.
//* NOTA: Ojo!, mandarlo como array de objetos.
//* {
//*   "id_category": 4,                           [number]
//*   "name": "Botas",                            [string]
//*   "description": "Botas de trabajo",          [string]
//*   "gender": "Male",                           [string] revisar en enums
//*   "season": "Winter",                         [string] revisar en enums
//*   "buy_price": 332.00,                        [integer] numero de 2 decimales
//*   "sell_price": 442.00,                       [integer] numero de 2 decimales
//*   "details": {                                [objeto]
//*       "images": [                             [array de numeros]
//*           1,
//*           2,
//*           3,
//*           4
//*       ],
//*       "id_color": 2,                           [integer] solo 1 id de color
//*       "size": [                                [array de objetos] {id de la talla, stock de dicha talla}
//*           {
//*               "id": 2,
//*               "stock": 18
//*           },
//*           {
//*               "id": 3,
//*               "stock": 15
//*           },
//*           {
//*               "id": 1,
//*               "stock": 16
//*           },
//*           {
//*               "id": 4,
//*               "stock": 10
//*           }
//*       ]
//*   }
//* }
//* DELETE http://localhost:3001/products = mandar datos es por body, solo mandar el id del producto a eliminar, ejemplo ↓
//* NOTA: La imagen no se elimina, solo es baja logica, "isActive": false.
//* {
//*   "id": 3,                              (ID del producto)
//* }

function formatValueProduct(products: any) {
  products = JSON.parse(JSON.stringify(products, null, 2))
  for (var vProduct of products) {
    var details = vProduct.details[0]
    var image = details.Images.map((x: any) => {
      return { id: x.id, image: x.image, isActive: x.isActive }
    })
    var sizes = details.Sizes.map((x: any) => {
      return { id: x.id, size: x.size, stock: x.Product_details_size.stock, isActive: x.isActive }
    })
    var nDetails = {
      color: details.Color,
      images: image,
      sizes: sizes,
    }
    vProduct.details = nDetails
  }
  return products
}

export const getProducts = async (): Promise<any> => {
  // Temporal para cambiar los Fall to Autumn
  // Se trae todas las imagenes para el Slider

  var products = await Products.findAll({
    order: [
      ['details', Sizes, 'size', 'ASC'],
      ['id', 'ASC'],
    ], include: [Users, Category,  {
      model: Product_details, as: 'details', include: [Color, Images, Sizes]}] , attributes: {exclude: ['buy_price']
    }
  })

  var productValuesFormat = formatValueProduct(products)
  return products.length > 0 ? productValuesFormat : { message: "There's no any products" }
}

interface Months {
  Jan: number,
   Feb: number,
   Mar:number,
   Apr:number,
   May:number,
   Jun:number,
   Jul:number,
   Aug:number,
   Sep: number,
   Oct:number,
   Nov:number,
   Dec:number
}

export const getProductsAdmin = async (time: string, categoria: string): Promise<any> => {
  // Temporal para cambiar los Fall to Autumn
  // Se trae todas las imagenes para el Slider
  const months: Months = {
     Jan: 1,
     Feb: 2,
     Mar:3,
     Apr:4,
     May:5,
     Jun:6,
     Jul:7,
     Aug:8,
     Sep: 9,
     Oct:10,
     Nov:11,
     Dec:12

  }

  var products = await Products.findAll({ include: [Users, Category, Orders_details, { model: Product_details, as: 'details', include: [Color, Images, Sizes ] }] })
  var productValuesFormat = formatValueProduct(products)
  let filtro;

    filtro = productValuesFormat.map(( item: any ) => 
    {
      item.orders_details = item.orders_detail.filter(( order:any ) => {
         const t = order.time.split('-')
         let totalVentas = 0;
         totalVentas += order.total
         const toDay = Date().split(' ');
         const difAño = (Number(toDay[3]) - Number(t[0]))
         const difMes = (months[toDay[1] as keyof Months] +( 12 * difAño)) -  Number(t[1])
         const difDias =  Number(toDay[2]) + (30 * difMes) - Number(t[2])
         order.dif = difDias
         item.totalVentas = totalVentas
         return time === 'Desde el principio' ? order.order_state === 'Fulfilled' : 
          (order.dif < Number(time) && (order.order_state === 'Fulfilled')) /* ? true : false */
        })
        return item
    })
  
    return categoria !== '' ?  filtro.filter((item: any) => item.Category.category === categoria) : filtro
}

  





/* var products = await Products.findAll({
    include: [Users, Category, {
      model: Product_details, as: 'details', include: [Color, Images, Sizes],
    }]
  }) */

export const createProducts = async (req: any): Promise<any> => {
  const { body } = req
  const {file, ...value}: any = JSON.parse(body.body)
  // Se verifica en las columnas UNIQUE si existe dicho valor antes de agregar una nueva talla.
  const nProduct: any = await Products.create(value) // aqui crea el producto en general.
  const details = await nProduct.createDetail(value.details)
  //const details = await nProduct.createDetail({ id_product: nProduct.id, id_color: value.details.id_color }) // toma el producto y agrega el color.

  for (const val of value.details.size) {
    // toma el producto anteriormente creado y añade tallas con el stock de cada uno.
    await details.addSizes(val.id, { through: { stock: val.stock } })
  }

  await createImages(req, details)

  return await Products.findByPk(nProduct.id, {
    include: [Category, { model: Product_details, as: "details", include: [Color, Images, Sizes] }],
  })
}

export const updateProducts = async (value: any): Promise<any> => {
  // Se busca el usuario por id
  console.log('esto es el update', value);
  var productByID = await Products.findByPk(value.id)
  if (productByID !== null) {
    productByID.set(value)
    await productByID.save()
    return productByID
  }
  return { message: `we couldn't find the product with id: ${value.id}.` }
}

export const deleteProducts = async (id: number): Promise<any> => {
  // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
  var productByID: any = await Products.findByPk(id)

  if (productByID !== null) {
    if (productByID.isActive) {
      productByID.isActive = false
      await productByID.save()
      return productByID
    }
    return { message: `The product with id ${id} is already deleted` }
  }
  return { message: `we couldn't find the product with id: ${id}` }
}

export const getProductById = async (id: number) => {
  try {
    const product = await Products.findByPk(id, {
      include: [Users, Category, { model: Product_details, as: "details", include: [Color, Images, Sizes] }],
      attributes: { exclude: ["buy_price"] },
    })
    const productValuesFormat = formatValueProduct([product])
    return productValuesFormat[0]
  } catch {
    return "Error no existe este producto flaco"
  }
}
