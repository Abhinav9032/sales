import React, { useState } from "react";

import { TextField, Button,Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";

import { useForm, Controller } from "react-hook-form";
import SalesFilter from "./SalesFilter";
const useStyles = makeStyles((theme) => ({
  inputField: {
    width: "100%",
    margin: theme.spacing(1, 0),
  },
  input: {
    display: "none",
  },
}));

const Sales = () => {
  const classes = useStyles();
  const { register, handleSubmit, control, errors } = useForm();

  const [firstSaleBottonColor, setFirstSaleBottonColor] = useState("secondary");
  const [secondSaleBottonColor, setSecondSaleBottonColor] =
    useState("secondary");
  const handleFirstSaleBotton = () => {
    setFirstSaleBottonColor("primary");
    setSecondSaleBottonColor("secondary");
  };
  const handleSecondSaleBotton = () => {
    setSecondSaleBottonColor("primary");
    setFirstSaleBottonColor("secondary");
  };
  const onSubmit = (data) => console.log(data); 
  const stateOptions = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
  ];
  return (
    <>
      <div
        style={{
        
          marginLeft: "5rem",
          marginRight: "5rem",
          marginTop: "2rem",
        }}
      >
      <Paper elevation={3}  style={{ padding:'1rem' }} >
        <div
          className="sales_header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",           
          }}
        >
          <div
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "0.5rem",
            }}
          >
            <label>ORDER ENTRY</label>
          </div>
          <div>
            <Button
              variant="contained"
              color={firstSaleBottonColor}
              style={{ marginRight: "1rem" }}
              onClick={handleFirstSaleBotton}
            >
              FIRST SALE
            </Button>
            <Button
              variant="contained"
              color={secondSaleBottonColor}
              onClick={handleSecondSaleBotton}
            >
              SECOND SALE
            </Button>
          </div>
        </div>
        </Paper>
        <div
          style={{  marginTop: "2rem" }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
          <Paper elevation={3}  style={{ padding:'1rem' }} >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Autocomplete
                  id="combo-box-demo"
                  options={stateOptions}
                  getOptionLabel={(option) => option.title}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="State"
                      name="state"
                      inputRef={register({
                        required: "Plese Select State",
                      })}
                      error={Boolean(errors.state)}
                      helperText={errors.state?.message}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  id="combo-box-demo"
                  options={stateOptions}
                  getOptionLabel={(option) => option.title}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Warehouse"
                      name="warehouse"
                      inputRef={register({
                        required: "Plese Select Warehouse",
                      })}
                      error={Boolean(errors.warehouse)}
                      helperText={errors.warehouse?.message}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  id="combo-box-demo"
                  options={stateOptions}
                  getOptionLabel={(option) => option.title}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Pin"
                      name="pin"
                      inputRef={register({
                        required: "Plese Select Pin",
                      })}
                      error={Boolean(errors.pin)}
                      helperText={errors.pin?.message}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Autocomplete
                  id="combo-box-demo"
                  options={stateOptions}
                  getOptionLabel={(option) => option.title}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      name="category"
                      inputRef={register({
                        required: "Plese Select Category",
                      })}
                      error={Boolean(errors.category)}
                      helperText={errors.category?.message}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  id="combo-box-demo"
                  options={stateOptions}
                  getOptionLabel={(option) => option.title}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Item"
                      name="item"
                      inputRef={register({
                        required: "Plese Select Item",
                      })}
                      error={Boolean(errors.item)}
                      helperText={errors.item?.message}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  id="combo-box-demo"
                  options={stateOptions}
                  getOptionLabel={(option) => option.title}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sub-Item"
                      name="subItem"
                      inputRef={register({
                        required: "Plese Select Sub-Item",
                      })}
                      error={Boolean(errors.subItem)}
                      helperText={errors.subItem?.message}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Autocomplete
                  id="combo-box-demo"
                  options={stateOptions}
                  getOptionLabel={(option) => option.title}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Employee Name"
                      name="employeeName"
                      inputRef={register({
                        required: "Plese Select Name",
                      })}
                      error={Boolean(errors.employeeName)}
                      helperText={errors.employeeName?.message}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  id="combo-box-demo"
                  options={stateOptions}
                  getOptionLabel={(option) => option.title}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Employee Code"
                      name="employeeCode"
                      inputRef={register({
                        required: "Plese Select State",
                      })}
                      error={Boolean(errors.employeeCode)}
                      helperText={errors.employeeCode?.message}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {/* 5) Date Picker */}
                <Grid item xs={3}>
                  <Controller
                    render={(props) => (
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        label="Delivery Date"
                        value={props.value}
                        onChange={props.onChange}
                        fullWidth
                        error={Boolean(errors.deliveryDate)}
                        helperText={errors.deliveryDate?.message}
                      />
                    )}
                    name="deliveryDate"
                    defaultValue={null}
                    control={control}
                    rules={{
                      required: "Date is required.",
                    }}
                  />
                </Grid>
                {/* 4) Time Picker */}
                <Grid item xs={3}>
                  <Controller
                    render={(props) => (
                      <KeyboardTimePicker
                        margin="normal"
                        label="Delivery Time"
                        value={props.value}
                        onChange={props.onChange}
                        fullWidth
                        error={Boolean(errors.deliveryTime)}
                        helperText={errors.deliveryTime?.message}
                      />
                    )}
                    name="deliveryTime"
                    defaultValue={null}
                    control={control}
                    rules={{
                      required: "Time  is required.",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>

              <Grid item xs={3}>
                <TextField
                  placeholder="Enter Your E-mail Address"
                  label="P.O/Ref No"
                  variant="outlined"
                  fullWidth
                  className={classes.inputField}
                  name="poRefNo"
                  inputRef={register({
                    required: "P.O/Ref No is Required",
                  })}
                  error={Boolean(errors.poRefNo)}
                  helperText={errors.poRefNo?.message}
                />
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={3}>
                  <Controller
                    render={(props) => (
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        label="P.O/Ref Date"
                        value={props.value}
                        onChange={props.onChange}
                        fullWidth
                        error={Boolean(errors.poDate)}
                        helperText={errors.poDate?.message}
                      />
                    )}
                    name="poDate"
                    defaultValue={null}
                    control={control}
                    rules={{
                      required: "Date is required.",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            {/* Customer            */}
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Autocomplete
                  id="combo-box-demo"
                  options={stateOptions}
                  getOptionLabel={(option) => option.title}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Customer Name"
                      name="customerName"
                      inputRef={register({
                        required: "Plese Select Name",
                      })}
                      error={Boolean(errors.customerName)}
                      helperText={errors.customerName?.message}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  id="combo-box-demo"
                  options={stateOptions}
                  getOptionLabel={(option) => option.title}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Customer Code"
                      name="customerCode"
                      inputRef={register({
                        required: "Plaese Select Code ",
                      })}
                      error={Boolean(errors.customerCode)}
                      helperText={errors.customerCode?.message}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
            </Grid>
            {/* category */}
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  placeholder="Enter Your E-mail Address"
                  label="Category"
                  variant="outlined"
                  fullWidth
                  className={classes.inputField}
                  // name="poRefNo"
                  // inputRef={register({
                  //   required: "P.O/Ref No is Required",
                  // })}
                  // error={Boolean(errors.poRefNo)}
                  // helperText={errors.poRefNo?.message}
                  read
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  placeholder="Enter Your E-mail Address"
                  label="Item"
                  variant="outlined"
                  fullWidth
                  className={classes.inputField}
                  // name="poRefNo"
                  // inputRef={register({
                  //   required: "P.O/Ref No is Required",
                  // })}
                  // error={Boolean(errors.poRefNo)}
                  // helperText={errors.poRefNo?.message}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  placeholder="Enter Your E-mail Address"
                  label="Sub-Item"
                  variant="outlined"
                  fullWidth
                  className={classes.inputField}
                  // name="poRefNo"
                  // inputRef={register({
                  //   required: "P.O/Ref No is Required",
                  // })}
                  // error={Boolean(errors.poRefNo)}
                  // helperText={errors.poRefNo?.message}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  placeholder="Enter Your E-mail Address"
                  label="Quantity"
                  variant="outlined"
                  fullWidth
                  className={classes.inputField}
                  name="quantity"
                  inputRef={register({
                    required: "P.O/Quantity is Required",
                  })}
                  error={Boolean(errors.quantity)}
                  helperText={errors.quantity?.message}
                />
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  id="combo-box-demo"
                  options={stateOptions}
                  getOptionLabel={(option) => option.title}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Unit"
                      name="unit"
                      inputRef={register({
                        required: "Plese Select Unit",
                      })}
                      error={Boolean(errors.unit)}
                      helperText={errors.unit?.message}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  placeholder="Enter Your E-mail Address"
                  label="Price"
                  variant="outlined"
                  fullWidth
                  className={classes.inputField}
                  name="price"
                  inputRef={register({
                    required: "Price  is Required",
                  })}
                  error={Boolean(errors.price)}
                  helperText={errors.price?.message}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  placeholder="Enter Your E-mail Address"
                  label="Total Price"
                  variant="outlined"
                  fullWidth
                  className={classes.inputField}
                  // name="poRefNo"
                  // inputRef={register({
                  //   required: "P.O/Ref No is Required",
                  // })}
                  // error={Boolean(errors.poRefNo)}
                  // helperText={errors.poRefNo?.message}
                />
              </Grid>
              <Grid item xs={3}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  // display="none",
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    style={{ width: "100%" }}
                    color="primary"
                    component="span"
                  >
                    Upload
                  </Button>
                </label>
              </Grid>
            </Grid>
           
           
            <Grid
              container
              spacing={2}
              style={{ marginTop: "20px", marginBottom: "1.5rem" }}
            >
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ width: "100%" }}
                  // onClick={handleFirstSaleBotton}
                >
                  ADD SALE
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%" }}
                  // onClick={handleFirstSaleBotton}
                >
                  PREVIEW
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%" }}
                  // onClick={handleFirstSaleBotton}
                >
                  PLACE ORDER
                </Button>
              </Grid>
            </Grid>
            </Paper>
          </form>
        </div>
      </div>
     
    <SalesFilter />
    </>
  );
};

export default Sales;
