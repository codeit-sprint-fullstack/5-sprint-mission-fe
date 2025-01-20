import { useState } from "react";

export function useNameCheck () {
    const [name, setName] = useState();
    const [nameCheck, setNameCheck] = useState('first');

    function handleNameInputChange(e) {
        setName(e.target.value);
      }

      function handleNameCheck(e) {
        if (e.target.value.length <= 10 && e.target.value.length >= 1) setNameCheck('checked');
        else setNameCheck('notChecked');
      }

    return [name, nameCheck, handleNameInputChange, handleNameCheck];
}