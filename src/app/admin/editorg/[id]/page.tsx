import EditOrgClient from "@/components/client/editorg";
import axios from "axios";

export async function generateStaticParams() {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getallorganizers`);
        if (!res) throw new Error("Failed to fetch IDs");
        return res.data.map((org: any) => ({ id: org._id}));
    } catch(error) {
        console.log("Error fetching IDs:", error);
        return [];
    }
}

const EditOrganizer = () => {
    return <EditOrgClient />;
};

export default EditOrganizer;