import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { Dialog, IconButton, Button, Input } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { CloseIcon } from '../assets';
import { CollectionsOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    dialogPaper: {
        minHeight: '60vh', 
        maxHeight: '60vh',
        minWidth: '30vw',
        maxWidth: '30vw',
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
        right: '570px',
    },
    Body: {
        fontSize: '15px',
        color: '#97A1A9',
        background: '#2A3E4C',
        paddingBlock: '40px',
    },
    InputBox: {
        color: 'black',
        width: '240px',
        border: '1px solid #356680',
        background: 'white',
        borderRadius: 10,
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    ErrorInputBox: {
        color: 'black',
        width: '240px',
        border: '1px solid #FF5B5B',
        background: 'white',
        borderRadius: 10,
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    CancelButton: {
        color: '#14AFF1',
        textTransform: 'none',
    },
    ResetButton: {
        color: '#FFF',
        textTransform: 'none',
        border: '1px solid #14AFF1',
        borderRadius: 10,
        height: '30px',
    },
    SaveButton: {
        color: '#FFF',
        textTransform: 'none',
        background: '#14AFF1',
        borderRadius: '10px',
        height: '30px',
        paddingLeft: '15px',
        paddingRight: '15px'
    },
}))

const EditMenu = ({
    invoice_currency, cust_payment_terms,
    newinvoice_currency, setNewinvoice_currency,
    newcust_payment_terms, setNewcust_payment_terms,
    
    setSaveButtonClicked,
    isErrorNewinvoice_currency
}) => {
    const classes = useStyles();

    const handleinvoice_currency = (event) => {
        setSaveButtonClicked(false);
        setNewinvoice_currency(event.target.value);
    }

    const handlecust_payment_terms = (event) => {
        setSaveButtonClicked(false);
        setNewcust_payment_terms(event.target.value);
    }

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ paddingLeft: '-100px', paddingTop: '35px', fontSize: '17px' }}>
                <div style={{ paddingBottom: '5px', paddingLeft: '40px', display: 'flex', width: '10px' }}>
                </div>
                <div style={{ paddingBottom: '5px', display: 'flex' }}>
                </div>
            </div>
            <div>
                <div style={{ paddingLeft:'-20px',paddingBottom: '40px',paddingTop:'25px' }}>
                    <Input
                        className={isErrorNewinvoice_currency ? classes.ErrorInputBox : classes.InputBox}
                        disableUnderline={true}
                        value={newinvoice_currency}
                        placeholder="Invoice Currency"
                        onChange={(event) => handleinvoice_currency(event)}
                    >
                    </Input>
                </div>

                <div style={{ paddingBottom: '20px' }}>
                    <Input
                        className={classes.InputBox}
                        disableUnderline={true}
                        value={newcust_payment_terms}
                        placeholder="Customer Payment Terms"
                        onChange={(event) => handlecust_payment_terms(event)}
                    >
                    </Input>
                </div>
            </div>
        </div>
    )
}

const EditInvoicePage = ({ 
    open, setOpen,
    selectedInvoiceDetails,
    setDataPageCount, setData
    
}) => {
    const classes = useStyles();
    const [ maxWidth ] = React.useState('lg');
    const [ fullWidth ] = React.useState(false);

    console.log(selectedInvoiceDetails);

    const invoiceNumber = selectedInvoiceDetails.length === 0 ? '' : selectedInvoiceDetails[0]['sl_no']
    const invoice_currency = selectedInvoiceDetails.length === 0 ? '' : selectedInvoiceDetails[0]['invoice_currency']
    const cust_payment_terms = selectedInvoiceDetails.length === 0 ? '' : selectedInvoiceDetails[0]['cust_payment_terms'];

    console.log("invoice number" + invoiceNumber + ", invoice currency" + invoice_currency + ", cust_payment_terms" + cust_payment_terms);
    const [ newinvoice_currency, setNewinvoice_currency ] = React.useState(invoice_currency);
    const [ newcust_payment_terms, setNewcust_payment_terms ] = React.useState(cust_payment_terms);
    const [ saveButtonClicked, setSaveButtonClicked ] = React.useState(false);
    console.log("newiv" + newinvoice_currency);
    const isErrorNewinvoice_currency = (newinvoice_currency === '' && saveButtonClicked);
    
    const handleSave = () => {
        if(newinvoice_currency !== '') {
            axios.post(`http://localhost:8080/HRC40787W/EditInvoice?sl_no=${invoiceNumber}&invoice_currency=${newinvoice_currency}&cust_payment_terms=${newcust_payment_terms}`,{
                method: 'GET',
                mode: 'no-cors',
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
                credentials: 'same-origin',
              })
            .then((response) => {
                console.log(response);
                handleClose();
                // setData([])
                // setDataPageCount(0);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        setSaveButtonClicked(true);
        
    }

    const handleReset = () => {
        setNewinvoice_currency(invoice_currency);
        setNewcust_payment_terms(cust_payment_terms);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Dialog onCLose={handleClose} open={open} maxWidth={maxWidth} fullWidth={fullWidth} classes={{ paper: classes.dialogPaper }}>
            <MuiDialogTitle className={classes.WindowHeader}>
                <div style={{ display: 'flex' }}>
                    <div className={classes.Title}>
                        Edit Invoice
                    </div>
                    <div className={classes.TopRightMenu}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                </div>
            </MuiDialogTitle>
            <MuiDialogContent className={classes.Body}>
                <EditMenu
                    
                    newinvoice_currency={newinvoice_currency} setNewinvoice_currency={setNewinvoice_currency}
                    newcust_payment_terms={newcust_payment_terms} setNewcust_payment_terms={setNewcust_payment_terms}
                    
                                                        
                    invoice_currency={newinvoice_currency} cust_payment_terms={newcust_payment_terms}

                    saveButtonClicked={saveButtonClicked} setSaveButtonClicked={setSaveButtonClicked}
                    isErrorNewinvoice_currency={isErrorNewinvoice_currency}
                />
            </MuiDialogContent>
            <MuiDialogActions style={{ background: '#2A3E4C', borderRadius: '0px 0px 10px 10px' }}>
                <div style={{ position: 'fixed', left: '500px', paddingBottom: '10px' }}>
                    <Button 
                        autofocus 
                        className={classes.CancelButton} 
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </div>
                <div style={{ paddingRight: '20px', paddingBottom: '10px' }}>
                    <Button 
                        autofocus 
                        className={classes.ResetButton}
                        onClick={handleReset}>Reset</Button>
                </div>
                <div style={{ paddingRight: '20px', paddingBottom: '10px' }}>
                    <Button 
                        autofocus 
                        className={classes.SaveButton}
                        onClick={handleSave}>Edit</Button>
                </div>
            </MuiDialogActions>
        </Dialog>
    );
}

export default EditInvoicePage;