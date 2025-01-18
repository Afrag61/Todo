import Input from "./Input";

const Form = () => {
  return (
    <div className="form-container">
      <form className="form">
        <Input id="title" labelText="Title:" name="title" />
        <Input />
      </form>
    </div>
  );
};

export default Form;
