import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

interface EventFormData {
  eventname: string;
  logo: string;
  date: string;
  localtime: string;
  country: string;
  city: string;
  www: string;
  type: string;
  active: string;
  on_offline: string;
  link: string;
  organizerId: string;
  description: string;
  gen_invtitle: string;
  gen_invnum: string;
  gen_invlimit: string;
  gen_invvalt: string;
  vip_invtitle: string;
  vip_invnum: string;
  vip_invlimit: string;
  vip_invvalt: string;
  vipb_invtitle: string;
  vipb_invnum: string;
  vipb_invlimit: string;
  vipb_invvalt: string;
  offerdate: string;
  offerlocaltime: string;
}

interface OrgFormData {
  organizer: string;
  name: string;
  surname: string;
  country: string;
  city: string;
  telegram: string;
  phone: string;
  email: string;
  wallet: string;
  organizerId: string;
  active: boolean;
}

interface AddEventProps {
  vtype?: string;
}

const AddEvents: React.FC<AddEventProps> = ({ vtype }) => {
  const [formData, setFormData] = useState<EventFormData>({
    eventname: "",
    logo: "",
    date: "",
    localtime: "",
    country: "",
    city: "",
    www: "",
    type: "Networking",
    active: "Active",
    on_offline: "Online",
    link: "",
    organizerId: "",
    description: "",
    gen_invnum: "",
    gen_invtitle: "",
    gen_invlimit: "1",
    gen_invvalt: "1",
    vip_invnum: "",
    vip_invtitle: "",
    vip_invlimit: "1",
    vip_invvalt: "1",
    vipb_invnum: "",
    vipb_invtitle: "",
    vipb_invlimit: "1",
    vipb_invvalt: "1",
    offerdate: "",
    offerlocaltime: "",
  });

  const [organizers, setOrganizers] = useState<OrgFormData[]>([]);
  const router = useRouter();
  const arrType = [
    "Charity",
    "Conference",
    "Concert",
    "Diner",
    "Esport",
    "Exhibition",
    "Fair",
    "Fashion",
    "Festival",
    "Hackathon",
    "Meetup",
    "Metaverse",
    "Networking",
    "Party",
    "Retreat",
    "Seminar",
    "Show",
    "Sport",
    "Webinar",
    "Workshop",
  ];

  const requiredFields = [
    { eventname: "Event name" },
    { date: "Date" },
    { localtime: "Local time" },
    { country: "Country" },
    { city: "City" },
    { type: "Type" },
    { active: "Active" },
    { on_offline: "Online/Offline" },
    { organizerId: "Organizer Id" },
    { gen_invnum: "Number of invitations" },
    { gen_invtitle: "Invitation title" },
    { gen_invlimit: "Limit in one hands" },
    { gen_invvalt: "$VALT" },
    { vip_invnum: "Number of invitations" },
    { vip_invtitle: "Invitation title" },
    { vip_invlimit: "Limit in one hands" },
    { vip_invvalt: "$VALT" },
    { vipb_invnum: "Number of invitations" },
    { vipb_invtitle: "Invitation title" },
    { vipb_invlimit: "Limit in one hands" },
    { vipb_invvalt: "$VALT" },
    { offerdate: "End of offer date" },
    { offerlocaltime: "Local time" },
  ];

  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    async function getEventByID() {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getevent/${id}`)
        .then((res) => {
          setFormData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    async function getAllOrganizers() {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getallorganizers`)
        .then((res) => {
          setOrganizers(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    id && getEventByID();
    getAllOrganizers();
  }, [id]);

  const validateForm = (): boolean => {
    try {
      requiredFields.forEach((fieldObject) => {
        const [key, value] = Object.entries(fieldObject)[0];
        if (
          Object.keys(formData).includes(key) &&
          !formData[key as keyof EventFormData]
        ) {
          toast.error(`${value} is required`);
          throw new Error("Validation failed");
        }
      });
      console.log("Validation passed");
      return true;
    } catch (error) {
      console.log("Error: Validation failed");
      return false;
    }
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click(); // Programmatically trigger the file input
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    const data = new FormData();
    selectedFile && data.append("avatar", selectedFile);

    let logo;
    if (selectedFile) {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        logo = res.data.logo;
      } catch (err) {
        console.error("Error upload event:", err);
      }
    }

    const method = id ? "put" : "post";
    const url = id
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/update_event/${id}`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/addevent`;
    const newdata = { ...formData, logo: logo };

    try {
      const res = await axios({
        method,
        url,
        data: newdata,
        headers: { "Content-Type": "application/json" },
      });

      !id
        ? toast.success("Success! Event Added. 🎉")
        : toast.success("Success! Event Updated. 🎉");

      setFormData(newdata);
      !id && setTimeout(() => router.push("/admin"), 1000);
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  const handleCancel = async (e: any) => {
    router.push("/admin");
  };

  //   const  handleInvitationChange = (index: number, field: keyof Invitation) => (event: ChangeEvent<HTMLInputElement>) => {
  //     // const newInvitations = formData.invitations.map((invitation, i) => {
  //     //   if (i === index) {
  //     //     return { ...invitation, [field]: event.target.value };
  //     //   }
  //     //   return invitation;
  //     // });
  //     // setFormData(prevState => ({
  //     //   ...prevState,
  //     //   invitations: newInvitations
  //     // }));
  //   };

  return (
    <div className="flex w-full py-6 xs:py-0">
      <div className="flex flex-col w-full bg-darkDarkColor rounded-md p-10 sm:px-4">
        <div className="flex w-full justify-center items-center">
          <p className="text-[36px] sm:text-[28px] xs:text-[20px] leading-[24px] font-Poppins text-whiteTextColor">
            {vtype !== "view"
              ? vtype !== "edit"
                ? "Add Event"
                : "Update Event"
              : "View Event"}
          </p>
        </div>
        <div className="flex flex-col lg:px-[104px] lg:pt-[65px] ">
          <div className="flex sm:flex-col py-10 justify-center items-center gap-8">
            <div className="flex justify-center w-[256px] sm:w-full pr-15">
              <div className="w-[200px] h-[200px] p-5 border-dashed border-greenColor border-2 rounded-[12px] bg-transparent justify-end">
                {!selectedFile && (
                  <div className="relative w-full h-full flex flex-col justify-center items-center">
                    {formData.logo ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${formData.logo}`}
                        width={160}
                        height={160}
                        alt="Image Upload"
                        className="w-full h-full max-w-40 max-h-40 object-cover rounded-md border"
                        loading="eager"
                      ></Image>
                    ) : (
                      <p>160 x 160</p>
                    )}
                    {vtype != "view" && (
                      <button
                        onClick={handleFileInputClick}
                        className={`absolute bg-red-500 text-white xs:text-[14px] px-3 py-1 rounded-md hover:bg-red-600 bottom-[-40px]`}
                      >
                        File Upload
                      </button>
                    )}
                  </div>
                )}
                {selectedFile && (
                  <div className="relative flex flex-col justify-center items-center">
                    {preview && (
                      <Image
                        src={preview}
                        width={196}
                        height={196}
                        alt="Image Upload"
                        className="w-full h-full max-w-40 max-h-40 object-cover rounded-md border"
                        loading="eager"
                      ></Image>
                    )}
                    <button
                      onClick={handleRemoveFile}
                      className="absolute bottom-[-40px] bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                ></input>
              </div>
            </div>
            <div className="flex flex-col w-full gap-8">
              <div className="flex flex-col gap-3">
                <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                  Event name
                </p>
                <input
                  type="text"
                  name="eventname"
                  value={formData.eventname}
                  onChange={handleChange}
                  className="px-4 text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] font-Poppins text-whiteTextColor h-12 w-full flex ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent"
                  readOnly={vtype === "view" ? true : false}
                />
              </div>
              <div className="flex flex-row sm:flex-col gap-8">
                <div className="flex flex-col w-full gap-3">
                  <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                    Date
                  </p>
                  <input
                    type="date"
                    name="date"
                    placeholder="Date"
                    className="h-12 w-full px-5 invert text-[#1b1b1b] text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] ring-2 ring-inset ring-[#a74282] items-center rounded-[12px] bg-transparent"
                    value={formData.date}
                    onChange={handleChange}
                    readOnly={vtype === "view" ? true : false}
                  />
                </div>
                <div className="flex flex-col w-full gap-3">
                  <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                    Local time
                  </p>
                  <input
                    type="time"
                    name="localtime"
                    placeholder="Local time"
                    className="h-12 w-full px-5 invert text-[#1b1b1b] text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] ring-2 ring-inset ring-[#a74282] items-center rounded-[12px] bg-transparent"
                    value={formData.localtime}
                    onChange={handleChange}
                    readOnly={vtype === "view" ? true : false}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-col justify-center items-center gap-8">
            <div className="grid grid-flow-row w-full gap-8 grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col w-full gap-3">
                <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                  Country
                </p>
                <input
                  type="text"
                  placeholder=""
                  name="country"
                  className="h-12 w-full px-5 text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] flex appearance-none ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent"
                  value={formData.country}
                  onChange={handleChange}
                  readOnly={vtype === "view" ? true : false}
                />
              </div>
              <div className="flex flex-col sm:w-full gap-3">
                <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                  City
                </p>
                <input
                  type="text"
                  placeholder=""
                  name="city"
                  className="h-12 w-full px-5 text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] flex appearance-none ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent"
                  value={formData.city}
                  onChange={handleChange}
                  readOnly={vtype === "view" ? true : false}
                />
              </div>
              <div className="flex flex-col sm:w-full gap-3">
                <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                  WWW
                </p>
                <input
                  type="text"
                  name="www"
                  placeholder="www"
                  className="h-12 px-5 text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] w-full flex ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent"
                  value={formData.www}
                  onChange={handleChange}
                  readOnly={vtype === "view" ? true : false}
                />
              </div>
              <div className="relative flex flex-col sm:w-full gap-3">
                <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                  Type
                </p>
                <select
                  name="type"
                  value={formData.type}
                  className="h-12 w-full pl-5 text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] flex appearance-none pr-[50px] ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent"
                  onChange={handleChange}
                  disabled={vtype === "view" ? true : false}
                >
                  {arrType.map((type, index) => {
                    return (
                      <option
                        key={index}
                        value={type}
                        className="text-grayTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] bg-transparent"
                      >
                        {type}
                      </option>
                    );
                  })}
                </select>
                <div className="absolute pt-10 h-full pointer-events-none inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.2071 9.79289C15.8166 9.40237 15.1834 9.40237 14.7929 9.79289L12 12.5858L9.20711 9.79289C8.81658 9.40237 8.18342 9.40237 7.79289 9.79289C7.40237 10.1834 7.40237 10.8166 7.79289 11.2071L11.2929 14.7071C11.6834 15.0976 12.3166 15.0976 12.7071 14.7071L16.2071 11.2071C16.5976 10.8166 16.5976 10.1834 16.2071 9.79289Z"
                      fill="#FCFCFD"
                    />
                  </svg>
                </div>
              </div>
              <div className="relative flex flex-col sm:w-full gap-3">
                <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                  Active
                </p>
                <select
                  name="active"
                  value={formData.active}
                  className="h-12 w-full px-5 text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] flex appearance-none ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent"
                  onChange={handleChange}
                  disabled={vtype === "view" ? true : false}
                >
                  <option
                    value="Active"
                    selected
                    className="text-grayTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px]"
                  >
                    Active
                  </option>
                  <option
                    value="Inactive"
                    className="text-grayTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px]"
                  >
                    Inactive
                  </option>
                </select>
                <div className="absolute pt-10 h-full pointer-events-none inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.2071 9.79289C15.8166 9.40237 15.1834 9.40237 14.7929 9.79289L12 12.5858L9.20711 9.79289C8.81658 9.40237 8.18342 9.40237 7.79289 9.79289C7.40237 10.1834 7.40237 10.8166 7.79289 11.2071L11.2929 14.7071C11.6834 15.0976 12.3166 15.0976 12.7071 14.7071L16.2071 11.2071C16.5976 10.8166 16.5976 10.1834 16.2071 9.79289Z"
                      fill="#FCFCFD"
                    />
                  </svg>
                </div>
              </div>
              <div className="relative flex flex-col sm:w-full gap-3">
                <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                  Online/Offline
                </p>
                <select
                  name="on_offline"
                  value={formData.on_offline}
                  className="bg-transparent h-12 w-full px-5 text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] flex appearance-none ring-2 ring-inset ring-greenColor items-center rounded-[12px]"
                  onChange={handleChange}
                  disabled={vtype === "view" ? true : false}
                >
                  <option
                    value="Online"
                    selected
                    className="text-grayTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] bg-transparent"
                  >
                    Online
                  </option>
                  <option
                    value="Offline"
                    className="text-grayTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] bg-transparent"
                  >
                    Offline
                  </option>
                </select>
                <div className="absolute pt-10 h-full pointer-events-none inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.2071 9.79289C15.8166 9.40237 15.1834 9.40237 14.7929 9.79289L12 12.5858L9.20711 9.79289C8.81658 9.40237 8.18342 9.40237 7.79289 9.79289C7.40237 10.1834 7.40237 10.8166 7.79289 11.2071L11.2929 14.7071C11.6834 15.0976 12.3166 15.0976 12.7071 14.7071L16.2071 11.2071C16.5976 10.8166 16.5976 10.1834 16.2071 9.79289Z"
                      fill="#FCFCFD"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full gap-8 py-8">
            <div className="flex flex-col w-full gap-3">
              <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                Link
              </p>
              <input
                type="text"
                name="link"
                placeholder="Link"
                className="h-12 w-full text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] flex ring-1 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent px-5"
                value={formData.link}
                onChange={handleChange}
                readOnly={vtype === "view" ? true : false}
              />
            </div>
            <div className="relative flex flex-col w-full gap-3">
              <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                Organizer Id
              </p>
              <select
                name="organizerId"
                value={formData.organizerId}
                className="bg-transparent h-12 w-full px-5 text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] flex appearance-none ring-2 ring-inset ring-greenColor items-center rounded-[12px]"
                onChange={handleChange}
                disabled={vtype === "view" ? true : false}
              >
                {!organizers.some(
                  (org) => org.organizerId === formData.organizerId
                ) && (
                  <option value={formData.organizerId} disabled hidden>
                    🚫 Invalid Organizer
                  </option>
                )}
                {organizers
                  .filter((org) => org.active === true)
                  .map((org, index) => {
                    return (
                      <option
                        key={index}
                        value={org.organizerId}
                        className="text-grayTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] bg-transparent"
                      >
                        {org.organizerId}
                      </option>
                    );
                  })}
              </select>
              <div className="absolute pt-10 h-full pointer-events-none inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.2071 9.79289C15.8166 9.40237 15.1834 9.40237 14.7929 9.79289L12 12.5858L9.20711 9.79289C8.81658 9.40237 8.18342 9.40237 7.79289 9.79289C7.40237 10.1834 7.40237 10.8166 7.79289 11.2071L11.2929 14.7071C11.6834 15.0976 12.3166 15.0976 12.7071 14.7071L16.2071 11.2071C16.5976 10.8166 16.5976 10.1834 16.2071 9.79289Z"
                    fill="#FCFCFD"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col w-full gap-3">
              <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                Description
              </p>
              <textarea
                name="description"
                placeholder="Description"
                className="w-full flex ring-2 ring-inset p-5 ring-greenColor items-center rounded-[12px] bg-transparent text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] h-32"
                value={formData.description}
                onChange={handleChange}
                readOnly={vtype === "view" ? true : false}
              ></textarea>
            </div>
          </div>
          <div className="flex sm:flex-col justify-center items-center">
            <div className="grid grid-flow-row w-full gap-x-8 sm:gap-x-0 gap-y-4 grid-cols-10 sm:grid-cols-1">
              <div className="flex flex-col col-span-4 md:col-span-2 sm:col-span-10 gap-3">
                <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                  Invitation title
                </p>
                <input
                  type="text"
                  placeholder=""
                  name="gen_invtitle"
                  className="h-12 w-full text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] flex ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent px-5"
                  value={formData.gen_invtitle}
                  onChange={handleChange}
                  readOnly={vtype === "view" ? true : false}
                />
              </div>
              <div className="flex flex-col col-span-3 md:col-span-3 sm:col-span-10 gap-3">
                <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                  Number of invitations
                </p>
                <input
                  type="number"
                  min={1}
                  placeholder=""
                  name="gen_invnum"
                  className="h-12 w-full flex text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent px-5"
                  value={formData.gen_invnum}
                  onChange={handleChange}
                  readOnly={vtype === "view" ? true : false}
                />
              </div>
              <div className="flex flex-col col-span-2 md:col-span-3 sm:col-span-10 gap-3">
                <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                  Limit in one hands
                </p>
                <input
                  type="number"
                  min={1}
                  placeholder=""
                  name="gen_invlimit"
                  className="h-12 w-full flex text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent px-5"
                  value={formData.gen_invlimit}
                  onChange={handleChange}
                  readOnly={vtype === "view" ? true : false}
                />
              </div>
              <div className="flex flex-col col-span-1 md:col-span-2 sm:col-span-10 gap-3">
                <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                  $VALT
                </p>
                <input
                  type="number"
                  min={1}
                  placeholder=""
                  name="gen_invvalt"
                  className="h-12 w-full text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] flex ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent px-5"
                  value={formData.gen_invvalt}
                  onChange={handleChange}
                  readOnly={vtype === "view" ? true : false}
                />
              </div>
              <div className="flex flex-col col-span-4 md:col-span-2 sm:col-span-10 gap-3">
                <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor lg:hidden md:hidden">
                  Invitation title
                </p>
                <input
                  type="text"
                  placeholder=""
                  name="vip_invtitle"
                  className="h-12 w-full text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] flex ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent px-5"
                  value={formData.vip_invtitle}
                  onChange={handleChange}
                  readOnly={vtype === "view" ? true : false}
                />
              </div>
              <div className="flex flex-col col-span-3 md:col-span-3 sm:col-span-10 gap-3">
                <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor lg:hidden md:hidden">
                  Number of invitations
                </p>
                <input
                  type="number"
                  min={1}
                  placeholder=""
                  name="vip_invnum"
                  className="h-12 w-full flex text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent px-5"
                  value={formData.vip_invnum}
                  onChange={handleChange}
                  readOnly={vtype === "view" ? true : false}
                />
              </div>
              <div className="flex flex-col col-span-2 md:col-span-3 sm:col-span-10 gap-3">
                <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor lg:hidden md:hidden">
                  Limit in one hands
                </p>
                <input
                  type="number"
                  min={1}
                  placeholder=""
                  name="vip_invlimit"
                  className="h-12 w-full flex text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent px-5"
                  value={formData.vip_invlimit}
                  onChange={handleChange}
                  readOnly={vtype === "view" ? true : false}
                />
              </div>
              <div className="flex flex-col col-span-1 md:col-span-2 sm:col-span-10 gap-3">
                <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor lg:hidden md:hidden">
                  $VALT
                </p>
                <input
                  type="number"
                  min={1}
                  placeholder=""
                  name="vip_invvalt"
                  className="h-12 w-full text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] flex ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent px-5"
                  value={formData.vip_invvalt}
                  onChange={handleChange}
                  readOnly={vtype === "view" ? true : false}
                />
              </div>
              <div className="flex flex-col col-span-4 md:col-span-2 sm:col-span-10 gap-3">
                <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor lg:hidden md:hidden">
                  Invitation title
                </p>
                <input
                  type="text"
                  placeholder=""
                  name="vipb_invtitle"
                  className="h-12 w-full text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] flex ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent px-5"
                  value={formData.vipb_invtitle}
                  onChange={handleChange}
                  readOnly={vtype === "view" ? true : false}
                />
              </div>
              <div className="flex flex-col col-span-3 md:col-span-3 sm:col-span-10 gap-3">
                <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor lg:hidden md:hidden">
                  Number of invitations
                </p>
                <input
                  type="number"
                  min={1}
                  placeholder=""
                  name="vipb_invnum"
                  className="h-12 w-full flex text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent px-5"
                  value={formData.vipb_invnum}
                  onChange={handleChange}
                  readOnly={vtype === "view" ? true : false}
                />
              </div>
              <div className="flex flex-col col-span-2 md:col-span-3 sm:col-span-10 gap-3">
                <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor lg:hidden md:hidden">
                  Limit in one hands
                </p>
                <input
                  type="number"
                  min={1}
                  placeholder=""
                  name="vipb_invlimit"
                  className="h-12 w-full flex text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent px-5"
                  value={formData.vipb_invlimit}
                  onChange={handleChange}
                  readOnly={vtype === "view" ? true : false}
                />
              </div>
              <div className="flex flex-col col-span-1 md:col-span-2 sm:col-span-10 gap-3">
                <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor lg:hidden md:hidden">
                  $VALT
                </p>
                <input
                  type="number"
                  min={1}
                  placeholder=""
                  name="vipb_invvalt"
                  className="h-12 w-full text-whiteTextColor text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] flex ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent px-5"
                  value={formData.vipb_invvalt}
                  onChange={handleChange}
                  readOnly={vtype === "view" ? true : false}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row sm:flex-col justify-center items-center w-full gap-8 py-8">
            <div className="flex flex-col w-full gap-3">
              <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                End of offer date
              </p>
              <input
                type="date"
                name="offerdate"
                placeholder="End of offer date"
                className="h-12 w-full px-5 invert text-[#1b1b1b] text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] ring-2 ring-inset ring-[#a74282] items-center rounded-[12px] bg-transparent"
                value={formData.offerdate}
                onChange={handleChange}
                readOnly={vtype === "view" ? true : false}
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                Local time
              </p>
              <input
                type="time"
                name="offerlocaltime"
                placeholder="Local time"
                className="h-12 w-full px-5 invert text-[#1b1b1b] text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] ring-2 ring-inset ring-[#a74282] items-center rounded-[12px] bg-transparent"
                value={formData.offerlocaltime}
                onChange={handleChange}
                readOnly={vtype === "view" ? true : false}
              />
            </div>
            <div className="flex flex-col w-full gap-3"></div>
          </div>
        </div>
        {vtype !== "view" && (
          <div className="flex flex-col justify-center items-center py-4">
            <div className="flex w-full py-4 justify-center items-center">
              <button
                className="w-[184px] py-4 px-6 xs:px-2 rounded-[90px] bg-greenColor flex justify-center items-center text-[16px] font-bold color-dark hover:bg-[#8ed6a9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6e6d2]"
                onClick={handleSubmit}
              >
                {vtype !== "edit" ? "Add Event" : "Update Event"}
              </button>
            </div>
            <div className="flex w-full py-4 justify-center items-center">
              <button
                className="w-[184px] py-4 px-6 xs:px-2 rounded-[90px] bg-transparent flex justify-center items-center text-[16px] font-bold text-grayTextColor hover:bg-[#252b3b] active:bg-[#232e3b]"
                onClick={handleCancel}
              >
                CANCEL
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddEvents;
