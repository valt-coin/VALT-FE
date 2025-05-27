import axios from "axios";
import AdminCard from "./Admincard";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AdminCardsset = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  const getAllEvents = async () => {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getallevents`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleViewEvent = async (_id: string) => {
    if (!_id) return;
    router.push(`/admin/viewevent/${_id}`);
  };

  const handleEditEvent = async (_id: string) => {
    if (!_id) return;
    router.push(`/admin/editevent/${_id}`);
  };

  const handleDeleteEvent = async (_id: string) => {
    if (!_id) return;
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      color: "white",
      background: "#252b3b",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res: any = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/delete_event/${_id}`
      );
      toast.success("Success! Event Deleted. 🎉");
      setTimeout(
        () =>
          setData((prevData) =>
            prevData.filter(
              (event: any) => event._id !== res.data.deletedEvent._id
            )
          ),
        1000
      );
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div>
      {data.map((el: any, index: number) => {
        return (
          <AdminCard
            {...el}
            key={index}
            onView={handleViewEvent}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
          />
        );
      })}
    </div>
  );
};

export default AdminCardsset;
