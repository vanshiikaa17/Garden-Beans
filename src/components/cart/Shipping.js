import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { MetaData } from "../layout/MetaData";
import { BsFillTelephoneFill, BsFillHouseFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { FaGlobeAmericas ,FaCity} from "react-icons/fa";
import { Country, State } from "country-state-city";
import "./shipping.css";
import { ActiveSteps } from "./ActiveSteps";
import { saveShippingInfo } from "../../actions/cartActions";
import { useNavigate } from "react-router-dom";

export const Shipping = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);
  const [city, setCity] = useState(shippingInfo.city);
  const [pincode, setPincode] = useState(shippingInfo.pincode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [address, setAddress] = useState(shippingInfo.address);

    const nav=useNavigate();

  const shippingDetailsSubmitForm = (e) => {
    e.preventDefault();

    if(phoneNo.length< 10 || phoneNo.length> 10){
        alert.error("Please enter a 10 digit valid pgone no.")
        return;
    }
    dispatch(saveShippingInfo({address, country, state, city, pincode, phoneNo}));
    nav("/order/confirm");
  };
  return (
    <>
      <MetaData title="Garden Beans - Shipping Details" />

      <ActiveSteps activeStep={0} />

      <div className="shippingDetailsContainer">
        <div className="shippingDetailsBox">
          <h2>Shipping Details</h2>
          <form
            className="shippingDetailsForm"
            onSubmit={shippingDetailsSubmitForm}
          >
            <div className="inputFields">
              <BsFillTelephoneFill />
              <input
                className="shippingDetailsInput"
                type="number"
                placeholder="Phone Number"
                value={phoneNo}
                required
                name="phoneNo"
                onChange={(e) => {
                  setPhoneNo(e.target.value);
                }}
              />
            </div>

            <div className="inputFields">
              <BsFillHouseFill />
              <input
                className="shippingDetailsInput"
                type="text"
                placeholder="Address"
                value={address}
                required
                name="address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>

            <div className="inputFields">
              <FaCity />
              <input
                className="shippingDetailsInput"
                type="text"
                placeholder="city"
                value={city}
                required
                name="city"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
            <div className="inputFields">
              <MdLocationOn />
              <input
                className="shippingDetailsInput"
                type="number"
                placeholder="pincode"
                value={pincode}
                required
                name="pincode"
                onChange={(e) => {
                  setPincode(e.target.value);
                }}
              />
            </div>
            <div className="inputFields">
              <FaGlobeAmericas />
              <select
              className="shippingDetailsInput"
                required
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            
            {country && (
                <div className="inputFields">
                    <FaCity />

                    <select
                    className="shippingDetailsInput"
                    required
                    value={state}
                    onChange={(e)=>setState(e.target.value)}>
                        <option value="">State</option>
                        {State &&
                            State.getStatesOfCountry(country).map((item)=>(
                                <option value={item.isoCode} key={item.isoCode}>
                                    {item.name}
                                </option>
                            ))
                            
                        }
                    </select>

                </div>
            )}

            <input
              type="submit"
              value="Confirm"
              className="shippingDetailsButton"
              disabled={state? false: true}
            />
          </form>
        </div>
      </div>
    </>
  );
};
