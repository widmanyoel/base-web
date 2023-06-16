import {
    Box,
    Button,
    Card,
    CardActionArea,
    Chip,
    CircularProgress,
    Container,
    CssBaseline,
    Divider,
    Fab,
    Grid,
    Link,
    Paper,
    Rating,
    Stack,
    ThemeProvider,
    Typography,
    createTheme
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Header from "../../components/header";
import { useParams } from 'react-router-dom';
import { useDeleteProductsMutation, useDetailProductsQuery } from "../../stateManagement/apiSlices/productApi";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import useStylesProduct from "./Product.Styles";
import ProgresBar from "../../components/progresbar";

const theme = createTheme();
const DetailsProduct: React.FC = () => {
    const styles = useStylesProduct();
    const { id } = useParams<{ id: string }>(); // Especifica que id es una cadena
    const { data, isError, error } = useDetailProductsQuery(id);
    const [isLoading, setIsLoading] = useState(false); // Cambia el valor inicial a false


    const [deleteProduct, { isSuccess }] = useDeleteProductsMutation();

    const handleDeleteProduct = () => {
        deleteProduct({
            id: data.id,
        });
        console.log(data.id);
    };

    if (isError) {
        return <p>Ocurrió un error</p>;
    }
    if (!data) {
        return <ProgresBar/>;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Container fixed className={styles.classes.containerColorDetail} sx={{ py: 8,}}>
                <Grid container spacing={2}>
                    <Grid item xs={5} >
                        <Card
                           className={styles.classes.cardImageDetail}                            
                        >
                            <Typography component="legend">
                                {data.rating.rate} stars
                            </Typography>
                            <Rating name="half-rating" defaultValue={data.rating.rate} precision={0.5} />
                            <img
                                height="380px"
                                width="300px"
                                src={`${data.image}`}
                                alt={data.title}
                                loading="lazy"
                            />
                        </Card>
                    </Grid>
                    <Grid item spacing={1} xs={7}>
                        <Grid container alignItems="" style={{ marginLeft: '10px', marginRight: '100px' }}>
                            <Box sx={{ '& > :not(style)': { m: 1 }, marginLeft: 'auto' }}>
                                <Fab color="secondary" aria-label="edit" href={`/products/update/${data.id}`} disabled={isLoading}>
                                    <EditIcon />
                                </Fab>
                                <Fab color="primary" aria-label="add" onClick={handleDeleteProduct} disabled={isLoading}>
                                    <DeleteForeverIcon />
                                </Fab>
                                {isSuccess && <div>Producto eliminado con éxito</div>}
                            </Box>
                        </Grid>
                        <Box sx={{ m: 2 }}>
                            <Typography variant="subtitle1" component="div">
                                <label style={{ marginLeft: "auto" }}>{data.title}</label>
                            </Typography>
                            <hr />
                            <Typography variant="subtitle1" component="div">
                                <label className={styles.classes.colorlabelLetDetail} style={{ marginRight: "180px"}} >Categoria</label>
                                <label style={{marginLeft: "210px", }}>{data.category}</label>
                            </Typography>
                            <hr />
                            <Box >
                                <Typography variant="subtitle1" component="div" >
                                    <label className={styles.classes.colorlabelLetDetail} style={{ marginRight: "250px"}}>Precio</label>
                                    <label style={{ marginLeft: "200px" }}>$ {data.price}</label>
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <br />
                <Typography>
                    <label className={styles.classes.colorlabelLetDetail}>DESCRIPCIÓN</label>                    
                </Typography>
                <Typography>
                    {data.description}
                </Typography>
            </Container>
            <Footer/>
        </ThemeProvider>
    );
};
export default DetailsProduct;


