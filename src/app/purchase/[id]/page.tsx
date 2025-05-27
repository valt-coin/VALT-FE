import PurchaseClient from "@/components/client/purchase";
import axios from "axios";

export async function generateStaticParams() {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getallevents`);
        if (!res) throw new Error("Failed to fetch IDs");
        return res.data.map((event: any) => ({ id: event._id}));
    } catch(error) {
        console.log("Error fetching IDs:", error);
        return [];
    }
}

const Purchase = () => {
    return <PurchaseClient />;
};

export default Purchase;