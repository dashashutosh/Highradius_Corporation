import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { Dialog, IconButton, Button, Input } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { CloseIcon, MandatoryFieldsLogo } from '../assets';
import { Fragment } from 'react';


const useStyles = makeStyles((theme) => console.log(theme) || ({
    dialogPaper: {
        minHeight: '60vh', 
        maxHeight: '60vh',
        minWidth: '60vw',
        maxWidth: '60vw',
        background: '#000000',
    },
    errorbox: {
        minHeight: '8vh', 
        maxHeight: '8vh',
        minWidth: '25vw',
        maxWidth: '25vw',
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        background: '#000000',
    },
    WindowHeader: {
        background: '#2A3E4C',
        borderRadius: '10px 10px 0px 0px',
        position: 'static',
    },
    Title: {
        color: '#FFFFFF',   
        font: 'Ubuntu',
        fontWeight: 'normal',
    },
    TopRightMenu: {
        position: 'fixed',
        top: '160px',
        right: '330px',
    },
    Body: {
        fontSize: '15px',
        color: '#97A1A9',
        background: '#2A3E4C',
        paddingBlock: '40px',
    },
    Column1: {
        width: '30vw',
        height: '30vh',
        paddingLeft: '40px'
    },
    Column2: {
        width: '30vw',
        height: '30vh',
        paddingLeft: '50px'
    },
    InputBox: {
        color: 'black',
        width: '205px',
        border: '1px solid #356680',
        background: 'white',
        borderRadius: 10,
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    ErrorInputBox: {
        color: 'black',
        width: '205px',
        border: '1px solid #FF5B5B',
        background: 'white',
        borderRadius: 10,
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    CancelButton: {
        color: '#14AFF1',
        textTransform: 'none',
    },
    SearchButton: {
        color: '#FFF',
        textTransform: 'none',
        background: '#14AFF1',
        borderRadius: '10px',
        height: '30px',
        paddingLeft: '15px',
        paddingRight: '15px'
    },
}))

const MandatoryFieldsPopUp = ({ open, setOpen }) => {
    const classes = useStyles();
    const [ maxWidth ] = React.useState('lg');
    const [ fullWidth ] = React.useState(false);
    

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Dialog 
            onCLose={handleClose} 
            open={open}
            maxWidth={maxWidth} 
            fullWidth={fullWidth} 
            classes={{ paper: classes.errorbox }}
        >
            <MuiDialogContent 
                className={classes.Body}
                style={{
                    overflow: 'hidden',
                    borderLeft: '5px solid #FF5B5B',
                    borderRadius: 10,
                    color: '#FFFFFF',
                    display: 'flex',
                }}
            >
                <div style={{ paddingRight: '10px' }}>
                    <MandatoryFieldsLogo/>
                </div>
                <div>
                    Mandatory fields can't be empty
                </div>
                <div style={{ position: 'absolute', right: '10px', top: '8px' }}>
                    <IconButton onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </div>
            </MuiDialogContent>
        </Dialog>
    );
}

const SearchMenu = ({ 
    cust_number, setCustNumber,
    buisness_year, setBuisnessYear,
    doc_id, setDocId,
	invoice_id, setInvoiceId,
    searchButtonClicked, setSearchButtonClicked,
 }) => {

    const classes = useStyles();

    const handlecust_number = (event) => {
        setSearchButtonClicked(false);
        setCustNumber(event.target.value);
    }

    const handlebuisness_year = (event) => {
        setSearchButtonClicked(false);
        setBuisnessYear(event.target.value);
    }

    const handledoc_id = (event) => {
        setSearchButtonClicked(false);
        setDocId(event.target.value);
    }

    const handleinvoice_id = (event) => {
        setSearchButtonClicked(false);
        setInvoiceId(event.target.value);
    }

    const isErrorCustNumber = (cust_number === '' && searchButtonClicked);
    const isErrorBuisnessYear = (buisness_year === '' && searchButtonClicked);
    const isErrorDocId = (doc_id === '' && searchButtonClicked);
    const isErrorInvoiceId = (invoice_id === '' && searchButtonClicked);
    
    return (
        <div style={{ display: 'flex' }}>
            <div className={classes.Column1}>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '30px', paddingTop: '10px', fontSize: '17px' }}>

                        <div style={{ paddingBottom: '30px' }}>
                            <Input
                                className={isErrorDocId ? classes.ErrorInputBox : classes.InputBox}
                                disableUnderline={true}
                                required={true}
                                value={doc_id}
                                onChange={(event) => handledoc_id(event)}
                                error={isErrorDocId}
                                placeholder="Document Id"
                            >
                            </Input>
                        </div>

                        <div style={{ paddingBottom: '30px' }}>
                            <Input
                                className={isErrorCustNumber ? classes.ErrorInputBox : classes.InputBox}
                                disableUnderline={true}
                                required={true}
                                value={cust_number}
                                onChange={(event) => handlecust_number(event)}
                                error={isErrorCustNumber}
                                placeholder="Customer Number"
                            >
                            </Input>
                        </div>
                    </div>
                </div>
            </div>            

                        <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '30px', paddingTop: '10px', fontSize: '17px' }}>
                        <div style={{ paddingBottom: '30px' }}>
                            <Input
                                className={isErrorInvoiceId ? classes.ErrorInputBox : classes.InputBox}
                                disableUnderline={true}
                                required={true}
                                value={invoice_id}
                                onChange={(event) => handleinvoice_id(event)}
                                error={isErrorInvoiceId}
                                placeholder="Invoice Id"
                            >
                            </Input>
                        </div>

                        <div style={{ paddingBottom: '30px' }}>
                            <Input
                                className={isErrorBuisnessYear ? classes.ErrorInputBox : classes.InputBox}
                                disableUnderline={true}
                                required={true}
                                value={buisness_year}
                                onChange={(event) => handlebuisness_year(event)}
                                error={isErrorBuisnessYear}
                                placeholder="Buisness Year"
                            >
                            </Input>
                        </div>
                        </div>
                        <div>
                </div>
            </div>    
    )
}        
        
const AdvanceSearchInvoice = ({ open, setOpen, setDataPageCount, setData, setSearchResults, searchResults }) => {
    const classes = useStyles();
    const [ maxWidth ] = React.useState('lg');
    const [ fullWidth ] = React.useState(false);

    const [ cust_number, setCustNumber ] = React.useState('');
    const [ buisness_year, setBuisnessYear ] = React.useState('');
    const [ doc_id, setDocId ] = React.useState('');
    const [ invoice_id, setInvoiceId ] = React.useState('');

    const [ searchButtonClicked, setSearchButtonClicked ] = React.useState(false);
    const [ openMandatoryFieldsPopUp, setOpenMandatoryFieldsPopUp ] = React.useState(false);

    const handleSearchButton = () => {
        setSearchButtonClicked(true);
        if(
	        cust_number !== '' &&
	        buisness_year !== '' &&
	        doc_id !== '' &&
	        invoice_id !== ''
        ) {
            axios.get(
                `http://localhost:8080/HRC40787W/AdvanceSearch?cust_number=${cust_number}&doc_id=${doc_id}&invoice_id=${invoice_id}&buisness_year=${buisness_year}`, 
                {
                    method: 'GET',
                    mode: 'no-cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                      },
                      withCredentials: true,
                      credentials: 'same-origin',
                }
            )
            .then((response) => {
                
                setSearchResults([...searchResults, ...response.data]);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

            handleClose();
        }
        else {
            setOpenMandatoryFieldsPopUp(true);
        }
    }

    const handleClearButton = () => {
        setSearchButtonClicked(false);
        setCustNumber('');
        setBuisnessYear('');
        setDocId('');
        setInvoiceId('');
    }

    const handleClose = () => {
        handleClearButton();
        setOpen(false);
    }

    return (
        <Fragment>
            <Fragment>
                <Dialog onCLose={handleClose} open={open} maxWidth={maxWidth} fullWidth={fullWidth} classes={{ paper: classes.dialogPaper }}>
                    <MuiDialogTitle className={classes.WindowHeader} >
                        <div style={{ display: 'flex' }}>
                            <div className={classes.Title}>
                                Advance Search
                            </div>
                            <div className={classes.TopRightMenu}>
                                <IconButton onClick={handleClose}>
                                    <CloseIcon/>
                                </IconButton>
                            </div>
                        </div>
                    </MuiDialogTitle>
                    <MuiDialogContent className={classes.Body}>
                        <SearchMenu
                            cust_number={cust_number} setCustNumber={setCustNumber}
                            buisness_year={buisness_year} setBuisnessYear={setBuisnessYear}
                            doc_id={doc_id} setDocId={setDocId}
                            invoice_id={invoice_id} setInvoiceId={setInvoiceId}
                            searchButtonClicked={searchButtonClicked} setSearchButtonClicked={setSearchButtonClicked}
                        />
                    </MuiDialogContent>
                    <MuiDialogActions style={{ background: '#2A3E4C', borderRadius: '0px 0px 10px 10px' }}>
                        <div onClick={handleClose} style={{ position: 'fixed', left: '350px', paddingBottom: '10px' }}>
                            <Button autofocus className={classes.CancelButton}>Cancel</Button>
                        </div>
                        <div style={{ paddingRight: '20px', paddingBottom: '10px' }}>
                            <Button autofocus className={classes.ClearButton} onClick={handleClearButton}>Clear</Button>
                        </div>
                        <div style={{ paddingRight: '20px', paddingBottom: '10px' }}>
                            <Button autofocus className={classes.SearchButton} onClick={handleSearchButton}>Search</Button>
                        </div>
                    </MuiDialogActions>
                </Dialog>
            </Fragment>
            <Fragment>
                <MandatoryFieldsPopUp
                    open={openMandatoryFieldsPopUp}
                    setOpen={setOpenMandatoryFieldsPopUp}
                />
            </Fragment>
        </Fragment>
    )
}

export default AdvanceSearchInvoice;

