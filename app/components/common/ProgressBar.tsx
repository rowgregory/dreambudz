import { Fragment } from 'react';
import { RootState, useAppSelector } from '@/app/redux/store';


const ProgressBar = () => {
  // const dispatch = useAppDispatch()
  // const { socket } = useSocket()
  const progressBar = useAppSelector((state: RootState) => state.progressBar);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on('progress', (progress: number) => {
  //       dispatch(setProgress(progress))
  //     });

  //     return () => {
  //       socket.disconnect();
  //     };
  //   }
  // }, [socket]);

  return (
    <Fragment>
      {progressBar?.toggleProgressBar && (
        <div className='fixed top-0 left-0 right-0 h-6 w-full z-10 bg-transparent'>
          <div
            id='progress-bar'
            className='bg-lime-400 w-full h-1'
            style={{ width: `${progressBar?.progress}%` }}
          ></div>
        </div>
      )}
    </Fragment>
  );
};

export default ProgressBar;
