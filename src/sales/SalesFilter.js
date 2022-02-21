import React, { useState } from "react";

import { TextField, Button, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
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

const useStyles = makeStyles((theme) => ({
  inputField: {
    width: "100%",
    margin: theme.spacing(1, 0),
  },
  input: {
    display: "none",
  },
}));

const SalesFilter = () => {
  const classes = useStyles();
  const { register, handleSubmit, control, errors } = useForm();
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [selectedRowByCheckbox,setSelectedRowByCheckBox]=useState([])
  const onSubmit = (data) => console.log(data);
  const [tableData, setTableData] = useState([
    {
      slNo: 1,
      dateTime: "1/2/2022",
      orderId: "23rt56",
      employeeName: "Sagar samanta",
      employeeCode: "6756",
      customerName: "Nilu jana",
      customerCode: "8978",
      category: "any",
      totalValue: 897,
    },
    {
      slNo: 2,
      dateTime: "1/2/2022",
      orderId: "23rt56",
      employeeName: "Sagar samanta",
      employeeCode: "6756",
      customerName: "Mohit jana",
      customerCode: "567",
      category: "any",
      totalValue: 897,
    },
    {
      slNo: 3,
      dateTime: "1/2/2022",
      orderId: "23rt56",
      employeeName: "Sagar samanta",
      employeeCode: "6756",
      customerName: "Rajesh jana",
      customerCode: "9567",
      category: "any",
      totalValue: 897,
    },
    {
      slNo: 4,
      dateTime: "1/2/2022",
      orderId: "23rt56",
      employeeName: "Sagar samanta",
      employeeCode: "6756",
      customerName: "Silu jana",
      customerCode: "4534",
      category: "any",
      totalValue: 897,
    },
    {
      slNo: 5,
      dateTime: "1/2/2022",
      orderId: "23rt56",
      employeeName: "Sagar samanta",
      employeeCode: "6756",
      customerName: "Golu jana",
      customerCode: "986",
      category: "any",
      totalValue: 897,
    },
    {
      slNo: 6,
      dateTime: "1/2/2022",
      orderId: "23rt56",
      employeeName: "Sagar samanta",
      employeeCode: "6756",
      customerName: "Halu jana",
      customerCode: "123",
      category: "any",
      totalValue: 897,
    },
  ]);
  const stateOptions = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
  ];
  const colums = [
    { title: "SL.No", field: "slNo" },
    { title: "DATE/TIME", field: "dateTime" },
    {
      title: "ORDER ID",
      field: "orderId",
      cellStyle: {
        cellWidth: "200px",
      },
    },
    { title: "EMPLOYEE NAME", field: "employeeName", width: "80%" },
    { title: "EMPLOYEE CODE", field: "employeeCode" },
    { title: "CUSTOMER NAME", field: "customerName" },
    { title: "CUSTOMER CODE", field: "customerCode" },
    { title: "CATEGORY", field: "category" },
    {
      title: "TOTAL VALUE",
      field: "totalValue",
      type: "currency",
      currencySetting: { currencyCode: "INR" },
    },
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
  };
  const handleCheckBoxSelection = (data) => {
    if (data.length >0) {
      setSelectedRowByCheckBox(data)
      setShowDeleteButton(true);

    } else {
      setShowDeleteButton(false);
    }
  };
  const handleDeleteRow=()=>{
    const updateTableData = [...tableData];
    console.log(updateTableData)
    setTableData(updateTableData);
  }
  return (
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
                  options={stateOptions}
                  getOptionLabel={(option) => option.title}
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
        <Paper elevation={3} style={{ padding: "1rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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
                onClick={handleDeleteRow}
              >
                Delete
              </Button>
            )}

            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ width: "200px" }}
              // onClick={handleFirstSaleBotton}
            >
              PDF Export
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ width: "200px" }}
              // onClick={handleFirstSaleBotton}
            >
              CSV Export
            </Button>
          </div>
          <MaterialTable
            icons={tableIcons}
            columns={colums}
            data={tableData}
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
           
            actions={[
              {
                icon: () => <VisibilityIcon />,
                tooltip: "View Details",
                onClick: (e, data) => {
                  console.log(data);
                },
                // isFreeAction:true
              },
            ]}
          />
        </Paper>
      </div>
    </div>
  );
};

export default SalesFilter;
