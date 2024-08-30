import React from 'react'
// ページのタイトルを受け取って表示
const PageHeader = ({title}) => {
  return (
    <div className='page_header_container'>
      <p>{title}</p>
    </div>
  )
}

export default PageHeader
