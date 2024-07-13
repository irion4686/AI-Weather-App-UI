import { useCallback, useEffect, useState } from 'react'

const SunriseComponent = (props) => {
    const [formattedTime, setTime] = useState('')

    const getTwelveHourTime = useCallback(() => {
        if (props.time === undefined) return ''
        let datetime = new Date(props.time + 'Z')
        let hours = datetime.getHours()
        let minutes = datetime.getMinutes()
        const ampm = hours > 12 ? 'PM' : 'AM'
        hours = hours % 12 || 12

        return hours + ':' + minutes.toString().padStart(2, '0') + ' ' + ampm //{hours}:{minutes.toString().padStart(2, '0')} {ampm}'}
    }, [props.time])
    useEffect(() => {
        const newTime = getTwelveHourTime()
        setTime(newTime)
    }, [getTwelveHourTime])
    return (
        <div class="d-flex align-items-baseline"  >
            <i class='wi wi-sunrise pe-1'></i>
            <p class='ps-2' >{formattedTime}</p>
        </div>
    )
}
export default SunriseComponent