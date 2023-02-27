import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../Redux/hooks";
import { postAuthorRequest } from "../../../../Redux/slices/authorSlice";
import { AuthorType } from "../../../../Types/Types";

type Inputs = {
    first_name: string,
    last_name: string,
    
    date_of_birth?: Date,
    date_of_death?: Date
    };
    

const AddAuthorForm = ({closeModal}:any) => {
    const dispatch = useAppDispatch()
    // form controls
    const {register, handleSubmit} = useForm<Inputs>()
    const onSubmit:SubmitHandler<Inputs> = async (data) => {
        // create new author object based on form inputs
        let newAuthor:AuthorType;
        if (data.first_name && data.last_name) {
            newAuthor = {
                first_name: data.first_name.trim().charAt(0).toUpperCase()+data.first_name.slice(1),
                last_name: data.last_name.trim().charAt(0).toUpperCase()+data.last_name.slice(1),
                books: []
            }
            if (data.date_of_birth) {
                newAuthor.date_of_birth = data.date_of_birth
            }
            if (data.date_of_death) {
                newAuthor.date_of_death = data.date_of_death
            }
            const response = await dispatch(postAuthorRequest(newAuthor))
            if (response.payload===true) {
                closeModal()
            }
        }
    }
    
    return ( 
        <form onSubmit={handleSubmit(onSubmit)} className="add_new_author_form">
                <h4>Add an author <span onClick={closeModal}>x</span></h4>
                <label htmlFor="firstNameInput">First name*</label>
                <input required id="firstNameInput" {...register("first_name")} placeholder="Friedrich"  type="text" />

                <label htmlFor="lastNameInput">Last name*</label>
                <input required id="lastNameInput" {...register("last_name")}  placeholder="Nietzsche" type="text"/>

                <label htmlFor="dateOfBirthInput">Date of birth</label>
                <input id="dateOfBirthInput" {...register("date_of_birth")} type="date" />
                <label htmlFor="dateOfDeathInput">Date of death</label>
                <input id="dateOfDeathInput" {...register("date_of_death")} type="date" />

                <button id="add_author_button">Add</button>
            </form> 
     );
}
 
export default AddAuthorForm;