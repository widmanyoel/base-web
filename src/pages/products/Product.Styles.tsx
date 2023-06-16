import { makeStyles } from 'tss-react/mui';
 
const useStylesProduct = makeStyles()((theme) => ({
    containerColorDetail:{
        py: 8, 
        background: "#E3E1E5",
    },
    cardImageDetail:{
        width: '68%',
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
    },
    labelDateTitleDetail:{
        marginLeft: "auto",
    },
    colorlabelLetDetail:{       
        color: "#2196f3",
    },
   
}));
export default useStylesProduct;


