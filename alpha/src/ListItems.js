import React, { useState } from "react";
import Data from "./data.json";
import DisplayItems from "./DisplayItems";
export default function ListItems() {
    const [updatePerson, setUpdatePerson] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [show, setShow] = useState(false);
    const [data, setData] = useState(Data);
    const select = (e) => {
        let selectedValue = e.target.value;
        setUpdatePerson(data[selectedValue]);
        setSelectedItem(selectedValue);
        setShow(true);
    };
    return (
        <div className="col-md-3 offset-md-1 mt-3">
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Github</th>
                        <th scope="col">Employment</th>
                        <th scope="col">Choose</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? <tr className="text-center">
                        <th>#Info</th>
                        <td colspan="6"><h3>There is not any item to show.</h3></td>
                    </tr> : data.sort((a, b) => a.id - b.id).map((person, index) => {
                        const { id, name, surname, email, github, employed } = person;
                        return (
                            <tr key={index}>
                                <th scope="row">{id}</th>
                                <td>{name}</td>
                                <td>{surname}</td>
                                <td>{email}</td>
                                <td>{github}</td>
                                <td>{employed}</td>
                                <td><button
                                    className="btn btn-primary"
                                    onClick={select}
                                    value={index}>Select</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {show ? <DisplayItems selectedItem={selectedItem}
                data={data} setData={setData} show={show} setShow={setShow} updatePerson={updatePerson}
                setUpdatePerson={setUpdatePerson} /> : null}
        </div>
    );
}
