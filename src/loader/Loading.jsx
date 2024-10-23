import { ThreeDots } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div>
      <span className='flex items-center justify-center h-screen text-3xl'>
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#606060"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </span>
    </div>
  )
}

export default Loading;