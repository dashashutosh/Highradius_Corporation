import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { Dialog, IconButton, Button, Input } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { CloseIcon, MandatoryFieldsLogo } from '../assets';
import { Fragment } from 'react';
import moment from 'moment';

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
        paddingLeft: '45px'
    },
    Column3: {
        width: '30vw',
        height: '30vh',
        paddingLeft: '50px'
    },
    InputBox: {
        color: '#FFFFFF',
        width: '205px',
        border: '1px solid #356680',
        background: '#283A46',
        borderRadius: 10,
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    ErrorInputBox: {
        color: '#FFFFFF',
        width: '205px',
        border: '1px solid #FF5B5B',
        background: '#283A46',
        borderRadius: 10,
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    CancelButton: {
        color: '#14AFF1',
        textTransform: 'none',
    },
    ClearButton: {
        color: '#FFF',
        textTransform: 'none',
        border: '1px solid #14AFF1',
        borderRadius: 10,
        height: '30px',
    },
    AddButton: {
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

const ClearDatePicker = ({ clear_date, setClearDate, setAddButtonClicked, isErrorClearDate }) => {
    const classes = useStyles();

    const handleclear_date = (date) => {
        setAddButtonClicked(false);
        setClearDate(date);
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                className={isErrorClearDate ? classes.ErrorInputBox : classes.InputBox}
                disableToolbar
                placeholder="Clear Date"
                variant="inline"
                error={isErrorClearDate}
                onChange={handleclear_date}
                format='dd/MM/yyyy'
                invalidDateMessage=''
                value={clear_date}
                InputProps={{
                    disableUnderline: true,
                    color: 'primary',

                }}
            />
        </MuiPickersUtilsProvider>
    )
}

const PostingDatePicker = ({ posting_date, setPostingDate, setAddButtonClicked, isErrorPostingDate }) => {
    const classes = useStyles();

    const handleposting_date = (date) => {
        setAddButtonClicked(false);
        setPostingDate(date);
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                className={isErrorPostingDate ? classes.ErrorInputBox : classes.InputBox}
                disableToolbar
                placeholder="Posting Date"
                variant="inline"
                error={isErrorPostingDate}
                onChange={handleposting_date}
                format='dd/MM/yyyy'
                invalidDateMessage=''
                value={posting_date}
                InputProps={{
                    disableUnderline: true,
                    color: 'primary',

                }}
            />
        </MuiPickersUtilsProvider>
    )
}

const DocumentCreateDatePicker = ({ document_create_date, setDocumentCreateDate, setAddButtonClicked, isErrorDocumentCreateDate }) => {
    const classes = useStyles();

    const handledocument_create_date = (date) => {
        setAddButtonClicked(false);
        setDocumentCreateDate(date);
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                className={isErrorDocumentCreateDate ? classes.ErrorInputBox : classes.InputBox}
                disableToolbar
                placeholder="Document Create Date"
                variant="inline"
                error={isErrorDocumentCreateDate}
                onChange={handledocument_create_date}
                format='dd/MM/yyyy'
                invalidDateMessage=''
                value={document_create_date}
                InputProps={{
                    disableUnderline: true,
                    color: 'primary',

                }}
            />
        </MuiPickersUtilsProvider>
    )
}

const DueInDatePicker = ({ due_in_date, setDueInDate, setAddButtonClicked, isErrorDueInDate }) => {
    const classes = useStyles();

    const handledue_in_date = (date) => {
        setAddButtonClicked(false);
        setDueInDate(date);
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                className={isErrorDueInDate ? classes.ErrorInputBox : classes.InputBox}
                disableToolbar
                placeholder="Due In Date"
                variant="inline"
                error={isErrorDueInDate}
                onChange={handledue_in_date}
                format='dd/MM/yyyy'
                invalidDateMessage=''
                value={due_in_date}
                InputProps={{
                    disableUnderline: true,
                    color: 'primary',

                }}
            />
        </MuiPickersUtilsProvider>
    )
}

const BaselineCreateDatePicker = ({ baseline_create_date, setBaselineCreateDate, setAddButtonClicked, isErrorBaselineCreateDate }) => {
    const classes = useStyles();

    const handlebaseline_create_date = (date) => {
        setAddButtonClicked(false);
        setBaselineCreateDate(date);
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                className={isErrorBaselineCreateDate ? classes.ErrorInputBox : classes.InputBox}
                disableToolbar
                placeholder="Baseline Create Date"
                variant="inline"
                error={isErrorBaselineCreateDate}
                onChange={handlebaseline_create_date}
                format='dd/MM/yyyy'
                invalidDateMessage=''
                value={baseline_create_date}
                InputProps={{
                    disableUnderline: true,
                    color: 'primary',

                }}
            />
        </MuiPickersUtilsProvider>
    )
}

const AddMenu = ({ 
    business_code, setBusinessCode,
    cust_number, setCustNumber,
    clear_date, setClearDate,
	buisness_year, setBuisnessYear,
    doc_id, setDocId,
	posting_date, setPostingDate,
	document_create_date, setDocumentCreateDate,
	due_in_date, setDueInDate,
	invoice_currency, setInvoiceCurrency,
	document_type, setDocumentType,
	posting_id, setPostingId,
	total_open_amount, setTotalOpenAmount,
	baseline_create_date, setBaselineCreateDate,
    cust_payment_terms, setCustPaymentTerms,
	invoice_id, setInvoiceId,
    addButtonClicked, setAddButtonClicked,
 }) => {

    const classes = useStyles();

    const handlebusiness_code = (event) => {
        setAddButtonClicked(false);
        setBusinessCode(event.target.value);
    }

    const handlecust_number = (event) => {
        setAddButtonClicked(false);
        setCustNumber(event.target.value);
    }

    const handleclear_date = (event) => {
        setAddButtonClicked(false);
        setClearDate(event.target.value);
    }

    const handlebuisness_year = (event) => {
        setAddButtonClicked(false);
        setBuisnessYear(event.target.value);
    }

    const handledoc_id = (event) => {
        setAddButtonClicked(false);
        setDocId(event.target.value);
    }

    const handleposting_date = (event) => {
        setAddButtonClicked(false);
        setPostingDate(event.target.value);
    }

    const handledocument_create_date = (event) => {
        setAddButtonClicked(false);
        setDocumentCreateDate(event.target.value);
    }

    const handledue_in_date = (event) => {
        setAddButtonClicked(false);
        setDueInDate(event.target.value);
    }

    const handleinvoice_currency = (event) => {
        setAddButtonClicked(false);
        setInvoiceCurrency(event.target.value);
    }

    const handledocument_type = (event) => {
        setAddButtonClicked(false);
        setDocumentType(event.target.value);
    }

    const handleposting_id = (event) => {
        setAddButtonClicked(false);
        setPostingId(event.target.value);
    }

    const handletotal_open_amount = (event) => {
        setAddButtonClicked(false);
        setTotalOpenAmount(event.target.value);
    }

    const handlebaseline_create_date = (event) => {
        setAddButtonClicked(false);
        setBaselineCreateDate(event.target.value);
    }

    const handlecust_payment_terms = (event) => {
        setAddButtonClicked(false);
        setCustPaymentTerms(event.target.value);
    }

    const handleinvoice_id = (event) => {
        setAddButtonClicked(false);
        setInvoiceId(event.target.value);
    }

    const isErrorBusinessCode = (business_code === '' && addButtonClicked); 
    const isErrorCustNumber = (cust_number === '' && addButtonClicked);
    const isErrorClearDate = (clear_date === '' && addButtonClicked);
    const isErrorBuisnessYear = (buisness_year === '' && addButtonClicked);
    const isErrorDocId = (doc_id === '' && addButtonClicked);
    const isErrorPostingDate = (posting_date === '' && addButtonClicked);
    const isErrorDocumentCreateDate = (document_create_date === '' && addButtonClicked);
    const isErrorDueInDate = (due_in_date === '' && addButtonClicked);
    const isErrorInvoiceCurrency = (invoice_currency === '' && addButtonClicked);
    const isErrorDocumentType = (document_type  === '' && addButtonClicked);
    const isErrorPostingId = (posting_id === '' && addButtonClicked);
    const isErrorTotalOpenAmount = (total_open_amount === '' && addButtonClicked);
    const isErrorBaselineCreateDate = (baseline_create_date === '' && addButtonClicked);
    const isErrorCustPaymentTerms = (cust_payment_terms === '' && addButtonClicked);
    const isErrorInvoiceId = (invoice_id === '' && addButtonClicked);
    
    return (
        <div style={{ display: 'flex' }}>
            <div className={classes.Column1}>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '30px', paddingTop: '-15px', fontSize: '17px' }}>
                        
                        <div style={{ paddingBottom: '30px' }}>
                            <Input
                                className={isErrorBusinessCode ? classes.ErrorInputBox : classes.InputBox}
                                disableUnderline={true}
                                required={true}
                                value={business_code}
                                onChange={(event) => handlebusiness_code(event)}
                                error={isErrorBusinessCode}
                                placeholder="Buisness Code"
                            >
                            </Input>
                        </div>

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
                                className={isErrorInvoiceCurrency ? classes.ErrorInputBox : classes.InputBox}
                                disableUnderline={true}
                                required={true}
                                value={invoice_currency}
                                onChange={(event) => handleinvoice_currency(event)}
                                error={isErrorInvoiceCurrency}
                                placeholder="Invoice Currency"
                            >
                            </Input>
                        </div>

                        <div style={{ paddingBottom: '30px' }}>
                            <BaselineCreateDatePicker 
                                baseline_create_date={baseline_create_date}
                                setBaselineCreateDate={setBaselineCreateDate}
                                addButtonClicked={addButtonClicked}
                                setAddButtonClicked={setAddButtonClicked}
                                isErrorBaselineCreateDate={isErrorBaselineCreateDate}
                            />
                        </div>

                    </div>
                </div>
            </div>            

                        <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '30px', paddingTop: '-15px', fontSize: '17px' }}>        
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

                        <div style={{ paddingBottom: '30px' }}>
                            <PostingDatePicker 
                                posting_date={posting_date}
                                setPostingDate={setPostingDate}
                                addButtonClicked={addButtonClicked}
                                setAddButtonClicked={setAddButtonClicked}
                                isErrorPostingDate={isErrorPostingDate}
                            />
                        </div>

                        <div style={{ paddingBottom: '30px' }}>
                            <Input
                                className={isErrorDocumentType ? classes.ErrorInputBox : classes.InputBox}
                                disableUnderline={true}
                                required={true}
                                value={document_type}
                                onChange={(event) => handledocument_type(event)}
                                error={isErrorDocumentType}
                                placeholder="Document Type"
                            >
                            </Input>
                        </div>

                        <div style={{ paddingBottom: '30px' }}>
                            <Input
                                className={isErrorCustPaymentTerms ? classes.ErrorInputBox : classes.InputBox}
                                disableUnderline={true}
                                required={true}
                                value={cust_payment_terms}
                                onChange={(event) => handlecust_payment_terms(event)}
                                error={isErrorCustPaymentTerms}
                                placeholder="Customer Payment Terms"
                            >
                            </Input>
                        </div>
                        </div>

                        <div className={classes.column3}>
                        <div style={{ paddingBottom: '30px' }}>
                            <ClearDatePicker 
                                clear_date={clear_date}
                                setClearDate={setClearDate}
                                addButtonClicked={addButtonClicked}
                                setAddButtonClicked={setAddButtonClicked}
                                isErrorClearDate={isErrorClearDate}
                            />
                        </div>

                        <div style={{ paddingBottom: '30px' }}>
                            <DocumentCreateDatePicker 
                                document_create_date={document_create_date}
                                setDocumentCreateDate={setDocumentCreateDate}
                                addButtonClicked={addButtonClicked}
                                setAddButtonClicked={setAddButtonClicked}
                                isErrorDocumentCreateDate={isErrorDocumentCreateDate}
                            />
                        </div>

                        <div style={{ paddingBottom: '30px' }}>
                            <Input
                               className={isErrorPostingId ? classes.ErrorInputBox : classes.InputBox}
                               disableUnderline={true}
                               required={true}
                               value={posting_id}
                               onChange={(event) => handleposting_id(event)}
                               error={isErrorPostingId} 
                               placeholder="Posting Id"
                            >
                            </Input>
                        </div>

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
                        </div>

                        <div>
                        <div className={classes.Column3}>
                        <div style={{ paddingBottom: '30px' }}>
                            <Input
                                className={isErrorBuisnessYear ? classes.ErrorInputBox : classes.InputBox}
                                disableUnderline={true}
                                required={true}
                                value={buisness_year}
                                onChange={(event) => handlebuisness_year(event)}
                                error={isErrorBuisnessYear}
                                placeholder="Business Year"
                            >
                            </Input>
                        </div>

                        <div style={{ paddingBottom: '30px' }}>
                            <DueInDatePicker
                                due_in_date={due_in_date}
                                setDueInDate={setDueInDate}
                                addButtonClicked={addButtonClicked}
                                setAddButtonClicked={setAddButtonClicked}
                                isErrorDueInDate={isErrorDueInDate}
                            />
                        </div>   

                        <div style={{ paddingBottom: '30px' }}>
                            <Input
                                className={isErrorTotalOpenAmount ? classes.ErrorInputBox : classes.InputBox}
                                disableUnderline={true}
                                required={true}
                                value={total_open_amount}
                                onChange={(event) => handletotal_open_amount(event)}
                                error={isErrorTotalOpenAmount}
                                placeholder="Total Open Amount"
                            >
                            </Input>
                        </div>

                    </div>
                </div>
            </div>    
    )
}        
        
const AddInvoicePage = ({ open, setOpen, setDataPageCount, setData }) => {
    const classes = useStyles();
    const [ maxWidth ] = React.useState('lg');
    const [ fullWidth ] = React.useState(false);

    const [ business_code, setBusinessCode ] = React.useState('');
    const [ cust_number, setCustNumber ] = React.useState('');
    const [ clear_date, setClearDate ] = React.useState('');
    const [ buisness_year, setBuisnessYear ] = React.useState('');
    const [ doc_id, setDocId ] = React.useState('');
    const [ posting_date, setPostingDate ] = React.useState('');
    const [ document_create_date, setDocumentCreateDate ] = React.useState('');
    const [ due_in_date, setDueInDate ] = React.useState('');
    const [ invoice_currency, setInvoiceCurrency ] = React.useState('');
    const [ document_type, setDocumentType ] = React.useState('');
    const [ posting_id, setPostingId ] = React.useState('');
    const [ total_open_amount, setTotalOpenAmount ] = React.useState('');
    const [ baseline_create_date, setBaselineCreateDate ] = React.useState('');
    const [ cust_payment_terms, setCustPaymentTerms ] = React.useState('');
    const [ invoice_id, setInvoiceId ] = React.useState('');

    const [ addButtonClicked, setAddButtonClicked ] = React.useState(false);
    const [ openMandatoryFieldsPopUp, setOpenMandatoryFieldsPopUp ] = React.useState(false);

    const handleAddButton = () => {
        setAddButtonClicked(true);
        if(
	        business_code !== '' &&
	        cust_number !== '' &&
	        clear_date !== '' &&
	        buisness_year !== '' &&
	        doc_id !== '' &&
	        posting_date !== '' &&
	        document_create_date !== '' &&
	        due_in_date !== '' &&
	        invoice_currency !== '' &&
	        document_type !== '' &&
	        posting_id !== '' &&
	        total_open_amount !== '' &&
	        baseline_create_date !== '' &&
	        cust_payment_terms !== '' &&
	        invoice_id !== ''
        ) {
            axios.get(
                `http://localhost:8080/HRC40787W/AddInvoice?business_code=${business_code}&cust_number=${cust_number}&clear_date=${moment(clear_date).format('YYYY-MM-DD')}&buisness_year=${buisness_year}&doc_id=${doc_id}&posting_date=${moment(posting_date).format('YYYY-MM-DD')}&document_create_date=${moment(document_create_date).format('YYYY-MM-DD')}&due_in_date=${moment(due_in_date).format('YYYY-MM-DD')}&invoice_currency=${invoice_currency}&document_type=${document_type}&posting_id=${posting_id}&total_open_amount=${total_open_amount}&baseline_create_date=${moment(baseline_create_date).format('YYYY-MM-DD')}&cust_payment_terms=${cust_payment_terms}&invoice_id=${invoice_id}`, 
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
                console.log(response);
                // setData([])
                // setDataPageCount(0);
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
        setAddButtonClicked(false);
        setBusinessCode('');
        setCustNumber('');
        setClearDate('');
        setBuisnessYear('');
        setDocId('');
        setPostingDate('');
        setDocumentCreateDate('');
        setDueInDate('');
        setInvoiceCurrency('');
        setDocumentType('');
        setPostingId('');
        setTotalOpenAmount('');
        setBaselineCreateDate('');
        setCustPaymentTerms('');
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
                                Add Invoice
                            </div>
                            <div className={classes.TopRightMenu}>
                                <IconButton onClick={handleClose}>
                                    <CloseIcon/>
                                </IconButton>
                            </div>
                        </div>
                    </MuiDialogTitle>
                    <MuiDialogContent className={classes.Body}>
                        <AddMenu
                            business_code={business_code} setBusinessCode={setBusinessCode}
                            cust_number={cust_number} setCustNumber={setCustNumber}
                            clear_date={clear_date} setClearDate={setClearDate}
                            buisness_year={buisness_year} setBuisnessYear={setBuisnessYear}
                            doc_id={doc_id} setDocId={setDocId}
                            posting_date={posting_date} setPostingDate={setPostingDate}
                            document_create_date={document_create_date} setDocumentCreateDate={setDocumentCreateDate}
                            due_in_date={due_in_date} setDueInDate={setDueInDate}
                            invoice_currency={invoice_currency} setInvoiceCurrency={setInvoiceCurrency}
                            document_type={document_type} setDocumentType={setDocumentType}
                            posting_id={posting_id} setPostingId={setPostingId}
                            total_open_amount={total_open_amount} setTotalOpenAmount={setTotalOpenAmount}
                            baseline_create_date={baseline_create_date} setBaselineCreateDate={setBaselineCreateDate}
                            cust_payment_terms={cust_payment_terms} setCustPaymentTerms={setCustPaymentTerms}
                            invoice_id={invoice_id} setInvoiceId={setInvoiceId}
                            addButtonClicked={addButtonClicked} setAddButtonClicked={setAddButtonClicked}
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
                            <Button autofocus className={classes.AddButton} onClick={handleAddButton}>Add</Button>
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

export default AddInvoicePage;