import React from 'react'
import { Formik } from 'formik';

export default function FormikExample(){
	return(
		<div>
     		<h1>Anywhere in your app!</h1>
     		<Formik
		       	initialValues={{ email: '', password: '' }}
		       	validate={values => {
		        	const errors = {};
		        	if (!values.email) {
		           		errors.email = 'Required';
		        	} else if (
		           		!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
		        	) {
		           		errors.email = 'Invalid email address';
		        	}

		        	if (!values.password) {
		           		errors.password = 'Required';
		        	}else if(values.password.length < 5){
		        		errors.password = 'Password must be of length 6 character'
		        	}

		        	return errors;
		       	}}
		       onSubmit={(values, { setSubmitting }) => {
		        	setTimeout(() => {
		           		alert(JSON.stringify(values, null, 2));
		           		setSubmitting(false);
		         	}, 400);
		       }}
		    >

		    {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
           <input
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
           />
           {errors.email && touched.email && errors.email}
           <input
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
           />
           {errors.password && touched.password && errors.password}
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </form>
       )}
     </Formik>
     	</div>
	)
}