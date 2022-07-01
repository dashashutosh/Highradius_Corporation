import React from 'react';
import axios from 'axios';
import { Hidden, makeStyles } from '@material-ui/core';
import { ABCLogo, HRCLogo, SearchIcon, EditIcon, RefreshIcon } from '../assets'
import { pxToRem } from '../utils/theme';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@material-ui/core';
import { AppBar, Toolbar, Button, Input, InputAdornment, Checkbox } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AddInvoicePage, DeleteInvoicePage, EditInvoicePage, AdvanceSearchInvoice } from '../views';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Footer from '../components/Footer';
import TablePagination from '@mui/material/TablePagination';

const useStyles = makeStyles((theme) => ({
    LandingPage: {
        display: 'flex',
        flexDirection: 'column',
        disable: 'overflow'
    },
    Header: {
        display: 'flex',
        paddingBlock: '5px',
        width: 1553.620,
    },
    ABCContainer: {
        display: 'flex',
    },
    ABCLogo: {
        top: pxToRem('20px'),
        left: pxToRem('30px'),
        width: pxToRem('44px'),
        height: pxToRem('46px'),
        paddingLeft: '5px',
        opacity: 1,
        fill: '#CD7925',
    },
    ABCText: {
        font: 'Futura PT',
        fontSize: '39px',
        fontWeight: 'bold',
        color: '#FFFFFF',
        paddingLeft: '10px',
        verticalAlign: 'center',
    },
    HRCLogo: {
        position: 'absolute',
        top: '0%',
        textAlign: 'center',
        paddingBlock: '10px',
        width: window.innerWidth - 40,
    },
    InvoiceList: {
        font: 'Ubuntu',
        fontSize: '20px',
        color: '#FFFFFF',
        paddingTop: '10px',
        paddingBottom: '20px',
        paddingLeft: '20px',
        width: '200px',
    },
    ToolBar: {
        display: 'flex',    
        width: window.innerWidth - 40,
        position: 'static',
        background: '#273D49CC',
        boxShadow: 'none', 
        borderBottom: 'none',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    TableBox: {
        width: window.innerWidth - 40,
        background: '#273D49CC',
        paddinLeft: '20px',
        paddingBottom: '20px',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    DataTable: {
        width: window.innerWidth - 80,
        paddingLeft: '20px',
        paddingBottom: '20px',
        opacity: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    tableHeading: {
        backgroundColor: '#273D49CC',
        color: '#97A1A9',
        fontSize: '15px',
        borderBottom: 'none',
        opacity: '100%',
        
    },
    tableBody: {
        
        "&:nth-of-type(odd)": {
            backgroundColor: '#273D49CC',
        },
        "&:nth-of-type(even)": {
            backgroundColor: "#283A46"
        },
        color: '#FFFFFF',
        fontSize: '16px',
        "&$selected, &$selected:hover": {
            backgroundColor: '#2A5368'
        },
        borderRadius: 10,
        
    },
    hover: {},
    selected: {},
    tableRow: {
        color: '#FFFFFF',
        borderBottom: 'none',
        height: '10px',
    },
    searchByInvoiceNumber: {
        color: 'black',
        borderBottom: 'none',
        border: '1px solid #356680',
        background: 'white',
        borderRadius: 10,
        paddingLeft: '10px',
        paddingRight: '10px',
        disableUnderline: true,
        height: '45px',
        borderBottom: '1px solid #356680',
        width: '340px',
    },
    Button: {
        color: '#FFFFFF',
        border: '1px solid #14AFF1',
        borderRadius: 10,
        textTransform: 'none',
        height: '45px',
        padding: '15px',
    },
    button: {
        color: '#F8F8F8',
        border: '1px solid #97A1A9',
        borderRadius: 10,
        textTransform: 'none',
        height: '45px',
        padding: '15px',
    },
    DisabledButton: {
        color: '#97A1A9',
        border: '1px solid #97A1A9',
        borderRadius: 10,
        textTransform: 'none',
        height: '45px',
        padding: '15px',
    },
    checkbox: {
        root: {
            color: '#14AFF1',
            '&$checked': {
                color: '#14AFF1',
            },
        },
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
}));

const Header = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.Header}>
            <div className={classes.ABCContainer}>
                <div className={classes.ABCLogo}>
                    <ABCLogo/> 
                </div>
            </div>
            <div className={classes.HRCLogo}>
                <HRCLogo/>
            </div>
        </div>
    )
}

const DataTable = ({
    data, setData,
    selected, setSelected,
    searchKeyword, searchResults,
    searchPageCount, setSearchPageCount,
    dataPageCount, setDataPageCount
}) => {
    const classes = useStyles();
    const [ isNext, setNext ] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const loadMoreData = () => {
        if(viewSearchResults) {
            setSearchPageCount(searchPageCount + 1);
            if(dataPageCount !== 0) {
                setDataPageCount(0);
            }
        }
        else {
            setDataPageCount(dataPageCount + 1);
            if(searchPageCount !== 0) {
                setSearchPageCount(0);
            }
        }
    }

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = data.map(n => n['sl_no']);
            setSelected(newSelecteds);
        }
        else {
            setSelected([]);
        }
    };

    const handleClick = (event, sl_no) => {
        const selectedIndex = selected.indexOf(sl_no);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, sl_no);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
          );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);

    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };



    React.useEffect(() => {
        if(dataPageCount !== -1) {
            setNext(true);
            axios.get(`http://localhost:8080/HRC40787W/FetchServlet`)
            .then((response) => {
                setData((prev) => [...prev, ...response.data]);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [ dataPageCount ]);

    const isSelected = (sl_no) => selected.indexOf(sl_no) !== -1;
    const dataLength = data === undefined ? 0 : data.length;
    const selectedLength = selected === undefined ? 0 : selected.length;
    const searchResultsLength = searchResults === undefined ? 0 : searchResults.length;
    const viewSearchResults = searchKeyword !== '';

    return (
        <div style={{ paddingLeft: '20px' }}>
            <div className={classes.TableBox}>
                <TableContainer id="data-table" style={{ height: (window.innerHeight - 280), width: (window.innerWidth - 50), overflow: 'scroll', overflowX: 'hidden' }}>
                    <InfiniteScroll
                        scrollableTarget="data-table"
                        dataLength={viewSearchResults ? searchResultsLength : dataLength}
                        hasMore={isNext}
                        
                    >
                        <Table className={classes.DataTable} stickyHeader aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            indeterminate={selectedLength > 0 && selectedLength < dataLength}
                                            checked={dataLength > 0 && selectedLength === dataLength}
                                            onChange={handleSelectAllClick}
                                            inputProps={{ 'aria-label': 'select all desserts' }}
                                            className={classes.checkbox}
                                            disableRipple={true}
                                            size='small'
                                        />
                                    </TableCell>
                                    <TableCell key={'sl_no'} className={classes.tableHeading}>Sl no</TableCell>
                                    <TableCell key={'business_code'} className={classes.tableHeading}>Business Code</TableCell>
                                    <TableCell key={'cust_number'} className={classes.tableHeading}>Customer Number</TableCell>
                                    <TableCell key={'clear_date'} className={classes.tableHeading}>Clear Date</TableCell>
                                    <TableCell key={'business_year'} className={classes.tableHeading} align="right">Business Year</TableCell>
                                    <TableCell key={'doc_id'} className={classes.tableHeading} align="right">Document Id</TableCell>
                                    <TableCell key={'posting_date'} className={classes.tableHeading} align="right">Posting Date</TableCell>
                                    <TableCell key={'document_create_date'} className={classes.tableHeading}>Document Create Date</TableCell>
                                    <TableCell key={'due_in_date'} className={classes.tableHeading}>Due Date</TableCell>
                                    <TableCell key={'invoice_currency'} className={classes.tableHeading}>Invoice Currency</TableCell>
                                    <TableCell key={'document_type'} className={classes.tableHeading}>Document Type</TableCell>
                                    <TableCell key={'posting_id'} className={classes.tableHeading}>Posting Id</TableCell>
                                    <TableCell key={'total_open_amount'} className={classes.tableHeading} align="right">Total Open Amount</TableCell>
                                    <TableCell key={'baseline_create_date'} className={classes.tableHeading} align="right">Baseline Create Date</TableCell>
                                    <TableCell key={'cust_payment_terms'} className={classes.tableHeading} align="right">Customer Payment Terms</TableCell>
                                    <TableCell key={'invoice_id'} className={classes.tableHeading} align="right">Invoice Id</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody component="th" scope="row">
                                {(searchKeyword === '' ? data : searchResults)
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                    const isItemSelected = isSelected(row['sl_no']);
                                    return (
                                        
                                        <TableRow 
                                            className={classes.tableBody} 
                                            classes={{ hover: classes.hover, selected: classes.selected }}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    onClick={(event) => handleClick(event, row['sl_no'])}
                                                    className={classes.tableRow}
                                                    ClassName={classes.checkbox}
                                                    disableRipple={true}
                                                    size='small'
                                                />
                                            </TableCell>
                                            <TableCell className={classes.tableRow}>{row['sl_no']}</TableCell>
                                            <TableCell className={classes.tableRow}>{row['business_code']}</TableCell>
                                            <TableCell className={classes.tableRow}>{row['cust_number']}</TableCell>
                                            <TableCell className={classes.tableRow} align="right">{row['clear_date'] === '' || row['clear_date'] === null ? '--' : row['clear_date']}</TableCell>
                                            <TableCell className={classes.tableRow}>{row['buisness_year']}</TableCell>
                                            <TableCell className={classes.tableRow}>{row['doc_id']}</TableCell>
                                            <TableCell className={classes.tableRow}>{row['posting_date']}</TableCell>
                                            <TableCell className={classes.tableRow}>{row['document_create_date']}</TableCell>
                                            <TableCell className={classes.tableRow}>{row['due_in_date']}</TableCell>
                                            <TableCell className={classes.tableRow}>{row['invoice_currency']}</TableCell>
                                            <TableCell className={classes.tableRow}>{row['document_type']}</TableCell>
                                            <TableCell className={classes.tableRow} align="right">{row['posting_id']}</TableCell>
                                            <TableCell className={classes.tableRow} align="right">{row['total_open_amount']}</TableCell>
                                            <TableCell className={classes.tableRow} align="right">{row['baseline_create_date']}</TableCell>
                                            <TableCell className={classes.tableRow} align="right">{row['cust_payment_terms']}</TableCell>
                                            <TableCell className={classes.tableRow} align="right">{row['invoice_id']}</TableCell>
                                        </TableRow> 
                                          
                                    );
                                })}
                                 
                            </TableBody>
                            
                        </Table>
                        
                    </InfiniteScroll>
                   
                </TableContainer>
                <TablePagination
                            component="div"
                            count={data.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        
                /> 
                
            </div>
            
        </div>
    )
}

const Bar = ({ 
    data, setData,
    selected, setSelected,
    searchKeyword, setSearchKeyword,
    searchResults, setSearchResults,
    searchPageCount, setSearchPageCount,
    setDataPageCount
 }) => {
    const classes = useStyles();
    const [ openAddInvoice, setOpenAddInvoice ] = React.useState(false);
    const [ openDeleteInvoice, setOpenDeleteInvoice ] = React.useState(false);
    const [ openEditInvoice, setOpenEditInvoice ] = React.useState(false);
    const [ OpenAdvanceSearchInvoice, setOpenAdvanceSearchInvoice ] = React.useState(false);
    
    const [ selectedInvoiceDetails, setSelectedInvoiceDetails ] = React.useState([]);
    

    const handleAddInvoice = () => {
        setOpenAddInvoice(true);
    }

    const handleDeleteInvoice = () => {
        setOpenDeleteInvoice(true);
    }

    const handleEditInvoice = () => {
        setOpenEditInvoice(true);
    }

    const handleAdvanceSearch = () => {
        setOpenAdvanceSearchInvoice(true);
    }

    const handleSearch = (event) => {
        setSearchKeyword(event.target.value);
        setSearchPageCount(0);
        setSearchResults([]);
    }

    React.useEffect(() => {
        axios.get(`http://localhost:8080/HRC40787W/SearchInvoice?cust_number=${searchKeyword}`)
        .then((response) => {
            setSearchResults([...searchResults, ...response.data]);
        })
        .catch((error) => {
            console.log(error)
        })
        console.log(searchKeyword)
    }, [ searchKeyword, searchPageCount ])

    React.useEffect(() => {
        setSelectedInvoiceDetails(data.filter(row => selected.indexOf(row['sl_no']) != -1));
        
    }, [ selected ])

    const isDisabledEditButton = (selected.length !== 1);
    const isDisabledDeleteButton = (selected.length === 0);
    const isDisabledPredictButton = (selected.length === 0);
    
    console.log(selectedInvoiceDetails);
    return (
        <AppBar className={classes.ToolBar}>
            <Toolbar style={{ display: 'flex' }}>
                <div style={{ display: 'flex' }}>
                    <div style={{ paddingLeft: '10px', paddingTop: '10px', }}>
                        <Button 
                            className={isDisabledPredictButton ? classes.DisabledButton : classes.Button}
                            disabled={isDisabledPredictButton}
                        >
                            PREDICT
                        </Button>
                    </div>
                    <div style={{ paddingLeft: '10px', paddingTop: '10px', }}>
                        <Button
                            className={isDisabledPredictButton ? classes.DisabledButton : classes.Button}
                            disabled={isDisabledPredictButton}
                        >
                            ANALYTICS VIEW
                        </Button>
                    </div>
                    
                    <div style={{ paddingLeft: '10px', paddingTop: '10px'}}>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button   
                            className={classes.button} 
                            onClick={handleAdvanceSearch}
                        >   
                            ADVANCE SEARCH
                        </Button>
                        <AdvanceSearchInvoice 
                            open={OpenAdvanceSearchInvoice} setOpen={setOpenAdvanceSearchInvoice}
                            setDataPageCount={setDataPageCount} setData={setData}
                            setSearchResults={setSearchResults} searchResults={searchResults}
                        /> 
                        </ButtonGroup>
                    </div>

                    <div style={{ paddingLeft: '10px', paddingTop: '10px'}}>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button onClick={() => window.location.reload(false)}
                        className={classes.button}
                        
                    >
                            ⟳
                    </Button>
                    </ButtonGroup>
                    </div>
                
                <div style={{ position: 'fixed', right: 60, display: 'flex' }}>
                <div style={{ paddingTop: '10px', }}>
                        <Input
                            className={classes.searchByInvoiceNumber}
                            placeholder='Search Customer Id'
                            disableUnderline={true}
                            value={searchKeyword}
                            onChange={(event) => handleSearch(event)}
                            startAdornment={
                                <InputAdornment position='start'>
                                    <SearchIcon/>
                                </InputAdornment>
                            }
                        ></Input>
                    </div>
                    <ButtonGroup color="primary" >
                    <div style={{ paddingLeft: '10px', paddingTop: '10px', }}>        
                    <Button    
                            className={classes.button} 
                            onClick={handleAddInvoice}
                        >
                            ADD    
                        </Button>
                    </div>

                        <AddInvoicePage 
                            open={openAddInvoice} setOpen={setOpenAddInvoice}
                            setDataPageCount={setDataPageCount} setData={setData}
                        />

                        <div style={{ paddingLeft: '10px', paddingTop: '10px', }}>
                        <Button
                            className={isDisabledEditButton ? classes.DisabledButton : classes.Button} 
                            onClick={handleEditInvoice}
                            disabled={isDisabledEditButton}
                        >
                           
                            EDIT
                        </Button>
                        </div>
                        <EditInvoicePage 
                            open={openEditInvoice} setOpen={setOpenEditInvoice}
                            selectedInvoiceDetails={selectedInvoiceDetails}
                            setDataPageCount={setDataPageCount} setData={setData}
                        />

                        <div style={{ paddingLeft: '10px', paddingTop: '10px', }}>
                        <Button 
                            className={isDisabledDeleteButton ? classes.DisabledButton : classes.Button} 
                            onClick={handleDeleteInvoice}
                            disabled={isDisabledDeleteButton}
                        >
                            DELETE
                        </Button>
                        </div>
                        <DeleteInvoicePage 
                            open={openDeleteInvoice} setOpen={setOpenDeleteInvoice}
                            selected={selected}
                            setDataPageCount={setDataPageCount}
                        />
                    </ButtonGroup>
                        
                    </div>
                </div>    
                
            </Toolbar>
        </AppBar>
    )
}

const LandingPage = () => {
    const classes = useStyles();
    const [ data, setData ] = React.useState([]);
    const [ dataPageCount, setDataPageCount ] = React.useState(0);
    const [ selected, setSelected ] = React.useState([]);

    const [ searchKeyword, setSearchKeyword ] = React.useState('');
    const [ searchResults, setSearchResults ] = React.useState([]);
    const [ searchPageCount, setSearchPageCount ] = React.useState(0);

    return (
        <div className={classes.LandingPage}>
            <div style={{paddingLeft: '20px'}}>
                <Header/>
            </div>
            <div className={classes.InvoiceList}>
                Invoice List
            </div>
            <div className={classes.InvoiceTable}>
                <div style={{ paddingLeft: '19px' }}>
                    <Bar
                        data={data} setData={setData}
                        selected={selected} setSelected={setSelected}
                        searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}
                        searchResults={searchResults} setSearchResults={setSearchResults}
                        searchPageCount={searchPageCount} setSearchPageCount={setSearchPageCount}
                        setDataPageCount={setDataPageCount}
                    />
                </div>
                <div>
                    <DataTable
                        data={data} setData={setData}
                        selected={selected} setSelected={setSelected}
                        searchKeyword={searchKeyword} searchResults={searchResults}
                        searchPageCount={searchPageCount} setSearchPageCount={setSearchPageCount}
                        dataPageCount={dataPageCount} setDataPageCount={setDataPageCount}
                    />
                    
                </div>
                
            </div>
            <Footer/>
        </div>
    )
}

export default LandingPage;