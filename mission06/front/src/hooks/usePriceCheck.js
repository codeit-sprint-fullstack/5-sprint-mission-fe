import { useState } from "react";

export function usePriceCheck () {
    const [price, setPrice] = useState();
    const [priceCheck, setPriceCheck] = useState('first');

    function handlePriceInputChange(e) {
        setPrice(e.target.value);
      }

      function handlePriceCheck(e) {
        if (!isNaN(e.target.value)) setPriceCheck('checked');
        else setPriceCheck('notChecked');
      }

      return [price, priceCheck, handlePriceInputChange, handlePriceCheck];
}