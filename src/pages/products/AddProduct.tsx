import {
    Box,
    Button,
    Container,
    CssBaseline,
    FormControl,
    Grid,
    InputLabel,
    Link,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    ThemeProvider,
    Typography,
    createTheme
} from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/header";

import { useGetCategoriesQuery } from "../../stateManagement/apiSlices/categoriApi";
import { useAddProductsMutation } from "../../stateManagement/apiSlices/productApi";
import Footer from "../../components/footer";
import useStylesProduct from "./Product.Styles";
import { Controller, useForm } from "react-hook-form";
import localize, { defineLocalizeBaseKey } from "../../utils/localizer";
import * as productConstants from "./model/ProductConstants";

type Inputs = {
    title: string;
    description: string;
    image: string;
    price: string;
    category: string;
};
const theme = createTheme();
const AddProduct: React.FC = () => {
    const styles = useStylesProduct();
    const {
        handleSubmit,
        control,
        formState: { errors = {} },
    } = useForm<Inputs>({ defaultValues: { title: "", description: "", image: "", price: "", category: "" } });
    const t = defineLocalizeBaseKey('product');
    const [categories, setCategori] = React.useState([]);
    const [category, setCategory] = useState('');
    const { data: categoryData = [], isLoading: categoryLoading, error: categoryError } = useGetCategoriesQuery({});
    const [addProduct, { isLoading, isError, isSuccess }] = useAddProductsMutation();
    //const [price, setPrice] = useState('');

    // const handlePriceChange = (event: any) => {
    //     const value = event.target.value;
    //     if (!isNaN(value)) { // asegurarse que el valor es un número
    //         setPrice(value);
    //     }
    // };

    const handleSubmitForm = (data: Inputs) => {
        console.log(data);
        addProduct(data);
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
                        <Stack
                            sx={{ pt: 0 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Typography variant="h5" component="div" className={styles.classes.colorlabelLetDetail}>
                                Agregar Producto
                            </Typography>
                        </Stack>
                        <Box sx={{ marginLeft: "auto" }} >
                            <Button variant="outlined" color="error" size="medium" href={`/products`}>Cancelar</Button>
                        </Box>
                    </Container>
                </Box>
                <form
                    // onSubmit={handleSubmit} 
                    onSubmit={handleSubmit((data) => handleSubmitForm(data))}
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
                                        <Controller
                                            control={control}
                                            name={productConstants.PROD_TITLE}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: localize('requiredInput'),
                                                },
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    {...field}
                                                    id={productConstants.PROD_TITLE}
                                                    label={t('title')}
                                                    variant="outlined"
                                                    placeholder={t('titlePlaceholder')}
                                                    error={!!errors[productConstants.PROD_TITLE]}
                                                    helperText={errors[productConstants.PROD_TITLE]?.message}
                                                />
                                            )}
                                        />

                                    </Grid>
                                    <Grid item xs>
                                        <Controller
                                            control={control}
                                            name={productConstants.PROD_IMAG}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: localize('requiredInput'),
                                                },
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    {...field}
                                                    id={productConstants.PROD_IMAG}
                                                    label={t('image')}
                                                    variant="outlined"
                                                    placeholder={t('imagPlaceholder')}
                                                    error={!!errors[productConstants.PROD_IMAG]}
                                                    helperText={errors[productConstants.PROD_IMAG]?.message}
                                                />
                                            )}
                                        />

                                    </Grid>
                                    <Grid item xs>
                                        <FormControl fullWidth>
                                            <InputLabel>Categoria</InputLabel>
                                            <Select

                                                label="Categoria"
                                                variant="outlined"
                                                value={category}
                                                onChange={(event) => setCategory(event.target.value)}
                                                name={productConstants.PROD_CAT}
                                            >
                                                <MenuItem value={category}>Todas las categorias</MenuItem>
                                                {categoryData.map((category: any, index: any) => (
                                                    <MenuItem value={category}>
                                                        {category}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl >
                                    </Grid>
                                    <Grid item xs>
                                        <Controller
                                            control={control}
                                            name={productConstants.PROD_PRICE}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: localize('requiredInput'),
                                                },
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    {...field}
                                                    id={productConstants.PROD_PRICE}
                                                    label={t('price')}
                                                    variant="outlined"
                                                    //value={price}
                                                    //onChange={handlePriceChange}
                                                    placeholder={t('pricePlaceholder')}
                                                    error={!!errors[productConstants.PROD_PRICE]}
                                                    helperText={errors[productConstants.PROD_PRICE]?.message}
                                                />
                                            )}
                                        />

                                    </Grid>
                                    <Grid item xs>
                                        <Controller
                                            control={control}
                                            name={productConstants.PROD_DESC}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: localize('requiredInput'),
                                                },
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    rows={6}
                                                    margin="normal"
                                                    {...field}
                                                    id={productConstants.PROD_DESC}
                                                    label={t('description')}
                                                    placeholder={t('descPlaceholder')}
                                                    error={!!errors[productConstants.PROD_DESC]}
                                                    helperText={errors[productConstants.PROD_DESC]?.message}
                                                />
                                            )}
                                        />

                                    </Grid>
                                    <Grid item xs>
                                        <Button variant="contained" fullWidth type="submit" disabled={isLoading}>
                                            {isLoading ? 'Adding Product...' : 'Add Product'}</Button>

                                        {isError && <div>Error adding product</div>}
                                        {isSuccess && <div>Product added successfully</div>}
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
export default AddProduct;
