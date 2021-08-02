import React from "react";

export default function DisplayItems({ selectedItem, data, setData, setShow, updatePerson, setUpdatePerson }) {
    const handleChange = (e) => {
        const updateSelectedPerson = { ...updatePerson, [e.target.id]: e.target.value };
        setUpdatePerson(updateSelectedPerson);
    };
    const deleteElement = () => {
        setShow(false);
        data.splice(selectedItem, 1);
        setData(data);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setShow(false);
        data.splice(selectedItem, 1);
        setData(data.concat(updatePerson));
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter your name"
                        value={updatePerson.name}
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surname</label>
                    <input type="text" className="form-control" id="surname" placeholder="Enter your surname"
                        value={updatePerson.surname}
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" id="email" placeholder="Enter your E-mail"
                        value={updatePerson.email}
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="github">Github Username</label>
                    <input type="text" className="form-control" id="github" placeholder="Enter your Github"
                        value={updatePerson.github}
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="employed">Employment Status</label>
                    <input type="text" className="form-control" id="employed" placeholder="Enter your employment status"
                        value={updatePerson.employed}
                        onChange={handleChange} />
                </div>
                <div className="d-flex mt-2">
                    <button type="submit" className="btn btn-primary">Update</button>
                    <button type="button" className="btn btn-danger ml-2" onClick={deleteElement}>Delete</button>
                </div>
            </form>
        </div>
    );
}
