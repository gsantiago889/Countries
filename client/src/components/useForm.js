import { useState } from "react";
import { useDispatch } from "react-redux";
import { createActivity, getActivity } from "../store/actions/index";
import { useHistory } from "react-router-dom";

const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors(validateForm(form));
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };

  const handleSelect = (e) => {
    let newArray = [];
    if (!form.countries.includes(e.target.value)) {
      newArray = form.countries.concat(e.target.value);

      if (newArray.length > 5) {
        alert("You cannot select more than 5 countries");
        newArray.pop();
      }
      setForm({
        ...form,
        countries: [...newArray],
      });
    }
  };

  const handleDelete = (c) => {
    if (form.countries.includes(c)) {
      let nuevoArray = form.countries;
      nuevoArray = nuevoArray.filter((e) => e !== c);
      setForm({
        ...form,
        countries: nuevoArray,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
    if (Object.keys(errors).length === 0) {
      dispatch(createActivity(form));

      setForm({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],
      });

      dispatch(getActivity());
      history.push("/home");
    } else {
      e.preventDefault();
      alert("Errors found in the form");
    }
  };

  return {
    form,
    errors,
    handleChange,
    handleBlur,
    handleSelect,
    handleDelete,
    handleSubmit,
  };
};

export default useForm;
