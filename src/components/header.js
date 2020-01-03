import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import gatsbyIcon from "../images/gatsby-icon.png"
import { FaShoppingCart } from "react-icons/fa"
import netlifyIdentity from "netlify-identity-widget"
import "./header.css"

const NavLink = props => (
  <Link
    {...props}
    className="text-white text-center p-3 hover:bg-purple-800 hover:text-white rounded-lg rounded-b-none"
    activeClassName="bg-gray-100 hover:bg-gray-100 text-purple-800"
  />
)

const UserIdentity = () => (
  <div className="flex self-center flex-col">
    <div data-netlify-identity-menu></div>
  </div>
)

const Logo = ({ icon }) => (
  <img src={icon} className="self-center m-0 w-10 h-10" alt="logo" />
)

const MyCart = () => {
  return (
    <div className="snipcart-summary snipcart-checkout flex self-center cursor-pointer hover:bg-purple-800 p-2 m-1 rounded-lg">
      <span className="snipcart-total-items text-white text-center bg-red-700 rounded-lg px-1">
        {" "}
      </span>
      <FaShoppingCart className="text-white text-lg mx-2" />
      <p className="snipcart-total-price text-gray-500 text-sm text-center font-thin"></p>
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

const RightMenu = () => (
  <div className="flex flex-row self-end ml-auto">
    <MyCart />
    <UserIdentity />
  </div>
)

class Header extends React.Component {
  componentDidMount() {
    netlifyIdentity.init()
  }
  render() {
    const { siteTitle } = this.props
    return (
      <header className="bg-purple-700 mb-6">
        <div className="my-0 mx-auto max-w-6xl pt-6">
          <div className="flex">
            <Logo icon={gatsbyIcon} />
            <Brand title={siteTitle} />
            <RightMenu />
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
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
