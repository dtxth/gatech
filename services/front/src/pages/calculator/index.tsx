import * as React from 'react';
import { CalculaterResponse, CalculaterRequest } from '../../types'
import Layout from '../../components/Layout'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import clsx from 'clsx';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    wrapper: {
      padiingTop: "140px",
      position: 'relative',
    },    
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },    
  }),
);

const toFixed = (data) => {
  if(data){
      return Number(data).toFixed(2);
  }
  return data;
}

export default function Calculator() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [state, setState] = React.useState<CalculaterRequest>({amount: null, cost:null, region: null });
  const [response, setResponse] = React.useState<CalculaterResponse>({discount: null, discounted_cost: null, tax: null, total_cost: null});
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState<boolean>(false);

  const handleCalculate = async (event) => {
    event.preventDefault()

    if(state.amount && state.cost && state.region){
      setLoading(true);

      const res = await fetch(`/api/calculator`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      })

      let data  = await res.json()
      if (res.status == 200){
        setResponse(data);
        setSuccess(true);
      }else{
        setError(data["error"]);
        setSuccess(false);
      }
    }else{ 
      setError("Check All Data")
    }
    setLoading(false);
  }

  const handleChange = (event) => {
    setError("");
    let updatedValue = {}
    updatedValue[event.target.id] = event.target.value;
    setState({...state, ...updatedValue});
  }

  return (
    <Layout>
        <div>
          <form className={classes.root}>
            <TextField id="amount" label="Amount" value={state.amount} onChange={handleChange} disabled={loading}/>
            <TextField id="cost" label="Cost $" value={state.cost} onChange={handleChange} disabled={loading}/>
            <TextField id="region" label="Region" value={state.region} onChange={handleChange} disabled={loading}/>
          </form>        
          <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  disabled={loading}
                  onClick={handleCalculate}
                >
                   Calculate
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
        </div>
        <p style={{color:"red", fontSize:"2em"}}>{error}</p>
          { success &&
            <p style={{fontSize:"1em"}}>
            <p>discount: <b>{toFixed(response.discount)}</b>%</p>
            <p>discounted cost: <b>{toFixed(response.discounted_cost)}</b></p>
            <p>tax: <b>{toFixed(response.tax)}</b>%</p>
            <p>total cost: <b>{toFixed(response.total_cost)}</b></p>
          
          </p> }

 
    </Layout>
  );
}