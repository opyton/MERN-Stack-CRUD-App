import React, { useState } from "react";
import axios from "axios";

const AddElement = (props) => {
  const url = props.url;
  const [newVal, setNewVal] = useState("");
  return (
    <div>
      <form
        onSubmit={(event) => {
          const objPromise = new Promise((resolve, reject) => {
            const newObj = {
              item: newVal,
            };
            newObj ? resolve(newObj) : reject(null);
          });
          objPromise
            .then((objPromise) => axios.post(url, objPromise))
            .catch((err) => console.log(err));
        }}
      >
        <input
          value={newVal}
          onChange={(event) => setNewVal(event.target.value)}
        ></input>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddElement;
