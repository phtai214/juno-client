import React, { useState, useEffect } from "react";
import Select from "react-select";


const genderOptions = [
    { value: "pending", label: "pending" },
    { value: "completed", label: "completed" },
    { value: "cancelled", label: "cancelled" },
    { value: "shipping", label: "shipping" }
];

const BookingSelect = ({ value, onChange }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (value) {
            const option = genderOptions.find(option => option.value === value);
            setSelectedOption(option || null);
        } else {
            setSelectedOption(null);
        }
    }, [value]);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        if (selectedOption) {
            onChange(selectedOption.value);
        } else {
            onChange("");
        }
    };

    const customStyles = {
        option: (provided) => ({
            ...provided,
            color: "black",
        })
    };

    return (
        <Select
            className="gender-select"
            options={genderOptions}
            value={selectedOption}
            onChange={handleChange}
            styles={customStyles}
        />
    );
};

export default BookingSelect;