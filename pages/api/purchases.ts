import PurchasesModel from "../../model/Purchases";
import dbConnect from "../../lib/dbConnect";


const getPurchases = async (userEmail: string | undefined | null) => {
    await dbConnect();
    return PurchasesModel.find({userId: userEmail});
}

export default getPurchases