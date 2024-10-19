"use client"
import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

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

  const [cities, setCities] = useState([]);

  const [processing, setProcessing] = useState(false);

  const handleStateOptionClick = (option) => {
    setSelectedState(option);
    setIsStateOpen(false);
    setCities(stateCityData[option]);
    setSelectedCity("Select City");
  };

  const handleCityOptionClick = (option) => {
    setSelectedCity(option);
    setIsCityOpen(false);
  };

  return (
    <div className='w-full'>
      <div className='px-5 max-sm:px-1 text-center font-bold text-4xl maintxt max-sm:text-2xl '>Start a new trip !</div>
      <div className='w-full max-lg:flex-col flex gap-5 px-5 max-sm:px-1 mt-5'>
        <div className='w-1/2 max-lg:w-full px-4 max-sm:px-1 h-full flex flex-col gap-10  max-sm:gap-5'>
          <div className='flex w-full gap-10 max-lg:gap-2 max-sm:flex-col '>

            <div className="relative inline-block w-full">
              <div className='text-[#000000bb] text-lg font-bold max-sm:text-[16px] '>From: Select State</div>
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
              <div className='text-[#000000bb] text-lg font-bold max-sm:text-[16px]'>From: Select City</div>

              <button
                onClick={() => setIsCityOpen(!isCityOpen)}
                className={`w-full max-sm:text-[16px] pr-10 items-center border-2 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] text-white text-md font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out relative ${!selectedState || selectedState === "Select State" ? "cursor-not-allowed opacity-50" : ""
                  }`}
                disabled={!selectedState || selectedState === "Select State"}
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
          </div>

          <form>
            <div className="">
              <label className="block text-[#000000bb] text-lg font-bold " htmlFor="destination">
                Pick-up Point
              </label>
              <input
                className={`border-2 border-[#00000063] text-md bg-[#ffffff35] font-medium text-[#000000d4] appearance-none rounded-lg w-full h-[50px] px-3 leading-tight outline-none focus:outline-2 focus:outline-[#ffffff] placeholder:text-[#00000078] ${!selectedCity || !selectedState || selectedState === "Select State" || selectedCity === "Select City" ? "cursor-not-allowed opacity-50" : ""
                  }`}
                id="pickup"
                type="text"
                placeholder="Enter your pick-up address"
                disabled={!selectedCity || !selectedState || selectedState === "Select State" || selectedCity === "Select City"}
              />
            </div>
          </form>
          <div className='flex w-full gap-10 max-lg:gap-2 max-sm:flex-col '>

            <div className="relative inline-block w-full">
              <div className='text-[#000000bb] text-lg font-bold max-sm:text-[16px] '>To: Select State</div>
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
              <div className='text-[#000000bb] text-lg font-bold max-sm:text-[16px]'>To: Select City</div>

              <button
                onClick={() => setIsCityOpen(!isCityOpen)}
                className={`w-full max-sm:text-[16px] pr-10 items-center border-2 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] text-white text-md font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out relative ${!selectedState || selectedState === "Select State" ? "cursor-not-allowed opacity-50" : ""
                  }`}
                disabled={!selectedState || selectedState === "Select State"}
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
            
          </div>
          <form>
            <div className="">
              <label className="block text-[#000000bb] text-lg font-bold " htmlFor="destination">
                Destination
              </label>
              <input
                className={`border-2 border-[#00000063] text-md bg-[#ffffff35] font-medium text-[#000000d4] appearance-none rounded-lg w-full h-[50px] px-3 leading-tight outline-none focus:outline-2 focus:outline-[#ffffff] placeholder:text-[#00000078] ${!selectedCity || !selectedState || selectedState === "Select State" || selectedCity === "Select City" ? "cursor-not-allowed opacity-50" : ""
                  }`}
                id="destination"
                type="text"
                placeholder="Enter your destination"
                disabled={!selectedCity || !selectedState || selectedState === "Select State" || selectedCity === "Select City"}
              />
            </div>
          </form>
          <button
            onClick={() => setProcessing(true)}
            className='w-full  items-center border-2 bg-gradient-to-r from-[#0ab9cf] to-[#3581d8] smooth hover:text-[#000000be] btnshad text-white text-md font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out'>Find Drivers</button>
          <div className='w-1/2'></div>

          {/* <div className={`${processing ? "block" : "hidden"}`}>
            <div className=''></div>
          </div> */}
          

        </div>

        <div className='w-1/2 max-lg:w-full h-[500px] flex items-center justify-center  border-2 rounded-md border-[#0000008d]'>
        <div className={`${processing ? "flex" : "hidden"} flex-col items-center`}>
            <div className="loader mb-4  ">
              <div className="w-12 h-12 border-gradient-animate animate-spin"></div>
            </div>
            <h2 className="text-[#000000be] text-xl font-bold">Processing...</h2>
            <p className="text-[#000000be] text-md mt-2 font-semibold">Please wait a moment.</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Display
