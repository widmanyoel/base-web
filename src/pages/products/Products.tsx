import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Header from "../../components/header";
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import {
  Badge,
  CardActions,
  Fab,
  FormControl, IconButton,
  ImageListItem, ImageListItemBar,
  InputAdornment, InputLabel,
  MenuItem, Paper, Rating, Select, TextField
} from "@mui/material";
import { useGetCategoriesQuery } from "../../stateManagement/apiSlices/categoriApi";
import { useDeleteProductsMutation, useGetCategoryProductsQuery, useGetProductsQuery } from "../../stateManagement/apiSlices/productApi";
import Footer from "../../components/footer";
import ProgresBar from "../../components/progresbar";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const Products: React.FC = () => {
  const { data: categoriesData = [] } = useGetCategoriesQuery({});
  const [categoryId, setSelectedCategoryId] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [deleteProduct, { isSuccess }] = useDeleteProductsMutation();
  const navigate = useNavigate();

  const handleCategoryChange = (event: any) => {
    if (event.target.value == null) {
      setSelectedCategoryId('');
    } else {
      setSelectedCategoryId(event.target.value);
    }
  };
  const handleSearchTermChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const { data: products = [], isLoading, isError } = useGetCategoryProductsQuery(categoryId);

  const filteredProducts = products.filter((product: any) => {
    return (product.attributes.title).toLowerCase().includes(searchTerm.toLowerCase());
  });
  // const filteredProducts = products.filter((product: any) => {
  //   const title = product.attributes.title.toLowerCase();
  //   const searchTermLower = searchTerm.toLowerCase();
  //   return title.includes(searchTermLower);
  // });


  if (isLoading) {
    return <ProgresBar />;
  }

  if (isError) {
    return <div>Ha ocurrido un error al cargar los productos.</div>;
  }

  // if (!products) {
  //   return <ProgresBar />;
  // }

  //dar 100 letras a todos las description
  const maxLength = 100;
  function truncateText(text: any) {
    if (text.length > maxLength) {
      return text.substr(0, maxLength) + '...';
    } else {
      return text;
    }
  }

  const handleDeleteProduct = (productId: any) => {
    deleteProduct({
      id: productId
    }
    )
  };
  if (isSuccess) {
    window.location.reload();
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

              <FormControl sx={{ width: 300 }}>

                <InputLabel>Categoria</InputLabel>
                <Select
                  label="Categoria" size="small" variant="outlined"
                  value={categoryId}
                  onChange={handleCategoryChange}
                >
                  <MenuItem >Todas las categorias</MenuItem>
                  {categoriesData.map((category: any, index: any) => (
                    <MenuItem key={index} value={category.id}>
                      {category.attributes.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl >
              <TextField sx={{ width: 500 }}
                label="Nombre"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={handleSearchTermChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
              <Box sx={{ marginLeft: "auto" }} >
                <Button variant="outlined" size="medium" href={`/products/add`}><AddCircleOutlineOutlinedIcon />Agregar</Button>
              </Box>
            </Stack>
          </Container>
        </Box>
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
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {filteredProducts.map((product: any, index: any) => (
                <Grid item key={index} xs={12} sm={6} md={4} >

                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    style={{ objectFit: 'contain' }}
                  >
                    <Typography component="legend">{product.attributes.raiting.data?.attributes?.value} stars</Typography>
                    <Grid container >
                      <Rating name="half-rating" defaultValue={product.attributes.raiting.data?.attributes?.value} precision={0.5} />
                      <Box sx={{ '& > :not(style)': { m: 1 }, marginLeft: 'auto' }}>
                        <Fab color="secondary" aria-label="edit" disabled={isLoading}>
                          ${product.attributes.price}
                        </Fab>
                      </Box>
                    </Grid>
                    <Button href={`/products/details/${product.id}`}>
                      <div >
                        <ImageListItem style={{ objectFit: 'contain' }}  >
                          <img
                            src={`http://localhost:1337${product?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url}`}
                            alt={product.attributes.title}
                            loading="lazy"
                          />
                        </ImageListItem>
                        <ImageListItemBar
                          title={product.attributes?.title}
                          subtitle={product.attributes?.category.data?.attributes.name}
                          actionIcon={
                            <IconButton
                              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                              aria-label={`info about ${product.attributes?.title}`}
                            >
                            </IconButton>
                          }
                        />
                      </div>
                    </Button>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography>
                        {truncateText(product.attributes?.description)}
                      </Typography>
                      <CardActions>
                        <Button variant="outlined" color="success" size="small" href={`/products/details/${product.id}`}><VisibilityIcon />View</Button>
                        <Button variant="outlined" color="primary" size="small" href={`/products/update/${product.id}`}><EditNoteOutlinedIcon />Edit</Button>
                        <Button variant="outlined" color="warning" size="small" onClick={() => handleDeleteProduct(product.id)}><DeleteOutlineOutlinedIcon />Delet</Button>
                      </CardActions>
                    </CardContent>
                  </Card>

                </Grid>
              ))}
            </Grid>
          </Container>
        </Paper>
      </main>
      <Footer />
    </ThemeProvider>
  );
};
export default Products;

