import { useEffect, useState } from "react"
import { Stack } from "react-bootstrap"

const ActivityRatingComponent = (props) => {
   
    return (
        <Stack direction="horizontal" gap={1}>
            <p>{'Weather rating for ' + props.activity + ': '}</p>
            <p>{props.rating}</p>
        </Stack>
    )
}
export default ActivityRatingComponent