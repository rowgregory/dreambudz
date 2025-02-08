import Link from 'next/link'
import AwesomeIcon from './common/AwesomeIcon'
import Spinner from './common/Spinner'

const DashboardBox = ({ box, isLoading }: any) => {
  return (
    <Link href={box.linkKey} className={`${box.linkClassName} relative overflow-hidden group`}>
      {isLoading ? (
        <div className="m-auto">
          <Spinner fill="fill-white" />
        </div>
      ) : (
        <>
          <p className="uppercase font-thin tracking-wider text-sm">{box.title}</p>
          <h1 onClick={(e: any) => box?.onClick(e) || {}} className="text-5xl font-semibold w-fit">
            {box.value}
          </h1>
          <div className="flex items-center justify-between">
            {box.last24Hours && <p className="text-xs text-white/50">Last 24 hours: {box?.last24Hours}</p>}
            {box.lastWeek && <p className="text-xs text-white">Last week: {box?.lastWeek}</p>}
          </div>
        </>
      )}
      <AwesomeIcon
        icon={box.icon}
        className="text-white/10 text-[200px] absolute -right-16 -top-0 group-hover:-rotate-12 duration-300 transform origin-bottom"
      />
    </Link>
  )
}

export default DashboardBox
