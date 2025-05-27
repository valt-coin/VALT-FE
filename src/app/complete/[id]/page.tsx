import CompleteClient from "@/components/client/complete";
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

const Complete = () => {
    return <CompleteClient />;
};

export default Complete;