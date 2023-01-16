import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import Products from "../../model/Products";
import PurchasesModel from "../../model/Purchases";

interface ResponseData {
    error?: string;
    msg?: string;
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    await dbConnect();

    if (req.method !== "POST")
        return res
            .status(400)
            .json({ error: "This API call only accepts POST methods" });


    req.body[0].map(async (item: any) => {
        await Products.findOneAndUpdate({ id: item.product.id }, { $inc: { stock: -item.quantity } });
    });

    const purchase = new PurchasesModel({
        id: Date.now(),
        userId: req.body[1],
        cart: req.body[0],
        datetime: new Date().toISOString()
    })

    purchase.save();

    return res.status(203).end()
}
