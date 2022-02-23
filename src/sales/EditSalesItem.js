import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { SERVICE_URL } from "../UrlTogglerUtil";
import axios from "axios";
const validationSchema = yup.object({
    pricePerUnit: yup.string("Enter Price").required("Email is required"),
  quantity: yup.string("Enter Quantity").required("Quantity is required"),
});

const EditSalesItem = (props) => {
  const { selectedRowByCheckbox ,handleEditSaleModalClose} = props;
  console.log(selectedRowByCheckbox);
  const formik = useFormik({
    initialValues: {
      pricePerUnit: selectedRowByCheckbox[0].pricePerUnit,
      quantity: selectedRowByCheckbox[0].quantity,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        console.log(values)
      axios({
        method: "post",
        url: SERVICE_URL + "/sales/dashboard/editSalesItem",
        data: {
          id: selectedRowByCheckbox[0].objId,
          pricePerUnit: values.pricePerUnit,
          quantity: values.quantity,
        },
      }).then((response) => {
        console.log(response);
        handleEditSaleModalClose(false)

      });
    },
  });

  return (
    <div style={{ marginTop: "0rem", backgroundColor: "white" }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          style={{ marginTop: "0rem" }}
          size="small"
          type="number"
          id="pricePerUnit"
          name="pricePerUnit"
          label="Price Per Unit"
          variant="outlined"
          value={formik.values.pricePerUnit}
          onChange={formik.handleChange}
          error={formik.touched.pricePerUnit && Boolean(formik.errors.empricePerUnitail)}
          helperText={formik.touched.pricePerUnit && formik.errors.pricePerUnit}
        />

        <TextField
          style={{ marginLeft: "0.5rem" }}
          size="small"
          type="number"
          variant="outlined"
          id="password"
          name="quantity"
          label="Quantity"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          error={formik.touched.quantity && Boolean(formik.errors.quantity)}
          helperText={formik.touched.quantity && formik.errors.quantity}
        />
        <Button
          style={{ marginLeft: "0.5rem" }}
          color="primary"
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditSalesItem;
