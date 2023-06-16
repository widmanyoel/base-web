import { Box, Button, CircularProgress, Container, CssBaseline, FormControl, Grid, InputLabel, Link, MenuItem, Paper, Select, Stack, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { useGetCategoriesQuery } from "../../stateManagement/apiSlices/categoriApi";
import { useDetailProductsQuery, useUpdateProductsMutation } from "../../stateManagement/apiSlices/productApi";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer";
import ProgresBar from "../../components/progresbar";


const theme = createTheme();
const UpdateProduct: React.FC = () => {

    const { id } = useParams();
    const { data } = useDetailProductsQuery(id);
    const [setIsLoading] = useState(true);
    const [categories, setCategori] = React.useState([]);
    const { data: datas = [], isLoading: categoryLoading, error: categoryError } = useGetCategoriesQuery({});

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setDescription(data.description);
            setImage(data.image);
            setPrice(data.price);
            setCategory(data.category);
        }
    }, [data]);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'image':
                setImage(value);
                break;
            case 'price':
                setPrice(value);
                break;
            case 'category':
                setCategory(value);
                break;
            default:
                break;
        }
    };

    const [updateProduct, { isLoading, isError, isSuccess }] = useUpdateProductsMutation();

    if (!data) {
        return <ProgresBar />;
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        updateProduct({
            id: data.id,
            data: { title, price: parseFloat(price), description, category, image }
        });
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <main>
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container >
                        <Box sx={{ marginLeft: "auto" }} >
                            <Button variant="outlined" size="medium" href={`/products`}>Ir Productos</Button>
                        </Box>
                        <Stack
                            sx={{ pt: 0 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Typography variant="h5" component="div" color="#7E07F6">
                                Editar Producto
                            </Typography>
                        </Stack>
                        <Box sx={{ marginLeft: "auto" }} >
                            <Button variant="outlined" color="error" size="medium" href={`/products/details/${data.id}`}>Cancelar</Button>
                        </Box>
                    </Container>
                </Box>
                <form
                    onSubmit={handleSubmit}
                >
                    <Paper
                        sx={{
                            p: 2,
                            margin: 'auto',
                            maxWidth: 1000,
                            flexGrow: 2,
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}
                    >
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2} >
                                    <Grid item xs>

                                        <TextField fullWidth
                                            required
                                            name="title"
                                            label="Title"
                                            value={title} onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField fullWidth
                                            required
                                            name="image"
                                            label="Imagen"
                                            value={image} onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl sx={{ width: 300 }}>
                                            <InputLabel>Categoria</InputLabel>
                                            <Select
                                                label="Categoria" variant="outlined" name="category" value={category}
                                                onChange={handleInputChange}
                                            >
                                                <MenuItem value="">Todas las categorias</MenuItem>
                                                {datas.map((category: any, index: any) => (
                                                    <MenuItem key={index} value={category}>
                                                        {category}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl >
                                    </Grid>
                                    <Grid item xs>
                                        <TextField fullWidth
                                            required
                                            label="Precio"
                                            name="price"
                                            value={price}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            fullWidth
                                            name="description"
                                            label="Descripcion"
                                            multiline
                                            rows={6} value={description} onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <Button variant="contained" fullWidth type="submit" disabled={isLoading}>
                                            {isLoading ? 'Actualizando producto...' : 'Actualizar producto'} </Button>
                                        {isError && <div>Error update product</div>}
                                        {isSuccess && <div>Product update successfully</div>}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            </main>
            <Footer />
        </ThemeProvider>
    );
};
export default UpdateProduct;
