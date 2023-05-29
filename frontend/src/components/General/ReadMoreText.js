import React from 'react'

function ReadMoreText(props) {
    const min = props.min || 100
    const max = props.max || 200

    const [readMore, setReadMore] = React.useState(false)
    const extraContent = <span>{props.text}</span>
    const linkName = readMore ? 'Read less' : 'Read more'
    const [textToShow, setTextToShow] = React.useState(
        props.text.length > min ? props.text.substring(0, min)+"..." : props.text
    )
    function toggleReadMore() {
        setReadMore(!readMore)
        setTextToShow(readMore ? props.text.substring(0, min)+"..." : props.text)
    }
  return (
    <p>
        <span>{textToShow} </span>
        {props.text.length > min && (
            <span onClick={toggleReadMore} className='text-primary-500 hover:underline font-normal  cursor-pointer'>
                {linkName}
            </span>
        )}
    </p>
  )
}

export default ReadMoreText
