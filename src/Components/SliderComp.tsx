import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { MetaData } from '../utils';

const minDistance = 1;

interface SliderProps {
  metadata: MetaData,
  metaDataList:MetaData[],
  setMetaDataList: React.Dispatch<React.SetStateAction<MetaData[]>>,
}

const SliderComp: React.VFC<SliderProps> = ({metadata,metaDataList,setMetaDataList}) => {
  const [max, setMax] =  React.useState<number>(metadata.end_slice);
  const [value, setValue] = React.useState<number[]>([metadata.start_slice, metadata.end_slice]);

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    let temp1 = value[0]
    let temp2 = value[1]
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], temp2 - minDistance), temp2]);
      console.log('min',metadata.id,metadata.end_slice,metadata.start_slice)
      console.log(Math.min(newValue[0], temp2 - minDistance))
      setMetaDataList([...metaDataList].map(object => {
        if(object.id === metadata.id) {
          return {
            ...object,
            start_slice: Math.min(newValue[0], temp2 - minDistance),
            end_slice:temp2
          }
        }
        
        else return object;
      }))

    } else {
      setValue([temp1, Math.max(newValue[1], temp1 + minDistance)]);
      console.log('end',metadata.id,metadata.end_slice,metadata.start_slice)
      setMetaDataList([...metaDataList].map(object => {
        if(object.id === metadata.id) {
          return {
            ...object,
            start_slice: temp1,
            end_slice: Math.max(newValue[1], temp1 + minDistance)
          }
        }
        else return object;
      }))
    }
  };

  return (
    <>
    <Box sx={{ width: 300 }}>
      <Slider
        value={value}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        disableSwap
        max={max}
      />

    </Box>
    </>
  );
}
export default SliderComp