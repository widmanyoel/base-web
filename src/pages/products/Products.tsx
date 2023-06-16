import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Header from "../../components/header";
import SearchIcon from '@mui/icons-material/Search';
import {
  FormControl, IconButton,
  ImageListItem, ImageListItemBar,
  InputAdornment, InputLabel,
  MenuItem, Rating, Select,
  SelectChangeEvent, TextField
} from "@mui/material";
import { useGetCategoriesQuery } from "../../stateManagement/apiSlices/categoriApi";
import { useGetProductsQuery } from "../../stateManagement/apiSlices/productApi";
import Footer from "../../components/footer";

const theme = createTheme();
const Products: React.FC = () => {

  //llamamos al api products
  const [products, setProducts] = React.useState([])
  const { data = [], isLoading, error } = useGetProductsQuery({});

  //llamamos al api categoria
  const [categories, setCategori] = React.useState([]);
  const { data: categoryData = [], isLoading: categoryLoading, error: categoryError } = useGetCategoriesQuery({});

  //estado de la categoría seleccionada
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");


  //productos  respuesta de la API
  React.useEffect(() => {
    setProducts(data);
  }, [data]);


  //categorías respuesta de la API
  React.useEffect(() => {
    setCategori(categoryData);
  }, [categoryData]);

  //categoría seleccionada
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
  };

  //productos búsqueda
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  React.useEffect(() => {
    // Filtrar categoría seleccionada
    const filteredByCategory = selectedCategory
      ? products.filter((product: any) => product.category === selectedCategory) : products;
    // Filtrar productos búsqueda
    const filteredBySearchTerm = filteredByCategory.filter((product: any) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filteredBySearchTerm);
  }, [selectedCategory, searchTerm, products]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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
              

              <FormControl sx={{ width: 300 }}>

                <InputLabel>Categoria</InputLabel>
                <Select
                  label="Categoria" size="small" variant="outlined"
                  value={selectedCategory}
                  onChange={handleChange}>
                  <MenuItem value="">Todas las categorias</MenuItem>
                  {categoryData.map((category: any, index: any) => (
                    <MenuItem key={index} value={category}>
                      {category}
                    </MenuItem>
                  ))}

                </Select>
              </FormControl >

              <TextField sx={{ width: 500 }}
                label="Nombre"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
              <Box sx={{ marginLeft: "auto" }} >
                <Button variant="outlined" size="medium" href={`/products/add`}>Agregar</Button>
              </Box>
            </Stack>
          </Container>
        </Box>
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

                  <Typography component="legend">{product.rating.rate} stars</Typography>
                  <Rating name="half-rating" defaultValue={product.rating.rate} precision={0.5} />
                  <Grid item>
                    <Typography variant="subtitle1" component="div">
                      ${product.price}
                    </Typography>
                  </Grid>
                  <div >
                    <Button href={`/products/details/${product.id}`}>
                      <ImageListItem style={{ objectFit: 'contain', height: '350px' }}  >
                        <img
                          src={`${product.image}`}
                          alt={product.title}
                          loading="lazy"
                        />
                        <ImageListItemBar
                          title={product.title}
                          subtitle={product.category}
                          actionIcon={
                            <IconButton
                              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                              aria-label={`info about ${product.title}`}
                            >
                            </IconButton>
                          }
                        />
                      </ImageListItem>
                    </Button>
                  </div>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography>
                      {truncateText(product.description)}
                    </Typography>
                  </CardContent>
                </Card>

              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
};
export default Products;

