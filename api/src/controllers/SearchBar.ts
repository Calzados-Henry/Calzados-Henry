/* import { Products, Users, Category, Product_details, Color, Images, Sizes } from "../db";
import { Op } from "sequelize" */
import axios from 'axios';

export const getProducts = async (product: string): Promise<any> => {
	try {
		if (!product) throw new Error(`there's no any product for` + product);

		const { data }: any = await axios.get('http://localhost:3001/products');

		const filtrados: Array<any> = data.filter((p: any) =>
			p.name.toLowerCase().includes(product.toLowerCase())
		);

		if (!filtrados) throw new Error(`Theres no coincidence for ${product}`);

		return filtrados;
	} catch (error: any) {
		return [];
	}
};
