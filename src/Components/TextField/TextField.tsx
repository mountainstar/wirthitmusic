import { TextField as MuiTextField } from "@mui/material";
import { styled } from '@mui/material/styles';




const TextField= styled(MuiTextField)({
    margin: '1.5rem 0',
    "& .MuiInputBase-root": {
        backgroundColor: "rgba(255,255,255,0.4)"
    }
});

export default TextField;