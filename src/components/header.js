import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import gatsbyIcon from "../images/gatsby-icon.png"
import { FaShoppingCart } from "react-icons/fa"

const isActive = props => {
  console.log(props)
}

const NavLink = props => (
  <Link
    {...props}
    className="text-white text-center p-3 hover:bg-purple-800 hover:text-white rounded-lg rounded-b-none"
    activeClassName="bg-gray-100 hover:bg-gray-100 text-purple-800"
  />
)

const Logo = ({ icon }) => (
  <img src={icon} className="self-center m-0 w-10 h-10" alt="logo" />
)

const MyCart = () => {
  return (
    <div className="snipcart-summary snipcart-checkout flex self-center flex-col ml-auto cursor-pointer bg-purple-900 hover:bg-purple-800 p-2 rounded-lg">
      <div className="flex flex-row self-end my-2">
        <span className="snipcart-total-items text-white text-lg text-center font-bold bg-purple-700 rounded-lg px-1">
          {" "}
        </span>
        <FaShoppingCart className="text-white text-lg m-1" />
        <span className="snipcart-total-price text-white text-lg text-center font-bold bg-purple-700 rounded-lg px-1"></span>
      </div>
    </div>
  )
}

const Brand = ({ title }) => (
  <h1 className="self-center pl-5 m-0">
    <Link to="/" className="text-white">
      {title}
    </Link>
  </h1>
)

const Header = ({ siteTitle }) => (
  <header className="bg-purple-700 mb-6">
    <div className="my-0 mx-auto max-w-6xl pt-6">
      <div className="flex">
        <Logo icon={gatsbyIcon} />
        <Brand title={siteTitle} />
        <MyCart />
      </div>
      <div className="flex">
        <NavLink to="/page-2"> Page 2 </NavLink>
        <NavLink to="/posts/page-markdown">Markdowns</NavLink>
        <NavLink to="/sub-pages/page-images"> Images </NavLink>
        <div className="m-3 border-l-2 border-purple-800"></div>
        <NavLink to="/blog"> Blog </NavLink>
        <NavLink to="/products"> Products </NavLink>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
