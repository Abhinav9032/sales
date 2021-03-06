import React, { useState, useEffect } from "react";

import { TextField, Button, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Alert from "@material-ui/lab/Alert";
import MaterialTable from "material-table";
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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseTwoToneIcon from "@material-ui/icons/CloseTwoTone";
import axios from "axios";
import { forwardRef } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useForm, Controller } from "react-hook-form";
import { SERVICE_URL } from "../UrlTogglerUtil";
import EditSalesItem from './EditSalesItem'
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  inputField: {
    width: "100%",
    margin: theme.spacing(1, 0),
    padding: "0.5rem",
    fontSize: "15px",
  },
  paper: {
    position: "absolute",
    top: "5%",
    left: "7%",
    right: "7%",
    bottom: "10%",
    height: "100%",
    overflow: "scroll",
    // display: "block",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid black",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paperEdit:{
    position: "absolute",
    top: "20%",
    left: "10%",
    right: "10%",
    bottom: "10%",
    height: "30%",
    marginTop:'7rem',
    marginLeft:'20rem',
    marginRight:'20rem',
    // overflow: "scroll",
    // display: "block",
    backgroundColor: theme.palette.background.paper,
    // backgroundColor:'white',
    border: "1px solid black",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const ViewSales = (props) => {
  const classes = useStyles();
  const { setViewSalesVisible, data, salesId } = props;
  const [state, setState] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [pin, setPin] = useState([]);
  const [stateOptions, setStatePotions] = useState([]);
  const [open, setOpen] = React.useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [showDeleteButton, setShowDeleteBtn] = useState(false);
  const [selectedRowByCheckbox, setSelectedRowByCheckBox] = useState([]);
  const [suceessMessage, setSucessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedSalesAllDetails, setSelectedSalesallDetails] = useState([]);
  const [openEditSaleItemModal, setOpenEditSaleItemModal] = useState(false);
  const [disableDelateButton,setDisableDeleteButton]=useState(false)
  
  console.log(salesId)
  useEffect(() => {
    axios({
      method: "get",
      url: SERVICE_URL + `/sales/dashboard/getSalesItem/${salesId}`,
    })
      .then((response) => {
        console.log(response);
        setTableData(response.data.salesItems);
        setSelectedSalesallDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
  const colums = [
    { title: "SL.No", field: "slNo" },
    { title: "CATEGORY", field: "category" },
    {
      title: "ITEM",
      field: "item",
    },
    { title: "SUB-ITEM", field: "subItem" },
    { title: "QUNTITY", field: "quantity" },
    { title: "UNIT", field: "unit" },    
    { title: "PRICE PER UNIT", field: "pricePerUnit" },
    {
      title: "TOTAL VALUE",
      field: "totalValue",
      type: "currency",
      currencySetting: { currencyCode: "INR" },
    },
  ];
  const handleClose = () => {
    setOpen(false);
    setViewSalesVisible(false);
  };
  const handleDeleteRowShowModal = () => {
    setOpenDeleteModal(true);
  };
  const handleDeleteCloseModal = () => {
    setOpenDeleteModal(false);
  };
  const { register, handleSubmit, control, errors } = useForm();
  const handleCheckBoxSelection = (data) => {
    if (data.length > 0) {
      setSelectedRowByCheckBox(data);
      console.log(data)
      setShowDeleteBtn(true);
    } else {
      setShowDeleteBtn(false);
    }
    if (data.length === 1) {
      setShowEditBtn(true);
    } else {
      setShowEditBtn(false);
    }
  };
  const handleDeleteConfirm = () => {
    console.log(selectedRowByCheckbox);
    setDisableDeleteButton(true)
    const objId = selectedRowByCheckbox.map((i) => i.objId);
    console.log(objId);
    axios({
      method: "post",
      url: SERVICE_URL + "/sales/dashboard/deleteSalesItems",
      data: {
        objIdList: objId,
      },
    })
      .then((response) => {
        console.log(response);
        const updateSalesTable = tableData.filter(
          (obj1) =>
            !selectedRowByCheckbox.some((obj2) => obj1.objId === obj2.objId)
        );
        setTableData(updateSalesTable);
        alert('Sucessful!')        
      })
      .catch((err) => {})
      .finally(() => {
        setOpenDeleteModal(false);
        setDisableDeleteButton(false)
      });
  };

  const handleSalesEdit = () => {
    setOpenEditSaleItemModal(true);
  };
  const handleEditSaleModalClose = () => {
    setOpenEditSaleItemModal(false);
  };
  const value = (
    <div className={classes.paper}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        {" "}
        <div
          style={{
            fontSize: "20px",
            backgroundColor: "green",
            marginBottom: "1rem",
            color: "white",
            padding: "0.5rem",
          }}
        >
          About Sales Item
        </div>
        <Button onClick={handleClose} endIcon={<CloseTwoToneIcon />}></Button>
      </div>
      <div style={{ padding: "0.5rem", marginBottom: "1rem" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tr>
            <th style={{ border: "1px solid #dddddd" }}>EMPLOYEE NAME</th>
            <th style={{ border: "1px solid #dddddd" }}>EMPLOYEE CODE</th>
            <th style={{ border: "1px solid #dddddd" }}>CUSTOMER NAME</th>
            <th style={{ border: "1px solid #dddddd" }}>CUSTOMER CODE</th>
            <th style={{ border: "1px solid #dddddd" }}>ORDER ID</th>
            <th style={{ border: "1px solid #dddddd" }}>DATE</th>
            <th style={{ border: "1px solid #dddddd" }}>STATE</th>
            <th style={{ border: "1px solid #dddddd" }}>WAREHOUSE</th>
            <th style={{ border: "1px solid #dddddd" }}>PIN</th>
          </tr>
          <tr>
            <td style={{ border: "1px solid #dddddd" }}>
              {selectedSalesAllDetails.employeeName}
            </td>
            <td style={{ border: "1px solid #dddddd" }}>
              {selectedSalesAllDetails.employeeCode}
            </td>
            <td style={{ border: "1px solid #dddddd" }}>
              {selectedSalesAllDetails.customerName}
            </td>
            <td style={{ border: "1px solid #dddddd" }}>
              {selectedSalesAllDetails.customerCode}
            </td>
            <td style={{ border: "1px solid #dddddd" }}>
              {selectedSalesAllDetails.salesId}
            </td>
            <td style={{ border: "1px solid #dddddd" }}>
              {selectedSalesAllDetails.createdOn}
            </td>
            <td style={{ border: "1px solid #dddddd" }}>
              {selectedSalesAllDetails.state}
            </td>
            <td style={{ border: "1px solid #dddddd" }}>
              {selectedSalesAllDetails.warehouse}
            </td>
            <td style={{ border: "1px solid #dddddd" }}>
              {selectedSalesAllDetails.pin}
            </td>
          </tr>
        </table>
      </div>
      <div style={{ padding: "0.5rem" }}>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Autocomplete
                size="small"
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
            <Grid item xs={2}>
              <Autocomplete
                size="small"
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
            <Grid item xs={2}>
              <Autocomplete
                size="small"
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
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ width: "100%" }}
                // onClick={handleFirstSaleBotton}
              >
                APPLY FILTER
              </Button>
            </Grid>

            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={2}>
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
            <Grid item xs={2}>
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
          </MuiPickersUtilsProvider> */}
          </Grid>
        </form>
      </div>

      <div style={{ padding: "1rem", marginTop: "0rem", marginBottom: "1rem" }}>
        {showDeleteButton && (
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            style={{ width: "200px" }}
            onClick={handleDeleteRowShowModal}
            disable={disableDelateButton}
          >
            Delete
          </Button>
        )}
        {showEditBtn && (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ width: "200px", marginLeft: "2rem" }}
            onClick={handleSalesEdit}
          >
            Edit
          </Button>
        )}
      </div>

      <div>
        <MaterialTable
          icons={tableIcons}
          columns={colums}
          data={tableData}
          title="About Sales Items"
          //   onRowClick={handleRowClick}
          pagi
          options={{
            tableLayout: "auto",
            exportButton: true,
            exportFileName: "File Name",
            actionsColumnIndex: -1,
            selection: true,
            rowStyle: (data, index) =>
              index % 2 !== 0 ? { background: "#f5f5f5" } : null,
            headerStyle: { background: "rgba(242, 238, 238, 0.9)" },
          }}
          onSelectionChange={handleCheckBoxSelection}
        />
      </div>
      <div>
        <Dialog
          open={openDeleteModal}
          onClose={handleDeleteCloseModal}
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
            <Button onClick={handleDeleteCloseModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
  
  return (
    <div style={{ marginLeft: "10rem" }}>      
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.paper}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"        
      >
        {value}
      </Modal>
      <Modal  className={classes.paperEdit} open={openEditSaleItemModal} onClose={handleEditSaleModalClose}>
        <EditSalesItem selectedRowByCheckbox={selectedRowByCheckbox} handleEditSaleModalClose={handleEditSaleModalClose}/>
      </Modal>
    </div>
  );
};

export default ViewSales;
