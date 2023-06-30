import {
    Box,
    Card,
    Container,
    CssBaseline,
    Fab,
    Grid,
    ImageListItem,
    Rating,
    ThemeProvider,
    Typography,
    createTheme
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Header from "../../components/header";
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteProductsMutation, useDetailProductsQuery } from "../../stateManagement/apiSlices/productApi";
import { useEffect, useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import Footer from "../../components/footer";
import useStylesProduct from "./Product.Styles";
import ProgresBar from "../../components/progresbar";
const theme = createTheme();
const DetailsProduct: React.FC = () => {
    const navigate = useNavigate();
    const styles = useStylesProduct();
    const { id } = useParams<{ id: any }>(); // Especifica que id es una cadena

    const { data = [], isLoading, isError, error } = useDetailProductsQuery(id);

    const [deleteProduct, { isSuccess }] = useDeleteProductsMutation();

    const handleDeleteProduct = () => {
        deleteProduct({
            id: data.data.id,
        })
        navigate('/products')
    };

    if (isError) {
        return <p>Ocurrió un error</p>;
    }
    if (isLoading) {
        return <ProgresBar />;
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Container fixed className={styles.classes.containerColorDetail} sx={{ py: 8, }}>
                <Grid container spacing={2}>
                    <Grid item xs={5} >
                        <Card
                            className={styles.classes.cardImageDetail}
                        >
                            <Typography component="legend">
                                {data.data.attributes.raiting.data.attributes.value} stars
                            </Typography>
                            <Rating name="half-rating" defaultValue={data.data.attributes.raiting.data.attributes.value} precision={0.5} />
                            <ImageListItem style={{ objectFit: 'contain' }}  >
                                <img                                    
                                    src={`http://localhost:1337${data?.data?.attributes?.image?.data?.attributes?.url}`}
                                    alt={data.data.attributes.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        </Card>
                    </Grid>
                    <Grid item xs={7}>
                        <Grid container style={{ marginLeft: '10px', marginRight: '100px' }}>
                            <Box sx={{ '& > :not(style)': { m: 1 }, marginLeft: 'auto' }}>
                                <Fab color="success" aria-label="Home" href={`/products`} disabled={isLoading}>
                                    <HomeIcon />
                                </Fab>
                                <Fab color="secondary" aria-label="edit" href={`/products/update/${data.data.id}`} disabled={isLoading}>
                                    <EditIcon />
                                </Fab>
                                <Fab color="primary" aria-label="add" onClick={handleDeleteProduct} disabled={isLoading}>
                                    <DeleteForeverIcon />
                                </Fab>
                                {isSuccess && <div>Producto eliminado con éxito</div>}
                            </Box>
                        </Grid>
                        <Box sx={{ m: 2 }}>
                            <Typography  >
                                <label style={{ marginLeft: "auto" }}>{data.data.attributes.title}</label>
                            </Typography>
                            <hr />
                            <Typography variant="body1" style={{ whiteSpace: 'nowrap' }}>
                                <label className={styles.classes.colorlabelLetDetail} style={{ marginRight: "180px" }} >Categoria</label>
                                <label style={{ marginLeft: "210px", }}>{data.data.attributes.category.data.attributes.name}</label>
                            </Typography>
                            <hr />
                            <Box >
                                <Typography >
                                    <label className={styles.classes.colorlabelLetDetail} style={{ marginRight: "250px" }}>Precio</label>
                                    <label style={{ marginLeft: "200px" }}>$ {data.data.attributes.price}</label>
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
                    {data.data.attributes.description}
                </Typography>
            </Container>
            <Footer />
        </ThemeProvider>
    );
};
export default DetailsProduct;


