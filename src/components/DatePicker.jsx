import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const BasicDatePicker = ({ selectedDate, onDateChange }) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker
                    label="Basic date picker"
                    value={selectedDate} // Pass the selected date as value
                    onChange={onDateChange} // Handle date change
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
export default BasicDatePicker;