import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    CssBaseline,
    Fab,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    ImageListItem,
    ImageListItemBar,
    InputLabel,
    MenuItem,
    Paper,
    Rating,
    Select,
    Stack,
    TextField,
    ThemeProvider,
    Typography,
    createTheme
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/header";

import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { useGetCategoriesQuery, useGetRaitingsQuery } from "../../stateManagement/apiSlices/categoriApi";
import { useAddProductsMutation } from "../../stateManagement/apiSlices/productApi";
import Footer from "../../components/footer";
import useStylesProduct from "./Product.Styles";
import { Controller, useForm } from "react-hook-form";
import localize, { defineLocalizeBaseKey } from "../../utils/localizer";
import * as productConstants from "./model/ProductConstants";
import { useNavigate } from "react-router-dom";
import { useAddFileMutation } from "../../stateManagement/apiSlices/fileApi";
import HomeIcon from '@mui/icons-material/Home';

const theme = createTheme();

const AddProduct: React.FC = () => {
    const styles = useStylesProduct();
    const { handleSubmit, control, setValue, formState: { errors = {} } }
        = useForm({
            defaultValues: {
                title: "",
                image: "",
                category: "",
                price: "",
                description: "",
                raiting: "",
                imageFile: "",
                idImage: "",
            }
        });
    const navigate = useNavigate();
    const t = defineLocalizeBaseKey('product');
    const { data: categoryData = [], isLoading: categoryLoading, error: categoryError } = useGetCategoriesQuery({});
    const { data: dataR = [], isLoading: rLoading, error: rError } = useGetRaitingsQuery({});
    const [addProduct, { isLoading, isError, isSuccess }] = useAddProductsMutation();
    const [addFile] = useAddFileMutation();
    const [data, setData] = useState({
        image: null,
        title: "",
        category: "",
        price: "",
        description: "",
        raiting: "",
    });
    const handleSubmitForm = (data: any) => {
        let formData = new FormData();;
        formData.append('files', data.imageFile, data.imageFile.name);
        addFile(formData)
            .unwrap()
            .then((res) => {
                let idImage = res[0].id;
                addProduct({
                    title: data.title,
                    price: data.price,
                    description: data.description,
                    raiting: data.raiting,
                    image: idImage,
                    category: data.category
                }).unwrap()
                    .then((data) => {
                        navigate('/products')
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const uploadFile = (event: any) => {
        setValue(productConstants.PROD_IMAGFILE, event.files[0]);
        const file = event.files[0];
        //console.log("imagen:", event.files[0])
        setData({ ...data, image: file });
    }


    const [titleValue, setTitleValue] = useState("");
    const [categoryValue, setCategoryValue] = useState("");
    const [priceValue, setPriceValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [ratingValue, setRatingValue] = useState("");

    function handleTitleChange(event: any) {
        const { value } = event.target;
        setTitleValue(value);
    }
    function handleCategoryChange(event: any) {
        const { value } = event.target;
        setCategoryValue(value);
    }
    function handlePriceChange(event: any) {
        const { value } = event.target;
        setPriceValue(value);
    }
    function handleDescriptionChange(event: any) {
        const { value } = event.target;
        setDescriptionValue(value);
    }
    function handleRatingChange(event: any) {
        const { value } = event.target;
        setRatingValue(value);
    }

    const maxLength = 100;
    function truncateText(text: any) {
        if (text.length > maxLength) {
            return text.substr(0, maxLength) + '...';
        } else {
            return text;
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            {/* <main> */}
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
                            <Typography variant="h5"
                                className={styles.classes.colorlabelLetDetail}
                            >
                                Agregar Producto
                            </Typography>
                        </Stack>
                        <Grid container >
                            <Box sx={{ '& > :not(style)': { m: 1 }, marginLeft: 'auto' }}>
                                <Fab color="success" aria-label="Home" href={`/products`} disabled={isLoading}>
                                    <HomeIcon />
                                </Fab>

                            </Box>
                        </Grid>
                    </Container>
                </Box>

                <form
                    onSubmit={handleSubmit((data) => handleSubmitForm(data))}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            '& > :not(style)': {
                                m: 5,
                                width: 728,
                                height: 828,
                            },
                        }}
                        justifyContent="center"
                    >
                        <Paper variant="outlined"
                            sx={{
                                p: 2,
                                margin: 'auto',
                                maxWidth: 700,
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
                                                        onChange={(event) => {
                                                            field.onChange(event);
                                                            handleTitleChange(event);
                                                        }}

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
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            {...field}                                                            
                                                            inputProps={{
                                                                accept: 'image/*',
                                                                onChange: (event) => {
                                                                     field.onChange(event);
                                                                    uploadFile(event.target);

                                                                },
                                                            }}
                                                            fullWidth
                                                            type="file"
                                                            id={productConstants.PROD_IMAG}
                                                            label={localize('product.image')}
                                                            variant="outlined"
                                                            placeholder={t('imagPlaceholder')}
                                                            error={Boolean(errors[productConstants.PROD_IMAG])}
                                                        />

                                                        <FormHelperText>{errors[productConstants.PROD_IMAG]?.message}</FormHelperText>
                                                    </FormControl>
                                                )}
                                            />

                                        </Grid>
                                        <Grid item xs>
                                            <Controller
                                                control={control}
                                                name={productConstants.PROD_CAT}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: localize('requiredInput'),
                                                    },
                                                }}
                                                render={({ field }) => (
                                                    <FormControl fullWidth>
                                                        <InputLabel>Categoria</InputLabel>
                                                        <Select
                                                            {...field}
                                                            label={t('category')}
                                                            id={productConstants.PROD_CAT}
                                                            variant="outlined"
                                                            error={!!errors[productConstants.PROD_CAT]}
                                                            onChange={(event) => {
                                                                field.onChange(event);
                                                                handleCategoryChange(event);
                                                            }}
                                                        >
                                                            {categoryData.map((category: any, index: any) => (
                                                                <MenuItem key={index} value={category.id}>
                                                                    {category.attributes.name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                        <FormHelperText>{errors[productConstants.PROD_CAT]?.message}</FormHelperText>
                                                    </FormControl>
                                                )}
                                            />

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
                                                        placeholder={t('pricePlaceholder')}
                                                        error={!!errors[productConstants.PROD_PRICE]}
                                                        helperText={errors[productConstants.PROD_PRICE]?.message}
                                                        onChange={(event) => {
                                                            field.onChange(event);
                                                            handlePriceChange(event);
                                                        }}
                                                    />
                                                )}
                                            />

                                        </Grid>
                                        <Grid item xs>
                                            <Controller
                                                control={control}
                                                name={productConstants.PROD_RAITING}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: localize('requiredInput'),
                                                    },
                                                }}
                                                render={({ field }) => (
                                                    <FormControl fullWidth>
                                                        <InputLabel>Raiting</InputLabel>
                                                        <Select
                                                            {...field}
                                                            label="Raiting"
                                                            variant="outlined"
                                                            error={!!errors[productConstants.PROD_RAITING]}
                                                            onChange={(event) => {
                                                                field.onChange(event);
                                                                handleRatingChange(event);
                                                            }}
                                                        >
                                                            {dataR.map((raiting: any, index: any) => (
                                                                <MenuItem key={index} value={raiting.id}>
                                                                    {raiting.attributes.value}
                                                                </MenuItem>
                                                            ))}

                                                        </Select>
                                                        <FormHelperText>{errors[productConstants.PROD_RAITING]?.message}</FormHelperText>
                                                    </FormControl>
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
                                                        onChange={(event) => {
                                                            field.onChange(event);
                                                            handleDescriptionChange(event);
                                                        }}
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
                        <Paper variant="outlined" square sx={{
                            p: 2,
                            margin: 'auto',
                            maxWidth: 400,
                            maxHeight: 800,
                            flexGrow: 2,
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}>

                            <Grid item xs={12} sm={6} md={4} >
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                    style={{ objectFit: 'contain' }}
                                >
                                    <Typography component="legend"> {ratingValue} stars</Typography>
                                    <Grid container >
                                        <Rating name="half-rating" precision={0.5} />
                                        <Box sx={{ '& > :not(style)': { m: 1 }, marginLeft: 'auto' }}>
                                            <Fab color="secondary" aria-label="edit" disabled={isLoading}>
                                                ${priceValue}
                                            </Fab>
                                        </Box>
                                    </Grid>
                                    <Button >                                        
                                            <ImageListItem style={{ objectFit: 'contain' }}  >
                                                {data?.image ? (
                                                    <img src={URL.createObjectURL(data?.image)}
                                                    />
                                                ) : (
                                                    <div>Imagen no seleccionada</div>
                                                )}
                                            </ImageListItem>
                                            <ImageListItemBar
                                                title={titleValue}
                                                subtitle={categoryValue}
                                                actionIcon={
                                                    <IconButton
                                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                        aria-label={`info about ${titleValue}`}
                                                    >
                                                    </IconButton>
                                                }
                                            />                                        
                                    </Button>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography>
                                            {truncateText(descriptionValue)}
                                        </Typography>
                                        <CardActions>
                                            <Button variant="outlined" color="success" size="small" ><VisibilityIcon />View</Button>
                                            <Button variant="outlined" color="primary" size="small" ><EditNoteOutlinedIcon />Edit</Button>
                                            <Button variant="outlined" color="warning" size="small" ><AddCircleOutlineOutlinedIcon />Delet</Button>
                                        </CardActions>
                                    </CardContent>
                                </Card>

                            </Grid>

                        </Paper>
                    </Box>

                </form>

            {/* </main> */}
            <Footer />
        </ThemeProvider >

    );
};
export default AddProduct;
