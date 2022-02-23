import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, InputLabel } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
// import { useForm, Controller } from "react-hook-form";
import SalesTable from "./SalesTable";
import { SERVICE_URL } from "../UrlTogglerUtil";
import moment from "moment";
import ViewSales from "../sales/ViewSales";
import { useFormik } from "formik";
import * as yup from "yup";
import LoopOutlinedIcon from "@material-ui/icons/LoopOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FormatColorResetSharp } from "@material-ui/icons";
const validationSchema = yup.object({
  state: yup.string().required("State is required"),
  warehouse: yup.string().required("Warehouse is required"),
  pin: yup.string().required("Pin is required"),
  category: yup.string().required("Category is required"),
  item: yup.string().required("Item is required"),
  subItem: yup.string().required("Sub-item is required"),
  employeeName: yup.string().required("Employee name is required"),
  customerName: yup.string().required("Customer name is required"),
  deliveryDate: yup.date().required("Delivery date is required"),
  deliveryTime: yup.date().required("Delivery time is required"),
  poRefNo: yup.string().required("PO reference number is required"),
  poDate: yup.date().required("PO date is required"),
  unit: yup.string().required("Unit is required"),
  price: yup
    .number()
    .required("Price is required")
    .min(1, "Price must be greater than 0"),
  totalPrice: yup
    .number()
    .required("Total price is required")
    .min(1, "Total price must be greater than 0"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .min(1, "Quantity must be greater than 0"),
});

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
  const [isViewSalesVisible, setViewSalesVisible] = useState(false);
  const [orderMode, setOrderMode] = useState("first");
  const [selectedSaleCategory, setSelectedSaleCategory] = useState("firstSale");
  const [states, setStates] = useState([]);
  const [invDetails, setInvDetails] = useState(null);
  const [pins, setPins] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [employeeNames, setEmployeeNames] = useState([]);
  const [firstSaleCustomers, setFirstSaleCustomers] = useState([]);
  const [secondSaleCustomers, setSecondSaleCustomers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subItemOptions, setSubItemOptions] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [generatedOrderId, setGetGeneratedOrderId] = useState("");
  const [suceessMessage, setSucessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState(false);
  const [salesTableRecords, setSalesTableRecord] = useState([]);
  const [totalSalesCalCulatedvalue, setTotalSalesCalCulatedValue] = useState(0);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [isDisableAddSaleButton, setDisableAddSaleButton] = useState(false);
  const [salesIdForPreview,setSalesIdForPreview]=useState("")
  const [isPlaceorderButtonDisable, setPlaceOrderButtonDisable] =
    useState(false);
  const [confirmPlaceOrder, setConfirmPlaceOrder] = useState(false);
  const [istTimeLoading, setFirstTimeLoading] = useState(true);
  const formik = useFormik({
    initialValues: {
      quantity: 0,
      state: undefined,
      warehouse: undefined,
      pin: undefined,
      category: "",
      item: "",
      subItem: "",
      unit: "",
      price: 0,
      totalPrice: 0,
      customerName: "",
      employeeName: "",
      deliveryDate: new Date(),
      deliveryTime: new Date(),
      poDate: new Date(),
      poRefNo: "",
      poRefNum: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    setDisableAddSaleButton(true);
    console.log(values);
    // console.log(JSON.stringify(values, null, 2));
    let orderId = "";
    if (generatedOrderId) {
      orderId = generatedOrderId;
    }
    axios({
      method: "post",
      url: SERVICE_URL + "/sales/dashboard/addSalesItem",
      data: {
        category: values.category,
        item: values.item,
        pricePerUnit: values.price,
        quantity: values.quantity,
        salesId: orderId,
        subItem: values.subItem,
        totalValue: values.totalPrice,
        unit: values.unit,
      },
    }).then((response) => {
      console.log(response);
      formik.setFieldValue("quantity", 0);
      formik.setFieldValue("category", "");
      formik.setFieldValue("item", "");
      formik.setFieldValue("subItem", "");
      formik.setFieldValue("unit", "");
      formik.setFieldValue("price", 0);
      formik.setFieldValue("totalPrice", 0);
      setGetGeneratedOrderId(response.data.salesId);      
      setTotalSalesCalCulatedValue(
        (prevData) => response.data.totalValue + prevData
      );
      alert("Sucessfil!");
      setDisableAddSaleButton(false);
      setConfirmPlaceOrder(false)
      // setSucessMessage(true);
      setTimeout(() => {
        setSucessMessage(false);
      }, 1000);
    });
    // formik.values.quantity
  };
  const handleDocumentUpload = (e) => {
    var profileImage = document.getElementById("photo-upload");
    if (profileImage && profileImage.files && profileImage.files[0]) {
      var file = profileImage.files[0];
      let formData = new FormData();
      formData.append("formData", file);
      formData.append("salesId", generatedOrderId);
      console.log(formData, file);
      axios({
        method: "POST",
        url: SERVICE_URL + "/sales/dashboard/salesDocumentUpload",
        // headers: AuthService.authHeader(),
        data: formData,
      })
        .then((response) => {
          setUploadImageUrl(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  //1st time load all data request
  useEffect(() => {
    axios({
      method: "get",
      url: SERVICE_URL + "/sales/dashboard/getSalesDashboardDefaultResponse",
    }).then((response) => {
      console.log(response);
      setGetGeneratedOrderId(response.data.salesId);
      setSucessMessage(true);
      setTimeout(() => {
        setSucessMessage(false);
      }, 1000);
      setInvDetails(response.data.invDetails);
      setStates(response.data.states);
      setPins(response.data.pincodes);
      setWarehouses(response.data.warehouses);
      setSalesTableRecord(response.data.salesTableRecords);
      setEmployeeNames(
        response.data.employees.map(
          (employee) =>
            `${employee.empFirstName} ${employee.empMiddleName} ${employee.empLastName}-#-${employee.empId}`
        )
      );
      setFirstSaleCustomers(
        response.data.firstSaleCustomers.map(
          (customer) =>
            `${customer.customerFirstName} ${customer.customerMiddleName} ${customer.customerLastName}-#-${customer.customerId}`
        )
      );
      setSecondSaleCustomers(
        response.data.secondSaleCustomers.map(
          (customer) =>
            `${customer.customerFirstName} ${customer.customerMiddleName} ${customer.customerLastName}-#-${customer.customerId}`
        )
      );
      setFirstTimeLoading(false);
    });
  }, []);

  useEffect(() => {
    if (orderMode === "first") {
      setCustomers(firstSaleCustomers);
    } else {
      setCustomers(secondSaleCustomers);
    }
    formik.setFieldValue("customerName", "");
  }, [orderMode, firstSaleCustomers, secondSaleCustomers]);

  useEffect(() => {
    if (!invDetails) return;

    setCategoryOptions(Object.keys(invDetails.categoryItemMap));
  }, [invDetails]);

  // Handle category change
  useEffect(() => {
    if (!invDetails) return;

    const category = formik.values.category;
    if (category) {
      const items = invDetails.categoryItemMap[category];
      setItemOptions(items);
      formik.setFieldValue("item", "");
    } else {
      setItemOptions([]);
      setSubItemOptions([]);
      formik.setFieldValue("item", "");
      formik.setFieldValue("subItem", "");
    }
  }, [invDetails, formik.values.category, formik.setFieldValue]);

  // Handle item change
  useEffect(() => {
    if (!invDetails) return;

    const item = formik.values.item;
    if (item) {
      const subItems = invDetails.itemSubItemMap[item];
      setSubItemOptions(subItems);
      formik.setFieldValue("subItem", "");
    } else {
      setSubItemOptions([]);
      formik.setFieldValue("subItem", "");
    }
  }, [invDetails, formik.values.item, formik.setFieldValue]);

  // Handle unit change
  useEffect(() => {
    if (!invDetails) return;

    const item = formik.values.item;
    const subItem = formik.values.subItem;

    if (item && subItem) {
      const units = invDetails.subItemItemUnitMap[`${item}_#_${subItem}`];
      setUnitOptions(units || []);
    } else {
      setUnitOptions([]);
      formik.setFieldValue("unit", "");
    }
  }, [
    invDetails,
    formik.values.item,
    formik.values.subItem,
    formik.setFieldValue,
  ]);

  // Compute total price
  useEffect(() => {
    const price = formik.values.price;
    const quantity = formik.values.quantity;

    if (price !== undefined && quantity !== undefined) {
      const totalPrice = price * quantity;
      formik.setFieldValue("totalPrice", totalPrice);
    }
  }, [formik.values.price, formik.values.quantity, formik.setFieldValue]);

  const handleFirstSaleBotton = () => {
    setOrderMode("first");
    setSelectedSaleCategory("firstSale");
    setCustomers(firstSaleCustomers);
  };

  const handleSecondSaleBotton = () => {
    setOrderMode("second");
    setSelectedSaleCategory("secondSale");
    setCustomers(secondSaleCustomers);
  };

  const handlePreviewBtn = () => {
    setViewSalesVisible(true);
  };
  const handlePlaceOrder = () => {
    setPlaceOrderButtonDisable(true);
    const customerName = formik.values.customerName.split("-#-")[0];
    const customerCode = formik.values.customerName.split("-#-")[1];
    const employeeName = formik.values.employeeName.split("-#-")[0];
    const employeeCode = formik.values.employeeName.split("-#-")[1];

    axios({
      method: "post",
      url: SERVICE_URL + "/sales/dashboard/addSales",
      data: {
        createdBy: "",
        createdOn: moment().format("YYYY-MM-DD"),
        customerCode: customerCode,
        customerName: customerName,
        customerPhone: "",
        deliveryDate: moment().format("YYYY-MM-DD"),
        deliveryTime: moment().format("HH:mm:ss"),
        employeeCode: employeeCode,
        employeeName: employeeName,
        pin: formik.values.pin,
        poRefDate: moment().format("YYYY-MM-DD"),
        poRefDoc: uploadImageUrl,
        poRefNum: formik.values.poRefNo,
        saleType: selectedSaleCategory,
        salesId: generatedOrderId,
        state: formik.values.state,
        totalSalesValue: totalSalesCalCulatedvalue,
        warehouse: formik.values.warehouse,
      },
    })
      .then((response) => {
        console.log(response);
        setSalesTableRecord((prevData) => [response.data, ...prevData]);
        setTotalSalesCalCulatedValue(0);
        setGetGeneratedOrderId("");
        setSalesIdForPreview(response.data.salesId)
        alert("Sucessfil!");
        // formik.resetForm();
        setConfirmPlaceOrder(true);
        setPlaceOrderButtonDisable(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {istTimeLoading ? (
        <div
          style={{
            with: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <CircularProgress />
        </div>
      ) : (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div
            style={{
              marginLeft: "5rem",
              marginRight: "5rem",
              marginTop: "2rem",
            }}
          >
            <Paper elevation={3} style={{ padding: "1rem" }}>
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
                    color={orderMode === "first" ? "primary" : ""}
                    style={{ marginRight: "1rem" }}
                    onClick={handleFirstSaleBotton}
                  >
                    FIRST SALE
                  </Button>
                  <Button
                    variant="contained"
                    color={orderMode === "second" ? "primary" : ""}
                    onClick={handleSecondSaleBotton}
                  >
                    SECOND SALE
                  </Button>
                </div>
              </div>
            </Paper>
            <div style={{ marginTop: "2rem" }}>
              <form onSubmit={formik.handleSubmit}>
                <Paper elevation={3} style={{ padding: "1rem" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Autocomplete
                        size="small"
                        options={states}
                        style={{ width: "100%" }}
                        value={formik.values.state}
                        onChange={(event, newValue) => {
                          formik.setFieldValue("state", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="State"
                            name="state"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.state &&
                              Boolean(formik.errors.state)
                            }
                            helperText={
                              formik.touched.state && formik.errors.state
                            }
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Autocomplete
                        size="small"
                        options={warehouses}
                        style={{ width: "100%" }}
                        value={formik.values.warehouse}
                        onChange={(event, newValue) => {
                          formik.setFieldValue("warehouse", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Warehouse"
                            name="warehouse"
                            value={formik.values.warehouse}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.warehouse &&
                              Boolean(formik.errors.warehouse)
                            }
                            helperText={
                              formik.touched.warehouse &&
                              formik.errors.warehouse
                            }
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Autocomplete
                        size="small"
                        options={pins}
                        style={{ width: "100%" }}
                        value={formik.values.pin}
                        onChange={(event, newValue) => {
                          formik.setFieldValue("pin", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Pin"
                            name="pin"
                            value={formik.values.pin}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.pin && Boolean(formik.errors.pin)
                            }
                            helperText={formik.touched.pin && formik.errors.pin}
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    {/* Category */}
                    <Grid item xs={3}>
                      <Autocomplete
                        size="small"
                        options={categoryOptions}
                        style={{ width: "100%" }}
                        value={formik.values.category}
                        onChange={(_, val) =>
                          formik.setFieldValue("category", val)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Category"
                            name="category"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.category &&
                              Boolean(formik.errors.category)
                            }
                            helperText={
                              formik.touched.category && formik.errors.category
                            }
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Autocomplete
                        size="small"
                        options={itemOptions}
                        style={{ width: "100%" }}
                        value={formik.values.item}
                        onChange={(_, val) => formik.setFieldValue("item", val)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Item"
                            name="item"
                            value={formik.values.item}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.item && Boolean(formik.errors.item)
                            }
                            helperText={
                              formik.touched.item && formik.errors.item
                            }
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Autocomplete
                        size="small"
                        options={subItemOptions}
                        style={{ width: "100%" }}
                        value={formik.values.subItem}
                        onChange={(_, val) =>
                          formik.setFieldValue("subItem", val)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Sub-Item"
                            name="subItem"
                            value={formik.values.subItem}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.subItem &&
                              Boolean(formik.errors.subItem)
                            }
                            helperText={
                              formik.touched.subItem && formik.errors.subItem
                            }
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <Autocomplete
                        size="small"
                        options={employeeNames}
                        style={{ width: "100%" }}
                        value={formik.values.employeeName}
                        onChange={(_, val) =>
                          formik.setFieldValue("employeeName", val)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Employee Name"
                            name="employeeName"
                            value={formik.values.employeeName}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.employeeName &&
                              Boolean(formik.errors.employeeName)
                            }
                            helperText={
                              formik.touched.employeeName &&
                              formik.errors.employeeName
                            }
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Autocomplete
                        size="small"
                        options={customers}
                        style={{ width: "100%" }}
                        value={formik.values.customerName}
                        onChange={(_, val) =>
                          formik.setFieldValue("customerName", val)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Customer Name"
                            name="customerName"
                            value={formik.values.customerName}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.customerName &&
                              Boolean(formik.errors.customerName)
                            }
                            helperText={
                              formik.touched.customerName &&
                              formik.errors.customerName
                            }
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    {/* 5) Date Picker */}
                    <Grid item xs={3}>
                      <KeyboardDatePicker
                        size="small"
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        label="Delivery Date"
                        name="deliveryDate"
                        fullWidth
                        value={formik.values.deliveryDate}
                        onChange={(val) =>
                          formik.setFieldValue("deliveryDate", val)
                        }
                        error={
                          formik.touched.deliveryDate &&
                          Boolean(formik.errors.deliveryDate)
                        }
                        helperText={
                          formik.touched.deliveryDate &&
                          formik.errors.deliveryDate
                        }
                      />
                    </Grid>
                    {/* 4) Time Picker */}
                    <Grid item xs={3}>
                      <KeyboardTimePicker
                        size="small"
                        margin="normal"
                        label="Delivery Time"
                        name="deliveryTime"
                        fullWidth
                        value={formik.values.deliveryTime}
                        onChange={(val) =>
                          formik.setFieldValue("deliveryTime", val)
                        }
                        error={
                          formik.touched.deliveryTime &&
                          Boolean(formik.errors.deliveryTime)
                        }
                        helperText={
                          formik.touched.deliveryTime &&
                          formik.errors.deliveryTime
                        }
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <TextField
                        placeholder="Enter P.O/Ref No"
                        size="small"
                        label="P.O/Ref No"
                        variant="outlined"
                        fullWidth
                        className={classes.inputField}
                        name="poRefNo"
                        value={formik.values.poRefNo}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.poRefNo &&
                          Boolean(formik.errors.poRefNo)
                        }
                        helperText={
                          formik.touched.poRefNo && formik.errors.poRefNo
                        }
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <KeyboardDatePicker
                        size="small"
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        name="poDate"
                        label="P.O/Ref Date"
                        fullWidth
                        value={formik.values.poDate}
                        onChange={(val) => formik.setFieldValue("poDate", val)}
                        error={
                          formik.touched.poDate && Boolean(formik.errors.poDate)
                        }
                        helperText={
                          formik.touched.poDate && formik.errors.poDate
                        }
                      />
                    </Grid>
                  </Grid>
                  {/* category */}
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <TextField
                        size="small"
                        placeholder="No category selected"
                        label="Category"
                        name="category-preview"
                        variant="outlined"
                        fullWidth
                        value={formik.values.category}
                        className={classes.inputField}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        size="small"
                        placeholder="No item selected"
                        label="Item"
                        name="item-preview"
                        variant="outlined"
                        value={formik.values.item}
                        fullWidth
                        className={classes.inputField}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        size="small"
                        placeholder="No sub-item selected"
                        label="Sub-Item"
                        name="subItem-preview"
                        variant="outlined"
                        value={formik.values.subItem}
                        fullWidth
                        className={classes.inputField}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        size="small"
                        placeholder="Enter Quantity Here"
                        label="Quantity"
                        variant="outlined"
                        fullWidth
                        className={classes.inputField}
                        name="quantity"
                        type="number"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.quantity &&
                          Boolean(formik.errors.quantity)
                        }
                        helperText={
                          formik.touched.quantity && formik.errors.quantity
                        }
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Autocomplete
                        size="small"
                        options={unitOptions}
                        style={{ width: "100%" }}
                        value={formik.values.unit}
                        onChange={(_, val) => formik.setFieldValue("unit", val)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Unit"
                            name="unit"
                            value={formik.values.unit}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.unit && Boolean(formik.errors.unit)
                            }
                            helperText={
                              formik.touched.unit && formik.errors.unit
                            }
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        size="small"
                        placeholder="Enter Price Here"
                        label="Price"
                        variant="outlined"
                        fullWidth
                        className={classes.inputField}
                        name="price"
                        type="number"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.price && Boolean(formik.errors.price)
                        }
                        helperText={formik.touched.price && formik.errors.price}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        size="small"
                        placeholder="Total price"
                        label="Total Price"
                        variant="outlined"
                        name="totalPrice"
                        type="number"
                        fullWidth
                        className={classes.inputField}
                        value={formik.values.totalPrice}
                        error={
                          formik.touched.totalPrice &&
                          Boolean(formik.errors.totalPrice)
                        }
                        disabled
                      />
                    </Grid>
                    {generatedOrderId && (
                      <Grid item xs={3}>
                        <InputLabel size="small">Upload Document</InputLabel>
                        <input
                          id="photo-upload"
                          type="file"
                          name="emp-photo-upload"
                          onChange={(e) => handleDocumentUpload(e)}
                        />
                      </Grid>
                    )}
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
                        onClick={() => {
                          formik.submitForm();
                        }}
                        style={{ width: "100%" }}
                        disabled={isDisableAddSaleButton}
                      >
                        ADD SALE
                      </Button>
                    </Grid>
                    {confirmPlaceOrder && (
                      <Grid item xs={3}>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ width: "100%" }}
                          onClick={handlePreviewBtn}
                        >
                          PREVIEW
                        </Button>
                      </Grid>
                    )}
                    {generatedOrderId && (
                      <Grid item xs={3}>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ width: "100%" }}
                          onClick={handlePlaceOrder}
                          disable={isPlaceorderButtonDisable}
                        >
                          PLACE ORDER
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Paper>
              </form>
            </div>
          </div>
          {salesTableRecords.length > 0 && (
            <SalesTable
              state={states}
              pin={pins}
              warehouse={warehouses}
              salesTableRecords={salesTableRecords}
              setSalesTableRecord={setSalesTableRecord}
            />
          )}

          {isViewSalesVisible && (
            <ViewSales
              salesId={salesIdForPreview}
              setViewSalesVisible={setViewSalesVisible}
            />
          )}
        </MuiPickersUtilsProvider>
      )}
    </>
  );
};

export default Sales;
