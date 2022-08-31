import type { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount } from './counterSlice';

function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <h1>{count}</h1>
        <button aria-label='Increment value' onClick={() => dispatch(increment())}>
          Increment
        </button>

        <button aria-label='Decrement value' onClick={() => dispatch(decrement())}>
          Decrement
        </button>
        <button
          aria-label='Increment by amount'
          onClick={() => {
            dispatch(incrementByAmount(12));
          }}>
          Increment 10
        </button>
        <button
          aria-label='Increment by async'
          onClick={() => {
            setTimeout(() => {
              dispatch(incrementByAmount(10));
            }, 1000);
          }}>
          Increment Async 10
        </button>
      </div>
    </div>
  );
}

export default Counter;
