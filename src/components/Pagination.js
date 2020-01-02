import React from "react"
import { Link } from "gatsby"
import "./Pagination.css"

export default ({ path, currentPage, isFirstPage, isLastPage, totalPages }) => {
  const buttons = []
  const backUrl = currentPage === 2 ? path : `${path}/${currentPage - 1}`
  const nextUrl = `${path}/${currentPage + 1}`
  buttons.push(
    <Link
      to={backUrl}
      disabled={isFirstPage}
      key="back"
      className="rounded-lg rounded-r-none"
    >
      Back
    </Link>
  )
  for (let i = 0, j = 1; i < totalPages; i += 1, j++) {
    const btnUrl = j === 1 ? path : `${path}/${j}`
    buttons.push(
      <Link to={btnUrl} disabled={j === currentPage} key={i}>
        {j}
      </Link>
    )
  }
  buttons.push(
    <Link
      to={nextUrl}
      disabled={isLastPage}
      key="next"
      className="rounded-lg rounded-l-none"
    >
      Next
    </Link>
  )

  return <div className="pagination">{buttons}</div>
}
