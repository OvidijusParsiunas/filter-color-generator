import { addToHistory } from '../../state/history/actions';
import { updateResult } from '../../state/result/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../../state/rootReducer';
import { ColorToFilter } from './colorToFilter';
import { store } from '../../state/store';
import Button from '@mui/material/Button';

function ConvertButton() {
  const dispatch = useDispatch();

  const isInputValidState = useSelector<RootReducer, RootReducer['input']['isValid']>((state) => state.input.isValid);

  const convert = (): void => {
    const currentResult = store.getState().result.text;
    const { colorString, colorType } = store.getState().input.color;
    if (currentResult) dispatch(addToHistory(colorString, currentResult));
    const resultColor = ColorToFilter.convert(colorString, colorType);
    dispatch(updateResult(resultColor));
  };

  const styling = {
    '&.Mui-disabled': {
      backgroundColor: '#7197c0', // #d48484
      color: 'white',
    },
  };

  return (
    <div style={{ position: 'relative' }}>
      <Button sx={styling} disabled={!isInputValidState} variant="contained" color="primary" onClick={convert}>
        Convert
      </Button>
      <Button
        style={{
          position: 'absolute',
          marginTop: 205,
          left: 17,
          width: 30,
          backgroundColor: 'grey',
          opacity: 0.7,
          fontSize: '8px',
        }}
        sx={styling}
        disabled={!isInputValidState}
        variant="contained"
        color="primary"
        onClick={convert}
      >
        Switch
      </Button>
    </div>
  );
}

export default ConvertButton;
