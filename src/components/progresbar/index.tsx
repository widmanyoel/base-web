import { Box, CircularProgress} from "@mui/material";

function ProgresBar() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </Box>

    );
}
export default ProgresBar;