
import * as React from 'react';
import {useState, useEffect} from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";




type CustomAutocompleteProps = {
   data: any;
  handleOptionLabel: (option: any) => string;
  handleOptionEqualToValue: (option: any, value: any) => boolean;
  label: string;
}

export function CustomAutocomplete(
  {
    data,
    handleOptionLabel,
    handleOptionEqualToValue,
    label,

  }: CustomAutocompleteProps) {
  //
  const [slicedData, setSlicedData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loading, setLoading] = useState(false)
  //
  const [input, setInput] = useState<string>('');
  useEffect(() => {
    setSlicedData(data.slice(0, 10))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log({slicedData})
  const loadMore = () => {
    if (!loading && hasMore) {
      console.log('here 2')
      setLoading(true);
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        console.log({nextPage})
        const nextLoad = data.slice(nextPage * 10, (nextPage + 1) * 10);
        console.log({nextLoad})
        setHasMore(nextLoad.length > 0);
        setSlicedData((prev: any) => [...prev, ...nextLoad]);
        return nextPage;
      });
      setLoading(false);
    }
  }
  //
  const handleScroll = (event: React.SyntheticEvent) => {

    const { scrollHeight, scrollTop, clientHeight } = event.target as HTMLElement;
    if (scrollHeight - scrollTop - clientHeight <= 120) {

      loadMore();
    }
  }


  const handleInputChange = (value: string) => {
      setSlicedData(data);
      setInput(value)
  }
  return (
    <Autocomplete
      disablePortal
      getOptionLabel={(option) =>  handleOptionLabel(option)}
      isOptionEqualToValue={(option, value) => handleOptionEqualToValue(option, value,)}
      options={slicedData}
      onInputChange={(event, value) => handleInputChange(value)}
      ListboxProps={{
        onScroll: handleScroll
      }}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />

  )
}
