import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        marginTop: '25px',
        padding: '20px 0',
        marginRight: '10px',
    },
    buttons: {
        marginTop: '40px',
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardContent: {
        flexGrow: 1,
    }
}));

export default useStyles;