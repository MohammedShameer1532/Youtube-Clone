import moment from 'moment';
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

const Time = ({ time }) => {
  const duration = moment.duration(time);
  let formattedTime;

  if (duration.asHours() >= 1) {
    formattedTime = duration.format("H:mm:ss", { trim: false });
  } else {
    formattedTime = duration.format("mm:ss", { trim: false });
  }

  return (
    <div>
      <span className='absolute bottom-2 right-10 md:right-2 bg-black text-white px-2 py-1 text-xs rounded-md'>
        {formattedTime}
      </span>
    </div>
  )
}

export default Time;
