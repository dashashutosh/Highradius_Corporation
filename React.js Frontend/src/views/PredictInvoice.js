import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { Dialog, IconButton, Button } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

callPredict = () => {
    this.state.records.map(k =>{
      //const records = this.state.records;
      console.log(k)
      axios.post('http://127.0.0.1:5000/predict?',
      {},
      {
          headers : {'Content-type':'application/json'},
          params : {
          data : {
            id : '1705819',
            data : k
          }
        }
      })
      .then(response=>{
        console.log('In response')
        console.log('Responsed data',response.data)

        const records = this.state.tabledata
        records.map(a=>{
          if(a.documentNumber === response.data[0].documentNumber)
          {
            var b = a.actualOpenAmount - response.data[0].predictions
            console.log(b);
            a['predictedAmount'] = response.data[0].predictions
            if(b<=0)
            {
              a['predictedPaymentType']="Fully paid";
              console.log("Fully paid");
            }
            else{
              a['predictedPaymentType']="Partially paid";
              console.log("Partially paid");
            }
          }
        })
    
        this.setState({data: records})
      })
      .catch(error => console.log(error.message))
    })
  }
