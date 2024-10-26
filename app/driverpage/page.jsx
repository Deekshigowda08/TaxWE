"use client"
import Navbar from "../components/Navbar";
import UserComp from "../components/UserComp";
import { useEffect, useState } from "react";
import { FaChevronDown } from 'react-icons/fa'
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form"
import { Suspense } from 'react';


const stateCityData = {
    "Andhra Pradesh": ["Amaravati", "Visakhapatnam", "Vijayawada"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat"],
    "Assam": ["Dispur", "Guwahati", "Dibrugarh"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur"],
    "Chhattisgarh": ["Raipur", "Bilaspur", "Durg"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama"],
    "Gujarat": ["Gandhinagar", "Ahmedabad", "Surat"],
    "Haryana": ["Chandigarh", "Faridabad", "Gurugram"],
    "Himachal Pradesh": ["Shimla", "Dharamshala", "Kullu"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangalore"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Manipur": ["Imphal", "Thoubal", "Churachandpur"],
    "Meghalaya": ["Shillong", "Tura", "Jowai"],
    "Mizoram": ["Aizawl", "Lunglei", "Saiha"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
    "Punjab": ["Chandigarh", "Ludhiana", "Amritsar"],
    "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur"],
    "Sikkim": ["Gangtok", "Namchi", "Mangan"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
    "Tripura": ["Agartala", "Udaipur", "Belonia"],
    "Uttar Pradesh": ["Lucknow", "Noida", "Varanasi"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Nainital"],
    "West Bengal": ["Kolkata", "Siliguri", "Durgapur"],
};
 function Searchbar() {
    const [order, setorder] = useState(false)

    const displaytrips = () => {
        setFound(true);
        setorder(false);
    }
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [id, setId] = useState("")
    const token = (typeof window !== "undefined" && localStorage) ? localStorage.getItem('drivertoken') : "";

    useEffect(() => {
        try {
            if (token) {
              const decoded = jwtDecode(token);
              setUsername(decoded.username);
              setEmail(decoded.email);
              setId(decoded.objectid);
            } else {
              window.location.replace(`/`);
            }
          } catch (error) {
            console.error("Token decoding failed:", error);
            window.location.replace(`/`);
          }
        }, [token]);
    const handlereject = async (userid) => {
        await fetch("/api/cancelbydriver", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: userid, userid: id })
        })
        setTimeout(() => {
            window.location.reload()
        }, 500);
    }
    const handleapprove = async (userid) => {
        await fetch("/api/approval", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: userid, userid: id })
        })
        setTimeout(() => {
            window.location.reload()
        }, 500);
    }
    const [isStateOpen, setIsStateOpen] = useState(false);
    const [selectedState, setSelectedState] = useState("Select State");

    const [isCityOpen, setIsCityOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState("Select nearest City");

    const [isCityOpen2, setIsCityOpen2] = useState(false);
    const [selectedCity2, setSelectedCity2] = useState("Select nearest City");

    const [cities, setCities] = useState([]);

    const [processing, setProcessing] = useState(false);
    const [trips, setTrips] = useState([]);
    const [found, setFound] = useState(false)
    useEffect(() => {
        setFound(true)
    }, [trips])

    const fetchTrips = async () => {

        const response = await fetch("/api/trips", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        console.log(response);

        const data = await response.json();
        setTrips(data.trips);
        console.log(data.trips)


    };
    const handleDelete = async (tripId) => {
        const response = await fetch("/api/trips", {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        const result = await response.json();
        if (result.success) {
            toast("Travel deleted successfully");
            fetchTrips();
            setTimeout(() => {
                window.location.reload()
            }, 500);
        } else {
            toast.error(result.error);
        }
    };

    useEffect(() => {
        if (id) {
            console.log("ID:", id);
            fetchTrips();
        } else {
            console.log("ID is empty");
        }
    }, [id]);

    function displayorder() {
        setFound(false);
        setorder(true);
    }

    const handleStateOptionClick = (option) => {
        setSelectedState(option);
        setIsStateOpen(false);
        setCities(stateCityData[option]);
    };

    const handleCityOptionClick = (option) => {
        setSelectedCity(option);
        setIsCityOpen(false);
    };
    const handleCityOptionClick2 = (option) => {
        setSelectedCity2(option);
        setIsCityOpen2(false);
    };
    const onSubmit = async (data) => {
        const detail = await fetch("/api/listing", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ createdby: id, date: data.date, form: selectedCity, to: selectedCity2, seats: data.seats, avaliblity: data.avalible, cost: data.cost, vehicle: data.vehiclename, vechiclenumber: data.vehiclenumber, contactnumber: data.number })
        })
        const result = await detail.json()
        if (result.success) {
            toast("Travel added successfully");
            setTimeout(() => {
                window.location.reload()
            }, 500);
        }

    }
    return (

        <>
            <Navbar />
            <ToastContainer />
            <UserComp username={username} email={email} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='w-full'>
                    <div className='px-5 max-sm:px-1 text-center font-bold text-4xl justify-between maintxt max-sm:text-2xl '>Add a new trip !  <button onClick={() => displayorder()} className="h-[10%] w-[20%] text-xl rounded-2xl  text-black font-bold">See orders</button> <button onClick={() => displaytrips()} className="h-[10%] w-[20%] text-xl rounded-2xl  text-black font-bold">See existing trips</button></div>
                    <div className='w-full max-lg:flex-col flex gap-5 px-5 max-sm:px-1 mt-5'>
                        <div className='w-1/2 max-lg:w-full px-4 max-sm:px-1 h-full flex flex-col gap-10  max-sm:gap-5'>
                            <div className='flex w-full gap-10 max-lg:gap-2 max-sm:flex-col '>

                                <div className="relative inline-block w-full">
                                    <div className='text-[#000000bb] text-lg font-bold max-sm:text-[16px] '>Select State</div>
                                    <button
                                        onClick={() => setIsStateOpen(!isStateOpen)}
                                        className="w-full pr-10 max-sm:text-[15px] max-sm:pr-5 max-sm:px-1 items-center border-2 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] text-white text-md font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out relative"
                                    >
                                        {selectedState}
                                        <span className="absolute inset-y-0 right-4 flex items-center text-white text-md">
                                            <FaChevronDown
                                                className={`transform transition-transform duration-300 ${isStateOpen ? "rotate-180" : "rotate-0"}`}
                                            />
                                        </span>
                                    </button>

                                    {isStateOpen && (
                                        <ul className="absolute z-10 w-full bg-white selshad rounded-xl mt-2 overflow-auto max-h-40">
                                            {Object.keys(stateCityData).map((state, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleStateOptionClick(state)}
                                                    className="px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#0ab9cf] hover:to-[#3581d8] hover:text-white cursor-pointer"
                                                >
                                                    {state}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="relative inline-block w-full">
                                    <div className='text-[#000000bb] text-lg font-bold max-sm:text-[16px]'>Select Date</div>
                                    <input {...register("date", { required: true })} required className='w-full pr-10 max-sm:text-[15px] max-sm:pr-5 max-sm:px-1 items-center border-2 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] text-white text-md font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out relative"' type="date" />
                                    {errors.date && <span className="text-red-500">Date is required</span>}</div>
                            </div>
                            <div className='flex w-full gap-10 max-lg:gap-2 max-sm:flex-col '>

                                <div className="relative inline-block w-full">
                                    <div className='text-[#000000bb] text-lg font-bold max-sm:text-[16px]'>From</div>

                                    <button
                                        onClick={() => setIsCityOpen(!isCityOpen)}
                                        className={`w-full max-sm:text-[16px] pr-10 items-center border-2 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] text-white text-md font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out relative ${!selectedState || selectedState === "Select State" ? "cursor-not-allowed opacity-50" : ""
                                            }`}
                                        disabled={!selectedState}
                                    >
                                        {selectedCity}
                                        <span className="absolute inset-y-0 right-4 flex items-center text-white text-md">
                                            <FaChevronDown
                                                className={`transform transition-transform duration-300 ${isCityOpen ? "rotate-180" : "rotate-0"}`}
                                            />
                                        </span>
                                    </button>

                                    {isCityOpen && (
                                        <ul className="absolute z-10 w-full bg-white selshad rounded-xl mt-2 overflow-auto max-h-40">
                                            {cities.map((city, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleCityOptionClick(city)}
                                                    className="px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#0ab9cf] hover:to-[#3581d8] hover:text-white cursor-pointer"
                                                >
                                                    {city}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="relative inline-block w-full">
                                    <div className='text-[#000000bb] text-lg font-bold max-sm:text-[16px]'>To</div>

                                    <button
                                        onClick={() => setIsCityOpen2(!isCityOpen2)}
                                        className={`w-full max-sm:text-[16px] pr-10 items-center border-2 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] text-white text-md font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out relative ${!selectedState || selectedState === "Select State" ? "cursor-not-allowed opacity-50" : ""
                                            }`}
                                        disabled={!selectedState || selectedState === "Select State"}
                                    >
                                        {selectedCity2}
                                        <span className="absolute inset-y-0 right-4 flex items-center text-white text-md">
                                            <FaChevronDown
                                                className={`transform transition-transform duration-300 ${isCityOpen2 ? "rotate-180" : "rotate-0"}`}
                                            />
                                        </span>
                                    </button>

                                    {isCityOpen2 && (
                                        <ul className="absolute z-10 w-full bg-white selshad rounded-xl mt-2 overflow-auto max-h-40">
                                            {cities.map((city, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleCityOptionClick2(city)}
                                                    className="px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#0ab9cf] hover:to-[#3581d8] hover:text-white cursor-pointer"
                                                >
                                                    {city}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>


                            </div>
                            <div className='flex w-full gap-10 max-lg:gap-2 max-sm:flex-col '>

                                <div className="relative inline-block w-full">
                                    <div className='text-[#000000bb] text-lg font-bold max-sm:text-[16px] '>Enter number of Seats</div>
                                    <input {...register("seats", { required: true })} required className='w-full pr-10 max-sm:text-[15px] max-sm:pr-5 max-sm:px-1 items-center border-2 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] text-white text-md font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out relative"' type="tel" />
                                    {errors.seats && <span className="text-red-500">seats is required</span>}
                                </div>

                                <div className="relative inline-block w-full">
                                    <div className='text-[#000000bb] text-lg font-bold max-sm:text-[16px] '>Avalibility of Seats</div>
                                    <input {...register("avalible", { required: true })} required className='w-full pr-10 max-sm:text-[15px] max-sm:pr-5 max-sm:px-1 items-center border-2 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] text-white text-md font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out relative"' type="tel" />
                                    {errors.avalible && <span className="text-red-500">Avalibility of Seats is required</span>}
                                </div>
                            </div>
                            <div className='flex w-full gap-10 max-lg:gap-2 max-sm:flex-col '>

                                <div className="relative inline-block w-full">
                                    <div className='text-[#000000bb] text-lg font-bold max-sm:text-[16px] '>Enter the cost of one seat</div>
                                    <input {...register("cost", { required: true })} required className='w-full pr-10 max-sm:text-[15px] max-sm:pr-5 max-sm:px-1 items-center border-2 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] text-white text-md font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out relative"' type="tel" />
                                    {errors.cost && <span className="text-red-500">cost is required</span>}
                                </div>

                                <div className="relative inline-block w-full">
                                    <div className='text-[#000000bb] text-lg font-bold max-sm:text-[16px] '>Contact Number</div>
                                    <input {...register("number", { required: true })} required className='w-full pr-10 max-sm:text-[15px] max-sm:pr-5 max-sm:px-1 items-center border-2 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] text-white text-md font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out relative"' type="tel" />
                                    {errors.number && <span className="text-red-500">Contact Number is required</span>}
                                </div>
                            </div>
                            <div className='flex w-full gap-10 max-lg:gap-2 max-sm:flex-col '>

                                <div className="relative inline-block w-full">
                                    <div className='text-[#000000bb] text-lg font-bold max-sm:text-[16px] '>Vehicle Plate Number</div>
                                    <input {...register("vehiclenumber", { required: true })} required className='w-full pr-10 max-sm:text-[15px] max-sm:pr-5 max-sm:px-1 items-center border-2 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] text-white text-md font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out relative"' type="text" />
                                    {errors.vehiclenumber && <span className="text-red-500">Vehicle Plate Number is required</span>}
                                </div>

                                <div className="relative inline-block w-full">
                                    <div className='text-[#000000bb] text-lg font-bold max-sm:text-[16px] '>Vehicle Name</div>
                                    <input {...register("vehiclename", { required: true })} required className='w-full pr-10 max-sm:text-[15px] max-sm:pr-5 max-sm:px-1 items-center border-2 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] text-white text-md font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out relative"' type="text" />
                                    {errors.vehiclename && <span className="text-red-500">Vehicle Name is required</span>}
                                </div>
                            </div>
                            <button type="submit"
                                onClick={() => setProcessing(true)}
                                className='w-full  items-center border-2 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] smooth hover:text-[#000000be] btnshad text-white text-md font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out'>Add travel</button>
                            <div className='w-1/2'></div>
                        </div>

                        <div className='w-1/2 max-lg:w-full h-[500px] flex items-center justify-center  border-2 rounded-md border-[#0000008d]'>
                            {found && <div className='trips-list'>
                                <ToastContainer />
                                <div className='text-center text-2xl font-bold'>Existing Trips</div>
                                {trips.length > 0 ? (
                                    <ul className='mt-5'>
                                        {trips.map(trip => (
                                            <li key={trip.id} className="flex justify-between items-center border-b py-2">
                                                <div>
                                                    <h3>On {trip.date} -Cost {trip.cost} </h3>
                                                    <p>{trip.form} to {trip.to}</p>
                                                </div>
                                                <div>
                                                    <button onClick={() => handleDelete(trip.id)} className="text-red-500 ml-4">Delete</button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No trips available.</p>
                                )}
                            </div>}
                            {order && <div className='trips-list'>
                                <ToastContainer />
                                <div className='text-center text-2xl font-bold'>Orders</div>

                                {trips.length > 0 ? (
                                    <div className='mt-5'>
                                        {trips.map(trip => (
                                            trip.clients.length > 0 && (
                                                <div key={trip._id}>
                                                    <h3 className="font-bold">Approved Clients for Trip on {trip.date}:</h3>
                                                    <ul>
                                                        {trip.clients
                                                            .filter(client => client.approved) 
                                                            .map(client => (
                                                                <li key={client.client} className="flex justify-between items-center border-b py-2">
                                                                    <div>
                                                                        <h3>Seats: {client.seats}</h3>
                                                                        <p>Pickup point: {client.pickuplocation}</p>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                    </ul>

                                                    
                                                    <h3 className="font-bold mt-4">Unapproved Clients for Trip on {trip.date}:</h3>
                                                    <ul>
                                                        {trip.clients
                                                            .filter(client => !client.approved) 
                                                            .map(client => (
                                                                <li key={client.client} className="flex justify-between items-center border-b py-2">
                                                                    <div>
                                                                        <h3>Seats: {client.seats}</h3>
                                                                        <p>Pickup point: {client.pickuplocation}</p>
                                                                    </div>
                                                                    <div>
                                                                        <button onClick={() => handleapprove(client.client)} className="text-green-500 ml-4">Approve</button>
                                                                        <button onClick={() => handlereject(client.client)} className="text-red-500 ml-4">Reject</button>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                    </ul>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                ) : (
                                    <p>No trips available.</p>
                                )}


                            </div>}
                            {!found && !order && <div className='flex flex-col items-center'>
                                <div className="loader mb-4  ">
                                    <div className="w-12 h-12 border-gradient-animate animate-spin"></div>
                                </div>
                                <h2 className="text-[#000000be] text-xl font-bold">Processing...</h2>
                                <p className="text-[#000000be] text-md mt-2 font-semibold">Please wait a moment.</p>
                            </div>}
                            <br />

                        </div>

                    </div>

                </div>
            </form>
        </>

    );
}
export default function Home() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
    )
  }