import * as React from "react";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";


dayjs.extend(isSameOrBefore);

export default function DateRangePicker({ fromValue, toValue, onFromChange, onToChange }) {

    const [currentlyStudying, setCurrentlyStudying] = React.useState(false);


    return (
        
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={["DatePicker", "DatePicker"]}>

                {/* FROM */}
                <DatePicker
                    label="From"
                    views={["year", "month"]}
                    format="MM YYYY"
                    value={fromValue}
                    onChange={onFromChange}
                />

                {/* TO */}
                <DatePicker
                    label="To"
                    views={["year", "month"]}
                    format="MM YYYY"
                    value={toValue}
                    minDate={fromValue}
                    onChange={onToChange}
                    disabled={currentlyStudying}
                />

            </DemoContainer>

        </LocalizationProvider>
    );
}
