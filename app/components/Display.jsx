"use client";
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

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

const Display = () => {
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("Select State");
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Select nearest City");
  const [date, setDate] = useState("");
  const [isCityOpen2, setIsCityOpen2] = useState(false);
  const [selectedCity2, setSelectedCity2] = useState("Select nearest City");
  const [matches, setMatches] = useState([]);
  const [cities, setCities] = useState([]);
  const [processing, setProcessing] = useState(false);

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

  const handleSubmit = async () => {
    setProcessing(true);
    const detail = await fetch("/api/getdata", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date, form: selectedCity, to: selectedCity2 }), // corrected "to" field
    });
    const response = await detail.json();
    setMatches(response.trips);
    
    setProcessing(false); 
  };

  return (
    <div className='w-full'>
      <div className='px-5 max-sm:px-1 text-center font-bold text-4xl maintxt max-sm:text-2xl'>
        Start a new trip!
        <button className="h-[10%] w-[20%] text-xl rounded-2xl text-black font-bold">See orders</button>
        <button className="h-[10%] w-[20%] text-xl rounded-2xl text-black font-bold">See existing trips</button>
      </div>
      <div className='w-full max-lg:flex-col flex gap-5 px-5 max-sm:px-1 mt-5'>
        <div className='w-1/2 max-lg:w-full px-4 max-sm:px-1 h-full flex flex-col gap-10 max-sm:gap-5'>
          <div className='flex w-full gap-10 max-lg:gap-2 max-sm:flex-col'>
            <div className="relative inline-block w-full">
              <div className='text-[#000000bb] text-lg font-bold max-sm:text-[16px]'>Select State</div>
              <button
                onClick={() => setIsStateOpen(!isStateOpen)}
                className="w-full pr-10 max-sm:text-[15px] max-sm:pr-5 max-sm:px-1 items-center border-2 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] text-white text-md font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out relative"
              >
                {selectedState}
                <FaChevronDown className={`absolute inset-y-0 right-4 flex items-center text-white text-md transform transition-transform duration-300 ${isStateOpen ? "rotate-180" : "rotate-0"}`} />
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
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className='w-full pr-10 max-sm:text-[15px] max-sm:pr-5 max-sm:px-1 items-center border-2 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] text-white text-md font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out'
              />
            </div>
          </div>
          <div className='flex w-full gap-10 max-lg:gap-2 max-sm:flex-col'>
            <div className="relative inline-block w-full">
              <div className='text-[#000000bb] text-lg font-bold max-sm:text-[16px]'>From</div>
              <button
                onClick={() => setIsCityOpen(!isCityOpen)}
                className={`w-full max-sm:text-[16px] pr-10 items-center border-2 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] text-white text-md font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out relative ${!selectedState || selectedState === "Select State" ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={!selectedState}
              >
                {selectedCity}
                <FaChevronDown className={`absolute inset-y-0 right-4 flex items-center text-white text-md transform transition-transform duration-300 ${isCityOpen ? "rotate-180" : "rotate-0"}`} />
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
                className={`w-full max-sm:text-[16px] pr-10 items-center border-2 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] text-white text-md font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out relative ${!selectedState || selectedState === "Select State" ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={!selectedState || selectedState === "Select State"}
              >
                {selectedCity2}
                <FaChevronDown className={`absolute inset-y-0 right-4 flex items-center text-white text-md transform transition-transform duration-300 ${isCityOpen2 ? "rotate-180" : "rotate-0"}`} />
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
          <button
            onClick={handleSubmit}
            className='w-full items-center border-2 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] smooth hover:text-[#000000be] btnshad text-white text-md font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out'
          >
            Find Drivers
          </button>
        </div>

        {processing ? (
          <div className='w-1/2 max-lg:w-full h-[500px] flex items-center justify-center border-2 rounded-md border-[#0000008d]'>
            <div className="flex flex-col items-center">
              <div className="loader mb-4">
                <div className="w-12 h-12 border-gradient-animate animate-spin"></div>
              </div>
              <h2 className="text-[#000000be] text-xl font-bold">Processing...</h2>
              <p className="text-[#000000be] text-md mt-2 font-semibold">Please wait a moment.</p>
            </div>
          </div>
        ) : (
          <div className='trips-list'>
            <div className='text-center text-2xl font-bold'>Trips</div>
            {matches.length > 0 ? (
              <ul className='mt-5'>
                {matches.map(trip => (
                  <li key={trip.id} className="flex justify-between items-center border-b py-2">
                    <div>
                      <h3>On {trip.date} - Cost {trip.cost}</h3>
                      <p>{trip.form} to {trip.to}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No trips available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Display;
