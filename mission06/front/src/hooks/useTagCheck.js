import { useState , useEffect } from "react";

export function useTagCheck () {
    const [tag, setTag] = useState([]);
      const [tagCheck, setTagCheck] = useState('first');
      const [tagInput, setTagInput] = useState('');

  function tagInputCheckFunc(){
    if(tagInput.length > 5) setTagCheck('notChecked');
    else setTagCheck('checked');
  }

  useEffect(()=>{
    tagInputCheckFunc();
},[tagInput])


function handleTagInputKeyDown(e) {
    if (e.target.value && e.key === 'Enter' && tagCheck==="checked") {
        if(tagCheck === "checked"){
            setTagCheck('first');
            if(!(tag.find((element)=>element === e.target.value))) setTag([...tag, e.target.value]);
            e.target.value = '';
        }
    }
  }

  
  function handleTagChange (e) {
    setTagInput(e.target.value);
  }

  return [tag,setTag,tagCheck,handleTagInputKeyDown,handleTagChange];

}