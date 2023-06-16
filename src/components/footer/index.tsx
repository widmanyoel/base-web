import { Box, Link, Typography } from "@mui/material";

function Footer() {
    return (
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
                <Typography variant="body2" color="text.secondary" align="center">
                    {"Copyright © "}
                    <Link color="inherit" href="">
                        Ruwaytech
                    </Link>{" "}
                    {new Date().getFullYear()}
                    {"."}
                </Typography>
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
            >
                Dessarrollo de sistemas empresariales
            </Typography>
        </Box>

    );
}
export default Footer;