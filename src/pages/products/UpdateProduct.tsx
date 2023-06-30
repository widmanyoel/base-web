import { Box, Button, Card, CardActions, CardContent, Container, CssBaseline, Fab, FormControl, FormHelperText, Grid, IconButton, ImageListItem, ImageListItemBar, InputLabel, MenuItem, Paper, Rating, Select, Stack, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import React from "react";
import Header from "../../components/header";
import { useGetCategoriesQuery, useGetRaitingsQuery } from "../../stateManagement/apiSlices/categoriApi";
import { useDetailProductsQuery, useUpdateProductsMutation } from "../../stateManagement/apiSlices/productApi";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/footer";
import ProgresBar from "../../components/progresbar";
import { Controller, useForm } from "react-hook-form";
import * as productConstants from "./model/ProductConstants";
import localize, { defineLocalizeBaseKey } from "../../utils/localizer";
import { useAddFileMutation } from "../../stateManagement/apiSlices/fileApi";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HomeIcon from '@mui/icons-material/Home';

const theme = createTheme();
const UpdateProduct: React.FC = () => {
    const { handleSubmit, control, setValue, reset, formState: { errors = {} } }
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
    const { id } = useParams<{ id: any }>();
    const { data } = useDetailProductsQuery(id);
    const { data: dataC = [], isLoading: categoryLoading, error: categoryError } = useGetCategoriesQuery({});
    const { data: dataR = [], isLoading: rLoading, error: rError } = useGetRaitingsQuery({});
    const [updateProduct, { isLoading, isError, isSuccess }] = useUpdateProductsMutation();
    const [addFile] = useAddFileMutation();
    //const [value, setValue] = useState('');

    React.useEffect(() => {
        reset({
            title: data?.data?.attributes?.title ?? "",
            description: data?.data?.attributes?.description ?? "",
            //image:data.attributes.image.data.id,
            idImage: data?.data?.attributes?.image?.data?.id ?? "",
            price: data?.data?.attributes?.price ?? "",
            category: data?.data?.attributes?.category.data.id ?? "",
            raiting: data?.data?.attributes?.raiting?.data?.attributes?.value ?? "",
        })

    }, [data]);

    if (!data) {
        return <ProgresBar />;
    }

    const handleSubmitForm = (data: any) => {
        if (data.imageFile) {
            let formData = new FormData();;
            formData.append('files', data.imageFile, data.imageFile.name);
            addFile(formData)
                .unwrap()
                .then((res) => {
                    let idImage = res[0].id;
                    updateProduct({
                        id: id ?? "",
                        data: {
                            title: data.title,
                            price: data.price,
                            description: data.description,
                            raiting: data.raiting,
                            image: idImage,
                            category: data.category
                        }
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
        } else {
            console.log("description:", data)
            updateProduct(
                {
                    id: id ?? "",
                    data: {
                        title: data?.title,
                        price: data?.price,
                        description: data?.description,
                        raiting: data?.raiting,
                        image: data?.idImage,
                        category: data?.category
                    }
                }).unwrap()
                .then((data) => {
                    console.log(data)
                    navigate('/products')
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    }

    const uploadFile = (event: any) => {
        setValue(productConstants.PROD_IMAGFILE, event.files[0]);
        //const file =event.files[0];
        console.log("imagen:", productConstants.PROD_IMAGFILE, event.files[0])
        //setData({ ...data, image: file });
    }

    //dar 100 letras a todos las description
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
                            <Typography variant="h5" color="#7E07F6">
                                Editar Producto
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

                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs>
                                            <Controller
                                                control={control}
                                                name={productConstants.PROD_IMAG}
                                                rules={{
                                                    // required: {
                                                    // value: true,
                                                    // message: localize('requiredInput'),
                                                    //},
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
                                                        >
                                                            {dataC.map((category: any, index: any) => (
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
                                                    />
                                                )}
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
                                    <Typography component="legend"> {data?.data?.attributes?.raiting.data?.attributes?.value}stars</Typography>
                                    <Grid container >
                                        <Rating name="half-rating" defaultValue={data?.data?.attributes.raiting.data?.attributes?.value} precision={0.5} />
                                        <Box sx={{ '& > :not(style)': { m: 1 }, marginLeft: 'auto' }}>
                                            <Fab color="secondary" aria-label="edit" disabled={isLoading}>
                                                ${data?.data?.attributes.price}
                                            </Fab>
                                        </Box>
                                    </Grid>
                                    <Button >
                                        <div >
                                            <ImageListItem style={{ objectFit: 'contain' }}  >
                                                <img
                                                    src={`http://localhost:1337${data?.data?.attributes?.image?.data?.attributes?.url}`}
                                                    loading="lazy"
                                                />
                                            </ImageListItem>
                                            <ImageListItemBar
                                                title={data?.data?.attributes?.title}
                                                subtitle={data?.data?.attributes?.category.data?.attributes.name}
                                                actionIcon={
                                                    <IconButton
                                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                        aria-label={`info about ${data?.data?.attributes?.title}`}
                                                    >
                                                    </IconButton>
                                                }
                                            />
                                        </div>
                                    </Button>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography>
                                            {truncateText(data?.data?.attributes?.description)}
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
            </main>
            <Footer />
        </ThemeProvider>
    );
};
export default UpdateProduct;
