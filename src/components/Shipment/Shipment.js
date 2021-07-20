import React from "react";
import { useContext } from "react";
import UserContext from '../../App';
import { useForm } from "react-hook-form";
import './shipment.css';



const Shipment = () => {
          const { register, handleSubmit, watch, formState: { errors } } = useForm();
          const [ loggedInUser, setLoggedInUser ] = useContext(UserContext);
          const onSubmit = data => {
            console.log('form submitted', data)
          };

          console.log(watch("example")); // watch input value by passing the name of it

          return (
            
            <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
              
              {/* <input name="example" defaultValue="test" {...register("example")} /> */}
              
              
              <input name="name" {...register("name", { required: true })} placeholder="Your name"/>
              {errors.name && <span className="error">name is required</span>}

              <input name="email" defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your email"/>
              {errors.email && <span className="error">email is required</span>}

              <input name="address" {...register("address", { required: true })} placeholder="Your address"/>
              {errors.address && <span className="error">address is required</span>}

              <input name="phone" {...register("phone", { required: true })} placeholder="Your phone number"/>
              {errors.phone && <span className="error">phone number is required</span>}
              
              <input type="submit" />
            </form>
          );

}

            

export default Shipment;
