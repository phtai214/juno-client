import React, { useState, useEffect } from "react";
import Select from "react-select";

const genderOptions = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" }
];

export const MySelect = ({ value, onChange }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (value) {
            const option = genderOptions.find((option) => option.value === value);
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

    return (
        <Select
            className="gender-select"
            options={genderOptions}
            value={selectedOption}
            onChange={handleChange}
        />
    );
};