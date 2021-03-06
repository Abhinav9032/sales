import React, { useState, useEffect } from "react";

import { TextField, Button, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ViewSales from "./ViewSales";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Alert from "@material-ui/lab/Alert";
import MaterialTable from "material-table";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { forwardRef } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { useForm, Controller } from "react-hook-form";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SERVICE_URL } from "../UrlTogglerUtil";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  inputField: {
    width: "100%",
    margin: theme.spacing(1, 0),
  },
  input: {
    display: "none",
  },
}));
const SalesTable = (props) => {
  const { state, pin, warehouse, salesTableRecords,setSalesTableRecord } = props;
  const classes = useStyles();
  const { register, handleSubmit, control, errors } = useForm();
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [selectedRowByCheckbox, setSelectedRowByCheckBox] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [salesTableData, setSalesTableData] = useState([]);
  const [isDisableDeleteButton,setDisableDeleteButton]=useState(false)
  const onSubmit = (data) => console.log(data);
 
  const [isViewSalesVisible, setViewSalesVisible] = useState(false);
  const [suceessMessage, setSucessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [selectedSaleIdForView, setSelectedSaleIdForView] = useState();
  
  const colums = [
    { title: "SL.No", field: "slNo" },
    { title: "DATE/TIME", field: "createdOn" },
    {
      title: "ORDER ID",
      field: "salesId",
    },
    { title: "EMPLOYEE NAME", field: "employeeName" },
    { title: "EMPLOYEE CODE", field: "employeeCode" },
    { title: "CUSTOMER NAME", field: "customerName" },
    { title: "CUSTOMER CODE", field: "customerCode" },
    { title: "CATEGORY", field: "saleType" },
    {
      title: "TOTAL VALUE",
      field: "totalSalesValue",
      type: "currency",
      currencySetting: { currencyCode: "INR" },
    },
  ];
  const stateOptions = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
  ];

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  const handleRowClick = (e, data) => {
    console.log(data);
    setSelectedSaleIdForView(data.salesId);
    setViewSalesVisible(true);
  };
  const handleCheckBoxSelection = (data) => {
    console.log(data);
    if (data.length > 0) {
      setSelectedRowByCheckBox(data);
      setShowDeleteButton(true);
    } else {
      setShowDeleteButton(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteRowShowModal = () => {
    setOpen(true);
  };
  const handleDeleteConfirm = () => {
    setDisableDeleteButton(true)
    const salesId = selectedRowByCheckbox.map((i) => i.salesId);
    axios({
      method: "post",
      url: SERVICE_URL + "/sales/dashboard/deleteSales",
      data: {
        salesIdList: salesId,
      },
    })
      .then((response) => {        
        setDisableDeleteButton(false)
        const updateSalesTable = salesTableRecords.filter(
          (obj1) =>
            !selectedRowByCheckbox.some((obj2) => obj1.salesId === obj2.salesId)
        );
        setSalesTableRecord(updateSalesTable);
        setShowDeleteButton(false)
       alert('Sucessful!')
      })
      .catch((err) => {
        setErrorMessage(true);
      })
      .finally(() => {
        setOpen(false);
      });
  };
  console.log("table records", salesTableRecords);
  return (
    <>
      <div
        style={{
          marginLeft: "5rem",
          marginRight: "5rem",
          marginTop: "2rem",
        }}
      >
        <div style={{ marginTop: "2rem" }}>
          <Paper elevation={3} style={{ padding: "1rem" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Autocomplete
                    id="combo-box-demo"
                    size="small"
                    options={state}
                    getOptionLabel={state}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="State"
                        name="state"
                        inputRef={register({
                          //   required: "Plese Select State",
                        })}
                        // error={Boolean(errors.state)}
                        // helperText={errors.state?.message}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                  size="small"
                    id="combo-box-demo"
                    options={warehouse}
                    getOptionLabel={(option) => option.title}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Warehouse"
                        name="warehouse"
                        inputRef={register({
                          //   required: "Plese Select Warehouse",
                        })}
                        // error={Boolean(errors.warehouse)}
                        // helperText={errors.warehouse?.message}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                  size="small"
                    id="combo-box-demo"
                    options={pin}
                    getOptionLabel={(option) => option.title}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Pin"
                        name="pin"
                        inputRef={register({
                          //   required: "Plese Select Pin",
                        })}
                        // error={Boolean(errors.pin)}
                        // helperText={errors.pin?.message}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={3}>
                  <Autocomplete
                    id="combo-box-demo"
                    size="small"
                    options={stateOptions}
                    getOptionLabel={(option) => option.title}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category"
                        name="category"
                        inputRef={register({
                          //   required: "Plese Select Category",
                        })}
                        // error={Boolean(errors.category)}
                        // helperText={errors.category?.message}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    id="combo-box-demo"
                    size="small"
                    options={stateOptions}
                    getOptionLabel={(option) => option.title}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Item"
                        name="item"
                        inputRef={register({
                          //   required: "Plese Select Item",
                        })}
                        // error={Boolean(errors.item)}
                        // helperText={errors.item?.message}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    id="combo-box-demo"
                    size="small"
                    options={stateOptions}
                    getOptionLabel={(option) => option.title}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Sub-Item"
                        name="subItem"
                        inputRef={register({
                          //   required: "Plese Select Sub-Item",
                        })}
                        // error={Boolean(errors.subItem)}
                        // helperText={errors.subItem?.message}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={3}>
                    <Controller
                      render={(props) => (
                        <KeyboardDatePicker
                        size="small"
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          label="Date From"
                          value={props.value}
                          onChange={props.onChange}
                          fullWidth
                          //   error={Boolean(errors.poDate)}
                          //   helperText={errors.poDate?.message}
                        />
                      )}
                      name="dateFrom"
                      defaultValue={null}
                      control={control}
                      rules={
                        {
                          // required: "Date is required.",
                        }
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Controller
                      render={(props) => (
                        <KeyboardDatePicker
                        size="small"
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          label="Date To"
                          value={props.value}
                          onChange={props.onChange}
                          fullWidth
                          //   error={Boolean(errors.poDate)}
                          //   helperText={errors.poDate?.message}
                        />
                      )}
                      name="dateTo"
                      defaultValue={null}
                      control={control}
                      rules={
                        {
                          // required: "Date is required.",
                        }
                      }
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "1.5rem",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ width: "200px" }}
                  // onClick={handleFirstSaleBotton}
                >
                  APPLY FILTER
                </Button>
              </div>
            </form>
          </Paper>
        </div>
        <div style={{ marginTop: "1rem" }}>
          {suceessMessage && (
            <Alert
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                width: "15rem",
                marginRight: "0.5rem",
              }}
              severity="success"
            >
              Sucessfull..!
            </Alert>
          )}
          {errorMessage && (
            <Alert
              style={{
                marginTop: "1rem",
                width: "15rem",
                marginRight: "0.5rem",
              }}
              severity="error"
            >
              Failed..!
            </Alert>
          )}
          <Paper elevation={3} style={{ padding: "1rem" }}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                marginLeft: "7rem",
                marginRight: "7rem",
              }}
            >
              {showDeleteButton && (
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  style={{ width: "200px" }}
                  onClick={handleDeleteRowShowModal}
                  disable={isDisableDeleteButton}
                >
                  Delete
                </Button>
              )}
            </div>
            <MaterialTable
              icons={tableIcons}
              columns={colums}
              data={salesTableRecords}
              title="About Sales"
              onRowClick={handleRowClick}
              pagi
              options={{
                tableLayout: "auto",
                exportButton: true,
                exportFileName: "File Name",
                actionsColumnIndex: -1,
                selection: true,
                rowStyle: (data, index) =>
                  index % 2 === 0 ? { background: "#f5f5f5" } : null,
                headerStyle: { background: "#c8bbbbd6 " },
              }}
              onSelectionChange={handleCheckBoxSelection}
            />
          </Paper>
        </div>
        {isViewSalesVisible && (
          <ViewSales
            setViewSalesVisible={setViewSalesVisible}
            salesId={selectedSaleIdForView}
          />
        )}
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle style={{ color: "red" }} id="alert-dialog-title">
            Delete
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default React.memo(SalesTable);
