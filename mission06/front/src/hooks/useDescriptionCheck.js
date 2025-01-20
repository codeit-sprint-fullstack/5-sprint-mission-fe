import { useState } from "react";

export function useDescriptionCheck () {
      const [description, setDescription] = useState();
        const [descriptionCheck, setDescriptionCheck] = useState('first');

        
  function handleDescriptionInputChange(e) {
    setDescription(e.target.value);
  }

  function handleDescriptionCheck(e) {
    if (e.target.value.length >= 10 && e.target.value.length <= 100) setDescriptionCheck('checked');
    else setDescriptionCheck('notChecked');
  }

  return [description, descriptionCheck, handleDescriptionInputChange, handleDescriptionCheck];
}